import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductDataSource } from '../../data-access/product/product-data-source';
import { Product } from '../../models/product';
import { StateStore } from '../../state/state-store';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly store = new StateStore<readonly Product[]>();
  private readonly source = inject(ProductDataSource);

  readonly products$: Observable<readonly Product[]> = this.store.state$.pipe(
    map((s) => s.data ?? []),
  );

  readonly featured$: Observable<readonly Product[]> = this.products$.pipe(
    map((products) => products.filter((p) => p.featured).slice(0, 4)),
  );

  load(): void {
    if (this.store.status !== 'idle') return;
    this.store.load(() => this.source.loadAll());
  }

  byCharacter(characterName: string, products: readonly Product[]): Product[] {
    const needle = characterName.trim().toLowerCase();
    if (!needle) return [];
    return products.filter((p) => p.character?.toLowerCase() === needle);
  }

  /** Synchronous read of the cached list (no re-fetch). */
  productList(): readonly Product[] {
    return this.store.data ?? [];
  }
}
