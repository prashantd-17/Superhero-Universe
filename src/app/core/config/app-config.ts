import { InjectionToken } from '@angular/core';
import { AdConfig } from '../models/ad';

/** Which "universe" a piece of content belongs to. */
export type UniverseId = 'marvel' | 'dc' | 'other';

export interface AppConfig {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    instagramHandle: string;
    instagramUrl: string;
    /** Displayed follower/community size, e.g. "20K+". */
    followersLabel: string;
  };
  characterApi: {
    /** Primary remote character data source. */
    url: string;
    /**
     * Locally bundled snapshot of the same dataset. Used as a graceful
     * fallback when the remote API is unreachable, so the archive never
     * renders blank.
     */
    snapshotUrl: string;
  };
  ads: AdConfig;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export const defaultAppConfig: AppConfig = {
  brand: {
    name: 'The Superhero Universe',
    shortName: 'Superhero Universe',
    tagline: 'The digital home of Marvel & DC fandom.',
    instagramHandle: '@thesuperhero_universe',
    instagramUrl: 'https://www.instagram.com/thesuperhero_universe/',
    followersLabel: '20K+',
  },
  characterApi: {
    url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json',
    snapshotUrl: '/assets/data/akabab-snapshot.json',
  },
  ads: {
    enabled: false,
    network: null,
    placements: [],
  },
};
