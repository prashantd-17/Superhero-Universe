import { BehaviorSubject, Observable, throwError } from 'rxjs';

export type StateStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  status: StateStatus;
  data: T | null;
  error: string | null;
}

/**
 * Generic reactive state container used by every feature state:
 * CharacterState, MovieState, ProductState, …
 *
 * Behaviour contract:
 * - `load()` flips to `loading`, then `success` or `error`.
 * - On error the *previous* data is kept, so the UI can still render
 *   content with a small "try again" banner instead of a blank page.
 * - `patch()` allows derived/mutating updates (e.g. battle votes, filters
 *   that live in state).
 */
export class StateStore<T> {
  private readonly inner$ = new BehaviorSubject<AsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });

  readonly state$: Observable<AsyncState<T>> = this.inner$.asObservable();

  get snapshot(): AsyncState<T> {
    return this.inner$.getValue();
  }

  get data(): T | null {
    return this.inner$.getValue().data;
  }

  get error(): string | null {
    return this.inner$.getValue().error;
  }

  get status(): StateStatus {
    return this.inner$.getValue().status;
  }

  get loading(): boolean {
    return this.status === 'loading';
  }

  /** Runs a data loader exactly as given; call sites should guard re-entry. */
  load(loader: () => Observable<T>): void {
    this.inner$.next({ status: 'loading', data: this.data, error: null });
    loader().subscribe({
      next: (data) => this.inner$.next({ status: 'success', data, error: null }),
      error: (err: unknown) =>
        this.inner$.next({
          status: 'error',
          // Keep stale data so the layout never collapses on API failure.
          data: this.data,
          error: toErrorMessage(err),
        }),
    });
  }

  patch(mutator: (prev: T) => T): void {
    const current = this.data;
    if (current !== null) {
      this.inner$.next({ ...this.snapshot, data: mutator(current) });
    }
  }

  reset(): void {
    this.inner$.next({ status: 'idle', data: null, error: null });
  }
}

export function toErrorMessage(err: unknown): string {
  if (err instanceof Error && err.message) return err.message;
  if (typeof err === 'string' && err.length > 0) return err;
  return 'Something went wrong while reaching the universe.';
}
