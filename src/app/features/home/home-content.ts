/**
 * Curated "Latest superhero content" tiles for the homepage.
 * These are editorial entries linking into real sections of the site.
 */
export interface HomeContentTile {
  id: string;
  title: string;
  tag: string;
  accent: 'marvel' | 'dc' | 'cosmic' | 'accent';
  blurb: string;
  link: string;
}

export const HOME_CONTENT: readonly HomeContentTile[] = [
  {
    id: 'crisis-explained',
    title: 'Crisis on Infinite Earths, explained',
    tag: 'Story arc',
    accent: 'dc',
    blurb: 'How DC collapsed an infinite multiverse — and why every modern DC story lives in its shadow.',
    link: '/lore',
  },
  {
    id: 'cosmic-entities',
    title: 'The most powerful cosmic entities',
    tag: 'Cosmic',
    accent: 'cosmic',
    blurb: 'Galactus to The Presence: the beings at the top of both universes, ranked by role, not by fan wars.',
    link: '/lore',
  },
  {
    id: 'batman-facts',
    title: '10 things you never knew about Batman',
    tag: 'Character file',
    accent: 'dc',
    blurb: 'From the no-guns rule to the Year One origins — the dark knight’s file, decoded.',
    link: '/characters/69-batman',
  },
  {
    id: 'spider-man-suits',
    title: 'The evolution of Spider-Man’s suits',
    tag: 'Character file',
    accent: 'marvel',
    blurb: 'From the first red-and-blue to the black symbiote — Spidey’s wardrobe is a history of the character.',
    link: '/characters/620-spider-man',
  },
  {
    id: 'mcu-timeline',
    title: 'MCU timeline: 2008 → 2026',
    tag: 'Timeline',
    accent: 'marvel',
    blurb: 'Every milestone film in the multiverse of cinema, in order. Start with Iron Man, end with the Fantastic Four.',
    link: '/lore',
  },
  {
    id: 'batman-vs-captain-america',
    title: 'Who wins: Batman vs Captain America?',
    tag: 'Battle',
    accent: 'accent',
    blurb: 'Tactics and intellect vs heart and leadership. Run the numbers in the Battle Arena.',
    link: '/battle-arena',
  },
];
