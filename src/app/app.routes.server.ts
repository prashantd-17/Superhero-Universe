import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Server render strategy.
 *
 * - Static routes are prerendered at build time: the server ships complete
 *   HTML shells (navbar, hero, section scaffolds) with zero request cost.
 * - Movie archive/detail routes render their bundled data on demand, including
 *   query-string filters and actual poster markup. Online poster refresh runs
 *   only after hydration, so SSR never waits for an external provider.
 * - Character details still load their remote data after hydration.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'characters', renderMode: RenderMode.Prerender },
  { path: 'movies', renderMode: RenderMode.Server },
  { path: 'lore', renderMode: RenderMode.Prerender },
  { path: 'battle-arena', renderMode: RenderMode.Prerender },
  { path: 'products', renderMode: RenderMode.Prerender },
  { path: 'instagram', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server },
];
