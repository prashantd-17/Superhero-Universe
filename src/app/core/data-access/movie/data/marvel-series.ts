import { series } from './series-helpers';

/** Released live-action Marvel television, including legacy shows and publisher imprints. */
export const MARVEL_SERIES = series('marvel', 'live-action', [
  {
    slug: 'spidey-super-stories',
    title: 'Spidey Super Stories',
    year: 1974,
    wikipediaTitle: 'Spidey Super Stories',
    cast: ['Danny Seagren', 'Morgan Freeman', 'Jim Boyd'],
    description:
      'Spider-Man helps everyday people in short comic-book adventures designed to encourage young viewers to read.',
    releaseNote:
      'Live-action segments within The Electric Company, rather than a separate full-length dramatic series.',
  },
  {
    slug: 'the-amazing-spider-man-1977',
    title: 'The Amazing Spider-Man',
    year: 1977,
    wikipediaTitle: 'The Amazing Spider-Man (TV series)',
    creator: 'Alvin Boretz',
    cast: ['Nicholas Hammond', 'Robert F. Simon', 'Chip Fields', 'Ellen Bry'],
    description:
      'Photographer Peter Parker uses his spider-like abilities to investigate crimes while keeping his masked identity secret.',
    releaseNote:
      'The pilot first aired in 1977; regular episodes followed in 1978. Distinct from the animated adaptations.',
  },
  {
    slug: 'the-incredible-hulk-series',
    title: 'The Incredible Hulk',
    year: 1977,
    wikipediaTitle: 'The Incredible Hulk (1978 TV series)',
    creator: 'Kenneth Johnson',
    cast: ['Bill Bixby', 'Lou Ferrigno', 'Jack Colvin'],
    description:
      'Scientist David Banner travels under assumed names in search of a cure for the transformations that turn him into the Hulk.',
    releaseNote:
      'The television pilot premiered in November 1977; the weekly series began in March 1978.',
  },
  {
    slug: 'spider-man-japanese-series',
    title: 'Spider-Man (Japanese series)',
    year: 1978,
    wikipediaTitle: 'Spider-Man (Japanese TV series)',
    cast: ['Shinji Tōdō', 'Mitsuo Andō', 'Yukie Kagawa'],
    description:
      'Motorcycle racer Takuya Yamashiro inherits alien technology and fights the Iron Cross Army with the giant robot Leopardon.',
    releaseNote: 'Toei’s licensed Japanese adaptation, with its own hero and continuity.',
  },
  {
    slug: 'battle-fever-j',
    title: 'Battle Fever J',
    year: 1979,
    wikipediaTitle: 'Battle Fever J',
    cast: ['Hironori Tanioka', 'Yukio Itō', 'Narimitsu Kurachi'],
    description:
      'An international team of costumed agents fights the secret Egos organization with specialized skills and a giant robot.',
    releaseNote:
      'A Toei/Marvel collaboration in the Super Sentai franchise, not an MCU or direct Avengers adaptation.',
  },
  {
    slug: 'denshi-sentai-denjiman',
    title: 'Denshi Sentai Denjiman',
    year: 1980,
    wikipediaTitle: 'Denshi Sentai Denjiman',
    cast: ['Shinichi Yūki', 'Kenji Ōba', 'Eiichi Tsuyama'],
    description:
      'Five young people wield technology from the lost Denzi civilization to defend Earth against the Vader Clan.',
    releaseNote:
      'Produced during Toei’s collaboration with Marvel; part of Super Sentai, not Marvel superhero continuity.',
  },
  {
    slug: 'taiyo-sentai-sun-vulcan',
    title: 'Taiyo Sentai Sun Vulcan',
    year: 1981,
    wikipediaTitle: 'Taiyo Sentai Sun Vulcan',
    cast: ['Ryūsuke Kawasaki', 'Kinya Sugi', 'Asao Kobayashi'],
    description:
      'Three specialists become Sun Vulcan to defend the world against the machine empire Black Magma.',
    releaseNote:
      'A Toei/Marvel collaboration in the Super Sentai franchise, outside Marvel superhero continuity.',
  },
  {
    slug: 'night-man',
    title: 'Night Man',
    year: 1997,
    wikipediaTitle: 'Night Man (TV series)',
    creator: 'Glen A. Larson',
    cast: ['Matt McColm', 'Earl Holliman', 'Derek Webster'],
    description:
      'Jazz musician Johnny Domino develops an ability to sense evil thoughts and uses advanced equipment to fight crime.',
    collection: 'marvel-imprints',
    releaseNote: 'Based on the Malibu/Ultraverse comic. Not an MCU series.',
  },
  {
    slug: 'mutant-x',
    title: 'Mutant X',
    year: 2001,
    wikipediaTitle: 'Mutant X (TV series)',
    creator: 'Avi Arad',
    cast: ['John Shea', 'Victoria Pratt', 'Victor Webster', 'Forbes March', 'Lauren Lee Smith'],
    description:
      'A team of people altered by genetic experiments protects other new mutants from the organization pursuing them.',
    releaseNote:
      'An original Marvel-produced television property; it is not an adaptation of the X-Men comic or film continuity.',
  },
  {
    slug: 'blade-the-series',
    title: 'Blade: The Series',
    year: 2006,
    wikipediaTitle: 'Blade: The Series',
    creator: 'David S. Goyer',
    cast: ['Sticky Fingaz', 'Jill Wagner', 'Neil Jackson', 'Jessica Gower'],
    description:
      'Blade teams with a woman drawn into the vampire world to investigate a powerful vampire house in Detroit.',
  },
  {
    slug: 'painkiller-jane',
    title: 'Painkiller Jane',
    year: 2007,
    wikipediaTitle: 'Painkiller Jane (TV series)',
    creator: 'Gil Grant',
    cast: ['Kristanna Loken', 'Rob Stewart', 'Noah Danby'],
    description:
      'An agent with extraordinary healing abilities joins a covert team tracking people with dangerous neurological powers.',
    collection: 'marvel-imprints',
    releaseNote: 'Based on the creator-owned comic, also published through Marvel’s Icon imprint.',
  },
  {
    slug: 'agents-of-shield',
    title: 'Agents of S.H.I.E.L.D.',
    year: 2013,
    wikipediaTitle: 'Agents of S.H.I.E.L.D.',
    posterPageTitle: 'Agents of S.H.I.E.L.D. season 1',
    creator: 'Joss Whedon, Jed Whedon & Maurissa Tancharoen',
    cast: [
      'Clark Gregg',
      'Ming-Na Wen',
      'Chloe Bennet',
      'Iain De Caestecker',
      'Elizabeth Henstridge',
    ],
    description:
      'Phil Coulson leads a team of agents investigating extraordinary threats, conspiracies and people with emerging powers.',
  },
  {
    slug: 'agent-carter',
    title: 'Agent Carter',
    year: 2015,
    wikipediaTitle: 'Agent Carter (TV series)',
    posterPageTitle: 'Agent Carter season 1',
    creator: 'Christopher Markus & Stephen McFeely',
    cast: ['Hayley Atwell', 'James D’Arcy', 'Enver Gjokaj', 'Chad Michael Murray'],
    description:
      'Peggy Carter balances postwar intelligence work with a secret mission to clear Howard Stark’s name.',
  },
  {
    slug: 'jessica-jones',
    title: 'Jessica Jones',
    year: 2015,
    wikipediaTitle: 'Jessica Jones (TV series)',
    posterPageTitle: 'Jessica Jones season 1',
    creator: 'Melissa Rosenberg',
    cast: ['Krysten Ritter', 'Rachael Taylor', 'Eka Darville', 'Carrie-Anne Moss', 'David Tennant'],
    description:
      'A private investigator with superhuman strength confronts the abuse and dangerous people connected to her past.',
  },
  {
    slug: 'powers',
    title: 'Powers',
    year: 2015,
    wikipediaTitle: 'Powers (American TV series)',
    creator: 'Charlie Huston',
    cast: ['Sharlto Copley', 'Susan Heyward', 'Eddie Izzard'],
    description:
      'Two detectives investigate crimes involving superpowered people in a world where celebrity and extraordinary abilities collide.',
    collection: 'marvel-imprints',
    releaseNote:
      'Based on the creator-owned comic published by Image and later Marvel’s Icon imprint.',
  },
  {
    slug: 'luke-cage',
    title: 'Luke Cage',
    year: 2016,
    wikipediaTitle: 'Luke Cage (TV series)',
    posterPageTitle: 'Luke Cage season 1',
    creator: 'Cheo Hodari Coker',
    cast: ['Mike Colter', 'Simone Missick', 'Alfre Woodard', 'Theo Rossi', 'Mahershala Ali'],
    description:
      'A man with unbreakable skin tries to rebuild his life in Harlem while confronting corruption and organized crime.',
  },
  {
    slug: 'agents-of-shield-slingshot',
    title: 'Agents of S.H.I.E.L.D.: Slingshot',
    year: 2016,
    wikipediaTitle: 'Agents of S.H.I.E.L.D.: Slingshot',
    cast: ['Natalia Cordova-Buckley', 'Clark Gregg', 'Chloe Bennet'],
    description:
      'Elena Rodriguez takes on a personal mission while navigating the rules governing people with Inhuman abilities.',
    releaseNote: 'A six-episode live-action web miniseries connected to Agents of S.H.I.E.L.D.',
  },
  {
    slug: 'iron-fist',
    title: 'Iron Fist',
    year: 2017,
    wikipediaTitle: 'Iron Fist (TV series)',
    posterPageTitle: 'Iron Fist season 1',
    creator: 'Scott Buck',
    cast: ['Finn Jones', 'Jessica Henwick', 'Jessica Stroup', 'Tom Pelphrey'],
    description:
      'Danny Rand returns to New York with extraordinary martial-arts training and a duty tied to the mystical Iron Fist.',
  },
  {
    slug: 'the-defenders',
    title: 'The Defenders',
    year: 2017,
    wikipediaTitle: 'The Defenders (miniseries)',
    creator: 'Douglas Petrie & Marco Ramirez',
    cast: ['Charlie Cox', 'Krysten Ritter', 'Mike Colter', 'Finn Jones', 'Sigourney Weaver'],
    description:
      'Daredevil, Jessica Jones, Luke Cage and Iron Fist reluctantly unite against a conspiracy threatening New York.',
  },
  {
    slug: 'the-punisher-series',
    title: 'The Punisher',
    year: 2017,
    wikipediaTitle: 'The Punisher (TV series)',
    posterPageTitle: 'The Punisher season 1',
    creator: 'Steve Lightfoot',
    cast: ['Jon Bernthal', 'Ben Barnes', 'Amber Rose Revah', 'Ebon Moss-Bachrach'],
    description:
      'Frank Castle uncovers a military conspiracy while pursuing the people connected to his family’s deaths.',
  },
  {
    slug: 'legion',
    title: 'Legion',
    year: 2017,
    wikipediaTitle: 'Legion (TV series)',
    posterPageTitle: 'Legion season 1',
    creator: 'Noah Hawley',
    cast: ['Dan Stevens', 'Rachel Keller', 'Aubrey Plaza', 'Jean Smart'],
    description:
      'David Haller discovers that the disturbances shaping his reality may be linked to immense mutant powers.',
  },
  {
    slug: 'the-gifted',
    title: 'The Gifted',
    year: 2017,
    wikipediaTitle: 'The Gifted (American TV series)',
    creator: 'Matt Nix',
    cast: ['Stephen Moyer', 'Amy Acker', 'Sean Teale', 'Jamie Chung', 'Emma Dumont'],
    description:
      'A family goes on the run after discovering its children are mutants and finds refuge in an underground resistance.',
  },
  {
    slug: 'inhumans',
    title: 'Inhumans',
    year: 2017,
    wikipediaTitle: 'Inhumans (TV series)',
    creator: 'Scott Buck',
    cast: ['Anson Mount', 'Serinda Swan', 'Iwan Rheon', 'Ken Leung'],
    description:
      'A coup divides the Inhuman royal family and forces Black Bolt and his allies to seek safety on Earth.',
  },
  {
    slug: 'runaways',
    title: 'Runaways',
    year: 2017,
    wikipediaTitle: 'Runaways (TV series)',
    creator: 'Josh Schwartz & Stephanie Savage',
    cast: [
      'Rhenzy Feliz',
      'Lyrica Okano',
      'Virginia Gardner',
      'Ariela Barer',
      'Gregg Sulkin',
      'Allegra Acosta',
    ],
    description:
      'Six teenagers discover that their parents belong to a sinister organization and uncover abilities and secrets of their own.',
  },
  {
    slug: 'cloak-and-dagger',
    title: 'Cloak & Dagger',
    year: 2018,
    wikipediaTitle: 'Cloak & Dagger (TV series)',
    creator: 'Joe Pokaski',
    cast: ['Olivia Holt', 'Aubrey Joseph', 'Gloria Reuben', 'Emma Lahana'],
    description:
      'Two New Orleans teenagers discover linked powers of light and darkness while investigating the tragedy connecting their lives.',
  },
  {
    slug: 'helstrom',
    title: 'Helstrom',
    year: 2020,
    wikipediaTitle: 'Helstrom (TV series)',
    creator: 'Paul Zbyszewski',
    cast: ['Tom Austen', 'Sydney Lemmon', 'Elizabeth Marvel', 'Robert Wisdom'],
    description:
      'Siblings Daimon and Ana Helstrom confront supernatural threats and the disturbing legacy of their family.',
    releaseNote:
      'A standalone Marvel horror adaptation, not presented here as part of MCU continuity.',
  },
  {
    slug: 'wandavision',
    title: 'WandaVision',
    year: 2021,
    wikipediaTitle: 'WandaVision',
    creator: 'Jac Schaeffer',
    cast: ['Elizabeth Olsen', 'Paul Bettany', 'Kathryn Hahn', 'Teyonah Parris'],
    description:
      'Wanda Maximoff and Vision live an apparently idyllic sitcom life whose changing reality conceals a painful mystery.',
  },
  {
    slug: 'the-falcon-and-the-winter-soldier',
    title: 'The Falcon and the Winter Soldier',
    year: 2021,
    wikipediaTitle: 'The Falcon and the Winter Soldier',
    creator: 'Malcolm Spellman',
    cast: ['Anthony Mackie', 'Sebastian Stan', 'Wyatt Russell', 'Daniel Brühl', 'Emily VanCamp'],
    description:
      'Sam Wilson and Bucky Barnes confront a fractured post-Blip world and the responsibilities associated with Captain America’s shield.',
  },
  {
    slug: 'hawkeye',
    title: 'Hawkeye',
    year: 2021,
    wikipediaTitle: 'Hawkeye (miniseries)',
    creator: 'Jonathan Igla',
    cast: ['Jeremy Renner', 'Hailee Steinfeld', 'Vera Farmiga', 'Alaqua Cox', 'Florence Pugh'],
    description:
      'Clint Barton teams with young archer Kate Bishop to confront enemies from his past during Christmas in New York.',
  },
  {
    slug: 'moon-knight',
    title: 'Moon Knight',
    year: 2022,
    wikipediaTitle: 'Moon Knight (miniseries)',
    creator: 'Jeremy Slater',
    cast: ['Oscar Isaac', 'May Calamawy', 'Ethan Hawke', 'F. Murray Abraham'],
    description:
      'Steven Grant and Marc Spector navigate their shared life and a conflict involving the Egyptian moon god Khonshu.',
  },
  {
    slug: 'ms-marvel',
    title: 'Ms. Marvel',
    year: 2022,
    wikipediaTitle: 'Ms. Marvel (miniseries)',
    creator: 'Bisha K. Ali',
    cast: ['Iman Vellani', 'Matt Lintz', 'Zenobia Shroff', 'Mohan Kapur'],
    description:
      'Jersey City teenager Kamala Khan gains extraordinary abilities while exploring her family’s history and her own place in the world.',
  },
  {
    slug: 'she-hulk-attorney-at-law',
    title: 'She-Hulk: Attorney at Law',
    year: 2022,
    wikipediaTitle: 'She-Hulk: Attorney at Law',
    creator: 'Jessica Gao',
    cast: ['Tatiana Maslany', 'Ginger Gonzaga', 'Jameela Jamil', 'Renée Elise Goldsberry'],
    description:
      'Attorney Jennifer Walters handles cases involving superhuman clients while adjusting to her own transformation into She-Hulk.',
  },
  {
    slug: 'secret-invasion',
    title: 'Secret Invasion',
    year: 2023,
    wikipediaTitle: 'Secret Invasion (miniseries)',
    creator: 'Kyle Bradstreet',
    cast: [
      'Samuel L. Jackson',
      'Ben Mendelsohn',
      'Emilia Clarke',
      'Olivia Colman',
      'Kingsley Ben-Adir',
    ],
    description:
      'Nick Fury returns to Earth as a faction of shapeshifting Skrulls infiltrates positions of power.',
  },
  {
    slug: 'echo',
    title: 'Echo',
    year: 2024,
    wikipediaTitle: 'Echo (miniseries)',
    creator: 'Marion Dayre',
    cast: ['Alaqua Cox', 'Chaske Spencer', 'Tantoo Cardinal', 'Graham Greene', 'Vincent D’Onofrio'],
    description:
      'Maya Lopez returns to Oklahoma, reconnecting with her family and Choctaw heritage as Wilson Fisk’s influence follows her.',
  },
  {
    slug: 'agatha-all-along',
    title: 'Agatha All Along',
    year: 2024,
    wikipediaTitle: 'Agatha All Along',
    creator: 'Jac Schaeffer',
    cast: [
      'Kathryn Hahn',
      'Joe Locke',
      'Sasheer Zamata',
      'Ali Ahn',
      'Patti LuPone',
      'Aubrey Plaza',
    ],
    description:
      'Agatha Harkness gathers an unlikely coven for a journey along the Witches’ Road in an attempt to regain her power.',
  },
  {
    slug: 'daredevil-born-again',
    title: 'Daredevil: Born Again',
    year: 2025,
    wikipediaTitle: 'Daredevil: Born Again',
    posterPageTitle: 'Daredevil: Born Again season 1',
    creator: 'Dario Scardapane, Matt Corman & Chris Ord',
    cast: [
      'Charlie Cox',
      'Vincent D’Onofrio',
      'Margarita Levieva',
      'Deborah Ann Woll',
      'Jon Bernthal',
    ],
    description:
      'Matt Murdock’s legal work and masked identity collide with Wilson Fisk’s pursuit of political power in New York.',
  },
  {
    slug: 'ironheart',
    title: 'Ironheart',
    year: 2025,
    wikipediaTitle: 'Ironheart (miniseries)',
    creator: 'Chinaka Hodge',
    cast: ['Dominique Thorne', 'Anthony Ramos', 'Lyric Ross', 'Alden Ehrenreich'],
    description:
      'Young inventor Riri Williams returns to Chicago, where her advanced armor brings her into a conflict between technology and magic.',
  },
  {
    slug: 'wonder-man',
    title: 'Wonder Man',
    year: 2026,
    wikipediaTitle: 'Wonder Man (TV series)',
    creator: 'Destin Daniel Cretton & Andrew Guest',
    cast: ['Yahya Abdul-Mateen II', 'Ben Kingsley', 'Arian Moayed'],
    description:
      'Actor Simon Williams pursues a career-changing superhero role while facing the complications of his own extraordinary abilities.',
  },
  {
    slug: 'spider-noir',
    title: 'Spider-Noir',
    year: 2026,
    wikipediaTitle: 'Spider-Noir',
    creator: 'Oren Uziel & Steve Lightfoot',
    cast: ['Nicolas Cage', 'Lamorne Morris', 'Li Jun Li', 'Brendan Gleeson'],
    description:
      'An aging private investigator in 1930s New York is drawn back toward his past as the city’s masked superhero.',
    releaseNote: 'A separate Sony-produced Spider-Man adaptation, not an MCU series.',
  },
]);
