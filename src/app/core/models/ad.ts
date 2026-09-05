/**
 * Ad system contracts.
 *
 * The UI only knows about placements. Which ad network actually serves a
 * slot (AdSense, or something else) is decided entirely by configuration +
 * `AdService`, so swapping providers never touches components.
 */
export type AdPlacement =
  | 'home-top'
  | 'home-middle'
  | 'character-top'
  | 'character-middle'
  | 'movie-top'
  | 'article-middle'
  | 'shop-sidebar'
  | 'footer';

export interface AdConfig {
  /** Master switch. Keep `false` until an ad network has been approved. */
  enabled: boolean;
  /** Ad network identifier ('adsense', …) — consumed by the slot, not the UI. */
  network: string | null;
  /** Placements where ads are allowed to render. */
  placements: readonly AdPlacement[];
}
