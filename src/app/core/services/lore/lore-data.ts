import { CosmicEntity, LoreEntry, TimelineEvent, TimelineMode } from '../../models/lore';

/**
 * Curated lore archive — real, well-documented comics history.
 * (Future: served by our own CMS/database through the same service API.)
 */
export const LORE_ENTRIES: readonly LoreEntry[] = [
  {
    id: 'crisis-on-infinite-earths',
    title: 'Crisis on Infinite Earths',
    year: 1985,
    universe: 'dc',
    category: 'event',
    summary:
      'Marv Wolfman and George Pérez collapsed the infinite Earths of the DC Multiverse, sacrificing Supergirl and Flash (Barry Allen) to reboot the company into one unified continuity.',
  },
  {
    id: 'death-of-superman',
    title: 'The Death of Superman',
    year: 1992,
    universe: 'dc',
    category: 'event',
    summary:
      'Doomsday tears through every hero on Earth until only the Man of Steel remains. Superman’s death became one of the most covered stories in comics history.',
  },
  {
    id: 'dark-knight-returns',
    title: 'The Dark Knight Returns',
    year: 1986,
    universe: 'dc',
    category: 'comic',
    summary:
      'Frank Miller and David Mazzucchelli return a 55-year-old, retired Batman to a fractured America — the story that shaped every dark, grounded Batman that followed.',
  },
  {
    id: 'the-killing-joke',
    title: 'The Killing Joke',
    year: 1988,
    universe: 'dc',
    category: 'one-shot',
    summary:
      'Alan Moore and Brian Bolland explore the Joker’s origin and pose the question that still haunts the character: is one bad day all it takes to go mad?',
  },
  {
    id: 'batman-year-one',
    title: 'Batman: Year One',
    year: 1987,
    universe: 'dc',
    category: 'comic',
    summary:
      'Frank Miller and David Mazzucchelli recount Bruce Wayne’s first year as Batman and Jim Gordon’s first year on the force, in a Gotham rotten with corruption.',
  },
  {
    id: 'secret-wars-1984',
    title: 'Secret Wars',
    year: 1984,
    universe: 'marvel',
    category: 'event',
    summary:
      'Galactus forces every hero from the Marvel Universe onto the patchwork planet Battleworld, where rivalries become alliances in a war fought for survival.',
  },
  {
    id: 'house-of-m',
    title: 'House of M',
    year: 2005,
    universe: 'marvel',
    category: 'event',
    summary:
      'Scarlet Witch’s grief rewrites reality, leaving only a handful of mutants alive on Earth — a change that reshaped every mutant story that came after.',
  },
  {
    id: 'civil-war',
    title: 'Civil War',
    year: 2006,
    universe: 'marvel',
    category: 'event',
    summary:
      'The Superhuman Registration Act splits the hero community into Captain America’s and Iron Man’s camps — Marvel’s most divisive and defining conflict.',
  },
  {
    id: 'symbiote-saga',
    title: 'The Symbiote Saga',
    year: 1984,
    universe: 'marvel',
    category: 'story-arc',
    summary:
      'Spider-Man’s black costume turns out to be an alien symbiote with a mind of its own — the birth of Venom and a template for every alien-suit story since.',
  },
  {
    id: 'infinity-gauntlet',
    title: 'The Infinity Gauntlet',
    year: 1991,
    universe: 'cosmic',
    category: 'event',
    summary:
      'Thanos, wielding all six Infinity Stones, snaps away half of all existence — the first cosmic-scale “Blip,” and the origin of the modern Infinity Stone mythology.',
  },
  {
    id: 'death-of-wolverine',
    title: 'Dark Days: The Death of Wolverine',
    year: 2014,
    universe: 'marvel',
    category: 'event',
    summary:
      'The Sentry’s grief shatters reality, and Wolverine walks his final road. An all-ages event that redefined the character for a new generation.',
  },
  {
    id: 'final-crisis',
    title: 'Final Crisis',
    year: 2008,
    universe: 'dc',
    category: 'event',
    summary:
      'Darkseid’s Anti-Life Equation threatens to turn every human mind on Earth into a puppet, while the Multiverse itself burns at the edges.',
  },
  {
    id: 'the-beginning',
    title: 'Superman: The Beginning',
    year: 2019,
    universe: 'dc',
    category: 'comic',
    summary:
      'Dan Jurgens retells Superman’s origin as a space opera, reframing the Man of Steel as a guardian of hope for an entire world.',
  },
  {
    id: 'king-in-black',
    title: 'King in Black',
    year: 2021,
    universe: 'marvel',
    category: 'event',
    summary:
      'Knull, the King in Black, descends on the universe with his symbiote army — a cosmic threat that tested every team the Marvel Universe has to offer.',
  },
];

export const COSMIC_ENTITIES: readonly CosmicEntity[] = [
  {
    name: 'Galactus',
    universe: 'marvel',
    description: 'The Devourer of Worlds — a cosmic force that consumes entire planets to stave off eternal hunger.',
  },
  {
    name: 'The Living Tribunal',
    universe: 'marvel',
    description: 'The ultimate arbiter of the Marvel Multiverse, answerable only to the One Above All.',
  },
  {
    name: 'The One Above All',
    universe: 'marvel',
    description: 'Marvel’s supreme being — the creator of the Marvel Multiverse itself.',
  },
  {
    name: 'The Presence',
    universe: 'dc',
    description: 'The unnamable source of all creation in DC cosmology — the divine power behind every reality.',
  },
  {
    name: 'The Source',
    universe: 'dc',
    description: 'The primeval energy from which the DC Multiverse first came into being.',
  },
  {
    name: 'The Anti-Monitor',
    universe: 'dc',
    description: 'Monitor’s great enemy — a being who devours entire universes for sport and survival.',
  },
];

export const TIMELINE: Record<TimelineMode, readonly TimelineEvent[]> = {
  mcu: [
    { year: 2008, title: 'Iron Man', kind: 'film', note: 'The MCU begins. Tony Stark becomes Iron Man.' },
    { year: 2010, title: 'The First Avenger', kind: 'film', note: 'Steve Rogers becomes the Super Soldier.' },
    { year: 2012, title: 'The Avengers', kind: 'film', note: 'Earth’s mightiest heroes assemble against Loki.' },
    { year: 2014, title: 'Guardians of the Galaxy', kind: 'film', note: 'The MCU’s cosmic corner opens.' },
    { year: 2016, title: 'Doctor Strange / Civil War', kind: 'film', note: 'The multiverse enters. The Avengers split.' },
    { year: 2018, title: 'Black Panther / Infinity War', kind: 'film', note: 'Wakanda rises. Thanos strikes.' },
    { year: 2019, title: 'Avengers: Endgame', kind: 'film', note: 'The Snap is undone. The Infinity Saga closes.' },
    { year: 2021, title: 'No Way Home / Loki', kind: 'film', note: 'The multiverse breaks wide open.' },
    { year: 2023, title: 'Across the Spider-Verse', kind: 'film', note: 'The Spider-Verse phenomenon continues.' },
    { year: 2024, title: 'Deadpool & Wolverine', kind: 'film', note: 'The X-Men enter the MCU.' },
    { year: 2025, title: 'The Fantastic Four: First Steps', kind: 'film', note: 'The first family of comics arrives.' },
  ],
  dcu: [
    { year: 2013, title: 'Man of Steel', kind: 'film', note: 'Superman arrives on the big screen.' },
    { year: 2016, title: 'Batman v Superman', kind: 'film', note: 'The dark age begins. Wonder Woman is born.' },
    { year: 2017, title: 'Wonder Woman / Justice League', kind: 'film', note: 'The League assembles against Steppenwolf.' },
    { year: 2018, title: 'Aquaman', kind: 'film', note: 'The underwater kingdom meets the box office.' },
    { year: 2019, title: 'Shazam', kind: 'film', note: 'A boy becomes a demigod.' },
    { year: 2021, title: 'Zack Snyder’s Justice League', kind: 'film', note: 'The Snyder Cut completes the story.' },
    { year: 2022, title: 'The Batman', kind: 'film', note: 'Gotham gets a noir reinvention.' },
    { year: 2023, title: 'The Flash', kind: 'film', note: 'The Speed Force breaks the timeline.' },
    { year: 2024, title: 'The Brave and the Bold', kind: 'film', note: 'Nightwing enters the DCEU.' },
    { year: 2025, title: 'Supergirl', kind: 'film', note: 'The new DC Universe begins.' },
  ],
};
