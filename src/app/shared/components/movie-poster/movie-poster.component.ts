import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Movie } from '../../../core/models/movie';
import { SmartImageComponent } from '../smart-image/smart-image.component';

/** Shared artwork rendering for the archive and deep-linked detail pages. */
@Component({
  selector: 'app-movie-poster',
  imports: [SmartImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-smart-image
      [src]="movie.posterUrl"
      [fallbackSrc]="movie.posterFallbackUrl"
      [alt]="
        movie.title +
        ' (' +
        movie.year +
        ') ' +
        (movie.kind === 'series'
          ? 'series artwork'
          : movie.releaseType === 'tv-movie'
            ? 'TV film artwork'
            : 'film poster')
      "
      [tone]="movie.universe === 'other' ? 'cosmic' : movie.universe"
      [loading]="eager ? 'eager' : 'lazy'"
      fit="contain"
      [unavailableLabel]="
        movie.posterUrl ? 'Artwork temporarily unavailable' : 'Artwork not available'
      "
    />
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class MoviePosterComponent {
  @Input({ required: true }) movie!: Movie;
  @Input() eager = false;
}
