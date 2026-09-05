import { series } from './series-helpers';

export const DC_SERIES = series('dc', 'live-action', [
  {
    slug: 'adventures-of-superman',
    title: 'Adventures of Superman',
    year: 1952,
    wikipediaTitle: 'Adventures of Superman (TV series)',
    cast: ['George Reeves', 'Jack Larson', 'John Hamilton', 'Noel Neill', 'Phyllis Coates'],
    description:
      'Reporter Clark Kent protects Metropolis as Superman while working alongside Lois Lane, Jimmy Olsen and Perry White.',
  },
  {
    slug: 'batman-1966-series',
    title: 'Batman',
    year: 1966,
    wikipediaTitle: 'Batman (TV series)',
    creator: 'William Dozier',
    cast: ['Adam West', 'Burt Ward', 'Alan Napier', 'Yvonne Craig'],
    description:
      'Batman and Robin protect Gotham from flamboyant villains in a colorful, comic-inspired adventure series.',
  },
  {
    slug: 'shazam-1974-series',
    title: 'Shazam!',
    year: 1974,
    wikipediaTitle: 'Shazam! (TV series)',
    cast: ['Michael Gray', 'Jackson Bostwick', 'John Davey', 'Les Tremayne'],
    description:
      'Billy Batson travels with Mentor and transforms into Captain Marvel to help people and resolve dangerous situations.',
  },
  {
    slug: 'the-secrets-of-isis',
    title: 'The Secrets of Isis',
    year: 1975,
    wikipediaTitle: 'The Secrets of Isis',
    cast: ['Joanna Cameron', 'Brian Cutler', 'Joanna Pang'],
    description:
      'Teacher Andrea Thomas uses an ancient amulet to become Isis and help people in trouble.',
    releaseNote:
      'A television-origin character later adapted in DC comics; included with the Shazam-era screen productions.',
  },
  {
    slug: 'wonder-woman-series',
    title: 'Wonder Woman',
    year: 1975,
    wikipediaTitle: 'Wonder Woman (TV series)',
    creator: 'Stanley Ralph Ross',
    cast: ['Lynda Carter', 'Lyle Waggoner', 'Beatrice Colen'],
    description:
      'Diana Prince uses her Amazon abilities to oppose spies, criminals and other threats as Wonder Woman.',
  },
  {
    slug: 'superboy-series',
    title: 'Superboy',
    year: 1988,
    wikipediaTitle: 'Superboy (TV series)',
    cast: ['John Haymes Newton', 'Gerard Christopher', 'Stacy Haiduk', 'Sherman Howard'],
    description:
      'A young Clark Kent develops his identity as Superboy while navigating college and later work investigating unusual events.',
    releaseNote:
      'John Haymes Newton plays Clark in the first season; Gerard Christopher takes over for seasons two through four.',
  },
  {
    slug: 'swamp-thing-1990-series',
    title: 'Swamp Thing',
    year: 1990,
    wikipediaTitle: 'Swamp Thing (1990 TV series)',
    creator: 'Joseph Stefano',
    cast: ['Dick Durock', 'Mark Lindsay Chapman', 'Kari Wuhrer'],
    description:
      'Alec Holland protects the swamp and its inhabitants while opposing Anton Arcane’s experiments and ambitions.',
  },
  {
    slug: 'the-flash-1990-series',
    title: 'The Flash',
    year: 1990,
    wikipediaTitle: 'The Flash (1990 TV series)',
    creator: 'Danny Bilson & Paul De Meo',
    cast: ['John Wesley Shipp', 'Amanda Pays', 'Alex Désert'],
    description:
      'Police scientist Barry Allen gains super-speed and becomes Central City’s masked protector.',
  },
  {
    slug: 'human-target-1992-series',
    title: 'Human Target',
    year: 1992,
    wikipediaTitle: 'Human Target (1992 TV series)',
    creator: 'Danny Bilson & Paul De Meo',
    cast: ['Rick Springfield', 'Sami Chester', 'Kirk Baltz'],
    description:
      'Christopher Chance assumes the identities of endangered clients to draw out and stop their would-be killers.',
  },
  {
    slug: 'lois-and-clark',
    title: 'Lois & Clark: The New Adventures of Superman',
    year: 1993,
    wikipediaTitle: 'Lois & Clark: The New Adventures of Superman',
    creator: 'Deborah Joy LeVine',
    cast: ['Dean Cain', 'Teri Hatcher', 'Lane Smith', 'John Shea'],
    description:
      'The professional and romantic partnership of Lois Lane and Clark Kent unfolds alongside Superman’s adventures in Metropolis.',
  },
  {
    slug: 'smallville',
    title: 'Smallville',
    year: 2001,
    wikipediaTitle: 'Smallville',
    posterPageTitle: 'Smallville season 1',
    creator: 'Alfred Gough & Miles Millar',
    cast: ['Tom Welling', 'Kristin Kreuk', 'Michael Rosenbaum', 'Erica Durance'],
    description:
      'Clark Kent grows from a Kansas teenager into a hero while discovering his alien heritage and the responsibilities of his powers.',
  },
  {
    slug: 'birds-of-prey-series',
    title: 'Birds of Prey',
    year: 2002,
    wikipediaTitle: 'Birds of Prey (TV series)',
    creator: 'Laeta Kalogridis',
    cast: ['Ashley Scott', 'Dina Meyer', 'Rachel Skarsten', 'Mia Sara'],
    description:
      'Huntress, Oracle and Dinah work together to protect New Gotham after Batman’s departure.',
  },
  {
    slug: 'human-target-2010-series',
    title: 'Human Target',
    year: 2010,
    wikipediaTitle: 'Human Target (2010 TV series)',
    creator: 'Jonathan E. Steinberg',
    cast: ['Mark Valley', 'Chi McBride', 'Jackie Earle Haley', 'Indira Varma'],
    description:
      'Security specialist Christopher Chance places himself beside endangered clients to identify and eliminate the threats against them.',
  },
  {
    slug: 'arrow',
    title: 'Arrow',
    year: 2012,
    wikipediaTitle: 'Arrow (TV series)',
    posterPageTitle: 'Arrow season 1',
    creator: 'Greg Berlanti, Marc Guggenheim & Andrew Kreisberg',
    cast: ['Stephen Amell', 'Katie Cassidy', 'David Ramsey', 'Emily Bett Rickards'],
    description:
      'Oliver Queen returns to his city after years missing and begins a campaign against crime as a hooded archer.',
  },
  {
    slug: 'gotham',
    title: 'Gotham',
    year: 2014,
    wikipediaTitle: 'Gotham (TV series)',
    posterPageTitle: 'Gotham season 1',
    creator: 'Bruno Heller',
    cast: ['Ben McKenzie', 'Donal Logue', 'David Mazouz', 'Robin Lord Taylor', 'Camren Bicondova'],
    description:
      'Detective James Gordon navigates Gotham’s corrupt institutions as a young Bruce Wayne and future supervillains find their paths.',
  },
  {
    slug: 'the-flash-series',
    title: 'The Flash',
    year: 2014,
    wikipediaTitle: 'The Flash (2014 TV series)',
    posterPageTitle: 'The Flash season 1',
    creator: 'Greg Berlanti, Andrew Kreisberg & Geoff Johns',
    cast: [
      'Grant Gustin',
      'Candice Patton',
      'Danielle Panabaker',
      'Carlos Valdes',
      'Jesse L. Martin',
    ],
    description:
      'Barry Allen and his S.T.A.R. Labs allies protect Central City from metahuman threats while exploring the mysteries of speed and time.',
  },
  {
    slug: 'constantine-series',
    title: 'Constantine',
    year: 2014,
    wikipediaTitle: 'Constantine (TV series)',
    creator: 'Daniel Cerone & David S. Goyer',
    cast: ['Matt Ryan', 'Angélica Celaya', 'Charles Halford', 'Harold Perrineau'],
    description:
      'Occult investigator John Constantine confronts demonic threats while searching for a measure of redemption.',
  },
  {
    slug: 'supergirl-series',
    title: 'Supergirl',
    year: 2015,
    wikipediaTitle: 'Supergirl (TV series)',
    posterPageTitle: 'Supergirl season 1',
    creator: 'Ali Adler, Greg Berlanti & Andrew Kreisberg',
    cast: ['Melissa Benoist', 'Chyler Leigh', 'David Harewood', 'Mehcad Brooks'],
    description:
      'Kara Danvers embraces her Kryptonian abilities and becomes a protector of National City.',
  },
  {
    slug: 'izombie',
    title: 'iZombie',
    year: 2015,
    wikipediaTitle: 'IZombie (TV series)',
    creator: 'Rob Thomas & Diane Ruggiero-Wright',
    cast: ['Rose McIver', 'Malcolm Goodwin', 'Rahul Kohli', 'David Anders'],
    description:
      'A medical resident turned zombie works in a morgue, using memories from the brains she consumes to help solve murders.',
    collection: 'dc-imprints',
  },
  {
    slug: 'legends-of-tomorrow',
    title: 'DC’s Legends of Tomorrow',
    year: 2016,
    wikipediaTitle: 'Legends of Tomorrow',
    posterPageTitle: 'Legends of Tomorrow season 1',
    creator: 'Greg Berlanti, Marc Guggenheim, Andrew Kreisberg & Phil Klemmer',
    cast: ['Caity Lotz', 'Brandon Routh', 'Arthur Darvill', 'Dominic Purcell'],
    description:
      'An unconventional team of heroes and rogues travels through time to repair threats to history.',
  },
  {
    slug: 'lucifer',
    title: 'Lucifer',
    year: 2016,
    wikipediaTitle: 'Lucifer (TV series)',
    posterPageTitle: 'Lucifer season 1',
    creator: 'Tom Kapinos',
    cast: ['Tom Ellis', 'Lauren German', 'D. B. Woodside', 'Lesley-Ann Brandt'],
    description:
      'The former ruler of Hell runs a Los Angeles nightclub and becomes involved in detective Chloe Decker’s investigations.',
    collection: 'dc-imprints',
  },
  {
    slug: 'preacher',
    title: 'Preacher',
    year: 2016,
    wikipediaTitle: 'Preacher (TV series)',
    creator: 'Sam Catlin, Evan Goldberg & Seth Rogen',
    cast: ['Dominic Cooper', 'Ruth Negga', 'Joseph Gilgun'],
    description:
      'A preacher with an extraordinary power sets out on a dangerous search for God alongside his former girlfriend and a vampire.',
    collection: 'dc-imprints',
  },
  {
    slug: 'powerless',
    title: 'Powerless',
    year: 2017,
    wikipediaTitle: 'Powerless (TV series)',
    creator: 'Ben Queen',
    cast: ['Vanessa Hudgens', 'Danny Pudi', 'Christina Kirk', 'Alan Tudyk'],
    description:
      'Employees at Wayne Security design products to protect ordinary people from the collateral damage of superhero battles.',
  },
  {
    slug: 'black-lightning',
    title: 'Black Lightning',
    year: 2018,
    wikipediaTitle: 'Black Lightning (TV series)',
    posterPageTitle: 'Black Lightning season 1',
    creator: 'Salim Akil',
    cast: ['Cress Williams', 'Nafessa Williams', 'China Anne McClain', 'Christine Adams'],
    description:
      'School principal Jefferson Pierce returns to his identity as Black Lightning to protect his family and community.',
  },
  {
    slug: 'krypton',
    title: 'Krypton',
    year: 2018,
    wikipediaTitle: 'Krypton (TV series)',
    creator: 'David S. Goyer & Damian Kindler',
    cast: ['Cameron Cuffe', 'Georgina Campbell', 'Shaun Sipos'],
    description:
      'Superman’s grandfather Seg-El confronts political upheaval and a threat to his planet’s future.',
  },
  {
    slug: 'titans',
    title: 'Titans',
    year: 2018,
    wikipediaTitle: 'Titans (2018 TV series)',
    posterPageTitle: 'Titans season 1',
    creator: 'Akiva Goldsman, Geoff Johns & Greg Berlanti',
    cast: ['Brenton Thwaites', 'Anna Diop', 'Teagan Croft', 'Ryan Potter'],
    description:
      'Dick Grayson leads a group of young heroes whose extraordinary abilities are intertwined with difficult personal histories.',
  },
  {
    slug: 'doom-patrol',
    title: 'Doom Patrol',
    year: 2019,
    wikipediaTitle: 'Doom Patrol (TV series)',
    posterPageTitle: 'Doom Patrol season 1',
    creator: 'Jeremy Carver',
    cast: ['Diane Guerrero', 'April Bowlby', 'Brendan Fraser', 'Matt Bomer', 'Joivan Wade'],
    description:
      'An unlikely family of traumatized outsiders confronts bizarre threats while trying to live with the accidents that transformed them.',
  },
  {
    slug: 'swamp-thing-2019-series',
    title: 'Swamp Thing',
    year: 2019,
    wikipediaTitle: 'Swamp Thing (2019 TV series)',
    creator: 'Gary Dauberman & Mark Verheiden',
    cast: ['Crystal Reed', 'Virginia Madsen', 'Andy Bean', 'Derek Mears'],
    description:
      'CDC doctor Abby Arcane returns to Louisiana to investigate an illness linked to a mysterious presence in the swamp.',
  },
  {
    slug: 'pennyworth',
    title: 'Pennyworth',
    year: 2019,
    wikipediaTitle: 'Pennyworth (TV series)',
    creator: 'Bruno Heller & Danny Cannon',
    cast: ['Jack Bannon', 'Ben Aldridge', 'Emma Paetz', 'Paloma Faith'],
    description:
      'Former soldier Alfred Pennyworth builds a security business in an alternate London and becomes involved with Thomas Wayne.',
  },
  {
    slug: 'batwoman',
    title: 'Batwoman',
    year: 2019,
    wikipediaTitle: 'Batwoman (TV series)',
    posterPageTitle: 'Batwoman season 1',
    creator: 'Caroline Dries',
    cast: ['Ruby Rose', 'Javicia Leslie', 'Rachel Skarsten', 'Meagan Tandy', 'Camrus Johnson'],
    description:
      'Kate Kane and later Ryan Wilder take up the Batwoman mantle to protect Gotham from new and familiar threats.',
    releaseNote:
      'Ruby Rose leads the first season as Kate Kane; Javicia Leslie leads seasons two and three as Ryan Wilder.',
  },
  {
    slug: 'stargirl',
    title: 'DC’s Stargirl',
    year: 2020,
    wikipediaTitle: 'Stargirl (TV series)',
    creator: 'Geoff Johns',
    cast: ['Brec Bassinger', 'Yvette Monreal', 'Anjelika Washington', 'Luke Wilson'],
    description:
      'Courtney Whitmore discovers the Cosmic Staff and inspires a new generation of the Justice Society of America.',
  },
  {
    slug: 'superman-and-lois',
    title: 'Superman & Lois',
    year: 2021,
    wikipediaTitle: 'Superman & Lois',
    posterPageTitle: 'Superman & Lois season 1',
    creator: 'Todd Helbing & Greg Berlanti',
    cast: ['Tyler Hoechlin', 'Elizabeth Tulloch', 'Alex Garfin', 'Jordan Elsass', 'Michael Bishop'],
    description:
      'Clark Kent and Lois Lane raise their teenage sons in Smallville while facing family challenges and threats that demand Superman’s attention.',
  },
  {
    slug: 'sweet-tooth',
    title: 'Sweet Tooth',
    year: 2021,
    wikipediaTitle: 'Sweet Tooth (TV series)',
    creator: 'Jim Mickle',
    cast: ['Christian Convery', 'Nonso Anozie', 'Adeel Akhtar', 'Stefania LaVie Owen'],
    description:
      'A deer-human hybrid child journeys through a world transformed by a pandemic in search of safety and answers.',
    collection: 'dc-imprints',
  },
  {
    slug: 'y-the-last-man',
    title: 'Y: The Last Man',
    year: 2021,
    wikipediaTitle: 'Y: The Last Man (TV series)',
    creator: 'Eliza Clark',
    cast: ['Diane Lane', 'Ashley Romans', 'Ben Schnetzer'],
    description:
      'Survivors rebuild society after a mysterious event kills almost every mammal with a Y chromosome.',
    collection: 'dc-imprints',
  },
  {
    slug: 'naomi',
    title: 'Naomi',
    year: 2022,
    wikipediaTitle: 'Naomi (TV series)',
    creator: 'Ava DuVernay & Jill Blankenship',
    cast: ['Kaci Walfall', 'Cranston Johnson', 'Alexander Wraith'],
    description:
      'A teenager investigates a supernatural event in her town and discovers unexpected truths about her origins.',
  },
  {
    slug: 'peacemaker',
    title: 'Peacemaker',
    year: 2022,
    wikipediaTitle: 'Peacemaker (TV series)',
    posterPageTitle: 'Peacemaker season 1',
    creator: 'James Gunn',
    cast: ['John Cena', 'Danielle Brooks', 'Freddie Stroma', 'Jennifer Holland'],
    description:
      'Christopher Smith joins a covert team on a dangerous mission while confronting the contradictions in his pursuit of peace.',
  },
  {
    slug: 'dmz',
    title: 'DMZ',
    year: 2022,
    wikipediaTitle: 'DMZ (miniseries)',
    creator: 'Roberto Patino',
    cast: ['Rosario Dawson', 'Benjamin Bratt', 'Hoon Lee'],
    description:
      'A medic searches for her son in a Manhattan demilitarized zone divided by a second American civil war.',
    collection: 'dc-imprints',
  },
  {
    slug: 'the-sandman',
    title: 'The Sandman',
    year: 2022,
    wikipediaTitle: 'The Sandman (TV series)',
    posterPageTitle: 'The Sandman season 1',
    creator: 'Neil Gaiman, David S. Goyer & Allan Heinberg',
    cast: ['Tom Sturridge', 'Boyd Holbrook', 'Vivienne Acheampong', 'Patton Oswalt'],
    description:
      'Dream escapes a long imprisonment and sets out to restore his realm and the balance between dreams and waking life.',
    collection: 'dc-imprints',
  },
  {
    slug: 'gotham-knights-series',
    title: 'Gotham Knights',
    year: 2023,
    wikipediaTitle: 'Gotham Knights (TV series)',
    creator: 'Natalie Abrams, Chad Fiveash & James Stoteraux',
    cast: ['Oscar Morgan', 'Olivia Rose Keegan', 'Navia Robinson', 'Misha Collins'],
    description:
      'Bruce Wayne’s adopted son and the children of Batman’s enemies form an alliance after being accused of his murder.',
  },
  {
    slug: 'bodies',
    title: 'Bodies',
    year: 2023,
    wikipediaTitle: 'Bodies (miniseries)',
    creator: 'Paul Tomalin',
    cast: ['Jacob Fortune-Lloyd', 'Shira Haas', 'Amaka Okafor', 'Kyle Soller', 'Stephen Graham'],
    description:
      'Four detectives in different eras investigate the same body and uncover a conspiracy connecting their timelines.',
    collection: 'dc-imprints',
  },
  {
    slug: 'the-penguin',
    title: 'The Penguin',
    year: 2024,
    wikipediaTitle: 'The Penguin (TV series)',
    creator: 'Lauren LeFranc',
    cast: ['Colin Farrell', 'Cristin Milioti', 'Rhenzy Feliz', 'Deirdre O’Connell'],
    description: 'Oz Cobb pursues control of Gotham’s underworld after the events of The Batman.',
  },
  {
    slug: 'dead-boy-detectives',
    title: 'Dead Boy Detectives',
    year: 2024,
    wikipediaTitle: 'Dead Boy Detectives (TV series)',
    creator: 'Steve Yockey',
    cast: ['George Rexstrew', 'Jayden Revri', 'Kassius Nelson', 'Yuyu Kitamura'],
    description:
      'Two teenage ghosts and a psychic investigate supernatural mysteries while evading forces from the afterlife.',
    collection: 'dc-imprints',
  },
  {
    slug: 'lanterns',
    title: 'Lanterns',
    year: 2026,
    wikipediaTitle: 'Lanterns (TV series)',
    creator: 'Chris Mundy, Damon Lindelof & Tom King',
    cast: ['Kyle Chandler', 'Aaron Pierre', 'Kelly Macdonald', 'Garret Dillahunt'],
    description:
      'Veteran Green Lantern Hal Jordan and new recruit John Stewart investigate a murder on Earth that leads toward a larger mystery.',
  },
]);
