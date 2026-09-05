import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

/**
 * Abstraction over the product/affiliate data provider.
 *
 * V1: manually curated local JSON-style data (see product-data.ts).
 * Later: Admin Dashboard → backend API → database, behind this same contract.
 */
@Injectable()
export abstract class ProductDataSource {
  abstract readonly label: string;
  abstract loadAll(): Observable<Product[]>;
}
