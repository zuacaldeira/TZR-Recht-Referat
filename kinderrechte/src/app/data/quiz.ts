import { QuizQuestion, MemoryCard } from '../models/quiz';

export const QUIZ_DATA: QuizQuestion[] = [
  // Easy questions (ages 6-10, Grundschule)
  { question: 'Haben alle Kinder auf der Welt die gleichen Rechte?', options: ['Ja, alle Kinder haben die gleichen Rechte', 'Nein, nur Kinder in Europa', 'Nur Kinder, die zur Schule gehen', 'Nur Kinder ab 10 Jahren'], correct: 0, difficulty: 'easy' },
  { question: 'Dürfen Kinder ihre Meinung sagen?', options: ['Nein, nur Erwachsene dürfen das', 'Ja, Kinder haben ein Recht auf Meinungsäußerung', 'Nur in der Schule', 'Nur wenn sie gefragt werden'], correct: 1, difficulty: 'easy' },
  { question: 'Haben Kinder ein Recht auf Spielen?', options: ['Nein, Spielen ist kein Recht', 'Nur am Wochenende', 'Ja, Artikel 31 der UN-KRK garantiert das Recht auf Spiel und Freizeit', 'Nur bis zum 6. Lebensjahr'], correct: 2, difficulty: 'easy' },
  { question: 'Was bedeutet "Kinderrechte"?', options: ['Regeln, die Kinder befolgen müssen', 'Besondere Rechte, die alle Kinder schützen', 'Rechte, die nur für Erwachsene gelten', 'Schulregeln'], correct: 1, difficulty: 'easy' },
  { question: 'Haben Kinder ein Recht auf Bildung?', options: ['Nein', 'Ja, alle Kinder dürfen lernen und zur Schule gehen', 'Nur Jungen', 'Nur in reichen Ländern'], correct: 1, difficulty: 'easy' },
  { question: 'Wer hat die Kinderrechte aufgeschrieben?', options: ['Die Schule', 'Die Eltern', 'Die Vereinten Nationen (UN)', 'Die Polizei'], correct: 2, difficulty: 'easy' },

  // Medium questions (existing 15, re-tagged)
  { question: 'In welchem Jahr wurde die UN-Kinderrechtskonvention verabschiedet?', options: ['1979', '1989', '1990', '2000'], correct: 1, difficulty: 'medium' },
  { question: 'Bis zu welchem Alter gilt man laut UN-KRK als Kind?', options: ['14 Jahre', '16 Jahre', '18 Jahre', '21 Jahre'], correct: 2, difficulty: 'medium' },
  { question: 'Wie viele Artikel hat die UN-Kinderrechtskonvention?', options: ['30', '42', '54', '62'], correct: 2, difficulty: 'medium' },
  { question: 'Welches Prinzip besagt, dass das Wohl des Kindes vorrangig zu berücksichtigen ist?', options: ['Artikel 1', 'Artikel 3', 'Artikel 6', 'Artikel 12'], correct: 1, difficulty: 'medium' },
  { question: 'Wie viele Staaten haben die UN-KRK ratifiziert?', options: ['150', '170', '193', '196'], correct: 3, difficulty: 'medium' },
  { question: 'Welcher Staat hat die UN-KRK NICHT ratifiziert?', options: ['China', 'USA', 'Russland', 'Indien'], correct: 1, difficulty: 'medium' },
  { question: 'Was war das erste internationale Dokument zu Kinderrechten?', options: ['UN-Charta', 'Genfer Erklärung 1924', 'Haager Konvention', 'Menschenrechtserklärung 1948'], correct: 1, difficulty: 'medium' },
  { question: 'Welche vier Grundprinzipien hat die UN-KRK?', options: ['Freiheit, Gleichheit, Brüderlichkeit, Sicherheit', 'Überleben, Entwicklung, Schutz, Beteiligung', 'Bildung, Gesundheit, Spiel, Familie', 'Essen, Wohnen, Kleidung, Schule'], correct: 1, difficulty: 'medium' },
  { question: 'Welcher Artikel garantiert das Recht auf Bildung?', options: ['Artikel 12', 'Artikel 19', 'Artikel 28', 'Artikel 31'], correct: 2, difficulty: 'medium' },
  { question: 'Welcher Artikel schützt das Recht auf Spiel und Freizeit?', options: ['Artikel 24', 'Artikel 28', 'Artikel 31', 'Artikel 34'], correct: 2, difficulty: 'medium' },

  // Hard questions
  { question: 'Wann trat die UN-KRK in Kraft?', options: ['20. November 1989', '2. September 1990', '1. Januar 1991', '5. April 1992'], correct: 1, difficulty: 'hard' },
  { question: 'Welche Organisation überwacht die Einhaltung der UN-KRK?', options: ['UNICEF', 'UNESCO', 'UN-Ausschuss für die Rechte des Kindes', 'Internationaler Gerichtshof'], correct: 2, difficulty: 'hard' },
  { question: 'Wann hat Deutschland die UN-KRK ratifiziert?', options: ['1989', '1990', '1992', '1995'], correct: 2, difficulty: 'hard' },
  { question: 'Was bedeutet "Partizipation" im Kontext der Kinderrechte?', options: ['Kinder müssen arbeiten', 'Kinder dürfen ihre Meinung äußern und mitbestimmen', 'Kinder müssen zur Schule gehen', 'Kinder leben bei ihren Eltern'], correct: 1, difficulty: 'hard' },
  { question: 'Welches Zusatzprotokoll ermöglicht Kindern ein individuelles Beschwerderecht?', options: ['Erstes (2000)', 'Zweites (2000)', 'Drittes (2011)', 'Es gibt kein solches Protokoll'], correct: 2, difficulty: 'hard' },
];

export const MEMORY_DATA: MemoryCard[] = [
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
  { id: 'wohnung', name: 'Recht auf Wohnung', icon: '🏠' },
];
