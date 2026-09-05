import { Injectable, TransferState, inject } from '@angular/core';
import { of } from 'rxjs';
import snapshot from '../../../../assets/data/akabab-snapshot.json';
import { CharacterDataSource, CharacterDataset } from './character-data-source';
import { parseCharacterPayload } from './akabab-character-data-source';
import { actorHeroes, CHARACTER_STATE } from './character-snapshot-helpers';

const heroes = parseCharacterPayload(snapshot);
const DATASET: CharacterDataset = {
  heroes: [...heroes, ...actorHeroes(heroes)],
  label: 'Akabab Superhero API (local snapshot)',
};

/** Server-only import: complete crawlable dossiers without any third-party request. */
@Injectable()
export class ServerCharacterDataSource extends CharacterDataSource {
  private readonly state = inject(TransferState);
  override loadAll() {
    this.state.set(CHARACTER_STATE, DATASET);
    return of(DATASET);
  }
}
