import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID, REQUEST, REQUEST_CONTEXT, TransferState } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_SITE_ORIGIN } from '../../config/site-config';
import { SITE_CONTEXT } from './site-context';

/** A preferred production canonical must not accidentally make previews indexable. */
describe('Public site context', () => {
  it('uses the confirmed Render origin even without an SSR context, while leaving previews noindex', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: document.implementation.createHTMLDocument('Preview') },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: REQUEST, useValue: new Request('https://4200-preview.e2b.app/series') },
        { provide: REQUEST_CONTEXT, useValue: null },
      ],
    });
    expect(TestBed.inject(SITE_CONTEXT)).toEqual({ origin: DEFAULT_SITE_ORIGIN, noindex: true });
  });

  it('transfers the preferred origin and public verification tag unchanged through hydration', () => {
    const site = {
      origin: 'https://custom.example.com',
      noindex: false,
      googleSiteVerification: 'public-test-value',
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: document.implementation.createHTMLDocument('SSR') },
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: REQUEST, useValue: new Request('http://localhost:4000/') },
        { provide: REQUEST_CONTEXT, useValue: { site } },
      ],
    });
    const state = TestBed.inject(TransferState);
    expect(TestBed.inject(SITE_CONTEXT)).toEqual(site);
    expect(state.toJson()).toContain('public-test-value');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: document.implementation.createHTMLDocument('Browser') },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: TransferState, useValue: state },
        { provide: REQUEST, useValue: null },
        { provide: REQUEST_CONTEXT, useValue: null },
      ],
    });
    expect(TestBed.inject(SITE_CONTEXT)).toEqual(site);
  });
});
