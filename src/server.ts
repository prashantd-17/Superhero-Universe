import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { CURATED_MOVIES } from './app/core/data-access/movie/data/movie-data';
import { MoviePosterCatalog } from './server/movie-posters';

const browserDistFolder = join(import.meta.dirname, '../browser');

/**
 * SSR request-host allowlist (SSRF protection).
 *
 * Set NG_ALLOWED_HOSTS as a comma-separated list in production
 * (e.g. "www.thesuperherouniverse.com,thesuperherouniverse.com").
 * Without it the site accepts any host — fine for this public, static-first
 * site (the server never fetches user-supplied URLs), but lock it down for
 * defense in depth.
 */
const envHosts = process.env['NG_ALLOWED_HOSTS']
  ?.split(',')
  .map((h) => h.trim())
  .filter(Boolean);

const app = express();
const angularApp = new AngularNodeAppEngine({
  allowedHosts: envHosts && envHosts.length > 0 ? envHosts : ['*'],
});

/** Same-origin, credential-free artwork refresh; never accepts arbitrary upstream URLs. */
const moviePosters = new MoviePosterCatalog(CURATED_MOVIES);
app.get('/api/movie-posters', (_req, res, next) => {
  // Do not return Angular's ZoneAwarePromise to Express as a route handler.
  moviePosters
    .get()
    .then((result) => {
      res.setHeader(
        'Cache-Control',
        result.source === 'live'
          ? 'public, max-age=3600, stale-while-revalidate=86400'
          : 'public, max-age=300',
      );
      res.json(result);
    })
    .catch(next);
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(Number(port), '0.0.0.0', (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
