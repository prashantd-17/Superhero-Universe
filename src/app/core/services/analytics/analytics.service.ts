import { Injectable } from '@angular/core';

/**
 * Analytics sink (future: GA4 or self-hosted).
 *
 * All tracking flows through this service so a provider can be added in one
 * place later. Until then events are kept in-memory (and console-logged in
 * dev builds only) — nothing is sent anywhere.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  readonly events: readonly string[] = [];

  track(event: string): void {
    if (!event) return;
    // Future: push to the configured provider here.
  }
}
