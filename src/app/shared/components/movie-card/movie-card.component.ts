import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../core/models/movie';
import { TrackDirective } from '../../directives/track.directive';
import { BadgeComponent } from '../badge/badge.component';

/**
 * Typographic "poster" card — deliberately photo-free:
 * no hotlinked studio artwork, no licensing risk, consistent design.
 */
@Component({
  selector: 'app-movie-card',
  imports: [NgClass, RouterLink, TrackDirective, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (movie) {
      <a
        class="card"
        [ngClass]="universeClass"
        [routerLink]="['/movies', movie.slug]"
        appTrack="card_movie_open"
        [attr.aria-label]="movieTitle"
      >
        <div class="poster">
          <span class="sprockets" aria-hidden="true"></span>
          <span class="year">{{ movie.year }}</span>
          <span class="monogram" aria-hidden="true">{{ monogram }}</span>
          <div class="poster-body">
            <h3 class="title">{{ movie.title }}</h3>
            <span class="rule" aria-hidden="true"></span>
          </div>
          <div class="meta">
            <app-badge variant="outline" [label]="kindLabel" />
            <app-badge [variant]="universeBadge" [label]="universeText" />
          </div>
        </div>
        <div class="strip">
          <span class="tagline">{{ movie.tagline }}</span>
        </div>
      </a>
    }
  `,
  styles: `
    :host {
      display: block;
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
      box-shadow: 0 18px 40px -18px var(--card-glow, rgba(56, 225, 255, 0.4));
    }

    :host(.u-marvel) .card:hover {
      --card-accent: rgba(255, 61, 78, 0.5);
      --card-glow: rgba(255, 61, 78, 0.4);
    }

    :host(.u-dc) .card:hover {
      --card-accent: rgba(47, 124, 255, 0.5);
      --card-glow: rgba(47, 124, 255, 0.4);
    }

    .poster {
      position: relative;
      aspect-ratio: 2 / 3;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      background:
        radial-gradient(130% 80% at 50% 0%, rgba(56, 225, 255, 0.1), transparent 60%),
        linear-gradient(180deg, #0b1120 0%, #070a12 100%);
    }

    :host(.u-marvel) .poster {
      background:
        radial-gradient(130% 80% at 50% 0%, rgba(255, 61, 78, 0.18), transparent 60%),
        linear-gradient(180deg, #170b10 0%, #070a12 100%);
    }

    :host(.u-dc) .poster {
      background:
        radial-gradient(130% 80% at 50% 0%, rgba(47, 124, 255, 0.18), transparent 60%),
        linear-gradient(180deg, #0a1020 0%, #070a12 100%);
    }

    /* Film-strip sprocket edge across the top of the poster. */
    .sprockets {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 9px;
      background-image: repeating-linear-gradient(
        90deg,
        rgba(232, 236, 244, 0.14) 0 9px,
        transparent 9px 21px
      );
      pointer-events: none;
    }

    .year {
      position: relative;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(1.4rem, 2.6vw, 1.8rem);
      letter-spacing: 0.06em;
      color: rgba(232, 236, 244, 0.4);
      text-shadow: 0 0 18px rgba(56, 225, 255, 0.25);
    }

    :host(.u-marvel) .year {
      text-shadow: 0 0 18px rgba(255, 61, 78, 0.35);
    }

    :host(.u-dc) .year {
      text-shadow: 0 0 18px rgba(47, 124, 255, 0.35);
    }

    /* Ghost monogram anchoring the empty middle of the poster. */
    .monogram {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(4.2rem, 7vw, 6rem);
      color: rgba(232, 236, 244, 0.045);
      -webkit-text-stroke: 1px rgba(232, 236, 244, 0.16);
      pointer-events: none;
      user-select: none;
    }

    :host(.u-marvel) .monogram {
      color: rgba(255, 61, 78, 0.05);
      -webkit-text-stroke-color: rgba(255, 61, 78, 0.32);
    }

    :host(.u-dc) .monogram {
      color: rgba(47, 124, 255, 0.05);
      -webkit-text-stroke-color: rgba(47, 124, 255, 0.32);
    }

    .poster-body {
      position: relative;
      margin-top: auto;
      text-align: center;
      padding: 0 0.4rem;
    }

    .title {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(1.15rem, 2.1vw, 1.45rem);
      line-height: 1.12;
      letter-spacing: 0.02em;
      margin: 0;
      text-transform: uppercase;
    }

    .rule {
      display: block;
      width: 44px;
      height: 2px;
      margin: 0.65rem auto 0;
      border-radius: 2px;
      background: var(--accent);
      opacity: 0.65;
      box-shadow: 0 0 10px rgba(56, 225, 255, 0.5);
    }

    :host(.u-marvel) .rule {
      background: var(--marvel);
      box-shadow: 0 0 10px rgba(255, 61, 78, 0.5);
    }

    :host(.u-dc) .rule {
      background: var(--dc);
      box-shadow: 0 0 10px rgba(47, 124, 255, 0.5);
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: 0.8rem;
    }

    .strip {
      padding: 0.7rem 1rem;
      border-top: 1px solid var(--panel-border);
      min-height: 3rem;
      display: flex;
      align-items: center;
    }

    .tagline {
      color: var(--text-1);
      font-size: 0.82rem;
      font-style: italic;
      line-height: 1.45;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `,
})
export class MovieCardComponent {
  @Input() movie: Movie | null = null;

  get universeClass(): string {
    if (!this.movie) return '';
    return this.movie.universe === 'other' ? '' : `u-${this.movie.universe}`;
  }

  get universeBadge(): 'marvel' | 'dc' | 'other' {
    return this.movie?.universe ?? 'other';
  }

  get universeText(): string {
    switch (this.movie?.universe) {
      case 'marvel':
        return 'Marvel';
      case 'dc':
        return 'DC';
      default:
        return 'Multiverse';
    }
  }

  get kindLabel(): string {
    return this.movie?.kind === 'series' ? 'Series' : 'Film';
  }

  get movieTitle(): string {
    return this.movie ? `${this.movie.title} (${this.movie.year})` : '';
  }

  /** First significant letter of the title (skips "The"/"A"/"An") — poster monogram. */
  get monogram(): string {
    if (!this.movie) return '';
    const words = this.movie.title.replace(/&/g, ' and ').split(/\s+/);
    const first = words.find((w) => !['the', 'a', 'an'].includes(w.toLowerCase())) ?? words[0];
    return (first[0] ?? '').toUpperCase();
  }
}
