import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { APP_CONFIG } from '../../../../core/config/app-config';
import { AssetService } from '../../../../core/services/asset/asset.service';
import { CharacterService } from '../../../../core/services/character/character-service';
import { TrackDirective } from '../../../../shared/directives/track.directive';

/**
 * Cinematic hero: background artwork + drifting grid + light sparks,
 * brand statement and the primary CTA. Deliberately uncluttered.
 */
@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero">
      <div class="bg" [style.background-image]="'url(' + bg + ')'"></div>
      <div class="bg-fade" aria-hidden="true"></div>
      <div class="grid-overlay" aria-hidden="true"></div>
      <div class="sparks" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>

      <div class="container hero-content">
        <p class="kicker kicker-hero">Marvel &times; DC &times; Comics &times; Cinema</p>
        <h1 class="hero-title">
          <span class="line-sm">The</span>
          <span class="line-big">Superhero</span>
          <span class="line-big">Universe</span>
        </h1>
        <p class="hero-sub">
          Explore the worlds, characters and stories beyond the screen —
          the digital archive of {{ config.brand.instagramHandle }}.
        </p>
        <div class="hero-cta">
          <a
            routerLink="/characters"
            class="btn btn-primary btn-lg"
            appTrack="hero_enter_universe"
          >
            Enter the universe
          </a>
          <a
            class="btn btn-ghost btn-lg"
            [href]="config.brand.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            appTrack="hero_instagram"
          >
            Follow the fandom
          </a>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <strong>{{ config.brand.followersLabel }}</strong>
            <span>Community</span>
          </div>
          <div class="stat-sep" aria-hidden="true"></div>
          <div class="stat">
            <strong>{{ characterCount ? characterCount + '+' : 'Scanning…' }}</strong>
            <span>Character files</span>
          </div>
          <div class="stat-sep" aria-hidden="true"></div>
          <div class="stat">
            <strong>2+</strong>
            <span>Universes</span>
          </div>
        </div>
      </div>

      <a class="scroll-cue" href="#explore" aria-label="Scroll to explore">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    </section>
  `,
  styles: `
    .hero {
      position: relative;
      min-height: min(92vh, 860px);
      display: flex;
      align-items: center;
      overflow: hidden;
      isolation: isolate;
    }

    .bg {
      position: absolute;
      inset: 0;
      z-index: -3;
      background-size: cover;
      background-position: center 30%;
      transform: scale(1.04);
    }

    .bg-fade {
      position: absolute;
      inset: 0;
      z-index: -2;
      background:
        linear-gradient(180deg, rgba(4, 6, 11, 0.55) 0%, rgba(4, 6, 11, 0.35) 45%, var(--bg-0) 96%),
        radial-gradient(90% 60% at 50% 40%, transparent 40%, rgba(4, 6, 11, 0.55) 100%);
    }

    .grid-overlay {
      position: absolute;
      inset: 0;
      z-index: -1;
      background-image:
        linear-gradient(rgba(80, 200, 255, 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(80, 200, 255, 0.07) 1px, transparent 1px);
      background-size: 46px 46px;
      mask-image: radial-gradient(75% 60% at 50% 42%, black 30%, transparent 78%);
      -webkit-mask-image: radial-gradient(75% 60% at 50% 42%, black 30%, transparent 78%);
      animation: grid-drift 16s linear infinite;
    }

    @keyframes grid-drift {
      to {
        background-position: 46px 46px, 46px 46px;
      }
    }

    .sparks span {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--accent);
      opacity: 0.35;
      box-shadow: 0 0 10px rgba(56, 225, 255, 0.8);
      animation: float 11s ease-in-out infinite alternate;
    }

    .sparks span:nth-child(1) { top: 22%; left: 12%; animation-delay: 0s; }
    .sparks span:nth-child(2) { top: 64%; left: 8%;  animation-delay: -2s; width: 3px; height: 3px; }
    .sparks span:nth-child(3) { top: 30%; left: 86%; animation-delay: -4s; }
    .sparks span:nth-child(4) { top: 74%; left: 82%; animation-delay: -6s; width: 5px; height: 5px; opacity: 0.25; }
    .sparks span:nth-child(5) { top: 16%; left: 58%; animation-delay: -3s; width: 3px; height: 3px; }
    .sparks span:nth-child(6) { top: 82%; left: 40%; animation-delay: -8s; }
    .sparks span:nth-child(7) { top: 48%; left: 94%; animation-delay: -5s; width: 3px; height: 3px; }
    .sparks span:nth-child(8) { top: 58%; left: 24%; animation-delay: -10s; }

    @keyframes float {
      from { transform: translate3d(0, 0, 0); }
      to { transform: translate3d(14px, -26px, 0); }
    }

    .hero-content {
      position: relative;
      padding-top: 4.5rem;
      padding-bottom: 5.5rem;
      max-width: 860px;
    }

    .kicker-hero {
      margin-bottom: 1.4rem;
    }

    .hero-title {
      margin: 0 0 1.2rem;
      display: flex;
      flex-direction: column;
      line-height: 0.95;
    }

    .line-sm {
      font-family: var(--font-display);
      font-weight: 600;
      font-size: clamp(1.1rem, 2.6vw, 1.6rem);
      letter-spacing: 0.5em;
      text-transform: uppercase;
      color: var(--text-1);
      margin-bottom: 0.35rem;
    }

    .line-big {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(2.6rem, 8.5vw, 5.4rem);
      letter-spacing: 0.02em;
      text-transform: uppercase;
      background: linear-gradient(180deg, #ffffff 20%, #9fd8ff 65%, #4da3ff 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      filter: drop-shadow(0 0 26px rgba(56, 160, 255, 0.25));
    }

    .hero-sub {
      color: var(--text-1);
      font-size: clamp(0.98rem, 1.6vw, 1.12rem);
      line-height: 1.65;
      max-width: 56ch;
      margin: 0 0 2rem;
    }

    .hero-cta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.9rem;
      margin-bottom: 2.6rem;
    }

    .hero-stats {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.4rem;
    }

    .stat {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .stat strong {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.25rem;
      letter-spacing: 0.04em;
      color: var(--text-0);
    }

    .stat span {
      font-family: var(--font-ui);
      font-size: 0.72rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--text-2);
    }

    .stat-sep {
      width: 1px;
      height: 34px;
      background: var(--panel-border);
    }

    .scroll-cue {
      position: absolute;
      bottom: 1.4rem;
      left: 50%;
      transform: translateX(-50%);
      color: var(--text-2);
      animation: cue-bob 2.4s ease-in-out infinite;
    }

    .scroll-cue:hover {
      color: var(--accent);
    }

    @keyframes cue-bob {
      0%, 100% { transform: translate(-50%, 0); }
      50% { transform: translate(-50%, 8px); }
    }
  `,
})
export class HeroSectionComponent {
  protected readonly config = inject(APP_CONFIG);
  private readonly asset = inject(AssetService);
  private readonly characters = inject(CharacterService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly bg = this.asset.url('images/hero-bg.jpg');
  protected characterCount: number | null = null;

  constructor() {
    // Data loads in the browser only (SSR renders the "Scanning…" state).
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.characters.load();
        this.characters.heroes$
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (heroes) => {
              this.characterCount = heroes.length > 0 ? heroes.length : null;
            },
            error: () => undefined,
          });
      }
    });
  }
}
