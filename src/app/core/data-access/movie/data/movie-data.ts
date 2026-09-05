import { Movie } from '../../../models/movie';
import { MCU_MOVIES } from './mcu-movies';
import { MARVEL_MOVIES } from './marvel-movies';
import { DC_MOVIES } from './dc-movies';
import { IMPRINT_MOVIES } from './imprint-movies';
import { TV_MOVIES } from './tv-movies';
import { SCREEN_EXTRAS } from './screen-extras';

export const CATALOG_REVIEWED_AT = '2026-09-05';

/**
 * Released Marvel/DC live-action feature archive, plus TV films and the
 * existing selected animation/series shelf. Sources are linked per title.
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
];
