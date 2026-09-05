import { Directive, HostListener, Input, inject } from '@angular/core';
import { AnalyticsService } from '../../core/services/analytics/analytics.service';

/**
 * Lightweight click tracking hook for future analytics.
 * Usage: `<a appTrack="cta_enter_universe" ...>`
 *
 * No external analytics are wired up yet — the service is a no-op sink
 * until a provider (GA4, etc.) is configured.
 */
@Directive({ selector: '[appTrack]', standalone: true })
export class TrackDirective {
  private readonly analytics = inject(AnalyticsService);

  @Input('appTrack') event = '';

  @HostListener('click')
  handleClick(): void {
    this.analytics.track(this.event);
  }
}
