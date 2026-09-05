import { films } from './catalog-helpers';

/** Comic imprints are grouped by publisher, not folded into MCU/DCU continuity. */
export const IMPRINT_MOVIES = [
  ...films('marvel', 'marvel-imprints', [
    {
      slug: 'men-in-black',
      title: 'Men in Black',
      year: 1997,
      wikipediaTitle: 'Men in Black (1997 film)',
      director: 'Barry Sonnenfeld',
      cast: ['Tommy Lee Jones', 'Will Smith', 'Linda Fiorentino', 'Vincent D’Onofrio'],
      description:
        'A New York police officer joins a secret agency monitoring extraterrestrials on Earth and helps his veteran partner track an alien intruder.',
      releaseNote:
        'Based on The Men in Black, originally published by Aircel, later part of Malibu and Marvel. This is not an MCU film.',
    },
    {
      slug: 'men-in-black-ii',
      title: 'Men in Black II',
      year: 2002,
      wikipediaTitle: 'Men in Black II',
      director: 'Barry Sonnenfeld',
      cast: ['Tommy Lee Jones', 'Will Smith', 'Lara Flynn Boyle', 'Rosario Dawson'],
      description:
        'Agent J must restore the memories of retired Agent K when a shapeshifting alien arrives to claim a powerful object hidden on Earth.',
    },
    {
      slug: 'men-in-black-3',
      title: 'Men in Black 3',
      year: 2012,
      wikipediaTitle: 'Men in Black 3',
      director: 'Barry Sonnenfeld',
      cast: ['Will Smith', 'Tommy Lee Jones', 'Josh Brolin', 'Jemaine Clement'],
      description:
        'Agent J travels to 1969 to save a younger Agent K from an escaped alien criminal and prevent a change to Earth’s history.',
    },
    {
      slug: 'men-in-black-international',
      title: 'Men in Black: International',
      year: 2019,
      wikipediaTitle: 'Men in Black: International',
      director: 'F. Gary Gray',
      cast: [
        'Chris Hemsworth',
        'Tessa Thompson',
        'Liam Neeson',
        'Emma Thompson',
        'Kumail Nanjiani',
      ],
      description:
        'A new recruit and a celebrated agent investigate a threat that may have infiltrated the London branch of the Men in Black.',
    },
    {
      slug: 'kick-ass',
      title: 'Kick-Ass',
      year: 2010,
      wikipediaTitle: 'Kick-Ass (film)',
      director: 'Matthew Vaughn',
      cast: ['Aaron Johnson', 'Christopher Mintz-Plasse', 'Chloë Grace Moretz', 'Nicolas Cage'],
      description:
        'A teenager without superpowers becomes a costumed vigilante and stumbles into the violent campaign of Big Daddy and Hit-Girl.',
      releaseNote:
        'Adapted from the creator-owned comic published by Marvel’s Icon imprint, outside the Marvel superhero continuity.',
    },
    {
      slug: 'kick-ass-2',
      title: 'Kick-Ass 2',
      year: 2013,
      wikipediaTitle: 'Kick-Ass 2 (film)',
      director: 'Jeff Wadlow',
      cast: [
        'Aaron Taylor-Johnson',
        'Chloë Grace Moretz',
        'Christopher Mintz-Plasse',
        'Jim Carrey',
      ],
      description:
        'Kick-Ass joins a group of amateur heroes while Hit-Girl attempts an ordinary teenage life and an old enemy builds a criminal army.',
    },
    {
      slug: 'kingsman-the-secret-service',
      title: 'Kingsman: The Secret Service',
      year: 2014,
      wikipediaTitle: 'Kingsman: The Secret Service',
      director: 'Matthew Vaughn',
      cast: ['Taron Egerton', 'Colin Firth', 'Samuel L. Jackson', 'Mark Strong', 'Michael Caine'],
      description:
        'A young Londoner is recruited into an independent spy organization while its agents investigate a billionaire’s global plan.',
      releaseNote:
        'Adapted from an Icon comic. Premiered in December 2014; general theatrical release followed in 2015.',
    },
    {
      slug: 'kingsman-the-golden-circle',
      title: 'Kingsman: The Golden Circle',
      year: 2017,
      wikipediaTitle: 'Kingsman: The Golden Circle',
      director: 'Matthew Vaughn',
      cast: [
        'Taron Egerton',
        'Colin Firth',
        'Julianne Moore',
        'Mark Strong',
        'Halle Berry',
        'Pedro Pascal',
      ],
      description:
        'After an attack on Kingsman, the surviving agents join their American counterparts to stop a drug lord’s international blackmail scheme.',
    },
    {
      slug: 'the-kings-man',
      title: 'The King’s Man',
      year: 2021,
      wikipediaTitle: "The King's Man",
      director: 'Matthew Vaughn',
      cast: ['Ralph Fiennes', 'Gemma Arterton', 'Rhys Ifans', 'Harris Dickinson', 'Djimon Hounsou'],
      description:
        'During World War I, a British aristocrat and his allies confront a secret conspiracy in this origin story for the Kingsman organization.',
    },
  ]),
  ...films('dc', 'dc-imprints', [
    {
      slug: 'road-to-perdition',
      title: 'Road to Perdition',
      year: 2002,
      wikipediaTitle: 'Road to Perdition',
      director: 'Sam Mendes',
      cast: ['Tom Hanks', 'Paul Newman', 'Jude Law', 'Tyler Hoechlin', 'Daniel Craig'],
      description:
        'A mob enforcer and his son flee through Depression-era America after the boy witnesses a killing that turns their employers against them.',
      releaseNote: 'Based on the graphic novel published by DC’s Paradox Press imprint.',
    },
    {
      slug: 'the-league-of-extraordinary-gentlemen',
      title: 'The League of Extraordinary Gentlemen',
      year: 2003,
      wikipediaTitle: 'The League of Extraordinary Gentlemen (film)',
      director: 'Stephen Norrington',
      cast: ['Sean Connery', 'Naseeruddin Shah', 'Peta Wilson', 'Tony Curran', 'Stuart Townsend'],
      description:
        'Allan Quatermain leads a team of literary adventurers to investigate a conspiracy that threatens to plunge the world into war.',
      releaseNote: 'Adapted from the America’s Best Comics series, published through WildStorm.',
    },
    {
      slug: 'a-history-of-violence',
      title: 'A History of Violence',
      year: 2005,
      wikipediaTitle: 'A History of Violence',
      director: 'David Cronenberg',
      cast: ['Viggo Mortensen', 'Maria Bello', 'Ed Harris', 'William Hurt'],
      description:
        'A small-town diner owner’s act of self-defense attracts national attention and visitors who claim he has a very different past.',
      releaseNote: 'Based on the graphic novel published by Paradox Press.',
    },
    {
      slug: 'v-for-vendetta',
      title: 'V for Vendetta',
      year: 2005,
      wikipediaTitle: 'V for Vendetta (film)',
      director: 'James McTeigue',
      cast: ['Natalie Portman', 'Hugo Weaving', 'Stephen Rea', 'John Hurt'],
      description:
        'In a totalitarian Britain, a masked revolutionary and a young woman become linked in a campaign against the state’s control.',
      releaseNote:
        'Premiered in December 2005; general theatrical release followed in March 2006. The comic was completed and collected by DC, later under Vertigo.',
    },
    {
      slug: 'stardust',
      title: 'Stardust',
      year: 2007,
      wikipediaTitle: 'Stardust (2007 film)',
      director: 'Matthew Vaughn',
      cast: ['Charlie Cox', 'Claire Danes', 'Michelle Pfeiffer', 'Robert De Niro'],
      description:
        'A young man crosses into a magical kingdom to retrieve a fallen star and discovers a woman pursued by witches and rival heirs.',
      releaseNote:
        'Based on Neil Gaiman’s story, first published with Charles Vess’s illustrations through DC’s Vertigo imprint.',
    },
    {
      slug: 'the-losers',
      title: 'The Losers',
      year: 2010,
      wikipediaTitle: 'The Losers (2010 film)',
      director: 'Sylvain White',
      cast: ['Jeffrey Dean Morgan', 'Zoe Saldaña', 'Chris Evans', 'Idris Elba', 'Jason Patric'],
      description:
        'A betrayed special-forces team allies with a mysterious operative to expose the man who ordered their deaths.',
      releaseNote: 'Adapted from the Vertigo comic by Andy Diggle and Jock.',
    },
    {
      slug: 'red',
      title: 'RED',
      year: 2010,
      wikipediaTitle: 'Red (2010 film)',
      director: 'Robert Schwentke',
      cast: [
        'Bruce Willis',
        'Mary-Louise Parker',
        'Morgan Freeman',
        'John Malkovich',
        'Helen Mirren',
      ],
      description:
        'Retired intelligence operatives reunite when an assassination attempt suggests that someone wants to erase their shared history.',
      releaseNote: 'Based on the WildStorm/Homage comic by Warren Ellis and Cully Hamner.',
    },
    {
      slug: 'red-2',
      title: 'RED 2',
      year: 2013,
      wikipediaTitle: 'Red 2 (film)',
      director: 'Dean Parisot',
      cast: [
        'Bruce Willis',
        'John Malkovich',
        'Mary-Louise Parker',
        'Helen Mirren',
        'Anthony Hopkins',
      ],
      description:
        'Frank Moses and his retired colleagues follow an international trail to find a missing nuclear device from a Cold War operation.',
    },
    {
      slug: 'the-kitchen',
      title: 'The Kitchen',
      year: 2019,
      wikipediaTitle: 'The Kitchen (2019 film)',
      director: 'Andrea Berloff',
      cast: ['Melissa McCarthy', 'Tiffany Haddish', 'Elisabeth Moss', 'Domhnall Gleeson'],
      description:
        'Three women take control of their imprisoned husbands’ protection racket in 1970s Hell’s Kitchen and face the consequences of growing power.',
      releaseNote: 'Adapted from the Vertigo miniseries by Ollie Masters and Ming Doyle.',
    },
  ]),
];
