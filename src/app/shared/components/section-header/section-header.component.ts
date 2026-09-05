import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

/** Standard section heading: kicker + title + optional subtitle. */
@Component({
  selector: 'app-section-header',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="section-head" [class.center]="align === 'center'" appReveal>
      @if (kicker) {
        <p class="kicker">{{ kicker }}</p>
      }
      <h2 class="title-lg" [attr.id]="headingId || null">{{ title }}</h2>
      @if (subtitle) {
        <p class="subtitle">{{ subtitle }}</p>
      }
    </header>
  `,
  styles: `
    .section-head {
      margin-bottom: 2rem;
      max-width: 720px;
    }

    .section-head.center {
      margin-inline: auto;
      text-align: center;
    }

    .title-lg {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: clamp(1.5rem, 3.4vw, 2.3rem);
      letter-spacing: 0.03em;
      line-height: 1.1;
      margin: 0.35rem 0 0.4rem;
    }

    .subtitle {
      color: var(--text-1);
      font-size: 0.98rem;
      line-height: 1.6;
      margin: 0;
    }
  `,
})
export class SectionHeaderComponent {
  @Input() headingId = '';
  @Input() kicker = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() align: 'left' | 'center' = 'left';
}
