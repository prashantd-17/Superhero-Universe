import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { type NextFunction, type Request, type Response } from 'express';
import { join } from 'node:path';
import { REQUEST_CONTEXT } from '@angular/core';
import { CURATED_MOVIES } from './app/core/data-access/movie/data/movie-data';
import { MoviePosterCatalog } from './server/movie-posters';
import {
  buildRobots,
  buildSitemap,
  resolveSiteDeployment,
  siteForRequest,
} from './server/seo';

const browserDistFolder = join(import.meta.dirname, '../browser');

/**
 * SSR request-host allowlist (SSRF protection) + preferred canonical origin.
 *
 * Set SITE_URL to the production origin (https://superhero-universe.onrender.com
 * or your custom domain). Set NG_ALLOWED_HOSTS as a comma-separated list of
 * additional hostnames the Node process should answer for. Without SITE_URL,
 * canonical URLs fall back to the request's own host (X-Forwarded-Host on Render).
 */
const deployment = resolveSiteDeployment(process.env);

const app = express();
const angularApp = new AngularNodeAppEngine({
  allowedHosts: deployment.allowedHosts,
});

/** Same-origin, credential-free artwork refresh. */
const moviePosters = new MoviePosterCatalog(CURATED_MOVIES);
app.get('/api/movie-posters', (_req: Request, res: Response, next: NextFunction) => {
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
 * Dynamically serve /sitemap.xml and /robots.txt so the origin always matches
 * the public URL (including when Render forwards via onrender.com or a future
 * custom domain). The static public/ files for these paths are intentionally
 * removed (they previously had {{ROOT}} placeholders and a commented sitemap line).
 */
app.get('/sitemap.xml', (req: Request, res: Response) => {
  const site = siteForRequest(
    {
      host: req.headers['x-forwarded-host']?.toString() ?? req.headers.host,
      forwardedProto: req.headers['x-forwarded-proto']?.toString(),
      protocol: req.protocol,
    },
    deployment.preferredOrigin,
    deployment.allowedHosts,
  );
  const origin = site?.origin ?? deployment.preferredOrigin;
  res.type('application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(buildSitemap(origin));
});

app.get('/robots.txt', (req: Request, res: Response) => {
  const site =
    siteForRequest(
      {
        host: req.headers['x-forwarded-host']?.toString() ?? req.headers.host,
        forwardedProto: req.headers['x-forwarded-proto']?.toString(),
        protocol: req.protocol,
      },
      deployment.preferredOrigin,
      deployment.allowedHosts,
    ) ?? { origin: deployment.preferredOrigin, noindex: false };
  res.type('text/plain');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(buildRobots(site));
});

/**
 * Serve static files from /browser.
 * index:false + redirect:false ensure /sitemap.xml and /robots.txt always hit
 * the dynamic routes above and are never served as static files.
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
    setHeaders: (res: Response, filePath: string) => {
      if (filePath.endsWith('/sitemap.xml') || filePath.endsWith('/robots.txt')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 * Provide REQUEST_CONTEXT so the Angular app knows the canonical origin.
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  const site = siteForRequest(
    {
      host: req.headers['x-forwarded-host']?.toString() ?? req.headers.host,
      forwardedProto: req.headers['x-forwarded-proto']?.toString(),
      protocol: req.protocol,
    },
    deployment.preferredOrigin,
    deployment.allowedHosts,
  );

  const extraProviders = site ? [{ provide: REQUEST_CONTEXT, useValue: { site } }] : [];

  angularApp
    .handle(req, { serverProviders: extraProviders })
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/** Health ping for Render. */
app.get('/healthz', (_req: Request, res: Response) => res.status(200).send('ok'));

/**
 * Start the server. Listens on PORT (Render sets this) or 4000 locally.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = Number(process.env['PORT'] || 4000);
  app.listen(port, '0.0.0.0', (error?: Error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://0.0.0.0:${port}`);
    console.log(`Preferred origin: ${deployment.preferredOrigin}`);
    console.log(`Allowed hosts: ${deployment.allowedHosts.join(', ')}`);
    console.log(`Sitemap: ${deployment.preferredOrigin}/sitemap.xml`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
