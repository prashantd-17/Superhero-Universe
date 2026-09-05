import { Movie } from '../../../models/movie';
import { MCU_MOVIES } from './mcu-movies';
import { MARVEL_MOVIES } from './marvel-movies';
import { DC_MOVIES } from './dc-movies';
import { IMPRINT_MOVIES } from './imprint-movies';
import { TV_MOVIES } from './tv-movies';
import { SCREEN_EXTRAS } from './screen-extras';
import { MARVEL_SERIES } from './marvel-series';
import { MARVEL_ANIMATED_SERIES } from './marvel-animated-series';
import { DC_SERIES } from './dc-series';
import { DC_ANIMATED_SERIES } from './dc-animated-series';

export const CATALOG_REVIEWED_AT = '2026-09-05';

/**
 * Released Marvel/DC live-action feature archive, plus TV films and the
 * released television archive (live action and animation). Sources are linked per title.
 * Excludes announced/unreleased films, shorts, serials and unlicensed films.
 * Film years use the first release, including premieres; later wide releases
 * are explained in releaseNote where easily confused. See docs/movie-catalog.md.
 *
 * Artwork loads directly from studio/Wikimedia CDNs and is refreshed through
 * /api/movie-posters. The catalog itself never depends on a network request.
 */
export const CURATED_MOVIES: readonly Movie[] = [
  ...MCU_MOVIES,
  ...MARVEL_MOVIES,
  ...DC_MOVIES,
  ...IMPRINT_MOVIES,
  ...TV_MOVIES,
  ...SCREEN_EXTRAS,
  ...MARVEL_SERIES,
  ...MARVEL_ANIMATED_SERIES,
  ...DC_SERIES,
  ...DC_ANIMATED_SERIES,
];

export const CATALOG_COUNTS = {
  total: CURATED_MOVIES.length,
  films: CURATED_MOVIES.filter((movie) => movie.kind === 'film').length,
  liveActionFilms: CURATED_MOVIES.filter(
    (movie) => movie.kind === 'film' && movie.format === 'live-action',
  ).length,
  series: CURATED_MOVIES.filter((movie) => movie.kind === 'series').length,
  marvelSeries: CURATED_MOVIES.filter(
    (movie) => movie.kind === 'series' && movie.universe === 'marvel',
  ).length,
  dcSeries: CURATED_MOVIES.filter((movie) => movie.kind === 'series' && movie.universe === 'dc')
    .length,
};
