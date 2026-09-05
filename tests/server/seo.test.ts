import assert from 'node:assert/strict';
import { DEFAULT_SITE_ORIGIN, PRODUCTION_SITE_HOST } from '../../src/app/core/config/site-config';
import { test } from 'node:test';
import {
  buildRobots,
  buildSitemap,
  preferredSiteOrigin,
  resolveSiteDeployment,
  siteForRequest,
  sitemapPaths,
} from '../../src/server/seo';
import { CURATED_MOVIES } from '../../src/app/core/data-access/movie/data/movie-data';
import { isPreviewOrigin, siteUrl } from '../../src/app/core/models/site';

const origin = 'https://superhero.example.com';

test('sitemap includes every movie/series and real character slug, with absolute unique URLs', () => {
  const xml = buildSitemap(origin);
  assert.match(xml, /^<\?xml/);
  assert.doesNotMatch(xml, /\{\{ROOT\}\}|localhost/);
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(urls.length, new Set(urls).size);
  assert.equal(urls.length, sitemapPaths().length);
  assert.ok(urls.length > 900);
  for (const movie of CURATED_MOVIES)
    assert.ok(urls.includes(`${origin}/movies/${movie.slug}`), movie.slug);
  for (const path of ['/series', '/universes/marvel', '/universes/dc', '/characters/69-batman'])
    assert.ok(urls.includes(`${origin}${path}`));
  assert.ok(urls.every((url) => new URL(url).origin === origin));
});

test('builds real robots instructions and a sitemap declaration, but blocks preview indexing', () => {
  const robots = buildRobots({ origin, noindex: false });
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Disallow: \/api\//);
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.equal(
    buildRobots({ origin: 'http://localhost:4200', noindex: true }),
    'User-agent: *\nDisallow: /\n',
  );
});

test('uses the public proxy origin and a preferred production origin consistently', () => {
  assert.deepEqual(siteForRequest({ host: 'superhero.example.com', forwardedProto: 'https' }), {
    origin,
    noindex: false,
  });
  assert.deepEqual(
    siteForRequest(
      { host: 'localhost:4000', forwardedHost: 'superhero.example.com', forwardedProto: 'https' },
      undefined,
      ['localhost', 'superhero.example.com'],
    ),
    { origin, noindex: false },
  );
  assert.deepEqual(siteForRequest({ host: 'alias.example.com', protocol: 'https' }, origin), {
    origin,
    noindex: false,
  });
  assert.equal(
    siteForRequest({ host: '4200-preview.e2b.app', forwardedProto: 'https' }, origin)?.noindex,
    true,
  );
});

test('rejects malformed/unapproved hosts and invalid SITE_URL configuration', () => {
  for (const host of [
    'evil.example',
    'superhero.example.com/evil',
    'user@superhero.example.com',
    'superhero.example.com#fragment',
  ]) {
    assert.equal(
      siteForRequest({ host, protocol: 'https' }, undefined, ['superhero.example.com']),
      undefined,
      host,
    );
  }
  assert.equal(
    siteForRequest({ host: 'superhero.example.com', forwardedProto: 'javascript' }),
    undefined,
  );
  assert.equal(siteForRequest({ host: 'localhost:4200' }, undefined, ['*.e2b.app']), undefined);
  assert.equal(preferredSiteOrigin(`${origin}/`), origin);
  for (const value of [
    'not a URL',
    'javascript:alert(1)',
    'https://user:pass@example.com',
    `${origin}/path`,
    `${origin}?x=1`,
  ])
    assert.throws(() => preferredSiteOrigin(value));
});

test('preview detection and canonical path construction do not invent public domains', () => {
  for (const value of [
    'http://localhost:4200',
    'http://127.0.0.1',
    'https://4200-sandbox.e2b.app',
    'http://[::1]:4000',
  ])
    assert.equal(isPreviewOrigin(value), true);
  assert.equal(isPreviewOrigin(origin), false);
  assert.equal(siteUrl(origin, '/movies'), `${origin}/movies`);
  assert.equal(siteUrl(origin, '/series?page=2', '/hub/'), `${origin}/hub/series?page=2`);
  assert.equal(new URL(siteUrl(origin, '//attacker.example/')).origin, origin);
});

test('defaults to the owner-confirmed Render domain and a restricted host allowlist', () => {
  const deployment = resolveSiteDeployment();
  assert.equal(DEFAULT_SITE_ORIGIN, 'https://superhero-universe.onrender.com');
  assert.equal(deployment.preferredOrigin, DEFAULT_SITE_ORIGIN);
  assert.ok(deployment.allowedHosts.includes(PRODUCTION_SITE_HOST));
  assert.ok(!deployment.allowedHosts.includes('*'));
  const site = siteForRequest(
    { host: PRODUCTION_SITE_HOST, protocol: 'http' },
    deployment.preferredOrigin,
    deployment.allowedHosts,
  )!;
  assert.deepEqual(site, { origin: DEFAULT_SITE_ORIGIN, noindex: false });
  assert.ok(buildRobots(site).includes(`Sitemap: ${DEFAULT_SITE_ORIGIN}/sitemap.xml`));
  assert.ok(buildSitemap(site.origin).includes(`${DEFAULT_SITE_ORIGIN}/series</loc>`));
  assert.equal(
    siteForRequest(
      { host: 'unapproved.example' },
      deployment.preferredOrigin,
      deployment.allowedHosts,
    ),
    undefined,
  );
  assert.equal(
    siteForRequest(
      { host: '4200-demo.e2b.app', protocol: 'https' },
      deployment.preferredOrigin,
      deployment.allowedHosts,
    )?.noindex,
    true,
  );
});

test('explicit hosting settings override defaults without exposing a fabricated verification value', () => {
  assert.equal(resolveSiteDeployment().googleSiteVerification, undefined);
  assert.equal(resolveSiteDeployment({ SITE_URL: '  ' }).preferredOrigin, DEFAULT_SITE_ORIGIN);
  const deployment = resolveSiteDeployment({
    SITE_URL: 'https://custom.example.com/',
    NG_ALLOWED_HOSTS: ' CUSTOM.EXAMPLE.COM, superhero-universe.onrender.com ',
    GOOGLE_SITE_VERIFICATION: ' public-test-value ',
  });
  assert.equal(deployment.preferredOrigin, 'https://custom.example.com');
  assert.deepEqual(deployment.allowedHosts, ['custom.example.com', PRODUCTION_SITE_HOST]);
  assert.equal(deployment.googleSiteVerification, 'public-test-value');
  assert.ok(
    resolveSiteDeployment({ SITE_URL: 'https://custom.example.com' }).allowedHosts.includes(
      'custom.example.com',
    ),
  );
});
