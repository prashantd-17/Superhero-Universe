import { Movie } from '../../../models/movie';

/**
 * Manually curated movie/TV archive.
 *
 * Every entry is a real release with real credits. Descriptions and taglines
 * are our own editorial copy. Posters/backdrops are intentionally NOT
 * hotlinked — cards use designed typographic artwork (see spec: respect
 * licensing of external image providers).
 */
export const CURATED_MOVIES: readonly Movie[] = [
  /* --------------------------------- Marvel -------------------------------- */
  {
    slug: 'iron-man',
    title: 'Iron Man',
    year: 2008,
    kind: 'film',
    universe: 'marvel',
    director: 'Jon Favreau',
    cast: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Jeff Bridges', 'Terrence Howard'],
    tagline: 'It all starts here.',
    description:
      'Weapons industrialist Tony Stark is captured in Afghanistan and builds the first Iron Man armour from scrap — then returns home to redefine what a superhero film can be. The movie that launched the MCU.',
  },
  {
    slug: 'captain-america-the-first-avenger',
    title: 'Captain America: The First Avenger',
    year: 2011,
    kind: 'film',
    universe: 'marvel',
    director: 'Joe Johnston',
    cast: ['Chris Evans', 'Sebastian Stan', 'Hayley Atwell', 'Hugo Weaving'],
    tagline: 'One man can change the world.',
    description:
      'Rejected by the army for being too small, Steve Rogers volunteers for the Super Soldier program and ends up hunting the Red Skull and Hydra across World War II.',
  },
  {
    slug: 'the-avengers',
    title: 'The Avengers',
    year: 2012,
    kind: 'film',
    universe: 'marvel',
    director: 'Joss Whedon',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson', 'Chris Hemsworth', 'Mark Ruffalo', 'Jeremy Renner'],
    tagline: 'Earth’s mightiest heroes.',
    description:
      'Nick Fury assembles the Avengers to stop Loki and his Chitauri army from overrunning New York City. The first true team-up on screen.',
  },
  {
    slug: 'guardians-of-the-galaxy',
    title: 'Guardians of the Galaxy',
    year: 2014,
    kind: 'film',
    universe: 'marvel',
    director: 'James Gunn',
    cast: ['Chris Pratt', 'Zoe Saldana', 'Dave Bautista', 'Bradley Cooper', 'Vin Diesel'],
    tagline: 'Everyone starts from somewhere.',
    description:
      'A band of intergalactic misfits is forced to work together to stop Ronan the Accuser from using a weapon that could destroy the galaxy.',
  },
  {
    slug: 'captain-america-civil-war',
    title: 'Captain America: Civil War',
    year: 2016,
    kind: 'film',
    universe: 'marvel',
    director: 'Anthony & Joe Russo',
    cast: ['Chris Evans', 'Robert Downey Jr.', 'Sebastian Stan', 'Anthony Mackie', 'Daniel Brühl'],
    tagline: 'Divided they fall.',
    description:
      'The Sokovia Accords force the Avengers to choose sides: register with the UN under Iron Man’s banner, or stay free under Captain America’s. Friends become rivals.',
  },
  {
    slug: 'black-panther',
    title: 'Black Panther',
    year: 2018,
    kind: 'film',
    universe: 'marvel',
    director: 'Ryan Coogler',
    cast: ['Chadwick Boseman', 'Michael B. Jordan', 'Lupita Nyong’o', 'Danai Gurira'],
    tagline: 'A king rises.',
    description:
      'T’Challa returns home to Wakanda to take his place as king and defend the nation’s vibranium — and its future — from the ambition of Erik Killmonger.',
  },
  {
    slug: 'avengers-infinity-war',
    title: 'Avengers: Infinity War',
    year: 2018,
    kind: 'film',
    universe: 'marvel',
    director: 'Anthony & Joe Russo',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Chris Hemsworth', 'Josh Brolin', 'Zoe Saldana'],
    tagline: 'Endgame has begun.',
    description:
      'Thanos is close to acquiring all six Infinity Stones. The Avengers, the Guardians and the Titan’s son must stop him before he wipes out half of all life.',
  },
  {
    slug: 'avengers-endgame',
    title: 'Avengers: Endgame',
    year: 2019,
    kind: 'film',
    universe: 'marvel',
    director: 'Anthony & Joe Russo',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson', 'Josh Brolin', 'Chris Hemsworth'],
    tagline: 'A decade in the making.',
    description:
      'After the Snap, the surviving Avengers attempt an impossible time heist to bring back the trillions lost — closing out the Infinity Saga.',
  },
  {
    slug: 'spider-man-no-way-home',
    title: 'Spider-Man: No Way Home',
    year: 2021,
    kind: 'film',
    universe: 'marvel',
    director: 'Jon Watts',
    cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch', 'Willem Dafoe', 'Alfred Molina'],
    tagline: 'Home is where the adventure is.',
    description:
      'With his identity exposed, Peter Parker asks Doctor Strange for a spell to make the world forget — and accidentally tears open the multiverse.',
  },
  {
    slug: 'spider-man-across-the-spider-verse',
    title: 'Spider-Man: Across the Spider-Verse',
    year: 2023,
    kind: 'film',
    universe: 'marvel',
    director: 'Joaquim Dos Santos, Kemp Powers & Justin K. Thompson',
    cast: ['Shameik Moore', 'Hailee Steinfeld', 'Oscar Isaac', 'Jake Johnson'],
    tagline: 'One more.',
    description:
      'Miles Morales is pulled across dimensions to meet the other Spider-People — and challenges the idea that destiny is fixed. A visual landmark for the medium.',
  },
  {
    slug: 'deadpool-wolverine',
    title: 'Deadpool & Wolverine',
    year: 2024,
    kind: 'film',
    universe: 'marvel',
    director: 'Shawn Levy',
    cast: ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin', 'Matthew Macfadyen'],
    tagline: 'The best team ever assembled… probably.',
    description:
      'A time-displaced Deadpool meets a reluctant Wolverine in the ruined remains of his timeline — and drags him into the multiverse to save it.',
  },

  /* ----------------------------------- DC ---------------------------------- */
  {
    slug: 'batman-begins',
    title: 'Batman Begins',
    year: 2005,
    kind: 'film',
    universe: 'dc',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Michael Caine', 'Liam Neeson', 'Gary Oldman'],
    tagline: 'Fear is the key.',
    description:
      'Bruce Wayne returns to Gotham and becomes the Batman, taking on Carmine Falcone’s empire and the fear-wielding Scarecrow.',
  },
  {
    slug: 'the-dark-knight',
    title: 'The Dark Knight',
    year: 2008,
    kind: 'film',
    universe: 'dc',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Morgan Freeman'],
    tagline: 'Why so serious?',
    description:
      'Gotham faces its greatest threat: the Joker, a force of pure chaos who wants to watch the city burn. The definitive modern superhero film.',
  },
  {
    slug: 'the-dark-knight-rises',
    title: 'The Dark Knight Rises',
    year: 2012,
    kind: 'film',
    universe: 'dc',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Tom Hardy', 'Anne Hathaway', 'Gary Oldman'],
    tagline: 'The legend ends.',
    description:
      'Eight years later, Batman returns from self-imposed exile to stop Bane’s plan to destroy Gotham — and settle his final debt.',
  },
  {
    slug: 'man-of-steel',
    title: 'Man of Steel',
    year: 2013,
    kind: 'film',
    universe: 'dc',
    director: 'Zack Snyder',
    cast: ['Henry Cavill', 'Amy Adams', 'Michael Shannon', 'Kevin Costner'],
    tagline: 'Hope returns.',
    description:
      'Clark Kent grapples with his Kryptonian heritage and the responsibilities of his powers as General Zod closes in on Earth.',
  },
  {
    slug: 'batman-v-superman-dawn-of-justice',
    title: 'Batman v Superman: Dawn of Justice',
    year: 2016,
    kind: 'film',
    universe: 'dc',
    director: 'Zack Snyder',
    cast: ['Ben Affleck', 'Henry Cavill', 'Gal Gadot', 'Jesse Eisenberg'],
    tagline: 'Hope. Fear. Which will you choose?',
    description:
      'Distrust of Superman’s growing power leads Batman to take him down — while Lex Luthor manipulates both men into unleashing Doomsday.',
  },
  {
    slug: 'wonder-woman',
    title: 'Wonder Woman',
    year: 2017,
    kind: 'film',
    universe: 'dc',
    director: 'Patty Jenkins',
    cast: ['Gal Gadot', 'Chris Pine', 'Connie Nielsen', 'David Thewlis'],
    tagline: 'Believe in something.',
    description:
      'Diana Prince leaves the hidden island of Themyscira to end World War I — and discovers the war was ignited by Ares, the god of war.',
  },
  {
    slug: 'justice-league',
    title: 'Justice League',
    year: 2017,
    kind: 'film',
    universe: 'dc',
    director: 'Joss Whedon (completing Zack Snyder’s vision)',
    cast: ['Henry Cavill', 'Ben Affleck', 'Gal Gadot', 'Ezra Miller', 'Ray Fisher', 'Amy Adams'],
    tagline: 'You only get one shot at destiny.',
    description:
      'Superman’s sacrifice inspires Bruce Wayne to team up with Diana Prince and recruit a new generation of metahumans to stand against Steppenwolf.',
  },
  {
    slug: 'aquaman',
    title: 'Aquaman',
    year: 2018,
    kind: 'film',
    universe: 'dc',
    director: 'James Wan',
    cast: ['Jason Momoa', 'Amber Heard', 'Patrick Wilson', 'Willem Dafoe'],
    tagline: 'The sea remembers.',
    description:
      'Arthur Curry is forced to accept his heritage as the rightful king of Atlantis — and choose between the surface world and the seven kingdoms of the deep.',
  },
  {
    slug: 'shazam',
    title: 'Shazam',
    year: 2019,
    kind: 'film',
    universe: 'dc',
    director: 'David F. Sandberg',
    cast: ['Asa Butterfield', 'Zachary Levi', 'Ross Butler', 'Grace Fulton'],
    tagline: 'Say the magic word.',
    description:
      'A street-smart boy is given the magic powers of the wizard Shazam — and becomes a demigod in a teenager’s body, alongside his found family.',
  },
  {
    slug: 'zack-snyders-justice-league',
    title: 'Zack Snyder’s Justice League',
    year: 2021,
    kind: 'film',
    universe: 'dc',
    director: 'Zack Snyder',
    cast: ['Henry Cavill', 'Ben Affleck', 'Gal Gadot', 'Ezra Miller', 'Amy Adams'],
    tagline: 'The fan-made cut fans actually got.',
    description:
      'Snyder’s original four-hour vision of the League, completed with a new fourth act — Superman returns against Zod’s army and the truth of his sacrifice.',
  },
  {
    slug: 'the-batman',
    title: 'The Batman',
    year: 2022,
    kind: 'film',
    universe: 'dc',
    director: 'Matt Reeves',
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano', 'Colin Farrell', 'Jeffrey Wright'],
    tagline: 'Gotham is rotten to its core.',
    description:
      'Two years into his war on crime, Bruce Wayne hunts the Riddler and uncovers the corruption festering inside the city he loves.',
  },
  {
    slug: 'the-flash',
    title: 'The Flash',
    year: 2023,
    kind: 'film',
    universe: 'dc',
    director: 'Andy Muschietti',
    cast: ['Ezra Miller', 'Michael Shannon', 'Ben Affleck', 'Sacha Calle'],
    tagline: 'Speed has no limits.',
    description:
      'Barry Allen uses the Speed Force to try and save his mother — and accidentally unmake the timeline, meeting a Batman from a darker past.',
  },

  /* ---------------------------------- TV ----------------------------------- */
  {
    slug: 'daredevil',
    title: 'Daredevil',
    year: 2015,
    kind: 'series',
    universe: 'marvel',
    creator: 'Drew Goddard',
    cast: ['Charlie Cox', 'Elden Henson', 'Vincent D’Onofrio'],
    tagline: 'Hell’s Kitchen is his.',
    description:
      'A blind lawyer by day and a costumed vigilante by night, Matt Murdock wages war on the Kingpin’s hold over Hell’s Kitchen. The blueprint for premium superhero TV.',
  },
  {
    slug: 'loki',
    title: 'Loki',
    year: 2021,
    kind: 'series',
    universe: 'marvel',
    creator: 'Kate Herron',
    cast: ['Tom Hiddleston', 'Owen Wilson', 'Sophia Di Martino'],
    tagline: 'Time is a story.',
    description:
      'The God of Mischief flees the TVA and uncovers the machinery that keeps the multiverse “stable” — and the version of himself who built it.',
  },
  {
    slug: 'watchmen',
    title: 'Watchmen',
    year: 2019,
    kind: 'series',
    universe: 'dc',
    creator: 'Damon Lindelof',
    cast: ['Jeremy Strong', 'Donnie Wahlberg', 'Regina King'],
    tagline: 'Who’s watching the watchers?',
    description:
      'In a world where capes never fell, a masked vigilante in Tulsa digs into a conspiracy decades in the making. A prestige reimagining of a comics masterpiece.',
  },
  {
    slug: 'the-boys',
    title: 'The Boys',
    year: 2019,
    kind: 'series',
    universe: 'other',
    creator: 'Eric Kripke',
    cast: ['Karl Urban', 'Jack Quaid', 'Antony Starr'],
    tagline: 'Superheroes are scum.',
    description:
      'A group of vigilantes wages brutal war on the corrupt, corporate-backed superhumans of Vought International. Superhero fiction turned inside out.',
  },
  {
    slug: 'invincible',
    title: 'Invincible',
    year: 2021,
    kind: 'series',
    universe: 'other',
    creator: 'Robert Kirkman',
    cast: ['Steven Yeun', 'Jaz Sinclair', 'J.K. Simmons'],
    tagline: 'The weight of power.',
    description:
      'Mark Grayson inherits his father Omni-Man’s power — and his brutality. An animated series that takes the cost of being a hero deadly seriously.',
  },
] as const;
