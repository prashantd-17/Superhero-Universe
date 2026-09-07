// Generate a complete sitemap.xml and robots.txt for the production domain.
// Runs as part of `npm run build` so the static public/ folder always ships a
// fresh, fully-populated sitemap (including every character and movie slug).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const origin = process.env['SITE_URL'] || 'https://superhero-universe.onrender.com';

const STATIC_ROUTES = [
  '/',
  '/characters',
  '/movies',
  '/series',
  '/lore',
  '/battle-arena',
  '/products',
  '/instagram',
  '/universes/marvel',
  '/universes/dc',
];

const chars = JSON.parse(
  readFileSync(join(root, 'src/assets/data/akabab-snapshot.json'), 'utf8'),
);

function readSlugsFrom(file) {
  const src = readFileSync(join(root, file), 'utf8');
  return [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
}

const actorSlugs = readSlugsFrom('src/app/core/data-access/character/data/actor-data.ts');

const MOVIE_DATA_DIR = 'src/app/core/data-access/movie/data';
const movieFiles = [
  'mcu-movies.ts',
  'marvel-movies.ts',
  'dc-movies.ts',
  'imprint-movies.ts',
  'tv-movies.ts',
  'screen-extras.ts',
  'marvel-series.ts',
  'marvel-animated-series.ts',
  'dc-series.ts',
  'dc-animated-series.ts',
];
const movieSlugs = new Set();
for (const f of movieFiles) {
  for (const s of readSlugsFrom(join(MOVIE_DATA_DIR, f))) movieSlugs.add(s);
}

const paths = [
  ...STATIC_ROUTES,
  ...chars.map((c) => `/characters/${c.slug}`),
  ...actorSlugs.map((s) => `/characters/${s}`),
  ...[...movieSlugs].map((s) => `/movies/${s}`),
];

const seen = new Set();
const deduped = [];
for (const p of paths) {
  if (!seen.has(p)) {
    seen.add(p);
    deduped.push(p);
  }
}

const escapeXml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);

const today = new Date().toISOString().slice(0, 10);

// Add <lastmod> + priority hints to help crawlers.
const urlEntries = deduped.map((p) => {
  const loc = escapeXml(`${origin}${p === '/' ? '' : p}`);
  let priority = '0.5';
  let changefreq = 'monthly';
  if (p === '/') { priority = '1.0'; changefreq = 'daily'; }
  else if (p === '/characters' || p === '/movies') { priority = '0.9'; changefreq = 'weekly'; }
  else if (p.startsWith('/characters/')) { priority = '0.6'; changefreq = 'monthly'; }
  else if (p.startsWith('/movies/')) { priority = '0.6'; changefreq = 'yearly'; }
  else { priority = '0.7'; changefreq = 'weekly'; }
  return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
});

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urlEntries.join('\n') +
  '\n</urlset>\n';

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);

const robots = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`;
writeFileSync(join(publicDir, 'robots.txt'), robots);

console.log(`Wrote sitemap.xml (${deduped.length} URLs) and robots.txt to public/`);
