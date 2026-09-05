import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  RESPONSE_INIT,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CharacterService } from '../../core/services/character/character-service';
import { ProductService } from '../../core/services/product/product-service';
import { SeoService } from '../../core/services/seo/seo.service';
import {
  POWER_STAT_KEYS,
  POWER_STAT_LABELS,
  PowerStatKey,
  Superhero,
  alignmentLabel,
  universeLabel,
} from '../../core/models/superhero';
import { Product } from '../../core/models/product';
import { AdSlotComponent } from '../../shared/components/ad-slot/ad-slot.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { SmartImageComponent } from '../../shared/components/smart-image/smart-image.component';
import { StatBarComponent } from '../../shared/components/stat-bar/stat-bar.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

const ACCENTS: Record<string, string> = {
  marvel: '#ff3d4e',
  dc: '#2f7cff',
  other: '#38e1ff',
};

/**
 * Character dossier — cinematic profile page (SEO-indexable, lazy-loaded).
 * Shows only what the data source actually provides; future sections
 * (comic history, arcs, timeline) are reserved, not faked.
 */
@Component({
  selector: 'app-character-detail-page',
  imports: [
    AsyncPipe,
    NgClass,
    RouterLink,
    AdSlotComponent,
    BadgeComponent,
    CharacterCardComponent,
    ProductCardComponent,
    SectionHeaderComponent,
    SmartImageComponent,
    StatBarComponent,
    EmptyStateComponent,
    ErrorStateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let heroes = heroes$ | async;
    @let loading = (loading$ | async) ?? false;
    @let error = error$ | async;
    @let hero = findHero(heroes);

    @if (loading && !hero) {
      <div class="container">
        <div class="scaffold" aria-busy="true" aria-label="Loading character">
          <div class="scaffold-media"></div>
          <div class="scaffold-lines">
            <div class="sline w-40"></div>
            <div class="sline w-70"></div>
            <div class="sline w-55"></div>
            <div class="sline w-80"></div>
            <div class="sline w-65"></div>
          </div>
        </div>
      </div>
    } @else if (error && !hero) {
      <div class="container pad">
        <app-error-state (retry)="retry()" />
      </div>
    } @else if (!hero) {
      <div class="container pad">
        <app-empty-state
          title="Character not found in this timeline"
          message="The file you are looking for doesn’t exist in the archive. It may have been moved, or the slug may be mistyped."
          actionLabel="Back to the database"
          (action)="backToDatabase()"
        />
      </div>
    } @else if (hero) {
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a routerLink="/characters">Database</a>
          <span aria-hidden="true">/</span>
          <span class="current">{{ hero!.name }}</span>
        </nav>

        <header class="dossier-head" [ngClass]="'u-' + hero!.universe">
          <div class="portrait hud">
            <app-smart-image
              [src]="hero!.image"
              [alt]="hero!.name"
              [tone]="
                hero!.universe === 'marvel' ? 'marvel' : hero!.universe === 'dc' ? 'dc' : 'neutral'
              "
            />
          </div>
          <div class="head-info">
            <p class="kicker">
              {{ hero!.publisher || universeLabel(hero!.universe) }} ·
              @if (hero!.liveAction) {
                Live-action file
              } @else {
                File #{{ hero!.id }}
              }
            </p>
            <h1 class="name">{{ hero!.name }}</h1>
            @if (hero!.biography?.fullName) {
              <p class="real-name">
                <span class="label">Real name</span>
                {{ hero!.biography?.fullName }}
              </p>
            }
            <div class="badges">
              <app-badge
                [variant]="
                  hero!.universe === 'marvel' ? 'marvel' : hero!.universe === 'dc' ? 'dc' : 'other'
                "
                [label]="universeLabel(hero!.universe)"
              />
              <app-badge
                [variant]="
                  hero!.alignment === 'good'
                    ? 'hero'
                    : hero!.alignment === 'bad'
                      ? 'villain'
                      : 'neutral'
                "
                [label]="alignmentLabel(hero!.alignment)"
              />
              @if (hero!.appearance?.gender) {
                <app-badge variant="outline" [label]="hero!.appearance?.gender" />
              }
              @if (hero!.liveAction) {
                <app-badge variant="cosmic" label="Live action" />
              }
            </div>
            @if (hero!.biography?.firstAppearance) {
              <p class="first-appear">
                <span class="label">First appearance</span>
                {{ hero!.biography?.firstAppearance }}
              </p>
            }
            @if (hero!.liveAction) {
              <a class="btn btn-ghost" [routerLink]="['/movies']">See it on the big screen</a>
            } @else {
              <a class="btn btn-primary" [routerLink]="['/battle-arena', { slug: hero!.slug }]">
                Send to the arena
              </a>
            }
          </div>
        </header>

        <app-ad-slot placement="character-top" />

        @if (hero!.liveAction) {
          <section class="section live-action hud" aria-labelledby="live-action-title">
            <h2 id="live-action-title" class="sec-title">Live-action profile</h2>
            <dl class="la-grid">
              <div class="la-item">
                <dt>Actor</dt>
                <dd>{{ hero!.liveAction.actor }}</dd>
              </div>
              <div class="la-item">
                <dt>Role</dt>
                <dd>{{ hero!.liveAction.role }}</dd>
              </div>
              <div class="la-item">
                <dt>Franchise</dt>
                <dd>{{ hero!.liveAction.franchise }}</dd>
              </div>
              <div class="la-item">
                <dt>On screen</dt>
                <dd>{{ hero!.liveAction.appearances }}</dd>
              </div>
            </dl>
            <p class="la-note">
              This is a live-action entry — the file documents the on-screen portrayal, with the
              character's archive portrait.
            </p>
          </section>
        }

        @if (hero!.powerstats) {
          <section class="section" aria-labelledby="power-title">
            <h2 id="power-title" class="sec-title">Power statistics</h2>
            <div class="stats-grid">
              @for (key of statKeys; track key; let i = $index) {
                <app-stat-bar
                  [label]="statLabels[key]"
                  [value]="statValue(hero!, key)"
                  [delay]="i * 90"
                  [accent]="accentFor(hero!.universe)"
                />
              }
            </div>
          </section>
        }

        <div class="two-col">
          @if (hero!.biography) {
            <section class="panel" aria-labelledby="bio-title">
              <h2 id="bio-title" class="sec-title">Biography</h2>
              <dl class="def">
                @if (hero!.biography.fullName) {
                  <div>
                    <dt>Full name</dt>
                    <dd>{{ hero!.biography.fullName }}</dd>
                  </div>
                }
                @if (hero!.biography.placeOfBirth) {
                  <div>
                    <dt>Place of birth</dt>
                    <dd>{{ hero!.biography.placeOfBirth }}</dd>
                  </div>
                }
                @if (hero!.biography.firstAppearance) {
                  <div>
                    <dt>First appearance</dt>
                    <dd>{{ hero!.biography.firstAppearance }}</dd>
                  </div>
                }
                @if (hero!.biography.publisher) {
                  <div>
                    <dt>Publisher</dt>
                    <dd>{{ hero!.biography.publisher }}</dd>
                  </div>
                }
              </dl>
            </section>
          }

          @if (hero!.appearance) {
            <section class="panel" aria-labelledby="appearance-title">
              <h2 id="appearance-title" class="sec-title">Appearance</h2>
              <dl class="def def-grid">
                @if (hero!.appearance.gender) {
                  <div>
                    <dt>Gender</dt>
                    <dd>{{ hero!.appearance.gender }}</dd>
                  </div>
                }
                @if (hero!.appearance.race) {
                  <div>
                    <dt>Race / class</dt>
                    <dd>{{ hero!.appearance.race }}</dd>
                  </div>
                }
                @if (hero!.appearance.height) {
                  <div>
                    <dt>Height</dt>
                    <dd>{{ hero!.appearance.height }}</dd>
                  </div>
                }
                @if (hero!.appearance.weight) {
                  <div>
                    <dt>Weight</dt>
                    <dd>{{ hero!.appearance.weight }}</dd>
                  </div>
                }
                @if (hero!.appearance.eyeColor) {
                  <div>
                    <dt>Eyes</dt>
                    <dd>{{ hero!.appearance.eyeColor }}</dd>
                  </div>
                }
                @if (hero!.appearance.hairColor) {
                  <div>
                    <dt>Hair</dt>
                    <dd>{{ hero!.appearance.hairColor }}</dd>
                  </div>
                }
              </dl>
            </section>
          }

          @if (hero!.work) {
            <section class="panel" aria-labelledby="work-title">
              <h2 id="work-title" class="sec-title">Work</h2>
              <dl class="def">
                @if (hero!.work.occupation) {
                  <div>
                    <dt>Occupation</dt>
                    <dd>{{ hero!.work.occupation }}</dd>
                  </div>
                }
                @if (hero!.work.base) {
                  <div>
                    <dt>Base of operations</dt>
                    <dd>{{ hero!.work.base }}</dd>
                  </div>
                }
              </dl>
            </section>
          }

          @if (hero!.connections) {
            <section class="panel" aria-labelledby="connections-title">
              <h2 id="connections-title" class="sec-title">Connections</h2>
              <dl class="def">
                @if (hero!.connections.groupAffiliation) {
                  <div>
                    <dt>Group affiliation</dt>
                    <dd>{{ hero!.connections.groupAffiliation }}</dd>
                  </div>
                }
                @if (hero!.connections.relatives) {
                  <div>
                    <dt>Relatives</dt>
                    <dd>{{ hero!.connections.relatives }}</dd>
                  </div>
                }
              </dl>
            </section>
          }
        </div>

        <section class="coming-soon" aria-label="Coming soon">
          <span class="lock" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <rect
                x="5"
                y="10"
                width="14"
                height="10"
                rx="2"
                stroke="currentColor"
                stroke-width="1.8"
              />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.8" />
            </svg>
          </span>
          <div>
            <h3 class="cs-title">Comic history &amp; story arcs</h3>
            <p class="cs-text">
              Full origin history, major arcs, movie &amp; TV appearances and an in-universe
              timeline arrive with our own universe archive. What you see above is exactly what the
              current data source provides — nothing is invented.
            </p>
          </div>
        </section>

        <app-ad-slot placement="character-middle" />

        @if (related(hero!).length) {
          <section class="section" aria-labelledby="related-title">
            <app-section-header kicker="Same universe" title="Related characters" />
            <div class="related-row">
              @for (rel of related(hero!); track rel.slug) {
                <app-character-card [hero]="rel" />
              }
            </div>
          </section>
        }

        @if (shopFor(hero!).length) {
          <section class="section" aria-labelledby="shop-title">
            <app-section-header
              kicker="Shop the character"
              [title]="'Shop ' + hero!.name"
              subtitle="Fan-favourite gear linked from this file."
            />
            <div class="shop-row">
              @for (product of shopFor(hero!); track product.id) {
                <app-product-card [product]="product" />
              }
            </div>
          </section>
        }
      </div>
    }
  `,
  styles: `
    .pad {
      padding: 3rem 1.25rem;
    }

    .crumbs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 2.2rem 0 1.2rem;
      font-family: var(--font-ui);
      font-size: 0.8rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .crumbs a {
      color: var(--text-2);
      text-decoration: none;
    }

    .crumbs a:hover {
      color: var(--accent);
    }

    .crumbs span {
      color: var(--text-2);
    }

    .crumbs .current {
      color: var(--text-0);
    }

    .scaffold {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 1rem 0 3rem;
    }

    @media (min-width: 860px) {
      .scaffold {
        grid-template-columns: 340px minmax(0, 1fr);
      }
    }

    .scaffold-media {
      aspect-ratio: 3 / 4;
      border-radius: 16px;
      background: linear-gradient(
        110deg,
        rgba(148, 163, 184, 0.05) 30%,
        rgba(148, 163, 184, 0.12) 50%,
        rgba(148, 163, 184, 0.05) 70%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s ease-in-out infinite;
    }

    .scaffold-lines {
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
      justify-content: center;
    }

    .sline {
      height: 1.1rem;
      border-radius: 6px;
      background: linear-gradient(
        110deg,
        rgba(148, 163, 184, 0.07) 30%,
        rgba(148, 163, 184, 0.14) 50%,
        rgba(148, 163, 184, 0.07) 70%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s ease-in-out infinite;
    }

    .w-40 {
      width: 40%;
    }
    .w-70 {
      width: 70%;
    }
    .w-55 {
      width: 55%;
    }
    .w-80 {
      width: 80%;
    }
    .w-65 {
      width: 65%;
    }

    @keyframes shimmer {
      from {
        background-position: 180% 0;
      }
      to {
        background-position: -20% 0;
      }
    }

    .dossier-head {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.8rem;
      padding: 0.5rem 0 1rem;
    }

    @media (min-width: 860px) {
      .dossier-head {
        grid-template-columns: 340px minmax(0, 1fr);
        align-items: start;
      }
    }

    .portrait {
      aspect-ratio: 3 / 4;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid var(--panel-border);
    }

    .hud {
      position: relative;
    }

    .hud::before,
    .hud::after {
      content: '';
      position: absolute;
      width: 26px;
      height: 26px;
      z-index: 2;
      pointer-events: none;
    }

    .hud::before {
      top: 10px;
      left: 10px;
      border-top: 2px solid var(--hud-accent, rgba(56, 225, 255, 0.7));
      border-left: 2px solid var(--hud-accent, rgba(56, 225, 255, 0.7));
    }

    .hud::after {
      bottom: 10px;
      right: 10px;
      border-bottom: 2px solid var(--hud-accent, rgba(56, 225, 255, 0.7));
      border-right: 2px solid var(--hud-accent, rgba(56, 225, 255, 0.7));
    }

    .dossier-head.u-marvel .hud {
      --hud-accent: rgba(255, 61, 78, 0.75);
    }

    .dossier-head.u-dc .hud {
      --hud-accent: rgba(47, 124, 255, 0.75);
    }

    .name {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(1.9rem, 5vw, 3.2rem);
      letter-spacing: 0.03em;
      line-height: 1.02;
      text-transform: uppercase;
      margin: 0.4rem 0 0.6rem;
    }

    .real-name,
    .first-appear {
      color: var(--text-1);
      margin: 0.4rem 0;
      font-size: 1rem;
      line-height: 1.5;
    }

    .label {
      display: inline-block;
      margin-right: 0.6rem;
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.68rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--text-2);
    }

    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 1rem 0 0.6rem;
    }

    .head-info .btn {
      margin-top: 1.2rem;
    }

    .section {
      padding-block: 2.2rem 0.5rem;
    }

    .sec-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.25rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin: 0 0 1.2rem;
    }

    /* Live-action profile panel (actor entries). */
    .live-action {
      border: 1px solid rgba(168, 85, 247, 0.35);
      border-radius: 16px;
      padding: 1.4rem 1.5rem;
      background:
        radial-gradient(120% 100% at 0% 0%, rgba(168, 85, 247, 0.12), transparent 55%),
        rgba(10, 14, 22, 0.55);
    }

    .live-action .sec-title {
      color: #c4a5ff;
    }

    .la-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.9rem 1.5rem;
      margin: 0 0 1rem;
    }

    .la-item dt {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.66rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--text-2);
      margin-bottom: 0.2rem;
    }

    .la-item dd {
      margin: 0;
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 1rem;
      color: var(--text-0);
    }

    .la-note {
      margin: 0;
      color: var(--text-2);
      font-size: 0.85rem;
      line-height: 1.55;
    }

    @media (min-width: 700px) {
      .la-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.1rem 2rem;
    }

    @media (min-width: 700px) {
      .stats-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    .two-col {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.2rem;
      padding-top: 2rem;
    }

    @media (min-width: 900px) {
      .two-col {
        grid-template-columns: 1fr 1fr;
      }
    }

    .panel {
      border: 1px solid var(--panel-border);
      border-radius: 14px;
      background: rgba(10, 14, 22, 0.5);
      padding: 1.4rem 1.4rem 1.2rem;
    }

    .def {
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .def div {
      display: grid;
      gap: 0.2rem;
    }

    .def dt {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.68rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--text-2);
    }

    .def dd {
      margin: 0;
      color: var(--text-0);
      font-size: 0.95rem;
      line-height: 1.55;
    }

    .def-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.8rem 1.2rem;
    }

    .coming-soon {
      display: flex;
      gap: 1rem;
      margin-top: 2.2rem;
      padding: 1.3rem 1.4rem;
      border: 1px dashed var(--panel-border);
      border-radius: 14px;
      background: rgba(148, 163, 184, 0.04);
      align-items: flex-start;
    }

    .lock {
      flex-shrink: 0;
      margin-top: 0.2rem;
      color: var(--text-2);
    }

    .cs-title {
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin: 0 0 0.4rem;
    }

    .cs-text {
      margin: 0;
      color: var(--text-1);
      font-size: 0.9rem;
      line-height: 1.6;
      max-width: 70ch;
    }

    .related-row,
    .shop-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.1rem;
    }

    .shop-row {
      grid-template-columns: minmax(0, 1fr);
    }

    @media (min-width: 560px) {
      .shop-row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (min-width: 1000px) {
      .related-row,
      .shop-row {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
  `,
})
export class CharacterDetailPageComponent {
  private readonly characters = inject(CharacterService);
  private readonly products = inject(ProductService);
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly response = inject(RESPONSE_INIT, { optional: true });

  protected readonly heroes$ = this.characters.heroes$;
  protected readonly loading$ = this.characters.loading$;
  protected readonly error$ = this.characters.error$;
  protected readonly statKeys: readonly PowerStatKey[] = POWER_STAT_KEYS;
  protected readonly statLabels = POWER_STAT_LABELS;
  protected readonly universeLabel = universeLabel;
  protected readonly alignmentLabel = alignmentLabel;

  private slug = '';
  /** 'none' → 'fallback' (slug-derived) → 'full' (data-derived, wins). */
  private seoStage: 'none' | 'fallback' | 'full' = 'none';

  constructor() {
    this.characters.load();
    this.products.load();
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.slug = params.get('slug') ?? '';
      this.seoStage = 'none';
      this.applyFallbackSeo();
      this.tryApplySeo();
      this.cdr.markForCheck();
    });

    this.characters.heroes$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.tryApplySeo());
  }

  /**
   * Slug-derived SEO applied in the constructor, so every character URL gets
   * a unique title + canonical on the server even before data resolves.
   * The name comes from the URL itself (Akabab slugs are `id-name`), not
   * invented data. Replaced by the full data-driven SEO in tryApplySeo().
   */
  private applyFallbackSeo(): void {
    if (this.seoStage !== 'none' || !this.slug) return;
    this.seoStage = 'fallback';
    const name = this.nameFromSlug(this.slug);
    this.seo.apply({
      title: `${name} — Character File`,
      description:
        `${name} — character file from The Superhero Universe archive. ` +
        'Power stats, biography, appearance and connections.',
      path: `/characters/${this.slug}`,
      jsonLd: [],
    });
  }

  /** '69-batman' → 'Batman', '346-iron-man' → 'Iron Man' (display casing only). */
  private nameFromSlug(slug: string): string {
    const lower = new Set([
      'a',
      'an',
      'and',
      'at',
      'by',
      'for',
      'in',
      'of',
      'on',
      'or',
      'the',
      'to',
      'vs',
    ]);
    const clean = slug
      .replace(/^live-/, '')
      .replace(/^\d+-/, '')
      .replace(/-/g, ' ')
      .trim();
    return clean
      .split(' ')
      .map((w, i) =>
        i > 0 && lower.has(w.toLowerCase())
          ? w.toLowerCase()
          : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
      )
      .join(' ');
  }

  private tryApplySeo(): void {
    if (this.seoStage === 'full' || !this.slug) return;
    const hero = this.characters.getBySlug(this.slug);
    if (!hero) {
      if (this.characters.heroList().length) {
        if (this.response) this.response.status = 404;
        this.seo.apply({
          title: 'Character not found',
          description: 'Browse the superhero character archive.',
          path: `/characters/${this.slug}`,
          noindex: true,
        });
      }
      return;
    }
    this.seoStage = 'full';

    const description =
      `${hero.name} — ${hero.publisher ?? universeLabel(hero.universe)} character file. ` +
      'Power stats, biography, appearance and connections from The Superhero Universe archive.';

    this.seo.apply({
      title: `${hero.name} — Character File`,
      description: description.trim(),
      image: hero.image,
      imageAlt: hero.name,
      path: `/characters/${hero.slug}`,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: hero.name,
          alternateName: hero.biography?.fullName,
          description: description.trim(),
          image: hero.image,
        },
      ],
    });
  }

  protected findHero(heroes: Superhero[] | null | undefined): Superhero | undefined {
    return heroes?.find((h) => h.slug === this.slug);
  }

  protected related(hero: Superhero): Superhero[] {
    return this.characters.relatedTo(hero, this.characters.heroList());
  }

  protected shopFor(hero: Superhero): Product[] {
    return this.products.byCharacter(hero.name, this.products.productList());
  }

  protected statValue(hero: Superhero, key: PowerStatKey): number | undefined {
    return hero.powerstats?.[key];
  }

  protected accentFor(universe: string): string {
    return ACCENTS[universe] ?? ACCENTS['other'];
  }

  protected backToDatabase(): void {
    void this.router.navigate(['/characters']);
  }

  protected retry(): void {
    this.characters.retry();
  }
}
