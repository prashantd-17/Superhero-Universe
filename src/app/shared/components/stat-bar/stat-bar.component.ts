import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  inject,
} from '@angular/core';

/**
 * Animated power-stat bar. The fill animates in when the bar scrolls into
 * view (subtle, 0.9s ease-out, staggered via `delay`). Missing values render
 * as an empty track with "—" — no fabricated numbers.
 */
@Component({
  selector: 'app-stat-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stat-bar">
      <div class="stat-row">
        <span class="stat-label">{{ label }}</span>
        <span class="stat-value">{{ value ?? '—' }}</span>
      </div>
      <div class="track" role="progressbar" [attr.aria-label]="label"
           [attr.aria-valuenow]="value ?? 0" aria-valuemin="0" [attr.aria-valuemax]="max">
        <div class="fill" [style.width.%]="inView ? pct : 0"
             [style.transition-delay.ms]="delay"></div>
      </div>
    </div>
  `,
  styles: `
    .stat-bar {
      width: 100%;
    }

    .stat-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 0.45rem;
    }

    .stat-label {
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 0.78rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--text-1);
    }

    .stat-value {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.9rem;
      color: var(--text-0);
      font-variant-numeric: tabular-nums;
    }

    .track {
      position: relative;
      height: 6px;
      border-radius: 999px;
      background: rgba(148, 163, 184, 0.14);
      overflow: hidden;
    }

    .fill {
      position: absolute;
      inset: 0 auto 0 0;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--stat-accent, #22b8d8), #7ceaff);
      box-shadow: 0 0 12px rgba(56, 225, 255, 0.35);
      transition: width 0.9s cubic-bezier(0.22, 1, 0.36, 1);
      will-change: width;
    }
  `,
})
export class StatBarComponent implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  @Input() label = '';
  @Input() value?: number;
  @Input() max = 100;
  @Input() delay = 0;
  /** CSS color used for the gradient start, e.g. the universe accent. */
  @Input() accent = '#22b8d8';

  inView = false;

  get pct(): number {
    if (this.value == null || this.value <= 0) return 0;
    return Math.min(100, Math.round((this.value / this.max) * 100));
  }

  ngAfterViewInit(): void {
    const el = this.el.nativeElement;
    if (typeof IntersectionObserver === 'undefined' || typeof window === 'undefined') {
      this.inView = true;
      return;
    }
    // If the bar is already on screen, reveal it immediately: after SSR
    // hydration (and with scroll restoration in play) the first IntersectionObserver
    // report can be unreliable, and a bar stuck at 0% looks broken.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      this.inView = true;
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.inView = true;
          this.observer?.disconnect();
          this.observer = null;
        }
      },
      { threshold: 0.1 },
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
