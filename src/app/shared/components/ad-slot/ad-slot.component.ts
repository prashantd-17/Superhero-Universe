import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { AdPlacement } from '../../../core/models/ad';
import { AdService } from '../../../core/services/ad/ad.service';

/**
 * Reusable ad slot: `<app-ad-slot placement="character-middle" />`.
 *
 * Renders nothing while the ad system is disabled (default). Once an ad
 * network is configured in app-config.ts and this placement is allowlisted,
 * the slot container is mounted — the network's script/markup can be
 * attached here in a single place without touching any page template.
 */
@Component({
  selector: 'app-ad-slot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (service.isEnabled(placement)) {
      <div class="ad-slot" [attr.data-placement]="placement"
           [attr.data-network]="service.network ?? ''"></div>
    }
  `,
  styles: `
    .ad-slot {
      min-height: 90px;
      margin: 1.5rem auto;
      display: grid;
      place-items: center;
      border: 1px dashed rgba(148, 163, 184, 0.18);
      border-radius: 12px;
      color: rgba(148, 163, 184, 0.4);
      font-family: var(--font-ui);
      font-size: 0.7rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
    }
  `,
})
export class AdSlotComponent {
  protected readonly service = inject(AdService);

  @Input() placement: AdPlacement = 'footer';
}
