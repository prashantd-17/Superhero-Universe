/** Everything the SEO service needs to describe one page. */
export interface SeoConfig {
  title: string;
  description: string;
  /** Route path used to build canonical / Open Graph URLs, e.g. "/characters/69-batman". */
  path: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  /** Used for missing pages and internal search/filter results, not for hiding content. */
  noindex?: boolean;
  /** Structured data (JSON-LD) blocks for this page. */
  jsonLd?: readonly Record<string, unknown>[];
}
