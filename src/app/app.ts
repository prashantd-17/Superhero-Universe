import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <app-navbar />
    <main id="main-content" class="page-main">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: `
    .skip-link {
      position: absolute;
      top: -60px;
      left: 12px;
      z-index: 200;
      padding: 0.65rem 1.1rem;
      background: var(--accent);
      color: #041018;
      border-radius: 8px;
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.06em;
      text-decoration: none;
      transition: top 0.2s ease;
    }

    .skip-link:focus {
      top: 12px;
    }

    .page-main {
      min-height: calc(100vh - 64px);
      display: flex;
      flex-direction: column;
    }

    .page-main > * {
      width: 100%;
    }
  `,
})
export class App {}
