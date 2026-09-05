import { NgClass, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo/seo.service';
import { LoreService } from '../../core/services/lore/lore-service';
import {
  LoreEntry,
  LORE_CATEGORY_LABELS,
  TimelineMode,
  TIMELINE_MODE_LABELS,
} from '../../core/models/lore';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import {
  FilterChipsComponent,
  ChipOption,
} from '../../shared/components/filter-chips/filter-chips.component';
import { BadgeComponent, BadgeVariant } from '../../shared/components/badge/badge.component';

type LoreFilter = 'all' | 'marvel' | 'dc' | 'cosmic';

/**
 * Comics & Lore — curated archive of iconic storylines, cosmic entities
 * and the interactive cinematic timeline.
 */
@Component({
  selector: 'app-lore-page',
  imports: [NgClass, TitleCasePipe, SectionHeaderComponent, FilterChipsComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div class="container">
        <p class="kicker">The deep archive</p>
        <h1 class="title-xl">Comics &amp; lore</h1>
        <p class="subtitle">
          The stories that built the universes — iconic events, cosmic entities and the cinematic
          timeline, in one place.
        </p>
      </div>
    </section>

    <div class="container">
      <!-- Story archive -->
      <section class="section" aria-labelledby="archive-title">
        <div class="head-row">
          <app-section-header kicker="Story archive" title="Iconic storylines" />
        </div>
        <app-filter-chips
          label="Filter by universe"
          class="lore-filter"
          [options]="universeOptions"
          [value]="universe"
          (select)="onUniverseSelect($event)"
        />
        <div class="lore-grid">
          @for (entry of filteredEntries; track entry.id) {
            <article class="lore-card" [ngClass]="'u-' + entry.universe">
              <div class="lore-top">
                <span class="year">{{ entry.year }}</span>
                <app-badge
                  [variant]="
                    entry.universe === 'cosmic'
                      ? 'cosmic'
                      : entry.universe === 'other'
                        ? 'other'
                        : entry.universe
                  "
                  [label]="
                    entry.universe === 'cosmic'
                      ? 'Cosmic'
                      : entry.universe === 'other'
                        ? 'Other'
                        : (entry.universe | titlecase)
                  "
                />
              </div>
              <h2 class="lore-title">{{ entry.title }}</h2>
              <p class="lore-cat">{{ categoryLabels[entry.category] }}</p>
              <p class="lore-summary">{{ entry.summary }}</p>
            </article>
          }
        </div>
      </section>

      <!-- Cosmic entities -->
      <section class="section" aria-labelledby="cosmic-title">
        <app-section-header
          kicker="Beyond the sky"
          title="Cosmic entities"
          subtitle="The beings at the very top of both universes."
        />
        <div class="cosmic-grid">
          @for (entity of loreService.cosmicEntities; track entity.name) {
            <div class="cosmic-card" [ngClass]="entity.universe === 'marvel' ? 'u-marvel' : 'u-dc'">
              <h3 class="cosmic-name">{{ entity.name }}</h3>
              <p class="cosmic-desc">{{ entity.description }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Timeline -->
      <section class="section" id="timeline" aria-labelledby="timeline-sec-title">
        <app-section-header
          kicker="Chronology"
          title="The cinematic timeline"
          subtitle="Swipe through the decades — every milestone in order."
        />
        <div class="mode-tabs" role="tablist" aria-label="Timeline mode">
          @for (mode of modes; track mode) {
            <button
              type="button"
              class="mode-tab"
              [class.active]="mode === timelineMode"
              [attr.aria-selected]="mode === timelineMode"
              role="tab"
              (click)="setMode(mode)"
            >
              {{ modeLabels[mode] }}
            </button>
          }
        </div>
        <div class="tl" [attr.aria-label]="modeLabels[timelineMode] + ' timeline'">
          <div class="tl-track" aria-hidden="true"></div>
          <ol class="tl-nodes">
            @for (event of timeline; track event.year + event.title) {
              <li class="tl-node">
                <span class="tl-year">{{ event.year }}</span>
                <span class="tl-dot" aria-hidden="true"></span>
                <div class="tl-card">
                  <span class="tl-kind">{{ event.kind }}</span>
                  <span class="tl-title">{{ event.title }}</span>
                  <span class="tl-note">{{ event.note }}</span>
                </div>
              </li>
            }
          </ol>
        </div>
      </section>

      <p class="source-note">
        Curated archive — every entry is real, documented comics or cinematic history. Full story
        guides arrive with the universe CMS.
      </p>
    </div>
  `,
  styles: `
    .page-head {
      padding: 3.2rem 0 1.6rem;
    }

    .title-xl {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(1.9rem, 4.5vw, 3rem);
      letter-spacing: 0.03em;
      margin: 0.4rem 0 0.5rem;
    }

    .subtitle {
      color: var(--text-1);
      margin: 0;
      max-width: 56ch;
      line-height: 1.6;
    }

    .section {
      padding-block: 2.4rem 0.5rem;
    }

    .lore-filter {
      margin: 0.4rem 0 1.4rem;
    }

    .lore-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    @media (min-width: 700px) {
      .lore-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (min-width: 1100px) {
      .lore-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    .lore-card {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1.25rem 1.25rem 1.35rem;
      border: 1px solid var(--panel-border);
      border-radius: 14px;
      background: rgba(10, 14, 22, 0.55);
      transition:
        transform 0.22s ease,
        border-color 0.22s ease;
    }

    .lore-card:hover {
      transform: translateY(-3px);
    }

    .lore-card.u-marvel:hover {
      border-color: rgba(255, 61, 78, 0.45);
    }
    .lore-card.u-dc:hover {
      border-color: rgba(47, 124, 255, 0.45);
    }
    .lore-card.u-cosmic:hover {
      border-color: rgba(168, 85, 247, 0.45);
    }

    .lore-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.6rem;
    }

    .year {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: 0.1em;
      color: var(--accent);
    }

    .lore-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.15rem;
      letter-spacing: 0.02em;
      margin: 0;
      line-height: 1.25;
    }

    .lore-cat {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.66rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--text-2);
      margin: 0;
    }

    .lore-summary {
      color: var(--text-1);
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0;
    }

    .cosmic-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.9rem;
    }

    @media (min-width: 1000px) {
      .cosmic-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    .cosmic-card {
      padding: 1.1rem 1.15rem 1.2rem;
      border: 1px solid var(--panel-border);
      border-radius: 14px;
      background:
        radial-gradient(120% 100% at 50% 0%, rgba(168, 85, 247, 0.08), transparent 60%),
        rgba(10, 14, 22, 0.5);
    }

    .cosmic-card.u-marvel {
      background:
        radial-gradient(120% 100% at 50% 0%, rgba(255, 61, 78, 0.08), transparent 60%),
        rgba(10, 14, 22, 0.5);
    }

    .cosmic-card.u-dc {
      background:
        radial-gradient(120% 100% at 50% 0%, rgba(47, 124, 255, 0.08), transparent 60%),
        rgba(10, 14, 22, 0.5);
    }

    .cosmic-name {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: 0.04em;
      margin: 0 0 0.4rem;
    }

    .cosmic-desc {
      color: var(--text-1);
      font-size: 0.87rem;
      line-height: 1.55;
      margin: 0;
    }

    .mode-tabs {
      display: inline-flex;
      gap: 0.4rem;
      margin: 0.2rem 0 1.4rem;
      padding: 0.3rem;
      border: 1px solid var(--panel-border);
      border-radius: 999px;
      background: rgba(148, 163, 184, 0.05);
    }

    .mode-tab {
      appearance: none;
      border: none;
      background: transparent;
      color: var(--text-1);
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.8rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 0.5em 1.2em;
      border-radius: 999px;
      cursor: pointer;
      transition:
        color 0.2s ease,
        background 0.2s ease;
    }

    .mode-tab.active {
      color: var(--accent);
      background: rgba(56, 225, 255, 0.1);
    }

    .tl {
      position: relative;
      overflow-x: auto;
      padding: 1.2rem 0 1rem;
      scrollbar-width: thin;
    }

    .tl-track {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(1.2rem + 1.15rem);
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(56, 225, 255, 0.35) 8%,
        rgba(56, 225, 255, 0.35) 92%,
        transparent
      );
    }

    .tl-nodes {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      min-width: min-content;
    }

    .tl-node {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      min-width: 220px;
      padding: 0 0.9rem 1.6rem;
    }

    .tl-year {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: 0.12em;
      color: var(--accent);
    }

    .tl-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--bg-0);
      border: 2px solid var(--accent);
      box-shadow: 0 0 12px rgba(56, 225, 255, 0.5);
    }

    .tl-card {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      width: 100%;
      padding: 0.9rem 1rem;
      border: 1px solid var(--panel-border);
      border-radius: 12px;
      background: rgba(10, 14, 22, 0.55);
      text-align: left;
    }

    .tl-kind {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.62rem;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      color: var(--text-2);
    }

    .tl-title {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.98rem;
      line-height: 1.3;
    }

    .tl-note {
      color: var(--text-1);
      font-size: 0.82rem;
      line-height: 1.5;
    }

    .source-note {
      margin: 2.5rem 0 1rem;
      color: var(--text-2);
      font-size: 0.78rem;
      line-height: 1.6;
    }
  `,
})
export class LorePageComponent {
  protected readonly loreService = inject(LoreService);
  private readonly seo = inject(SeoService);

  protected readonly universeOptions: readonly ChipOption<LoreFilter>[] = [
    { value: 'all', label: 'All' },
    { value: 'marvel', label: 'Marvel' },
    { value: 'dc', label: 'DC' },
    { value: 'cosmic', label: 'Cosmic' },
  ];

  protected readonly categoryLabels = LORE_CATEGORY_LABELS;
  protected readonly modeLabels = TIMELINE_MODE_LABELS;

  protected readonly modes: readonly TimelineMode[] = ['mcu', 'dcu'];
  protected universe: LoreFilter = 'all';
  protected timelineMode: TimelineMode = 'mcu';

  constructor() {
    this.seo.apply({
      title: 'Comics & Lore',
      description:
        'Iconic storylines, cosmic entities and the cinematic timeline — the deep archive of The Superhero Universe.',
      path: '/lore',
    });
  }

  protected get filteredEntries(): readonly LoreEntry[] {
    if (this.universe === 'all') return this.loreService.entries;
    return this.loreService.entries.filter((e) => e.universe === this.universe);
  }

  protected get timeline() {
    return this.loreService.timeline(this.timelineMode);
  }

  protected onUniverseSelect(value: LoreFilter): void {
    this.universe = value;
  }

  protected setMode(mode: TimelineMode): void {
    this.timelineMode = mode;
  }
}
