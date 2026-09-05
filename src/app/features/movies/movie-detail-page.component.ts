import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  RESPONSE_INIT,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MovieService } from '../../core/services/movie/movie-service';
import { SeoService } from '../../core/services/seo/seo.service';
import { Movie, MOVIE_COLLECTIONS, RELEASE_TYPE_LABELS } from '../../core/models/movie';
import { AdSlotComponent } from '../../shared/components/ad-slot/ad-slot.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { MoviePosterComponent } from '../../shared/components/movie-poster/movie-poster.component';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-movie-detail-page',
  imports: [
    RouterLink,
    AdSlotComponent,
    BadgeComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    MoviePosterComponent,
    MovieCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let title = movie();
    @if (loading() && !title) {
      <div class="container pad"><p role="status">Opening the file…</p></div>
    } @else if (error() && !title) {
      <div class="container pad"><app-error-state (retry)="retry()" /></div>
    } @else if (!title) {
      <div class="container pad">
        <app-empty-state
          title="Title not found"
          message="This title is not in the archive. Check the link or browse the movie shelf."
          actionLabel="Back to the shelf"
          (action)="backToShelf()"
        />
      </div>
    } @else {
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a [routerLink]="title.kind === 'series' ? '/series' : '/movies'">{{
            title.kind === 'series' ? 'TV series' : 'Movies & TV'
          }}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ title.title }} ({{ title.year }})</span>
        </nav>
        <header class="head">
          <figure class="artwork">
            <div class="poster"><app-movie-poster [movie]="title" [eager]="true" /></div>
            <figcaption>Release artwork · © respective rights holders</figcaption>
          </figure>
          <div class="info">
            <p class="kicker">{{ collections[title.collection] }}</p>
            <h1>{{ title.title }}</h1>
            <div class="badges">
              <app-badge variant="outline" [label]="releaseTypes[title.releaseType]" />
              <app-badge
                variant="outline"
                [label]="title.format === 'live-action' ? 'Live action' : 'Animation'"
              />
              <app-badge
                [variant]="
                  title.universe === 'marvel' ? 'marvel' : title.universe === 'dc' ? 'dc' : 'other'
                "
                [label]="
                  title.universe === 'marvel'
                    ? 'Marvel'
                    : title.universe === 'dc'
                      ? 'DC'
                      : 'Multiverse'
                "
              />
            </div>
            @if (title.tagline) {
              <p class="tagline">{{ title.tagline }}</p>
            }
            <p class="desc">{{ title.description }}</p>
            <dl class="meta">
              <div>
                <dt>{{ title.kind === 'series' ? 'First aired' : 'First release' }}</dt>
                <dd>{{ title.year }}</dd>
              </div>
              @if (title.director) {
                <div>
                  <dt>Directed by</dt>
                  <dd>{{ title.director }}</dd>
                </div>
              }
              @if (title.creator) {
                <div>
                  <dt>Created by</dt>
                  <dd>{{ title.creator }}</dd>
                </div>
              }
            </dl>
            @if (title.releaseNote) {
              <p class="release-note">{{ title.releaseNote }}</p>
            }
            @if (title.cast.length) {
              <section class="cast" aria-labelledby="cast-heading">
                <h2 id="cast-heading">
                  {{ title.format === 'animation' ? 'Principal voice cast' : 'Principal cast' }}
                </h2>
                <ul>
                  @for (actor of title.cast; track $index) {
                    <li>{{ actor }}</li>
                  }
                </ul>
              </section>
            }
            <div class="source-links">
              @if (title.posterReferenceUrl) {
                <a [href]="title.posterReferenceUrl" target="_blank" rel="noopener noreferrer"
                  >Artwork reference (TVmaze) ↗</a
                >
              }
              <a [href]="title.sourceUrl" target="_blank" rel="noopener noreferrer"
                >Title &amp; credits reference ↗</a
              >
              <a
                routerLink="/movies"
                [queryParams]="{ collection: title.collection, kind: 'all', format: 'all' }"
                >Browse this collection →</a
              >
            </div>
          </div>
        </header>
        <app-ad-slot placement="movie-top" />
        @if (related().length) {
          <section class="related-movies" aria-labelledby="related-heading">
            <h2 id="related-heading">More in this collection</h2>
            <div class="related-grid">
              @for (relatedMovie of related(); track relatedMovie.slug) {
                <app-movie-card [movie]="relatedMovie" />
              }
            </div>
          </section>
        }
        <div class="related-links">
          <a routerLink="/movies" class="btn btn-ghost">Explore all movies</a>
          <a routerLink="/lore" class="btn btn-ghost">Explore related lore</a>
        </div>
      </div>
    }
  `,
  styles: `
    .pad {
      padding: 3rem 1.25rem;
    }
    .crumbs {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      padding: 2.2rem 0 1.5rem;
      font-family: var(--font-ui);
      font-size: 0.75rem;
      line-height: 1.6;
      color: var(--text-1);
    }
    .crumbs a {
      color: var(--text-2);
      text-decoration: none;
    }
    .crumbs a:hover {
      color: var(--accent);
    }
    .head {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 2rem;
      padding-bottom: 1rem;
    }
    .artwork {
      margin: 0;
      width: 100%;
      max-width: 340px;
    }
    .poster {
      position: relative;
      aspect-ratio: 2 / 3;
      border-radius: 14px;
      border: 1px solid var(--panel-border);
      overflow: hidden;
    }
    .poster app-movie-poster {
      position: absolute;
      inset: 0;
    }
    figcaption {
      color: var(--text-2);
      font-size: 0.65rem;
      line-height: 1.6;
      text-align: center;
      margin-top: 0.6rem;
    }
    .info {
      min-width: 0;
    }
    h1 {
      font-family: var(--font-display);
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      line-height: 1.15;
      margin: 0.6rem 0 1rem;
      overflow-wrap: anywhere;
    }
    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
      margin-bottom: 1.5rem;
    }
    .tagline {
      color: var(--text-1);
      font-style: italic;
    }
    .desc {
      color: var(--text-0);
      line-height: 1.8;
      margin: 0 0 1.5rem;
      max-width: 70ch;
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1.6rem;
      margin: 0 0 1.5rem;
    }
    .meta dt {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.65rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--text-2);
      margin-bottom: 0.35rem;
    }
    .meta dd {
      margin: 0;
      color: var(--text-0);
      font-size: 0.98rem;
    }
    .release-note {
      color: var(--text-1);
      border-left: 2px solid var(--accent);
      padding: 0.65rem 0.9rem;
      background: rgba(56, 225, 255, 0.04);
      font-size: 0.82rem;
      line-height: 1.7;
      margin: 0 0 1.5rem;
    }
    h2 {
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin: 0 0 0.8rem;
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
    .source-links {
      display: flex;
      flex-wrap: wrap;
      gap: 0.7rem 1.2rem;
      margin-top: 1.8rem;
    }
    .source-links a {
      color: var(--accent);
      font-size: 0.8rem;
      line-height: 1.6;
    }
    .related-movies {
      margin-top: 2.4rem;
    }
    .related-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.1rem;
    }
    .related-links {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
      padding: 2rem 0 3rem;
    }
    @media (min-width: 860px) {
      .head {
        grid-template-columns: 300px minmax(0, 1fr);
        align-items: start;
        gap: 2.5rem;
      }
      .related-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
    @media (max-width: 440px) {
      .related-grid {
        gap: 0.65rem;
      }
    }
  `,
})
export class MovieDetailPageComponent {
  private readonly moviesService = inject(MovieService);
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly response = inject(RESPONSE_INIT, { optional: true });
  private readonly movies = toSignal(this.moviesService.movies$, { initialValue: [] });
  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' },
  );
  protected readonly movie = computed(() =>
    this.movies().find((movie) => movie.slug === this.slug()),
  );
  protected readonly loading = toSignal(this.moviesService.loading$, { initialValue: false });
  protected readonly error = toSignal(this.moviesService.error$, { initialValue: null });
  protected readonly collections = MOVIE_COLLECTIONS;
  protected readonly releaseTypes = RELEASE_TYPE_LABELS;
  protected readonly related = computed(() =>
    this.movies()
      .filter(
        (movie) => movie.collection === this.movie()?.collection && movie.slug !== this.slug(),
      )
      .slice(0, 4),
  );

  constructor() {
    this.moviesService.load();
    // Reactive to route reuse AND poster refreshes; deep links also get complete SSR metadata.
    effect(() => this.applySeo(this.movie(), this.slug()));
    afterNextRender(() => this.moviesService.refreshPosters());
  }

  private applySeo(movie: Movie | undefined, slug: string): void {
    if (!movie) {
      if (this.response) this.response.status = 404;
      this.seo.apply({
        title: 'Title not found — Movies & TV',
        description: 'Browse the Marvel and DC movie archive.',
        path: `/movies/${slug}`,
        jsonLd: [],
        noindex: true,
      });
      return;
    }
    this.seo.apply({
      title: `${movie.title} (${movie.year})`,
      description: movie.description,
      image: movie.posterUrl || undefined,
      imageAlt: `${movie.title} release artwork`,
      path: `/movies/${movie.slug}`,
      type: 'article',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': movie.kind === 'series' ? 'TVSeries' : 'Movie',
          name: movie.title,
          datePublished: String(movie.year),
          description: movie.description,
          ...(movie.posterUrl ? { image: movie.posterUrl } : {}),
          sameAs: movie.sourceUrl,
          actor: movie.cast.map((name) => ({ '@type': 'Person', name })),
          ...(movie.director
            ? {
                director: movie.director
                  .split(/, | & /)
                  .map((name) => ({ '@type': 'Person', name })),
              }
            : {}),
          ...(movie.creator
            ? {
                creator: movie.creator.split(/, | & /).map((name) => ({ '@type': 'Person', name })),
              }
            : {}),
        },
      ],
    });
  }
  protected backToShelf(): void {
    void this.router.navigate(['/movies']);
  }
  protected retry(): void {
    this.moviesService.retry();
  }
}
