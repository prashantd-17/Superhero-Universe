import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  CharacterDataSource,
  CharacterDataset,
} from '../../data-access/character/character-data-source';
import { Superhero, UniverseId, powerTotal } from '../../models/superhero';
import { StateStore } from '../../state/state-store';

/** Feature state for the whole character domain (one cached dataset). */
export interface CharacterStateModel extends CharacterDataset {}

/**
 * CharacterService is the single entry point for character data.
 *
 * - Loads the dataset ONCE (idempotent `load()`), caches it in a generic
 *   StateStore, and exposes derived streams.
 * - Components never touch the data source or the raw API.
 */
@Injectable({ providedIn: 'root' })
export class CharacterService {
  private readonly store = new StateStore<CharacterStateModel>();
  private readonly source = inject(CharacterDataSource);

  readonly state$ = this.store.state$;

  readonly heroes$: Observable<Superhero[]> = this.state$.pipe(map((s) => s.data?.heroes ?? []));

  readonly loading$: Observable<boolean> = this.state$.pipe(map((s) => s.status === 'loading'));

  readonly error$: Observable<string | null> = this.state$.pipe(
    map((s) => (s.status === 'error' ? s.error : null)),
  );

  readonly sourceLabel$: Observable<string> = this.state$.pipe(map((s) => s.data?.label ?? ''));

  /** Idempotent load — safe on SSR and in the browser. */
  load(): void {
    if (this.store.status === 'loading' || this.store.status === 'success') {
      return;
    }
    this.store.load(() => this.source.loadAll());
  }

  retry(): void {
    this.store.reset();
    this.load();
  }

  getBySlug(slug: string): Superhero | undefined {
    return this.store.data?.heroes.find((h) => h.slug === slug);
  }

  /** Synchronous read of the cached list (no re-fetch). */
  heroList(): Superhero[] {
    return this.store.data?.heroes ?? [];
  }

  /**
   * "Trending" = a curated list of iconic names (matched against real
   * archive data), falling back to the highest total power stats.
   * No invented data — everything shown exists in the dataset.
   */
  trending(heroes: readonly Superhero[]): Superhero[] {
    const byName = (name: string) => heroes.find((h) => h.name === name);
    const curated: (Superhero | undefined)[] = [
      'Batman',
      'Superman',
      'Spider-Man',
      'Iron Man',
      'Wonder Woman',
      'Captain America',
      'Hulk',
      'Thor',
      'Wolverine',
      'Black Panther',
      'Thanos',
      'Joker',
    ].map(byName);
    const found = curated.filter((h): h is Superhero => h !== undefined);
    if (found.length >= 6) return found.slice(0, 10);
    return [...heroes]
      .sort((a, b) => powerTotal(b.powerstats) - powerTotal(a.powerstats))
      .slice(0, 10);
  }

  countByUniverse(universe: UniverseId, heroes: readonly Superhero[]): number {
    return heroes.filter((h) => h.universe === universe).length;
  }

  relatedTo(hero: Superhero, heroes: readonly Superhero[], limit = 4): Superhero[] {
    return heroes
      .filter((h) => h.slug !== hero.slug && h.universe === hero.universe)
      .slice(0, limit);
  }
}
