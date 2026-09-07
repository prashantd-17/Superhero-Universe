import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Server render strategy.
 *
 * Static hub pages are prerendered at build time for instant crawler-visible HTML.
 * Character and movie detail pages render on-demand (SSR) so every hero/movie
 * profile ships with a complete <title>, description and Open Graph payload —
 * critical for SEO, since Google will hit these URLs directly.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'characters', renderMode: RenderMode.Prerender },
  { path: 'characters/:slug', renderMode: RenderMode.Server },
  { path: 'movies', renderMode: RenderMode.Server },
  { path: 'movies/:slug', renderMode: RenderMode.Server },
  { path: 'lore', renderMode: RenderMode.Prerender },
  { path: 'battle-arena', renderMode: RenderMode.Prerender },
  { path: 'products', renderMode: RenderMode.Prerender },
  { path: 'instagram', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server },
];
