import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie, MOVIE_COLLECTIONS, RELEASE_TYPE_LABELS } from '../../../core/models/movie';
import { TrackDirective } from '../../directives/track.directive';
import { BadgeComponent } from '../badge/badge.component';
import { MoviePosterComponent } from '../movie-poster/movie-poster.component';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, TrackDirective, BadgeComponent, MoviePosterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (movie) {
      <a
        class="card"
        [class.u-marvel]="movie.universe === 'marvel'"
        [class.u-dc]="movie.universe === 'dc'"
        [routerLink]="['/movies', movie.slug]"
        appTrack="card_movie_open"
        [attr.aria-label]="movie.title + ' (' + movie.year + ') — view details'"
      >
        <div class="poster">
          <app-movie-poster [movie]="movie" [eager]="eager" />
        </div>
        <div class="body">
          <div class="meta">
            <app-badge
              [variant]="
                movie.universe === 'marvel' ? 'marvel' : movie.universe === 'dc' ? 'dc' : 'other'
              "
              [label]="
                movie.universe === 'marvel'
                  ? 'Marvel'
                  : movie.universe === 'dc'
                    ? 'DC'
                    : 'Multiverse'
              "
            />
            <span class="year">{{ movie.year }}</span>
          </div>
          <h3 class="title">{{ movie.title }}</h3>
          <p class="collection">{{ collections[movie.collection] }}</p>
          <p class="format">
            {{ releaseTypes[movie.releaseType] }}
            <span aria-hidden="true"> · </span>
            {{ movie.format === 'live-action' ? 'Live action' : 'Animated' }}
          </p>
        </div>
      </a>
    }
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      border: 1px solid var(--panel-border);
      border-radius: 14px;
      background: rgba(10, 14, 22, 0.85);
      color: var(--text-0);
      text-decoration: none;
      transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        box-shadow 0.25s ease;
      --card-accent: rgba(168, 85, 247, 0.55);
    }
    .card.u-marvel {
      --card-accent: rgba(255, 61, 78, 0.55);
    }
    .card.u-dc {
      --card-accent: rgba(47, 124, 255, 0.55);
    }
    .card:hover,
    .card:focus-visible {
      transform: translateY(-5px);
      border-color: var(--card-accent);
      box-shadow: 0 18px 40px -18px var(--card-accent);
    }
    .poster {
      position: relative;
      aspect-ratio: 2 / 3;
      background: #080c14;
      border-bottom: 1px solid var(--panel-border);
    }
    .poster app-movie-poster {
      position: absolute;
      inset: 0;
    }
    .body {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 0.9rem;
      gap: 0.5rem;
    }
    .meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }
    .year {
      color: var(--text-1);
      font-family: var(--font-ui);
      font-size: 0.82rem;
    }
    .title {
      margin: 0.15rem 0 0;
      font-family: var(--font-display);
      font-size: clamp(1rem, 1.7vw, 1.2rem);
      line-height: 1.3;
      overflow-wrap: anywhere;
    }
    .collection {
      margin: 0;
      color: var(--text-1);
      font-size: 0.76rem;
      line-height: 1.5;
    }
    .format {
      margin: auto 0 0;
      padding-top: 0.3rem;
      color: var(--text-2);
      font-size: 0.72rem;
      line-height: 1.5;
    }
    @media (prefers-reduced-motion: reduce) {
      .card {
        transition: none;
      }
      .card:hover,
      .card:focus-visible {
        transform: none;
      }
    }
  `,
})
export class MovieCardComponent {
  @Input() movie?: Movie;
  @Input() eager = false;
  protected readonly collections = MOVIE_COLLECTIONS;
  protected readonly releaseTypes = RELEASE_TYPE_LABELS;
}
