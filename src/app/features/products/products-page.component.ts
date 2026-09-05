import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProductService } from '../../core/services/product/product-service';
import { SeoService } from '../../core/services/seo/seo.service';
import { Product, ProductCategory, PRODUCT_CATEGORY_LABELS } from '../../core/models/product';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import {
  FilterChipsComponent,
  ChipOption,
} from '../../shared/components/filter-chips/filter-chips.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

type CategoryFilter = 'all' | ProductCategory;

/**
 * Affiliate shop (V1: curated local data).
 * Category filters + featured row. No payments — CTAs leave the site.
 */
@Component({
  selector: 'app-products-page',
  imports: [
    AsyncPipe,
    ProductCardComponent,
    SectionHeaderComponent,
    FilterChipsComponent,
    EmptyStateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div class="container">
        <p class="kicker">Fan shop</p>
        <h1 class="title-xl">Products &amp; collectibles</h1>
        <p class="subtitle">Hand-picked figures, comics, posters and merch for serious fans.</p>
        <p class="disclosure">
          Disclosure: some links are affiliate links — if you buy through them, the community may
          earn a small commission at no extra cost to you.
        </p>
      </div>
    </section>

    <div class="container">
      @let products = products$ | async;

      @if (products?.length) {
        @let featured = featuredList(products);
        @if (featured.length) {
          <section class="section" aria-labelledby="featured-title">
            <app-section-header
              kicker="Editor’s picks"
              title="Featured drops"
              headingId="featured-title"
            />
            <div class="grid featured-grid">
              @for (product of featured; track product.id) {
                <app-product-card [product]="product" />
              }
            </div>
          </section>
        }

        <section class="section" aria-labelledby="all-title">
          <app-section-header
            kicker="The full shelf"
            title="Browse everything"
            headingId="all-title"
          />
          <app-filter-chips
            label="Filter by category"
            class="cat-filter"
            [options]="categoryOptions"
            [value]="category"
            (select)="onCategorySelect($event)"
          />
          @let filtered = filterProducts(products);
          @if (filtered.length === 0) {
            <app-empty-state
              title="Nothing in this aisle yet"
              message="New drops are being sourced for this category. Check back soon — or follow the Instagram for announcements."
              actionLabel="Show everything"
              (action)="showAll()"
            />
          } @else {
            <div class="grid">
              @for (product of filtered; track product.id) {
                <app-product-card [product]="product" />
              }
            </div>
          }
        </section>
      } @else {
        <p class="empty-shop">
          The shop is being stocked. Follow the Instagram — drops are announced there first.
        </p>
      }
    </div>
  `,
  styles: `
    .page-head {
      padding: 3.2rem 0 1.6rem;
    }

    .title-xl {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(1.9rem, 4.5vw, 3rem);
      letter-spacing: 0.03em;
      margin: 0.4rem 0 0.5rem;
    }

    .subtitle {
      color: var(--text-1);
      margin: 0;
      max-width: 56ch;
      line-height: 1.6;
    }

    .disclosure {
      margin: 1rem 0 0;
      padding: 0.8rem 1rem;
      border: 1px dashed var(--panel-border);
      border-radius: 10px;
      color: var(--text-2);
      font-size: 0.8rem;
      line-height: 1.6;
      max-width: 70ch;
    }

    .section {
      padding-block: 2.4rem 0.5rem;
    }

    .cat-filter {
      margin: 0.2rem 0 1.4rem;
    }

    .grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 1.1rem;
    }

    @media (min-width: 560px) {
      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (min-width: 1000px) {
      .grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    .featured-grid {
      margin-bottom: 0.5rem;
    }

    .empty-shop {
      color: var(--text-1);
      border: 1px dashed var(--panel-border);
      border-radius: 12px;
      padding: 2rem 1.4rem;
      line-height: 1.6;
      margin-bottom: 3rem;
    }
  `,
})
export class ProductsPageComponent {
  private readonly productsService = inject(ProductService);
  private readonly seo = inject(SeoService);

  protected readonly products$ = this.productsService.products$;
  protected category: CategoryFilter = 'all';
  protected categoryOptions: readonly ChipOption<CategoryFilter>[] = [
    { value: 'all', label: 'All' },
  ];

  constructor() {
    this.seo.apply({
      title: 'Products & Collectibles',
      description:
        'Figures, comics, posters and superhero merch — hand-picked for the @thesuperhero_universe community.',
      path: '/products',
    });
    this.productsService.load();
    this.buildCategoryOptions();
  }

  private buildCategoryOptions(): void {
    const seen = new Set<ProductCategory>();
    for (const product of this.productsService.productList()) {
      seen.add(product.category);
    }
    const ordered: ProductCategory[] = [
      'figure',
      'action-figure',
      'collectible',
      'comic',
      'book',
      'poster',
      'clothing',
      'accessory',
      'merch',
    ];
    this.categoryOptions = [
      { value: 'all', label: 'All' },
      ...ordered
        .filter((c) => seen.has(c))
        .map((c) => ({ value: c as CategoryFilter, label: PRODUCT_CATEGORY_LABELS[c] })),
    ];
  }

  protected onCategorySelect(value: CategoryFilter): void {
    this.category = value;
  }

  protected showAll(): void {
    this.category = 'all';
  }

  protected featuredList(products: readonly Product[] | null): Product[] {
    return (products ?? []).filter((p) => p.featured).slice(0, 4);
  }

  protected filterProducts(products: readonly Product[] | null): Product[] {
    const list = products ?? [];
    if (this.category === 'all') return [...list];
    return list.filter((p) => p.category === this.category);
  }
}
