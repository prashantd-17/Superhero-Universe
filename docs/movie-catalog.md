# Screen catalog and online artwork

## Coverage — reviewed 5 September 2026

The archive has **353 entries**:

| Group                                              | Entries |
| -------------------------------------------------- | ------: |
| Marvel live-action film entries                    |      99 |
| DC live-action film entries                        |      56 |
| Retained animated film (_Across the Spider-Verse_) |       1 |
| Marvel live-action and animated series             |      94 |
| DC live-action and animated series                 |     101 |
| Retained other series (_The Boys_, _Invincible_)   |       2 |

That is **156 films and 197 series**. The default `/movies` view now includes
**all types and styles**; series are not silently hidden behind film/live-action
filters. `/series` is a dedicated TV archive that also includes both styles.

### Films

The 155 live-action film entries retain the released MCU and DCEU/DCU features,
X-Men/Wolverine films, Raimi/Webb Spider-Man films, Sony's Spider-Man Universe,
Blade, Punisher, Fantastic Four, Ghost Rider and other Marvel legacy films;
classic Batman/Superman runs, DC standalone films, TV movies, imprint adaptations
and two distinct alternate cuts. "Film entries" includes TV movies and cuts,
not 155 different theatrical stories.

### Television

The expanded TV catalog includes:

- Marvel's classic live-action series, Agents of S.H.I.E.L.D., Agent Carter,
  Netflix-era series, Legion, The Gifted, Runaways, Cloak & Dagger, Helstrom and
  the released Disney+ live-action series through Wonder Man, plus Spider-Noir.
- DC classics, Smallville, the Arrowverse, Gotham, Titans, Doom Patrol, Swamp
  Thing, Stargirl, Superman & Lois, Peacemaker, The Penguin and Lanterns.
- Classic animated adaptations, the DC Animated Universe, Young Justice,
  Teen Titans, Harley Quinn, Creature Commandos, Marvel Anime's four distinct
  productions, X-Men ’97 and modern Marvel animation.
- Preschool series and licensed publisher-imprint adaptations, including Big
  Hero 6, Baymax!, Men in Black, Powers, Super Crooks, Lucifer, The Sandman,
  Sweet Tooth and other Vertigo adaptations.
- Some narrative web series and separately named broadcast anthologies. Their
  notes distinguish original shows, segment series and repackaged stories.

This is a broad **released, scripted television catalog**, not a list of every
trailer, promotional video, documentary, motion comic, special, unmade pilot or
announced future project. TV is not limited to MCU/DCU continuity. The original
five series and all original 28 deep links remain available.

## Identity and credit rules

- Preserve existing slugs. Namesakes are disambiguated: `daredevil` is the 2015
  series; `daredevil-2003` is the film. Likewise `watchmen` / `watchmen-2009`,
  `the-flash` / `the-flash-series`, and `batman-1966` / `batman-1966-series`.
- Years are **first release/broadcast years**, including premieres and pilot
  broadcasts. Notes explain _The Incredible Hulk_ (1977 pilot / 1978 weekly
  series), _Wolverine and the X-Men_ (2008 / 2009 US), _Superman II_ (1980/1981),
  _Kingsman_ (2014/2015) and _V for Vendetta_ (2005/2006).
- Principal casts are representative, not every credited performer. Unknown
  series creator/developer credits are omitted, never replaced with a guessed
  person or a comic character's creator. Some original-language anime casts are
  explicitly identified.
- Publisher and continuity are different. Imprints have their own collection;
  these adaptations are not automatically MCU/DCU stories. Toei/Marvel
  collaborations are explicitly identified rather than described as Avengers
  adaptations. Television-origin properties and broadcast repackagings have notes.
- Announced/unreleased projects such as VisionQuest and unmade pilots such as
  Marvel's Most Wanted are not presented as released series. The 1994 Fantastic
  Four and Batgirl films remain excluded as unreleased.
- Descriptions are original editorial summaries. No guessed ratings, runtimes,
  complete episode counts or current streaming availability are published.

## References

Every title links to its exact Wikipedia article. Coverage was checked against:

- https://www.marvel.com/movies and https://www.marvel.com/tv-shows
- https://www.dc.com/movies and https://www.dc.com/tv
- https://en.wikipedia.org/wiki/List_of_films_based_on_Marvel_Comics_publications
- https://en.wikipedia.org/wiki/List_of_films_based_on_DC_Comics_publications
- https://en.wikipedia.org/wiki/List_of_television_series_based_on_Marvel_Comics_publications
- https://en.wikipedia.org/wiki/List_of_television_series_based_on_DC_Comics_publications

Some series artwork was matched by exact title, year and language through the
public TVmaze API. These entries retain an **Artwork reference (TVmaze)** link.
TVmaze data attribution/license information: https://www.tvmaze.com/api#licensing

## Artwork behavior

Cards and detail pages render real studio/Wikimedia artwork, with selected TVmaze
posters where necessary. This is not generated movie imagery.

1. A saved, verified artwork URL renders immediately, including in SSR markup.
2. After hydration, a same-origin **`GET /api/movie-posters`** checks Wikimedia for
   updated artwork using exact catalog titles, never a runtime fuzzy search.
3. Studio artwork remains preferred when its Wiki fallback is unchanged.
   Refresh failures preserve the existing data. If an image fails, the component
   tries its distinct saved fallback once, then shows a labeled unavailable state.
4. Some general TV articles expose only a logo or title card. Studio/season
   posters are preferred, and landscape images from a new series lookup are not
   allowed to overwrite a selected poster. Curated historical title cards remain
   valid fallback artwork; `contain` preserves the whole image.
5. The four Marvel Anime titles have distinct, fixed posters and separate TVmaze
   references, even though their Wikipedia reference article is shared.

**Saved URLs are not bundled offline images.** External image hosts must be
reachable. The older _Justice League of America_ TV pilot has an archived title
card, not a theatrical poster. _The Kid Super Power Hour with Shazam!_ currently
has no verified series-specific artwork; its detail page states that rather than
substituting an unrelated image. Some series use artwork from a later season;
the displayed year remains the series' first broadcast year.

All artwork belongs to its respective rights holders. The app does not grant
redistribution rights or claim ownership. Review provider/studio terms for your
deployment, especially commercial use.

### Refresh limits and safety

- At most 50 titles per lookup, with **four concurrent upstream requests** maximum.
- One shared in-flight refresh and a 24-hour in-memory cache. Failed/partial
  checks back off for five minutes and retain the previous URLs.
- Four-second upstream timeouts and a ten-second client deadline. SSR does not
  wait for any external API.
- The endpoint accepts no arbitrary URL, hostname, title or API key. Live image
  responses are restricted to HTTPS Wikimedia raster URLs without credentials
  or custom ports. Curated studio/TVmaze mappings remain separate.
- `source` is `live`, `partial` or `snapshot`. `checkedAt` represents a successful
  full eligible API lookup, not proof that every CDN image is reachable.
- This refresh updates artwork links, not textual credits or automatic release
  discovery. No browser credentials are required.

## Maintenance and checks

Data is split into MCU, Marvel/DC films, TV movies, imprints, retained extras,
Marvel/DC live-action series and Marvel/DC animated series under
`src/app/core/data-access/movie/data/`.

When adding a title, verify its release, unique slug, format, principal cast,
source article and artwork. Keep first-air years separate from season artwork.
Update the reviewed date only after reviewing content, and update coverage tests
when intentionally changing the catalog scope.

```bash
npm run movies:refresh-posters  # Updates Wiki film/series snapshots only after a full check
npm run test:server             # Catalog, source/hash integrity, API cache/security and sitemap
npm run test:ci                 # Components, filters, image handling and SEO; needs Chromium
npm run test:browser            # Mobile overflow, series discovery, navigation and SSR
npm run build
```

The refresh command leaves both snapshots untouched if the upstream check fails
or is partial. Studio/TVmaze URLs are not accidentally written into Wiki snapshots.
Review the resulting diff before publishing.

Deployment and Google Search Console steps: [search and SEO guide](search-and-seo.md).
