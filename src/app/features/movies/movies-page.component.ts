import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MovieService } from '../../core/services/movie/movie-service';
import { SeoService } from '../../core/services/seo/seo.service';
import { MOVIE_COLLECTIONS, MovieCollection } from '../../core/models/movie';
import { CATALOG_REVIEWED_AT } from '../../core/data-access/movie/data/movie-data';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import {
  FilterChipsComponent,
  ChipOption,
} from '../../shared/components/filter-chips/filter-chips.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import {
  MovieFilters,
  MovieSort,
  MOVIE_PAGE_SIZE,
  DEFAULT_MOVIE_FILTERS,
  filterMovies,
  readMovieFilters,
  readMoviePage,
  movieQueryParams,
} from './movie-filters';

@Component({
  selector: 'app-movies-page',
  imports: [
    DatePipe,
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
          From the earliest screen heroes to the MCU and DCU. Explore the classics, the standalone
          stories and the films that brought the multiverse together.
        </p>
        <div class="archive-stats" aria-label="Live-action film catalog">
          <span
            ><strong>{{ filmCounts().total }}</strong> live-action films</span
          >
          <span class="marvel-count">{{ filmCounts().marvel }} Marvel</span>
          <span class="dc-count">{{ filmCounts().dc }} DC</span>
          <span class="reviewed"
            >Catalog reviewed {{ reviewedAt | date: 'd MMM yyyy' : 'UTC' }}</span
          >
        </div>
      </div>
    </section>

    <div class="container">
      <div class="controls">
        <form class="search" role="search" (submit)="$event.preventDefault()">
          <label class="sr-only" for="movie-search">Search movies, cast, directors or years</label>
          <svg
            class="search-icon"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2" />
            <path
              d="m15.5 15.5 5 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <input
            id="movie-search"
            class="search-input"
            type="search"
            placeholder="Search a title, actor, director or year…"
            [value]="filters().search"
            (input)="onSearchInput($event)"
            autocomplete="off"
          />
        </form>
        <div class="chip-row">
          <span class="control-label" aria-hidden="true">Universe</span>
          <app-filter-chips
            label="Filter by universe"
            [options]="universeOptions"
            [value]="filters().universe"
            (select)="updateFilters({ universe: $event, collection: 'all' })"
          />
        </div>
        <div class="chip-row">
          <span class="control-label" aria-hidden="true">Type</span>
          <app-filter-chips
            label="Filter by type"
            [options]="kindOptions"
            [value]="filters().kind"
            (select)="updateFilters({ kind: $event })"
          />
        </div>
        <div class="select-row">
          <label class="select-field">
            <span>Style</span>
            <select
              aria-label="Filter by style"
              [value]="filters().format"
              (change)="onFormatChange($event)"
            >
              <option value="all">All styles</option>
              <option value="live-action">Live action</option>
              <option value="animation">Animation</option>
            </select>
          </label>
          <label class="select-field collection-field">
            <span>Collection</span>
            <select
              aria-label="Filter by collection"
              [value]="filters().collection"
              (change)="onCollectionChange($event)"
            >
              <option value="all">All collections</option>
              @for (collection of collectionOptions(); track collection.value) {
                <option [value]="collection.value">{{ collection.label }}</option>
              }
            </select>
          </label>
          <label class="select-field">
            <span>Sort</span>
            <select
              aria-label="Sort movies"
              [value]="filters().sort"
              (change)="onSortChange($event)"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="title">Title A–Z</option>
            </select>
          </label>
          <button type="button" class="clear-btn" (click)="clearFilters()">Clear filters</button>
        </div>
      </div>

      @if (loading() && !movies().length) {
        <div class="loading-note" role="status">Loading the shelf…</div>
      } @else if (error() && !movies().length) {
        <app-error-state (retry)="retry()" />
      } @else if (filtered().length === 0) {
        <app-empty-state
          title="Nothing on this shelf"
          [message]="
            filters().search
              ? 'No titles match “' + filters().search + '”. Try another title, actor or year.'
              : 'No titles match the current filters.'
          "
          actionLabel="Clear filters"
          (action)="clearFilters()"
        />
      } @else {
        <div class="results-bar">
          <p #resultsHeading class="count" tabindex="-1" aria-live="polite" aria-atomic="true">
            <strong>{{ filtered().length }}</strong> title{{ filtered().length === 1 ? '' : 's' }}
            <span>Showing {{ startIndex() + 1 }}–{{ startIndex() + visibleMovies().length }}</span>
          </p>
          <span class="poster-state" role="status">
            @switch (posterStatus()) {
              @case ('checking') {
                Checking online posters…
              }
              @case ('live') {
                Poster links checked {{ checkedAt() | date: 'd MMM yyyy' : 'UTC' }}
              }
              @case ('partial') {
                Some poster updates unavailable · saved links retained
              }
              @case ('snapshot') {
                Online refresh unavailable · using saved poster links
              }
              @default {
                Real release artwork
              }
            }
          </span>
        </div>
        <div class="grid">
          @for (movie of visibleMovies(); track movie.slug; let index = $index) {
            <app-movie-card [movie]="movie" [eager]="index < 4" />
          }
        </div>
        @if (pageCount() > 1) {
          <nav class="pagination" aria-label="Movie archive pages">
            <button
              type="button"
              class="btn btn-ghost"
              [disabled]="currentPage() === 1"
              (click)="goToPage(currentPage() - 1)"
            >
              Previous
            </button>
            <label class="page-picker"
              >Page
              <select
                aria-label="Go to page"
                [value]="currentPage()"
                (change)="onPageSelect($event)"
              >
                @for (pageNumber of pageNumbers(); track pageNumber) {
                  <option [value]="pageNumber">{{ pageNumber }}</option>
                }
              </select>
              of {{ pageCount() }}
            </label>
            <button
              type="button"
              class="btn btn-ghost"
              [disabled]="currentPage() === pageCount()"
              (click)="goToPage(currentPage() + 1)"
            >
              Next
            </button>
          </nav>
        }
      }

      <div class="source-note">
        <p>
          Released live-action features, TV films and selected alternate cuts, plus a small
          animation and series shelf. Marvel/DC imprint adaptations have their own collections; they
          are not part of the MCU or DCU.
        </p>
        <p>
          Credits are editorially verified, not a live ratings feed. Posters load online from studio
          and Wikimedia sources; updated poster lookups are cached for up to 24 hours. All artwork
          belongs to its respective owners. Each detail page links to its source. Unreleased
          projects, shorts and serials are not counted.
        </p>
        @if (posterStatus() === 'snapshot' || posterStatus() === 'partial') {
          <button class="text-btn" type="button" (click)="refreshPosters()">
            Retry poster refresh
          </button>
        }
      </div>
    </div>
  `,
  styles: `
    .page-head {
      padding: 3.2rem 0 1rem;
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
      max-width: 68ch;
      line-height: 1.6;
    }
    .archive-stats {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem 1.2rem;
      align-items: center;
      margin-top: 1.3rem;
      font-size: 0.82rem;
      color: var(--text-1);
    }
    .archive-stats strong {
      color: var(--text-0);
    }
    .marvel-count {
      color: #ff8a97;
    }
    .dc-count {
      color: #8ab8ff;
    }
    .reviewed {
      color: var(--text-2);
      font-size: 0.73rem;
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
      padding: 0.8rem 1rem;
    }
    .search:focus-within {
      border-color: var(--accent);
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
    .chip-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.7rem;
    }
    .control-label {
      width: 74px;
      font-family: var(--font-ui);
      font-size: 0.68rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-2);
    }
    .select-row {
      display: flex;
      flex-wrap: wrap;
      align-items: end;
      gap: 0.8rem;
    }
    .select-field {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      flex: 1 1 140px;
      min-width: 0;
    }
    .select-field > span {
      font-size: 0.7rem;
      font-family: var(--font-ui);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-2);
    }
    .collection-field {
      flex-grow: 2;
    }
    select {
      color: var(--text-0);
      background: #101521;
      border: 1px solid var(--panel-border);
      border-radius: 8px;
      padding: 0.7rem 0.65rem;
      font: inherit;
      font-size: 0.85rem;
      max-width: 100%;
      min-height: 42px;
    }
    .clear-btn,
    .text-btn {
      border: 0;
      background: none;
      color: var(--accent);
      font: inherit;
      font-size: 0.8rem;
      cursor: pointer;
      min-height: 42px;
    }
    .clear-btn {
      padding: 0.7rem 0.4rem;
    }
    .text-btn {
      padding: 0;
      text-decoration: underline;
    }
    .results-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: baseline;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .count {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
      margin: 0;
      color: var(--text-1);
      font-size: 0.8rem;
      scroll-margin-top: 100px;
    }
    .count span {
      color: var(--text-2);
      margin-left: 0.4rem;
    }
    .poster-state {
      color: var(--text-2);
      font-size: 0.7rem;
    }
    .loading-note {
      color: var(--text-2);
      padding: 2rem 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.1rem;
    }
    .pagination {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin: 2rem 0;
    }
    .page-picker {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-1);
      font-size: 0.8rem;
    }
    .pagination .btn {
      padding: 0.6rem 0.9rem;
      font-size: 0.75rem;
    }
    .pagination button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .source-note {
      margin: 2.5rem 0 1.5rem;
      color: var(--text-2);
      font-size: 0.76rem;
      line-height: 1.7;
      max-width: 100ch;
    }
    @media (min-width: 700px) {
      .grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
    @media (min-width: 1100px) {
      .grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
    @media (max-width: 440px) {
      .grid {
        gap: 0.65rem;
      }
      .control-label {
        width: 100%;
      }
      .pagination {
        gap: 0.65rem;
      }
    }
  `,
})
export class MoviesPageComponent {
  private readonly moviesService = inject(MovieService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);
  @ViewChild('resultsHeading') private resultsHeading?: ElementRef<HTMLElement>;

  protected readonly movies = toSignal(this.moviesService.movies$, { initialValue: [] });
  protected readonly loading = toSignal(this.moviesService.loading$, { initialValue: false });
  protected readonly error = toSignal(this.moviesService.error$, { initialValue: null });
  protected readonly posterStatus = this.moviesService.posterStatus;
  protected readonly checkedAt = this.moviesService.postersCheckedAt;
  protected readonly reviewedAt = CATALOG_REVIEWED_AT;
  protected readonly filters = signal<MovieFilters>({ ...DEFAULT_MOVIE_FILTERS });
  private readonly requestedPage = signal(1);
  protected readonly filtered = computed(() => filterMovies(this.movies(), this.filters()));
  protected readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.filtered().length / MOVIE_PAGE_SIZE)),
  );
  protected readonly currentPage = computed(() => Math.min(this.requestedPage(), this.pageCount()));
  protected readonly startIndex = computed(() => (this.currentPage() - 1) * MOVIE_PAGE_SIZE);
  protected readonly visibleMovies = computed(() =>
    this.filtered().slice(this.startIndex(), this.startIndex() + MOVIE_PAGE_SIZE),
  );
  protected readonly pageNumbers = computed(() =>
    Array.from({ length: this.pageCount() }, (_, index) => index + 1),
  );
  protected readonly filmCounts = computed(() => {
    const films = this.movies().filter(
      (movie) => movie.kind === 'film' && movie.format === 'live-action',
    );
    return {
      total: films.length,
      marvel: films.filter((movie) => movie.universe === 'marvel').length,
      dc: films.filter((movie) => movie.universe === 'dc').length,
    };
  });
  protected readonly collectionOptions = computed(() =>
    Object.entries(MOVIE_COLLECTIONS)
      .filter(([value]) =>
        this.movies().some(
          (movie) =>
            movie.collection === value &&
            (this.filters().universe === 'all' || movie.universe === this.filters().universe),
        ),
      )
      .map(([value, label]) => ({ value, label })),
  );

  protected readonly universeOptions: readonly ChipOption<MovieFilters['universe']>[] = [
    { value: 'all', label: 'All' },
    { value: 'marvel', label: 'Marvel' },
    { value: 'dc', label: 'DC' },
    { value: 'other', label: 'Multiverse' },
  ];
  protected readonly kindOptions: readonly ChipOption<MovieFilters['kind']>[] = [
    { value: 'all', label: 'All' },
    { value: 'film', label: 'Films' },
    { value: 'series', label: 'Series' },
  ];

  constructor() {
    this.moviesService.load(); // Bundled data is safe and immediate on SSR, too.
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.filters.set(readMovieFilters(params));
      this.requestedPage.set(readMoviePage(params));
    });
    this.seo.apply({
      title: 'Movies & TV',
      description:
        'Explore Marvel and DC live-action films, classic adaptations and selected series with real posters, cast, directors and searchable collections.',
      path: '/movies',
    });
    afterNextRender(() => this.moviesService.refreshPosters());
  }

  protected updateFilters(patch: Partial<MovieFilters>, replaceUrl = false): void {
    const next = { ...this.filters(), ...patch };
    this.filters.set(next);
    this.requestedPage.set(1);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: movieQueryParams(next),
      replaceUrl,
    });
  }
  protected onSearchInput(event: Event): void {
    this.updateFilters({ search: (event.target as HTMLInputElement).value }, true);
  }
  protected onFormatChange(event: Event): void {
    this.updateFilters({
      format: (event.target as HTMLSelectElement).value as MovieFilters['format'],
    });
  }
  protected onCollectionChange(event: Event): void {
    this.updateFilters({
      collection: (event.target as HTMLSelectElement).value as MovieCollection | 'all',
    });
  }
  protected onSortChange(event: Event): void {
    this.updateFilters({ sort: (event.target as HTMLSelectElement).value as MovieSort });
  }
  protected onPageSelect(event: Event): void {
    this.goToPage(Number((event.target as HTMLSelectElement).value));
  }
  protected clearFilters(): void {
    this.updateFilters({ ...DEFAULT_MOVIE_FILTERS, kind: 'all', format: 'all' });
  }
  protected goToPage(page: number): void {
    const next = Math.max(1, Math.min(page, this.pageCount()));
    this.requestedPage.set(next);
    void this.router
      .navigate([], { relativeTo: this.route, queryParams: movieQueryParams(this.filters(), next) })
      .then(() => {
        this.resultsHeading?.nativeElement.focus({ preventScroll: true });
        this.resultsHeading?.nativeElement.scrollIntoView({ block: 'start' });
      });
  }
  protected retry(): void {
    this.moviesService.retry();
  }
  protected refreshPosters(): void {
    this.moviesService.refreshPosters(true);
  }
}
