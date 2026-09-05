import {
  afterEveryRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { InitialsPipe } from '../../pipes/initials.pipe';

export type ImageTone = 'accent' | 'marvel' | 'dc' | 'cosmic' | 'neutral';

/** Layout-safe image with a distinct fallback URL, cached-image recovery and input resets. */
@Component({
  selector: 'app-smart-image',
  imports: [InitialsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'tone-' + tone",
  },
  template: `
    @if (currentSrc && !failed) {
      @if (!loaded) {
        <div class="shimmer" aria-hidden="true"></div>
      }
      @for (source of [{ url: currentSrc }]; track source.url) {
        <img
          #image
          class="img"
          [class.loaded]="loaded"
          [src]="source.url"
          [alt]="alt"
          [attr.loading]="loading"
          [style.object-fit]="fit"
          [style.object-position]="fit === 'contain' ? 'center' : 'top center'"
          decoding="async"
          referrerpolicy="no-referrer"
          draggable="false"
          (load)="onLoad($event)"
          (error)="onError($event)"
        />
      }
    } @else {
      <div class="placeholder" role="img" [attr.aria-label]="alt + ' — image unavailable'">
        <span class="initials" aria-hidden="true">{{ alt | initials }}</span>
        @if (unavailableLabel) {
          <span class="fallback-label" aria-hidden="true">{{ unavailableLabel }}</span>
        }
      </div>
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
      background: #0b1120;
    }
    .img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      /* Never hide a successfully cached/SSR image behind a missed load event. */
      opacity: 1;
    }
    .placeholder {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      padding: 1rem;
      text-align: center;
    }
    .initials {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(2.2rem, 6vw, 3.4rem);
      letter-spacing: 0.08em;
      color: rgba(232, 236, 244, 0.25);
      user-select: none;
    }
    .fallback-label {
      color: var(--text-2);
      font-size: 0.75rem;
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
    @media (prefers-reduced-motion: reduce) {
      .shimmer {
        animation: none;
      }
    }
  `,
})
export class SmartImageComponent implements OnChanges {
  @Input() src?: string;
  @Input() fallbackSrc?: string;
  @Input() alt = '';
  @Input() tone: ImageTone = 'accent';
  @Input() loading: 'lazy' | 'eager' = 'lazy';
  @Input() fit: 'cover' | 'contain' = 'cover';
  @Input() unavailableLabel = '';
  @ViewChild('image') private image?: ElementRef<HTMLImageElement>;
  private readonly cdr = inject(ChangeDetectorRef);
  private candidates: string[] = [];
  private candidateIndex = 0;

  loaded = false;
  failed = false;

  constructor() {
    afterEveryRender(() => {
      const image = this.image?.nativeElement;
      // Load events may fire before hydration attaches listeners. A source
      // swap must not mistake the previous image's dimensions for the new one.
      if (
        !this.loaded &&
        !this.failed &&
        image?.complete &&
        (image.currentSrc === image.src || !image.currentSrc) &&
        image.getAttribute('src') === this.currentSrc
      ) {
        if (image.naturalWidth > 0) this.loaded = true;
        else this.advanceSource();
        this.cdr.markForCheck();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src'] || changes['fallbackSrc']) {
      this.candidates = [
        ...new Set([this.src, this.fallbackSrc].filter((url): url is string => !!url)),
      ];
      this.candidateIndex = 0;
      this.loaded = false;
      this.failed = false;
    }
  }

  get currentSrc(): string | undefined {
    return this.candidates[this.candidateIndex];
  }

  protected onLoad(event: Event): void {
    if ((event.target as HTMLImageElement).getAttribute('src') !== this.currentSrc) return;
    this.loaded = true;
  }

  protected onError(event: Event): void {
    if ((event.target as HTMLImageElement).getAttribute('src') !== this.currentSrc) return;
    this.advanceSource();
  }

  private advanceSource(): void {
    this.loaded = false;
    if (this.candidateIndex + 1 < this.candidates.length) {
      this.candidateIndex++;
    } else {
      this.failed = true;
    }
  }
}
