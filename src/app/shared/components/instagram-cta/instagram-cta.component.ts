import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { APP_CONFIG } from '../../../core/config/app-config';
import { TrackDirective } from '../../directives/track.directive';

/**
 * The Instagram funnel — the website is the digital extension of
 * @thesuperhero_universe, and this component drives the loop back.
 */
@Component({
  selector: 'app-instagram-cta',
  imports: [TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ig-panel">
      <div class="ring">
        <div class="avatar" aria-hidden="true">
          <svg viewBox="0 0 64 64" width="44" height="44">
            <path
              d="M32 3 57 12.5v17.6c0 15.6-10.6 27.2-25 31-14.4-3.8-25-15.4-25-31V12.5L32 3Z"
              fill="rgba(4,6,11,0.55)"
              stroke="rgba(255,255,255,0.85)"
              stroke-width="3"
            />
            <path d="M35.5 13 22 34h8l-3 16.5L42 28.5h-9l6.5-15.5Z" fill="rgba(255,255,255,0.9)" />
          </svg>
        </div>
        <div class="info">
          <p class="handle">{{ config.brand.instagramHandle }}</p>
          <div class="stats">
            <span class="stat"><strong>{{ config.brand.followersLabel }}</strong> followers</span>
            <span class="dot" aria-hidden="true"></span>
            <span class="stat">Superhero content, daily</span>
          </div>
          <p class="sub">{{ sub }}</p>
        </div>
      </div>
      <a
        class="btn btn-ig"
        [href]="config.brand.instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        appTrack="cta_instagram_follow"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8" />
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.8" />
          <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
        </svg>
        Follow on Instagram
      </a>
    </div>
  `,
  styles: `
    .ig-panel {
      position: relative;
      border-radius: 18px;
      padding: 1.5px;
      background: linear-gradient(
        45deg,
        #f9ce34 0%,
        #ee2a7b 45%,
        #6228d7 100%
      );
    }

    .ring {
      border-radius: 16.5px;
      background: rgba(6, 9, 16, 0.92);
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      padding: 1.6rem;
    }

    @media (min-width: 768px) {
      .ring {
        flex-direction: row;
        align-items: center;
        padding: 1.8rem 2rem;
      }
    }

    .avatar {
      flex-shrink: 0;
      width: 84px;
      height: 84px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: radial-gradient(circle at 30% 25%, #1a2338, #0a0f1c);
      border: 1px solid rgba(255, 255, 255, 0.14);
    }

    .info {
      min-width: 0;
    }

    .handle {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.15rem;
      letter-spacing: 0.03em;
      margin: 0 0 0.4rem;
    }

    .stats {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.7rem;
      margin-bottom: 0.55rem;
    }

    .stat {
      color: var(--text-1);
      font-size: 0.88rem;
    }

    .stat strong {
      color: var(--text-0);
      font-family: var(--font-ui);
      font-weight: 700;
    }

    .dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--text-2);
    }

    .sub {
      color: var(--text-1);
      margin: 0;
      font-size: 0.92rem;
      line-height: 1.55;
    }

    .btn-ig {
      align-self: flex-start;
    }

    @media (min-width: 768px) {
      .btn-ig {
        align-self: flex-end;
      }
    }
  `,
})
export class InstagramCtaComponent {
  protected readonly config = inject(APP_CONFIG);

  @Input() sub = 'Join the community for daily character spotlights, movie breakdowns, comic lore and superhero facts.';
}
