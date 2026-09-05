import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * API failure state — never a blank page. Offers retry and, when stale data
 * is still available (see StateStore), the page keeps rendering it around
 * this banner.
 */
@Component({
  selector: 'app-error-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="error" role="alert">
      <div class="icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none" width="44" height="44">
          <path d="M24 6 44 40H4L24 6Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" />
          <path d="M24 18v10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
          <circle cx="24" cy="33" r="1.6" fill="currentColor" />
        </svg>
      </div>
      <h3 class="title">{{ title }}</h3>
      @if (message) {
        <p class="message">{{ message }}</p>
      }
      @if (retryLabel) {
        <button type="button" class="btn btn-primary" (click)="retry.emit()">{{ retryLabel }}</button>
      }
    </div>
  `,
  styles: `
    .error {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.75rem;
      padding: 3.5rem 1.5rem;
      border: 1px solid rgba(255, 122, 41, 0.35);
      border-radius: 16px;
      background: rgba(255, 122, 41, 0.05);
    }

    .icon {
      color: rgba(255, 154, 92, 0.75);
    }

    .title {
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      margin: 0;
    }

    .message {
      color: var(--text-1);
      margin: 0;
      max-width: 460px;
      line-height: 1.6;
    }

    .btn {
      margin-top: 0.5rem;
    }
  `,
})
export class ErrorStateComponent {
  @Input() title = 'Unable to load the universe right now.';
  @Input() message = 'The data link was interrupted. Your connection or the external service may be unreachable.';
  @Input() retryLabel = 'Try again';

  @Output() readonly retry = new EventEmitter<void>();
}
