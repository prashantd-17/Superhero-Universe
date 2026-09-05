import { AsyncPipe, NgClass } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, take } from 'rxjs';
import { CharacterService } from '../../core/services/character/character-service';
import { SeoService } from '../../core/services/seo/seo.service';
import {
  POWER_STAT_KEYS,
  POWER_STAT_LABELS,
  PowerStatKey,
  Superhero,
  powerTotal,
} from '../../core/models/superhero';
import { TrackDirective } from '../../shared/directives/track.directive';
import { SmartImageComponent } from '../../shared/components/smart-image/smart-image.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

const VOTES_STORAGE_KEY = 'su-battle-votes:v1';

interface VoteTally {
  a: number;
  b: number;
}

/**
 * Battle Arena — compare any two characters from the archive on six stats,
 * get a data-driven verdict, and cast a local community vote
 * (stored on-device until a backend exists).
 */
@Component({
  selector: 'app-battle-arena-page',
  imports: [AsyncPipe, NgClass, TrackDirective, SmartImageComponent, BadgeComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div class="container">
        <p class="kicker">Settle it with data</p>
        <h1 class="title-xl">Battle arena</h1>
        <p class="subtitle">
          Two characters. Six stats. One verdict. No fan wars — just the
          numbers from the archive.
        </p>
      </div>
    </section>

    <div class="container">
      @let heroes = (heroes$ | async);
      @let loading = (loading$ | async) ?? false;
      @let error = (error$ | async);

      @if (loading && !heroes?.length) {
        <div class="loading-note" role="status">Summoning fighters…</div>
      } @else if (error && !heroes?.length) {
        <app-error-state (retry)="retry()" />
      } @else if (heroes?.length) {
        @let heroA = findHero(heroes, aSlug);
        @let heroB = findHero(heroes, bSlug);
        @let matchUp = heroA && heroB && heroA.slug !== heroB.slug;
        @let totalA = heroA ? powerTotal(heroA.powerstats) : 0;
        @let totalB = heroB ? powerTotal(heroB.powerstats) : 0;

        <div class="fighters">
          <div class="fighter" [ngClass]="heroA ? 'u-' + heroA.universe : ''">
            <label class="fighter-label" for="fighter-a">Challenger A</label>
            <select
              id="fighter-a"
              class="fighter-select"
              [value]="aSlug"
              (change)="setA($event)"
              appTrack="arena_pick_a"
            >
              <option value="" disabled>Choose a character…</option>
              @for (h of sortedHeroes(heroes); track h.slug) {
                <option [value]="h.slug">{{ h.name }}</option>
              }
            </select>
            @if (heroA) {
              <div class="fighter-card">
                <div class="fighter-portrait">
                  <app-smart-image
                    [src]="heroA.image"
                    [alt]="heroA.name"
                    [tone]="heroA.universe === 'marvel' ? 'marvel' : heroA.universe === 'dc' ? 'dc' : 'neutral'"
                  />
                </div>
                <div class="fighter-name">{{ heroA.name }}</div>
                <div class="fighter-badges">
                  <app-badge [variant]="heroA.universe === 'marvel' ? 'marvel' : heroA.universe === 'dc' ? 'dc' : 'other'"
                             [label]="heroA.universe" />
                </div>
              </div>
            }
          </div>

          <div class="vs-emblem" aria-hidden="true">VS</div>

          <div class="fighter" [ngClass]="heroB ? 'u-' + heroB.universe : ''">
            <label class="fighter-label" for="fighter-b">Challenger B</label>
            <select
              id="fighter-b"
              class="fighter-select"
              [value]="bSlug"
              (change)="setB($event)"
              appTrack="arena_pick_b"
            >
              <option value="" disabled>Choose a character…</option>
              @for (h of sortedHeroes(heroes); track h.slug) {
                <option [value]="h.slug">{{ h.name }}</option>
              }
            </select>
            @if (heroB) {
              <div class="fighter-card">
                <div class="fighter-portrait">
                  <app-smart-image
                    [src]="heroB.image"
                    [alt]="heroB.name"
                    [tone]="heroB.universe === 'marvel' ? 'marvel' : heroB.universe === 'dc' ? 'dc' : 'neutral'"
                  />
                </div>
                <div class="fighter-name">{{ heroB.name }}</div>
                <div class="fighter-badges">
                  <app-badge [variant]="heroB.universe === 'marvel' ? 'marvel' : heroB.universe === 'dc' ? 'dc' : 'other'"
                             [label]="heroB.universe" />
                </div>
              </div>
            }
          </div>
        </div>

        <div class="quick-picks">
          <span class="qp-label">Quick picks</span>
          @for (name of quickPicks; track name) {
            <button type="button" class="chip" (click)="quickPick(name)">
              {{ name }}
            </button>
          }
        </div>

        @if (matchUp) {
          <section class="verdict-panel" aria-labelledby="verdict-title">
            <h2 id="verdict-title" class="verdict-title">
              {{ verdictText(heroA!, heroB!, totalA, totalB) }}
            </h2>
            <div class="score-row">
              <div class="score" [class.leading]="totalA > totalB">
                <span class="score-name">{{ heroA!.name }}</span>
                <span class="score-num">{{ totalA }}</span>
              </div>
              <span class="score-sep" aria-hidden="true"></span>
              <div class="score" [class.leading]="totalB > totalA">
                <span class="score-name">{{ heroB!.name }}</span>
                <span class="score-num">{{ totalB }}</span>
              </div>
            </div>

            <div class="rows">
              @for (key of statKeys; track key) {
                @let va = heroA!.powerstats?.[key];
                @let vb = heroB!.powerstats?.[key];
                <div class="row">
                  <span class="row-value a">{{ va ?? '—' }}</span>
                  <div class="bar a" aria-hidden="true">
                    <div class="fill" [style.width.%]="pct(va)"></div>
                  </div>
                  <span class="row-label">{{ statLabels[key] }}</span>
                  <div class="bar b" aria-hidden="true">
                    <div class="fill" [style.width.%]="pct(vb)"></div>
                  </div>
                  <span class="row-value b">{{ vb ?? '—' }}</span>
                </div>
              }
            </div>

            @if (votesReady) {
              <div class="votes">
                <p class="votes-note">Community vote · stored on this device</p>
                <div class="vote-btns">
                  <button
                    type="button"
                    class="btn vote-btn"
                    [class.winner]="totalA > totalB"
                    (click)="vote('a')"
                    appTrack="arena_vote_a"
                  >
                    {{ heroA!.name }} · {{ votes.a }}
                  </button>
                  <button
                    type="button"
                    class="btn vote-btn"
                    [class.winner]="totalB > totalA"
                    (click)="vote('b')"
                    appTrack="arena_vote_b"
                  >
                    {{ heroB!.name }} · {{ votes.b }}
                  </button>
                </div>
              </div>
            }
          </section>
        } @else {
          <p class="hint">
            Choose two different characters to run the comparison.
          </p>
        }
      }
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

    .loading-note {
      color: var(--text-2);
      font-family: var(--font-ui);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-size: 0.8rem;
      padding: 2.5rem 0;
    }

    .fighters {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.2rem;
      margin-bottom: 1.2rem;
    }

    @media (min-width: 860px) {
      .fighters {
        grid-template-columns: 1fr auto 1fr;
        align-items: start;
      }
    }

    .fighter {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }

    .fighter-label {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.7rem;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      color: var(--text-2);
    }

    .fighter-select {
      width: 100%;
      appearance: none;
      background: rgba(148, 163, 184, 0.08) url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5' stroke='%238aa0b8' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 1rem center;
      border: 1px solid var(--panel-border);
      border-radius: 10px;
      color: var(--text-0);
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 0.95rem;
      padding: 0.7rem 2.6rem 0.7rem 1rem;
      cursor: pointer;
      transition: border-color 0.2s ease;
    }

    .fighter-select:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    .fighter-select option {
      background: #0b101c;
      color: var(--text-0);
    }

    .fighter-card {
      border: 1px solid var(--panel-border);
      border-radius: 14px;
      overflow: hidden;
      background: rgba(10, 14, 22, 0.55);
    }

    .fighter.u-marvel .fighter-card {
      border-color: rgba(255, 61, 78, 0.4);
    }

    .fighter.u-dc .fighter-card {
      border-color: rgba(47, 124, 255, 0.4);
    }

    .fighter-portrait {
      aspect-ratio: 3 / 4;
    }

    .fighter-name {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.2rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 0.9rem 1rem 0.2rem;
    }

    .fighter-badges {
      padding: 0 1rem 1rem;
    }

    .vs-emblem {
      display: none;
      place-items: center;
      width: 74px;
      height: 74px;
      margin-top: 3.4rem;
      border-radius: 50%;
      border: 1px solid rgba(56, 225, 255, 0.45);
      background: rgba(10, 14, 22, 0.85);
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.15rem;
      letter-spacing: 0.12em;
      color: var(--accent);
      box-shadow: 0 0 30px rgba(56, 225, 255, 0.25);
    }

    @media (min-width: 860px) {
      .vs-emblem {
        display: grid;
      }
    }

    .quick-picks {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.8rem;
    }

    .qp-label {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.7rem;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      color: var(--text-2);
      margin-right: 0.4rem;
    }

    .chip {
      appearance: none;
      border: 1px solid var(--panel-border);
      background: rgba(148, 163, 184, 0.06);
      color: var(--text-1);
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 0.78rem;
      letter-spacing: 0.06em;
      padding: 0.45em 1em;
      border-radius: 999px;
      cursor: pointer;
      transition: color 0.2s ease, border-color 0.2s ease;
    }

    .chip:hover {
      color: var(--accent);
      border-color: rgba(56, 225, 255, 0.5);
    }

    .verdict-panel {
      border: 1px solid var(--panel-border);
      border-radius: 16px;
      background:
        radial-gradient(90% 60% at 50% 0%, rgba(56, 225, 255, 0.06), transparent 60%),
        rgba(10, 14, 22, 0.5);
      padding: 1.6rem 1.4rem 1.8rem;
    }

    .verdict-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: clamp(1.05rem, 2.4vw, 1.5rem);
      letter-spacing: 0.03em;
      text-align: center;
      margin: 0 0 1.4rem;
    }

    .score-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.4rem;
      margin-bottom: 1.6rem;
    }

    .score {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.15rem;
    }

    .score-name {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-1);
    }

    .score-num {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.7rem;
      color: var(--text-0);
    }

    .score.leading .score-num {
      color: var(--accent);
      text-shadow: 0 0 18px rgba(56, 225, 255, 0.4);
    }

    .score-sep {
      width: 1px;
      height: 40px;
      background: var(--panel-border);
    }

    .rows {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .row {
      display: grid;
      grid-template-columns: 2.2rem 1fr 8.5rem 1fr 2.2rem;
      align-items: center;
      gap: 0.7rem;
    }

    @media (max-width: 640px) {
      .row {
        grid-template-columns: 1.8rem 1fr 6.5rem 1fr 1.8rem;
        gap: 0.45rem;
      }
    }

    .row-value {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.85rem;
      color: var(--text-0);
      font-variant-numeric: tabular-nums;
    }

    .row-value.a {
      text-align: right;
    }

    .row-value.b {
      text-align: left;
    }

    .row-label {
      text-align: center;
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.72rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--text-2);
    }

    .bar {
      height: 6px;
      border-radius: 999px;
      background: rgba(148, 163, 184, 0.14);
      overflow: hidden;
      position: relative;
    }

    .bar .fill {
      position: absolute;
      top: 0;
      bottom: 0;
      border-radius: 999px;
      transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .bar.a {
      display: flex;
      justify-content: flex-end;
    }

    .bar.a .fill {
      right: 0;
      left: auto;
      background: linear-gradient(90deg, #7ceaff, #22b8d8);
      box-shadow: 0 0 10px rgba(56, 225, 255, 0.35);
    }

    .bar.b .fill {
      left: 0;
      background: linear-gradient(270deg, #7ceaff, #22b8d8);
      box-shadow: 0 0 10px rgba(56, 225, 255, 0.35);
    }

    .votes {
      margin-top: 1.8rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.7rem;
    }

    .votes-note {
      margin: 0;
      color: var(--text-2);
      font-size: 0.75rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .vote-btns {
      display: flex;
      flex-wrap: wrap;
      gap: 0.7rem;
      justify-content: center;
    }

    .vote-btn {
      position: relative;
    }

    .vote-btn.winner {
      border-color: rgba(56, 225, 255, 0.5);
      box-shadow: 0 0 18px rgba(56, 225, 255, 0.18);
    }

    .hint {
      color: var(--text-1);
      text-align: center;
      border: 1px dashed var(--panel-border);
      border-radius: 12px;
      padding: 1.6rem 1.2rem;
      margin-bottom: 3rem;
    }
  `,
})
export class BattleArenaPageComponent {
  private readonly characters = inject(CharacterService);
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly heroes$ = this.characters.heroes$;
  protected readonly loading$ = this.characters.loading$;
  protected readonly error$ = this.characters.error$;
  protected readonly statKeys: readonly PowerStatKey[] = POWER_STAT_KEYS;
  protected readonly statLabels = POWER_STAT_LABELS;
  protected readonly powerTotal = powerTotal;

  protected aSlug = '';
  protected bSlug = '';
  protected votes: VoteTally = { a: 0, b: 0 };
  protected votesReady = false;

  protected readonly quickPicks: readonly string[] = [
    'Batman',
    'Superman',
    'Spider-Man',
    'Iron Man',
    'Wonder Woman',
    'Captain America',
    'Hulk',
    'Wolverine',
    'Joker',
  ];

  constructor() {
    this.seo.apply({
      title: 'Battle Arena',
      description:
        'Pit any two characters from the archive against each other — six stats, one data-driven verdict, community votes.',
      path: '/battle-arena',
    });

    // Deep link support: /battle-arena?slug=69-batman
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const slug = params.get('slug');
        if (slug) {
          this.aSlug = slug;
          this.onPairChanged();
        }
      });

    // Apply default pair once the archive is available.
    this.characters.heroes$
      .pipe(
        filter((heroes) => heroes.length > 0),
        take(1),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.onPairChanged());

    afterNextRender(() => {
      this.characters.load();
      if (isPlatformBrowser(this.platformId)) {
        this.votesReady = true;
        this.syncVotesToPair();
      }
    });
  }

  protected findHero(heroes: readonly Superhero[] | null, slug: string): Superhero | undefined {
    return heroes?.find((h) => h.slug === slug);
  }

  /** Arena roster — only characters with known power stats (actor entries and
   *  stat-less files can't be meaningfully compared). */
  protected sortedHeroes(heroes: readonly Superhero[] | null): readonly Superhero[] {
    return [...(heroes ?? [])]
      .filter((h) => h.powerstats)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  protected setA(event: Event): void {
    this.aSlug = (event.target as HTMLSelectElement).value;
    this.onPairChanged();
  }

  protected setB(event: Event): void {
    this.bSlug = (event.target as HTMLSelectElement).value;
    this.onPairChanged();
  }

  protected quickPick(name: string): void {
    const hero = this.characters.heroList().find((h) => h.name === name);
    if (!hero) return;
    if (!this.aSlug || this.aSlug === this.bSlug) {
      this.aSlug = hero.slug;
    } else if (this.bSlug !== hero.slug) {
      this.bSlug = hero.slug;
    } else {
      this.bSlug = '';
    }
    this.onPairChanged();
  }

  private onPairChanged(): void {
    // Apply defaults once both slots are still empty after first data load.
    const heroes = this.characters.heroList();
    if (heroes.length > 0) {
      if (!this.aSlug) this.aSlug = heroes.find((h) => h.name === 'Batman')?.slug ?? heroes[0].slug;
      if (!this.bSlug || this.bSlug === this.aSlug) {
        this.bSlug =
          heroes.find((h) => h.name === 'Captain America' && h.slug !== this.aSlug)?.slug ??
          heroes.find((h) => h.slug !== this.aSlug)?.slug ??
          '';
      }
    }
    this.syncVotesToPair();
  }

  protected pct(value: number | undefined): number {
    if (value == null || value <= 0) return 0;
    return Math.min(100, Math.round(value));
  }

  protected verdictText(a: Superhero, b: Superhero, totalA: number, totalB: number): string {
    if (totalA === totalB) {
      return `Dead even — ${a.name} and ${b.name} total ${totalA}. It goes to the fans.`;
    }
    const winner = totalA > totalB ? a : b;
    return `${winner.name} holds the edge — ${Math.max(totalA, totalB)} vs ${Math.min(totalA, totalB)} in total power.`;
  }

  private pairKey(): string {
    return [this.aSlug, this.bSlug].sort().join('|');
  }

  private syncVotesToPair(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const raw = window.localStorage.getItem(VOTES_STORAGE_KEY);
      const all: Record<string, VoteTally> = raw ? JSON.parse(raw) : {};
      const tally = all[this.pairKey()] ?? { a: 0, b: 0 };
      this.votes = { a: tally.a ?? 0, b: tally.b ?? 0 };
    } catch {
      this.votes = { a: 0, b: 0 };
    }
  }

  protected vote(side: 'a' | 'b'): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const raw = window.localStorage.getItem(VOTES_STORAGE_KEY);
      const all: Record<string, VoteTally> = raw ? JSON.parse(raw) : {};
      const key = this.pairKey();
      const tally = all[key] ?? { a: 0, b: 0 };
      tally[side] += 1;
      all[key] = tally;
      window.localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(all));
      this.votes = { a: tally.a, b: tally.b };
    } catch {
      // Storage unavailable (private mode) — voting silently disabled.
    }
  }

  protected retry(): void {
    this.characters.retry();
  }
}
