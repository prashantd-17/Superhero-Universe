import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TIMELINE } from '../../../../core/services/lore/lore-data';

/** Compact timeline teaser (first six MCU milestones) → full timeline in Lore. */
@Component({
  selector: 'app-timeline-preview',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tl">
      <div class="tl-track" aria-hidden="true"></div>
      <ol class="tl-nodes">
        @for (event of events; track event.year) {
          <li class="tl-node">
            <span class="tl-year">{{ event.year }}</span>
            <span class="tl-dot" aria-hidden="true"></span>
            <span class="tl-title">{{ event.title }}</span>
          </li>
        }
        <li class="tl-node tl-more">
          <a [routerLink]="['/lore']" [fragment]="'timeline'">+ full timeline</a>
        </li>
      </ol>
    </div>
  `,
  styles: `
    .tl {
      position: relative;
      padding: 1rem 0 0.5rem;
      overflow-x: auto;
      scrollbar-width: thin;
    }

    .tl-track {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(1rem + 1.05rem);
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(56, 225, 255, 0.35) 12%, rgba(56, 225, 255, 0.35) 88%, transparent);
    }

    .tl-nodes {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 0;
      min-width: min-content;
    }

    .tl-node {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.45rem;
      min-width: 150px;
      padding: 0 0.9rem 1.4rem;
      text-align: center;
    }

    .tl-year {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: 0.12em;
      color: var(--accent);
    }

    .tl-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--bg-0);
      border: 2px solid var(--accent);
      box-shadow: 0 0 10px rgba(56, 225, 255, 0.5);
    }

    .tl-title {
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 0.8rem;
      letter-spacing: 0.04em;
      color: var(--text-1);
      line-height: 1.35;
      max-width: 16ch;
    }

    .tl-more {
      min-width: 140px;
    }

    .tl-more a {
      margin-top: 0.1rem;
      color: var(--accent);
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-decoration: none;
    }

    .tl-more a:hover {
      text-decoration: underline;
    }
  `,
})
export class TimelinePreviewComponent {
  protected readonly events = TIMELINE.mcu.slice(0, 6);
}
