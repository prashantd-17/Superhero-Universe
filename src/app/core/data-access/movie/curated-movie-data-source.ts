import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../../models/movie';
import { CURATED_MOVIES } from './data/movie-data';
import { MovieDataSource } from './movie-data-source';

/**
 * Manually curated movie/TV archive (real releases, real credits — editorial
 * content, not scraped data). A TMDB-backed implementation can replace this
 * without any UI changes.
 */
@Injectable()
export class CuratedMovieDataSource extends MovieDataSource {
  override readonly label = 'Curated archive';

  loadAll(): Observable<Movie[]> {
    return of([...CURATED_MOVIES]);
  }
}
