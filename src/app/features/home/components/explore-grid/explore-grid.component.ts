import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrackDirective } from '../../../../shared/directives/track.directive';

interface ExploreCard {
  id: string;
  title: string;
  desc: string;
  link: string;
  accent: string;
  icon: 'mask' | 'film' | 'book' | 'bolt' | 'tag';
}

/** "Explore the universe" — the main wayfinder grid. */
@Component({
  selector: 'app-explore-grid',
  imports: [RouterLink, TrackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid">
      @for (card of cards; track card.id) {
        <a
          class="tile"
          [style.--tile-accent]="card.accent"
          [routerLink]="card.link"
          [appTrack]="'explore_open_' + card.id"
        >
          <span class="icon" aria-hidden="true">
            @switch (card.icon) {
              @case ('mask') {
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                  <path d="M4 5c2.5 1.2 5.2 1.8 8 1.8S17.5 6.2 20 5v6.5c0 5-3.4 8.6-8 10.5-4.6-1.9-8-5.5-8-10.5V5Z" stroke="currentColor" stroke-width="1.8" />
                  <path d="M8 11.5c1 .8 2 .8 3 0M13 11.5c1 .8 2 .8 3 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                </svg>
              }
              @case ('film') {
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                  <rect x="3" y="5" width="18" height="15" rx="2" stroke="currentColor" stroke-width="1.8" />
                  <path d="M3 9h18M7.5 5l2 4M12 5l2 4M16.5 5l2 4" stroke="currentColor" stroke-width="1.6" />
                </svg>
              }
              @case ('book') {
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                  <path d="M12 6c-1.8-1.6-4.4-2.2-8-2v14c3.6-.2 6.2.4 8 2 1.8-1.6 4.4-2.2 8-2V4c-3.6-.2-6.2.4-8 2Z" stroke="currentColor" stroke-width="1.8" />
                  <path d="M12 6v14" stroke="currentColor" stroke-width="1.6" />
                </svg>
              }
              @case ('bolt') {
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                  <path d="M13 2 4.5 13.5h6L9.5 22 19 10h-6l1.5-8H13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                </svg>
              }
              @case ('tag') {
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                  <path d="M3 11.5V4h7.5L21 14.5 12.5 23 3 11.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                  <circle cx="8" cy="8.5" r="1.4" fill="currentColor" />
                </svg>
              }
            }
          </span>
          <span class="body">
            <span class="title">{{ card.title }}</span>
            <span class="desc">{{ card.desc }}</span>
          </span>
          <span class="enter" aria-hidden="true">Enter <i>&#8594;</i></span>
        </a>
      }
    </div>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.9rem;
    }

    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.1rem;
      }
    }

    @media (min-width: 1100px) {
      .grid {
        grid-template-columns: repeat(5, 1fr);
      }
    }

    .tile {
      --tile-accent: #38e1ff;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      min-height: 190px;
      padding: 1.1rem 1rem 1.2rem;
      border: 1px solid var(--panel-border);
      border-radius: 14px;
      background: rgba(10, 14, 22, 0.55);
      color: var(--text-0);
      text-decoration: none;
      overflow: hidden;
      transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    }

    .tile::before {
      content: '';
      position: absolute;
      inset: 0 auto 0 0;
      width: 2px;
      background: var(--tile-accent);
      opacity: 0.55;
      transition: opacity 0.25s ease;
    }

    .tile:hover,
    .tile:focus-visible {
      transform: translateY(-4px);
      border-color: color-mix(in srgb, var(--tile-accent) 45%, transparent);
      box-shadow: 0 16px 34px -18px color-mix(in srgb, var(--tile-accent) 45%, transparent);
    }

    .tile:hover::before {
      opacity: 1;
    }

    .icon {
      color: var(--tile-accent);
      filter: drop-shadow(0 0 8px color-mix(in srgb, var(--tile-accent) 55%, transparent));
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      flex: 1;
    }

    .title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.98rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .desc {
      color: var(--text-1);
      font-size: 0.82rem;
      line-height: 1.5;
    }

    .enter {
      margin-top: auto;
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.7rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--tile-accent);
      opacity: 0.75;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .enter i {
      font-style: normal;
      display: inline-block;
      transition: transform 0.2s ease;
    }

    .tile:hover .enter {
      opacity: 1;
    }

    .tile:hover .enter i {
      transform: translateX(4px);
    }
  `,
})
export class ExploreGridComponent {
  protected readonly cards: readonly ExploreCard[] = [
    {
      id: 'characters',
      title: 'Characters',
      desc: '560+ hero & villain files, searchable.',
      link: '/characters',
      accent: '#38e1ff',
      icon: 'mask',
    },
    {
      id: 'movies',
      title: 'Movies & TV',
      desc: 'The cinematic multiverse, one shelf.',
      link: '/movies',
      accent: '#ff3d4e',
      icon: 'film',
    },
    {
      id: 'lore',
      title: 'Comics & Lore',
      desc: 'Story arcs, cosmic entities, timelines.',
      link: '/lore',
      accent: '#2f7cff',
      icon: 'book',
    },
    {
      id: 'battle',
      title: 'Battle Arena',
      desc: 'Pit any two characters. Run the numbers.',
      link: '/battle-arena',
      accent: '#a855f7',
      icon: 'bolt',
    },
    {
      id: 'shop',
      title: 'Fan Shop',
      desc: 'Figures, comics, posters & merch.',
      link: '/products',
      accent: '#ff7a29',
      icon: 'tag',
    },
  ];
}
