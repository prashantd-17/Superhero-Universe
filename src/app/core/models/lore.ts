import { UniverseId } from '../config/app-config';

/** Lore can also be "cosmic" (spans both universes). */
export type LoreUniverse = UniverseId | 'cosmic';

export type LoreCategory = 'event' | 'story-arc' | 'comic' | 'one-shot' | 'cosmic';

export const LORE_CATEGORY_LABELS: Record<LoreCategory, string> = {
  event: 'Major Event',
  'story-arc': 'Story Arc',
  comic: 'Iconic Comic',
  'one-shot': 'One-Shot',
  cosmic: 'Cosmic',
};

/**
 * Curated editorial content. All entries are real, well-documented comics
 * history — nothing is fabricated. (Future: our own CMS/database.)
 */
export interface LoreEntry {
  id: string;
  title: string;
  year: number;
  universe: LoreUniverse;
  category: LoreCategory;
  summary: string;
}

export interface CosmicEntity {
  name: string;
  universe: 'marvel' | 'dc';
  description: string;
}

export type TimelineMode = 'mcu' | 'dcu';

export const TIMELINE_MODE_LABELS: Record<TimelineMode, string> = {
  mcu: 'MCU',
  dcu: 'DC Cinematic',
};

export interface TimelineEvent {
  year: number;
  title: string;
  kind: 'film' | 'series' | 'event';
  note: string;
}
