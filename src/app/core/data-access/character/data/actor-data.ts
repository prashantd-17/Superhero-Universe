import { LiveActionProfile, UniverseId } from '../../../models/superhero';

/**
 * Curated live-action actor archive (V1: hand-maintained JSON in repo).
 *
 * Every entry is real, well-documented filmography data — actor, role,
 * franchise and the actual film/series run. These are appended to the
 * character list by ActorAugmentedCharacterDataSource so searching
 * "Robert Downey" or "Iron Man" surfaces the live-action entry next to the
 * comic version. Portraits reuse the character's existing archive image
 * (licensed actor photos are a future data-source concern).
 *
 * `role` must match a character name in the Akabab dataset — the data
 * source resolves the portrait from it.
 */
export interface ActorSeed {
  /** URL slug — stable, human readable, unique. */
  slug: string;
  /** Display name in the list: "Actor · Character". */
  name: string;
  actor: string;
  /** Character name as it appears in the character archive. */
  role: string;
  universe: UniverseId;
  /** Studio label shown as publisher, e.g. "Marvel Studios". */
  studio: string;
  franchise: string;
  /** First live appearance, e.g. "Iron Man (2008)". */
  firstFilm: string;
  /** Live-action profile for the detail page. */
  liveAction: LiveActionProfile;
}

export const ACTOR_SEEDS: readonly ActorSeed[] = [
  // ── MCU ────────────────────────────────────────────────────────────────
  {
    slug: 'live-robert-downey-jr-iron-man',
    name: 'Robert Downey Jr. · Iron Man',
    actor: 'Robert Downey Jr.',
    role: 'Iron Man',
    universe: 'marvel',
    studio: 'Marvel Studios',
    franchise: 'MCU',
    firstFilm: 'Iron Man (2008)',
    liveAction: {
      actor: 'Robert Downey Jr.',
      role: 'Iron Man',
      franchise: 'MCU — Marvel Studios',
      appearances: 'Iron Man (2008) → Avengers: Endgame (2019)',
    },
  },
  {
    slug: 'live-chris-evans-captain-america',
    name: 'Chris Evans · Captain America',
    actor: 'Chris Evans',
    role: 'Captain America',
    universe: 'marvel',
    studio: 'Marvel Studios',
    franchise: 'MCU',
    firstFilm: 'Captain America: The First Avenger (2011)',
    liveAction: {
      actor: 'Chris Evans',
      role: 'Captain America',
      franchise: 'MCU — Marvel Studios',
      appearances: 'Captain America: The First Avenger (2011) → Avengers: Endgame (2019)',
    },
  },
  {
    slug: 'live-chris-hemsworth-thor',
    name: 'Chris Hemsworth · Thor',
    actor: 'Chris Hemsworth',
    role: 'Thor',
    universe: 'marvel',
    studio: 'Marvel Studios',
    franchise: 'MCU',
    firstFilm: 'Thor (2011)',
    liveAction: {
      actor: 'Chris Hemsworth',
      role: 'Thor',
      franchise: 'MCU — Marvel Studios',
      appearances: 'Thor (2011) → Thor: Love and Thunder (2022)',
    },
  },
  {
    slug: 'live-scarlett-johansson-black-widow',
    name: 'Scarlett Johansson · Black Widow',
    actor: 'Scarlett Johansson',
    role: 'Black Widow',
    universe: 'marvel',
    studio: 'Marvel Studios',
    franchise: 'MCU',
    firstFilm: 'The Avengers (2012)',
    liveAction: {
      actor: 'Scarlett Johansson',
      role: 'Black Widow',
      franchise: 'MCU — Marvel Studios',
      appearances: 'The Avengers (2012) → Black Widow (2021)',
    },
  },
  {
    slug: 'live-mark-ruffalo-hulk',
    name: 'Mark Ruffalo · Hulk',
    actor: 'Mark Ruffalo',
    role: 'Hulk',
    universe: 'marvel',
    studio: 'Marvel Studios',
    franchise: 'MCU',
    firstFilm: 'The Avengers (2012)',
    liveAction: {
      actor: 'Mark Ruffalo',
      role: 'Hulk',
      franchise: 'MCU — Marvel Studios',
      appearances: 'The Avengers (2012) → Avengers: Endgame (2019)',
    },
  },
  {
    slug: 'live-tom-hiddleston-loki',
    name: 'Tom Hiddleston · Loki',
    actor: 'Tom Hiddleston',
    role: 'Loki',
    universe: 'marvel',
    studio: 'Marvel Studios',
    franchise: 'MCU',
    firstFilm: 'Thor (2011)',
    liveAction: {
      actor: 'Tom Hiddleston',
      role: 'Loki',
      franchise: 'MCU — Marvel Studios',
      appearances: 'Thor (2011) → Loki (2021–2023)',
    },
  },
  {
    slug: 'live-chadwick-boseman-black-panther',
    name: 'Chadwick Boseman · Black Panther',
    actor: 'Chadwick Boseman',
    role: 'Black Panther',
    universe: 'marvel',
    studio: 'Marvel Studios',
    franchise: 'MCU',
    firstFilm: 'Black Panther (2018)',
    liveAction: {
      actor: 'Chadwick Boseman',
      role: 'Black Panther',
      franchise: 'MCU — Marvel Studios',
      appearances: 'Civil War (2016) → Black Panther: Wakanda Forever (2022)',
    },
  },
  {
    slug: 'live-anthony-mackie-falcon',
    name: 'Anthony Mackie · Falcon / Winter Soldier',
    actor: 'Anthony Mackie',
    role: 'Falcon',
    universe: 'marvel',
    studio: 'Marvel Studios',
    franchise: 'MCU',
    firstFilm: 'Captain America: The Winter Soldier (2014)',
    liveAction: {
      actor: 'Anthony Mackie',
      role: 'Falcon / Winter Soldier',
      franchise: 'MCU — Marvel Studios',
      appearances: 'Captain America: The Winter Soldier (2014) → Captain America: Brave New World (2025)',
    },
  },
  {
    slug: 'live-tom-holland-spider-man',
    name: 'Tom Holland · Spider-Man',
    actor: 'Tom Holland',
    role: 'Spider-Man',
    universe: 'marvel',
    studio: 'Marvel Studios',
    franchise: 'MCU',
    firstFilm: 'Captain America: Civil War (2016)',
    liveAction: {
      actor: 'Tom Holland',
      role: 'Spider-Man',
      franchise: 'MCU — Marvel Studios',
      appearances: 'Captain America: Civil War (2016) → Spider-Man: No Way Home (2021)',
    },
  },
  {
    slug: 'live-brie-larson-captain-marvel',
    name: 'Brie Larson · Captain Marvel',
    actor: 'Brie Larson',
    role: 'Captain Marvel',
    universe: 'marvel',
    studio: 'Marvel Studios',
    franchise: 'MCU',
    firstFilm: 'Captain Marvel (2019)',
    liveAction: {
      actor: 'Brie Larson',
      role: 'Captain Marvel',
      franchise: 'MCU — Marvel Studios',
      appearances: 'Captain Marvel (2019) → The Marvels (2023)',
    },
  },
  // ── DCEU ───────────────────────────────────────────────────────────────
  {
    slug: 'live-ben-affleck-batman',
    name: 'Ben Affleck · Batman',
    actor: 'Ben Affleck',
    role: 'Batman',
    universe: 'dc',
    studio: 'DC Entertainment',
    franchise: 'DCEU',
    firstFilm: 'Batman v Superman: Dawn of Justice (2016)',
    liveAction: {
      actor: 'Ben Affleck',
      role: 'Batman',
      franchise: 'DCEU — DC Entertainment',
      appearances: 'Batman v Superman (2016) → Justice League (2017)',
    },
  },
  {
    slug: 'live-henry-cavill-superman',
    name: 'Henry Cavill · Superman',
    actor: 'Henry Cavill',
    role: 'Superman',
    universe: 'dc',
    studio: 'DC Entertainment',
    franchise: 'DCEU',
    firstFilm: 'Man of Steel (2013)',
    liveAction: {
      actor: 'Henry Cavill',
      role: 'Superman',
      franchise: 'DCEU — DC Entertainment',
      appearances: 'Man of Steel (2013) → The Peacemaker (2022)',
    },
  },
  {
    slug: 'live-gal-gadot-wonder-woman',
    name: 'Gal Gadot · Wonder Woman',
    actor: 'Gal Gadot',
    role: 'Wonder Woman',
    universe: 'dc',
    studio: 'DC Entertainment',
    franchise: 'DCEU',
    firstFilm: 'Batman v Superman: Dawn of Justice (2016)',
    liveAction: {
      actor: 'Gal Gadot',
      role: 'Wonder Woman',
      franchise: 'DCEU — DC Entertainment',
      appearances: 'Batman v Superman (2016) → Wonder Woman 1984 (2020)',
    },
  },
  {
    slug: 'live-ezra-miller-flash',
    name: 'Ezra Miller · The Flash',
    actor: 'Ezra Miller',
    role: 'Flash',
    universe: 'dc',
    studio: 'DC Entertainment',
    franchise: 'DCEU',
    firstFilm: 'Batman v Superman: Dawn of Justice (2016)',
    liveAction: {
      actor: 'Ezra Miller',
      role: 'The Flash',
      franchise: 'DCEU — DC Entertainment',
      appearances: 'Batman v Superman (2016) → The Flash (2023)',
    },
  },
];
