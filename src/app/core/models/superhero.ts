import { UniverseId } from '../config/app-config';

export type Alignment = 'good' | 'bad' | 'neutral' | 'unknown';

export interface HeroBiography {
  fullName?: string;
  placeOfBirth?: string;
  firstAppearance?: string;
  publisher?: string;
  groupAffiliation?: string;
}

export interface HeroAppearance {
  gender?: string;
  race?: string;
  height?: string;
  weight?: string;
  eyeColor?: string;
  hairColor?: string;
}

export interface HeroWork {
  occupation?: string;
  base?: string;
}

export interface HeroPowerStats {
  intelligence?: number;
  strength?: number;
  speed?: number;
  durability?: number;
  power?: number;
  combat?: number;
}

export interface HeroConnections {
  groupAffiliation?: string;
  relatives?: string;
}

/**
 * Live-action profile for actor entries (e.g. "Robert Downey Jr. · Iron Man").
 * All fields are real, well-documented filmography facts — no invented data.
 */
export interface LiveActionProfile {
  /** The actor, e.g. "Robert Downey Jr." */
  actor: string;
  /** The character portrayed, e.g. "Iron Man" */
  role: string;
  /** Franchise, e.g. "MCU" or "DCEU" */
  franchise: string;
  /** Real on-screen run, e.g. "Iron Man (2008) → Avengers: Endgame (2019)" */
  appearances: string;
}

/**
 * Internal character model.
 *
 * The UI only ever sees this shape — never the raw external API payload.
 * Swapping Akabab for our own backend/database only requires a new data
 * source that maps into this interface.
 */
export interface Superhero {
  id: number;
  name: string;
  /** Unique, URL-safe identifier (the source API's slug). */
  slug: string;
  status?: string;
  publisher?: string;
  universe: UniverseId;
  alignment: Alignment;
  biography?: HeroBiography;
  appearance?: HeroAppearance;
  work?: HeroWork;
  powerstats?: HeroPowerStats;
  connections?: HeroConnections;
  /** Set on actor entries — see LiveActionProfile. */
  liveAction?: LiveActionProfile;
  /** Primary portrait (may be absent for some characters). */
  image?: string;
}

export const POWER_STAT_KEYS = [
  'intelligence',
  'strength',
  'speed',
  'durability',
  'power',
  'combat',
] as const;

export type PowerStatKey = (typeof POWER_STAT_KEYS)[number];

export const POWER_STAT_LABELS: Record<PowerStatKey, string> = {
  intelligence: 'Intelligence',
  strength: 'Strength',
  speed: 'Speed',
  durability: 'Durability',
  power: 'Power',
  combat: 'Combat',
};

export function universeOf(publisher?: string): UniverseId {
  const p = (publisher ?? '').toLowerCase();
  if (p.includes('marvel')) return 'marvel';
  if (p.includes('dc')) return 'dc';
  return 'other';
}

export function universeLabel(universe: UniverseId): string {
  switch (universe) {
    case 'marvel':
      return 'Marvel';
    case 'dc':
      return 'DC';
    default:
      return 'Other';
  }
}

export function alignmentLabel(alignment: Alignment): string {
  switch (alignment) {
    case 'good':
      return 'Hero';
    case 'bad':
      return 'Villain';
    case 'neutral':
      return 'Neutral';
    default:
      return 'Unknown';
  }
}

/** Sum of known power stats (0 for missing ones). Used for rankings/verdicts. */
export function powerTotal(stats?: HeroPowerStats): number {
  if (!stats) return 0;
  return POWER_STAT_KEYS.reduce((sum, key) => sum + (stats[key] ?? 0), 0);
}

export type { UniverseId } from '../config/app-config';
