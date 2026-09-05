import { series } from './series-helpers';

export const MARVEL_ANIMATED_SERIES = series('marvel', 'animation', [
  {
    slug: 'the-marvel-super-heroes',
    title: 'The Marvel Super Heroes',
    year: 1966,
    wikipediaTitle: 'The Marvel Super Heroes',
    cast: ['John Vernon', 'Paul Soles', 'Len Carlson'],
    description:
      'An anthology of animated adventures featuring Captain America, Iron Man, Thor, Hulk and the Sub-Mariner.',
  },
  {
    slug: 'fantastic-four-1967-series',
    title: 'Fantastic Four',
    year: 1967,
    wikipediaTitle: 'The Fantastic Four (1967 TV series)',
    cast: ['Gerald Mohr', 'Jo Ann Pflug', 'Jack Flounders', 'Paul Frees'],
    description:
      'Marvel’s first family uses its extraordinary abilities to protect Earth and explore strange new worlds.',
  },
  {
    slug: 'spider-man-1967-series',
    title: 'Spider-Man',
    year: 1967,
    wikipediaTitle: 'Spider-Man (1967 TV series)',
    cast: ['Paul Soles', 'Paul Kligman', 'Peg Dixon', 'Bernard Cowan'],
    description:
      'Peter Parker balances work at the Daily Bugle with adventures against colorful villains as Spider-Man.',
  },
  {
    slug: 'the-new-fantastic-four',
    title: 'The New Fantastic Four',
    year: 1978,
    wikipediaTitle: 'The New Fantastic Four',
    cast: ['Mike Road', 'Ginny Tyler', 'Ted Cassidy', 'Frank Welker'],
    description:
      'Mister Fantastic, Invisible Girl and the Thing team with the robot H.E.R.B.I.E. in this animated interpretation of the Fantastic Four.',
  },
  {
    slug: 'fred-and-barney-meet-the-thing',
    title: 'Fred and Barney Meet the Thing',
    year: 1979,
    wikipediaTitle: 'Fred and Barney Meet the Thing',
    cast: ['Wayne Morton', 'Joe Baker', 'John Stephenson'],
    description:
      'An anthology pairing Flintstones adventures with stories about teenager Benjy Grimm, who transforms into the Thing.',
    releaseNote:
      'The Flintstones and Thing segments largely tell separate stories despite the umbrella program’s title.',
  },
  {
    slug: 'spider-woman-series',
    title: 'Spider-Woman',
    year: 1979,
    wikipediaTitle: 'Spider-Woman (TV series)',
    cast: ['Joan Van Ark', 'Bruce Miller', 'Bryan Scott'],
    description:
      'Magazine editor Jessica Drew uses her spider-like abilities to investigate crimes and supernatural dangers.',
  },
  {
    slug: 'spider-man-1981-series',
    title: 'Spider-Man',
    year: 1981,
    wikipediaTitle: 'Spider-Man (1981 TV series)',
    cast: ['Ted Schwartz', 'William Woodson', 'Linda Gary'],
    description:
      'Peter Parker confronts familiar supervillains while juggling his civilian responsibilities and secret identity.',
  },
  {
    slug: 'spider-man-and-his-amazing-friends',
    title: 'Spider-Man and His Amazing Friends',
    year: 1981,
    wikipediaTitle: 'Spider-Man and His Amazing Friends',
    cast: ['Dan Gilvezan', 'Frank Welker', 'Kathy Garver'],
    description:
      'Spider-Man, Iceman and Firestar share a home and combine their powers against a host of Marvel villains.',
  },
  {
    slug: 'the-incredible-hulk-1982-series',
    title: 'The Incredible Hulk',
    year: 1982,
    wikipediaTitle: 'The Incredible Hulk (1982 TV series)',
    cast: ['Michael Bell', 'Bob Holt', 'B. J. Ward'],
    description:
      'Bruce Banner searches for a cure while the Hulk protects people from threats that Banner cannot face alone.',
  },
  {
    slug: 'x-men-the-animated-series',
    title: 'X-Men: The Animated Series',
    year: 1992,
    wikipediaTitle: 'X-Men: The Animated Series',
    cast: ['Cedric Smith', 'Cal Dodd', 'Lenore Zann', 'Alison Sealy-Smith', 'Norm Spencer'],
    description:
      'Professor Xavier’s mutant team fights persecution, Sentinels and powerful rivals while trying to protect a world that fears them.',
  },
  {
    slug: 'iron-man-1994-series',
    title: 'Iron Man',
    year: 1994,
    wikipediaTitle: 'Iron Man (TV series)',
    cast: ['Robert Hays', 'James Avery', 'Jim Cummings', 'Dorian Harewood'],
    description:
      'Tony Stark and his armored allies confront the Mandarin and other threats to his technology and the world.',
  },
  {
    slug: 'fantastic-four-1994-series',
    title: 'Fantastic Four',
    year: 1994,
    wikipediaTitle: 'Fantastic Four (1994 TV series)',
    cast: ['Beau Weaver', 'Lori Alan', 'Quinton Flynn', 'Chuck McCann'],
    description:
      'Reed Richards and his family face Doctor Doom, Galactus and other adversaries in adventures across Earth and the cosmos.',
  },
  {
    slug: 'spider-man-1994-series',
    title: 'Spider-Man: The Animated Series',
    year: 1994,
    wikipediaTitle: 'Spider-Man (1994 TV series)',
    cast: ['Christopher Daniel Barnes', 'Sara Ballantine', 'Edward Asner', 'Roscoe Lee Browne'],
    description:
      'Peter Parker navigates college, relationships and a web of criminal schemes while fighting to protect New York.',
  },
  {
    slug: 'ultraforce-series',
    title: 'Ultraforce',
    year: 1995,
    wikipediaTitle: 'Ultraforce',
    cast: ['Rod Wilson', 'Rino Romano', 'Catherine Disher'],
    description:
      'A team of Ultraverse heroes led by Hardcase responds to threats too powerful for any one member to stop.',
    collection: 'marvel-imprints',
    releaseNote: 'Based on the Malibu Comics team; separate from Marvel superhero continuity.',
  },
  {
    slug: 'the-incredible-hulk-1996-series',
    title: 'The Incredible Hulk',
    year: 1996,
    wikipediaTitle: 'The Incredible Hulk (1996 TV series)',
    cast: ['Neal McDonough', 'Lou Ferrigno', 'John Vernon', 'Genie Francis'],
    description:
      'Bruce Banner’s attempts to control the Hulk bring him into conflict with the military, the Leader and other gamma-powered beings.',
  },
  {
    slug: 'men-in-black-the-series',
    title: 'Men in Black: The Series',
    year: 1997,
    wikipediaTitle: 'Men in Black: The Series',
    cast: ['Keith Diamond', 'Ed O’Ross', 'Jennifer Lien', 'Charles Napier'],
    description:
      'Agents J and K investigate alien activity on Earth while protecting the secrecy of the Men in Black.',
    collection: 'marvel-imprints',
  },
  {
    slug: 'silver-surfer-series',
    title: 'Silver Surfer',
    year: 1998,
    wikipediaTitle: 'Silver Surfer (TV series)',
    cast: ['Paul Essiembre', 'James Blendick', 'Colin Fox'],
    description:
      'The Silver Surfer journeys through the cosmos to recover his past and resist the power of Galactus.',
  },
  {
    slug: 'spider-man-unlimited',
    title: 'Spider-Man Unlimited',
    year: 1999,
    wikipediaTitle: 'Spider-Man Unlimited',
    cast: ['Rino Romano', 'John Payne', 'Brian Drummond'],
    description:
      'Spider-Man travels to Counter-Earth and joins resistance fighters against the High Evolutionary’s oppressive society.',
  },
  {
    slug: 'the-avengers-united-they-stand',
    title: 'The Avengers: United They Stand',
    year: 1999,
    wikipediaTitle: 'The Avengers: United They Stand',
    cast: ['Rod Wilson', 'Linda Ballantyne', 'Ron Rubin', 'Martin Roach'],
    description:
      'Ant-Man leads an Avengers team that includes Wasp, Hawkeye, Vision and Falcon against threats such as Ultron.',
  },
  {
    slug: 'x-men-evolution',
    title: 'X-Men: Evolution',
    year: 2000,
    wikipediaTitle: 'X-Men: Evolution',
    cast: ['Kirby Morrow', 'Venus Terzo', 'Scott McNeil', 'Maggie Blue O’Hara'],
    description:
      'Young mutants attend high school while training with Professor Xavier and learning to live with their abilities.',
  },
  {
    slug: 'spider-man-the-new-animated-series',
    title: 'Spider-Man: The New Animated Series',
    year: 2003,
    wikipediaTitle: 'Spider-Man: The New Animated Series',
    cast: ['Neil Patrick Harris', 'Lisa Loeb', 'Ian Ziering'],
    description:
      'College student Peter Parker struggles to maintain his friendships while taking on dangerous enemies as Spider-Man.',
  },
  {
    slug: 'fantastic-four-worlds-greatest-heroes',
    title: 'Fantastic Four: World’s Greatest Heroes',
    year: 2006,
    wikipediaTitle: "Fantastic Four: World's Greatest Heroes",
    cast: ['Hiro Kanagawa', 'Lara Gilchrist', 'Christopher Jacot', 'Brian Dobson'],
    description:
      'The Fantastic Four balance life in the Baxter Building with encounters involving aliens, rival scientists and Doctor Doom.',
  },
  {
    slug: 'the-spectacular-spider-man',
    title: 'The Spectacular Spider-Man',
    year: 2008,
    wikipediaTitle: 'The Spectacular Spider-Man (TV series)',
    creator: 'Greg Weisman & Victor Cook',
    cast: ['Josh Keaton', 'Lacey Chabert', 'James Arnold Taylor'],
    description:
      'A teenage Peter Parker develops his identity as Spider-Man while friendships, school and a growing criminal network complicate his life.',
  },
  {
    slug: 'wolverine-and-the-x-men',
    title: 'Wolverine and the X-Men',
    year: 2008,
    wikipediaTitle: 'Wolverine and the X-Men (TV series)',
    cast: ['Steve Blum', 'Nolan North', 'Fred Tatasciore', 'Kari Wahlgren'],
    description:
      'Wolverine reunites the scattered X-Men to prevent a future in which mutants are hunted by Sentinels.',
    releaseNote:
      'First broadcast in 2008 in international markets; its US premiere followed in 2009.',
  },
  {
    slug: 'iron-man-armored-adventures',
    title: 'Iron Man: Armored Adventures',
    year: 2009,
    wikipediaTitle: 'Iron Man: Armored Adventures',
    cast: ['Adrian Petriw', 'Daniel Bacon', 'Anna Cummer'],
    description:
      'A teenage Tony Stark uses his armor to investigate his father’s disappearance while attending school with Rhodey and Pepper.',
  },
  {
    slug: 'the-super-hero-squad-show',
    title: 'The Super Hero Squad Show',
    year: 2009,
    wikipediaTitle: 'The Super Hero Squad Show',
    cast: ['Tom Kenny', 'Charlie Adler', 'Steve Blum', 'Travis Willingham'],
    description:
      'A comedic team of Marvel heroes protects Super Hero City from Doctor Doom and his villainous allies.',
  },
  {
    slug: 'the-avengers-earths-mightiest-heroes',
    title: 'The Avengers: Earth’s Mightiest Heroes',
    year: 2010,
    wikipediaTitle: "The Avengers: Earth's Mightiest Heroes",
    creator: 'Ciro Nieli, Joshua Fine & Christopher Yost',
    cast: ['Eric Loomis', 'Brian Bloom', 'Rick D. Wasserman', 'Fred Tatasciore'],
    description:
      'Earth’s heroes assemble after a mass supervillain escape and face threats from Hydra, alien empires and their own enemies.',
  },
  {
    slug: 'black-panther-animated-series',
    title: 'Black Panther',
    year: 2010,
    wikipediaTitle: 'Black Panther (TV series)',
    cast: ['Djimon Hounsou', 'Kerry Washington', 'Alfre Woodard'],
    description:
      'T’Challa defends Wakanda and its independence against a coordinated invasion by mercenaries and rival powers.',
    releaseNote: 'An animated miniseries adapting the Who Is the Black Panther? storyline.',
  },
  {
    slug: 'marvel-anime-iron-man',
    title: 'Marvel Anime: Iron Man',
    year: 2010,
    wikipediaTitle: 'Marvel Anime',
    posterRefresh: false,
    cast: ['Keiji Fujiwara', 'Tesshō Genda', 'Hiroaki Hirata'],
    description:
      'Tony Stark travels to Japan to develop an energy project but must confront a conspiracy involving his new armor.',
    releaseNote:
      'One of four distinct Marvel Anime productions. Principal cast listed is the original Japanese cast.',
  },
  {
    slug: 'marvel-anime-wolverine',
    title: 'Marvel Anime: Wolverine',
    year: 2011,
    wikipediaTitle: 'Marvel Anime',
    posterRefresh: false,
    cast: ['Rikiya Koyama', 'Fumiko Orikasa', 'Hidekatsu Shibata'],
    description:
      'Logan travels to Japan and Madripoor to rescue Mariko from a criminal organization and a forced marriage.',
    releaseNote:
      'A distinct Marvel Anime miniseries. Principal cast listed is the original Japanese cast.',
  },
  {
    slug: 'marvel-anime-x-men',
    title: 'Marvel Anime: X-Men',
    year: 2011,
    wikipediaTitle: 'Marvel Anime',
    posterRefresh: false,
    cast: ['Toshiyuki Morikawa', 'Rikiya Koyama', 'Atsuko Tanaka'],
    description:
      'The X-Men travel to Japan to investigate a missing mutant and uncover a threat targeting their kind.',
    releaseNote:
      'A distinct Marvel Anime miniseries. Principal cast listed is the original Japanese cast.',
  },
  {
    slug: 'marvel-anime-blade',
    title: 'Marvel Anime: Blade',
    year: 2011,
    wikipediaTitle: 'Marvel Anime',
    posterRefresh: false,
    cast: ['Akio Ōtsuka', 'Maaya Sakamoto', 'Tsutomu Isobe'],
    description:
      'Blade hunts Deacon Frost and a vampire organization whose influence stretches across Asia.',
    releaseNote:
      'A distinct Marvel Anime miniseries. Principal cast listed is the original Japanese cast.',
  },
  {
    slug: 'ultimate-spider-man-series',
    title: 'Ultimate Spider-Man',
    year: 2012,
    wikipediaTitle: 'Ultimate Spider-Man (TV series)',
    cast: ['Drake Bell', 'Chi McBride', 'Ogie Banks', 'Greg Cipes'],
    description:
      'Spider-Man trains with S.H.I.E.L.D. and a team of young heroes while trying to become a more responsible crimefighter.',
  },
  {
    slug: 'avengers-assemble-series',
    title: 'Avengers Assemble',
    year: 2013,
    wikipediaTitle: 'Avengers Assemble (TV series)',
    cast: ['Adrian Pasdar', 'Roger Craig Smith', 'Travis Willingham', 'Fred Tatasciore'],
    description:
      'Iron Man brings the Avengers together to confront powerful enemies and protect the world as a coordinated team.',
  },
  {
    slug: 'hulk-and-the-agents-of-smash',
    title: 'Hulk and the Agents of S.M.A.S.H.',
    year: 2013,
    wikipediaTitle: 'Hulk and the Agents of S.M.A.S.H.',
    cast: ['Fred Tatasciore', 'Clancy Brown', 'Eliza Dushku', 'Seth Green'],
    description:
      'Hulk, She-Hulk, Red Hulk, Skaar and A-Bomb form a team of gamma-powered heroes whose adventures are recorded for a web show.',
  },
  {
    slug: 'marvel-disk-wars-the-avengers',
    title: 'Marvel Disk Wars: The Avengers',
    year: 2014,
    wikipediaTitle: 'Marvel Disk Wars: The Avengers',
    cast: ['Mitsuki Saiga', 'Yūichi Iguchi', 'Eiji Hanawa'],
    description:
      'Five children help the Avengers fight villains after a new technology traps heroes and criminals inside digital disks.',
    releaseNote: 'Japanese anime; principal cast listed is the original Japanese cast.',
  },
  {
    slug: 'guardians-of-the-galaxy-series',
    title: 'Guardians of the Galaxy',
    year: 2015,
    wikipediaTitle: 'Guardians of the Galaxy (TV series)',
    cast: [
      'Will Friedle',
      'Vanessa Marshall',
      'David Sobolov',
      'Trevor Devall',
      'Kevin Michael Richardson',
    ],
    description:
      'Star-Lord and his unlikely found family travel the galaxy in pursuit of a powerful artifact and new adventures.',
  },
  {
    slug: 'marvel-future-avengers',
    title: 'Marvel Future Avengers',
    year: 2017,
    wikipediaTitle: 'Marvel Future Avengers',
    cast: ['Aki Kanada', 'Juri Kimura', 'Atsushi Tamaru'],
    description:
      'Three children escape Hydra and train with the Avengers to learn how to use their altered abilities.',
    releaseNote: 'Japanese anime; principal cast listed is the original Japanese cast.',
  },
  {
    slug: 'spider-man-2017-series',
    title: 'Marvel’s Spider-Man',
    year: 2017,
    wikipediaTitle: 'Spider-Man (2017 TV series)',
    cast: ['Robbie Daymond', 'Max Mittelman', 'Nadji Jeter', 'Laura Bailey'],
    description:
      'Peter Parker begins life at Horizon High while learning how to use his powers and confront a growing roster of villains.',
  },
  {
    slug: 'big-hero-6-the-series',
    title: 'Big Hero 6: The Series',
    year: 2017,
    wikipediaTitle: 'Big Hero 6: The Series',
    creator: 'Mark McCorkle & Bob Schooley',
    cast: ['Ryan Potter', 'Scott Adsit', 'Jamie Chung', 'Genesis Rodriguez'],
    description:
      'Hiro, Baymax and their friends protect San Fransokyo while balancing scientific study and everyday responsibilities.',
    releaseNote:
      'A continuation of Disney’s film, whose characters originated in Marvel comics; not an MCU series.',
  },
  {
    slug: 'modok',
    title: 'M.O.D.O.K.',
    year: 2021,
    wikipediaTitle: 'M.O.D.O.K. (TV series)',
    creator: 'Jordan Blum & Patton Oswalt',
    cast: ['Patton Oswalt', 'Aimee Garcia', 'Ben Schwartz', 'Melissa Fumero'],
    description:
      'A struggling supervillain tries to keep his family and his evil organization together in a stop-motion comedy.',
  },
  {
    slug: 'what-if',
    title: 'What If...?',
    year: 2021,
    wikipediaTitle: 'What If...? (TV series)',
    posterPageTitle: 'What If...? season 1',
    creator: 'A. C. Bradley',
    cast: ['Jeffrey Wright', 'Hayley Atwell', 'Chadwick Boseman'],
    description:
      'The Watcher explores alternate realities in which familiar Marvel events unfold in unexpected ways.',
    releaseNote:
      'An anthology with a rotating voice cast; the listed performers are representative, not the complete ensemble.',
  },
  {
    slug: 'hit-monkey',
    title: 'Hit-Monkey',
    year: 2021,
    wikipediaTitle: 'Hit-Monkey (TV series)',
    creator: 'Will Speck & Josh Gordon',
    cast: ['Fred Tatasciore', 'Jason Sudeikis', 'Olivia Munn', 'George Takei'],
    description:
      'A Japanese snow monkey and the ghost of an assassin pursue a violent path through the criminal underworld.',
  },
  {
    slug: 'spidey-and-his-amazing-friends',
    title: 'Spidey and His Amazing Friends',
    year: 2021,
    wikipediaTitle: 'Spidey and His Amazing Friends',
    cast: ['Benjamin Valic', 'Lily Sanfelippo', 'Jakari Fraser'],
    description:
      'Young versions of Peter Parker, Gwen Stacy and Miles Morales learn teamwork while helping their neighborhood.',
  },
  {
    slug: 'super-crooks',
    title: 'Super Crooks',
    year: 2021,
    wikipediaTitle: 'Super Crooks',
    cast: ['Kenjirō Tsuda', 'Maaya Sakamoto', 'Hiroshi Yanaka'],
    description:
      'A small-time supervillain assembles a crew for a heist aimed at a powerful criminal rival.',
    collection: 'marvel-imprints',
    releaseNote:
      'Based on the Icon comic by Mark Millar and Leinil Francis Yu. Original Japanese voice cast is listed.',
  },
  {
    slug: 'i-am-groot',
    title: 'I Am Groot',
    year: 2022,
    wikipediaTitle: 'I Am Groot',
    creator: 'Kirsten Lepore',
    cast: ['Vin Diesel', 'Bradley Cooper', 'Jeffrey Wright'],
    description:
      'Baby Groot explores strange places, meets new creatures and causes mischief in a collection of animated shorts.',
  },
  {
    slug: 'baymax',
    title: 'Baymax!',
    year: 2022,
    wikipediaTitle: 'Baymax!',
    creator: 'Don Hall',
    cast: ['Scott Adsit', 'Ryan Potter', 'Maya Rudolph'],
    description:
      'The healthcare robot Baymax helps residents of San Fransokyo with problems that require both care and patience.',
  },
  {
    slug: 'moon-girl-and-devil-dinosaur',
    title: 'Moon Girl and Devil Dinosaur',
    year: 2023,
    wikipediaTitle: 'Moon Girl and Devil Dinosaur',
    creator: 'Steve Loter, Jeffrey M. Howard & Kate Kondell',
    cast: ['Diamond White', 'Fred Tatasciore', 'Alfre Woodard', 'Libé Barer'],
    description:
      'Young inventor Lunella Lafayette teams with a dinosaur to protect her New York neighborhood.',
  },
  {
    slug: 'x-men-97',
    title: 'X-Men ’97',
    year: 2024,
    wikipediaTitle: "X-Men '97",
    posterPageTitle: "X-Men '97 season 1",
    creator: 'Beau DeMayo',
    cast: ['Cal Dodd', 'Lenore Zann', 'Alison Sealy-Smith', 'Ray Chase', 'Jennifer Hale'],
    description:
      'The X-Men face new political and personal challenges in a continuation of the 1990s animated series.',
  },
  {
    slug: 'your-friendly-neighborhood-spider-man',
    title: 'Your Friendly Neighborhood Spider-Man',
    year: 2025,
    wikipediaTitle: 'Your Friendly Neighborhood Spider-Man',
    creator: 'Jeff Trammell',
    cast: ['Hudson Thames', 'Colman Domingo', 'Kari Wahlgren', 'Grace Song'],
    description:
      'A teenage Peter Parker learns to be Spider-Man in an alternate Marvel timeline shaped by new friends and mentors.',
  },
  {
    slug: 'eyes-of-wakanda',
    title: 'Eyes of Wakanda',
    year: 2025,
    wikipediaTitle: 'Eyes of Wakanda',
    creator: 'Todd Harris',
    cast: ['Winnie Harlow', 'Cress Williams', 'Lynn Whitfield', 'Anika Noni Rose'],
    description:
      'Wakandan warriors undertake dangerous missions across history to recover vibranium artifacts and protect their nation’s secrets.',
  },
  {
    slug: 'marvel-zombies',
    title: 'Marvel Zombies',
    year: 2025,
    wikipediaTitle: 'Marvel Zombies (TV series)',
    creator: 'Zeb Wells',
    cast: ['Iman Vellani', 'Hailee Steinfeld', 'Florence Pugh', 'Simu Liu'],
    description:
      'Surviving heroes search for hope in a Marvel reality overrun by a zombie outbreak.',
    releaseNote: 'An adult animated continuation of the zombie reality introduced in What If...?.',
  },
  {
    slug: 'iron-man-and-his-awesome-friends',
    title: 'Iron Man and His Awesome Friends',
    year: 2025,
    wikipediaTitle: 'Iron Man and His Awesome Friends',
    cast: ['Mason Blomberg', 'Kapri Ladd', 'Aidyn Ahn'],
    description:
      'Young Tony Stark, Riri Williams and Amadeus Cho use invention and teamwork to solve problems and protect their city.',
  },
]);
