import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharacterService } from '../../core/services/character/character-service';
import { MovieService } from '../../core/services/movie/movie-service';
import { SeoService } from '../../core/services/seo/seo.service';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

/** Real, linked publisher guides rather than keyword-only doorway pages. */
@Component({
  selector: 'app-universe-page',
  imports: [RouterLink, CharacterCardComponent, MovieCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container universe-page">
      <nav class="universe-nav" aria-label="Universe guides">
        <a
          routerLink="/universes/marvel"
          [attr.aria-current]="universe === 'marvel' ? 'page' : null"
          >Marvel</a
        >
        <a routerLink="/universes/dc" [attr.aria-current]="universe === 'dc' ? 'page' : null">DC</a>
      </nav>
      <header>
        <p class="kicker">The Superhero Universe · fan guide</p>
        <h1>{{ name }} characters, movies &amp; TV</h1>
        @if (universe === 'marvel') {
          <p class="intro">
            Meet the heroes behind the masks, from Spider-Man and the X-Men to the Avengers. Explore
            Marvel’s comic-book characters, the Marvel Cinematic Universe, older film adaptations,
            live-action shows and animated series in one searchable archive.
          </p>
        } @else {
          <p class="intro">
            Explore the world of Batman, Superman, Wonder Woman and the Justice League. Discover
            DC’s comic-book characters alongside the DCU, DCEU, classic films, standalone stories,
            live-action television and animated adventures.
          </p>
        }
        <p class="counts">
          {{ comicHeroes().length }} character files · {{ films().length }} films ·
          {{ shows().length }} series
        </p>
      </header>
      <section aria-labelledby="heroes-heading">
        <div class="section-heading">
          <h2 id="heroes-heading">Meet the characters</h2>
          <a routerLink="/characters" [queryParams]="{ universe }">All {{ name }} characters →</a>
        </div>
        <div class="grid character-grid">
          @for (hero of featuredHeroes(); track hero.slug) {
            <app-character-card [hero]="hero" />
          }
        </div>
      </section>
      <section aria-labelledby="films-heading">
        <div class="section-heading">
          <h2 id="films-heading">{{ name }} on the big screen</h2>
          <a routerLink="/movies" [queryParams]="{ universe, kind: 'film' }">Browse the films →</a>
        </div>
        <div class="grid">
          @for (film of films().slice(0, 4); track film.slug) {
            <app-movie-card [movie]="film" />
          }
        </div>
      </section>
      <section aria-labelledby="series-heading">
        <div class="section-heading">
          <h2 id="series-heading">Live-action &amp; animated series</h2>
          <a routerLink="/series" [queryParams]="{ universe }">Browse all {{ name }} series →</a>
        </div>
        <div class="grid">
          @for (show of shows().slice(0, 4); track show.slug) {
            <app-movie-card [movie]="show" />
          }
        </div>
      </section>
      <section class="guide-note" aria-labelledby="continuity-heading">
        <h2 id="continuity-heading">One publisher, many different worlds</h2>
        @if (universe === 'marvel') {
          <p>
            Not every Marvel adaptation belongs to the MCU. The archive keeps the X-Men films,
            earlier Spider-Man adaptations, standalone movies and television easy to distinguish.
            Stories published through imprints such as Icon and Malibu have their own collection.
          </p>
        } @else {
          <p>
            The DCU, DCEU, Arrowverse, classic Superman and Batman films, and standalone adaptations
            do not all share one continuity. Use the collections and each title’s notes to tell them
            apart. Vertigo, WildStorm and other imprint adaptations are identified separately.
          </p>
        }
        <p>
          Each title links to a reference for its credits. Release years include first premieres;
          later wide-release dates and broadcast repackagings are explained where relevant.
        </p>
        <a routerLink="/lore">Explore comic stories and lore →</a>
      </section>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    .universe-page {
      padding-block: 2rem 3rem;
    }
    .universe-nav {
      display: flex;
      gap: 0.7rem;
      margin-bottom: 2rem;
    }
    .universe-nav a {
      padding: 0.6rem 1.1rem;
      border: 1px solid var(--panel-border);
      border-radius: 8px;
      text-decoration: none;
    }
    .universe-nav a[aria-current] {
      color: var(--accent);
      border-color: var(--accent);
    }
    h1 {
      font-family: var(--font-display);
      font-size: clamp(1.75rem, 4vw, 2.8rem);
      line-height: 1.25;
      margin-block: 0.75rem 1rem;
    }
    .intro {
      max-width: 74ch;
      color: var(--text-1);
      line-height: 1.8;
    }
    .counts {
      margin-top: 1rem;
      color: var(--accent);
      font-size: 0.85rem;
    }
    section {
      margin-top: 3rem;
    }
    .section-heading {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0.7rem;
      align-items: baseline;
      margin-bottom: 1.2rem;
    }
    h2 {
      font-family: var(--font-display);
      font-size: clamp(1.1rem, 2.5vw, 1.45rem);
    }
    .section-heading a,
    .guide-note a {
      color: var(--accent);
      font-size: 0.85rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }
    .guide-note {
      padding: 1.5rem;
      border: 1px solid var(--panel-border);
      border-radius: 14px;
      line-height: 1.8;
    }
    .guide-note p {
      margin-block: 0.8rem;
      color: var(--text-1);
      max-width: 85ch;
    }
    @media (min-width: 900px) {
      .grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
    @media (max-width: 440px) {
      .grid {
        gap: 0.65rem;
      }
    }
  `,
})
export class UniversePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly characters = inject(CharacterService);
  private readonly movies = inject(MovieService);
  private readonly seo = inject(SeoService);
  protected readonly universe: 'marvel' | 'dc' = this.route.snapshot.data['universe'];
  protected readonly name = this.universe === 'marvel' ? 'Marvel' : 'DC';
  private readonly heroes = toSignal(this.characters.heroes$, { initialValue: [] });
  private readonly titles = toSignal(this.movies.movies$, { initialValue: [] });
  protected readonly comicHeroes = computed(() =>
    this.heroes().filter((hero) => hero.universe === this.universe && !hero.liveAction),
  );
  protected readonly featuredHeroes = computed(() => {
    const names =
      this.universe === 'marvel'
        ? [
            'Spider-Man',
            'Iron Man',
            'Captain America',
            'Thor',
            'Hulk',
            'Black Panther',
            'Wolverine',
            'Captain Marvel',
          ]
        : [
            'Batman',
            'Superman',
            'Wonder Woman',
            'Flash',
            'Hal Jordan',
            'Aquaman',
            'Nightwing',
            'Harley Quinn',
          ];
    return this.comicHeroes()
      .filter((hero) => names.includes(hero.name))
      .slice(0, 8);
  });
  protected readonly films = computed(() =>
    this.titles()
      .filter((movie) => movie.universe === this.universe && movie.kind === 'film')
      .sort((a, b) => b.year - a.year),
  );
  protected readonly shows = computed(() =>
    this.titles()
      .filter((movie) => movie.universe === this.universe && movie.kind === 'series')
      .sort((a, b) => b.year - a.year),
  );

  constructor() {
    this.characters.load();
    this.movies.load();
    effect(() =>
      this.seo.apply({
        title: `${this.name} Characters, Movies & TV Guide`,
        description: `Explore ${this.name} superheroes, movies, live-action TV and animated series with character profiles, cast, creators and comic-book lore from The Superhero Universe.`,
        path: `/universes/${this.universe}`,
        jsonLd: [
          {
            '@type': 'CollectionPage',
            name: `${this.name} fan guide`,
            about: {
              '@type': 'Thing',
              name: this.universe === 'marvel' ? 'Marvel Comics' : 'DC Comics',
            },
            hasPart: [...this.films().slice(0, 4), ...this.shows().slice(0, 4)].map((title) => ({
              '@type': title.kind === 'series' ? 'TVSeries' : 'Movie',
              name: title.title,
              url: this.seo.absoluteUrl(`/movies/${title.slug}`),
            })),
          },
        ],
      }),
    );
  }
}
