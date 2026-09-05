# The Superhero Universe

The official web platform for **@thesuperhero_universe** — a dark, cinematic, sci-fi
character archive and community hub for Marvel & DC fans.

Built with **Angular 20** (standalone components, SCSS, RxJS, SSR + prerendering,
zone-based change detection). No UI frameworks, no state libraries — clean,
modular architecture with a hard data-source boundary so the frontend can be
repointed to a real backend later without a rewrite.

---

## Quick start

```bash
npm install
npm start            # dev server with SSR at http://localhost:4200
npm run build        # production build (browser + server bundles, 7 prerendered routes)
node dist/superhero-universe/server/server.mjs   # run the production server
```

Node 20+ required.

## Pages

| Route                | What it is                                                                  |
| -------------------- | --------------------------------------------------------------------------- |
| `/`                  | Home — hero, universe countdown, explore grid, trending, facts, timeline    |
| `/characters`        | Full character database (563 entries), search + universe/alignment filters  |
| `/characters/:slug`  | Character dossier — power stats, biography, appearance, work, connections   |
| `/movies`            | Curated movies & TV archive (search + universe/genre filters)               |
| `/movies/:slug`      | Movie detail — synopsis, cast, universe context                             |
| `/lore`              | Comics & Lore archive, cosmic entities, interactive MCU/DCU timeline        |
| `/battle-arena`      | Side-by-side 6-stat hero comparison with local fan voting                   |
| `/products`          | Fan shop (affiliate links, JSON-driven, no payments)                        |
| `/instagram`         | Follow funnel for @thesuperhero_universe                                    |
| `**`                 | 404 page                                                                    |

## Architecture

```
src/app
├── core/                    # Singleton business logic — no templates
│   ├── config/              #   APP_CONFIG (brand, API, ads) — single edit point
│   ├── models/              #   Internal domain models (Superhero, Movie, Product, …)
│   ├── data-access/         #   Data source abstractions + implementations
│   │   ├── character/       #     CharacterDataSource (abstract)
│   │   │   └── akabab-…     #     Akabab API (CDN) + bundled snapshot fallback
│   │   ├── movie/           #     Curated in-repo archive (TMDB-shaped)
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
- **Server strategy.** The 7 static routes are **prerendered** at build time;
  `:slug` routes are **SSR** on demand. Databases load client-side after
  hydration (`afterNextRender` + `isPlatformBrowser`), so the server emits fast
  scaffolds and never blocks on third-party APIs.
- **SEO.** `SeoService` owns titles, meta, canonical and JSON-LD per page.
  Detail pages get slug-derived titles + canonicals in the constructor (unique
  per URL on the server) and upgrade to full data-driven SEO when the archive
  loads. No `title` on routes — the router would clobber the service.
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
2. Build command: `npm ci` — Start command:
   `node dist/superhero-universe/server/server.mjs` (or add a build step
   `npm run build` before the start command).
3. Environment:
   - `PORT` — set by Render automatically.
   - `NG_ALLOWED_HOSTS` (recommended) — comma-separated production hostnames,
     e.g. `www.yourdomain.com,yourdomain.com`. Enables Angular's SSR host
     allowlist; without it the site accepts any host (documented in
     `src/server.ts`).
4. Replace the `{{ROOT}}` placeholder in `public/sitemap.xml` and
   `public/robots.txt` with your production URL.
5. Redeploy — the build prerenders the 7 static routes automatically.

## Content & data sources (what is real, what is curated)

- **Characters (563):** real data from the Akabab Superhero API v0.3.0
  (`/all.json`), mapped to the internal model. Publisher variants
  (e.g. "Superman Prime One-Million") are bucketed under the "Other" universe.
- **Movies & products:** manually curated JSON in `core/data-access/…/data/` —
  deliberately structured so a CMS/DB can replace them.
- **Lore, facts, timeline:** real, well-documented comics history, curated in
  `core/services/lore/lore-data.ts`. **No invented comic history** — where
  real data is missing, the UI simply omits the field.
- **Battle voting:** local-only (localStorage) in V1, ready to lift to a
  backend behind the same service interface.

## Future (scaffolded, not built)

- Swap `CharacterDataSource` → own API/database (single DI change).
- TMDB-backed movie details (models already TMDB-shaped).
- Battle-arena voting backend, community features, universe map, global search.
- Admin/backend and payments are explicitly out of V1 scope.
