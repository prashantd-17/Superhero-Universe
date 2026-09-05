import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  Product,
  ProductCategory,
  PRODUCT_CATEGORY_LABELS,
} from '../../../core/models/product';
import { TrackDirective } from '../../directives/track.directive';
import { BadgeComponent, BadgeVariant } from '../badge/badge.component';
import { ImageTone, SmartImageComponent } from '../smart-image/smart-image.component';

/** Affiliate product card. CTAs leave the site — no payments here. */
@Component({
  selector: 'app-product-card',
  imports: [NgClass, TrackDirective, BadgeComponent, SmartImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product) {
      <article class="card" [ngClass]="universeClass">
        <div class="media">
          @if (product.image) {
            <app-smart-image [src]="product.image" [alt]="product.name" [tone]="tone" />
          } @else {
            <div class="art" aria-hidden="true">
              <span class="glyph">{{ glyph }}</span>
            </div>
          }
          @if (product.featured) {
            <span class="ribbon">Featured</span>
          }
        </div>
        <div class="body">
          <div class="meta">
            <app-badge variant="outline" [label]="categoryLabel" />
            @if (product.character) {
              <span class="char">&#9878; {{ product.character }}</span>
            }
          </div>
          <h3 class="name">{{ product.name }}</h3>
          <p class="desc">{{ product.description }}</p>
          <div class="price-row">
            <span class="price">{{ price }}</span>
            @if (product.originalPrice) {
              <span class="was">{{ wasPrice }}</span>
              <span class="save">Save {{ savePct }}%</span>
            }
          </div>
          @if (product.affiliateUrl) {
            <a
              class="btn btn-primary btn-block"
              [href]="product.affiliateUrl"
              target="_blank"
              rel="noopener noreferrer sponsored"
              appTrack="product_affiliate_click"
            >
              View on {{ product.merchant }}
            </a>
          } @else {
            <span class="btn btn-ghost btn-block disabled">Link coming soon</span>
          }
        </div>
      </article>
    }
  `,
  styles: `
    :host {
      display: block;
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      border: 1px solid var(--panel-border);
      border-radius: 14px;
      overflow: hidden;
      background: rgba(10, 14, 22, 0.6);
      transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        box-shadow 0.25s ease;
    }

    .card:hover {
      transform: translateY(-4px);
      border-color: var(--card-accent, rgba(56, 225, 255, 0.35));
      box-shadow: 0 16px 36px -18px var(--card-glow, rgba(56, 225, 255, 0.35));
    }

    :host(.u-marvel) .card:hover {
      --card-accent: rgba(255, 61, 78, 0.45);
      --card-glow: rgba(255, 61, 78, 0.35);
    }

    :host(.u-dc) .card:hover {
      --card-accent: rgba(47, 124, 255, 0.45);
      --card-glow: rgba(47, 124, 255, 0.35);
    }

    .media {
      position: relative;
      aspect-ratio: 4 / 3;
      overflow: hidden;
    }

    .art {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      background:
        radial-gradient(120% 100% at 50% 0%, rgba(56, 225, 255, 0.1), transparent 60%),
        linear-gradient(160deg, #0b1120, #070a12);
    }

    :host(.u-marvel) .art {
      background:
        radial-gradient(120% 100% at 50% 0%, rgba(255, 61, 78, 0.14), transparent 60%),
        linear-gradient(160deg, #170b10, #070a12);
    }

    :host(.u-dc) .art {
      background:
        radial-gradient(120% 100% at 50% 0%, rgba(47, 124, 255, 0.14), transparent 60%),
        linear-gradient(160deg, #0a1020, #070a12);
    }

    .glyph {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 4.2rem;
      letter-spacing: 0.1em;
      color: rgba(232, 236, 244, 0.1);
      user-select: none;
    }

    .ribbon {
      position: absolute;
      top: 0.7rem;
      left: 0.7rem;
      padding: 0.3em 0.8em;
      border-radius: 999px;
      background: rgba(56, 225, 255, 0.15);
      border: 1px solid rgba(56, 225, 255, 0.4);
      color: var(--accent);
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.65rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
      padding: 1rem 1rem 1.1rem;
      flex: 1;
    }

    .meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .char {
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 0.75rem;
      letter-spacing: 0.06em;
      color: var(--text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .name {
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 1.02rem;
      line-height: 1.3;
      margin: 0;
    }

    .desc {
      color: var(--text-1);
      font-size: 0.85rem;
      line-height: 1.5;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .price-row {
      display: flex;
      align-items: baseline;
      gap: 0.55rem;
      margin-top: auto;
      padding-top: 0.3rem;
    }

    .price {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.15rem;
      color: var(--text-0);
    }

    .was {
      color: var(--text-2);
      text-decoration: line-through;
      font-size: 0.85rem;
    }

    .save {
      margin-left: auto;
      color: #6ee7b7;
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 0.72rem;
      letter-spacing: 0.08em;
    }

    .btn-block {
      width: 100%;
      justify-content: center;
    }

    .disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
  `,
})
export class ProductCardComponent {
  @Input() product: Product | null = null;

  private static readonly GLYPHS: Record<ProductCategory, string> = {
    figure: 'F',
    'action-figure': 'A',
    collectible: 'C',
    comic: 'C',
    book: 'B',
    poster: 'P',
    clothing: 'S',
    accessory: 'A',
    merch: 'M',
  };

  get universeClass(): string {
    if (!this.product) return '';
    return this.product.universe ? `u-${this.product.universe}` : '';
  }

  get tone(): ImageTone {
    const u = this.product?.universe;
    return u === 'marvel' ? 'marvel' : u === 'dc' ? 'dc' : 'accent';
  }

  get glyph(): string {
    return ProductCardComponent.GLYPHS[this.product?.category ?? 'merch'];
  }

  get categoryLabel(): string {
    return PRODUCT_CATEGORY_LABELS[this.product?.category ?? 'merch'];
  }

  get price(): string {
    return this.product ? `$${this.product.price.toFixed(2)}` : '';
  }

  get wasPrice(): string {
    return this.product?.originalPrice != null
      ? `$${this.product.originalPrice.toFixed(2)}`
      : '';
  }

  get savePct(): number {
    const p = this.product;
    if (!p || p.originalPrice == null || p.originalPrice <= 0) return 0;
    return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
  }
}
