import { PLATFORM_ID } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MovieService } from './movie-service';
import { MovieDataSource } from '../../data-access/movie/movie-data-source';
import { CURATED_MOVIES } from '../../data-access/movie/data/movie-data';
import { Movie } from '../../models/movie';

const seed = CURATED_MOVIES.filter((movie) => ['iron-man', 'the-batman'].includes(movie.slug));
const freshPoster = 'https://upload.wikimedia.org/wikipedia/en/a/ab/Updated_poster.jpg';

describe('MovieService', () => {
  let service: MovieService;
  let http: HttpTestingController;
  let visible: readonly Movie[];
  let source: jasmine.SpyObj<MovieDataSource>;

  beforeEach(() => {
    source = jasmine.createSpyObj<MovieDataSource>('MovieDataSource', ['loadAll'], {
      label: 'Test archive',
    });
    source.loadAll.and.returnValue(of([...seed]));
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MovieDataSource, useValue: source },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
    service = TestBed.inject(MovieService);
    http = TestBed.inject(HttpTestingController);
    service.movies$.subscribe((movies) => {
      visible = movies;
    });
  });
  afterEach(() => http.verify());

  it('loads the full snapshot immediately and only once without a network dependency', () => {
    service.load();
    service.load();
    expect(visible).toEqual(seed);
    expect(source.loadAll).toHaveBeenCalledTimes(1);
    http.expectNone('/api/movie-posters');
    expect(service.bySlug('missing')).toBeUndefined();
  });

  it('refreshes once per session, using the same-origin API and retaining the fallback', () => {
    service.refreshPosters();
    service.refreshPosters();
    expect(visible).toEqual(seed);
    expect(service.posterStatus()).toBe('checking');
    http.expectOne('/api/movie-posters').flush({
      source: 'live',
      checkedAt: '2026-09-05T00:00:00Z',
      posters: { 'iron-man': freshPoster },
    });
    expect(service.bySlug('iron-man')?.posterUrl).toBe(freshPoster);
    expect(service.bySlug('iron-man')?.posterFallbackUrl).toBe(seed[0].posterFallbackUrl);
    expect(service.posterStatus()).toBe('live');
    expect(service.postersCheckedAt()).toBe('2026-09-05T00:00:00Z');
    expect(seed[0].posterUrl).not.toBe(freshPoster);
    service.refreshPosters();
    http.expectNone('/api/movie-posters');
  });

  it('does not replace a studio poster with an unchanged, smaller wiki image', () => {
    service.refreshPosters();
    http
      .expectOne('/api/movie-posters')
      .flush({
        source: 'live',
        checkedAt: null,
        posters: { 'iron-man': seed[0].posterFallbackUrl },
      });
    expect(service.bySlug('iron-man')?.posterUrl).toBe(seed[0].posterUrl);
  });

  it('ignores unsafe URLs and unknown titles without changing trusted credits', () => {
    service.refreshPosters();
    http.expectOne('/api/movie-posters').flush({
      source: 'partial',
      checkedAt: 'not a date',
      posters: {
        'iron-man': 'javascript:alert(1)',
        'the-batman': 'https://example.test/random.jpg',
        unknown: freshPoster,
      },
    });
    expect(visible).toEqual(seed);
    expect(service.postersCheckedAt()).toBeNull();
  });

  it('keeps the archive usable when the API fails and permits an explicit retry', () => {
    service.refreshPosters();
    http
      .expectOne('/api/movie-posters')
      .flush('Offline', { status: 503, statusText: 'Unavailable' });
    expect(visible).toEqual(seed);
    expect(service.posterStatus()).toBe('snapshot');
    service.refreshPosters(true);
    http
      .expectOne('/api/movie-posters')
      .flush({ source: 'live', checkedAt: null, posters: { 'iron-man': freshPoster } });
    expect(service.posterStatus()).toBe('live');
  });

  it('handles malformed successful responses as an unavailable refresh', () => {
    service.refreshPosters();
    http.expectOne('/api/movie-posters').flush({ posters: null });
    expect(service.posterStatus()).toBe('snapshot');
    expect(visible).toEqual(seed);
  });

  it('times out a stalled refresh without hiding the original posters', fakeAsync(() => {
    service.refreshPosters();
    const request = http.expectOne('/api/movie-posters');
    tick(10001);
    expect(request.cancelled).toBeTrue();
    expect(service.posterStatus()).toBe('snapshot');
    expect(visible).toEqual(seed);
  }));
});

describe('MovieService during SSR', () => {
  it('does not call external or same-origin APIs on the server', () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: MovieDataSource, useValue: { loadAll: () => of([...seed]) } },
      ],
    });
    const service = TestBed.inject(MovieService);
    service.load();
    service.refreshPosters();
    expect(service.bySlug('iron-man')?.title).toBe('Iron Man');
    TestBed.inject(HttpTestingController).expectNone('/api/movie-posters');
    expect(service.posterStatus()).toBe('idle');
  });
});
