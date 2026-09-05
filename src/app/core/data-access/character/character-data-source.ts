import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Superhero } from '../../models/superhero';

/** A full character dataset plus attribution for the UI. */
export interface CharacterDataset {
  heroes: Superhero[];
  /** Where this data came from (remote API, snapshot, backend, …). */
  label: string;
}

/**
 * Abstraction over the character data provider.
 *
 * The UI and services depend ONLY on this contract. Today it is served by
 * the Akabab Superhero API; tomorrow it can be swapped for our own backend
 * without touching a single component:
 *
 *   Character Component → CharacterService → CharacterDataSource → (API | backend)
 */
@Injectable()
export abstract class CharacterDataSource {
  /**
   * Loads the complete character dataset. Implementations should be
   * cache-friendly: the app loads once and reuses the data for search,
   * filters, detail pages and the battle arena.
   */
  abstract loadAll(): Observable<CharacterDataset>;
}
