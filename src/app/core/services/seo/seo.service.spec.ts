import { DOCUMENT, APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { APP_CONFIG, defaultAppConfig } from '../../config/app-config';
import { SeoService } from './seo.service';
import { SITE_CONTEXT } from './site-context';

const origin = 'https://superhero.example.com';

describe('SeoService', () => {
  let doc: Document;
  let seo: SeoService;
  beforeEach(() => {
    doc = document.implementation.createHTMLDocument('Test');
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: doc },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: APP_CONFIG, useValue: defaultAppConfig },
        { provide: SITE_CONTEXT, useValue: { origin, noindex: false } },
      ],
    });
    seo = TestBed.inject(SeoService);
  });

  it('builds absolute same-origin URLs, including pagination and application base paths', () => {
    expect(seo.absoluteUrl('/movies')).toBe(`${origin}/movies`);
    expect(seo.absoluteUrl('/series?page=2')).toBe(`${origin}/series?page=2`);
    expect(new URL(seo.absoluteUrl('//evil.example/path')).origin).toBe(origin);
    expect(new URL(seo.absoluteUrl('https://evil.example/path')).origin).toBe(origin);
  });

  it('updates and deduplicates metadata and canonicals instead of appending stale values', () => {
    doc.head.innerHTML +=
      '<meta name="description" content="old"><meta name="description" content="duplicate"><link rel="canonical" href="/old"><link rel="canonical" href="/duplicate">';
    seo.apply({ title: 'Arrow', description: 'First description', path: '/movies/arrow' });
    seo.apply({ title: 'Loki', description: 'Current description', path: '/movies/loki' });
    expect(doc.querySelectorAll('meta[name="description"]').length).toBe(1);
    expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Current description',
    );
    expect(doc.querySelectorAll('meta[property="og:title"]').length).toBe(1);
    expect(doc.querySelector('meta[property="og:title"]')?.getAttribute('content')).toContain(
      'Loki',
    );
    expect(doc.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `${origin}/movies/loki`,
    );
  });

  it('uses real share artwork and does not retain dimensions or robots directives from another page', () => {
    seo.apply({ title: 'Home', description: 'Fan guides', path: '/' });
    expect(doc.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      `${origin}/og-image.png`,
    );
    expect(doc.querySelector('meta[property="og:image:width"]')?.getAttribute('content')).toBe(
      '1200',
    );
    seo.apply({
      title: 'Arrow',
      description: 'Cast and creator',
      path: '/movies/arrow',
      image: 'https://static.dc.com/poster.jpg',
      noindex: true,
    });
    expect(doc.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://static.dc.com/poster.jpg',
    );
    expect(doc.querySelector('meta[property="og:image:width"]')).toBeNull();
    expect(doc.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain('noindex');
    seo.apply({ title: 'Series', description: 'TV archive', path: '/series' });
    expect(doc.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'index, follow, max-image-preview:large',
    );
  });

  it('publishes the site name, username and real social identity in one safe JSON-LD graph', () => {
    const name = 'A </script><img src=x onerror=alert(1)> title';
    seo.apply({
      title: 'A show',
      description: 'A reference',
      path: '/movies/a-show',
      jsonLd: [{ '@type': 'TVSeries', name }],
    });
    const scripts = doc.querySelectorAll('#app-jsonld');
    expect(scripts.length).toBe(1);
    expect(scripts[0].textContent).not.toContain('</script>');
    const graph = JSON.parse(scripts[0].textContent!)['@graph'];
    expect(graph.find((node: Record<string, unknown>) => node['@type'] === 'TVSeries').name).toBe(
      name,
    );
    expect(
      graph.find((node: Record<string, unknown>) => node['@type'] === 'WebSite').alternateName,
    ).toContain('@thesuperhero_universe');
    expect(
      graph.find((node: Record<string, unknown>) => node['@type'] === 'Organization').sameAs,
    ).toEqual([defaultAppConfig.brand.instagramUrl]);
  });
});

describe('Preview SEO', () => {
  it('keeps temporary preview pages noindex even when a page requests normal metadata', () => {
    const doc = document.implementation.createHTMLDocument('Preview');
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: doc },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: APP_CONFIG, useValue: defaultAppConfig },
        {
          provide: SITE_CONTEXT,
          useValue: { origin: 'https://4200-preview.e2b.app', noindex: true },
        },
      ],
    });
    TestBed.inject(SeoService).apply({
      title: 'Movies',
      description: 'Film archive',
      path: '/movies',
    });
    expect(doc.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'noindex, follow',
    );
  });
});

describe('Search Console HTML-tag verification', () => {
  it('renders a supplied public value exactly once without claiming ownership is already verified', () => {
    const doc = document.implementation.createHTMLDocument('Verification');
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: doc },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: APP_CONFIG, useValue: defaultAppConfig },
        {
          provide: SITE_CONTEXT,
          useValue: {
            origin: 'https://superhero-universe.onrender.com',
            noindex: false,
            googleSiteVerification: 'public-test-value',
          },
        },
      ],
    });
    const seo = TestBed.inject(SeoService);
    seo.apply({ title: 'Home', description: 'Fan archive', path: '/' });
    seo.apply({ title: 'Series', description: 'Television archive', path: '/series' });
    expect(doc.querySelectorAll('meta[name="google-site-verification"]').length).toBe(1);
    expect(
      doc.querySelector('meta[name="google-site-verification"]')?.getAttribute('content'),
    ).toBe('public-test-value');
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://superhero-universe.onrender.com/series',
    );
  });
});
