import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  // Deterministic offline-image behavior. These tests do not claim to verify CDN availability.
  await page.route('**/*', (route) => {
    const origin = new URL(route.request().url()).origin;
    return origin === new URL(baseURL!).origin ? route.continue() : route.abort();
  });
});

for (const width of [320, 360, 390, 768, 1024, 1280]) {
  test(`all primary pages fit a ${width}px viewport without horizontal clipping`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 844 });
    for (const path of [
      '/',
      '/products',
      '/characters',
      '/characters/69-batman',
      '/movies',
      '/series',
      '/universes/marvel',
      '/universes/dc',
      '/lore',
      '/battle-arena',
      '/instagram',
    ]) {
      await page.goto(path, { waitUntil: 'networkidle' });
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width,
      );
      expect(await page.evaluate(() => getComputedStyle(document.body).overflowX)).not.toBe(
        'hidden',
      );
      for (const card of await page.locator('app-product-card').all()) {
        const box = await card.boundingBox();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
        const button = card.locator('.btn-block');
        expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      }
    }
    expect(errors).toEqual([]);
  });
}

test('mobile menu fits, traps keyboard focus, closes with Escape and returns focus', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto('/products', { waitUntil: 'networkidle' });
  const toggle = page.getByRole('button', { name: 'Toggle menu' });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  const close = page.getByRole('button', { name: 'Close menu' });
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('#mobile-nav .follow-big')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('TV series are visible by default and discoverable by live-action/animation filters', async ({
  page,
}) => {
  await page.goto('/movies', { waitUntil: 'networkidle' });
  await expect(page.locator('.count')).toContainText('353 titles');
  await page.locator('.media-nav').getByRole('link', { name: 'TV series', exact: true }).click();
  await expect(page).toHaveURL(/\/series$/);
  await expect(page.locator('.count')).toContainText('197 titles');
  await expect(
    page.locator('select[aria-label="Filter by collection"] option[value="mcu"]'),
  ).toHaveCount(0);
  await page.locator('#movie-search').fill('WandaVision');
  await expect(page.locator('app-movie-card h3')).toHaveText('WandaVision');
  await page.locator('app-movie-card a').click();
  await expect(page.locator('h1')).toHaveText('WandaVision');
  await expect(page.locator('.cast')).toContainText('Elizabeth Olsen');
  await expect(page.locator('dl.meta')).toContainText('Jac Schaeffer');
  await page.goBack();
  await expect(page.locator('#movie-search')).toHaveValue('WandaVision');
  await page.locator('.clear-btn').click();
  await page.getByLabel('Filter by style').selectOption('animation');
  await page.locator('#movie-search').fill('Batman The Animated Series');
  await expect(page.locator('app-movie-card h3')).toHaveText('Batman: The Animated Series');
});

test('pagination is crawlable and navigation leaves one current description and canonical', async ({
  page,
  baseURL,
}) => {
  await page.goto('/series', { waitUntil: 'networkidle' });
  const canonical = await page.locator('link[rel=canonical]').getAttribute('href');
  expect(canonical).toMatch(/^https?:\/\//);
  const canonicalOrigin = new URL(canonical!).origin;
  const next = page.getByRole('link', { name: 'Next', exact: true });
  await expect(next).toHaveAttribute('href', '/series?page=2');
  await next.click();
  await expect(page).toHaveURL(/\/series\?page=2$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `${canonicalOrigin}/series?page=2`,
  );
  await page.locator('#movie-search').fill('Arrow');
  await expect(page.locator('.count')).toContainText('Showing 1–');
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  const graph = JSON.parse((await page.locator('#app-jsonld').textContent())!);
  expect(graph['@graph'].some((node: { '@type': string }) => node['@type'] === 'WebSite')).toBe(
    true,
  );
});

test('HTML already contains titles and credits before JavaScript, and missing URLs are real 404s', async ({
  request,
}) => {
  for (const [path, title] of [
    ['/movies/arrow', 'Arrow'],
    ['/movies/wandavision', 'WandaVision'],
    ['/characters/69-batman', 'Batman'],
  ]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toMatch(new RegExp(`<h1[^>]*>\\s*${title}\\s*</h1>`));
    expect(html).toContain('application/ld+json');
    expect(html).not.toContain('Opening the file…');
  }
  const productHtml = await (await request.get('/products')).text();
  expect(productHtml).toContain('<app-product-card');
  for (const path of ['/movies/does-not-exist', '/characters/does-not-exist', '/does-not-exist']) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
    expect(await response.text()).toContain('noindex');
  }
});

test('sitemap is complete and contains no deployment placeholders', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('xml');
  const xml = await response.text();
  expect(xml).not.toContain('{{ROOT}}');
  expect(xml).toContain('/movies/agents-of-shield</loc>');
  expect(xml).toContain('/movies/batman-the-animated-series</loc>');
  expect(xml).toContain('/characters/69-batman</loc>');
  expect(xml).toContain('/universes/marvel</loc>');
  expect(xml).toContain('/series</loc>');
});
