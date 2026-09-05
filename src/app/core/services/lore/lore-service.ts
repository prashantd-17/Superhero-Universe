import { Injectable } from '@angular/core';
import { CosmicEntity, LoreEntry, TimelineEvent, TimelineMode } from '../../models/lore';
import { COSMIC_ENTITIES, LORE_ENTRIES, TIMELINE } from './lore-data';

/**
 * Curated comics/lore content (V1).
 *
 * Synchronous on purpose: it is bundled editorial content, not an API.
 * When a CMS/backend arrives, this service can wrap an async source while
 * keeping the same public surface.
 */
@Injectable({ providedIn: 'root' })
export class LoreService {
  readonly entries: readonly LoreEntry[] = LORE_ENTRIES;
  readonly cosmicEntities: readonly CosmicEntity[] = COSMIC_ENTITIES;

  timeline(mode: TimelineMode): readonly TimelineEvent[] {
    return TIMELINE[mode];
  }
}
