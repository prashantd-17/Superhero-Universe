import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  MoviePosterCatalog,
  POSTER_CACHE_TTL_MS,
  POSTER_RETRY_MS,
} from '../../src/server/movie-posters';
import { isMoviePosterUrl } from '../../src/app/core/models/movie';

const oldImage =
  'https://upload.wikimedia.org/wikipedia/en/0/02/Iron_Man_%282008_film%29_poster.jpg';
const newImage = 'https://upload.wikimedia.org/wikipedia/en/1/12/New_poster.jpg';
const entry = {
  slug: 'iron-man',
  wikipediaTitle: 'Iron Man (2008 film)',
  posterFallbackUrl: oldImage,
};
const epoch = Date.parse('2026-09-05T00:00:00Z');
const reply = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const images = (title = entry.wikipediaTitle, source = newImage): Response =>
  reply({ query: { pages: [{ title, original: { source, width: 260, height: 384 } }] } });

test('refreshes an exact film title, strips tracking parameters and caches one shared request', async () => {
  let requests = 0;
  let clock = epoch;
  const fetcher: typeof fetch = async (input, init) => {
    requests++;
    const url = new URL(String(input));
    assert.equal(url.origin, 'https://en.wikipedia.org');
    assert.equal(url.pathname, '/w/api.php');
    assert.equal(url.searchParams.get('titles'), entry.wikipediaTitle);
    assert.equal(url.searchParams.get('pilicense'), 'any');
    assert.equal(url.searchParams.get('formatversion'), '2');
    assert.equal(init?.redirect, 'error');
    assert.ok(init?.signal instanceof AbortSignal);
    assert.match(
      String((init?.headers as Record<string, string>)['User-Agent']),
      /SuperheroUniverse/,
    );
    return images(entry.wikipediaTitle, `${newImage}?utm_source=test`);
  };
  const catalog = new MoviePosterCatalog([entry], fetcher, () => clock);
  const [a, b, c] = await Promise.all([catalog.get(), catalog.get(), catalog.get()]);
  assert.equal(requests, 1);
  assert.strictEqual(a, b);
  assert.strictEqual(a, c);
  assert.equal(a.posters['iron-man'], newImage);
  assert.equal(a.source, 'live');
  assert.equal(a.checkedAt, '2026-09-05T00:00:00.000Z');
  await catalog.get();
  assert.equal(requests, 1);
  clock += POSTER_CACHE_TTL_MS;
  await catalog.get();
  assert.equal(requests, 2);
});

test('uses disambiguated titles and season artwork, with normalized redirect support', async () => {
  const entries = [
    entry,
    {
      slug: 'daredevil',
      wikipediaTitle: 'Daredevil (TV series)',
      posterPageTitle: 'Daredevil_season_1',
      posterFallbackUrl: oldImage,
    },
    { slug: 'batman-1989', wikipediaTitle: 'Batman (1989 film)', posterFallbackUrl: oldImage },
    { slug: 'batman-1966', wikipediaTitle: 'Batman (1966 film)', posterFallbackUrl: oldImage },
  ];
  const fetcher: typeof fetch = async (input) => {
    const titles = new URL(String(input)).searchParams.get('titles')!;
    assert.ok(titles.includes('Daredevil season 1'));
    assert.ok(!titles.includes('Daredevil (TV series)'));
    assert.ok(titles.includes('Batman (1989 film)|Batman (1966 film)'));
    return reply({
      query: {
        redirects: [{ from: 'Daredevil season 1', to: 'Daredevil (season 1)' }],
        pages: [{ title: 'Daredevil (season 1)', original: { source: newImage } }],
      },
    });
  };
  const result = await new MoviePosterCatalog(entries, fetcher, () => epoch).get();
  assert.equal(result.posters['daredevil'], newImage);
  assert.equal(result.posters['batman-1989'], oldImage);
  assert.equal(result.posters['batman-1966'], oldImage);
});

test('provider failures keep the snapshot and back off instead of blanking artwork', async () => {
  for (const failure of [
    async () => reply({}, 503),
    async () => reply({ error: { code: 'maxlag' } }),
    async () => reply({ query: { pages: 'invalid' } }),
    async () => new Response('<html>error</html>'),
    async () => {
      throw new DOMException('Timed out', 'TimeoutError');
    },
  ]) {
    let requests = 0;
    let clock = epoch;
    const fetcher: typeof fetch = async () => {
      requests++;
      return failure();
    };
    const catalog = new MoviePosterCatalog([entry], fetcher, () => clock);
    const result = await catalog.get();
    assert.equal(result.source, 'snapshot');
    assert.equal(result.checkedAt, null);
    assert.equal(result.posters['iron-man'], oldImage);
    await catalog.get();
    assert.equal(requests, 1);
    clock += POSTER_RETRY_MS;
    await catalog.get();
    assert.equal(requests, 2);
  }
});

test('a later outage keeps the last successfully fetched poster and its actual check date', async () => {
  let clock = epoch;
  let available = true;
  const catalog = new MoviePosterCatalog(
    [entry],
    async () => (available ? images() : reply({}, 429)),
    () => clock,
  );
  const initial = await catalog.get();
  available = false;
  clock += POSTER_CACHE_TTL_MS;
  const stale = await catalog.get();
  assert.equal(stale.source, 'snapshot');
  assert.equal(stale.posters['iron-man'], newImage);
  assert.equal(stale.checkedAt, initial.checkedAt);
});

test('batches at most 50 titles and retains successful batches during a partial outage', async () => {
  const entries = Array.from({ length: 101 }, (_, index) => ({
    ...entry,
    slug: `film-${index}`,
    wikipediaTitle: `Film ${index}`,
  }));
  let requests = 0;
  const fetcher: typeof fetch = async (input) => {
    requests++;
    const titles = new URL(String(input)).searchParams.get('titles')!.split('|');
    assert.ok(titles.length <= 50);
    if (titles.includes('Film 100')) throw new Error('Offline');
    return reply({
      query: { pages: titles.map((title) => ({ title, original: { source: newImage } })) },
    });
  };
  const result = await new MoviePosterCatalog(entries, fetcher, () => epoch).get();
  assert.equal(requests, 3);
  assert.equal(result.source, 'partial');
  assert.equal(result.checkedAt, null);
  assert.equal(Object.keys(result.posters).length, 101);
  assert.equal(result.posters['film-0'], newImage);
  assert.equal(result.posters['film-99'], newImage);
  assert.equal(result.posters['film-100'], oldImage);
});

test('rejects unsafe upstream image URLs, missing artwork and title-card logos', async () => {
  for (const source of [
    'javascript:alert(1)',
    'http://upload.wikimedia.org/wikipedia/en/a.jpg',
    'https://upload.wikimedia.org.evil.test/wikipedia/en/a.jpg',
    'https://example.com/incorrect.jpg',
    'https://upload.wikimedia.org/wikipedia/en/title.svg',
    'https://user:secret@upload.wikimedia.org/wikipedia/en/a.jpg',
    'https://upload.wikimedia.org:8443/wikipedia/en/a.jpg',
    'https://upload.wikimedia.org/other/file.jpg',
  ]) {
    assert.equal(isMoviePosterUrl(source), false, source);
    const result = await new MoviePosterCatalog(
      [entry],
      async () => images(entry.wikipediaTitle, source),
      () => epoch,
    ).get();
    assert.equal(result.posters['iron-man'], oldImage);
  }
  for (const body of [
    { query: { pages: [{ title: entry.wikipediaTitle }] } },
    {
      query: {
        pages: [
          {
            title: entry.wikipediaTitle,
            original: { source: newImage.replace('New_poster', 'Show_logo') },
          },
        ],
      },
    },
  ]) {
    const result = await new MoviePosterCatalog(
      [entry],
      async () => reply(body),
      () => epoch,
    ).get();
    assert.equal(result.posters['iron-man'], oldImage);
  }
  assert.equal(isMoviePosterUrl(oldImage), true);
  assert.equal(
    isMoviePosterUrl('https://upload.wikimedia.org/wikipedia/commons/1/1d/1951Superman.jpg'),
    true,
  );
});

test('handles an empty archive without a network request or a false live claim', async () => {
  const catalog = new MoviePosterCatalog(
    [],
    async () => {
      throw new Error('Should not fetch');
    },
    () => epoch,
  );
  assert.deepEqual(await catalog.get(), { posters: {}, source: 'snapshot', checkedAt: null });
});
