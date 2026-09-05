import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';

/**
 * Abstraction over the movie/TV data provider.
 *
 * V1: curated local data. Later: TMDB (or another provider) maps into the
 * same `Movie` interface and the whole Movies feature keeps working.
 */
@Injectable()
export abstract class MovieDataSource {
  abstract readonly label: string;
  abstract loadAll(): Observable<Movie[]>;
}
