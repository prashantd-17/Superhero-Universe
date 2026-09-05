import { UniverseId } from '../../../config/app-config';
import { Movie, MovieCollection, ReleaseType } from '../../../models/movie';
import { VERIFIED_POSTERS } from './movie-posters';
import { STUDIO_POSTERS } from './studio-posters';

export interface FilmEntry {
  slug: string;
  title: string;
  year: number;
  wikipediaTitle: string;
  director: string;
  cast: readonly string[];
  description: string;
  releaseType?: Exclude<ReleaseType, 'series'>;
  releaseNote?: string;
}

export function films(
  universe: UniverseId,
  collection: MovieCollection,
  entries: readonly FilmEntry[],
): Movie[] {
  return entries.map((entry) => ({
    ...entry,
    kind: 'film',
    format: 'live-action',
    releaseType: entry.releaseType ?? 'theatrical',
    universe,
    collection,
    ...artwork(entry.wikipediaTitle),
  }));
}

export function artwork(
  wikipediaTitle: string,
  posterPageTitle = wikipediaTitle,
): Pick<Movie, 'sourceUrl' | 'posterUrl' | 'posterFallbackUrl'> {
  const fallback = VERIFIED_POSTERS[posterPageTitle];
  // Missing artwork is a content error, not a reason to silently ship another blank card.
  if (!fallback) throw new Error(`Missing verified poster: ${posterPageTitle}`);
  return {
    sourceUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(wikipediaTitle.replace(/ /g, '_'))}`,
    posterUrl: STUDIO_POSTERS[wikipediaTitle] ?? fallback,
    posterFallbackUrl: fallback,
  };
}
