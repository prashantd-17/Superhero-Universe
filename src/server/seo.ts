import { DEFAULT_ALLOWED_HOSTS, DEFAULT_SITE_ORIGIN } from '../app/core/config/site-config';
import { CURATED_MOVIES } from '../app/core/data-access/movie/data/movie-data';
import { ACTOR_SEEDS } from '../app/core/data-access/character/data/actor-data';
import characters from '../assets/data/akabab-snapshot.json';
import { SiteContext, httpOrigin, isPreviewOrigin, siteUrl } from '../app/core/models/site';

export const INDEXABLE_ROUTES = [
  '/',
  '/characters',
  '/movies',
  '/series',
  '/universes/marvel',
  '/universes/dc',
  '/lore',
  '/products',
  '/battle-arena',
  '/instagram',
] as const;

const firstHeader = (value?: string): string | undefined => value?.split(',')[0]?.trim();
function allowed(host: string, allowlist?: readonly string[]): boolean {
  return (
    !allowlist?.length ||
    allowlist.some(
      (entry) =>
        entry === '*' ||
        entry === host ||
        (entry.startsWith('*.') && host.endsWith(entry.slice(1))),
    )
  );
}

/** Honors a configured preferred domain; otherwise uses validated proxy/request headers. */
export function siteForRequest(
  headers: { host?: string; forwardedHost?: string; forwardedProto?: string; protocol?: string },
  preferredOrigin?: string,
  allowlist?: readonly string[],
): SiteContext | undefined {
  const hosts = [firstHeader(headers.host), firstHeader(headers.forwardedHost)].filter(
    (host): host is string => !!host,
  );
  if (!hosts.length) return undefined;
  const protocol = firstHeader(headers.forwardedProto) ?? headers.protocol ?? 'http';
  if (!['https', 'http'].includes(protocol)) return undefined;
  for (const host of hosts) {
    try {
      const url = new URL(`${protocol}://${host}`);
      if (
        url.pathname !== '/' ||
        url.search ||
        url.hash ||
        url.username ||
        url.password ||
        !allowed(url.hostname, allowlist)
      )
        return undefined;
    } catch {
      return undefined;
    }
  }
  const requestOrigin = httpOrigin(`${protocol}://${hosts.at(-1)}`);
  if (!requestOrigin) return undefined;
  return {
    origin: preferredOrigin ?? requestOrigin,
    noindex: isPreviewOrigin(requestOrigin) || isPreviewOrigin(preferredOrigin ?? requestOrigin),
  };
}

export function preferredSiteOrigin(value?: string): string | undefined {
  if (!value) return undefined;
  const origin = httpOrigin(value);
  if (!origin || new URL(value).pathname !== '/' || new URL(value).search || new URL(value).hash) {
    throw new Error(
      'SITE_URL must be an absolute http(s) origin, such as https://your-domain.com, without a path or query.',
    );
  }
  return origin;
}

/** Central deployment settings: the owner's Render URL is the safe canonical default. */
export function resolveSiteDeployment(env: Readonly<Record<string, string | undefined>> = {}) {
  const preferredOrigin = preferredSiteOrigin(env['SITE_URL']?.trim() || DEFAULT_SITE_ORIGIN)!;
  const configuredHosts = env['NG_ALLOWED_HOSTS']
    ?.split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
  const allowedHosts = configuredHosts?.length
    ? configuredHosts
    : [...new Set([...DEFAULT_ALLOWED_HOSTS, new URL(preferredOrigin).hostname])];
  return {
    preferredOrigin,
    allowedHosts,
    // This is the PUBLIC HTML-tag verification value, not an account password or API key.
    googleSiteVerification: env['GOOGLE_SITE_VERIFICATION']?.trim() || undefined,
  };
}

const escapeXml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]!,
  );

export function sitemapPaths(): string[] {
  return [
    ...new Set([
      ...INDEXABLE_ROUTES,
      ...CURATED_MOVIES.map((movie) => `/movies/${movie.slug}`),
      ...characters.map((hero) => `/characters/${hero.slug}`),
      ...ACTOR_SEEDS.map((hero) => `/characters/${hero.slug}`),
    ]),
  ];
}

export function buildSitemap(origin: string): string {
  if (!httpOrigin(origin)) throw new Error('Invalid sitemap origin');
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    sitemapPaths()
      .map((path) => `  <url><loc>${escapeXml(siteUrl(origin, path))}</loc></url>`)
      .join('\n') +
    '\n</urlset>\n'
  );
}

export function buildRobots(site: SiteContext): string {
  return site.noindex
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl(site.origin, '/sitemap.xml')}\n`;
}
