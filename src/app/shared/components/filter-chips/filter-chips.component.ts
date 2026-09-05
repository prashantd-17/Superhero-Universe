import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface ChipOption<T extends string> {
  value: T;
  label: string;
}

/**
 * Generic chip filter row (used by Characters, Movies, Products).
 * Fully controlled: [value] + (select).
 */
@Component({
  selector: 'app-filter-chips',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="chips" role="group" [attr.aria-label]="label">
      @for (opt of options; track opt.value) {
        <button
          type="button"
          class="chip"
          [class.active]="opt.value === value"
          [attr.aria-pressed]="opt.value === value"
          (click)="select.emit(opt.value)"
        >
          {{ opt.label }}
        </button>
      }
    </div>
  `,
  styles: `
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .chip {
      appearance: none;
      cursor: pointer;
      border: 1px solid var(--panel-border);
      background: rgba(148, 163, 184, 0.06);
      color: var(--text-1);
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 0.8rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 0.5em 1.1em;
      border-radius: 999px;
      transition:
        color 0.2s ease,
        border-color 0.2s ease,
        background 0.2s ease,
        box-shadow 0.2s ease;
      min-height: 38px;
    }

    .chip:hover {
      color: var(--text-0);
      border-color: rgba(56, 225, 255, 0.45);
    }

    .chip.active {
      color: var(--accent);
      border-color: rgba(56, 225, 255, 0.55);
      background: rgba(56, 225, 255, 0.09);
      box-shadow: 0 0 14px rgba(56, 225, 255, 0.15);
    }

    .chip:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
  `,
})
export class FilterChipsComponent<T extends string> {
  @Input() options: readonly ChipOption<T>[] = [];
  @Input() value: T = '' as T;
  @Input() label = 'Filter';

  @Output() readonly select = new EventEmitter<T>();
}
