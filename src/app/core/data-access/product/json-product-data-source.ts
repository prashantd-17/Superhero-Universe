import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/product';
import { CURATED_PRODUCTS } from './data/product-data';
import { ProductDataSource } from './product-data-source';

/**
 * V1 product source: manually curated affiliate products.
 *
 * Edit `product-data.ts` to add/remove products or swap placeholder merchant
 * search URLs for your own tagged affiliate links.
 */
@Injectable()
export class JsonProductDataSource extends ProductDataSource {
  override readonly label = 'Curated shop';

  loadAll(): Observable<Product[]> {
    return of([...CURATED_PRODUCTS]);
  }
}
