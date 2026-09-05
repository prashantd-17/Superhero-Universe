import { Pipe, PipeTransform } from '@angular/core';

/** "Captain America" → "CA" — used by image placeholders. */
@Pipe({ name: 'initials', standalone: true })
export class InitialsPipe implements PipeTransform {
  transform(value: string | null | undefined, max = 2): string {
    const parts = (value ?? '')
      .split(/\s+/)
      .filter((p) => p.length > 0 && !/^[a-z0-9]+\.$/i.test(p));
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, max).toUpperCase();
    return parts
      .slice(0, max)
      .map((p) => p[0]?.toUpperCase() ?? '')
      .join('');
  }
}
