import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MovieDataSource } from '../../data-access/movie/movie-data-source';
import { Movie } from '../../models/movie';
import { StateStore } from '../../state/state-store';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly store = new StateStore<readonly Movie[]>();
  private readonly source = inject(MovieDataSource);

  readonly movies$: Observable<readonly Movie[]> = this.store.state$.pipe(
    map((s) => s.data ?? []),
  );

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

  retry(): void {
    this.store.reset();
    this.load();
  }

  bySlug(slug: string): Movie | undefined {
    return this.store.data?.find((m) => m.slug === slug);
  }
}
