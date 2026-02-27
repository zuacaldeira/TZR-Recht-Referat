const QUIZ_DATA = [
  {
    question: 'In welchem Jahr wurde die UN-Kinderrechtskonvention verabschiedet?',
    options: ['1979', '1989', '1990', '2000'],
    correct: 1
  },
  {
    question: 'Bis zu welchem Alter gilt man laut UN-KRK als Kind?',
    options: ['14 Jahre', '16 Jahre', '18 Jahre', '21 Jahre'],
    correct: 2
  },
  {
    question: 'Wie viele Artikel hat die UN-Kinderrechtskonvention?',
    options: ['30', '42', '54', '62'],
    correct: 2
  },
  {
    question: 'Welches Prinzip besagt, dass das Wohl des Kindes vorrangig zu berücksichtigen ist?',
    options: ['Artikel 1', 'Artikel 3', 'Artikel 6', 'Artikel 12'],
    correct: 1
  },
  {
    question: 'Wie viele Staaten haben die UN-KRK ratifiziert?',
    options: ['150', '170', '193', '196'],
    correct: 3
  },
  {
    question: 'Welcher Staat hat die UN-KRK NICHT ratifiziert?',
    options: ['China', 'USA', 'Russland', 'Indien'],
    correct: 1
  },
  {
    question: 'Was war das erste internationale Dokument zu Kinderrechten?',
    options: ['UN-Charta', 'Genfer Erklärung 1924', 'Haager Konvention', 'Menschenrechtserklärung 1948'],
    correct: 1
  },
  {
    question: 'Welche vier Grundprinzipien hat die UN-KRK?',
    options: [
      'Freiheit, Gleichheit, Brüderlichkeit, Sicherheit',
      'Überleben, Entwicklung, Schutz, Beteiligung',
      'Bildung, Gesundheit, Spiel, Familie',
      'Essen, Wohnen, Kleidung, Schule'
    ],
    correct: 1
  },
  {
    question: 'Welcher Artikel garantiert das Recht auf Bildung?',
    options: ['Artikel 12', 'Artikel 19', 'Artikel 28', 'Artikel 31'],
    correct: 2
  },
  {
    question: 'Welcher Artikel schützt das Recht auf Spiel und Freizeit?',
    options: ['Artikel 24', 'Artikel 28', 'Artikel 31', 'Artikel 34'],
    correct: 2
  },
  {
    question: 'Wann trat die UN-KRK in Kraft?',
    options: ['20. November 1989', '2. September 1990', '1. Januar 1991', '5. April 1992'],
    correct: 1
  },
  {
    question: 'Welche Organisation überwacht die Einhaltung der UN-KRK?',
    options: ['UNICEF', 'UNESCO', 'UN-Ausschuss für die Rechte des Kindes', 'Internationaler Gerichtshof'],
    correct: 2
  },
  {
    question: 'Wann hat Deutschland die UN-KRK ratifiziert?',
    options: ['1989', '1990', '1992', '1995'],
    correct: 2
  },
  {
    question: 'Was bedeutet "Partizipation" im Kontext der Kinderrechte?',
    options: [
      'Kinder müssen arbeiten',
      'Kinder dürfen ihre Meinung äußern und mitbestimmen',
      'Kinder müssen zur Schule gehen',
      'Kinder leben bei ihren Eltern'
    ],
    correct: 1
  },
  {
    question: 'Welches Zusatzprotokoll ermöglicht Kindern ein individuelles Beschwerderecht?',
    options: ['Erstes (2000)', 'Zweites (2000)', 'Drittes (2011)', 'Es gibt kein solches Protokoll'],
    correct: 2
  }
];

const MEMORY_DATA = [
  { id: 'leben', name: 'Recht auf Leben', icon: '❤️' },
  { id: 'bildung', name: 'Recht auf Bildung', icon: '📚' },
  { id: 'spiel', name: 'Recht auf Spiel', icon: '⚽' },
  { id: 'schutz', name: 'Schutz vor Gewalt', icon: '🛡️' },
  { id: 'meinung', name: 'Meinungsfreiheit', icon: '💬' },
  { id: 'gesundheit', name: 'Recht auf Gesundheit', icon: '🏥' },
  { id: 'familie', name: 'Recht auf Familie', icon: '👨‍👩‍👧‍👦' },
  { id: 'gleichheit', name: 'Gleichbehandlung', icon: '⚖️' },
  { id: 'name', name: 'Recht auf einen Namen', icon: '📛' },
  { id: 'privat', name: 'Privatsphäre', icon: '🔒' },
  { id: 'kultur', name: 'Kulturelle Rechte', icon: '🎨' },
  { id: 'wohnung', name: 'Recht auf Wohnung', icon: '🏠' }
];
