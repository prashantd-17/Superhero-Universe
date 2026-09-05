import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { APP_CONFIG, defaultAppConfig } from './core/config/app-config';
import { CharacterDataSource } from './core/data-access/character/character-data-source';
import { ActorAugmentedCharacterDataSource } from './core/data-access/character/actor-augmented-character-data-source';
import { MovieDataSource } from './core/data-access/movie/movie-data-source';
import { CuratedMovieDataSource } from './core/data-access/movie/curated-movie-data-source';
import { ProductDataSource } from './core/data-access/product/product-data-source';
import { JsonProductDataSource } from './core/data-access/product/json-product-data-source';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    // withFetch() is required for HttpClient to work on the server (SSR).
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),

    // Single place for brand + API + ads configuration.
    { provide: APP_CONFIG, useValue: defaultAppConfig },

    // Standalone apps must provide the base href themselves (used by the SEO
    // service for canonical URLs and by the asset service for absolute paths).
    { provide: APP_BASE_HREF, useValue: '/' },

    // ── DATA SOURCE SWAP POINT ────────────────────────────────────────────
    // The whole UI depends on the abstractions below, not on the concrete
    // implementations. Migrating to our own backend later means replacing
    // `useClass` here (and in the server config) — no component changes.
    // The character source augments Akabab with the curated live-action
    // actor archive (actor entries are flagged via `liveAction`).
    { provide: CharacterDataSource, useClass: ActorAugmentedCharacterDataSource },
    { provide: MovieDataSource, useClass: CuratedMovieDataSource },
    { provide: ProductDataSource, useClass: JsonProductDataSource },
  ],
};
