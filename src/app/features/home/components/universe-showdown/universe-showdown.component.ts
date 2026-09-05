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
import { CharacterService } from '../../../../core/services/character/character-service';
import { TrackDirective } from '../../../../shared/directives/track.directive';

/**
 * Marvel vs DC — universe panels with live archive counts,
 * linking into the filtered character explorer.
 */
@Component({
  selector: 'app-universe-showdown',
  imports: [RouterLink, TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="panels">
      <a class="panel panel-marvel" routerLink="/characters" [queryParams]="{ universe: 'marvel' }" appTrack="showdown_marvel">
        <span class="panel-glow" aria-hidden="true"></span>
        <span class="panel-kicker">Universe 01</span>
        <span class="panel-name">Marvel</span>
        <span class="panel-count">{{ marvelCount() }}</span>
        <span class="panel-desc">From the street level to the cosmic firmament — Spider-Man, Iron Man, the X-Men, the Avengers and the gods of Earth-616.</span>
        <span class="panel-cta">Explore Marvel &#8594;</span>
      </a>

      <div class="vs" aria-hidden="true">VS</div>

      <a class="panel panel-dc" routerLink="/characters" [queryParams]="{ universe: 'dc' }" appTrack="showdown_dc">
        <span class="panel-glow" aria-hidden="true"></span>
        <span class="panel-kicker">Universe 02</span>
        <span class="panel-name">DC</span>
        <span class="panel-count">{{ dcCount() }}</span>
        <span class="panel-desc">The world’s finest — Batman, Superman, Wonder Woman and the entire Justice League legacy, from Golden Age to now.</span>
        <span class="panel-cta">Explore DC &#8594;</span>
      </a>
    </div>
  `,
  styles: `
    .panels {
      position: relative;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    @media (min-width: 860px) {
      .panels {
        grid-template-columns: 1fr auto 1fr;
        gap: 1.4rem;
        align-items: stretch;
      }
    }

    .panel {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 1.8rem 1.6rem;
      border-radius: 16px;
      border: 1px solid var(--panel-border);
      background: rgba(10, 14, 22, 0.55);
      color: var(--text-0);
      text-decoration: none;
      overflow: hidden;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }

    .panel:hover,
    .panel:focus-visible {
      transform: translateY(-4px);
    }

    .panel-glow {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.5;
    }

    .panel-marvel .panel-glow {
      background: radial-gradient(90% 70% at 0% 0%, rgba(255, 61, 78, 0.22), transparent 60%);
    }

    .panel-dc .panel-glow {
      background: radial-gradient(90% 70% at 100% 0%, rgba(47, 124, 255, 0.22), transparent 60%);
    }

    .panel-marvel:hover {
      border-color: rgba(255, 61, 78, 0.5);
      box-shadow: 0 22px 48px -22px rgba(255, 61, 78, 0.45);
    }

    .panel-dc:hover {
      border-color: rgba(47, 124, 255, 0.5);
      box-shadow: 0 22px 48px -22px rgba(47, 124, 255, 0.45);
    }

    .panel-kicker {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.68rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--text-2);
    }

    .panel-name {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(2rem, 4.5vw, 3rem);
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin: 0.3rem 0 0.2rem;
    }

    .panel-marvel .panel-name {
      color: #ff5566;
      text-shadow: 0 0 30px rgba(255, 61, 78, 0.35);
    }

    .panel-dc .panel-name {
      color: #5c9dff;
      text-shadow: 0 0 30px rgba(47, 124, 255, 0.35);
    }

    .panel-count {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: 0.14em;
      color: var(--text-1);
      margin-bottom: 0.9rem;
    }

    .panel-desc {
      color: var(--text-1);
      font-size: 0.92rem;
      line-height: 1.6;
      margin-bottom: 1.2rem;
    }

    .panel-cta {
      margin-top: auto;
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.8rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .panel-marvel .panel-cta {
      color: #ff8a97;
    }

    .panel-dc .panel-cta {
      color: #8ab8ff;
    }

    .vs {
      display: none;
      place-items: center;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 1px solid var(--panel-border);
      background: rgba(10, 14, 22, 0.8);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1rem;
      letter-spacing: 0.1em;
      color: var(--accent);
      box-shadow: 0 0 26px rgba(56, 225, 255, 0.2);
    }

    @media (min-width: 860px) {
      .vs {
        display: grid;
        align-self: center;
      }
    }
  `,
})
export class UniverseShowdownComponent {
  private readonly characters = inject(CharacterService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  private marvel: number | null = null;
  private dc: number | null = null;

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.characters.load();
        this.characters.heroes$
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (heroes) => {
              this.marvel = this.characters.countByUniverse('marvel', heroes) || null;
              this.dc = this.characters.countByUniverse('dc', heroes) || null;
            },
            error: () => undefined,
          });
      }
    });
  }

  protected marvelCount(): string {
    return this.marvel ? `${this.marvel} characters in the archive` : 'Scanning archive…';
  }

  protected dcCount(): string {
    return this.dc ? `${this.dc} characters in the archive` : 'Scanning archive…';
  }
}
