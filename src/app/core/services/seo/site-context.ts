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

/** Request-scoped on SSR, then transferred unchanged to the hydrating browser. */
export const SITE_CONTEXT = new InjectionToken<SiteContext>('SITE_CONTEXT', {
  providedIn: 'root',
  factory: () => {
    const state = inject(TransferState);
    if (state.hasKey(SITE_STATE))
      return state.get(SITE_STATE, { origin: DEFAULT_SITE_ORIGIN, noindex: true });
    const document = inject(DOCUMENT);
    const request = inject(REQUEST, { optional: true });
    const context = inject(REQUEST_CONTEXT, { optional: true }) as { site?: SiteContext } | null;
    const requestOrigin = httpOrigin(request?.url) ?? httpOrigin(document.location?.href);
    const origin = httpOrigin(context?.site?.origin) ?? DEFAULT_SITE_ORIGIN;
    const verification = context?.site?.googleSiteVerification;
    const site: SiteContext = {
      origin,
      noindex: context?.site?.noindex ?? (!requestOrigin || isPreviewOrigin(requestOrigin)),
      ...(verification ? { googleSiteVerification: verification } : {}),
    };
    if (!isPlatformBrowser(inject(PLATFORM_ID))) state.set(SITE_STATE, site);
    return site;
  },
});
