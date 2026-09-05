import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnDestroy,
  inject,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { APP_CONFIG } from '../../../core/config/app-config';
import { TrackDirective } from '../../directives/track.directive';

interface NavLink {
  label: string;
  path: string;
  exact?: boolean;
}

/**
 * Cinematic glass navigation: sticky + blur on desktop, animated drawer on
 * mobile, with a global character search that funnels into the explorer.
 */
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="nav" [class.scrolled]="scrolled">
      <div class="container nav-inner">
        <a class="brand" routerLink="/" appTrack="nav_home" (click)="closeMobile()">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="34" height="34">
              <defs>
                <linearGradient id="nav-shield" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#38e1ff" />
                  <stop offset="1" stop-color="#2f6bff" />
                </linearGradient>
              </defs>
              <path
                d="M32 3 57 12.5v17.6c0 15.6-10.6 27.2-25 31-14.4-3.8-25-15.4-25-31V12.5L32 3Z"
                fill="#0b101c"
                stroke="url(#nav-shield)"
                stroke-width="3"
              />
              <path d="M35.5 13 22 34h8l-3 16.5L42 28.5h-9l6.5-15.5Z" fill="url(#nav-shield)" />
            </svg>
          </span>
          <span class="brand-text">
            <span class="brand-top">The Superhero</span>
            <span class="brand-bottom">Universe</span>
          </span>
        </a>

        <nav class="links" aria-label="Primary">
          @for (link of links; track link.path) {
            <a
              class="link"
              [routerLink]="link.path"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: link.exact === true }"
            >
              {{ link.label }}
            </a>
          }
        </nav>

        <form class="search" role="search" (submit)="onSearchSubmit($event)">
          <label class="sr-only" for="global-search">Search characters</label>
          <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2" />
            <path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <input
            id="global-search"
            class="search-input"
            type="search"
            placeholder="Search Batman, Spider-Man…"
            [value]="query"
            (input)="onQueryInput($event)"
            autocomplete="off"
          />
          <button type="submit" class="search-btn" aria-label="Search characters">Go</button>
        </form>

        <a
          class="follow"
          [href]="config.brand.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          appTrack="nav_instagram_follow"
        >
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8" />
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.8" />
            <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
          </svg>
          <span class="follow-label">Follow</span>
        </a>

        <button
          type="button"
          class="menu-btn"
          [class.open]="mobileOpen"
          (click)="toggleMobile()"
          [attr.aria-expanded]="mobileOpen"
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <div class="backdrop" [class.visible]="mobileOpen" (click)="closeMobile()" aria-hidden="true"></div>

    <nav
      id="mobile-nav"
      class="drawer"
      [class.open]="mobileOpen"
      [attr.inert]="mobileOpen ? null : ''"
      aria-label="Menu"
    >
      <div class="drawer-head">
        <span class="drawer-brand">Menu</span>
        <button type="button" class="drawer-close" (click)="closeMobile()" aria-label="Close menu">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <form class="search drawer-search" role="search" (submit)="onSearchSubmit($event)">
        <label class="sr-only" for="global-search-mobile">Search characters</label>
        <input
          id="global-search-mobile"
          class="search-input"
          type="search"
          placeholder="Search characters…"
          [value]="query"
          (input)="onQueryInput($event)"
          autocomplete="off"
        />
        <button type="submit" class="search-btn">Go</button>
      </form>

      <div class="drawer-links">
        @for (link of links; track link.path) {
          <a
            class="drawer-link"
            [routerLink]="link.path"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: link.exact === true }"
            (click)="closeMobile()"
          >
            {{ link.label }}
          </a>
        }
      </div>

      <a
        class="follow follow-big"
        [href]="config.brand.instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        appTrack="drawer_instagram_follow"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8" />
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.8" />
          <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
        </svg>
        Follow {{ config.brand.instagramHandle }}
      </a>
    </nav>
  `,
  styles: `
    :host {
      position: sticky;
      top: 0;
      z-index: 60;
    }

    .nav {
      position: relative;
      border-bottom: 1px solid transparent;
      transition:
        background 0.3s ease,
        border-color 0.3s ease,
        backdrop-filter 0.3s ease;
    }

    .nav.scrolled {
      background: rgba(5, 8, 14, 0.72);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom-color: var(--panel-border);
    }

    .nav-inner {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      height: 64px;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      color: var(--text-0);
      flex-shrink: 0;
    }

    .brand-mark {
      display: inline-flex;
      filter: drop-shadow(0 0 8px rgba(56, 225, 255, 0.35));
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      line-height: 1.05;
    }

    .brand-top {
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 0.66rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--text-1);
    }

    .brand-bottom {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.95rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .links {
      display: none;
      align-items: center;
      gap: 0.2rem;
      margin-left: 0.5rem;
    }

    .link {
      position: relative;
      padding: 0.55em 0.85em;
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 0.86rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-1);
      text-decoration: none;
      border-radius: 8px;
      transition: color 0.2s ease;
      white-space: nowrap;
    }

    .link::after {
      content: '';
      position: absolute;
      left: 0.85em;
      right: 0.85em;
      bottom: 0.15em;
      height: 1px;
      background: var(--accent);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.25s ease;
    }

    .link:hover {
      color: var(--text-0);
    }

    .link:hover::after {
      transform: scaleX(1);
    }

    .link.active {
      color: var(--text-0);
    }

    .link.active::after {
      transform: scaleX(1);
    }

    .search {
      display: none;
      align-items: center;
      gap: 0.5rem;
      border: 1px solid var(--panel-border);
      border-radius: 999px;
      background: rgba(148, 163, 184, 0.07);
      padding: 0.35rem 0.4rem 0.35rem 0.9rem;
      margin-left: auto;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .search:focus-within {
      border-color: rgba(56, 225, 255, 0.5);
      box-shadow: 0 0 16px rgba(56, 225, 255, 0.12);
    }

    .search-icon {
      color: var(--text-2);
      flex-shrink: 0;
    }

    .search-input {
      background: transparent;
      border: none;
      outline: none;
      color: var(--text-0);
      font-family: var(--font-ui);
      font-size: 0.88rem;
      letter-spacing: 0.03em;
      width: 170px;
    }

    .search-input::placeholder {
      color: var(--text-2);
    }

    .search-btn {
      appearance: none;
      border: none;
      cursor: pointer;
      border-radius: 999px;
      padding: 0.42em 1em;
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #041018;
      background: linear-gradient(135deg, #38e1ff, #2f6bff);
      transition: filter 0.2s ease;
    }

    .search-btn:hover {
      filter: brightness(1.1);
    }

    .follow {
      display: none;
      align-items: center;
      gap: 0.45rem;
      text-decoration: none;
      color: var(--text-0);
      border: 1px solid var(--panel-border);
      border-radius: 999px;
      padding: 0.5em 1em;
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.8rem;
      letter-spacing: 0.08em;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      flex-shrink: 0;
    }

    .follow:hover {
      border-color: rgba(255, 122, 41, 0.55);
      box-shadow: 0 0 16px rgba(255, 122, 41, 0.18);
    }

    .follow svg {
      color: #ff7a29;
    }

    .menu-btn {
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 42px;
      height: 42px;
      padding: 10px;
      margin-left: auto;
      background: transparent;
      border: 1px solid var(--panel-border);
      border-radius: 10px;
      cursor: pointer;
    }

    .menu-btn span {
      display: block;
      height: 2px;
      width: 100%;
      border-radius: 2px;
      background: var(--text-0);
      transition: transform 0.25s ease, opacity 0.2s ease;
    }

    .menu-btn.open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    .menu-btn.open span:nth-child(2) {
      opacity: 0;
    }

    .menu-btn.open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(3, 5, 9, 0.6);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
      z-index: 70;
    }

    .backdrop.visible {
      opacity: 1;
      pointer-events: auto;
    }

    .drawer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(84vw, 340px);
      z-index: 80;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      padding: 1.1rem 1.2rem 1.6rem;
      background: rgba(7, 10, 18, 0.96);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-left: 1px solid var(--panel-border);
      transform: translateX(105%);
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      overflow-y: auto;
    }

    .drawer.open {
      transform: translateX(0);
    }

    .drawer-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .drawer-brand {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--text-1);
    }

    .drawer-close {
      background: transparent;
      border: 1px solid var(--panel-border);
      border-radius: 10px;
      color: var(--text-0);
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      cursor: pointer;
    }

    .drawer-search {
      display: flex;
      width: 100%;
    }

    .drawer-search .search-input {
      width: 100%;
      flex: 1;
    }

    .drawer-links {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .drawer-link {
      display: block;
      padding: 0.75em 0.9em;
      border-radius: 10px;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-1);
      text-decoration: none;
      border: 1px solid transparent;
      transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
    }

    .drawer-link:hover,
    .drawer-link.active {
      color: var(--text-0);
      border-color: var(--panel-border);
      background: rgba(56, 225, 255, 0.06);
    }

    .follow-big {
      display: flex;
      justify-content: center;
      margin-top: auto;
    }

    @media (min-width: 900px) {
      .links {
        display: flex;
      }

      .search {
        display: inline-flex;
      }

      .follow {
        display: inline-flex;
      }

      .menu-btn,
      .backdrop,
      .drawer {
        display: none;
      }
    }

    @media (min-width: 1180px) {
      .search-input {
        width: 220px;
      }
    }
  `,
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly config = inject(APP_CONFIG);

  protected readonly links: readonly NavLink[] = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Characters', path: '/characters' },
    { label: 'Movies', path: '/movies' },
    { label: 'Comics / Lore', path: '/lore' },
    { label: 'Battle Arena', path: '/battle-arena' },
    { label: 'Products', path: '/products' },
    { label: 'Instagram', path: '/instagram' },
  ];

  protected scrolled = false;
  protected mobileOpen = false;
  protected query = '';

  private onScroll: (() => void) | null = null;

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.onScroll = () => {
        this.scrolled = window.scrollY > 8;
      };
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.onScroll();
    }
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.mobileOpen = false;
      });
  }

  ngOnDestroy(): void {
    if (this.onScroll && typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  protected onQueryInput(event: Event): void {
    this.query = (event.target as HTMLInputElement).value;
  }

  protected onSearchSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const q = this.query.trim();
    this.router
      .navigate(['/characters'], {
        queryParams: q ? { q } : {},
        queryParamsHandling: 'merge',
        replaceUrl: true,
      })
      .catch(() => undefined);
    this.mobileOpen = false;
  }

  protected toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  protected closeMobile(): void {
    this.mobileOpen = false;
  }
}
