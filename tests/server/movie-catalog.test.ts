import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import {
  CURATED_MOVIES,
  CATALOG_REVIEWED_AT,
} from '../../src/app/core/data-access/movie/data/movie-data';
import { VERIFIED_POSTERS } from '../../src/app/core/data-access/movie/data/movie-posters';
import { SERIES_ARTWORK } from '../../src/app/core/data-access/movie/data/series-artwork';
import { SERIES_STUDIO_ARTWORK } from '../../src/app/core/data-access/movie/data/series-studio-artwork';
import { SERIES_POSTER_OVERRIDES } from '../../src/app/core/data-access/movie/data/series-poster-overrides';
import { STUDIO_POSTERS } from '../../src/app/core/data-access/movie/data/studio-posters';
import { MOVIE_COLLECTIONS } from '../../src/app/core/models/movie';

const movie = (slug: string) => {
  const result = CURATED_MOVIES.find((entry) => entry.slug === slug);
  assert.ok(result, `Missing film: ${slug}`);
  return result;
};

test('every entry has unique identity, real source artwork, credits and an explicit format', () => {
  assert.equal(new Set(CURATED_MOVIES.map((entry) => entry.slug)).size, CURATED_MOVIES.length);
  assert.equal(CURATED_MOVIES.length, 353);
  for (const entry of CURATED_MOVIES) {
    assert.match(entry.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(entry.title && entry.description && entry.cast.length >= 3, entry.slug);
    if (entry.kind === 'film') assert.ok(entry.director, entry.slug);
    if (entry.creator !== undefined) assert.ok(entry.creator.trim(), entry.slug);
    assert.ok(
      Number.isInteger(entry.year) &&
        entry.year >= 1951 &&
        entry.year <= Number(CATALOG_REVIEWED_AT.slice(0, 4)),
      entry.slug,
    );
    assert.ok(Object.hasOwn(MOVIE_COLLECTIONS, entry.collection), entry.slug);
    assert.equal(new URL(entry.sourceUrl).hostname, 'en.wikipedia.org');
    assert.equal(
      decodeURIComponent(new URL(entry.sourceUrl).pathname.slice('/wiki/'.length)).replace(
        /_/g,
        ' ',
      ),
      entry.wikipediaTitle,
    );
    const title = entry.posterPageTitle ?? entry.wikipediaTitle;
    const expectedFallback =
      VERIFIED_POSTERS[title] ??
      SERIES_ARTWORK[title] ??
      SERIES_POSTER_OVERRIDES[entry.slug]?.url ??
      SERIES_STUDIO_ARTWORK[entry.wikipediaTitle] ??
      STUDIO_POSTERS[entry.wikipediaTitle] ??
      '';
    assert.equal(entry.posterFallbackUrl, expectedFallback, entry.slug);
    if (!entry.posterUrl) {
      assert.equal(entry.slug, 'the-kid-super-power-hour-with-shazam');
      assert.match(entry.releaseNote!, /No verified/);
    } else {
      const image = new URL(entry.posterUrl);
      assert.equal(image.protocol, 'https:', entry.slug);
      assert.ok(
        ['upload.wikimedia.org', 'cdn.marvel.com', 'static.dc.com', 'static.tvmaze.com'].includes(
          image.hostname,
        ),
        entry.slug,
      );
      assert.ok(
        [
          entry.posterFallbackUrl,
          STUDIO_POSTERS[entry.wikipediaTitle],
          SERIES_STUDIO_ARTWORK[entry.wikipediaTitle],
          SERIES_POSTER_OVERRIDES[entry.slug]?.url,
        ].includes(entry.posterUrl),
        entry.slug,
      );
    }
    assert.equal(new Set(entry.cast).size, entry.cast.length, entry.slug);
    if (entry.kind === 'series') assert.equal(entry.releaseType, 'series');
  }
});

test('Wikimedia hash paths match their actual filenames (catches mistyped image URLs)', () => {
  for (const [title, image] of Object.entries({ ...VERIFIED_POSTERS, ...SERIES_ARTWORK })) {
    const path = new URL(image).pathname.split('/');
    const index = path[3] === 'thumb' ? 4 : 3;
    const hash = createHash('md5')
      .update(decodeURIComponent(path[index + 2]))
      .digest('hex');
    assert.equal(path[index + 1], hash.slice(0, 2), title);
    assert.equal(path[index], hash.slice(0, 1), title);
  }
});

test('covers every MCU phase through the reviewed date and all major legacy collections', () => {
  assert.equal(CURATED_MOVIES.filter((entry) => entry.collection === 'mcu').length, 38);
  assert.equal(CURATED_MOVIES.filter((entry) => entry.collection === 'x-men').length, 13);
  assert.equal(CURATED_MOVIES.filter((entry) => entry.collection === 'sony-spider-man').length, 6);
  assert.equal(CURATED_MOVIES.filter((entry) => entry.collection === 'dceu').length, 16);
  assert.equal(CURATED_MOVIES.filter((entry) => entry.collection === 'dcu').length, 2);
  assert.equal(
    CURATED_MOVIES.filter((entry) => entry.kind === 'film' && entry.format === 'live-action')
      .length,
    155,
  );
  for (const slug of [
    'blade',
    'blade-ii',
    'blade-trinity',
    'hulk-2003',
    'daredevil-2003',
    'elektra',
    'the-punisher-1989',
    'the-punisher-2004',
    'punisher-war-zone',
    'ghost-rider',
    'ghost-rider-spirit-of-vengeance',
    'fantastic-four-2005',
    'fantastic-four-rise-of-the-silver-surfer',
    'fantastic-four-2015',
    'spider-man-1977',
    'spider-man-2002',
    'the-amazing-spider-man',
    'spider-man-brand-new-day',
    'superman-and-the-mole-men',
    'superman-1978',
    'superman-ii',
    'superman-iii',
    'superman-iv-the-quest-for-peace',
    'superman-returns',
    'superman-2025',
    'supergirl-1984',
    'supergirl-2026',
    'batman-1966',
    'batman-1989',
    'batman-returns',
    'batman-forever',
    'batman-and-robin',
    'green-lantern',
    'steel',
    'catwoman',
    'swamp-thing',
    'the-return-of-swamp-thing',
    'constantine',
    'watchmen-2009',
    'joker',
    'joker-folie-a-deux',
    'blue-beetle',
    'aquaman-and-the-lost-kingdom',
    'men-in-black',
    'kick-ass',
    'kingsman-the-secret-service',
    'v-for-vendetta',
    'the-losers',
    'red',
  ])
    movie(slug);
});

test('preserves every original deep link and separates film/TV namesakes', () => {
  for (const slug of [
    'iron-man',
    'captain-america-the-first-avenger',
    'the-avengers',
    'guardians-of-the-galaxy',
    'captain-america-civil-war',
    'black-panther',
    'avengers-infinity-war',
    'avengers-endgame',
    'spider-man-no-way-home',
    'spider-man-across-the-spider-verse',
    'deadpool-wolverine',
    'batman-begins',
    'the-dark-knight',
    'the-dark-knight-rises',
    'man-of-steel',
    'batman-v-superman-dawn-of-justice',
    'wonder-woman',
    'justice-league',
    'aquaman',
    'shazam',
    'zack-snyders-justice-league',
    'the-batman',
    'the-flash',
    'daredevil',
    'loki',
    'watchmen',
    'the-boys',
    'invincible',
  ])
    movie(slug);
  assert.equal(movie('daredevil').kind, 'series');
  assert.equal(movie('daredevil-2003').kind, 'film');
  assert.equal(movie('watchmen').kind, 'series');
  assert.equal(movie('watchmen-2009').kind, 'film');
});

test('corrects the previous credit/plot errors, labels animation and excludes unreleased projects', () => {
  assert.equal(movie('shazam').title, 'Shazam!');
  assert.ok(movie('shazam').cast.includes('Asher Angel'));
  assert.ok(!movie('shazam').cast.includes('Asa Butterfield'));
  assert.equal(movie('justice-league').director, 'Zack Snyder');
  assert.match(movie('justice-league').releaseNote!, /Whedon/);
  assert.match(movie('zack-snyders-justice-league').description, /Steppenwolf/);
  assert.doesNotMatch(movie('zack-snyders-justice-league').description, /Zod|fan-made/);
  assert.equal(movie('loki').creator, 'Michael Waldron');
  assert.ok(movie('watchmen').cast.includes('Regina King'));
  assert.ok(!movie('watchmen').cast.includes('Jeremy Strong'));
  assert.ok(movie('invincible').cast.includes('Sandra Oh'));
  assert.equal(movie('invincible').format, 'animation');
  assert.equal(movie('spider-man-across-the-spider-verse').format, 'animation');
  assert.equal(movie('superman-ii').year, 1980);
  for (const slug of [
    'avengers-doomsday',
    'avengers-secret-wars',
    'clayface',
    'batgirl',
    'the-fantastic-four-1994',
  ]) {
    assert.equal(
      CURATED_MOVIES.some((entry) => entry.slug === slug),
      false,
      slug,
    );
  }
});

test('includes classic, streaming, animated and imprint series, not only the original five', () => {
  const shows = CURATED_MOVIES.filter((entry) => entry.kind === 'series');
  assert.equal(shows.length, 197);
  assert.equal(shows.filter((entry) => entry.universe === 'marvel').length, 94);
  assert.equal(shows.filter((entry) => entry.universe === 'dc').length, 101);
  for (const slug of [
    'agents-of-shield',
    'agent-carter',
    'jessica-jones',
    'luke-cage',
    'iron-fist',
    'the-defenders',
    'the-punisher-series',
    'legion',
    'the-gifted',
    'runaways',
    'cloak-and-dagger',
    'helstrom',
    'wandavision',
    'the-falcon-and-the-winter-soldier',
    'hawkeye',
    'moon-knight',
    'ms-marvel',
    'she-hulk-attorney-at-law',
    'secret-invasion',
    'echo',
    'agatha-all-along',
    'daredevil-born-again',
    'ironheart',
    'wonder-man',
    'spider-noir',
    'arrow',
    'the-flash-series',
    'supergirl-series',
    'smallville',
    'lois-and-clark',
    'gotham',
    'legends-of-tomorrow',
    'black-lightning',
    'titans',
    'doom-patrol',
    'swamp-thing-2019-series',
    'stargirl',
    'superman-and-lois',
    'batwoman',
    'peacemaker',
    'the-penguin',
    'lanterns',
    'lucifer',
    'preacher',
    'the-sandman',
    'sweet-tooth',
    'x-men-the-animated-series',
    'x-men-97',
    'what-if',
    'your-friendly-neighborhood-spider-man',
    'batman-the-animated-series',
    'superman-the-animated-series',
    'batman-beyond',
    'justice-league-animated-series',
    'justice-league-unlimited',
    'young-justice',
    'teen-titans',
    'teen-titans-go',
    'harley-quinn',
    'creature-commandos',
    'my-adventures-with-superman',
    'bat-fam',
  ])
    assert.equal(movie(slug).kind, 'series', slug);
  assert.equal(movie('the-incredible-hulk-series').year, 1977);
  assert.match(movie('the-incredible-hulk-series').releaseNote!, /1978/);
  for (const slug of [
    'visionquest',
    'criminal',
    'marvels-most-wanted',
    'new-warriors',
    'my-adventures-with-green-lantern',
  ])
    assert.equal(
      shows.some((entry) => entry.slug === slug),
      false,
      slug,
    );
});

test('distinct anime adaptations do not get the same generic franchise poster', () => {
  const anime = [
    'marvel-anime-iron-man',
    'marvel-anime-wolverine',
    'marvel-anime-x-men',
    'marvel-anime-blade',
  ].map(movie);
  assert.equal(new Set(anime.map((entry) => entry.posterUrl)).size, 4);
  for (const entry of anime) {
    assert.equal(entry.posterRefresh, false);
    assert.ok(entry.posterReferenceUrl?.startsWith('https://www.tvmaze.com/shows/'));
  }
});
