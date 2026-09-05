# The Superhero Universe

Production: **https://superhero-universe.onrender.com/**

The official web platform for **@thesuperhero_universe** — a dark, cinematic, sci-fi
character archive and community hub for Marvel & DC fans.

Built with **Angular 20** (standalone components, SCSS, RxJS, SSR,
zone-based change detection). No UI frameworks, no state libraries — clean,
modular architecture with a hard data-source boundary so the frontend can be
repointed to a real backend later without a rewrite.

---

## Quick start

```bash
npm install
npm start            # dev server with SSR at http://localhost:4200
npm run build        # production browser + server build (request-time SSR)
node dist/superhero-universe/server/server.mjs   # run the production server
```

Node 22 LTS is recommended (Angular 20 requires at least Node 20.19).

## Pages

| Route                                | What it is                                                                        |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| `/`                                  | Home — hero, universe countdown, explore grid, trending, facts, timeline          |
| `/characters`                        | Full character database (563 entries), search + universe/alignment filters        |
| `/characters/:slug`                  | Character dossier — power stats, biography, appearance, work, connections         |
| `/movies`                            | 353 film/TV titles; real artwork, search, filters, sorting & crawlable pagination |
| `/series`                            | Dedicated TV archive: 197 live-action and animated series                         |
| `/universes/marvel`, `/universes/dc` | Linked publisher guides with characters, films, TV and continuity notes           |
| `/movies/:slug`                      | SSR movie dossier — real poster, verified credits, synopsis & source links        |
| `/lore`                              | Comics & Lore archive, cosmic entities, interactive MCU/DCU timeline              |
| `/battle-arena`                      | Side-by-side 6-stat hero comparison with local fan voting                         |
| `/products`                          | Fan shop (affiliate links, JSON-driven, no payments)                              |
| `/instagram`                         | Follow funnel for @thesuperhero_universe                                          |
| `**`                                 | 404 page                                                                          |

## Architecture

```
src/app
├── core/                    # Singleton business logic — no templates
│   ├── config/              #   APP_CONFIG (brand, API, ads) — single edit point
│   ├── models/              #   Internal domain models (Superhero, Movie, Product, …)
│   ├── data-access/         #   Data source abstractions + implementations
│   │   ├── character/       #     CharacterDataSource (abstract)
│   │   │   └── akabab-…     #     Akabab API (CDN) + bundled snapshot fallback
│   │   ├── movie/           #     Verified film archive + keyless live poster refresh
│   │   └── product/         #     JSON V1 product list
│   ├── services/            #   Character/Movie/Product/Lore/Fact/Seo/Ad/Asset services
│   └── state/               #   Generic StateStore<T> (idle/loading/success/error)
├── shared/                  # Reusable UI kit (cards, badges, skeletons, states)
└── features/                # One folder per route (page + private sub-components)
```

Key decisions:

- **Data-source boundary.** The UI only ever sees internal `Superhero`/`Movie`/
  `Product` models via `CharacterDataSource` & co. Swapping Akabab for a backend
  = replacing one `useClass` in `app.config.ts` (marked "DATA SOURCE SWAP POINT").
- **Server strategy.** Indexable pages use request-time **SSR** with the actual
  public origin and complete catalog data. Character pages use the server-only
  bundled snapshot and transfer it to the browser, so crawlers see real profiles
  and hydration does not repeat the download. No SSR page waits on a third-party API.
- **SEO.** `SeoService` updates/deduplicates titles, descriptions, canonicals and
  social metadata. It publishes a safe WebSite/Organization graph and entity
  metadata; `/sitemap.xml` and `/robots.txt` are generated from the current catalog
  and configured production domain. Missing pages are HTTP 404/noindex. Preview hosts are not indexed.
- **State.** One generic `StateStore<T>` powers every feature state; on error
  the previous data is kept so the layout never collapses.
- **Ads.** `AdSlot` + `AdService` are in place but **off by default** — enable
  per placement in `core/config/app-config.ts` once a network is configured.
- **Resilience.** Character data: jsDelivr CDN primary, bundled 563-entry
  snapshot fallback (works fully offline/air-gapped).
- **Accessibility.** Skip link, semantic landmarks, focus-visible styles,
  `prefers-reduced-motion` disables all animation.

## Deploy (Render)

1. Push this repo to Git and create a **Web Service** on Render.
2. Build command: `npm ci && npm run build` — Start command:
   `node dist/superhero-universe/server/server.mjs`.
   Use the Node/Express server, not just static hosting, for live poster refresh.
3. In the existing Render service's **Environment** settings, use:

   ```text
   SITE_URL=https://superhero-universe.onrender.com
   NG_ALLOWED_HOSTS=superhero-universe.onrender.com
   ```

   Render supplies `PORT` automatically. The updated code defaults to this Render
   URL even if `SITE_URL` is unset; localhost/Arena previews remain `noindex`.
   `SITE_URL` can override the default when a custom domain is introduced.

4. For Google verification, create a **URL-prefix** Search Console property for
   `https://superhero-universe.onrender.com/`. Set `GOOGLE_SITE_VERIFICATION` to
   the public `content` value supplied by its HTML-tag verification method, then
   redeploy and verify. Never put account credentials in this setting.
5. Deploy the updated source and inspect the generated `/robots.txt` and
   `/sitemap.xml`, then submit `sitemap.xml` in Search Console. No manual sitemap
   edits are needed: [deployment/search checklist](docs/search-and-seo.md).

The live site was still serving the old placeholder sitemap when checked on
5 September 2026. Local edits and environment examples do not update Render;
the saved fixes must be published and redeployed first.

## Content & data sources (what is real, what is curated)

- **Characters (563):** real data from the Akabab Superhero API v0.3.0
  (`/all.json`), mapped to the internal model. Publisher variants
  (e.g. "Superman Prime One-Million") are bucketed under the "Other" universe.
- **Movies & TV:** 353 entries: **155 released live-action film entries** (99 Marvel,
  56 DC), one retained animated film and **197 series** (94 Marvel, 101 DC, two other). Credits and
  descriptions live in `core/data-access/movie/data/`; every entry has a reference
  link. Real studio/Wikimedia artwork loads online, with keyless background poster
  checks via `/api/movie-posters`, cached for 24 hours. No fabricated ratings or
  runtime values. Scope, year conventions and maintenance: [movie catalog guide](docs/movie-catalog.md).
- **Products:** manually curated JSON in `core/data-access/product/data/`, ready
  for a CMS/DB replacement.
- **Lore, facts, timeline:** real, well-documented comics history, curated in
  `core/services/lore/lore-data.ts`. **No invented comic history** — where
  real data is missing, the UI simply omits the field.
- **Battle voting:** local-only (localStorage) in V1, ready to lift to a
  backend behind the same service interface.

## Future (scaffolded, not built)

- Swap `CharacterDataSource` → own API/database (single DI change).
- Optional licensed movie metadata/rating provider (the current poster refresh requires no API key).
- Battle-arena voting backend, community features, universe map, global search.
- Admin/backend and payments are explicitly out of V1 scope.

## Movie archive checks

```bash
npm run test:server             # Catalog integrity + poster API/cache/security tests
npm run test:ci                 # Angular component/service/filter tests; requires Chrome/Chromium
npm run movies:refresh-posters  # Update film and series Wikimedia fallback snapshots
npx playwright install chromium
npm run test:browser             # Mobile layout, series discovery, metadata and SSR regressions
```

Set `CHROME_BIN` if Chrome is not on the standard path. Poster refresh leaves the
snapshots untouched if the upstream lookup fails or is incomplete. Production
builds do not fetch Google Fonts at build time; the existing browser font links
remain in place. External poster images still require internet access.

## Mobile and search visibility

Product grids use one column on narrow phones, two on larger screens and four on
wide desktops. Shrinkable grid tracks, wrapping card content and minimum tap
sizes prevent horizontal overflow without clipping the document. Browser tests
cover the main pages at 320, 360, 390, 768, 1024 and 1280 pixels, plus keyboard use
of the mobile menu.

The SEO changes improve crawlability and accurate page descriptions; they cannot
guarantee Google rankings for broad terms such as “Marvel”, “DC” or “superhero”.
Publishing useful original content and completing the owner's Google Search
Console setup are separate requirements. See [search and SEO](docs/search-and-seo.md).
