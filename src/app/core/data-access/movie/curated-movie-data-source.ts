import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../../models/movie';
import { CURATED_MOVIES } from './data/movie-data';
import { MovieDataSource } from './movie-data-source';

/** Verified, network-independent credits. MovieService refreshes artwork separately. */
@Injectable()
export class CuratedMovieDataSource extends MovieDataSource {
  override readonly label = 'Verified film archive';

  loadAll(): Observable<Movie[]> {
    return of([...CURATED_MOVIES]);
  }
}
