import { isMoviePosterUrl } from '../app/core/models/movie';
import type { Movie, MoviePosterResponse } from '../app/core/models/movie';

export const POSTER_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
export const POSTER_RETRY_MS = 5 * 60 * 1000;
export const POSTER_TIMEOUT_MS = 4000;
const BATCH_SIZE = 50; // MediaWiki's anonymous-client title limit.

interface WikiPage {
  title?: string;
  original?: { source?: string; width?: number; height?: number };
}
interface WikiResponse {
  error?: unknown;
  query?: {
    pages?: WikiPage[];
    normalized?: { from: string; to: string }[];
    redirects?: { from: string; to: string }[];
  };
}

type PosterEntry = Pick<Movie, 'slug' | 'wikipediaTitle' | 'posterPageTitle' | 'posterFallbackUrl'>;
const normalizeTitle = (title: string): string => title.replace(/_/g, ' ').trim();

/**
 * Keyless, server-side poster lookup. Only the checked-in title allowlist is
 * queried: callers cannot supply an upstream URL, title, hostname or API key.
 * All users share one TTL cache and one in-flight refresh. Outages retain the
 * last known artwork; neither SSR nor the initial movie shelf waits on this.
 */
export class MoviePosterCatalog {
  private cache?: MoviePosterResponse;
  private expiresAt = 0;
  private pending?: Promise<MoviePosterResponse>;

  constructor(
    private readonly movies: readonly PosterEntry[],
    private readonly fetcher: typeof fetch = fetch,
    private readonly now: () => number = Date.now,
  ) {}

  get(): Promise<MoviePosterResponse> {
    if (this.cache && this.now() < this.expiresAt) return Promise.resolve(this.cache);
    if (this.pending) return this.pending;
    this.pending = this.refresh().finally(() => {
      this.pending = undefined;
    });
    return this.pending;
  }

  private async refresh(): Promise<MoviePosterResponse> {
    const posters = {
      ...Object.fromEntries(this.movies.map((movie) => [movie.slug, movie.posterFallbackUrl])),
      ...this.cache?.posters,
    };
    const titles = [
      ...new Set(
        this.movies.map((movie) => normalizeTitle(movie.posterPageTitle ?? movie.wikipediaTitle)),
      ),
    ];
    const batches: string[][] = [];
    for (let offset = 0; offset < titles.length; offset += BATCH_SIZE) {
      batches.push(titles.slice(offset, offset + BATCH_SIZE));
    }

    const results = await Promise.allSettled(batches.map((batch) => this.lookup(batch)));
    let successful = 0;
    for (const result of results) {
      if (result.status !== 'fulfilled') continue;
      successful++;
      for (const movie of this.movies) {
        const url = result.value.get(normalizeTitle(movie.posterPageTitle ?? movie.wikipediaTitle));
        if (url) posters[movie.slug] = url;
      }
    }

    const source =
      successful === results.length && successful > 0
        ? 'live'
        : successful > 0
          ? 'partial'
          : 'snapshot';
    this.cache = {
      posters,
      source,
      checkedAt:
        source === 'live' ? new Date(this.now()).toISOString() : (this.cache?.checkedAt ?? null),
    };
    this.expiresAt = this.now() + (source === 'live' ? POSTER_CACHE_TTL_MS : POSTER_RETRY_MS);
    return this.cache;
  }

  private async lookup(titles: readonly string[]): Promise<Map<string, string>> {
    const url = new URL('https://en.wikipedia.org/w/api.php');
    url.search = new URLSearchParams({
      action: 'query',
      format: 'json',
      formatversion: '2',
      prop: 'pageimages',
      piprop: 'original',
      pilicense: 'any',
      redirects: '1',
      maxlag: '5',
      titles: titles.join('|'),
    }).toString();
    const response = await this.fetcher(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent':
          'SuperheroUniverse/1.0 (https://github.com/prashantd-17/Superhero-Universe; movie poster lookup)',
      },
      signal: AbortSignal.timeout(POSTER_TIMEOUT_MS),
      redirect: 'error',
    });
    if (!response.ok) throw new Error(`Poster provider returned ${response.status}`);
    const payload: WikiResponse = await response.json();
    if (!payload || payload.error || !Array.isArray(payload.query?.pages)) {
      throw new Error('Invalid poster provider response');
    }

    const images = new Map<string, string>();
    for (const page of payload.query.pages) {
      if (typeof page.title !== 'string' || !isMoviePosterUrl(page.original?.source)) continue;
      const source = new URL(page.original.source);
      // Main TV articles sometimes expose a logo instead of release artwork.
      // Keep the curated/season poster rather than replacing it with a logo.
      if (/logo/i.test(source.pathname)) continue;
      source.search = ''; // Strip provider-added analytics, keep stable image identities.
      images.set(normalizeTitle(page.title), source.href);
    }

    const aliases = new Map<string, string>();
    for (const alias of [...(payload.query.normalized ?? []), ...(payload.query.redirects ?? [])]) {
      if (typeof alias.from === 'string' && typeof alias.to === 'string') {
        aliases.set(normalizeTitle(alias.from), normalizeTitle(alias.to));
      }
    }
    const resolved = new Map<string, string>();
    for (const title of titles) {
      let canonical = title;
      const seen = new Set<string>();
      while (aliases.has(canonical) && !seen.has(canonical)) {
        seen.add(canonical);
        canonical = aliases.get(canonical)!;
      }
      const image = images.get(canonical);
      if (image) resolved.set(title, image);
    }
    return resolved;
  }
}
