export interface ViolationStat {
  value: string;
  label: string;
  sub: string;
  source: string;
  sourceUrl: string;
}

export interface ViolationCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  stats: ViolationStat[];
}

export const VIOLATION_CATEGORIES: ViolationCategory[] = [
  {
    id: 'conflict',
    label: 'Krieg & Konflikt',
    icon: '💣',
    color: '#C0392B',
    stats: [
      { value: '473 Mio.', label: 'Kinder leben in Konfliktgebieten', sub: 'Fast 1 von 5 Kindern weltweit — seit den 1990ern verdoppelt', source: 'UNICEF, Dez. 2024', sourceUrl: 'https://www.unicef.org/press-releases/not-new-normal-2024-one-worst-years-unicefs-history-children-conflict' },
      { value: '47,2 Mio.', label: 'Kinder durch Konflikte vertrieben', sub: 'Höchster Stand seit Beginn der Aufzeichnungen (2023)', source: 'UNHCR / UNICEF 2024', sourceUrl: 'https://www.unicef.org/press-releases/not-new-normal-2024-one-worst-years-unicefs-history-children-conflict' },
      { value: '32.990', label: 'Schwere Verstöße gegen Kinder (2023)', sub: 'Höchster Wert seit Beginn des UN-Monitorings', source: 'UN Secretary-General Report, Jun. 2024', sourceUrl: 'https://childrenandarmedconflict.un.org/2024/06/2023-alarming-levels-of-violence-inflicted-on-children-in-situation-of-armed-conflict' },
      { value: '22.557', label: 'Kinder direkt betroffen (2023)', sub: 'Tötungen, Verstümmelungen, Rekrutierungen', source: 'UN Security Council, 2024', sourceUrl: 'https://press.un.org/en/2024/sc15745.doc.htm' },
      { value: '+35%', label: 'Anstieg getöteter/verletzter Kinder', sub: '5.301 getötet, 6.348 verletzt im Jahr 2023', source: 'UN Security Council, 2024', sourceUrl: 'https://press.un.org/en/2024/sc15745.doc.htm' },
    ],
  },
  {
    id: 'poverty',
    label: 'Armut',
    icon: '🏚',
    color: '#D35400',
    stats: [
      { value: '417 Mio.', label: 'Kinder in extremer Entbehrung', sub: 'In mind. 2 lebenswichtigen Bereichen betroffen (Bildung, Gesundheit, Wohnen, Wasser)', source: 'UNICEF State of the World\'s Children 2025', sourceUrl: 'https://www.unicef.de/informieren/aktuelles/presse/-/weltweit-ueber-400-millionen-kinder-in-extremer-armut/386128' },
      { value: '118 Mio.', label: 'Kinder in 3+ Entbehrungsbereichen', sub: 'Mehrfach benachteiligt — tiefste Armut', source: 'UNICEF State of the World\'s Children 2025', sourceUrl: 'https://www.unicef.de/informieren/aktuelles/presse/-/weltweit-ueber-400-millionen-kinder-in-extremer-armut/386128' },
      { value: '41%', label: 'Kinder mit mind. einer Entbehrung', sub: 'Rückgang von 51% (2013) — Fortschritt akut gefährdet', source: 'UNICEF / Save the Children, Nov. 2025', sourceUrl: 'https://unicef.at/news/400-millionen-kinder-weltweit-armut/' },
      { value: '-19%', label: 'Rückgang extremer Kinderarmut seit 2014', sub: 'Erfolge durch politischen Willen erzielt', source: 'UNICEF State of the World\'s Children 2025', sourceUrl: 'https://www.unicef.de/informieren/aktuelles/presse/-/weltweit-ueber-400-millionen-kinder-in-extremer-armut/386128' },
      { value: '4,5 Mio.', label: 'Kinder könnten bis 2030 sterben', sub: 'Durch globale Kürzungen bei Entwicklungshilfe', source: 'The Lancet, zit. in UNICEF 2025', sourceUrl: 'https://www.unicef.de/informieren/aktuelles/presse/-/weltweit-ueber-400-millionen-kinder-in-extremer-armut/386128' },
    ],
  },
  {
    id: 'labor',
    label: 'Kinderarbeit',
    icon: '⛏',
    color: '#B7950B',
    stats: [
      { value: '138 Mio.', label: 'Kinder in Kinderarbeit weltweit', sub: 'Rückgang von 160 Mio. (2020) — UN-Ziel für 2025 verfehlt', source: 'ILO / UNICEF Child Labour Report 2024', sourceUrl: 'https://www.unicef.de/informieren/materialien/kinderarbeitbericht/376250' },
      { value: '54 Mio.', label: 'Kinder in gefährlicher Arbeit', sub: 'Gesundheit & Entwicklung massiv gefährdet', source: 'ILO / UNICEF Child Labour Report 2024', sourceUrl: 'https://www.unicef.de/informieren/materialien/kinderarbeitbericht/376250' },
      { value: '87 Mio.', label: 'Betroffene Kinder in Subsahara-Afrika', sub: 'Fast ⅔ der globalen Kinderarbeit — stagnierend seit 2020', source: 'ILO / UNICEF 2024', sourceUrl: 'https://www.unicef.de/informieren/aktuelles/presse/-/trotz-fortschritten-kinderarbeit-bleibt-fuer-138-millionen-kinder-weltweit-realitaet-/375886' },
      { value: '53 Mio.', label: 'Arbeitende Kinder ohne Schulbesuch', sub: 'Verlust von Bildung und Zukunftschancen', source: 'UNICEF.ch, 2024', sourceUrl: 'https://www.unicef.ch/de/aktuell/blog/2024-06-12/kinderarbeit-das-sind-die-wichtigsten-fragen-und-antworten-im-uberblick' },
      { value: '70%', label: 'Kinderarbeit in der Landwirtschaft', sub: 'Plantagen, Minen, Kakao, Baumwolle, Tee', source: 'SOS-Kinderdörfer / ILO', sourceUrl: 'https://www.sos-kinderdoerfer.de/informieren/wie-wir-helfen/kinderrechte/kinderarbeit' },
    ],
  },
  {
    id: 'marriage',
    label: 'Kinderehe',
    icon: '💔',
    color: '#76448A',
    stats: [
      { value: '650 Mio.', label: 'Frauen heute als Kind verheiratet', sub: 'Vor dem 18. Geburtstag', source: 'UNICEF / World Bank 2023', sourceUrl: 'https://genderdata.worldbank.org/en/data-stories/child-marriage' },
      { value: '12 Mio.', label: 'Mädchen heiraten jedes Jahr', sub: 'Vor dem 18. Geburtstag', source: 'Save the Children, 2024', sourceUrl: 'https://www.savethechildren.org/us/charity-stories/child-marriage-a-violation-of-child-rights' },
      { value: '4 Mio.', label: 'Davon unter 15 Jahren', sub: 'Besonders vulnerable Gruppe', source: 'Save the Children, 2024', sourceUrl: 'https://www.savethechildren.org/us/charity-stories/child-marriage-a-violation-of-child-rights' },
      { value: '150 Mio.', label: 'Mädchen gefährdet im nächsten Jahrzehnt', sub: 'Ohne gezielte Gegenmaßnahmen', source: 'Save the Children, 2024', sourceUrl: 'https://www.savethechildren.org/us/charity-stories/child-marriage-a-violation-of-child-rights' },
      { value: '+2,5 Mio.', label: 'Zusätzliche Mädchen gefährdet (2020–2025)', sub: 'Als direkte Folge der COVID-19-Pandemie', source: 'Save the Children / UNICEF, 2021', sourceUrl: 'https://www.savethechildren.org/us/charity-stories/child-marriage-a-violation-of-child-rights' },
    ],
  },
  {
    id: 'violence',
    label: 'Gewalt & Missbrauch',
    icon: '🛑',
    color: '#1A5276',
    stats: [
      { value: '1 Mrd.', label: 'Kinder vulnerabel für Gewalt', sub: 'Physisch, psychisch, sexuell — online und offline', source: 'UN Special Representative, Okt. 2024', sourceUrl: 'https://news.un.org/en/story/2024/10/1155566' },
      { value: '370 Mio.', label: 'Mädchen/Frauen Opfer sexueller Gewalt', sub: 'Erlebt vor dem 18. Geburtstag — 1 von 8', source: 'UNICEF, Okt. 2024', sourceUrl: 'https://news.un.org/en/story/2024/10/1155566' },
      { value: '650 Mio.', label: 'Inkl. Online- & verbalen Missbrauch', sub: 'Kontaktlose Formen mitgezählt', source: 'UNICEF, Okt. 2024', sourceUrl: 'https://news.un.org/en/story/2024/10/1155566' },
      { value: '15%', label: 'Kinder berichten von Cybermobbing', sub: 'Weltweit, mit steigender Tendenz', source: 'UN Special Representative, Okt. 2024', sourceUrl: 'https://news.un.org/en/story/2024/10/1155566' },
      { value: '+21%', label: 'Anstieg schwerer Verstöße in Konflikten', sub: 'Gaza, Ukraine, Sudan, Myanmar u.a.', source: 'KidsRights Index 2024', sourceUrl: 'https://www.kidsrights.org/news/kidsrights-index-2024-study-reveals-21-rise-in-violence-against-children-worldwide-polycrisis-for-children-deepens-due-to-rise-in-conflicts-and-continued-covid-19-fallout/' },
    ],
  },
  {
    id: 'education',
    label: 'Bildung',
    icon: '📚',
    color: '#1E8449',
    stats: [
      { value: '52 Mio.', label: 'Kinder in Konfliktzonen ohne Schule', sub: 'Schulen bombardiert, Familien vertrieben', source: 'UNICEF, Dez. 2024', sourceUrl: 'https://www.unicef.org/easterncaribbean/stories/2024-one-worst-years-unicefs-history-children-conflict' },
      { value: '19 Mio.', label: 'Kinder aus Sudan ohne Schulbesuch', sub: 'Weltgrößte Kindervertriebenenkrise', source: 'KidsRights Index 2024 / UN', sourceUrl: 'https://www.kidsrights.org/news/kidsrights-index-2024-study-reveals-21-rise-in-violence-against-children-worldwide-polycrisis-for-children-deepens-due-to-rise-in-conflicts-and-continued-covid-19-fallout/' },
      { value: '6 Mio.', label: 'Kinder könnten Schule verlieren', sub: 'Durch internationale Kürzungen der Entwicklungshilfe', source: 'UNICEF 2025', sourceUrl: 'https://www.unicef.de/informieren/aktuelles/presse/-/weltweit-ueber-400-millionen-kinder-in-extremer-armut/386128' },
      { value: '1 von 7', label: 'Kinder mit Behinderungen ohne Regelschule', sub: 'Besuchen nicht regelmäßig die Schule', source: 'ChildFund Alliance World Index 2024', sourceUrl: 'https://www.childfund.org/press-release/2024/november/world-index-2024-identifies-root-causes-of-rights-violations-for-women-and-children/' },
      { value: '113 Jahre', label: 'Bis zur vollen Umsetzung der Kinderrechte', sub: 'Bei aktuellem Fortschrittstempo', source: 'WeWorld / ChildFund World Index 2024', sourceUrl: 'https://www.childfund.org/press-release/2024/november/world-index-2024-identifies-root-causes-of-rights-violations-for-women-and-children/' },
    ],
  },
];

export const VIOLATION_OVERVIEW = [
  { value: '473 Mio.', label: 'In Konfliktzonen', color: '#C0392B' },
  { value: '417 Mio.', label: 'In Armut', color: '#D35400' },
  { value: '138 Mio.', label: 'Kinderarbeit', color: '#B7950B' },
  { value: '650 Mio.', label: 'Kinderehe (gesamt)', color: '#76448A' },
  { value: '1 Mrd.', label: 'Von Gewalt bedroht', color: '#1A5276' },
  { value: '52 Mio.', label: 'Ohne Bildung', color: '#1E8449' },
];
