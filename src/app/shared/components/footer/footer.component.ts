import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { APP_CONFIG } from '../../../core/config/app-config';

/**
 * Site footer — brand block, navigation columns and a contact/newsletter form.
 *
 * The newsletter posts to FormSubmit (https://formsubmit.co/) which forwards
 * submissions to dprash77@gmail.com without needing a backend server. On the
 * very first submission FormSubmit asks the owner to confirm the email address;
 * after that every message lands directly in the inbox.
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container">
        <!-- Newsletter / contact band -->
        <section class="newsletter" aria-labelledby="newsletter-title">
          <div class="newsletter-copy">
            <p class="kicker">Stay in the loop</p>
            <h2 id="newsletter-title" class="newsletter-title">Join the signal</h2>
            <p class="newsletter-sub">
              Drop your email and a message — questions, feedback, collabs or a
              hero you want profiled. I read every note.
            </p>
          </div>
          <form
            class="newsletter-form"
            action="https://formsubmit.co/dprash77@gmail.com"
            method="POST"
          >
            <!-- FormSubmit configuration -->
            <input type="hidden" name="_subject" value="New message from The Superhero Universe" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://superhero-universe.onrender.com/instagram" />
            <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off" />

            <label class="field">
              <span class="sr-only">Your email</span>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                [(ngModel)]="email"
                [ngModelOptions]="{ standalone: true }"
                required
                autocomplete="email"
              />
            </label>
            <label class="field field-message">
              <span class="sr-only">Your message</span>
              <textarea
                name="message"
                rows="2"
                placeholder="Say hello, request a character, share feedback…"
                [(ngModel)]="message"
                [ngModelOptions]="{ standalone: true }"
                required
              ></textarea>
            </label>
            <button type="submit" class="btn btn-primary">Send message</button>
            <p class="newsletter-hint">
              No spam. One reply per message, straight to my inbox.
            </p>
          </form>
        </section>

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
      margin-top: 3rem;
    }

    .newsletter {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
      padding: clamp(2rem, 5vw, 2.75rem) 0;
      border-bottom: 1px solid var(--panel-border);
    }

    @media (min-width: 900px) {
      .newsletter {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
        align-items: center;
        gap: 2.5rem;
      }
    }

    .newsletter-copy .kicker { margin-bottom: 0.6rem; }

    .newsletter-title {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(1.35rem, 3vw, 1.9rem);
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin: 0 0 0.5rem;
    }

    .newsletter-sub {
      color: var(--text-1);
      font-size: 0.92rem;
      line-height: 1.6;
      margin: 0;
      max-width: 44ch;
    }

    .newsletter-form {
      display: grid;
      gap: 0.65rem;
    }

    @media (min-width: 600px) {
      .newsletter-form {
        grid-template-columns: 1fr 1fr;
      }
      .field-message,
      .newsletter-form .btn,
      .newsletter-hint {
        grid-column: 1 / -1;
      }
    }

    .field {
      display: block;
    }

    .field input,
    .field textarea {
      width: 100%;
      padding: 0.8rem 1rem;
      border-radius: 10px;
      border: 1px solid var(--panel-border);
      background: rgba(10, 14, 22, 0.7);
      color: var(--text-0);
      font-family: var(--font-body);
      font-size: 0.92rem;
      resize: vertical;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .field textarea {
      min-height: 70px;
      line-height: 1.5;
    }

    .field input::placeholder,
    .field textarea::placeholder {
      color: var(--text-2);
    }

    .field input:focus,
    .field textarea:focus {
      outline: none;
      border-color: rgba(56, 225, 255, 0.55);
      box-shadow: 0 0 0 3px rgba(56, 225, 255, 0.15);
    }

    .newsletter-form .btn {
      justify-self: start;
      min-width: 180px;
    }

    .newsletter-hint {
      color: var(--text-2);
      font-size: 0.78rem;
      margin: 0;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.75rem;
      padding: 2.25rem 0 1.5rem;
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
      gap: 0.5rem;
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
      padding: 1.1rem 0 1.5rem;
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
  protected email = '';
  protected message = '';
}
