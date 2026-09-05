import { UniverseId } from '../config/app-config';

export type MediaKind = 'film' | 'series';

/**
 * Internal movie/TV model.
 *
 * V1 is served by a curated local data source (clearly editorial content,
 * not scraped data). A future TMDB-backed data source will map into this
 * same interface, so no UI changes are required.
 */
export interface Movie {
  slug: string;
  title: string;
  year: number;
  kind: MediaKind;
  universe: UniverseId;
  director?: string;
  /** For series: the showrunner/creator instead of a director. */
  creator?: string;
  cast: readonly string[];
  description: string;
  tagline: string;
}
