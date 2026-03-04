import { TimelineEvent } from '../models/timeline-event';

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: 1870,
    title: 'Education Act (Großbritannien)',
    summary: 'Das britische Bildungsgesetz fördert erstmals den Zugang zu Bildung für alle Kinder — unabhängig von sozialer Herkunft.',
    details: 'Das Gesetz war ein Meilenstein in der Veränderung des Kindheitsverständnisses. Zuvor wurden Kinder der unteren Schichten direkt in die Erwachsenenwelt geschickt. Das Gesetz trug dazu bei, Kindheit als eigene Entwicklungsphase anzuerkennen, die Schutz und Bildung erfordert (Imoah 2012).',
    color: '#4CAF50',
    type: 'law',
    source: 'UK Parliament / Imoah 2012'
  },
  {
    year: 1924,
    title: 'Genfer Erklärung',
    summary: 'Der Völkerbund verabschiedet die "Genfer Erklärung über die Rechte des Kindes" — das erste internationale Dokument zu Kinderrechten.',
    details: 'Die britische Sozialreformerin Eglantyne Jebb formulierte 1923 fünf grundlegende Rechte des Kindes. Der Völkerbund nahm diese als "Genfer Erklärung" an. Sie enthielt Grundsätze wie das Recht auf Nahrung, Pflege und Schutz vor Ausbeutung.',
    color: '#FF9800',
    type: 'law',
    source: 'Völkerbund'
  },
  {
    year: 1945,
    title: 'Gründung der Vereinten Nationen',
    summary: 'Am 25. Oktober 1945 wird die UN-Charta ratifiziert — die Grundlage für alle späteren internationalen Menschenrechtsabkommen.',
    details: 'Nach den beiden Weltkriegen wurde die UNO als globale Organisation gegründet, um künftige Konflikte zu verhindern, Menschenrechte zu schützen und internationale Zusammenarbeit zu fördern. Die Kriege hatten die Verletzlichkeit von Kindern besonders deutlich gemacht (Fass 2011).',
    color: '#03A9F4',
    type: 'progress',
    source: 'UN / Fass 2011'
  },
  {
    year: 1948,
    title: 'Allgemeine Erklärung der Menschenrechte',
    summary: 'Die UN-Menschenrechtserklärung erwähnt erstmals explizit den besonderen Schutz von Kindern.',
    details: 'Artikel 25 Absatz 2 der Allgemeinen Erklärung der Menschenrechte bestimmt: „Mütter und Kinder haben Anspruch auf besondere Fürsorge und Unterstützung." Dies war ein wichtiger Schritt zur Anerkennung von Kindern als Rechtsträger.',
    color: '#03A9F4',
    type: 'law',
    source: 'UN-Generalversammlung'
  },
  {
    year: 1959,
    title: 'Erklärung der Rechte des Kindes',
    summary: 'Die UN-Generalversammlung verabschiedet eine erweiterte Erklärung mit 10 Grundsätzen zu Kinderrechten.',
    details: 'Die zehn Grundsätze umfassten u.a. das Recht auf einen Namen und eine Staatsangehörigkeit, auf Bildung, auf Spiel und Erholung sowie auf Schutz vor Diskriminierung. Die Erklärung war jedoch rechtlich nicht bindend. Sie ging über den Schutz durch nationale Bürgerrechte hinaus.',
    color: '#4CAF50',
    type: 'law',
    source: 'UN-Generalversammlung'
  },
  {
    year: 1966,
    title: 'UN-Sozialpakt und UN-Zivilpakt',
    summary: 'Zwei verbindliche Menschenrechtspakte enthalten spezifische Bestimmungen zum Schutz von Kindern.',
    details: 'Der Internationale Pakt über bürgerliche und politische Rechte (Art. 24) und der Internationale Pakt über wirtschaftliche, soziale und kulturelle Rechte enthalten Bestimmungen zum Schutz von Minderjährigen, zur Bildung und zum Verbot von Kinderarbeit.',
    color: '#E91E63',
    type: 'law',
    source: 'UN'
  },
  {
    year: 1979,
    title: 'Internationales Jahr des Kindes',
    summary: 'Die UN rufen das Jahr des Kindes aus. Polen schlägt eine verbindliche Kinderrechtskonvention vor.',
    details: 'Das Internationale Jahr des Kindes lenkte weltweite Aufmerksamkeit auf die Probleme von Kindern. Polens Vorschlag für eine rechtsverbindliche Konvention führte zur Einsetzung einer Arbeitsgruppe, die zehn Jahre an dem Vertragstext arbeitete.',
    color: '#FF9800',
    type: 'progress',
    source: 'UN'
  },
  {
    year: 1989,
    title: 'UN-Kinderrechtskonvention (KRK)',
    summary: 'Die Generalversammlung verabschiedet einstimmig die Konvention über die Rechte des Kindes mit 54 Artikeln.',
    details: 'Am 20. November 1989 wurde die KRK von der UN-Generalversammlung angenommen. Sie ist das umfassendste Menschenrechtsabkommen für Kinder und definiert Kinder erstmals als eigenständige Rechtsträger. Die 54 Artikel decken Überlebens-, Entwicklungs-, Schutz- und Beteiligungsrechte ab.',
    color: '#03A9F4',
    type: 'law',
    source: 'UN-Generalversammlung',
    highlight: true
  },
  {
    year: 1990,
    title: 'Inkrafttreten der KRK',
    summary: 'Die Konvention tritt in Kraft — schneller als jeder andere Menschenrechtsvertrag zuvor.',
    details: 'Am 2. September 1990 trat die KRK in Kraft, nur neun Monate nach ihrer Verabschiedung. 20 Staaten hatten sie ratifiziert. Im gleichen Jahr fand der erste Weltkindergipfel in New York statt. Deutschland ratifizierte die KRK am 5. April 1992.',
    color: '#4CAF50',
    type: 'progress',
    source: 'UN'
  },
  {
    year: 2000,
    title: 'Zwei Zusatzprotokolle',
    summary: 'Protokolle gegen Kinderhandel und den Einsatz von Kindersoldaten werden verabschiedet.',
    details: 'Das Fakultativprotokoll zum Verkauf von Kindern, Kinderprostitution und Kinderpornographie sowie das Fakultativprotokoll zur Beteiligung von Kindern an bewaffneten Konflikten ergänzen die KRK um spezifische Schutzmaßnahmen. Im gleichen Jahr wurde in Deutschland das Recht auf gewaltfreie Erziehung gesetzlich verankert (§ 1631 Abs. 2 BGB).',
    color: '#E91E63',
    type: 'law',
    source: 'UN'
  },
  {
    year: 2011,
    title: 'Drittes Zusatzprotokoll',
    summary: 'Kinder erhalten ein individuelles Beschwerderecht vor dem UN-Kinderrechtsausschuss.',
    details: 'Das dritte Fakultativprotokoll ermöglicht es Kindern (oder ihren Vertretern), Beschwerden direkt beim UN-Ausschuss für die Rechte des Kindes einzureichen, wenn ihre Rechte verletzt wurden und nationale Rechtsmittel ausgeschöpft sind.',
    color: '#03A9F4',
    type: 'law',
    source: 'UN'
  },
  {
    year: 2015,
    title: 'Somalia ratifiziert die KRK',
    summary: 'Als vorletztes Land weltweit ratifiziert Somalia die Kinderrechtskonvention — nur die USA fehlen noch.',
    details: 'Mit der Ratifizierung durch Somalia haben 196 von 197 UN-Mitgliedstaaten die KRK ratifiziert. Die USA haben die Konvention zwar 1995 unterzeichnet, aber nie ratifiziert — als einziges Land weltweit.',
    color: '#4CAF50',
    type: 'progress',
    source: 'UN'
  },
  {
    year: 2019,
    title: '30 Jahre Kinderrechte',
    summary: 'Die KRK feiert ihren 30. Geburtstag — ratifiziert von 196 Staaten, mehr als jeder andere Menschenrechtsvertrag.',
    details: 'Zum 30. Jubiläum war die KRK von allen UN-Mitgliedstaaten außer den USA ratifiziert. Trotz enormer Fortschritte bleiben Herausforderungen: Kinderarmut, Kinderarbeit, Bildungslücken und die Auswirkungen des Klimawandels auf Kinder.',
    color: '#FF9800',
    type: 'progress',
    source: 'UN'
  },
  {
    year: 2020,
    title: 'COVID-19 und Kinderrechte',
    summary: 'Die Pandemie trifft Kinder besonders hart: Schulschließungen, Armut und häusliche Gewalt nehmen massiv zu.',
    details: 'Weltweit wurden Schulen geschlossen und bis zu 1,6 Milliarden Kinder vom Unterricht ausgeschlossen. Kinderarbeit stieg erstmals seit 20 Jahren wieder an (auf 160 Millionen). Häusliche Gewalt und Kinderehen nahmen zu. UNICEF sprach von einer "Kinderrechtekrise".',
    color: '#C0392B',
    type: 'crisis',
    source: 'UNICEF'
  },
  {
    year: 2024,
    title: 'Rekord-Verletzungen in Konfliktzonen',
    summary: '2024 gilt als eines der dunkelsten Jahre für Kinder: Gaza, Sudan, Ukraine und Myanmar verzeichnen massive Verstöße.',
    details: '32.990 schwere Verstöße gegen Kinder wurden 2023 dokumentiert — der höchste Wert seit Beginn des UN-Monitorings. 473 Millionen Kinder leben in Konfliktgebieten. In Gaza wurden alle Schulen geschlossen, 625.000 Kinder verloren ihren Zugang zu Bildung. Der Sudan erlebt die größte Kindervertriebenenkrise der Welt.',
    color: '#C0392B',
    type: 'crisis',
    source: 'UNICEF / UN Security Council',
    highlight: true
  },
  {
    year: 2025,
    title: '138 Mio. Kinder in Kinderarbeit',
    summary: 'Trotz Fortschritten arbeiten noch 138 Millionen Kinder weltweit — das UN-Ziel für 2025 wird verfehlt.',
    details: 'Der ILO/UNICEF-Bericht 2024 zeigt einen Rückgang von 160 auf 138 Millionen seit 2020, aber das SDG-Ziel 8.7 (Abschaffung bis 2025) wird deutlich verfehlt. 54 Millionen Kinder arbeiten unter gefährlichen Bedingungen. 87 Millionen betroffene Kinder leben in Subsahara-Afrika.',
    color: '#B7950B',
    type: 'report',
    source: 'ILO / UNICEF 2025'
  },
];

export const TIMELINE_TYPE_LABELS: Record<string, string> = {
  law: 'Gesetzgebung',
  progress: 'Fortschritt',
  crisis: 'Krise',
  report: 'Bericht/Studie',
};

export const TIMELINE_TYPE_COLORS: Record<string, string> = {
  law: '#4A7C59',
  progress: '#2E5F8B',
  crisis: '#8B2E2E',
  report: '#6B5B2E',
};
