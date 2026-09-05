import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CharacterService } from '../../core/services/character/character-service';
import { Superhero, UniverseId } from '../../core/models/superhero';
import { SeoService } from '../../core/services/seo/seo.service';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';
import {
  FilterChipsComponent,
  ChipOption,
} from '../../shared/components/filter-chips/filter-chips.component';
import { SkeletonGridComponent } from '../../shared/components/skeleton-grid/skeleton-grid.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

type UniverseFilter = 'all' | UniverseId;
type AlignmentFilter = 'all' | 'good' | 'bad' | 'neutral';

/**
 * Character explorer: fast client-side search + universe/alignment filters
 * over the cached dataset (no API round-trips while typing).
 */
@Component({
  selector: 'app-characters-page',
  imports: [
    AsyncPipe,
    CharacterCardComponent,
    FilterChipsComponent,
    SkeletonGridComponent,
    EmptyStateComponent,
    ErrorStateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div class="container">
        <p class="kicker">Database</p>
        <h1 class="title-xl">Character files</h1>
        <p class="subtitle">
          Search the complete archive — heroes, villains and everyone in between.
        </p>
        @let allHeroes = heroes$ | async;
        @if (allHeroes?.length) {
          <p class="count">
            {{ filteredCount(allHeroes) }} of {{ allHeroes?.length ?? 0 }} characters
          </p>
        }
      </div>
    </section>

    <div class="container">
      <div class="controls">
        <form class="search" role="search" (submit)="$event.preventDefault()">
          <label class="sr-only" for="char-search">Search characters</label>
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
            id="char-search"
            class="search-input"
            type="search"
            placeholder="Search Batman, Spider-Man, Wolverine…"
            [value]="search"
            (input)="onSearchInput($event)"
            autocomplete="off"
          />
          @if (search) {
            <button type="button" class="clear" (click)="clearSearch()" aria-label="Clear search">
              &#10005;
            </button>
          }
        </form>

        <div class="chip-groups">
          <app-filter-chips
            label="Filter by universe"
            [options]="universeOptions"
            [value]="universe"
            (select)="onUniverseSelect($event)"
          />
          <app-filter-chips
            label="Filter by alignment"
            [options]="alignmentOptions"
            [value]="alignment"
            (select)="onAlignmentSelect($event)"
          />
        </div>
      </div>

      @let heroes = heroes$ | async;
      @let loading = (loading$ | async) ?? false;
      @let error = error$ | async;
      @let filtered = filterHeroes(heroes);
      @let visible = visibleSlice(filtered);

      @if (loading && !heroes?.length) {
        <app-skeleton-grid [count]="8" variant="character" class="grid-block" />
      } @else if (error && !heroes?.length) {
        <app-error-state (retry)="retry()" />
      } @else if (heroes?.length) {
        @if (filtered.length === 0) {
          <app-empty-state
            title="No characters in this slice of the multiverse"
            [message]="emptyHint"
            actionLabel="Clear all filters"
            (action)="clearFilters()"
          />
        } @else {
          @if (error) {
            <div class="stale-note" role="status">
              Live data link failed — showing the cached archive.
              <button type="button" class="retry-link" (click)="retry()">Retry</button>
            </div>
          }
          <div class="grid">
            @for (hero of visible; track hero.slug) {
              <app-character-card [hero]="hero" />
            }
          </div>
          @if (visible.length < filtered.length) {
            <div class="load-more">
              <button type="button" class="btn btn-ghost" (click)="loadMore()">
                Load more ({{ filtered.length - visible.length }} remaining)
              </button>
            </div>
          }
        }
      }

      <p class="source-note">
        @let label = sourceLabel$ | async;
        @if (label) {
          Character data: {{ label }} · Images © their respective owners.
        }
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
      max-width: 52ch;
      line-height: 1.6;
    }

    .count {
      margin: 1rem 0 0;
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 0.8rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--text-2);
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
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
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
      letter-spacing: 0.02em;
    }

    .search-input::placeholder {
      color: var(--text-2);
    }

    .clear {
      flex-shrink: 0;
      border: none;
      background: rgba(148, 163, 184, 0.12);
      color: var(--text-1);
      border-radius: 8px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      font-size: 0.8rem;
    }

    .clear:hover {
      color: var(--text-0);
      background: rgba(148, 163, 184, 0.2);
    }

    .chip-groups {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.1rem;
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

    .grid-block {
      margin-bottom: 2rem;
    }

    .load-more {
      display: flex;
      justify-content: center;
      margin: 2.2rem 0 1rem;
    }

    .stale-note {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 1.2rem;
      padding: 0.8rem 1rem;
      border: 1px solid rgba(255, 122, 41, 0.35);
      background: rgba(255, 122, 41, 0.06);
      border-radius: 10px;
      color: var(--text-1);
      font-size: 0.9rem;
    }

    .retry-link {
      border: none;
      background: none;
      color: var(--accent);
      font-family: var(--font-ui);
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-size: 0.78rem;
      cursor: pointer;
    }

    .retry-link:hover {
      text-decoration: underline;
    }

    .source-note {
      margin: 2.5rem 0 1rem;
      color: var(--text-2);
      font-size: 0.78rem;
      line-height: 1.6;
    }
  `,
})
export class CharactersPageComponent {
  private readonly characters = inject(CharacterService);
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly heroes$ = this.characters.heroes$;
  protected readonly loading$ = this.characters.loading$;
  protected readonly error$ = this.characters.error$;
  protected readonly sourceLabel$ = this.characters.sourceLabel$;

  protected readonly universeOptions: readonly ChipOption<UniverseFilter>[] = [
    { value: 'all', label: 'All' },
    { value: 'marvel', label: 'Marvel' },
    { value: 'dc', label: 'DC' },
    { value: 'other', label: 'Other' },
  ];

  protected readonly alignmentOptions: readonly ChipOption<AlignmentFilter>[] = [
    { value: 'all', label: 'All' },
    { value: 'good', label: 'Heroes' },
    { value: 'bad', label: 'Villains' },
    { value: 'neutral', label: 'Neutral' },
  ];

  protected search = '';
  protected universe: UniverseFilter = 'all';
  protected alignment: AlignmentFilter = 'all';
  protected visibleCount = 24;

  constructor() {
    this.seo.apply({
      title: 'Character Database',
      description:
        'Search 560+ Marvel, DC and multiverse character files — biographies, power stats, appearance and connections.',
      path: '/characters',
    });

    // Deep links: /characters?q=batman&universe=dc
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const q = typeof params['q'] === 'string' ? params['q'] : '';
      const universe = params['universe'];
      this.search = q;
      this.universe =
        universe === 'marvel' || universe === 'dc' || universe === 'other' ? universe : 'all';
      this.visibleCount = 24;
      this.seo.apply({
        title: 'Marvel & DC Character Database',
        description:
          'Explore superhero character profiles, biographies, powers and comic-book connections from Marvel, DC and beyond.',
        path: '/characters',
        noindex: !!q || this.universe !== 'all',
      });
    });

    this.characters.load();
  }

  protected onSearchInput(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
    this.visibleCount = 24;
  }

  protected clearSearch(): void {
    this.search = '';
    this.visibleCount = 24;
  }

  protected onUniverseSelect(value: UniverseFilter): void {
    this.universe = value;
    this.visibleCount = 24;
  }

  protected onAlignmentSelect(value: AlignmentFilter): void {
    this.alignment = value;
    this.visibleCount = 24;
  }

  protected clearFilters(): void {
    this.search = '';
    this.universe = 'all';
    this.alignment = 'all';
    this.visibleCount = 24;
    void this.router.navigate([], {
      queryParams: {},
      replaceUrl: true,
    });
  }

  protected filterHeroes(heroes: Superhero[] | null | undefined): Superhero[] {
    if (!heroes) return [];
    const q = this.search.trim().toLowerCase();
    return heroes.filter((hero) => {
      if (this.universe !== 'all' && hero.universe !== this.universe) return false;
      if (this.alignment !== 'all' && hero.alignment !== this.alignment) return false;
      if (q) {
        const fullName = hero.biography?.fullName?.toLowerCase() ?? '';
        if (!hero.name.toLowerCase().includes(q) && !fullName.includes(q)) return false;
      }
      return true;
    });
  }

  protected visibleSlice(filtered: readonly Superhero[]): readonly Superhero[] {
    return filtered.slice(0, this.visibleCount);
  }

  protected filteredCount(heroes: Superhero[] | null | undefined): number {
    if (!heroes) return 0;
    return this.filterHeroes(heroes).length;
  }

  protected loadMore(): void {
    this.visibleCount += 40;
  }

  protected retry(): void {
    this.characters.retry();
  }

  protected get emptyHint(): string {
    if (this.search) {
      return `No files match “${this.search}”. Try a different name or clear the filters below.`;
    }
    return 'No characters match the current filters. Try broadening your selection.';
  }
}
