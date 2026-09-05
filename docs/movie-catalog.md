# Movie catalog and online posters

## Coverage (reviewed 5 September 2026)

The archive has **161 entries**:

- **99 Marvel live-action film entries:** all 38 released MCU features; all 13
  Fox-era X-Men/Wolverine/Deadpool features; the five Raimi/Webb Spider-Man films;
  all six Sony Spider-Man Universe films; Blade, Fantastic Four, Punisher,
  Ghost Rider, Hulk, Daredevil, Elektra, Howard the Duck and other legacy films;
  standalone TV movies and the three Nicholas Hammond Spider-Man film releases;
  plus the Men in Black, Kick-Ass and Kingsman imprint adaptations/sequels.
- **56 DC live-action film entries:** theatrical features from _Superman and the
  Mole Men_ to _Supergirl_ (2026), the DCEU, the new DCU, classic Batman/Superman
  runs, standalone films, Vertigo/WildStorm/Paradox adaptations, two standalone
  TV movies, and the separately released Donner/Snyder alternate cuts.
- The **original selected animation/TV shelf** remains: _Across the Spider-Verse_,
  _Daredevil_, _Loki_, _Watchmen_, _The Boys_ and _Invincible_. This is **not** an
  exhaustive animation or television-series catalog.

“Film entries” includes TV films and two distinct alternate cuts; it does not mean
155 different theatrical stories. The default view shows live-action films.
Change Type/Style or choose **Clear filters** to browse the entire shelf.

### Scope and identity rules

- Released, licensed narrative features and standalone TV movies are in scope.
  Shorts, theatrical serials, documentaries, unaired pilots, unlicensed versions,
  and most episode-only video compilations are not. The Hammond Spider-Man
  compilations are included because they had their own international theatrical
  releases. The _Incredible Hulk_ and _Flash_ series' other repackaged episodes
  are not counted as additional standalone features.
- Unreleased projects such as _Batgirl_ and the 1994 _Fantastic Four_ are not
  represented as released films. Announced future releases are not added merely
  because their planned release year matches the current year.
- Dates use **first release year**, including festival premieres. Notes explain
  the later wide releases for _Superman II_ (1980/1981), _Ghost Rider: Spirit of
  Vengeance_ (2011/2012), _Kingsman_ (2014/2015), and _V for Vendetta_ (2005/2006).
- All original 28 detail slugs are preserved. Namesakes use disambiguated slugs:
  `daredevil` is the series; `daredevil-2003` is the film. Likewise `watchmen` and
  `watchmen-2009`, `superman-1978` and `superman-2025`.
- Publisher is not continuity. Marvel/DC **imprints have separate collections**;
  the interface never claims _Men in Black_, _Kingsman_, _RED_, etc. are MCU/DCU
  films. “Collection” is a browsing group, not a shared-universe assertion.
- Principal cast is representative, not every credited performer. Descriptions
  are original editorial summaries. Ratings, runtimes, box office and exact
  release dates are omitted rather than guessed.

## Sources

Every title stores an exact, disambiguated English Wikipedia article and exposes
it as a source link on its detail page. Coverage was cross-checked against:

- Marvel's official film archive: https://www.marvel.com/movies
- DC's official film archive: https://www.dc.com/movies
- Marvel filmography (including imprints and TV movies):
  https://en.wikipedia.org/wiki/List_of_films_based_on_Marvel_Comics_publications
- DC filmography (including imprints and TV movies):
  https://en.wikipedia.org/wiki/List_of_films_based_on_DC_Comics_publications

The 2026 releases were also checked against the current publisher listings. The
reference links allow an editor to verify or amend individual credits without
searching for an ambiguous title.

## What “online posters” means

The app no longer creates text-only pretend posters. Both cards and detail pages
render **real release artwork** from verified HTTPS URLs:

1. Prefer a verified public studio image when available (`studio-posters.ts`).
2. Otherwise use the movie's verified Wikimedia artwork (`movie-posters.ts`).
3. After hydration, request **`GET /api/movie-posters`** once per browser session.
   The Node server uses Wikimedia's public PageImages API to check for current
   artwork for the exact catalog article/season, never a fuzzy title search.
4. A changed image replaces the initial image. If that image fails, the image
   component tries the saved Wikimedia URL (deduplicated), then shows a clearly
   labeled, layout-safe unavailable state. A failed optional refresh never empties
   the movie list or removes trusted metadata.

Posters still require access to the external image host. **Saved URLs are not
bundled offline image files.** If all image hosts are blocked, the title and movie
information stay visible but the artwork cannot load. Some older releases use
original horizontal posters or home-video covers; `object-fit: contain` preserves
the entire artwork rather than cropping it into a different poster. The older
_Justice League of America_ TV pilot currently has an authentic title card rather
than a verified theatrical poster; its detail page explicitly notes this.

For series, a `posterPageTitle` override selects season-one artwork instead of a
main-article logo. The original studio art remains preferred when the online
Wikimedia image is unchanged. Logos from a refreshed API response are not allowed
to replace a proper poster.

### Caching and safety

- Lookup batches contain at most 50 known titles (four requests for this catalog).
- All users share a 24-hour in-memory cache and a single in-flight refresh. A
  failed/partial refresh backs off for five minutes and keeps last-known URLs.
- Each upstream request has a four-second deadline. The client has a ten-second
  overall deadline. Initial rendering and SSR never wait on this request.
- The endpoint accepts **no user-supplied upstream URL or movie search**. Image
  responses are restricted to HTTPS raster images under Wikimedia's `en`/`commons`
  paths, with no credentials, custom ports, script URLs or arbitrary hosts.
- `source` reports `live`, `partial` or `snapshot`; `checkedAt` is the last
  successful full API check, not a fabricated “last updated” date. A successful
  lookup does not guarantee that every image is reachable on a user's network.
- This is an **artwork refresh**, not automatic film discovery or a live ratings
  feed. New films and credit corrections require a catalog update.
- No API key, browser secret, third-party browser JSON request, or `localhost`
  browser-facing backend URL is needed. Run the provided Node server in production.

Poster copyrights remain with their respective owners. The app links to its
sources and identifies the artwork owners; it does not claim ownership or grant
redistribution rights. Review the relevant studio/Wikimedia image terms for your
deployment, especially commercial use. No generated movie artwork is used.

## Maintenance

- Film data is split into `mcu-movies.ts`, `marvel-movies.ts`, `dc-movies.ts`,
  `imprint-movies.ts`, `tv-movies.ts` and `screen-extras.ts` under
  `src/app/core/data-access/movie/data/`.
- Add a unique slug, correct year, release format, director/creator, principal
  cast, editorial synopsis, collection and exact source article. Provide verified
  artwork before publishing; `artwork()` refuses a missing snapshot entry.
- Check the original poster's source, not a search thumbnail or a guessed CDN ID.
  Update `CATALOG_REVIEWED_AT` only after actually reviewing the catalog.
- Refresh saved artwork URLs with:

  ```bash
  npm run movies:refresh-posters
  ```

  The command refuses to overwrite the snapshot during an upstream failure or
  partial response. Review the resulting diff before publishing. This command
  does not alter cast, years or the reviewed date of the movie catalog.

## Checks

```bash
npm run test:server
npm run test:ci                  # Chrome/Chromium, or set CHROME_BIN
npm run build
```

Tests cover coverage counts and legacy links, poster filename/hash integrity,
corrected credits, live-action classification, filtering/search/sort, URL state,
pagination, route reuse and SEO, cached-image hydration, image-source changes,
failed refreshes, timeout behavior, request deduplication and unsafe provider URLs.
No test requires a real external API response. Successful real-network checks
should be performed separately in the deployment environment.
