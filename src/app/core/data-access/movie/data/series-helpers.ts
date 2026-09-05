import type { Movie, MovieCollection, ScreenFormat } from '../../../models/movie';
import type { UniverseId } from '../../../config/app-config';
import { SERIES_ARTWORK } from './series-artwork';
import { STUDIO_POSTERS } from './studio-posters';
import { SERIES_STUDIO_ARTWORK } from './series-studio-artwork';
import { SERIES_POSTER_OVERRIDES } from './series-poster-overrides';

export interface SeriesEntry {
  slug: string;
  title: string;
  year: number;
  wikipediaTitle: string;
  creator?: string;
  cast: readonly string[];
  description: string;
  posterPageTitle?: string;
  posterRefresh?: boolean;
  releaseNote?: string;
  collection?: MovieCollection;
}

/** First broadcast years; creators/developers are omitted where not verified. */
export function series(
  universe: UniverseId,
  format: ScreenFormat,
  entries: readonly SeriesEntry[],
): Movie[] {
  return entries.map((entry) => {
    const override = SERIES_POSTER_OVERRIDES[entry.slug];
    const posterTitle = entry.posterPageTitle ?? entry.wikipediaTitle;
    const artwork = SERIES_ARTWORK[posterTitle];
    const studio =
      SERIES_STUDIO_ARTWORK[entry.wikipediaTitle] ?? STUDIO_POSTERS[entry.wikipediaTitle];
    return {
      ...entry,
      universe,
      format,
      kind: 'series',
      releaseType: 'series',
      collection: entry.collection ?? (universe === 'marvel' ? 'marvel-tv' : 'dc-tv'),
      sourceUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(entry.wikipediaTitle.replace(/ /g, '_'))}`,
      posterUrl: override?.url ?? studio ?? artwork ?? '',
      posterFallbackUrl: artwork ?? override?.url ?? studio ?? '',
      ...(override ? { posterReferenceUrl: override.reference } : {}),
    };
  });
}
