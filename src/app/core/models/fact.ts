import { LoreUniverse } from './lore';

/**
 * Curated "Did you know?" facts. Each one is a real, well-known fact from
 * comics/cinematic history. `characterSlug` links the fact to a character
 * profile for the character→content funnel (optional).
 */
export interface SuperheroFact {
  id: string;
  universe: LoreUniverse;
  title: string;
  text: string;
  characterSlug?: string;
}
