import { SuperheroFact } from '../../models/fact';

/**
 * Curated "Did you know?" facts — real, well-known facts from comics and
 * cinematic history. `characterSlug` links the fact into a character profile
 * (funnel: fact → character → shop).
 */
export const SUPERHERO_FACTS: readonly SuperheroFact[] = [
  {
    id: 'first-superhero',
    universe: 'dc',
    title: 'The first superhero',
    text: 'Superman debuted in Action Comics #1 in 1938 and kicked off the Golden Age of comics.',
    characterSlug: '644-superman',
  },
  {
    id: 'captain-america-ice',
    universe: 'marvel',
    title: 'Frozen in time',
    text: 'Captain America was preserved in ice in 1945 and awakened decades later in The Invaders #13 (1964).',
    characterSlug: '149-captain-america',
  },
  {
    id: 'wolverine-origins',
    universe: 'marvel',
    title: 'A shifting origin',
    text: 'Wolverine has had multiple major changes to his origin throughout Marvel Comics history — from amnesiac drifter to mutant in the X-Men’s past.',
    characterSlug: '717-wolverine',
  },
  {
    id: 'spider-man-first',
    universe: 'marvel',
    title: 'A first for Spidey',
    text: 'Spider-Man’s first appearance was in Amazing Fantasy #15 (1962) — not in a comic titled Spider-Man.',
    characterSlug: '620-spider-man',
  },
  {
    id: 'thanos-ego',
    universe: 'cosmic',
    title: 'Thanos’s father',
    text: 'In the comics, Thanos is the biological son of Ego, the Living Planet.',
    characterSlug: '655-thanos',
  },
  {
    id: 'batman-no-guns',
    universe: 'dc',
    title: 'The no-guns rule',
    text: 'Batman has never used a gun. His refusal to kill is one of the character’s core rules, 80+ years strong.',
    characterSlug: '69-batman',
  },
  {
    id: 'killing-joke-year',
    universe: 'dc',
    title: 'One bad day',
    text: 'The Killing Joke (1988) gave the Joker his “year of bad luck” origin — and redefined him forever.',
    characterSlug: '370-joker',
  },
  {
    id: 'lasso-of-truth',
    universe: 'dc',
    title: 'The Lasso of Truth',
    text: 'Wonder Woman’s lasso compels anyone bound by it to speak the truth — it is tied to Hestia, goddess of the hearth.',
    characterSlug: '720-wonder-woman',
  },
  {
    id: 'hulk-duality',
    universe: 'marvel',
    title: 'Hulk-Bruce vs Bruce-Hulk',
    text: 'The Hulk has had distinct eras as “Hulk-Bruce” (Hulk-dominant) and “Bruce-Hulk” (Bruce-dominant) — same gamma, very different minds.',
    characterSlug: '332-hulk',
  },
  {
    id: 'iron-man-cave',
    universe: 'marvel',
    title: 'A cave and a box of scraps',
    text: 'The first Iron Man armour was built in a cave from scrap materials while Tony Stark was held captive — exactly as the 2008 film shows.',
    characterSlug: '346-iron-man',
  },
  {
    id: 'earth-616',
    universe: 'cosmic',
    title: 'Earth-616',
    text: 'Marvel’s main continuity is known as Earth-616; DC’s prime Earth is often referenced as Earth-0.',
  },
  {
    id: 'galactus-hunger',
    universe: 'cosmic',
    title: 'Planetary appetite',
    text: 'Galactus must consume entire planets to survive — the Devourer of Worlds is as much an ecological force as a villain.',
  },
  {
    id: 'deathstroke-mercenary',
    universe: 'dc',
    title: 'Hired by both sides',
    text: 'DC’s Deathstroke has worked for heroes and villains alike — a mercenary defined by pragmatism, not ideology.',
  },
  {
    id: 'green-lantern-oath',
    universe: 'dc',
    title: 'In brightest day',
    text: 'The Green Lantern Oath — “In brightest day, in blackest night…” — is one of comics’ most famous recitations.',
  },
  {
    id: 'black-panther-costume',
    universe: 'marvel',
    title: 'The original suit',
    text: 'The first Black Panther costume was created in the 1960s comics by Everett K. Ross — in the films, Shuri handles the tech.',
    characterSlug: '106-black-panther',
  },
  {
    id: 'omega-effect',
    universe: 'dc',
    title: 'The Omega Effect',
    text: 'Darkseid’s Omega Beams can redirect almost any object, force or energy — making him one of DC’s most feared cosmic threats.',
  },
];
