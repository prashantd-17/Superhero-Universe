import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type SkeletonVariant = 'character' | 'movie' | 'product' | 'wide';

/** Shimmering placeholder grid — shown while data streams in. */
@Component({
  selector: 'app-skeleton-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid" [class.v-character]="variant === 'character'"
         [class.v-movie]="variant === 'movie'"
         [class.v-product]="variant === 'product'"
         [class.v-wide]="variant === 'wide'" aria-hidden="true">
      @for (i of indices; track i) {
        <div class="card">
          <div class="media"></div>
          @if (variant !== 'wide') {
            <div class="body">
              <div class="line w-70"></div>
              <div class="line w-45"></div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: `
    .grid {
      display: grid;
      gap: 1.1rem;
    }

    .v-character,
    .v-movie,
    .v-product {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 640px) {
      .v-character,
      .v-movie,
      .v-product {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .v-character,
      .v-movie,
      .v-product {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .v-wide {
      grid-template-columns: 1fr;
    }

    .card {
      border: 1px solid var(--panel-border);
      border-radius: 14px;
      overflow: hidden;
      background: rgba(10, 14, 22, 0.6);
    }

    .media {
      width: 100%;
      aspect-ratio: 3 / 4;
      background: linear-gradient(
        110deg,
        rgba(148, 163, 184, 0.05) 30%,
        rgba(148, 163, 184, 0.11) 50%,
        rgba(148, 163, 184, 0.05) 70%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s ease-in-out infinite;
    }

    .v-movie .media {
      aspect-ratio: 2 / 3;
    }

    .v-product .media,
    .v-wide .media {
      aspect-ratio: 1 / 1;
    }

    .body {
      padding: 0.9rem;
      display: grid;
      gap: 0.5rem;
    }

    .line {
      height: 0.85rem;
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

    .w-70 {
      width: 70%;
    }
    .w-45 {
      width: 45%;
    }

    @keyframes shimmer {
      from {
        background-position: 180% 0;
      }
      to {
        background-position: -20% 0;
      }
    }
  `,
})
export class SkeletonGridComponent {
  @Input() count = 8;
  @Input() variant: SkeletonVariant = 'character';

  get indices(): readonly number[] {
    return Array.from({ length: this.count }, (_, i) => i);
  }
}
