import { Injectable } from '@angular/core';
import { SuperheroFact } from '../../models/fact';
import { SUPERHERO_FACTS } from './fact-data';

/**
 * Reusable "Did you know?" content.
 *
 * The first fact is deterministic (seeded by the date) so SSR and client
 * render the same content; the UI can shuffle afterwards.
 */
@Injectable({ providedIn: 'root' })
export class FactService {
  readonly all: readonly SuperheroFact[] = SUPERHERO_FACTS;

  factOfDay(): SuperheroFact {
    const days = Math.floor(Date.now() / 86_400_000);
    return this.all[days % this.all.length];
  }

  shuffle(current: SuperheroFact): SuperheroFact {
    if (this.all.length < 2) return current;
    let next = current;
    while (next.id === current.id) {
      next = this.all[Math.floor(Math.random() * this.all.length)];
    }
    return next;
  }
}
