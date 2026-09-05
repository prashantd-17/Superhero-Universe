import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';
import { APP_CONFIG, defaultAppConfig } from '../../core/config/app-config';
import { CURATED_MOVIES } from '../../core/data-access/movie/data/movie-data';
import { MovieService } from '../../core/services/movie/movie-service';
import { SeoService } from '../../core/services/seo/seo.service';
import { MoviesPageComponent } from './movies-page.component';
import { MovieDetailPageComponent } from './movie-detail-page.component';

describe('Movie pages', () => {
  let seo: jasmine.SpyObj<SeoService>;
  beforeEach(() => {
    seo = jasmine.createSpyObj<SeoService>('SeoService', ['apply']);
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'movies', component: MoviesPageComponent },
          { path: 'movies/:slug', component: MovieDetailPageComponent },
        ]),
        { provide: APP_CONFIG, useValue: defaultAppConfig },
        { provide: SeoService, useValue: seo },
        {
          provide: MovieService,
          useValue: {
            movies$: of(CURATED_MOVIES),
            loading$: of(false),
            error$: of(null),
            posterStatus: signal('live'),
            postersCheckedAt: signal('2026-09-05T00:00:00Z'),
            load: jasmine.createSpy('load'),
            refreshPosters: jasmine.createSpy('refreshPosters'),
            retry: jasmine.createSpy('retry'),
          },
        },
      ],
    });
  });

  it('renders real artwork and accurate credits on a deep link', async () => {
    const harness = await RouterTestingHarness.create('/movies/shazam');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe('Shazam!');
    expect(harness.routeNativeElement?.querySelector('.cast')?.textContent).toContain(
      'Asher Angel',
    );
    expect(harness.routeNativeElement?.querySelector('.poster img')?.getAttribute('src')).toContain(
      'Shazam',
    );
    expect(harness.routeNativeElement?.querySelector('.poster img')?.getAttribute('loading')).toBe(
      'eager',
    );
    const schema = seo.apply.calls.mostRecent().args[0].jsonLd?.[0];
    expect(schema?.['@type']).toBe('Movie');
    expect(schema?.['image']).toContain('https://');
  });

  it('updates detail content, artwork and SEO when Angular reuses the route', async () => {
    const harness = await RouterTestingHarness.create('/movies/iron-man');
    await harness.navigateByUrl('/movies/the-batman', MovieDetailPageComponent);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe('The Batman');
    expect(harness.routeNativeElement?.querySelector('.meta')?.textContent).toContain(
      'Matt Reeves',
    );
    expect(harness.routeNativeElement?.querySelector('.poster img')?.getAttribute('src')).toContain(
      'The_Batman',
    );
    expect(seo.apply.calls.mostRecent().args[0].title).toBe('The Batman (2022)');
    await harness.navigateByUrl('/movies/loki', MovieDetailPageComponent);
    expect(seo.apply.calls.mostRecent().args[0].jsonLd?.[0]['@type']).toBe('TVSeries');
    expect(harness.routeNativeElement?.textContent).toContain('Michael Waldron');
    await harness.navigateByUrl('/movies/not-a-real-movie', MovieDetailPageComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Title not found');
    expect(seo.apply.calls.mostRecent().args[0].jsonLd).toEqual([]);
  });

  it('shows all matching films, uses 24-item pages, clamps stale pages and resets after search', async () => {
    const harness = await RouterTestingHarness.create('/movies?collection=mcu');
    expect(harness.routeNativeElement?.querySelectorAll('app-movie-card').length).toBe(24);
    expect(harness.routeNativeElement?.querySelector('.count')?.textContent).toContain('38');
    await harness.navigateByUrl('/movies?collection=mcu&page=999', MoviesPageComponent);
    expect(harness.routeNativeElement?.querySelectorAll('app-movie-card').length).toBe(14);
    const input = harness.routeNativeElement?.querySelector<HTMLInputElement>('#movie-search');
    input!.value = 'iron man';
    input!.dispatchEvent(new Event('input'));
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(harness.routeNativeElement?.querySelectorAll('app-movie-card').length).toBe(3);
    expect(harness.routeNativeElement?.querySelector('.count')?.textContent).toContain(
      'Showing 1–3',
    );
  });

  it('keeps animation and series discoverable and clears an empty result', async () => {
    const harness = await RouterTestingHarness.create('/movies?kind=all&format=animation');
    expect(harness.routeNativeElement?.querySelectorAll('app-movie-card').length).toBe(2);
    await harness.navigateByUrl('/movies?q=impossible-title-xyz', MoviesPageComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Nothing on this shelf');
    const clear = harness.routeNativeElement?.querySelector<HTMLButtonElement>('.clear-btn');
    clear!.click();
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(harness.routeNativeElement?.querySelector('.count')?.textContent).toContain('161');
    expect(harness.routeNativeElement?.querySelectorAll('app-movie-card').length).toBe(24);
  });
});
