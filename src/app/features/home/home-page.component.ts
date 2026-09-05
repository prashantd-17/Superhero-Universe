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
import { RouterLink } from '@angular/router';
import { APP_CONFIG } from '../../core/config/app-config';
import { AssetService } from '../../core/services/asset/asset.service';
import { CharacterService } from '../../core/services/character/character-service';
import { FactService } from '../../core/services/fact/fact-service';
import { ProductService } from '../../core/services/product/product-service';
import { SeoService } from '../../core/services/seo/seo.service';
import { Superhero } from '../../core/models/superhero';
import { Product } from '../../core/models/product';
import { SuperheroFact } from '../../core/models/fact';
import { TrackDirective } from '../../shared/directives/track.directive';
import { AdSlotComponent } from '../../shared/components/ad-slot/ad-slot.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { SkeletonGridComponent } from '../../shared/components/skeleton-grid/skeleton-grid.component';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FactCardComponent } from '../../shared/components/fact-card/fact-card.component';
import { InstagramCtaComponent } from '../../shared/components/instagram-cta/instagram-cta.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ExploreGridComponent } from './components/explore-grid/explore-grid.component';
import { UniverseShowdownComponent } from './components/universe-showdown/universe-showdown.component';
import { TimelinePreviewComponent } from './components/timeline-preview/timeline-preview.component';
import { HOME_CONTENT } from './home-content';

/**
 * The homepage — the brand's visual showcase.
 * Every section composes shared components; data flows through services.
 */
@Component({
  selector: 'app-home-page',
  imports: [
    AsyncPipe,
    NgClass,
    RouterLink,
    TrackDirective,
    AdSlotComponent,
    SectionHeaderComponent,
    SkeletonGridComponent,
    CharacterCardComponent,
    ProductCardComponent,
    FactCardComponent,
    InstagramCtaComponent,
    HeroSectionComponent,
    ExploreGridComponent,
    UniverseShowdownComponent,
    TimelinePreviewComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero-section />
    <app-ad-slot placement="home-top" />

    <div class="container">
      <!-- Explore the universe -->
      <section class="section" id="explore" aria-labelledby="explore-title">
        <app-section-header
          kicker="Wayfinder"
          title="Explore the universe"
          subtitle="One archive for every corner of superhero fiction — characters, cinema, comics and the community behind them."
        />
        <app-explore-grid />
      </section>

      <!-- Trending characters -->
      <section class="section" aria-labelledby="trending-title">
        <div class="head-row">
          <app-section-header kicker="Most wanted" title="Trending characters" />
          <a class="more-link" routerLink="/characters">View all &#8594;</a>
        </div>
        @let heroes = (heroes$ | async);
        @let loading = (loading$ | async) ?? false;
        @let error = (error$ | async);
        @if (loading && !heroes?.length) {
          <app-skeleton-grid [count]="4" variant="character" />
        } @else if (error && !heroes?.length) {
          <p class="soft-error">
            The character archive is unreachable right now — trending files will appear
            when the link is restored.
          </p>
        } @else {
          <div class="trend-row">
            @for (hero of trendingFor(heroes); track hero.slug) {
              <app-character-card [hero]="hero" />
            }
          </div>
        }
      </section>

      <app-ad-slot placement="home-middle" />

      <!-- Marvel vs DC -->
      <section class="section" aria-labelledby="showdown-title">
        <app-section-header
          kicker="The rivalry"
          title="Marvel vs DC"
          subtitle="Two universes, one fandom. Pick your side — or stay loyal to both."
        />
        <app-universe-showdown />
      </section>

      <!-- Latest content + fact -->
      <section class="section" aria-labelledby="content-title">
        <div class="duo">
          <div class="duo-main">
            <app-section-header
              kicker="From the archive"
              title="Latest superhero content"
              subtitle="Guides, files and timelines — updated as the fandom evolves."
            />
            <div class="content-grid">
              @for (tile of content; track tile.id) {
                <a
                  class="content-tile"
                  [ngClass]="'accent-' + tile.accent"
                  [routerLink]="tile.link"
                  appTrack="home_content_open"
                >
                  <span class="tag">{{ tile.tag }}</span>
                  <span class="title">{{ tile.title }}</span>
                  <span class="blurb">{{ tile.blurb }}</span>
                </a>
              }
            </div>
          </div>
          <aside class="duo-side">
            <app-fact-card [fact]="fact" (shuffle)="shuffleFact()" />
          </aside>
        </div>
      </section>

      <!-- Timeline preview -->
      <section class="section" aria-labelledby="timeline-title">
        <div class="head-row">
          <app-section-header
            kicker="Through the ages"
            title="The superhero timeline"
            subtitle="From the first Iron Man to the newest multiverse — cinema, year by year."
          />
        </div>
        <app-timeline-preview />
      </section>

      <!-- Battle arena teaser -->
      <section class="section" aria-labelledby="battle-title">
        <app-section-header
          kicker="Settle it"
          title="Battle arena"
          subtitle="Two characters. Six stats. One verdict. Pit anyone from the archive against each other."
        />
        <a class="battle-teaser" routerLink="/battle-arena" appTrack="home_battle_open">
          <span class="teaser-side teaser-a">
            <span class="teaser-name">Batman</span>
            <span class="teaser-sub">The world’s greatest detective</span>
          </span>
          <span class="teaser-vs" aria-hidden="true">VS</span>
          <span class="teaser-side teaser-b">
            <span class="teaser-name">Captain America</span>
            <span class="teaser-sub">The first Avenger</span>
          </span>
          <span class="teaser-cta">Enter the arena &#8594;</span>
        </a>
      </section>

      <!-- Featured products -->
      <section class="section" aria-labelledby="shop-title">
        <div class="head-row">
          <app-section-header
            kicker="Fan shop"
            title="Featured drops"
            subtitle="Hand-picked figures, comics and merch for serious fans. Affiliate links — your support keeps the universe alive."
          />
          <a class="more-link" routerLink="/products">Visit the shop &#8594;</a>
        </div>
        @let products = (products$ | async);
        @if (products?.length) {
          <div class="product-row">
            @for (product of featuredFor(products); track product.id) {
              <app-product-card [product]="product" />
            }
          </div>
        } @else {
          <p class="soft-note">The shop is being stocked — new drops incoming.</p>
        }
      </section>

      <!-- Instagram -->
      <section class="section" aria-labelledby="ig-title">
        <app-section-header
          kicker="The community"
          title="Follow the universe"
          subtitle="Everything here started on Instagram — and the daily content still lives there."
        />
        <app-instagram-cta />
      </section>
    </div>

    <!-- Final CTA banner -->
    <section class="final-cta" [style.background-image]="'url(' + nebula + ')'">
      <div class="container final-cta-inner">
        <p class="kicker">The signal continues</p>
        <h2 class="final-title">The universe is bigger on Instagram</h2>
        <p class="final-sub">
          Daily character spotlights, movie breakdowns, comic lore and facts —
          join {{ config.brand.followersLabel }} fans following {{ config.brand.instagramHandle }}.
        </p>
        <a
          class="btn btn-primary btn-lg"
          [href]="config.brand.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          appTrack="home_final_follow"
        >
          Follow {{ config.brand.instagramHandle }}
        </a>
      </div>
    </section>
  `,
  styles: `
    .section {
      padding-block: clamp(3rem, 6vw, 4.5rem);
    }

    .head-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 1rem;
    }

    .more-link {
      flex-shrink: 0;
      margin-bottom: 2rem;
      color: var(--accent);
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.8rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      text-decoration: none;
    }

    .more-link:hover {
      text-decoration: underline;
    }

    .trend-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.1rem;
    }

    @media (min-width: 700px) {
      .trend-row {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    @media (min-width: 1100px) {
      .trend-row {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .soft-error,
    .soft-note {
      color: var(--text-1);
      background: rgba(148, 163, 184, 0.06);
      border: 1px dashed var(--panel-border);
      border-radius: 12px;
      padding: 1.4rem 1.2rem;
      line-height: 1.6;
    }

    .duo {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.6rem;
      align-items: start;
    }

    @media (min-width: 980px) {
      .duo {
        grid-template-columns: 1.6fr 1fr;
      }
    }

    .duo-side {
      position: sticky;
      top: 84px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.9rem;
    }

    @media (min-width: 640px) {
      .content-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .content-tile {
      --tile-accent: #38e1ff;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      padding: 1.1rem 1.1rem 1.2rem;
      border: 1px solid var(--panel-border);
      border-left: 2px solid var(--tile-accent);
      border-radius: 12px;
      background: rgba(10, 14, 22, 0.5);
      text-decoration: none;
      color: var(--text-0);
      transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
    }

    .content-tile.accent-marvel { --tile-accent: #ff3d4e; }
    .content-tile.accent-dc { --tile-accent: #2f7cff; }
    .content-tile.accent-cosmic { --tile-accent: #a855f7; }
    .content-tile.accent-accent { --tile-accent: #38e1ff; }

    .content-tile:hover {
      transform: translateY(-3px);
      border-color: color-mix(in srgb, var(--tile-accent) 40%, transparent);
      box-shadow: 0 14px 30px -18px color-mix(in srgb, var(--tile-accent) 50%, transparent);
    }

    .content-tile .tag {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.66rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--tile-accent);
    }

    .content-tile .title {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 1.02rem;
      line-height: 1.3;
    }

    .content-tile .blurb {
      color: var(--text-1);
      font-size: 0.84rem;
      line-height: 1.5;
    }

    .battle-teaser {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.4rem;
      padding: 2.2rem 1.4rem;
      border: 1px solid var(--panel-border);
      border-radius: 16px;
      background:
        radial-gradient(80% 100% at 50% 0%, rgba(168, 85, 247, 0.12), transparent 60%),
        rgba(10, 14, 22, 0.55);
      text-decoration: none;
      color: var(--text-0);
      overflow: hidden;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
    }

    .battle-teaser:hover {
      border-color: rgba(168, 85, 247, 0.5);
      box-shadow: 0 24px 50px -24px rgba(168, 85, 247, 0.5);
    }

    .battle-teaser::before,
    .battle-teaser::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 38%;
      max-width: 340px;
      height: 1px;
    }

    .battle-teaser::before {
      left: 3%;
      background: linear-gradient(90deg, rgba(255, 61, 78, 0.6), transparent);
    }

    .battle-teaser::after {
      right: 3%;
      background: linear-gradient(270deg, rgba(47, 124, 255, 0.6), transparent);
    }

    .teaser-side {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;
      text-align: center;
    }

    .teaser-name {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(1.4rem, 3.4vw, 2rem);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .teaser-a .teaser-name {
      color: #ff8a97;
    }

    .teaser-b .teaser-name {
      color: #8ab8ff;
    }

    .teaser-sub {
      color: var(--text-2);
      font-size: 0.82rem;
      letter-spacing: 0.08em;
    }

    .teaser-vs {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.1rem;
      letter-spacing: 0.2em;
      color: var(--accent);
      border: 1px solid rgba(56, 225, 255, 0.4);
      border-radius: 50%;
      width: 58px;
      height: 58px;
      display: grid;
      place-items: center;
      box-shadow: 0 0 24px rgba(56, 225, 255, 0.25);
    }

    .teaser-cta {
      margin-top: 0.4rem;
      color: var(--accent);
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.8rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .product-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.1rem;
    }

    @media (min-width: 1000px) {
      .product-row {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .final-cta {
      position: relative;
      margin-top: 4rem;
      background-size: cover;
      background-position: center;
      border-top: 1px solid var(--panel-border);
    }

    .final-cta::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(4, 6, 11, 0.82), rgba(4, 6, 11, 0.92));
    }

    .final-cta-inner {
      position: relative;
      text-align: center;
      padding: clamp(3.5rem, 8vw, 6rem) 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .final-title {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(1.6rem, 4.5vw, 2.6rem);
      letter-spacing: 0.03em;
      margin: 0;
      max-width: 24ch;
    }

    .final-sub {
      color: var(--text-1);
      margin: 0 0 0.8rem;
      max-width: 52ch;
      line-height: 1.6;
    }
  `,
})
export class HomePageComponent {
  protected readonly config = inject(APP_CONFIG);
  private readonly characters = inject(CharacterService);
  private readonly products = inject(ProductService);
  private readonly facts = inject(FactService);
  private readonly seo = inject(SeoService);
  private readonly asset = inject(AssetService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly heroes$ = this.characters.heroes$;
  protected readonly loading$ = this.characters.loading$;
  protected readonly error$ = this.characters.error$;
  protected readonly products$ = this.products.products$;
  protected readonly content = HOME_CONTENT;
  protected readonly nebula = this.asset.url('images/cosmic-nebula.jpg');

  protected fact: SuperheroFact = this.facts.factOfDay();

  constructor() {
    this.seo.apply({
      title: 'The official digital home of the superhero fandom',
      description:
        'Explore 560+ Marvel & DC character files, movies and TV, comics lore, the battle arena and the fan shop — from @thesuperhero_universe.',
      path: '/',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'The Superhero Universe',
          description:
            'The digital home of @thesuperhero_universe — Marvel & DC character database, movies, comics lore and fan shop.',
        },
      ],
    });

    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.characters.load();
        this.products.load();
      }
    });
  }

  protected trendingFor(heroes: Superhero[] | null | undefined): Superhero[] {
    return heroes && heroes.length > 0 ? this.characters.trending(heroes) : [];
  }

  protected featuredFor(products: readonly Product[] | null | undefined): Product[] {
    return products ? products.filter((p) => p.featured).slice(0, 4) : [];
  }

  protected shuffleFact(): void {
    this.fact = this.facts.shuffle(this.fact);
  }
}
