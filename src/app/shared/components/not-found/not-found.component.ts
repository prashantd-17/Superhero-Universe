import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="nf container">
      <p class="kicker">Error 404</p>
      <h1 class="title">Lost in the multiverse</h1>
      <p class="sub">
        The reality you are looking for doesn’t exist in this timeline.
        Head back to the main branch of the universe.
      </p>
      <div class="actions">
        <a routerLink="/" class="btn btn-primary">Return home</a>
        <a routerLink="/characters" class="btn btn-ghost">Open the character database</a>
      </div>
    </section>
  `,
  styles: `
    .nf {
      min-height: 62vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 4rem 1.25rem;
    }

    .title {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(1.8rem, 5vw, 3rem);
      letter-spacing: 0.03em;
      margin: 0.5rem 0 1rem;
    }

    .sub {
      color: var(--text-1);
      max-width: 46ch;
      line-height: 1.65;
      margin: 0 0 1.8rem;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
      justify-content: center;
    }
  `,
})
export class NotFoundComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.seo.apply({
      title: 'Lost in the multiverse',
      description:
        'This page does not exist in this timeline. Return to The Superhero Universe.',
      path: this.route.snapshot.url.map((s) => s.path).join('/') || '404',
    });
  }
}
