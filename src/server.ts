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
import { buildRobots, buildSitemap, resolveSiteDeployment, siteForRequest } from './server/seo';
import type { SiteContext } from './app/core/models/site';

const browserDistFolder = join(import.meta.dirname, '../browser');

/** The Render domain is the canonical default; host/origin overrides stay server-side. */
const deployment = resolveSiteDeployment(process.env);
const app = express();
const angularApp = new AngularNodeAppEngine({
  allowedHosts: deployment.allowedHosts,
});

/** Validate request origins before generating canonical links, robots or a sitemap. */
app.use((req, res, next) => {
  const site = siteForRequest(
    {
      host: req.get('host'),
      forwardedHost: req.get('x-forwarded-host'),
      forwardedProto: req.get('x-forwarded-proto'),
      protocol: req.protocol,
    },
    deployment.preferredOrigin,
    deployment.allowedHosts,
  );
  if (!site) {
    res.status(400).type('text/plain').send('Invalid or unapproved request host.');
    return;
  }
  if (deployment.googleSiteVerification)
    site.googleSiteVerification = deployment.googleSiteVerification;
  res.locals['site'] = site;
  if (site.noindex) res.setHeader('X-Robots-Tag', 'noindex, follow');
  next();
});

app.get('/robots.txt', (_req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.vary('Host').vary('X-Forwarded-Host').vary('X-Forwarded-Proto');
  res.type('text/plain').send(buildRobots(res.locals['site'] as SiteContext));
});
app.get('/sitemap.xml', (_req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.vary('Host').vary('X-Forwarded-Host').vary('X-Forwarded-Proto');
  res.type('application/xml').send(buildSitemap((res.locals['site'] as SiteContext).origin));
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
    .handle(req, { site: res.locals['site'] })
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
