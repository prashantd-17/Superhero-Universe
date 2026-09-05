import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, timeout } from 'rxjs';
import { APP_CONFIG } from '../../config/app-config';
import { Alignment, Superhero, universeOf } from '../../models/superhero';
import { CharacterDataSource, CharacterDataset } from './character-data-source';

/* ---------------- raw API shape (Akabab Superhero API v0.3) ---------------- */

interface RawPowerStats {
  intelligence?: number;
  strength?: number;
  speed?: number;
  durability?: number;
  power?: number;
  combat?: number;
}

interface RawAppearance {
  gender?: string;
  race?: string;
  height?: string[];
  weight?: string[];
  eyeColor?: string;
  hairColor?: string;
}

interface RawBiography {
  fullName?: string;
  alterEgos?: string;
  aliases?: string[];
  placeOfBirth?: string;
  firstAppearance?: string;
  publisher?: string;
  alignment?: string;
}

interface RawWork {
  occupation?: string;
  base?: string;
}

interface RawConnections {
  groupAffiliation?: string;
  relatives?: string;
}

interface RawImages {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
}

interface RawHero {
  id?: number;
  name?: string;
  slug?: string;
  powerstats?: RawPowerStats;
  appearance?: RawAppearance;
  biography?: RawBiography;
  work?: RawWork;
  connections?: RawConnections;
  images?: RawImages;
}

/* ------------------------- mapping → internal model ------------------------ */

function clean(value: string | undefined): string | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim();
  if (!v || v === '-' || v === '—' || v === 'N/A' || v === 'n/a') return undefined;
  return v;
}

function list(value: string[] | undefined): string | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined;
  const items = value.map(clean).filter((x): x is string => x !== undefined);
  return items.length > 0 ? items.join(' / ') : undefined;
}

function parseAlignment(value: string | undefined): Alignment {
  switch ((value ?? '').trim().toLowerCase()) {
    case 'good':
      return 'good';
    case 'bad':
      return 'bad';
    case 'neutral':
      return 'neutral';
    default:
      return 'unknown';
  }
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toSuperhero(raw: RawHero): Superhero | null {
  const name = clean(raw.name);
  const slug =
    typeof raw.slug === 'string' && raw.slug.length > 0
      ? raw.slug
      : name
        ? slugify(name)
        : undefined;
  if (!name || !slug) return null;

  const bio = raw.biography;
  const stats = raw.powerstats;
  const hasStats =
    !!stats &&
    (stats.intelligence != null ||
      stats.strength != null ||
      stats.speed != null ||
      stats.durability != null ||
      stats.power != null ||
      stats.combat != null);

  const hero: Superhero = {
    id: typeof raw.id === 'number' ? raw.id : 0,
    name,
    slug,
    publisher: clean(bio?.publisher),
    universe: universeOf(clean(bio?.publisher)),
    alignment: parseAlignment(bio?.alignment),
    image: raw.images?.md ?? raw.images?.lg ?? raw.images?.sm ?? raw.images?.xs,
  };

  const biography = {
    fullName: clean(bio?.fullName),
    placeOfBirth: clean(bio?.placeOfBirth),
    firstAppearance: clean(bio?.firstAppearance),
    publisher: clean(bio?.publisher),
  };
  if (Object.values(biography).some(Boolean)) hero.biography = biography;

  const appearance = raw.appearance
    ? {
        gender: clean(raw.appearance.gender),
        race: clean(raw.appearance.race),
        height: list(raw.appearance.height),
        weight: list(raw.appearance.weight),
        eyeColor: clean(raw.appearance.eyeColor),
        hairColor: clean(raw.appearance.hairColor),
      }
    : undefined;
  if (appearance && Object.values(appearance).some(Boolean)) {
    hero.appearance = appearance;
  }

  const work = raw.work
    ? {
        occupation: clean(raw.work.occupation),
        base: clean(raw.work.base),
      }
    : undefined;
  if (work && Object.values(work).some(Boolean)) hero.work = work;

  if (hasStats) hero.powerstats = { ...stats };

  const connections = raw.connections
    ? {
        groupAffiliation: clean(raw.connections.groupAffiliation),
        relatives: clean(raw.connections.relatives),
      }
    : undefined;
  if (connections && Object.values(connections).some(Boolean)) {
    hero.connections = connections;
  }

  return hero;
}

export function parseCharacterPayload(payload: unknown): Superhero[] {
  if (!Array.isArray(payload)) return [];
  return payload
    .map((item) => (item && typeof item === 'object' ? toSuperhero(item as RawHero) : null))
    .filter((hero): hero is Superhero => hero !== null);
}

/* ------------------------------ implementation ----------------------------- */

/**
 * Character data from the Akabab Superhero API (jsDelivr CDN mirror of the
 * official GitHub Pages API — same data, more reliable delivery).
 *
 * If the remote source is unreachable for any reason, a locally bundled
 * snapshot of the identical dataset is served instead, with a label change
 * so the UI stays honest about what it is showing.
 */
@Injectable()
export class AkababCharacterDataSource extends CharacterDataSource {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  loadAll(): Observable<CharacterDataset> {
    return this.http.get<unknown>(this.config.characterApi.url).pipe(
      timeout(5000),
      map((payload): CharacterDataset => ({
        heroes: parseCharacterPayload(payload),
        label: 'Akabab Superhero API',
      })),
      catchError(() => this.snapshot()),
    );
  }

  private snapshot(): Observable<CharacterDataset> {
    return this.http.get<unknown>(this.config.characterApi.snapshotUrl).pipe(
      map((payload): CharacterDataset => ({
        heroes: parseCharacterPayload(payload),
        label: 'Akabab Superhero API (local snapshot)',
      })),
    );
  }
}
