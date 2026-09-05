/** Production address supplied by the site owner. SITE_URL can override it for a future domain. */
export const DEFAULT_SITE_ORIGIN = 'https://superhero-universe.onrender.com';
export const PRODUCTION_SITE_HOST = new URL(DEFAULT_SITE_ORIGIN).hostname;

/** Known production and development hosts; never use a wildcard for all hosts by default. */
export const DEFAULT_ALLOWED_HOSTS: readonly string[] = [
  PRODUCTION_SITE_HOST,
  'localhost',
  '127.0.0.1',
  '*.e2b.app',
];
