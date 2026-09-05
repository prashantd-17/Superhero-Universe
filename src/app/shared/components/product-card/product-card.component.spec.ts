import { TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../../core/models/product';

describe('ProductCardComponent mobile sizing', () => {
  it('wraps long names, prices and merchant buttons inside a narrow card', () => {
    TestBed.configureTestingModule({ imports: [ProductCardComponent] });
    const fixture = TestBed.createComponent(ProductCardComponent);
    const product: Product = {
      id: 1,
      slug: 'test-collectible',
      name: 'ExtraordinarilyLongCollectibleName'.repeat(4),
      description: 'A collectible used to test wrapping.',
      image: '',
      price: 199.99,
      originalPrice: 299.99,
      category: 'action-figure',
      universe: 'marvel',
      character: 'A very long character display name',
      merchant: 'AReallyLongMerchantNameForMobileTesting',
      affiliateUrl: 'https://example.com/product',
      featured: true,
    };
    fixture.componentRef.setInput('product', product);
    (fixture.nativeElement as HTMLElement).style.width = '260px';
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const button = host.querySelector<HTMLElement>('.btn-block')!;
    expect(host.scrollWidth).toBeLessThanOrEqual(host.clientWidth + 1);
    expect(button.scrollWidth).toBeLessThanOrEqual(button.clientWidth + 1);
    expect(getComputedStyle(button).whiteSpace).toBe('normal');
    expect(button.getBoundingClientRect().height).toBeGreaterThanOrEqual(44);
    expect(host.querySelector('.name')?.textContent).toBe(product.name);
  });
});
