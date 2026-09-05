import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { APP_CONFIG } from '../../core/config/app-config';
import { SeoService } from '../../core/services/seo/seo.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { InstagramCtaComponent } from '../../shared/components/instagram-cta/instagram-cta.component';

interface ContentCategory {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

/**
 * Instagram hub — the site is the digital extension of the account,
 * and this page closes the loop back to the feed.
 */
@Component({
  selector: 'app-instagram-page',
  imports: [SectionHeaderComponent, InstagramCtaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div class="container">
        <p class="kicker">Home base</p>
        <h1 class="title-xl">Instagram</h1>
        <p class="subtitle">
          The universe started on {{ config.brand.instagramHandle }} — and the
          daily content still lives there. This site is the archive; Instagram
          is the pulse.
        </p>
      </div>
    </section>

    <div class="container">
      <app-instagram-cta
        sub="Daily character spotlights, movie breakdowns, comic lore, polls and exclusive drops — {{ config.brand.followersLabel }} fans and counting."
      />

      <section class="section" aria-labelledby="cats-title">
        <app-section-header
          kicker="What you get"
          title="Content categories"
          subtitle="The feed is organised around the things superfans actually want."
        />
        <div class="cats">
          @for (cat of categories; track cat.id) {
            <div class="cat">
              <span class="cat-icon" aria-hidden="true">{{ cat.icon }}</span>
              <h3 class="cat-title">{{ cat.title }}</h3>
              <p class="cat-desc">{{ cat.desc }}</p>
            </div>
          }
        </div>
      </section>

      <section class="section" aria-labelledby="loop-title">
        <app-section-header
          kicker="The loop"
          title="How the universe works"
          subtitle="Instagram and the website feed each other — that’s what keeps the archive fresh."
        />
        <div class="loop">
          <div class="step">
            <span class="step-num">01</span>
            <h3 class="step-title">Follow the feed</h3>
            <p class="step-desc">Daily posts on Instagram — spotlights, facts, polls and drops.</p>
          </div>
          <div class="step-arrow" aria-hidden="true">→</div>
          <div class="step">
            <span class="step-num">02</span>
            <h3 class="step-title">Explore the archive</h3>
            <p class="step-desc">Dive deeper here: full character files, lore guides, timelines and the battle arena.</p>
          </div>
          <div class="step-arrow" aria-hidden="true">→</div>
          <div class="step">
            <span class="step-num">03</span>
            <h3 class="step-title">Support the universe</h3>
            <p class="step-desc">Fan shop drops and community events — back the content you love.</p>
          </div>
        </div>
      </section>

      <div class="hashtags">
        @for (tag of hashtags; track tag) {
          <a
            [href]="'https://www.instagram.com/explore/tags/' + tag"
            target="_blank"
            rel="noopener noreferrer"
            class="hashtag"
          >
            #{{ tag }}
          </a>
        }
      </div>
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
      max-width: 58ch;
      line-height: 1.6;
    }

    .section {
      padding-block: 2.6rem 0.5rem;
    }

    .cats {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.9rem;
    }

    @media (min-width: 640px) {
      .cats {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1000px) {
      .cats {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .cat {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      padding: 1.2rem 1.25rem 1.3rem;
      border: 1px solid var(--panel-border);
      border-radius: 14px;
      background: rgba(10, 14, 22, 0.5);
      transition: transform 0.22s ease, border-color 0.22s ease;
    }

    .cat:hover {
      transform: translateY(-3px);
      border-color: rgba(238, 42, 123, 0.4);
    }

    .cat-icon {
      font-size: 1.5rem;
    }

    .cat-title {
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      margin: 0;
    }

    .cat-desc {
      color: var(--text-1);
      font-size: 0.88rem;
      line-height: 1.55;
      margin: 0;
    }

    .loop {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      align-items: stretch;
    }

    @media (min-width: 900px) {
      .loop {
        grid-template-columns: 1fr auto 1fr auto 1fr;
      }
    }

    .step {
      padding: 1.4rem 1.4rem 1.5rem;
      border: 1px solid var(--panel-border);
      border-radius: 14px;
      background: rgba(10, 14, 22, 0.5);
    }

    .step-num {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.9rem;
      letter-spacing: 0.2em;
      color: var(--accent);
    }

    .step-title {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 1.05rem;
      margin: 0.5rem 0 0.4rem;
    }

    .step-desc {
      color: var(--text-1);
      font-size: 0.9rem;
      line-height: 1.55;
      margin: 0;
    }

    .step-arrow {
      align-self: center;
      justify-self: center;
      font-size: 1.4rem;
      color: var(--text-2);
    }

    .hashtags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      padding: 2.6rem 0 2rem;
    }

    .hashtag {
      color: var(--text-1);
      text-decoration: none;
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 0.85rem;
      letter-spacing: 0.04em;
      padding: 0.45em 1em;
      border: 1px solid var(--panel-border);
      border-radius: 999px;
      transition: color 0.2s ease, border-color 0.2s ease;
    }

    .hashtag:hover {
      color: #ff7ab8;
      border-color: rgba(238, 42, 123, 0.5);
    }
  `,
})
export class InstagramPageComponent {
  protected readonly config = inject(APP_CONFIG);
  private readonly seo = inject(SeoService);

  protected readonly categories: readonly ContentCategory[] = [
    {
      id: 'spotlights',
      icon: '🦸',
      title: 'Character spotlights',
      desc: 'Deep dives into one character a day — origins, powers, best moments.',
    },
    {
      id: 'movies',
      icon: '🎬',
      title: 'Movie & TV breakdowns',
      desc: 'What happened on screen, explained for fans who want the full picture.',
    },
    {
      id: 'lore',
      icon: '📚',
      title: 'Comic lore',
      desc: 'Story arcs, events and multiverse history — the deep cuts included.',
    },
    {
      id: 'facts',
      icon: '⚡',
      title: 'Did you know? facts',
      desc: 'Quick, shareable facts that make you the smartest fan in the chat.',
    },
    {
      id: 'polls',
      icon: '🔮',
      title: 'Polls & debates',
      desc: 'Who would win? Which timeline? The community settles it.',
    },
    {
      id: 'drops',
      icon: '🛒',
      title: 'Shop drops',
      desc: 'New figures, comics and merch land here first — then hit the fan shop.',
    },
  ];

  protected readonly hashtags: readonly string[] = [
    'marvel',
    'dc',
    'superheroes',
    'comics',
    'marvelcinematicuniverse',
    'dccinematicuniverse',
    'superheroart',
    'comicbooks',
  ];

  constructor() {
    this.seo.apply({
      title: 'Instagram — @thesuperhero_universe',
      description:
        'Follow @thesuperhero_universe for daily superhero content — character spotlights, movie breakdowns, comic lore and facts.',
      path: '/instagram',
    });
  }
}
