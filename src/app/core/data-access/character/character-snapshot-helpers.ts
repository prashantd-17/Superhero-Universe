import { makeStateKey } from '@angular/core';
import type { CharacterDataset } from './character-data-source';
import type { Superhero } from '../../models/superhero';
import { ACTOR_SEEDS, ActorSeed } from './data/actor-data';

export const CHARACTER_STATE = makeStateKey<CharacterDataset>('character-archive');

export function actorHeroes(heroes: Superhero[]): Superhero[] {
  const byName = new Map(heroes.map((h) => [h.name.toLowerCase(), h]));
  return ACTOR_SEEDS.map((seed, i) => seedToHero(seed, byName, i));
}

function seedToHero(seed: ActorSeed, byName: Map<string, Superhero>, i: number): Superhero {
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
