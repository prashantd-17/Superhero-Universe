import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SuperheroFact } from '../../../core/models/fact';
import { TrackDirective } from '../../directives/track.directive';
import { BadgeComponent } from '../badge/badge.component';

/**
 * "Did you know?" fact card — visually shareable, and when the fact maps to
 * a character it links into the character profile (funnel: fact → profile).
 */
@Component({
  selector: 'app-fact-card',
  imports: [RouterLink, TrackDirective, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (fact) {
      <article class="fact-card">
        <div class="kicker-row">
          <span class="bolt" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
            </svg>
          </span>
          <span class="kicker">Did you know?</span>
          <app-badge [variant]="universeVariant(fact)" [label]="universeLabel(fact)" />
        </div>
        <h3 class="title">{{ fact.title }}</h3>
        <p class="text">{{ fact.text }}</p>
        <div class="actions">
          @if (fact.characterSlug) {
            <a
              class="btn btn-ghost btn-sm"
              [routerLink]="['/characters', fact.characterSlug!]"
              appTrack="fact_read_more"
            >
              Read the file
            </a>
          }
          <button type="button" class="btn btn-ghost btn-sm" (click)="shuffle.emit()">
            <span aria-hidden="true">&#8635;</span>&nbsp;New fact
          </button>
        </div>
      </article>
    }
  `,
  styles: `
    .fact-card {
      position: relative;
      border: 1px solid var(--panel-border);
      border-radius: 16px;
      background:
        radial-gradient(120% 100% at 100% 0%, rgba(56, 225, 255, 0.07), transparent 55%),
        rgba(10, 14, 22, 0.65);
      padding: 1.6rem 1.5rem;
      overflow: hidden;
    }

    .kicker-row {
      display: flex;
      align-items: center;
      gap: 0.55rem;
      margin-bottom: 0.8rem;
    }

    .bolt {
      color: var(--accent);
      display: inline-flex;
      filter: drop-shadow(0 0 6px rgba(56, 225, 255, 0.6));
    }

    .title {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      margin: 0 0 0.5rem;
    }

    .text {
      color: var(--text-1);
      line-height: 1.65;
      margin: 0 0 1.2rem;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
  `,
})
export class FactCardComponent {
  @Input() fact: SuperheroFact | null = null;

  @Output() readonly shuffle = new EventEmitter<void>();

  protected universeVariant(fact: SuperheroFact): 'marvel' | 'dc' | 'cosmic' | 'other' {
    switch (fact.universe) {
      case 'marvel':
        return 'marvel';
      case 'dc':
        return 'dc';
      case 'cosmic':
        return 'cosmic';
      default:
        return 'other';
    }
  }

  protected universeLabel(fact: SuperheroFact): string {
    switch (fact.universe) {
      case 'marvel':
        return 'Marvel';
      case 'dc':
        return 'DC';
      case 'cosmic':
        return 'Cosmic';
      default:
        return 'Multiverse';
    }
  }
}
