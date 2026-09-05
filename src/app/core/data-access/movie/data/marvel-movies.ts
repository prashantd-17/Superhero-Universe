import { films } from './catalog-helpers';

export const MARVEL_MOVIES = [
  ...films('marvel', 'x-men', [
    {
      slug: 'x-men',
      title: 'X-Men',
      year: 2000,
      wikipediaTitle: 'X-Men (film)',
      director: 'Bryan Singer',
      cast: ['Hugh Jackman', 'Patrick Stewart', 'Ian McKellen', 'Anna Paquin', 'Halle Berry'],
      description:
        'Wolverine and Rogue find a home with Charles Xavier’s mutant students as Magneto prepares a plan to force humanity to accept mutation.',
    },
    {
      slug: 'x2',
      title: 'X2',
      year: 2003,
      wikipediaTitle: 'X2 (film)',
      director: 'Bryan Singer',
      cast: ['Hugh Jackman', 'Patrick Stewart', 'Ian McKellen', 'Halle Berry', 'Brian Cox'],
      description:
        'An attack on Xavier’s school forces the X-Men into an alliance with Magneto against William Stryker’s campaign to eliminate mutants.',
    },
    {
      slug: 'x-men-the-last-stand',
      title: 'X-Men: The Last Stand',
      year: 2006,
      wikipediaTitle: 'X-Men: The Last Stand',
      director: 'Brett Ratner',
      cast: ['Hugh Jackman', 'Halle Berry', 'Ian McKellen', 'Famke Janssen', 'Patrick Stewart'],
      description:
        'A proposed cure for mutation divides the mutant community while Jean Grey returns with a dangerous alternate personality.',
    },
    {
      slug: 'x-men-origins-wolverine',
      title: 'X-Men Origins: Wolverine',
      year: 2009,
      wikipediaTitle: 'X-Men Origins: Wolverine',
      director: 'Gavin Hood',
      cast: ['Hugh Jackman', 'Liev Schreiber', 'Danny Huston', 'Lynn Collins', 'Ryan Reynolds'],
      description:
        'Logan’s history with his brother Victor and the Weapon X program reveals how he acquired his adamantium skeleton.',
    },
    {
      slug: 'x-men-first-class',
      title: 'X-Men: First Class',
      year: 2011,
      wikipediaTitle: 'X-Men: First Class',
      director: 'Matthew Vaughn',
      cast: [
        'James McAvoy',
        'Michael Fassbender',
        'Jennifer Lawrence',
        'Kevin Bacon',
        'Rose Byrne',
      ],
      description:
        'Charles Xavier and Erik Lehnsherr assemble a young mutant team during the Cuban Missile Crisis, before their opposing beliefs make them enemies.',
    },
    {
      slug: 'the-wolverine',
      title: 'The Wolverine',
      year: 2013,
      wikipediaTitle: 'The Wolverine (film)',
      director: 'James Mangold',
      cast: ['Hugh Jackman', 'Tao Okamoto', 'Rila Fukushima', 'Hiroyuki Sanada'],
      description:
        'Summoned to Japan by a man he once saved, Logan becomes entangled in a family power struggle and confronts the possibility of losing his healing power.',
    },
    {
      slug: 'x-men-days-of-future-past',
      title: 'X-Men: Days of Future Past',
      year: 2014,
      wikipediaTitle: 'X-Men: Days of Future Past',
      director: 'Bryan Singer',
      cast: [
        'Hugh Jackman',
        'James McAvoy',
        'Michael Fassbender',
        'Jennifer Lawrence',
        'Patrick Stewart',
        'Ian McKellen',
      ],
      description:
        'To avert a future ruled by mutant-hunting Sentinels, Wolverine’s consciousness travels to 1973 to reunite a fractured generation of X-Men.',
    },
    {
      slug: 'deadpool',
      title: 'Deadpool',
      year: 2016,
      wikipediaTitle: 'Deadpool (film)',
      director: 'Tim Miller',
      cast: ['Ryan Reynolds', 'Morena Baccarin', 'Ed Skrein', 'Brianna Hildebrand'],
      description:
        'Mercenary Wade Wilson survives an experiment that gives him healing powers and sets out to confront the man who disfigured him.',
    },
    {
      slug: 'x-men-apocalypse',
      title: 'X-Men: Apocalypse',
      year: 2016,
      wikipediaTitle: 'X-Men: Apocalypse',
      director: 'Bryan Singer',
      cast: [
        'James McAvoy',
        'Michael Fassbender',
        'Jennifer Lawrence',
        'Oscar Isaac',
        'Sophie Turner',
      ],
      description:
        'An ancient mutant awakens in 1983 and recruits four horsemen, prompting a new generation of X-Men to defend the world.',
    },
    {
      slug: 'logan',
      title: 'Logan',
      year: 2017,
      wikipediaTitle: 'Logan (film)',
      director: 'James Mangold',
      cast: ['Hugh Jackman', 'Patrick Stewart', 'Dafne Keen', 'Boyd Holbrook'],
      description:
        'An aging Logan, caring for an ailing Charles Xavier, protects a young girl whose powers connect her to the experiments that created him.',
    },
    {
      slug: 'deadpool-2',
      title: 'Deadpool 2',
      year: 2018,
      wikipediaTitle: 'Deadpool 2',
      director: 'David Leitch',
      cast: ['Ryan Reynolds', 'Josh Brolin', 'Zazie Beetz', 'Julian Dennison', 'Morena Baccarin'],
      description:
        'Deadpool forms an improvised team to protect a young mutant from Cable, a soldier traveling back from a devastated future.',
    },
    {
      slug: 'dark-phoenix',
      title: 'Dark Phoenix',
      year: 2019,
      wikipediaTitle: 'Dark Phoenix (film)',
      director: 'Simon Kinberg',
      cast: [
        'Sophie Turner',
        'James McAvoy',
        'Michael Fassbender',
        'Jennifer Lawrence',
        'Jessica Chastain',
      ],
      description:
        'After a space rescue exposes Jean Grey to a cosmic force, the X-Men struggle to help her control powers sought by alien shapeshifters.',
    },
    {
      slug: 'the-new-mutants',
      title: 'The New Mutants',
      year: 2020,
      wikipediaTitle: 'The New Mutants (film)',
      director: 'Josh Boone',
      cast: ['Blu Hunt', 'Maisie Williams', 'Anya Taylor-Joy', 'Charlie Heaton', 'Henry Zaga'],
      description:
        'Five young mutants held in a remote facility confront manifestations of their deepest fears and the true purpose of their confinement.',
    },
  ]),
  ...films('marvel', 'spider-man', [
    {
      slug: 'spider-man-2002',
      title: 'Spider-Man',
      year: 2002,
      wikipediaTitle: 'Spider-Man (2002 film)',
      director: 'Sam Raimi',
      cast: ['Tobey Maguire', 'Willem Dafoe', 'Kirsten Dunst', 'James Franco'],
      description:
        'A genetically altered spider gives Peter Parker extraordinary abilities, and a family tragedy teaches him the responsibility that comes with them.',
    },
    {
      slug: 'spider-man-2',
      title: 'Spider-Man 2',
      year: 2004,
      wikipediaTitle: 'Spider-Man 2',
      director: 'Sam Raimi',
      cast: ['Tobey Maguire', 'Kirsten Dunst', 'James Franco', 'Alfred Molina'],
      description:
        'Peter struggles to balance his personal life with heroism as scientist Otto Octavius becomes the mechanical-armed Doctor Octopus.',
    },
    {
      slug: 'spider-man-3',
      title: 'Spider-Man 3',
      year: 2007,
      wikipediaTitle: 'Spider-Man 3',
      director: 'Sam Raimi',
      cast: [
        'Tobey Maguire',
        'Kirsten Dunst',
        'James Franco',
        'Thomas Haden Church',
        'Topher Grace',
      ],
      description:
        'A black symbiote suit amplifies Peter’s darker impulses while Sandman, a vengeful Harry Osborn and Eddie Brock complicate his life.',
    },
    {
      slug: 'the-amazing-spider-man',
      title: 'The Amazing Spider-Man',
      year: 2012,
      wikipediaTitle: 'The Amazing Spider-Man (film)',
      director: 'Marc Webb',
      cast: ['Andrew Garfield', 'Emma Stone', 'Rhys Ifans', 'Denis Leary', 'Sally Field'],
      description:
        'Peter Parker investigates his parents’ disappearance, develops spider-like abilities and confronts the consequences of Dr. Curt Connors’s research.',
    },
    {
      slug: 'the-amazing-spider-man-2',
      title: 'The Amazing Spider-Man 2',
      year: 2014,
      wikipediaTitle: 'The Amazing Spider-Man 2',
      director: 'Marc Webb',
      cast: ['Andrew Garfield', 'Emma Stone', 'Jamie Foxx', 'Dane DeHaan', 'Sally Field'],
      description:
        'Peter’s relationship with Gwen Stacy is tested as Electro emerges and Harry Osborn turns to Oscorp’s dangerous experiments.',
    },
  ]),
  ...films('marvel', 'sony-spider-man', [
    {
      slug: 'venom',
      title: 'Venom',
      year: 2018,
      wikipediaTitle: 'Venom (2018 film)',
      director: 'Ruben Fleischer',
      cast: ['Tom Hardy', 'Michelle Williams', 'Riz Ahmed', 'Reid Scott'],
      description:
        'Reporter Eddie Brock bonds with an alien symbiote while investigating a corporation’s experiments on vulnerable people.',
    },
    {
      slug: 'venom-let-there-be-carnage',
      title: 'Venom: Let There Be Carnage',
      year: 2021,
      wikipediaTitle: 'Venom: Let There Be Carnage',
      director: 'Andy Serkis',
      cast: ['Tom Hardy', 'Woody Harrelson', 'Michelle Williams', 'Naomie Harris'],
      description:
        'Eddie and Venom’s uneasy partnership faces a new symbiote when serial killer Cletus Kasady becomes Carnage.',
    },
    {
      slug: 'morbius',
      title: 'Morbius',
      year: 2022,
      wikipediaTitle: 'Morbius (film)',
      director: 'Daniel Espinosa',
      cast: ['Jared Leto', 'Matt Smith', 'Adria Arjona', 'Jared Harris'],
      description:
        'Biochemist Michael Morbius’s attempt to cure a rare blood disorder gives him vampire-like abilities and an uncontrollable hunger.',
    },
    {
      slug: 'madame-web',
      title: 'Madame Web',
      year: 2024,
      wikipediaTitle: 'Madame Web (film)',
      director: 'S. J. Clarkson',
      cast: [
        'Dakota Johnson',
        'Sydney Sweeney',
        'Isabela Merced',
        'Celeste O’Connor',
        'Tahar Rahim',
      ],
      description:
        'A paramedic develops visions of the future and tries to protect three young women from a man who believes they will cause his death.',
    },
    {
      slug: 'venom-the-last-dance',
      title: 'Venom: The Last Dance',
      year: 2024,
      wikipediaTitle: 'Venom: The Last Dance',
      director: 'Kelly Marcel',
      cast: ['Tom Hardy', 'Chiwetel Ejiofor', 'Juno Temple', 'Rhys Ifans'],
      description:
        'Pursued by soldiers and creatures from the symbiotes’ world, Eddie and Venom face a decision that could end their partnership.',
    },
    {
      slug: 'kraven-the-hunter',
      title: 'Kraven the Hunter',
      year: 2024,
      wikipediaTitle: 'Kraven the Hunter (film)',
      director: 'J. C. Chandor',
      cast: [
        'Aaron Taylor-Johnson',
        'Ariana DeBose',
        'Fred Hechinger',
        'Alessandro Nivola',
        'Russell Crowe',
      ],
      description:
        'Sergei Kravinoff’s troubled relationship with his crime-lord father drives him toward a violent life as a hunter of dangerous people.',
    },
  ]),
  ...films('marvel', 'marvel-legacy', [
    {
      slug: 'howard-the-duck',
      title: 'Howard the Duck',
      year: 1986,
      wikipediaTitle: 'Howard the Duck (film)',
      director: 'Willard Huyck',
      cast: ['Lea Thompson', 'Jeffrey Jones', 'Tim Robbins', 'Chip Zien'],
      description:
        'An alien duck is transported to Cleveland, befriends a musician and becomes involved in a scientific experiment that opens a portal to another world.',
    },
    {
      slug: 'the-punisher-1989',
      title: 'The Punisher',
      year: 1989,
      wikipediaTitle: 'The Punisher (1989 film)',
      director: 'Mark Goldblatt',
      cast: ['Dolph Lundgren', 'Louis Gossett Jr.', 'Jeroen Krabbé', 'Kim Miyori'],
      description:
        'Former police officer Frank Castle wages war on organized crime and becomes involved in a struggle between the Mafia and the Yakuza.',
      releaseNote:
        'Released theatrically outside the United States in 1989; the US home-video release followed in 1991.',
    },
    {
      slug: 'captain-america-1990',
      title: 'Captain America',
      year: 1990,
      wikipediaTitle: 'Captain America (1990 film)',
      director: 'Albert Pyun',
      cast: ['Matt Salinger', 'Ronny Cox', 'Scott Paulin', 'Ned Beatty'],
      description:
        'Steve Rogers emerges from decades in suspended animation to face a still-active Red Skull and a conspiracy against the US president.',
      releaseNote: 'First released internationally in 1990; the US home-video release was in 1992.',
    },
    {
      slug: 'blade',
      title: 'Blade',
      year: 1998,
      wikipediaTitle: 'Blade (1998 film)',
      director: 'Stephen Norrington',
      cast: ['Wesley Snipes', 'Stephen Dorff', 'Kris Kristofferson', 'N’Bushe Wright'],
      description:
        'A half-human, half-vampire hunter battles Deacon Frost’s plan to awaken an ancient blood god.',
    },
    {
      slug: 'blade-ii',
      title: 'Blade II',
      year: 2002,
      wikipediaTitle: 'Blade II',
      director: 'Guillermo del Toro',
      cast: ['Wesley Snipes', 'Kris Kristofferson', 'Ron Perlman', 'Leonor Varela'],
      description:
        'Blade joins a vampire strike team to combat Reapers, mutated creatures that feed on humans and vampires alike.',
    },
    {
      slug: 'daredevil-2003',
      title: 'Daredevil',
      year: 2003,
      wikipediaTitle: 'Daredevil (film)',
      director: 'Mark Steven Johnson',
      cast: ['Ben Affleck', 'Jennifer Garner', 'Michael Clarke Duncan', 'Colin Farrell'],
      description:
        'Blind lawyer Matt Murdock fights crime with heightened senses, confronting the Kingpin while becoming involved with Elektra Natchios.',
    },
    {
      slug: 'hulk-2003',
      title: 'Hulk',
      year: 2003,
      wikipediaTitle: 'Hulk (film)',
      director: 'Ang Lee',
      cast: ['Eric Bana', 'Jennifer Connelly', 'Sam Elliott', 'Josh Lucas', 'Nick Nolte'],
      description:
        'A gamma-radiation accident releases Bruce Banner’s suppressed rage as a powerful creature and exposes the experiments of his estranged father.',
    },
    {
      slug: 'the-punisher-2004',
      title: 'The Punisher',
      year: 2004,
      wikipediaTitle: 'The Punisher (2004 film)',
      director: 'Jonathan Hensleigh',
      cast: ['Thomas Jane', 'John Travolta', 'Rebecca Romijn', 'Will Patton'],
      description:
        'After a crime boss orders the murder of his family, undercover agent Frank Castle systematically dismantles the man’s criminal empire.',
    },
    {
      slug: 'blade-trinity',
      title: 'Blade: Trinity',
      year: 2004,
      wikipediaTitle: 'Blade: Trinity',
      director: 'David S. Goyer',
      cast: ['Wesley Snipes', 'Ryan Reynolds', 'Jessica Biel', 'Parker Posey', 'Dominic Purcell'],
      description:
        'Framed by his enemies, Blade allies with the Nightstalkers as the vampires resurrect Dracula to secure their future.',
    },
    {
      slug: 'elektra',
      title: 'Elektra',
      year: 2005,
      wikipediaTitle: 'Elektra (2005 film)',
      director: 'Rob Bowman',
      cast: ['Jennifer Garner', 'Goran Višnjić', 'Kirsten Prout', 'Terence Stamp'],
      description:
        'Resurrected assassin Elektra refuses an assignment and protects a father and daughter from the supernatural warriors of the Hand.',
    },
    {
      slug: 'fantastic-four-2005',
      title: 'Fantastic Four',
      year: 2005,
      wikipediaTitle: 'Fantastic Four (2005 film)',
      director: 'Tim Story',
      cast: ['Ioan Gruffudd', 'Jessica Alba', 'Chris Evans', 'Michael Chiklis', 'Julian McMahon'],
      description:
        'Four people transformed by a cosmic storm learn to live with their powers while Victor von Doom pursues his own ambitions.',
    },
    {
      slug: 'ghost-rider',
      title: 'Ghost Rider',
      year: 2007,
      wikipediaTitle: 'Ghost Rider (2007 film)',
      director: 'Mark Steven Johnson',
      cast: ['Nicolas Cage', 'Eva Mendes', 'Wes Bentley', 'Sam Elliott', 'Peter Fonda'],
      description:
        'Stunt rider Johnny Blaze pays the price of a supernatural bargain by becoming a flaming-skulled enforcer sent after Blackheart.',
    },
    {
      slug: 'fantastic-four-rise-of-the-silver-surfer',
      title: 'Fantastic Four: Rise of the Silver Surfer',
      year: 2007,
      wikipediaTitle: 'Fantastic Four: Rise of the Silver Surfer',
      director: 'Tim Story',
      cast: [
        'Ioan Gruffudd',
        'Jessica Alba',
        'Chris Evans',
        'Michael Chiklis',
        'Doug Jones',
        'Laurence Fishburne',
      ],
      description:
        'Reed and Sue’s wedding plans are interrupted by the Silver Surfer, whose arrival signals a planet-consuming threat.',
    },
    {
      slug: 'punisher-war-zone',
      title: 'Punisher: War Zone',
      year: 2008,
      wikipediaTitle: 'Punisher: War Zone',
      director: 'Lexi Alexander',
      cast: ['Ray Stevenson', 'Dominic West', 'Julie Benz', 'Doug Hutchison'],
      description:
        'Frank Castle’s campaign against a mob family leaves a disfigured gangster who returns as Jigsaw, seeking revenge.',
    },
    {
      slug: 'ghost-rider-spirit-of-vengeance',
      title: 'Ghost Rider: Spirit of Vengeance',
      year: 2011,
      wikipediaTitle: 'Ghost Rider: Spirit of Vengeance',
      director: 'Mark Neveldine & Brian Taylor',
      cast: ['Nicolas Cage', 'Idris Elba', 'Ciarán Hinds', 'Violante Placido'],
      description:
        'Hiding in Eastern Europe, Johnny Blaze agrees to protect a boy from the devil in exchange for a chance to escape his curse.',
      releaseNote:
        'Premiered in December 2011; general theatrical release followed in February 2012.',
    },
    {
      slug: 'fantastic-four-2015',
      title: 'Fantastic Four',
      year: 2015,
      wikipediaTitle: 'Fantastic Four (2015 film)',
      director: 'Josh Trank',
      cast: ['Miles Teller', 'Kate Mara', 'Michael B. Jordan', 'Jamie Bell', 'Toby Kebbell'],
      description:
        'A journey to another dimension transforms four young researchers, who must reunite when a former colleague threatens Earth.',
    },
  ]),
];
