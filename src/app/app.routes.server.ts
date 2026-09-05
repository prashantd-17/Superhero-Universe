import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Indexable pages render on demand with their actual request origin, complete
 * catalog data and canonical metadata. No build-time localhost canonicals and
 * no third-party requests during SSR. The static assets remain cacheable.
 */
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Server }];
