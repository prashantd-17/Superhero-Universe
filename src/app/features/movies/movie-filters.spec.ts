import { convertToParamMap } from '@angular/router';
import { CURATED_MOVIES } from '../../core/data-access/movie/data/movie-data';
import {
  DEFAULT_MOVIE_FILTERS,
  MovieFilters,
  filterMovies,
  movieQueryParams,
  readMovieFilters,
  readMoviePage,
} from './movie-filters';

const all: MovieFilters = { ...DEFAULT_MOVIE_FILTERS, kind: 'all', format: 'all' };

describe('Movie archive filters', () => {
  it('shows films and series by default, with explicit live-action and animation filters', () => {
    expect(filterMovies(CURATED_MOVIES, { ...DEFAULT_MOVIE_FILTERS }).length).toBe(353);
    expect(
      filterMovies(CURATED_MOVIES, { ...all, kind: 'film', format: 'live-action' }).length,
    ).toBe(155);
    expect(filterMovies(CURATED_MOVIES, all).length).toBe(353);
    expect(filterMovies(CURATED_MOVIES, { ...all, kind: 'series' }).length).toBe(197);
    expect(
      filterMovies(CURATED_MOVIES, { ...all, format: 'animation' }).map((movie) => movie.slug),
    ).toContain('spider-man-across-the-spider-verse');
  });

  it('combines publisher, format and collection without conflating them with a shared universe', () => {
    expect(
      filterMovies(CURATED_MOVIES, { ...all, universe: 'marvel', collection: 'mcu' }).length,
    ).toBe(38);
    expect(filterMovies(CURATED_MOVIES, { ...all, universe: 'dc', collection: 'dcu' }).length).toBe(
      2,
    );
    expect(filterMovies(CURATED_MOVIES, { ...all, universe: 'dc', collection: 'mcu' })).toEqual([]);
    expect(
      filterMovies(CURATED_MOVIES, {
        ...all,
        universe: 'marvel',
        collection: 'marvel-imprints',
      }).map((movie) => movie.slug),
    ).toContain('men-in-black');
  });

  it('searches titles, years, actors and directors despite accents and punctuation', () => {
    for (const [search, expected] of [
      ['spiderman 2002', 'spider-man-2002'],
      ['shazam!', 'shazam'],
      ['Florence Pugh', 'thunderbolts'],
      ['Chloe Zhao', 'eternals'],
      ['Sasha Calle', 'the-flash'],
      ['1989 batman', 'batman-1989'],
      ['Stanley Nobody', null],
    ]) {
      const slugs = filterMovies(CURATED_MOVIES, { ...all, search: search! }).map(
        (movie) => movie.slug,
      );
      if (expected) expect(slugs).toContain(expected);
      else expect(slugs).toEqual([]);
    }
    expect(filterMovies(CURATED_MOVIES, { ...all, search: '   ' }).length).toBe(353);
  });

  it('sorts predictably without mutating the shared archive', () => {
    const before = CURATED_MOVIES.map((movie) => movie.slug);
    const oldest = filterMovies(CURATED_MOVIES, { ...all, sort: 'oldest' });
    const newest = filterMovies(CURATED_MOVIES, { ...all, sort: 'newest' });
    const alphabetical = filterMovies(CURATED_MOVIES, { ...all, sort: 'title' });
    expect(oldest[0].year).toBe(1951);
    expect(newest[0].year).toBe(2026);
    expect(alphabetical[0].title).toBe('A History of Violence');
    expect(
      oldest.every((movie, index) => index === 0 || movie.year >= oldest[index - 1].year),
    ).toBeTrue();
    expect(CURATED_MOVIES.map((movie) => movie.slug)).toEqual(before);
  });

  it('validates query parameters, rejects invalid pages and round-trips shareable filters', () => {
    const invalid = convertToParamMap({
      universe: 'unknown',
      kind: 'short',
      format: '3d',
      collection: '__proto__',
      sort: 'rating',
      page: 'Infinity',
    });
    expect(readMovieFilters(invalid)).toEqual({ ...DEFAULT_MOVIE_FILTERS });
    for (const value of ['Infinity', '-1', '0', '1.5', 'NaN', '']) {
      expect(readMoviePage(convertToParamMap({ page: value }))).toBe(1);
    }
    const filters: MovieFilters = {
      ...all,
      universe: 'dc',
      collection: 'dc-standalone',
      search: 'Joker',
      sort: 'oldest',
    };
    const params = convertToParamMap(
      Object.fromEntries(
        Object.entries(movieQueryParams(filters, 3)).filter(([, value]) => value !== null),
      ),
    );
    expect(readMovieFilters(params)).toEqual(filters);
    expect(readMoviePage(params)).toBe(3);
  });
});
