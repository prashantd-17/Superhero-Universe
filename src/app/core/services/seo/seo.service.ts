import { Injectable, inject } from '@angular/core';
import { APP_BASE_HREF, DOCUMENT } from '@angular/common';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { APP_CONFIG } from '../../config/app-config';
import { SeoConfig } from '../../models/seo';
import { siteUrl } from '../../models/site';
import { SITE_CONTEXT } from './site-context';

const JSON_LD_ID = 'app-jsonld';

/** Absolute canonical URLs and one up-to-date set of metadata on SSR and navigation. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly baseHref = inject(APP_BASE_HREF);
  private readonly config = inject(APP_CONFIG);
  private readonly doc = inject(DOCUMENT);
  private readonly site = inject(SITE_CONTEXT);

  absoluteUrl(path: string): string {
    return siteUrl(this.site.origin, path, this.baseHref);
  }

  apply(seo: SeoConfig): void {
    const brand = this.config.brand.name;
    const fullTitle = seo.title.includes(brand) ? seo.title : `${seo.title} · ${brand}`;
    const url = this.absoluteUrl(seo.path);
    const customImage = !!seo.image;
    const image = seo.image?.startsWith('https://')
      ? seo.image
      : this.absoluteUrl(seo.image || '/og-image.png');
    this.title.setTitle(fullTitle);

    const tags: MetaDefinition[] = [
      { name: 'description', content: seo.description },
      {
        name: 'robots',
        content:
          this.site.noindex || seo.noindex
            ? 'noindex, follow'
            : 'index, follow, max-image-preview:large',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: seo.description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: seo.imageAlt ?? seo.title },
      { property: 'og:site_name', content: brand },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: seo.description },
      { property: 'og:type', content: seo.type ?? 'website' },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: image },
      { property: 'og:image:alt', content: seo.imageAlt ?? seo.title },
    ];
    if (this.site.googleSiteVerification) {
      tags.push({ name: 'google-site-verification', content: this.site.googleSiteVerification });
    }
    if (!customImage)
      tags.push(
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
      );
    else {
      this.meta.removeTag('property="og:image:width"');
      this.meta.removeTag('property="og:image:height"');
    }
    for (const tag of tags) {
      const selector = tag.name ? `name="${tag.name}"` : `property="${tag.property}"`;
      // updateTag avoids the old force-created duplicate tags; remove any SSR leftovers too.
      this.meta
        .getTags(selector)
        .slice(1)
        .forEach((element) => this.meta.removeTagElement(element));
      this.meta.updateTag(tag, selector);
    }

    const canonicals = this.doc.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]');
    const canonical = canonicals[0] ?? this.doc.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    if (!canonicals.length) this.doc.head.appendChild(canonical);
    Array.from(canonicals)
      .slice(1)
      .forEach((node) => node.remove());
    this.applyJsonLd(seo, url, fullTitle);
  }

  private applyJsonLd(seo: SeoConfig, url: string, fullTitle: string): void {
    this.doc.head.querySelectorAll(`script[id="${JSON_LD_ID}"]`).forEach((node) => node.remove());
    const home = this.absoluteUrl('/');
    const brand = this.config.brand;
    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': `${home}#organization`,
        name: brand.name,
        url: home,
        logo: this.absoluteUrl('/favicon.svg'),
        sameAs: [brand.instagramUrl],
      },
      {
        '@type': 'WebSite',
        '@id': `${home}#website`,
        name: brand.name,
        alternateName: [
          brand.shortName,
          brand.instagramHandle,
          brand.instagramHandle.replace(/^@/, ''),
        ],
        url: home,
        inLanguage: 'en',
        publisher: { '@id': `${home}#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: fullTitle,
        description: seo.description,
        isPartOf: { '@id': `${home}#website` },
      },
      ...(seo.jsonLd ?? [])
        .filter((block) => block['@type'] !== 'WebSite')
        .map((block) => ({
          ...block,
          ...(!block['url'] ? { url } : {}),
        })),
    ];
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = JSON_LD_ID;
    // Escape HTML-significant characters so even an unusual title cannot close an SSR script.
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026')
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');
    this.doc.head.appendChild(script);
  }
}
