import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Superhero, alignmentLabel, universeLabel } from '../../../core/models/superhero';
import { TrackDirective } from '../../directives/track.directive';
import { BadgeComponent } from '../badge/badge.component';
import { ImageTone, SmartImageComponent } from '../smart-image/smart-image.component';

/** Premium cinematic character card — image, name, publisher, alignment. */
@Component({
  selector: 'app-character-card',
  imports: [NgClass, RouterLink, TrackDirective, BadgeComponent, SmartImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (hero) {
      <a
        class="card"
        [ngClass]="universeClass"
        [routerLink]="['/characters', hero.slug]"
        appTrack="card_character_open"
        [attr.aria-label]="'View profile: ' + hero.name"
      >
        <div class="media">
          <app-smart-image [src]="hero.image" [alt]="hero.name" [tone]="tone" />
          <div class="media-shade"></div>
          <span class="view-hint" aria-hidden="true">View profile &#8594;</span>
        </div>
        <div class="body">
          <h3 class="name">{{ hero.name }}</h3>
          <div class="meta">
            <app-badge [variant]="universeBadge" [label]="universeText" />
            <app-badge [variant]="alignmentBadge" [label]="alignmentLabel(hero.alignment)" />
            @if (hero.liveAction) {
              <app-badge variant="cosmic" label="Live action" />
            }
          </div>
        </div>
      </a>
    }
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
      max-width: 100%;
    }

    .card {
      display: block;
      height: 100%;
      border: 1px solid var(--panel-border);
      border-radius: 14px;
      overflow: hidden;
      background: rgba(10, 14, 22, 0.6);
      transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        box-shadow 0.25s ease;
    }

    .card:hover,
    .card:focus-visible {
      transform: translateY(-5px);
      border-color: var(--card-accent, rgba(56, 225, 255, 0.4));
      box-shadow: 0 18px 40px -18px var(--card-glow, rgba(56, 225, 255, 0.45));
    }

    .card:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    :host(.u-marvel) .card:hover,
    :host(.u-marvel) .card:focus-visible {
      --card-accent: rgba(255, 61, 78, 0.5);
      --card-glow: rgba(255, 61, 78, 0.4);
    }

    :host(.u-dc) .card:hover,
    :host(.u-dc) .card:focus-visible {
      --card-accent: rgba(47, 124, 255, 0.5);
      --card-glow: rgba(47, 124, 255, 0.4);
    }

    :host(.u-other) .card:hover,
    :host(.u-other) .card:focus-visible {
      --card-accent: rgba(148, 163, 184, 0.45);
      --card-glow: rgba(148, 163, 184, 0.25);
    }

    .media {
      position: relative;
      aspect-ratio: 3 / 4;
      overflow: hidden;
    }

    .media-shade {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 55%, rgba(4, 6, 11, 0.85) 100%);
      pointer-events: none;
    }

    .view-hint {
      position: absolute;
      right: 0.7rem;
      bottom: 0.6rem;
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.68rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
      opacity: 0;
      transform: translateY(4px);
      transition:
        opacity 0.25s ease,
        transform 0.25s ease;
    }

    .card:hover .view-hint,
    .card:focus-visible .view-hint {
      opacity: 1;
      transform: translateY(0);
    }

    @media (hover: none) {
      .view-hint {
        opacity: 1;
        transform: none;
      }
    }

    .body {
      padding: 0.85rem 0.95rem 1rem;
    }

    .name {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 1.12rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      line-height: 1.2;
      margin: 0 0 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }
  `,
})
export class CharacterCardComponent {
  @Input() hero: Superhero | null = null;

  get universeClass(): string {
    if (!this.hero) return '';
    return `u-${this.hero.universe}`;
  }

  get tone(): ImageTone {
    if (!this.hero) return 'accent';
    return this.hero.universe === 'marvel'
      ? 'marvel'
      : this.hero.universe === 'dc'
        ? 'dc'
        : 'neutral';
  }

  get universeBadge(): 'marvel' | 'dc' | 'other' {
    return this.hero?.universe ?? 'other';
  }

  get universeText(): string {
    return this.hero ? universeLabel(this.hero.universe) : '';
  }

  get alignmentBadge(): 'hero' | 'villain' | 'neutral' {
    switch (this.hero?.alignment) {
      case 'good':
        return 'hero';
      case 'bad':
        return 'villain';
      default:
        return 'neutral';
    }
  }

  /** Exposed to the template (module functions are not visible from strict templates). */
  protected readonly alignmentLabel = alignmentLabel;
}
