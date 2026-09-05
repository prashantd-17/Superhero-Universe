import { films } from './catalog-helpers';

export const DC_MOVIES = [
  ...films('dc', 'superman-classic', [
    {
      slug: 'superman-and-the-mole-men',
      title: 'Superman and the Mole Men',
      year: 1951,
      wikipediaTitle: 'Superman and the Mole Men',
      director: 'Lee Sholem',
      cast: ['George Reeves', 'Phyllis Coates', 'Jeff Corey', 'Walter Reed'],
      description:
        'Clark Kent and Lois Lane visit an oil town where the arrival of underground beings provokes a frightened mob, forcing Superman to protect the visitors.',
    },
    {
      slug: 'superman-1978',
      title: 'Superman',
      year: 1978,
      wikipediaTitle: 'Superman (1978 film)',
      director: 'Richard Donner',
      cast: ['Christopher Reeve', 'Margot Kidder', 'Gene Hackman', 'Marlon Brando'],
      description:
        'Raised in Smallville after escaping Krypton’s destruction, Clark Kent becomes Superman and faces Lex Luthor’s catastrophic real-estate scheme.',
    },
    {
      slug: 'superman-ii',
      title: 'Superman II',
      year: 1980,
      wikipediaTitle: 'Superman II',
      director: 'Richard Lester',
      cast: ['Christopher Reeve', 'Margot Kidder', 'Gene Hackman', 'Terence Stamp'],
      description:
        'Superman considers a human life with Lois Lane just as General Zod and two fellow Kryptonian criminals arrive on Earth.',
      releaseNote:
        'First released in Australia in 1980; the US theatrical release followed in 1981. Richard Lester is the credited director of this theatrical version.',
    },
    {
      slug: 'superman-iii',
      title: 'Superman III',
      year: 1983,
      wikipediaTitle: 'Superman III',
      director: 'Richard Lester',
      cast: ['Christopher Reeve', 'Richard Pryor', 'Annette O’Toole', 'Robert Vaughn'],
      description:
        'A computer programmer is drawn into a tycoon’s plans while synthetic kryptonite splits Superman’s personality and threatens his judgment.',
    },
    {
      slug: 'supergirl-1984',
      title: 'Supergirl',
      year: 1984,
      wikipediaTitle: 'Supergirl (1984 film)',
      director: 'Jeannot Szwarc',
      cast: ['Helen Slater', 'Faye Dunaway', 'Peter O’Toole', 'Mia Farrow'],
      description:
        'Kara travels from Argo City to Earth to recover a lost power source, which falls into the hands of a would-be sorceress.',
    },
    {
      slug: 'superman-iv-the-quest-for-peace',
      title: 'Superman IV: The Quest for Peace',
      year: 1987,
      wikipediaTitle: 'Superman IV: The Quest for Peace',
      director: 'Sidney J. Furie',
      cast: ['Christopher Reeve', 'Gene Hackman', 'Margot Kidder', 'Jon Cryer'],
      description:
        'Superman’s effort to eliminate nuclear weapons is challenged when Lex Luthor creates the solar-powered Nuclear Man.',
    },
    {
      slug: 'superman-returns',
      title: 'Superman Returns',
      year: 2006,
      wikipediaTitle: 'Superman Returns',
      director: 'Bryan Singer',
      cast: ['Brandon Routh', 'Kate Bosworth', 'Kevin Spacey', 'James Marsden'],
      description:
        'After years away, Superman returns to a changed Metropolis, a new chapter in Lois Lane’s life and Lex Luthor’s latest use for Kryptonian technology.',
      releaseNote:
        'An alternate continuation of Superman (1978) and Superman II, not a sequel to Superman IV.',
    },
    {
      slug: 'superman-ii-the-richard-donner-cut',
      title: 'Superman II: The Richard Donner Cut',
      year: 2006,
      wikipediaTitle: 'Superman II: The Richard Donner Cut',
      director: 'Richard Donner',
      cast: [
        'Christopher Reeve',
        'Margot Kidder',
        'Gene Hackman',
        'Marlon Brando',
        'Terence Stamp',
      ],
      description:
        'A reconstructed version of Superman II restores Richard Donner’s footage, including Jor-El’s role in Clark’s choice between love and responsibility.',
      releaseType: 'home-video',
      releaseNote:
        'A separately released alternate cut of the 1980 film, not a new story set in 2006.',
    },
  ]),
  ...films('dc', 'batman-classic', [
    {
      slug: 'batman-1966',
      title: 'Batman',
      year: 1966,
      wikipediaTitle: 'Batman (1966 film)',
      director: 'Leslie H. Martinson',
      cast: [
        'Adam West',
        'Burt Ward',
        'Lee Meriwether',
        'Cesar Romero',
        'Burgess Meredith',
        'Frank Gorshin',
      ],
      description:
        'Batman and Robin take on the combined schemes of the Joker, Penguin, Riddler and Catwoman in the feature spun off from the 1960s television series.',
    },
    {
      slug: 'batman-1989',
      title: 'Batman',
      year: 1989,
      wikipediaTitle: 'Batman (1989 film)',
      director: 'Tim Burton',
      cast: ['Michael Keaton', 'Jack Nicholson', 'Kim Basinger', 'Robert Wuhl'],
      description:
        'Gotham’s emerging masked protector faces the Joker, a disfigured gangster whose theatrical crimes put the whole city at risk.',
    },
    {
      slug: 'batman-returns',
      title: 'Batman Returns',
      year: 1992,
      wikipediaTitle: 'Batman Returns',
      director: 'Tim Burton',
      cast: ['Michael Keaton', 'Danny DeVito', 'Michelle Pfeiffer', 'Christopher Walken'],
      description:
        'Batman confronts the Penguin’s political ambitions and a corrupt businessman while Selina Kyle reinvents herself as Catwoman.',
    },
    {
      slug: 'batman-forever',
      title: 'Batman Forever',
      year: 1995,
      wikipediaTitle: 'Batman Forever',
      director: 'Joel Schumacher',
      cast: ['Val Kilmer', 'Tommy Lee Jones', 'Jim Carrey', 'Nicole Kidman', 'Chris O’Donnell'],
      description:
        'As the Riddler and Two-Face join forces, Bruce Wayne takes in orphaned acrobat Dick Grayson and confronts memories of his own loss.',
    },
    {
      slug: 'batman-and-robin',
      title: 'Batman & Robin',
      year: 1997,
      wikipediaTitle: 'Batman & Robin (film)',
      director: 'Joel Schumacher',
      cast: [
        'George Clooney',
        'Chris O’Donnell',
        'Arnold Schwarzenegger',
        'Uma Thurman',
        'Alicia Silverstone',
      ],
      description:
        'Batman, Robin and a new ally, Batgirl, defend Gotham from Mr. Freeze and Poison Ivy while the partners struggle to trust one another.',
    },
  ]),
  ...films('dc', 'dark-knight', [
    {
      slug: 'batman-begins',
      title: 'Batman Begins',
      year: 2005,
      wikipediaTitle: 'Batman Begins',
      director: 'Christopher Nolan',
      cast: [
        'Christian Bale',
        'Michael Caine',
        'Liam Neeson',
        'Katie Holmes',
        'Gary Oldman',
        'Cillian Murphy',
      ],
      description:
        'Bruce Wayne returns to Gotham after years of training and creates Batman to fight corruption, the Scarecrow and the League of Shadows.',
    },
    {
      slug: 'the-dark-knight',
      title: 'The Dark Knight',
      year: 2008,
      wikipediaTitle: 'The Dark Knight',
      director: 'Christopher Nolan',
      cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Maggie Gyllenhaal', 'Gary Oldman'],
      description:
        'Batman, Jim Gordon and Harvey Dent’s campaign against organized crime is tested by the Joker’s effort to turn Gotham against its own ideals.',
    },
    {
      slug: 'the-dark-knight-rises',
      title: 'The Dark Knight Rises',
      year: 2012,
      wikipediaTitle: 'The Dark Knight Rises',
      director: 'Christopher Nolan',
      cast: [
        'Christian Bale',
        'Tom Hardy',
        'Anne Hathaway',
        'Gary Oldman',
        'Joseph Gordon-Levitt',
        'Marion Cotillard',
      ],
      description:
        'Eight years after the Joker’s attacks, Bruce Wayne returns as Batman when Bane isolates Gotham and threatens the city’s destruction.',
    },
  ]),
  ...films('dc', 'dceu', [
    {
      slug: 'man-of-steel',
      title: 'Man of Steel',
      year: 2013,
      wikipediaTitle: 'Man of Steel (film)',
      director: 'Zack Snyder',
      cast: ['Henry Cavill', 'Amy Adams', 'Michael Shannon', 'Kevin Costner', 'Russell Crowe'],
      description:
        'Clark Kent searches for his place on Earth and reveals his Kryptonian powers when General Zod arrives with a plan to remake the planet.',
    },
    {
      slug: 'batman-v-superman-dawn-of-justice',
      title: 'Batman v Superman: Dawn of Justice',
      year: 2016,
      wikipediaTitle: 'Batman v Superman: Dawn of Justice',
      director: 'Zack Snyder',
      cast: ['Ben Affleck', 'Henry Cavill', 'Amy Adams', 'Gal Gadot', 'Jesse Eisenberg'],
      description:
        'Fear of Superman drives Bruce Wayne toward a confrontation that Lex Luthor manipulates, while a new threat forces the heroes to unite.',
    },
    {
      slug: 'suicide-squad',
      title: 'Suicide Squad',
      year: 2016,
      wikipediaTitle: 'Suicide Squad (2016 film)',
      director: 'David Ayer',
      cast: ['Will Smith', 'Margot Robbie', 'Viola Davis', 'Joel Kinnaman', 'Jared Leto'],
      description:
        'Amanda Waller recruits imprisoned supervillains for a covert task force and sends them into a city overtaken by the Enchantress.',
    },
    {
      slug: 'wonder-woman',
      title: 'Wonder Woman',
      year: 2017,
      wikipediaTitle: 'Wonder Woman (2017 film)',
      director: 'Patty Jenkins',
      cast: ['Gal Gadot', 'Chris Pine', 'Connie Nielsen', 'Robin Wright', 'David Thewlis'],
      description:
        'Diana leaves Themyscira with pilot Steve Trevor to confront the First World War, believing that defeating Ares will end humanity’s violence.',
    },
    {
      slug: 'justice-league',
      title: 'Justice League',
      year: 2017,
      wikipediaTitle: 'Justice League (film)',
      director: 'Zack Snyder',
      cast: [
        'Ben Affleck',
        'Henry Cavill',
        'Gal Gadot',
        'Jason Momoa',
        'Ezra Miller',
        'Ray Fisher',
      ],
      description:
        'Inspired by Superman’s sacrifice, Batman and Wonder Woman recruit Aquaman, the Flash and Cyborg to stop Steppenwolf from uniting the Mother Boxes.',
      releaseNote:
        'Zack Snyder is the credited director. Joss Whedon oversaw reshoots and post-production on this theatrical version.',
    },
    {
      slug: 'aquaman',
      title: 'Aquaman',
      year: 2018,
      wikipediaTitle: 'Aquaman (film)',
      director: 'James Wan',
      cast: ['Jason Momoa', 'Amber Heard', 'Patrick Wilson', 'Willem Dafoe', 'Nicole Kidman'],
      description:
        'Arthur Curry journeys into the underwater kingdoms to claim his heritage and prevent his half-brother Orm from declaring war on the surface.',
    },
    {
      slug: 'shazam',
      title: 'Shazam!',
      year: 2019,
      wikipediaTitle: 'Shazam! (film)',
      director: 'David F. Sandberg',
      cast: ['Zachary Levi', 'Asher Angel', 'Mark Strong', 'Jack Dylan Grazer'],
      description:
        'Foster teenager Billy Batson becomes an adult superhero by speaking a magic word, then learns to use his powers against Dr. Thaddeus Sivana.',
    },
    {
      slug: 'birds-of-prey',
      title: 'Birds of Prey',
      year: 2020,
      wikipediaTitle: 'Birds of Prey (2020 film)',
      director: 'Cathy Yan',
      cast: [
        'Margot Robbie',
        'Mary Elizabeth Winstead',
        'Jurnee Smollett-Bell',
        'Rosie Perez',
        'Ewan McGregor',
      ],
      description:
        'After her breakup with the Joker, Harley Quinn joins an unlikely group of women protecting a young pickpocket from Gotham crime lord Roman Sionis.',
    },
    {
      slug: 'wonder-woman-1984',
      title: 'Wonder Woman 1984',
      year: 2020,
      wikipediaTitle: 'Wonder Woman 1984',
      director: 'Patty Jenkins',
      cast: ['Gal Gadot', 'Chris Pine', 'Kristen Wiig', 'Pedro Pascal'],
      description:
        'A wish-granting artifact brings Steve Trevor back into Diana’s life while Barbara Minerva and Maxwell Lord pursue transformations of their own.',
    },
    {
      slug: 'zack-snyders-justice-league',
      title: 'Zack Snyder’s Justice League',
      year: 2021,
      wikipediaTitle: "Zack Snyder's Justice League",
      director: 'Zack Snyder',
      cast: [
        'Ben Affleck',
        'Henry Cavill',
        'Gal Gadot',
        'Jason Momoa',
        'Ezra Miller',
        'Ray Fisher',
      ],
      description:
        'In Snyder’s alternate version, Batman and Wonder Woman assemble the League to stop Steppenwolf’s invasion and the forces of Darkseid, with Cyborg central to the Mother Boxes.',
      releaseType: 'streaming',
      releaseNote:
        'The four-hour director’s cut of Justice League, released in 2021. It is not a fan edit or a sequel to the theatrical version.',
    },
    {
      slug: 'the-suicide-squad',
      title: 'The Suicide Squad',
      year: 2021,
      wikipediaTitle: 'The Suicide Squad (film)',
      director: 'James Gunn',
      cast: [
        'Idris Elba',
        'Margot Robbie',
        'John Cena',
        'Joel Kinnaman',
        'Daniela Melchior',
        'Viola Davis',
      ],
      description:
        'Task Force X infiltrates Corto Maltese to destroy a secret laboratory and discovers that its mission involves a giant alien starfish.',
    },
    {
      slug: 'black-adam',
      title: 'Black Adam',
      year: 2022,
      wikipediaTitle: 'Black Adam (film)',
      director: 'Jaume Collet-Serra',
      cast: [
        'Dwayne Johnson',
        'Aldis Hodge',
        'Pierce Brosnan',
        'Sarah Shahi',
        'Quintessa Swindell',
      ],
      description:
        'An ancient champion awakens in occupied Kahndaq, where his lethal approach to justice brings him into conflict with the Justice Society.',
    },
    {
      slug: 'shazam-fury-of-the-gods',
      title: 'Shazam! Fury of the Gods',
      year: 2023,
      wikipediaTitle: 'Shazam! Fury of the Gods',
      director: 'David F. Sandberg',
      cast: [
        'Zachary Levi',
        'Asher Angel',
        'Jack Dylan Grazer',
        'Rachel Zegler',
        'Lucy Liu',
        'Helen Mirren',
      ],
      description:
        'Billy Batson and his superpowered foster family face the daughters of Atlas, who seek to reclaim the magic they believe was stolen from their father.',
    },
    {
      slug: 'the-flash',
      title: 'The Flash',
      year: 2023,
      wikipediaTitle: 'The Flash (film)',
      director: 'Andy Muschietti',
      cast: ['Ezra Miller', 'Sasha Calle', 'Michael Keaton', 'Michael Shannon', 'Ben Affleck'],
      description:
        'Barry Allen’s attempt to save his mother changes history, leaving him in a world with a different Batman and no Superman to stop General Zod.',
    },
    {
      slug: 'blue-beetle',
      title: 'Blue Beetle',
      year: 2023,
      wikipediaTitle: 'Blue Beetle (film)',
      director: 'Ángel Manuel Soto',
      cast: [
        'Xolo Maridueña',
        'Bruna Marquezine',
        'Adriana Barraza',
        'George Lopez',
        'Susan Sarandon',
      ],
      description:
        'College graduate Jaime Reyes bonds with an alien scarab that creates a powerful suit, drawing his family into a struggle over military technology.',
    },
    {
      slug: 'aquaman-and-the-lost-kingdom',
      title: 'Aquaman and the Lost Kingdom',
      year: 2023,
      wikipediaTitle: 'Aquaman and the Lost Kingdom',
      director: 'James Wan',
      cast: [
        'Jason Momoa',
        'Patrick Wilson',
        'Yahya Abdul-Mateen II',
        'Amber Heard',
        'Nicole Kidman',
      ],
      description:
        'Arthur must work with his imprisoned brother Orm when Black Manta obtains an ancient weapon that threatens Atlantis and the surface world.',
    },
  ]),
  ...films('dc', 'dcu', [
    {
      slug: 'superman-2025',
      title: 'Superman',
      year: 2025,
      wikipediaTitle: 'Superman (2025 film)',
      director: 'James Gunn',
      cast: [
        'David Corenswet',
        'Rachel Brosnahan',
        'Nicholas Hoult',
        'Edi Gathegi',
        'Nathan Fillion',
        'Isabela Merced',
      ],
      description:
        'Clark Kent’s faith in kindness is tested when Lex Luthor turns public suspicion against Superman in the first feature of the new DC Universe.',
    },
    {
      slug: 'supergirl-2026',
      title: 'Supergirl',
      year: 2026,
      wikipediaTitle: 'Supergirl (2026 film)',
      director: 'Craig Gillespie',
      cast: [
        'Milly Alcock',
        'Eve Ridley',
        'Matthias Schoenaerts',
        'David Krumholtz',
        'Emily Beecham',
        'Jason Momoa',
      ],
      description:
        'Kara Zor-El crosses the galaxy with young Ruthye Marye Knoll on a journey of revenge and recovery after an attack on Krypto.',
    },
  ]),
  ...films('dc', 'dc-standalone', [
    {
      slug: 'swamp-thing',
      title: 'Swamp Thing',
      year: 1982,
      wikipediaTitle: 'Swamp Thing (1982 film)',
      director: 'Wes Craven',
      cast: ['Ray Wise', 'Dick Durock', 'Adrienne Barbeau', 'Louis Jourdan'],
      description:
        'An attack on a research laboratory transforms scientist Alec Holland into a plant-like creature who protects the surviving witness.',
    },
    {
      slug: 'the-return-of-swamp-thing',
      title: 'The Return of Swamp Thing',
      year: 1989,
      wikipediaTitle: 'The Return of Swamp Thing',
      director: 'Jim Wynorski',
      cast: ['Dick Durock', 'Heather Locklear', 'Louis Jourdan', 'Sarah Douglas'],
      description:
        'Swamp Thing protects Abigail Arcane from her stepfather’s dangerous experiments and a new collection of mutated creatures.',
    },
    {
      slug: 'steel',
      title: 'Steel',
      year: 1997,
      wikipediaTitle: 'Steel (1997 film)',
      director: 'Kenneth Johnson',
      cast: ['Shaquille O’Neal', 'Annabeth Gish', 'Judd Nelson', 'Richard Roundtree'],
      description:
        'Weapons designer John Henry Irons builds a suit of armor to keep his military inventions out of the hands of street criminals.',
    },
    {
      slug: 'catwoman',
      title: 'Catwoman',
      year: 2004,
      wikipediaTitle: 'Catwoman (film)',
      director: 'Pitof',
      cast: ['Halle Berry', 'Benjamin Bratt', 'Sharon Stone', 'Lambert Wilson'],
      description:
        'After uncovering a cosmetics company’s dangerous secret, Patience Phillips is revived with feline abilities and adopts the identity Catwoman.',
    },
    {
      slug: 'constantine',
      title: 'Constantine',
      year: 2005,
      wikipediaTitle: 'Constantine (film)',
      director: 'Francis Lawrence',
      cast: ['Keanu Reeves', 'Rachel Weisz', 'Shia LaBeouf', 'Tilda Swinton', 'Djimon Hounsou'],
      description:
        'Occult investigator John Constantine helps a detective examine her twin sister’s death and uncovers a breach in the balance between Heaven and Hell.',
    },
    {
      slug: 'watchmen-2009',
      title: 'Watchmen',
      year: 2009,
      wikipediaTitle: 'Watchmen (2009 film)',
      director: 'Zack Snyder',
      cast: [
        'Jackie Earle Haley',
        'Patrick Wilson',
        'Malin Åkerman',
        'Billy Crudup',
        'Matthew Goode',
        'Jeffrey Dean Morgan',
      ],
      description:
        'In an alternate 1985, the murder of a former masked hero leads Rorschach to a conspiracy involving his old colleagues and the Cold War.',
    },
    {
      slug: 'jonah-hex',
      title: 'Jonah Hex',
      year: 2010,
      wikipediaTitle: 'Jonah Hex (film)',
      director: 'Jimmy Hayward',
      cast: ['Josh Brolin', 'John Malkovich', 'Megan Fox', 'Michael Fassbender'],
      description:
        'A scarred bounty hunter with a connection to the dead is recruited to stop the former Confederate officer who destroyed his family.',
    },
    {
      slug: 'green-lantern',
      title: 'Green Lantern',
      year: 2011,
      wikipediaTitle: 'Green Lantern (film)',
      director: 'Martin Campbell',
      cast: ['Ryan Reynolds', 'Blake Lively', 'Peter Sarsgaard', 'Mark Strong'],
      description:
        'Test pilot Hal Jordan receives a power ring and joins an intergalactic corps whose members must confront the fear-feeding entity Parallax.',
    },
    {
      slug: 'joker',
      title: 'Joker',
      year: 2019,
      wikipediaTitle: 'Joker (2019 film)',
      director: 'Todd Phillips',
      cast: ['Joaquin Phoenix', 'Robert De Niro', 'Zazie Beetz', 'Frances Conroy'],
      description:
        'An isolated aspiring comedian in a troubled Gotham descends into violence in a standalone origin story for the Joker.',
    },
    {
      slug: 'the-batman',
      title: 'The Batman',
      year: 2022,
      wikipediaTitle: 'The Batman (film)',
      director: 'Matt Reeves',
      cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano', 'Jeffrey Wright', 'Colin Farrell'],
      description:
        'In his second year as Batman, Bruce Wayne investigates the Riddler’s murders and the corruption linking Gotham’s powerful families.',
    },
    {
      slug: 'joker-folie-a-deux',
      title: 'Joker: Folie à Deux',
      year: 2024,
      wikipediaTitle: 'Joker: Folie à Deux',
      director: 'Todd Phillips',
      cast: ['Joaquin Phoenix', 'Lady Gaga', 'Brendan Gleeson', 'Catherine Keener', 'Zazie Beetz'],
      description:
        'Awaiting trial at Arkham, Arthur Fleck forms a bond with fellow patient Lee Quinzel as his identity as the Joker takes on a life of its own.',
    },
  ]),
];
