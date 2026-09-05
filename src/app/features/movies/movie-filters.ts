import type { ParamMap, Params } from '@angular/router';
import type { UniverseId } from '../../core/config/app-config';
import {
  Movie,
  MovieCollection,
  MOVIE_COLLECTIONS,
  MediaKind,
  ScreenFormat,
} from '../../core/models/movie';

export type MovieSort = 'newest' | 'oldest' | 'title';
export interface MovieFilters {
  search: string;
  universe: UniverseId | 'all';
  kind: MediaKind | 'all';
  format: ScreenFormat | 'all';
  collection: MovieCollection | 'all';
  sort: MovieSort;
}
export const DEFAULT_MOVIE_FILTERS: Readonly<MovieFilters> = {
  search: '',
  universe: 'all',
  kind: 'all',
  format: 'all',
  collection: 'all',
  sort: 'newest',
};
export const MOVIE_PAGE_SIZE = 24;

const normalize = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export function filterMovies(movies: readonly Movie[], filters: MovieFilters): Movie[] {
  const words = normalize(filters.search).split(/\s+/).filter(Boolean);
  return movies
    .filter((movie) => {
      if (filters.universe !== 'all' && movie.universe !== filters.universe) return false;
      if (filters.kind !== 'all' && movie.kind !== filters.kind) return false;
      if (filters.format !== 'all' && movie.format !== filters.format) return false;
      if (filters.collection !== 'all' && movie.collection !== filters.collection) return false;
      const searchable = normalize(
        [
          movie.title,
          movie.year,
          movie.director,
          movie.creator,
          ...movie.cast,
          MOVIE_COLLECTIONS[movie.collection],
        ]
          .filter(Boolean)
          .join(' '),
      );
      const compact = searchable.replace(/\s/g, '');
      return words.every((word) => searchable.includes(word) || compact.includes(word));
    })
    .sort((a, b) => {
      if (filters.sort !== 'title' && a.year !== b.year) {
        return filters.sort === 'oldest' ? a.year - b.year : b.year - a.year;
      }
      return a.title.localeCompare(b.title, 'en') || a.slug.localeCompare(b.slug, 'en');
    });
}

function oneOf<T extends string>(value: string | null, options: readonly T[], fallback: T): T {
  return options.includes(value as T) ? (value as T) : fallback;
}

export function readMovieFilters(params: ParamMap): MovieFilters {
  return {
    search: params.get('q') ?? '',
    universe: oneOf(
      params.get('universe'),
      ['all', 'marvel', 'dc', 'other'],
      DEFAULT_MOVIE_FILTERS.universe,
    ),
    kind: oneOf(params.get('kind'), ['all', 'film', 'series'], DEFAULT_MOVIE_FILTERS.kind),
    format: oneOf(
      params.get('format'),
      ['all', 'live-action', 'animation'],
      DEFAULT_MOVIE_FILTERS.format,
    ),
    collection: oneOf(
      params.get('collection'),
      ['all', ...(Object.keys(MOVIE_COLLECTIONS) as MovieCollection[])],
      'all',
    ),
    sort: oneOf(params.get('sort'), ['newest', 'oldest', 'title'], 'newest'),
  };
}

export function readMoviePage(params: ParamMap): number {
  const value = Number(params.get('page'));
  return Number.isSafeInteger(value) && value > 0 ? value : 1;
}

export function movieQueryParams(filters: MovieFilters, page = 1): Params {
  return {
    q: filters.search || null,
    universe: filters.universe === 'all' ? null : filters.universe,
    kind: filters.kind === DEFAULT_MOVIE_FILTERS.kind ? null : filters.kind,
    format: filters.format === DEFAULT_MOVIE_FILTERS.format ? null : filters.format,
    collection: filters.collection === 'all' ? null : filters.collection,
    sort: filters.sort === 'newest' ? null : filters.sort,
    page: page > 1 ? page : null,
  };
}
