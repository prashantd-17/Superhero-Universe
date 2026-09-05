/** TVmaze artwork selected by exact show/year, not a runtime fuzzy title match.
 * Each URL retains a link to its TVmaze reference; image rights remain with their owners.
 */
const tvmaze = (show: number, image: string) => ({
  url: `https://static.tvmaze.com/uploads/images/original_untouched/${image}.jpg`,
  reference: `https://www.tvmaze.com/shows/${show}`,
});
export const SERIES_POSTER_OVERRIDES: Readonly<Record<string, { url: string; reference: string }>> =
  {
    'the-incredible-hulk-series': tvmaze(2151, '12/30048'),
    'blade-the-series': tvmaze(455, '3/9153'),
    'night-man': tvmaze(16892, '56/141936'),
    'spider-woman-series': tvmaze(18515, '63/157988'),
    'black-panther-animated-series': tvmaze(8484, '30/75440'),
    'ultraforce-series': tvmaze(19168, '66/167425'),
    'marvel-anime-iron-man': tvmaze(8479, '30/75435'),
    'marvel-anime-wolverine': tvmaze(8330, '29/74926'),
    'marvel-anime-x-men': tvmaze(8442, '30/75359'),
    'marvel-anime-blade': tvmaze(8331, '29/74927'),
    'the-superman-aquaman-hour': tvmaze(33326, '134/336879'),
    'x-men-the-animated-series': tvmaze(472, '305/764844'),
    'iron-man-1994-series': tvmaze(4243, '20/50854'),
    'iron-man-armored-adventures': tvmaze(6893, '26/65040'),
  };
