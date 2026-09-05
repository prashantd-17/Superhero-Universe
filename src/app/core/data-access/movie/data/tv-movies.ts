import { films } from './catalog-helpers';

/** TV movies and the internationally released Nicholas Hammond Spider-Man films. */
export const TV_MOVIES = [
  ...films('marvel', 'marvel-tv', [
    {
      slug: 'spider-man-1977',
      title: 'Spider-Man',
      year: 1977,
      wikipediaTitle: 'Spider-Man (1977 film)',
      director: 'E. W. Swackhamer',
      cast: ['Nicholas Hammond', 'David White', 'Michael Pataki', 'Thayer David'],
      description:
        'Student Peter Parker gains spider-like powers and investigates a scheme that uses mind control to force people into criminal acts.',
      releaseType: 'tv-movie',
      releaseNote:
        'The television pilot starring Nicholas Hammond; also released theatrically outside the United States.',
    },
    {
      slug: 'spider-man-strikes-back',
      title: 'Spider-Man Strikes Back',
      year: 1978,
      wikipediaTitle: 'Spider-Man Strikes Back',
      director: 'Ron Satlof',
      cast: ['Nicholas Hammond', 'Robert Alda', 'Robert F. Simon', 'Joanna Cameron'],
      description:
        'Spider-Man pursues stolen plutonium before a criminal can turn it into a nuclear weapon.',
      releaseNote:
        'An international theatrical release assembled from the two-part television story Deadly Dust.',
    },
    {
      slug: 'spider-man-the-dragons-challenge',
      title: 'Spider-Man: The Dragon’s Challenge',
      year: 1981,
      wikipediaTitle: "Spider-Man: The Dragon's Challenge",
      director: 'Don McDougall',
      cast: ['Nicholas Hammond', 'Rosalind Chao', 'Robert F. Simon', 'Benson Fong'],
      description:
        'Peter Parker travels to Hong Kong while helping a former official uncover the conspiracy behind an accusation of treason.',
      releaseNote:
        'An international theatrical release of the 1979 television story The Chinese Web, released as a film in 1981.',
    },
    {
      slug: 'dr-strange-1978',
      title: 'Dr. Strange',
      year: 1978,
      wikipediaTitle: 'Dr. Strange (1978 film)',
      director: 'Philip DeGuere',
      cast: ['Peter Hooten', 'Jessica Walter', 'Clyde Kusatsu', 'John Mills'],
      description:
        'Psychiatrist Stephen Strange is drawn into a mystical struggle when Morgan le Fay uses one of his patients in a plot against a sorcerer.',
      releaseType: 'tv-movie',
    },
    {
      slug: 'captain-america-1979',
      title: 'Captain America',
      year: 1979,
      wikipediaTitle: 'Captain America (1979 film)',
      director: 'Rod Holcomb',
      cast: ['Reb Brown', 'Len Birman', 'Heather Menzies', 'Robin Mattson'],
      description:
        'Former Marine Steve Rogers gains enhanced abilities from a serum and takes up a shield and motorcycle to foil a criminal plot.',
      releaseType: 'tv-movie',
    },
    {
      slug: 'captain-america-ii-death-too-soon',
      title: 'Captain America II: Death Too Soon',
      year: 1979,
      wikipediaTitle: 'Captain America II: Death Too Soon',
      director: 'Ivan Nagy',
      cast: ['Reb Brown', 'Christopher Lee', 'Connie Sellecca', 'Len Birman'],
      description:
        'Steve Rogers investigates a missing scientist and a terrorist’s plan to threaten a city with a substance that accelerates aging.',
      releaseType: 'tv-movie',
    },
    {
      slug: 'the-incredible-hulk-returns',
      title: 'The Incredible Hulk Returns',
      year: 1988,
      wikipediaTitle: 'The Incredible Hulk Returns',
      director: 'Nicholas Corea',
      cast: ['Bill Bixby', 'Lou Ferrigno', 'Jack Colvin', 'Eric Allan Kramer', 'Steve Levitt'],
      description:
        'David Banner’s search for a cure is interrupted by an old colleague who can summon Thor, drawing both heroes into a kidnapping case.',
      releaseType: 'tv-movie',
    },
    {
      slug: 'the-trial-of-the-incredible-hulk',
      title: 'The Trial of the Incredible Hulk',
      year: 1989,
      wikipediaTitle: 'The Trial of the Incredible Hulk',
      director: 'Bill Bixby',
      cast: ['Bill Bixby', 'Lou Ferrigno', 'Rex Smith', 'John Rhys-Davies'],
      description:
        'Wrongly accused of a crime, David Banner is defended by blind lawyer Matt Murdock, whose masked identity Daredevil opposes Wilson Fisk.',
      releaseType: 'tv-movie',
    },
    {
      slug: 'the-death-of-the-incredible-hulk',
      title: 'The Death of the Incredible Hulk',
      year: 1990,
      wikipediaTitle: 'The Death of the Incredible Hulk',
      director: 'Bill Bixby',
      cast: ['Bill Bixby', 'Lou Ferrigno', 'Elizabeth Gracen', 'Philip Sterling'],
      description:
        'Banner secretly works with a scientist on a cure, but a spy’s involvement places their research and the Hulk in danger.',
      releaseType: 'tv-movie',
    },
    {
      slug: 'generation-x',
      title: 'Generation X',
      year: 1996,
      wikipediaTitle: 'Generation X (film)',
      director: 'Jack Sholder',
      cast: ['Matt Frewer', 'Finola Hughes', 'Heather McComb', 'Agustin Rodriguez'],
      description:
        'Young mutants train under Emma Frost and Banshee while a scientist seeks to exploit their abilities through the dream world.',
      releaseType: 'tv-movie',
    },
    {
      slug: 'nick-fury-agent-of-shield',
      title: 'Nick Fury: Agent of S.H.I.E.L.D.',
      year: 1998,
      wikipediaTitle: 'Nick Fury: Agent of S.H.I.E.L.D. (film)',
      director: 'Rod Hardy',
      cast: ['David Hasselhoff', 'Lisa Rinna', 'Sandra Hess', 'Neil Roberts'],
      description:
        'Retired spy Nick Fury is called back into service when Hydra threatens New York with a deadly biological weapon.',
      releaseType: 'tv-movie',
    },
    {
      slug: 'man-thing',
      title: 'Man-Thing',
      year: 2005,
      wikipediaTitle: 'Man-Thing (film)',
      director: 'Brett Leonard',
      cast: ['Matthew Le Nevez', 'Rachael Taylor', 'Jack Thompson', 'Conan Stevens'],
      description:
        'A new sheriff investigates disappearances in a Louisiana swamp where oil drilling has disturbed a monstrous guardian.',
      releaseType: 'tv-movie',
      releaseNote:
        'Premiered on television in the United States, with theatrical releases in some international markets.',
    },
  ]),
  ...films('dc', 'dc-tv', [
    {
      slug: 'wonder-woman-1974',
      title: 'Wonder Woman',
      year: 1974,
      wikipediaTitle: 'Wonder Woman (1974 film)',
      director: 'Vincent McEveety',
      cast: ['Cathy Lee Crosby', 'Kaz Garas', 'Ricardo Montalbán', 'Andrew Prine'],
      description:
        'Diana Prince works as a government agent to recover stolen intelligence in a spy-focused interpretation of Wonder Woman.',
      releaseType: 'tv-movie',
      releaseNote:
        'A standalone television pilot starring Cathy Lee Crosby, distinct from the later Lynda Carter series.',
    },
    {
      slug: 'justice-league-of-america-1997',
      title: 'Justice League of America',
      year: 1997,
      wikipediaTitle: 'Justice League of America (film)',
      director: 'Félix Enríquez Alcalá',
      cast: [
        'Matthew Settle',
        'Kimberly Oja',
        'John Kassir',
        'Kenny Johnston',
        'David Krumholtz',
        'Miguel Ferrer',
      ],
      description:
        'A young woman with newly acquired ice powers joins a team of heroes to stop a villain who controls the weather.',
      releaseType: 'tv-movie',
      releaseNote:
        'A television pilot released in 1997; no continuing series followed. Lewis Teague also directed uncredited material. The available archive artwork is a television title card, not a theatrical poster.',
    },
  ]),
];
