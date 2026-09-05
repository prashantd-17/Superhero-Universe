import { Injectable, TransferState, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { CHARACTER_STATE, actorHeroes } from './character-snapshot-helpers';
import { CharacterDataSource, CharacterDataset } from './character-data-source';
import { AkababCharacterDataSource } from './akabab-character-data-source';

/**
 * Wraps the Akabab source and appends the curated live-action actor archive
 * (see data/actor-data.ts) to the character list.
 *
 * Actor entries are first-class characters: searchable (both by actor name
 * and character name), filterable by universe, with full detail pages. They
 * are flagged via `liveAction` so the detail page renders an on-screen
 * profile (actor, role, franchise, film run) instead of a comic dossier.
 *
 * Deliberate no-fabrication rules:
 * - No powerstats on actor entries — the stats section renders "—".
 * - Portraits reuse the character's existing archive image (resolved by
 *   role name from the Akabab dataset); licensed actor photography is a
 *   future data-source concern.
 */
@Injectable()
export class ActorAugmentedCharacterDataSource extends CharacterDataSource {
  private readonly state = inject(TransferState);
  private readonly base = new AkababCharacterDataSource();

  loadAll(): Observable<CharacterDataset> {
    if (this.state.hasKey(CHARACTER_STATE)) {
      const dataset = this.state.get(CHARACTER_STATE, { heroes: [], label: '' });
      this.state.remove(CHARACTER_STATE);
      return of(dataset);
    }
    return this.base.loadAll().pipe(
      map((dataset) => ({
        ...dataset,
        heroes: [...dataset.heroes, ...actorHeroes(dataset.heroes)],
      })),
    );
  }
}
