import { Pipe, PipeTransform } from '@angular/core';

/** 12345 → "12.3K", 1200000 → "1.2M". */
@Pipe({ name: 'compactNumber', standalone: true })
export class CompactNumberPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null || !Number.isFinite(value)) return '';
    if (value < 1000) return String(value);
    const compact = new Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
    return compact;
  }
}
