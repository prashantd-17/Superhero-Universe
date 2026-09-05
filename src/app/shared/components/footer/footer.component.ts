import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_CONFIG } from '../../../core/config/app-config';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="grid">
          <div class="col col-brand">
            <div class="brand">
              <svg viewBox="0 0 64 64" width="30" height="30" aria-hidden="true">
                <path
                  d="M32 3 57 12.5v17.6c0 15.6-10.6 27.2-25 31-14.4-3.8-25-15.4-25-31V12.5L32 3Z"
                  fill="none"
                  stroke="var(--accent)"
                  stroke-width="3"
                />
                <path d="M35.5 13 22 34h8l-3 16.5L42 28.5h-9l6.5-15.5Z" fill="var(--accent)" />
              </svg>
              <span class="brand-name">The Superhero Universe</span>
            </div>
            <p class="tagline">{{ config.brand.tagline }}</p>
            <a
              class="ig"
              [href]="config.brand.instagramUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.8" />
                <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
              </svg>
              {{ config.brand.instagramHandle }}
            </a>
          </div>

          <nav class="col" aria-label="Explore">
            <h3 class="col-title">Explore</h3>
            <a routerLink="/characters">Character Database</a>
            <a routerLink="/movies">Movies &amp; TV</a>
            <a routerLink="/series">TV Series</a>
            <a routerLink="/lore">Comics &amp; Lore</a>
            <a routerLink="/battle-arena">Battle Arena</a>
          </nav>

          <nav class="col" aria-label="Universes">
            <h3 class="col-title">Universes</h3>
            <a routerLink="/universes/marvel">Marvel</a>
            <a routerLink="/universes/dc">DC</a>
            <a routerLink="/lore">Multiverse &amp; Cosmic</a>
            <a routerLink="/products">Fan Shop</a>
          </nav>

          <nav class="col" aria-label="Community">
            <h3 class="col-title">Community</h3>
            <a [href]="config.brand.instagramUrl" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <span class="muted">{{ config.brand.followersLabel }} fans and growing</span>
          </nav>
        </div>

        <div class="bottom">
          <p>&copy; {{ year }} {{ config.brand.name }}. A fan-made project.</p>
          <p class="muted">
            Not affiliated with Marvel or DC. Some product links are affiliate links.
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      border-top: 1px solid var(--panel-border);
      background: linear-gradient(180deg, rgba(7, 10, 18, 0.4), rgba(4, 6, 11, 0.9));
      margin-top: 4rem;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 3rem 0 2rem;
    }

    @media (min-width: 640px) {
      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (min-width: 1000px) {
      .grid {
        grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr));
      }
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 0.8rem;
    }

    .brand-name {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .tagline {
      color: var(--text-1);
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0 0 1rem;
      max-width: 30ch;
    }

    .ig {
      overflow-wrap: anywhere;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      color: var(--accent);
      text-decoration: none;
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 0.85rem;
      letter-spacing: 0.04em;
    }

    .ig:hover {
      text-decoration: underline;
    }

    .col {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
    }

    .col a {
      color: var(--text-1);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s ease;
    }

    .col a:hover {
      color: var(--text-0);
    }

    .col-title {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.72rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--text-2);
      margin: 0 0 0.35rem;
    }

    .muted {
      color: var(--text-2);
      font-size: 0.85rem;
    }

    .bottom {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      border-top: 1px solid var(--panel-border);
      padding: 1.4rem 0 1.8rem;
    }

    .bottom p {
      margin: 0;
      color: var(--text-2);
      font-size: 0.8rem;
    }

    @media (min-width: 768px) {
      .bottom {
        flex-direction: row;
        justify-content: space-between;
      }
    }
  `,
})
export class FooterComponent {
  protected readonly config = inject(APP_CONFIG);
  protected readonly year = new Date().getFullYear();
}
