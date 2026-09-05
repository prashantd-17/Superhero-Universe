import { AsyncPipe, NgClass } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieService } from '../../core/services/movie/movie-service';
import { SeoService } from '../../core/services/seo/seo.service';
import { Movie } from '../../core/models/movie';
import { AdSlotComponent } from '../../shared/components/ad-slot/ad-slot.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

/** Movie/TV dossier (curated archive). */
@Component({
  selector: 'app-movie-detail-page',
  imports: [AsyncPipe, NgClass, RouterLink, AdSlotComponent, BadgeComponent, EmptyStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let movies = (movies$ | async);
    @let loading = (loading$ | async) ?? false;
    @let error = (error$ | async);
    @let movie = findMovie(movies);

    @if (loading && !movie) {
      <div class="container pad">
        <div class="loading-note" role="status">Opening the file…</div>
      </div>
    } @else if (error && !movie) {
      <div class="container pad">
        <app-error-state (retry)="retry()" />
      </div>
    } @else if (!movie) {
      <div class="container pad">
        <app-empty-state
          title="Title not found"
          message="This title is not on the shelf yet. It may have been moved or the link may be mistyped."
          actionLabel="Back to the shelf"
          (action)="backToShelf()"
        />
      </div>
    } @else {
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a routerLink="/movies">Movies &amp; TV</a>
          <span aria-hidden="true">/</span>
          <span class="current">{{ movie.title }}</span>
        </nav>

        <header class="head">
          <div class="poster" [ngClass]="universeClass(movie.universe)">
            <span class="year">{{ movie.year }}</span>
            <h1 class="title">{{ movie.title }}</h1>
            <div class="badges">
              <app-badge variant="outline" [label]="movie.kind === 'series' ? 'Series' : 'Film'" />
              <app-badge [variant]="movie.universe === 'marvel' ? 'marvel' : movie.universe === 'dc' ? 'dc' : 'other'"
                         [label]="universeText(movie.universe)" />
            </div>
          </div>
          <div class="info">
            <p class="tagline">“{{ movie.tagline }}”</p>
            <p class="desc">{{ movie.description }}</p>
            <dl class="meta">
              @if (movie.director) {
                <div><dt>Directed by</dt><dd>{{ movie.director }}</dd></div>
              }
              @if (movie.creator) {
                <div><dt>Created by</dt><dd>{{ movie.creator }}</dd></div>
              }
              <div><dt>Release year</dt><dd>{{ movie.year }}</dd></div>
            </dl>
            @if (movie.cast.length) {
              <div class="cast">
                <h2 class="cast-title">Principal cast</h2>
                <ul>
                  @for (actor of movie.cast; track actor) {
                    <li>{{ actor }}</li>
                  }
                </ul>
              </div>
            }
          </div>
        </header>

        <app-ad-slot placement="movie-top" />

        <div class="related">
          <a routerLink="/lore" class="btn btn-ghost">Explore related lore</a>
          <a routerLink="/battle-arena" class="btn btn-ghost">Take it to the arena</a>
        </div>
      </div>
    }
  `,
  styles: `
    .pad {
      padding: 3rem 1.25rem;
    }

    .loading-note {
      color: var(--text-2);
      font-family: var(--font-ui);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-size: 0.8rem;
      padding: 3rem 0;
    }

    .crumbs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 2.2rem 0 1.2rem;
      font-family: var(--font-ui);
      font-size: 0.8rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .crumbs a {
      color: var(--text-2);
      text-decoration: none;
    }

    .crumbs a:hover {
      color: var(--accent);
    }

    .crumbs span {
      color: var(--text-2);
    }

    .crumbs .current {
      color: var(--text-0);
    }

    .head {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.8rem;
      padding-bottom: 1rem;
    }

    @media (min-width: 860px) {
      .head {
        grid-template-columns: 300px 1fr;
        align-items: start;
      }
    }

    .poster {
      aspect-ratio: 2 / 3;
      max-width: 340px;
      border-radius: 16px;
      border: 1px solid var(--panel-border);
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      background:
        radial-gradient(130% 80% at 50% 0%, rgba(56, 225, 255, 0.1), transparent 60%),
        linear-gradient(180deg, #0b1120 0%, #070a12 100%);
    }

    .poster.u-marvel {
      background:
        radial-gradient(130% 80% at 50% 0%, rgba(255, 61, 78, 0.18), transparent 60%),
        linear-gradient(180deg, #170b10 0%, #070a12 100%);
    }

    .poster.u-dc {
      background:
        radial-gradient(130% 80% at 50% 0%, rgba(47, 124, 255, 0.18), transparent 60%),
        linear-gradient(180deg, #0a1020 0%, #070a12 100%);
    }

    .year {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.8rem;
      letter-spacing: 0.06em;
      color: rgba(232, 236, 244, 0.16);
    }

    .title {
      margin-top: auto;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 1.12;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }

    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: 0.9rem;
    }

    .tagline {
      font-style: italic;
      color: var(--text-1);
      font-size: 1.05rem;
      margin: 0 0 1rem;
    }

    .desc {
      color: var(--text-0);
      line-height: 1.75;
      margin: 0 0 1.4rem;
      max-width: 70ch;
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1.6rem;
      margin: 0 0 1.4rem;
    }

    .meta dt {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.68rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--text-2);
      margin-bottom: 0.2rem;
    }

    .meta dd {
      margin: 0;
      color: var(--text-0);
      font-size: 0.98rem;
    }

    .cast-title {
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin: 0 0 0.6rem;
    }

    .cast ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .cast li {
      padding: 0.4em 0.9em;
      border: 1px solid var(--panel-border);
      border-radius: 999px;
      color: var(--text-1);
      font-size: 0.85rem;
    }

    .related {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
      padding: 1.6rem 0 3rem;
    }
  `,
})
export class MovieDetailPageComponent {
  private readonly moviesService = inject(MovieService);
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly movies$ = this.moviesService.movies$;
  protected readonly loading$ = this.moviesService.loading$;
  protected readonly error$ = this.moviesService.error$;

  private slug = '';
  /** 'none' → 'fallback' (slug-derived) → 'full' (data-derived, wins). */
  private seoStage: 'none' | 'fallback' | 'full' = 'none';

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.slug = params.get('slug') ?? '';
        this.seoStage = 'none';
        this.applyFallbackSeo();
      });

    this.moviesService.movies$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.tryApplySeo());

    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.moviesService.load();
      }
    });
  }

  /**
   * Slug-derived SEO applied in the constructor, so every movie URL gets a
   * unique title + canonical on the server before data resolves. The name is
   * formatted from the URL slug only (no invented data). Replaced by the
   * full data-driven SEO in tryApplySeo() once the archive loads.
   */
  private applyFallbackSeo(): void {
    if (this.seoStage !== 'none' || !this.slug) return;
    this.seoStage = 'fallback';
    const title = this.titleFromSlug(this.slug);
    this.seo.apply({
      title: `${title} — Movies & TV`,
      description:
        `${title} — film & series guide from The Superhero Universe. ` +
        'Cast, synopsis and where it fits in the universe.',
      path: `/movies/${this.slug}`,
      type: 'article',
      jsonLd: [],
    });
  }

  /** 'iron-man' → 'Iron Man' (display casing only). */
  private titleFromSlug(slug: string): string {
    const lower = new Set(['a', 'an', 'and', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'vs']);
    const clean = slug.replace(/^\d+-/, '').replace(/-/g, ' ').trim();
    return clean
      .split(' ')
      .map((w, i) =>
        i > 0 && lower.has(w.toLowerCase())
          ? w.toLowerCase()
          : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
      )
      .join(' ');
  }

  private tryApplySeo(): void {
    if (this.seoStage === 'full' || !this.slug) return;
    const movie = this.moviesService.bySlug(this.slug);
    if (!movie) return;
    this.seoStage = 'full';
    this.seo.apply({
      title: `${movie.title} (${movie.year})`,
      description: movie.description,
      path: `/movies/${movie.slug}`,
      type: 'article',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': movie.kind === 'series' ? 'TVEpisode' : 'Movie',
          name: movie.title,
          datePublished: String(movie.year),
          description: movie.description,
          ...(movie.director ? { director: movie.director } : {}),
        },
      ],
    });
  }

  protected findMovie(movies: readonly Movie[] | null | undefined): Movie | undefined {
    return movies?.find((m) => m.slug === this.slug);
  }

  protected universeClass(universe: string): string {
    return universe === 'other' ? '' : `u-${universe}`;
  }

  protected universeText(universe: string): string {
    switch (universe) {
      case 'marvel':
        return 'Marvel';
      case 'dc':
        return 'DC';
      default:
        return 'Multiverse';
    }
  }

  protected backToShelf(): void {
    void this.router.navigate(['/movies']);
  }

  protected retry(): void {
    this.moviesService.retry();
  }
}
