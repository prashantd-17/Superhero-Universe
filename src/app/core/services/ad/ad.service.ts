import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '../../config/app-config';
import { AdPlacement } from '../../models/ad';

/**
 * Configurable ad abstraction.
 *
 * The ad system is OFF by default and stays off until an ad network is
 * configured in `app-config.ts` (or a future backend). UI components only
 * ever use `<app-ad-slot placement="…">` — they never know which network
 * will serve the slot, so swapping providers is a config change, not a
 * code change.
 */
@Injectable({ providedIn: 'root' })
export class AdService {
  private readonly config = inject(APP_CONFIG);

  isEnabled(placement: AdPlacement): boolean {
    const ads = this.config.ads;
    return ads.enabled && ads.network !== null && ads.placements.includes(placement);
  }

  /** Active network name, or null when ads are disabled (UI reads this for data-attrs only). */
  get network(): string | null {
    const ads = this.config.ads;
    return ads.enabled && ads.network !== null ? ads.network : null;
  }
}
