import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type BadgeVariant =
  | 'marvel'
  | 'dc'
  | 'other'
  | 'cosmic'
  | 'hero'
  | 'villain'
  | 'neutral'
  | 'accent'
  | 'outline';

@Component({
  selector: 'app-badge',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="badge" [ngClass]="variant">{{ label }}</span>`,
  styles: `
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35em;
      padding: 0.28em 0.7em;
      border-radius: 999px;
      border: 1px solid transparent;
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.68rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      line-height: 1;
      white-space: nowrap;
    }

    :host ::ng-deep {
      /* keep ngClass class list next to .badge */
    }

    .badge.marvel  { color: #ff6b7a; border-color: rgba(255, 61, 78, 0.4);  background: rgba(255, 61, 78, 0.1); }
    .badge.dc      { color: #7fb3ff; border-color: rgba(47, 124, 255, 0.4); background: rgba(47, 124, 255, 0.1); }
    .badge.other   { color: var(--text-1); border-color: var(--panel-border); background: rgba(148, 163, 184, 0.08); }
    .badge.cosmic  { color: #c4a5ff; border-color: rgba(168, 85, 247, 0.4); background: rgba(168, 85, 247, 0.1); }
    .badge.hero    { color: #6ee7b7; border-color: rgba(52, 211, 153, 0.35); background: rgba(52, 211, 153, 0.08); }
    .badge.villain { color: #ffb26b; border-color: rgba(255, 122, 41, 0.4);  background: rgba(255, 122, 41, 0.09); }
    .badge.neutral { color: var(--text-1); border-color: var(--panel-border); background: rgba(148, 163, 184, 0.08); }
    .badge.accent  { color: var(--accent); border-color: rgba(56, 225, 255, 0.4); background: rgba(56, 225, 255, 0.08); }
    .badge.outline { color: var(--text-1); border-color: var(--panel-border); }
  `,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'outline';
  @Input() label: string | null | undefined = '';
}
