import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, take, timeout } from 'rxjs';
import { MovieDataSource } from '../../data-access/movie/movie-data-source';
import { Movie, MoviePosterResponse, isMoviePosterUrl } from '../../models/movie';
import { StateStore } from '../../state/state-store';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly store = new StateStore<readonly Movie[]>();
  private readonly source = inject(MovieDataSource);
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly posterState = signal<'idle' | 'checking' | MoviePosterResponse['source']>(
    'idle',
  );
  private readonly checkedAt = signal<string | null>(null);

  readonly posterStatus = this.posterState.asReadonly();
  readonly postersCheckedAt = this.checkedAt.asReadonly();

  readonly movies$: Observable<readonly Movie[]> = this.store.state$.pipe(map((s) => s.data ?? []));

  readonly loading$: Observable<boolean> = this.store.state$.pipe(
    map((s) => s.status === 'loading'),
  );

  readonly error$: Observable<string | null> = this.store.state$.pipe(
    map((s) => (s.status === 'error' ? s.error : null)),
  );

  load(): void {
    if (this.store.status !== 'idle') return;
    this.store.load(() => this.source.loadAll());
  }

  /** Run after hydration. Static credits and initial posters are already visible. */
  refreshPosters(force = false): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.posterState() === 'checking' || (!force && this.posterState() !== 'idle')) return;
    this.load();
    this.posterState.set('checking');
    this.http
      .get<MoviePosterResponse>('/api/movie-posters')
      .pipe(
        timeout(10000),
        take(1),
        catchError(() => of(null)),
      )
      .subscribe((result) => {
        if (
          !result ||
          !result.posters ||
          typeof result.posters !== 'object' ||
          !['live', 'partial', 'snapshot'].includes(result.source)
        ) {
          this.posterState.set('snapshot');
          return;
        }
        this.store.patch((movies) =>
          movies.map((movie) => {
            const url = result.posters[movie.slug];
            if (!isMoviePosterUrl(url) || url === movie.posterUrl) return movie;
            // Prefer the higher-resolution studio poster if the wiki image hasn't
            // changed. A newly published wiki poster replaces it, with a fallback.
            if (url === movie.posterFallbackUrl && !isMoviePosterUrl(movie.posterUrl)) return movie;
            return { ...movie, posterUrl: url };
          }),
        );
        this.checkedAt.set(
          result.checkedAt && Number.isFinite(Date.parse(result.checkedAt))
            ? result.checkedAt
            : null,
        );
        this.posterState.set(result.source);
      });
  }

  retry(): void {
    this.store.reset();
    this.load();
    this.refreshPosters(true);
  }

  bySlug(slug: string): Movie | undefined {
    return this.store.data?.find((m) => m.slug === slug);
  }
}
