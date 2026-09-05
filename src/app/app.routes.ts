import { Routes } from '@angular/router';

/**
 * All routes are lazy-loaded (code splitting).
 * Server rendering config lives in app.routes.server.ts (prerender + SSR).
 * Page titles are owned by SeoService (applied in each page component) so the
 * full brand-suffixed title is what gets serialized; router-level titles
 * would clobber them during navigation.
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/home/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./features/characters/characters-page.component').then(
        (m) => m.CharactersPageComponent,
      ),
  },
  {
    path: 'characters/:slug',
    loadComponent: () =>
      import('./features/characters/character-detail-page.component').then(
        (m) => m.CharacterDetailPageComponent,
      ),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./features/movies/movies-page.component').then((m) => m.MoviesPageComponent),
  },
  {
    path: 'movies/:slug',
    loadComponent: () =>
      import('./features/movies/movie-detail-page.component').then(
        (m) => m.MovieDetailPageComponent,
      ),
  },
  {
    path: 'lore',
    loadComponent: () =>
      import('./features/lore/lore-page.component').then((m) => m.LorePageComponent),
  },
  {
    path: 'battle-arena',
    loadComponent: () =>
      import('./features/battle-arena/battle-arena-page.component').then(
        (m) => m.BattleArenaPageComponent,
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products-page.component').then((m) => m.ProductsPageComponent),
  },
  {
    path: 'instagram',
    loadComponent: () =>
      import('./features/instagram/instagram-page.component').then(
        (m) => m.InstagramPageComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
