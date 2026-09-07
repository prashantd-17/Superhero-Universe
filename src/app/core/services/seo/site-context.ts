import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  InjectionToken,
  PLATFORM_ID,
  REQUEST,
  REQUEST_CONTEXT,
  TransferState,
  inject,
  makeStateKey,
} from '@angular/core';
import { DEFAULT_SITE_ORIGIN } from '../../config/site-config';
import { SiteContext, httpOrigin, isPreviewOrigin } from '../../models/site';

const SITE_STATE = makeStateKey<SiteContext>('public-site-context');

/** Safely reads a Location-like object (works even if document is a DOM shim). */
function locationHref(doc: Document | null | undefined): string | undefined {
  try {
    return doc?.defaultView?.location?.href ?? undefined;
  } catch {
    return undefined;
  }
}

/**
 * Determines the canonical site origin at runtime.
 *
 * - On browser: uses window.location (or the transferred SSR value if present).
 * - On SSR: reads from the Angular REQUEST (provided by @angular/ssr) or from an
 *   explicit REQUEST_CONTEXT (for preconfigured deployments).
 * - During route extraction / pre-render warmup where neither REQUEST nor a real
 *   document exists, falls back to the built-in production default so that
 *   SeoService always has a valid absolute URL — NG0401 ("no provider") is avoided.
 */
export const SITE_CONTEXT = new InjectionToken<SiteContext>('SITE_CONTEXT', {
  providedIn: 'root',
  factory: () => {
    const state = inject(TransferState);
    if (state.hasKey(SITE_STATE)) {
      return state.get(SITE_STATE, { origin: DEFAULT_SITE_ORIGIN, noindex: false });
    }
    const platformId = inject(PLATFORM_ID);
    const document = inject(DOCUMENT);
    const request = inject(REQUEST, { optional: true }) as { url?: string } | null;
    const context = inject(REQUEST_CONTEXT, { optional: true }) as
      | { site?: SiteContext }
      | null;

    const requestOrigin = httpOrigin(request?.url) ?? httpOrigin(locationHref(document));
    const explicitOrigin = httpOrigin(context?.site?.origin);
    const verification = context?.site?.googleSiteVerification;

    // Use the explicitly configured origin if available, otherwise fall back to
    // the built-in production URL (safe default — never a preview host).
    const origin = explicitOrigin ?? requestOrigin ?? DEFAULT_SITE_ORIGIN;
    const noindex =
      context?.site?.noindex ??
      (requestOrigin ? isPreviewOrigin(requestOrigin) : false);

    const site: SiteContext = {
      origin,
      noindex,
      ...(verification ? { googleSiteVerification: verification } : {}),
    };
    if (!isPlatformBrowser(platformId)) state.set(SITE_STATE, site);
    return site;
  },
});
