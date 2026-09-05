import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InitialsPipe } from '../../pipes/initials.pipe';

export type ImageTone = 'accent' | 'marvel' | 'dc' | 'cosmic' | 'neutral';

/**
 * Robust image container: lazy loading, aspect-ratio-safe layout, a designed
 * placeholder while loading, and a graceful fallback when the URL is missing
 * or fails — a broken image never destroys the card layout.
 *
 * Sizing: the parent sets aspect-ratio/height; this component fills it.
 */
@Component({
  selector: 'app-smart-image',
  imports: [InitialsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (src && !failed) {
      <img
        class="img"
        [class.loaded]="loaded"
        [src]="src!"
        [alt]="alt"
        loading="lazy"
        decoding="async"
        draggable="false"
        (load)="onLoad()"
        (error)="onError()"
      />
    } @else {
      <div class="placeholder" aria-hidden="true">
        <span class="initials">{{ alt | initials }}</span>
      </div>
    }
    @if (src && !failed && !loaded) {
      <div class="shimmer" aria-hidden="true"></div>
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background:
        radial-gradient(120% 90% at 50% 0%, rgba(56, 225, 255, 0.1), transparent 60%),
        linear-gradient(180deg, #0b1120 0%, #070a12 100%);
    }

    :host(.tone-marvel) {
      background:
        radial-gradient(120% 90% at 50% 0%, rgba(255, 61, 78, 0.16), transparent 60%),
        linear-gradient(180deg, #170b10 0%, #070a12 100%);
    }
    :host(.tone-dc) {
      background:
        radial-gradient(120% 90% at 50% 0%, rgba(47, 124, 255, 0.16), transparent 60%),
        linear-gradient(180deg, #0a1020 0%, #070a12 100%);
    }
    :host(.tone-cosmic) {
      background:
        radial-gradient(120% 90% at 50% 0%, rgba(168, 85, 247, 0.18), transparent 60%),
        linear-gradient(180deg, #120a1e 0%, #070a12 100%);
    }
    :host(.tone-neutral) {
      background: linear-gradient(180deg, #0b1120 0%, #070a12 100%);
    }

    .img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      opacity: 0;
      transition: opacity 0.45s ease;
    }

    .img.loaded {
      opacity: 1;
    }

    .placeholder {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
    }

    .initials {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(2.2rem, 6vw, 3.4rem);
      letter-spacing: 0.08em;
      color: rgba(232, 236, 244, 0.14);
      user-select: none;
    }

    .shimmer {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        110deg,
        transparent 30%,
        rgba(148, 163, 184, 0.08) 50%,
        transparent 70%
      );
      background-size: 200% 100%;
      animation: shimmer 1.4s ease-in-out infinite;
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
export class SmartImageComponent {
  @Input() src?: string;
  @Input() alt = '';
  @Input() tone: ImageTone = 'accent';

  loaded = false;
  failed = false;

  protected onLoad(): void {
    this.loaded = true;
  }

  protected onError(): void {
    this.failed = true;
  }
}
