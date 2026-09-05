export interface SiteContext {
  /** Absolute origin, with no trailing slash. SITE_URL can select the preferred public domain. */
  origin: string;
  noindex: boolean;
  /** Optional public Google Search Console HTML-tag verification value. */
  googleSiteVerification?: string;
}

export function httpOrigin(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password
      ? url.origin
      : undefined;
  } catch {
    return undefined;
  }
}

/** Preview/local addresses should never compete with the real website in search. */
export function isPreviewOrigin(origin: string): boolean {
  const host = new URL(origin).hostname.toLowerCase();
  return (
    host === 'localhost' ||
    host.endsWith('.localhost') ||
    host.endsWith('.e2b.app') ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    host === '0.0.0.0' ||
    /^\d+\.\d+\.\d+\.\d+$/.test(host) ||
    host.startsWith('[')
  );
}

export function siteUrl(origin: string, path: string, baseHref = '/'): string {
  const base = `${origin}/${baseHref.replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '');
  // Paths can contain pagination queries, but cannot escape to another origin.
  return new URL(`${base}/${path.replace(/^\/+/, '')}`).href;
}
