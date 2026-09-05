import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';

/**
 * Adds `.revealed` when the element scrolls into view (once).
 * Global styles animate the fade/slide; `prefers-reduced-motion` disables
 * it. No-op in environments without IntersectionObserver.
 */
@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.el.nativeElement.classList.add('revealed');
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.el.nativeElement.classList.add('revealed');
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
