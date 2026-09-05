import { UniverseId } from '../config/app-config';

export type ProductCategory =
  | 'figure'
  | 'action-figure'
  | 'collectible'
  | 'comic'
  | 'book'
  | 'poster'
  | 'clothing'
  | 'accessory'
  | 'merch';

/**
 * Affiliate product model (V1: manually curated JSON).
 *
 * No payment processing happens on this site — `affiliateUrl` simply sends
 * the fan to the merchant. Replace the placeholder search URLs with your
 * own tagged affiliate links when you have them.
 */
export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  /** Optional product photo URL; empty string = designed fallback artwork. */
  image: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  universe?: UniverseId;
  /** Display name of the related character (powers the character→shop link). */
  character?: string;
  merchant: string;
  affiliateUrl: string;
  featured: boolean;
}

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  figure: 'Figures',
  'action-figure': 'Action Figures',
  collectible: 'Collectibles',
  comic: 'Comics',
  book: 'Books',
  poster: 'Posters',
  clothing: 'Clothing',
  accessory: 'Accessories',
  merch: 'Merch',
};
