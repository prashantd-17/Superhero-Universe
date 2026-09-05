import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/** Friendly empty-result state (e.g. no characters match the search). */
@Component({
  selector: 'app-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="empty" role="status">
      <div class="icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none" width="44" height="44">
          <circle cx="21" cy="21" r="12" stroke="currentColor" stroke-width="2.5" />
          <path d="m30 30 10 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
          <path d="M16 21h10M21 16v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6" />
        </svg>
      </div>
      <h3 class="title">{{ title }}</h3>
      @if (message) {
        <p class="message">{{ message }}</p>
      }
      @if (actionLabel) {
        <button type="button" class="btn btn-ghost" (click)="action.emit()">{{ actionLabel }}</button>
      }
    </div>
  `,
  styles: `
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.75rem;
      padding: 3.5rem 1.5rem;
      border: 1px dashed var(--panel-border);
      border-radius: 16px;
      background: rgba(10, 14, 22, 0.4);
    }

    .icon {
      color: rgba(56, 225, 255, 0.5);
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
      max-width: 420px;
      line-height: 1.6;
    }

    .btn {
      margin-top: 0.5rem;
    }
  `,
})
export class EmptyStateComponent {
  @Input() title = 'Nothing found';
  @Input() message = '';
  @Input() actionLabel = '';

  @Output() readonly action = new EventEmitter<void>();
}
