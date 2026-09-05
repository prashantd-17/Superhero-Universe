import { UniverseId } from '../config/app-config';

export type MediaKind = 'film' | 'series';
export type ScreenFormat = 'live-action' | 'animation';
export type ReleaseType = 'theatrical' | 'tv-movie' | 'streaming' | 'home-video' | 'series';

/** Collections are browsing groups, not a claim that every film shares a continuity. */
export const MOVIE_COLLECTIONS = {
  mcu: 'Marvel Cinematic Universe',
  'x-men': 'X-Men & Wolverine',
  'spider-man': 'Spider-Man (Raimi & Webb)',
  'sony-spider-man': 'Sony’s Spider-Man Universe',
  'marvel-legacy': 'Marvel classics & standalone films',
  'marvel-imprints': 'Marvel imprints: Icon & Malibu',
  'marvel-tv': 'Marvel television',
  dcu: 'DC Universe',
  dceu: 'DC Extended Universe',
  'dark-knight': 'The Dark Knight trilogy',
  'batman-classic': 'Batman classics',
  'superman-classic': 'Superman classics',
  'dc-standalone': 'DC standalone films',
  'dc-imprints': 'DC imprints: Vertigo, WildStorm & Paradox',
  'dc-tv': 'DC television',
  animation: 'Animated adventures',
  other: 'Beyond Marvel & DC',
} as const;

export type MovieCollection = keyof typeof MOVIE_COLLECTIONS;

/** Provider-independent model. Credits are editorial; poster URLs can refresh online. */
export interface Movie {
  slug: string;
  title: string;
  /** First release year (including festival premieres), not the year of a later US release. */
  year: number;
  kind: MediaKind;
  format: ScreenFormat;
  releaseType: ReleaseType;
  universe: UniverseId;
  collection: MovieCollection;
  director?: string;
  creator?: string;
  cast: readonly string[];
  description: string;
  /** Optional editorial line, not necessarily an official marketing tagline. */
  tagline?: string;
  releaseNote?: string;
  /** Exact, disambiguated English Wikipedia article used for credits and live artwork lookup. */
  wikipediaTitle: string;
  /** Series can use a season article’s poster instead of the main article’s logo. */
  posterPageTitle?: string;
  sourceUrl: string;
  posterUrl: string;
  /** Last verified image, retained if a refreshed image fails to load. */
  posterFallbackUrl: string;
}

export interface MoviePosterResponse {
  posters: Record<string, string>;
  /** Only set when all lookup batches succeeded; never fabricated from the request time. */
  checkedAt: string | null;
  source: 'live' | 'partial' | 'snapshot';
}

export const RELEASE_TYPE_LABELS: Record<ReleaseType, string> = {
  theatrical: 'Theatrical film',
  'tv-movie': 'TV film',
  streaming: 'Streaming film',
  'home-video': 'Home-video film',
  series: 'Series',
};

export function isMoviePosterUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      url.hostname === 'upload.wikimedia.org' &&
      !url.username &&
      !url.password &&
      !url.port &&
      /^\/wikipedia\/(en|commons)\//.test(url.pathname) &&
      /\.(jpe?g|png|webp)$/i.test(url.pathname)
    );
  } catch {
    return false;
  }
}
