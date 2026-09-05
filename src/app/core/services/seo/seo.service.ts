import { Injectable, inject } from '@angular/core';
import { APP_BASE_HREF, DOCUMENT } from '@angular/common';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { APP_CONFIG } from '../../config/app-config';
import { SeoConfig } from '../../models/seo';

const JSON_LD_ID = 'app-jsonld';

/**
 * Central SEO service: title, description, Open Graph / Twitter cards,
 * canonical URLs and JSON-LD structured data.
 *
 * Works with hydration: the server renders each page with the same tags the
 * client would set, so crawlers see complete metadata on every route.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly baseHref = inject(APP_BASE_HREF);
  private readonly config = inject(APP_CONFIG);
  // Injected DOCUMENT (not the global `document`): resolves to the real DOM
  // on the client and to the domino document under SSR/prerender, where no
  // browser globals exist.
  private readonly doc = inject(DOCUMENT);

  apply(seo: SeoConfig): void {
    const brand = this.config.brand.name;
    const fullTitle = seo.title.includes(brand) ? seo.title : `${seo.title} · ${brand}`;
    const url = this.buildUrl(seo.path);

    this.title.setTitle(fullTitle);

    const tags: MetaDefinition[] = [
      { name: 'description', content: seo.description },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: seo.description },
      { property: 'og:site_name', content: brand },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: seo.description },
      { property: 'og:type', content: seo.type ?? 'website' },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: 'en_US' },
    ];
    this.meta.addTags(tags, true);

    // Canonical is a <link>, not a <meta>: MetaService manages meta tags and
    // getTag() builds a selector from its argument, so we address the link
    // element directly (works on client and SSR/domino alike).
    const canonical = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    } else {
      const link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.doc.head.appendChild(link);
    }

    this.applyJsonLd(seo.jsonLd ?? []);
  }

  private buildUrl(path: string): string {
    const base = this.baseHref.endsWith('/') ? this.baseHref : `${this.baseHref}/`;
    const clean = path.startsWith('/') ? path : `/${path}`;
    return `${base}${clean.replace(/^\/+/, '')}`;
  }

  private applyJsonLd(blocks: readonly Record<string, unknown>[]): void {
    this.removeJsonLd();
    for (const block of blocks) {
      const script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.id = JSON_LD_ID;
      script.text = JSON.stringify(block);
      this.doc.head.appendChild(script);
    }
  }

  private removeJsonLd(): void {
    this.doc
      .head.querySelectorAll(`script[id="${JSON_LD_ID}"]`)
      .forEach((node) => node.remove());
  }
}
