import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { MovieService } from '../../core/services/movie/movie-service';
import { SeoService } from '../../core/services/seo/seo.service';
import { Movie } from '../../core/models/movie';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { FilterChipsComponent, ChipOption } from '../../shared/components/filter-chips/filter-chips.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

type MovieUniverseFilter = 'all' | 'marvel' | 'dc' | 'other';
type KindFilter = 'all' | 'film' | 'series';

/**
 * Movies & TV shelf — curated archive (V1). Filterable by universe and
 * kind, with search. Same service contract a future TMDB source will use.
 */
@Component({
  selector: 'app-movies-page',
  imports: [
    AsyncPipe,
    MovieCardComponent,
    FilterChipsComponent,
    EmptyStateComponent,
    ErrorStateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div class="container">
        <p class="kicker">Cinema &amp; screen</p>
        <h1 class="title-xl">Movies &amp; TV</h1>
        <p class="subtitle">
          The superhero shelf — iconic films and the series that expanded the
          multiverse. Curated by the community team.
        </p>
      </div>
    </section>

    <div class="container">
      <div class="controls">
        <form class="search" role="search" (submit)="$event.preventDefault()">
          <label class="sr-only" for="movie-search">Search movies and series</label>
          <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2" />
            <path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <input
            id="movie-search"
            class="search-input"
            type="search"
            placeholder="Search The Dark Knight, Loki, The Flash…"
            [value]="search"
            (input)="onSearchInput($event)"
            autocomplete="off"
          />
        </form>
        <div class="chip-groups">
          <app-filter-chips
            label="Filter by universe"
            [options]="universeOptions"
            [value]="universe"
            (select)="onUniverseSelect($event)"
          />
          <app-filter-chips
            label="Filter by format"
            [options]="kindOptions"
            [value]="kind"
            (select)="onKindSelect($event)"
          />
        </div>
      </div>

      @let movies = (movies$ | async);
      @let loading = (loading$ | async) ?? false;
      @let error = (error$ | async);
      @let filtered = filterMovies(movies);

      @if (loading && !movies?.length) {
        <div class="loading-note" role="status">Loading the shelf…</div>
      } @else if (error && !movies?.length) {
        <app-error-state (retry)="retry()" />
      } @else if (movies?.length) {
        @if (filtered.length === 0) {
          <app-empty-state
            title="Nothing on this shelf"
            [message]="emptyHint"
            actionLabel="Clear filters"
            (action)="clearFilters()"
          />
        } @else {
          <p class="count">{{ filtered.length }} title{{ filtered.length === 1 ? '' : 's' }}</p>
          <div class="grid">
            @for (movie of filtered; track movie.slug) {
              <app-movie-card [movie]="movie" />
            }
          </div>
        }
      }

      <p class="source-note">
        Curated archive — titles, years and credits are real; artwork is
        intentionally typographic (no hotlinked studio images).
      </p>
    </div>
  `,
  styles: `
    .page-head {
      padding: 3.2rem 0 1.6rem;
    }

    .title-xl {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(1.9rem, 4.5vw, 3rem);
      letter-spacing: 0.03em;
      margin: 0.4rem 0 0.5rem;
    }

    .subtitle {
      color: var(--text-1);
      margin: 0;
      max-width: 56ch;
      line-height: 1.6;
    }

    .controls {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 1.4rem 0 1.8rem;
    }

    .search {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      border: 1px solid var(--panel-border);
      border-radius: 12px;
      background: rgba(148, 163, 184, 0.07);
      padding: 0.5rem 0.6rem 0.5rem 1rem;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .search:focus-within {
      border-color: rgba(56, 225, 255, 0.5);
      box-shadow: 0 0 18px rgba(56, 225, 255, 0.12);
    }

    .search-icon {
      color: var(--text-2);
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      min-width: 0;
      background: transparent;
      border: none;
      outline: none;
      color: var(--text-0);
      font-family: var(--font-ui);
      font-size: 1rem;
    }

    .search-input::placeholder {
      color: var(--text-2);
    }

    .chip-groups {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .loading-note {
      color: var(--text-2);
      font-family: var(--font-ui);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-size: 0.8rem;
      padding: 2rem 0;
    }

    .count {
      margin: 0 0 1rem;
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 0.78rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--text-2);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.1rem;
    }

    @media (min-width: 700px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 1100px) {
      .grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .source-note {
      margin: 2.5rem 0 1rem;
      color: var(--text-2);
      font-size: 0.78rem;
      line-height: 1.6;
    }
  `,
})
export class MoviesPageComponent {
  private readonly moviesService = inject(MovieService);
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly movies$ = this.moviesService.movies$;
  protected readonly loading$ = this.moviesService.loading$;
  protected readonly error$ = this.moviesService.error$;

  protected readonly universeOptions: readonly ChipOption<MovieUniverseFilter>[] = [
    { value: 'all', label: 'All' },
    { value: 'marvel', label: 'Marvel' },
    { value: 'dc', label: 'DC' },
    { value: 'other', label: 'Multiverse' },
  ];

  protected readonly kindOptions: readonly ChipOption<KindFilter>[] = [
    { value: 'all', label: 'All' },
    { value: 'film', label: 'Films' },
    { value: 'series', label: 'Series' },
  ];

  protected search = '';
  protected universe: MovieUniverseFilter = 'all';
  protected kind: KindFilter = 'all';

  constructor() {
    this.seo.apply({
      title: 'Movies & TV',
      description:
        'The superhero movie & TV shelf — Marvel, DC and multiverse films and series, curated by The Superhero Universe.',
      path: '/movies',
    });
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.moviesService.load();
      }
    });
  }

  protected onSearchInput(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
  }

  protected onUniverseSelect(value: MovieUniverseFilter): void {
    this.universe = value;
  }

  protected onKindSelect(value: KindFilter): void {
    this.kind = value;
  }

  protected clearFilters(): void {
    this.search = '';
    this.universe = 'all';
    this.kind = 'all';
  }

  protected filterMovies(movies: readonly Movie[] | null | undefined): Movie[] {
    if (!movies) return [];
    const q = this.search.trim().toLowerCase();
    return movies.filter((movie) => {
      if (this.universe !== 'all' && movie.universe !== this.universe) return false;
      if (this.kind !== 'all' && movie.kind !== this.kind) return false;
      if (q && !movie.title.toLowerCase().includes(q) && !String(movie.year).includes(q)) {
        return false;
      }
      return true;
    });
  }

  protected retry(): void {
    this.moviesService.retry();
  }

  protected get emptyHint(): string {
    return this.search
      ? `No titles match “${this.search}”. Try a different name or year.`
      : 'No titles match the current filters.';
  }
}
