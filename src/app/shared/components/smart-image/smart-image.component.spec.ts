import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmartImageComponent } from './smart-image.component';

// Intentionally invalid relative paths: tests dispatch events without depending on an external CDN.
describe('SmartImageComponent', () => {
  let fixture: ComponentFixture<SmartImageComponent>;
  const image = (): HTMLImageElement | null => fixture.nativeElement.querySelector('img');
  const set = (name: string, value: unknown): void => fixture.componentRef.setInput(name, value);

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SmartImageComponent] });
    fixture = TestBed.createComponent(SmartImageComponent);
    set('alt', 'Iron Man (2008) film poster');
  });

  it('renders a real URL without hiding it until a load event arrives', () => {
    set('src', '/test-poster-a.jpg');
    set('tone', 'marvel');
    set('fit', 'contain');
    fixture.detectChanges();
    expect(image()?.getAttribute('src')).toBe('/test-poster-a.jpg');
    expect(image()?.getAttribute('alt')).toBe('Iron Man (2008) film poster');
    expect(image()?.getAttribute('loading')).toBe('lazy');
    expect(image()?.style.objectFit).toBe('contain');
    expect(getComputedStyle(image()!).opacity).toBe('1');
    expect(fixture.nativeElement.classList.contains('tone-marvel')).toBeTrue();
    image()!.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(fixture.componentInstance.loaded).toBeTrue();
    expect(fixture.nativeElement.querySelector('.shimmer')).toBeNull();
  });

  it('tries a distinct fallback once, then shows a stable accessible placeholder', () => {
    set('src', '/test-poster-a.jpg');
    set('fallbackSrc', '/test-poster-b.jpg');
    set('unavailableLabel', 'Poster temporarily unavailable');
    fixture.detectChanges();
    image()!.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(image()?.getAttribute('src')).toBe('/test-poster-b.jpg');
    expect(fixture.componentInstance.failed).toBeFalse();
    image()!.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(image()).toBeNull();
    expect(fixture.componentInstance.failed).toBeTrue();
    expect(
      fixture.nativeElement.querySelector('[role="img"]').getAttribute('aria-label'),
    ).toContain('Iron Man');
    expect(fixture.nativeElement.textContent).toContain('Poster temporarily unavailable');
  });

  it('deduplicates identical primary and fallback URLs', () => {
    set('src', '/test-poster-a.jpg');
    set('fallbackSrc', '/test-poster-a.jpg');
    fixture.detectChanges();
    image()!.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(image()).toBeNull();
    expect(fixture.componentInstance.failed).toBeTrue();
  });

  it('recovers when a new source arrives after a failure or a successful load', () => {
    set('src', '/test-poster-a.jpg');
    fixture.detectChanges();
    image()!.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    set('src', '/test-poster-b.jpg');
    fixture.detectChanges();
    expect(image()?.getAttribute('src')).toBe('/test-poster-b.jpg');
    expect(fixture.componentInstance.failed).toBeFalse();
    image()!.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(fixture.componentInstance.loaded).toBeTrue();
    set('src', '/test-poster-c.jpg');
    fixture.detectChanges();
    expect(fixture.componentInstance.loaded).toBeFalse();
    expect(image()?.getAttribute('src')).toBe('/test-poster-c.jpg');
  });

  it('ignores late load/error events from a replaced image', () => {
    set('src', '/test-poster-a.jpg');
    fixture.detectChanges();
    const oldImage = image()!;
    set('src', '/test-poster-b.jpg');
    fixture.detectChanges();
    expect(image()).not.toBe(oldImage);
    oldImage.dispatchEvent(new Event('error'));
    oldImage.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(fixture.componentInstance.failed).toBeFalse();
    expect(fixture.componentInstance.loaded).toBeFalse();
  });

  it('recovers a cached success when hydration missed the native load event', () => {
    set('src', '/test-cached-poster.jpg');
    fixture.detectChanges();
    Object.defineProperties(image()!, {
      complete: { value: true },
      naturalWidth: { value: 260 },
      currentSrc: { value: image()!.src },
    });
    fixture.detectChanges();
    fixture.detectChanges();
    expect(fixture.componentInstance.loaded).toBeTrue();
    expect(fixture.nativeElement.querySelector('.shimmer')).toBeNull();
  });

  it('recovers a cached failure when hydration missed the native error event', () => {
    set('src', '/test-cached-bad-poster.jpg');
    set('fallbackSrc', '/test-poster-b.jpg');
    fixture.detectChanges();
    Object.defineProperties(image()!, {
      complete: { value: true },
      naturalWidth: { value: 0 },
      currentSrc: { value: image()!.src },
    });
    fixture.detectChanges();
    fixture.detectChanges();
    expect(image()?.getAttribute('src')).toBe('/test-poster-b.jpg');
  });

  it('supports eager detail posters and missing URLs without a broken img element', () => {
    fixture.detectChanges();
    expect(image()).toBeNull();
    expect(fixture.nativeElement.querySelector('.placeholder')).not.toBeNull();
    set('src', '/test-poster-a.jpg');
    set('loading', 'eager');
    fixture.detectChanges();
    expect(image()?.getAttribute('loading')).toBe('eager');
  });
});
