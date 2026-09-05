import { Injectable, inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

/**
 * Builds correct absolute asset URLs so templates work on deep routes
 * (/characters/69-batman/assets/… would break with a bare relative path).
 */
@Injectable({ providedIn: 'root' })
export class AssetService {
  private readonly baseHref = inject(APP_BASE_HREF);

  url(path: string): string {
    const base = this.baseHref.endsWith('/') ? this.baseHref : `${this.baseHref}/`;
    return `${base}${path.replace(/^\/+/, '')}`;
  }
}
