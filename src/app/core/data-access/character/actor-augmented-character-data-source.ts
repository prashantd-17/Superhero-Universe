import { Observable, map } from 'rxjs';
import { Superhero } from '../../models/superhero';
import { CharacterDataSource, CharacterDataset } from './character-data-source';
import { AkababCharacterDataSource } from './akabab-character-data-source';
import { ACTOR_SEEDS, ActorSeed } from './data/actor-data';

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
export class ActorAugmentedCharacterDataSource extends CharacterDataSource {
  private readonly base = new AkababCharacterDataSource();

  loadAll(): Observable<CharacterDataset> {
    return this.base.loadAll().pipe(
      map((dataset) => ({
        ...dataset,
        heroes: [...dataset.heroes, ...this.actorsFrom(dataset.heroes)],
      })),
    );
  }

  private actorsFrom(heroes: Superhero[]): Superhero[] {
    const byName = new Map(heroes.map((h) => [h.name.toLowerCase(), h]));
    return ACTOR_SEEDS.map((seed, i) => this.seedToHero(seed, byName, i));
  }

  private seedToHero(seed: ActorSeed, byName: Map<string, Superhero>, i: number): Superhero {
    const base = byName.get(seed.role.toLowerCase());
    return {
      id: 90001 + i,
      name: seed.name,
      slug: seed.slug,
      publisher: seed.studio,
      universe: seed.universe,
      alignment: base?.alignment ?? 'good',
      biography: {
        fullName: seed.actor,
        firstAppearance: seed.firstFilm,
        publisher: seed.studio,
      },
      image: base?.image,
      liveAction: seed.liveAction,
    };
  }
}
