# Static deployment (Render / Netlify / Vercel / Cloudflare Pages)

The project builds to a fully-static `dist/superhero-universe/browser/`
directory. No Node server is required at runtime.

## Build

```bash
npm ci
npm run build
```

The build automatically regenerates `public/sitemap.xml` (940+ URLs — every
top-level page plus every character and movie slug) and `public/robots.txt` for
the production domain.

## Render Static Site settings

- **Build Command:** `npm ci && npm run build`
- **Publish Directory:** `dist/superhero-universe/browser`
- **Clean URLs / Pretty URLs:** enabled (recommended so `/characters` serves
  `/characters/index.html`)
- **SPA fallback / Rewrites:** add a single rewrite:
  - Source: `/*`
  - Destination: `/index.html`
  - Status: `200`
  The included `public/_redirects` already handles this for Netlify-style hosts;
  Render uses its own "Rewrite Rules" in the dashboard.
- **Headers (recommended):** long cache for `/assets/*` and hashed JS/CSS chunks,
  no-cache for `/sitemap.xml`, `/robots.txt` and `/index.html`.

If you deploy behind a custom domain later, set the environment variable
`SITE_URL=https://your-domain.com` before running `npm run build` so canonical
URLs, Open Graph URLs and the sitemap are regenerated to point at the new
domain. Then open Google Search Console for that new origin and submit the
sitemap.

## SEO notes

Google renders JavaScript on modern SPAs, so titles, meta tags and JSON-LD
pushed by `SeoService` are discovered. However:

1. **Indexing takes weeks**, not hours. A brand-new domain on a `.onrender.com`
   subdomain with zero backlinks will not appear on page 1 overnight.
2. Submitting the sitemap in Google Search Console is the fastest way to get
   every character URL discovered.
3. The site needs a few real inbound links (Instagram bio, Reddit posts, fan
   forums) to outrank Wikipedia / Fandom / IMDb for broad queries.
