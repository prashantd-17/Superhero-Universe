import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Server render strategy.
 *
 * - Static routes are prerendered at build time: the server ships complete
 *   HTML shells (navbar, hero, section scaffolds) with zero request cost.
 * - Parameterized routes (characters/:slug, movies/:slug) render on demand
 *   with SSR. Data itself loads client-side after hydration, so the server
 *   emits loading scaffolds — no per-entity prerender list is needed and
 *   the build stays fast.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'characters', renderMode: RenderMode.Prerender },
  { path: 'movies', renderMode: RenderMode.Prerender },
  { path: 'lore', renderMode: RenderMode.Prerender },
  { path: 'battle-arena', renderMode: RenderMode.Prerender },
  { path: 'products', renderMode: RenderMode.Prerender },
  { path: 'instagram', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server },
];
