import { Injectable, signal, computed } from '@angular/core';
import { PresentationSlide, QuizSlideQuestion } from '../models/presentation';
import { ARTICLES_DATA } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { CategoryKey } from '../models/category';
import { QUIZ_DATA } from '../data/quiz';

@Injectable({ providedIn: 'root' })
export class PresentationService {
  readonly isActive = signal(false);
  readonly currentSlide = signal(0);
  readonly showNotes = signal(false);
  readonly showGrid = signal(false);
  readonly slides = signal<PresentationSlide[]>([]);

  readonly totalSlides = computed(() => this.slides().length);
  readonly progress = computed(() => {
    const total = this.totalSlides();
    return total > 0 ? ((this.currentSlide() + 1) / total) * 100 : 0;
  });
  readonly currentSlideData = computed(() => this.slides()[this.currentSlide()]);

  start(): void {
    this.slides.set(this.buildSlides());
    this.currentSlide.set(0);
    this.showNotes.set(false);
    this.showGrid.set(false);
    this.isActive.set(true);
  }

  stop(): void {
    this.isActive.set(false);
  }

  next(): void {
    if (this.currentSlide() < this.totalSlides() - 1) {
      this.currentSlide.update(s => s + 1);
    }
  }

  prev(): void {
    if (this.currentSlide() > 0) {
      this.currentSlide.update(s => s - 1);
    }
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.totalSlides()) {
      this.currentSlide.set(index);
      this.showGrid.set(false);
    }
  }

  toggleNotes(): void {
    this.showNotes.update(v => !v);
  }

  toggleGrid(): void {
    this.showGrid.update(v => !v);
  }

  private buildSlides(): PresentationSlide[] {
    const slides: PresentationSlide[] = [];

    // ============================================================
    // NARRATIVE ARC: Origin → Content → Problem → Solution → Critique → Discussion
    // SPEAKER FLOW: Both → Lydia → Zua (3 sections) → Lydia → Both
    // ~30 slides for 30 min presentation + up to 30 min Q&A
    // ============================================================

    // ===== 1. HERO (Both) — ~1 min =====
    slides.push({
      type: 'hero',
      title: 'Die Kernrechte der UN-Kinderrechtskonvention',
      authors: 'Lydia Howe & Alexandre Zua Caldeira',
      meta: 'Fach: Recht · Lehrer: Uwe Otto · 06. März 2026',
      notes: '[~1 min] Begrüßung. Thema vorstellen: UN-KRK, 54 Artikel, seit 1989.',
      speaker: 'both',
      bgImage: 'assets/images/slides/hero-children.jpg'
    });

    // ===== 2. AGENDA (Both) — ~1 min =====
    slides.push({
      type: 'agenda',
      title: 'Gliederung',
      agendaItems: [
        { label: 'Geschichte und Kontext der UN-Kinderrechtskonvention', speaker: 'Lydia', icon: '' },
        { label: 'Überblick, Kategorien & Artikel', speaker: 'Zua', icon: '' },
        { label: 'Verletzungen weltweit', speaker: 'Zua', icon: '' },
        { label: 'Vermittlung & Schutz', speaker: 'Zua', icon: '' },
        { label: 'Kritik und interkulturelle Ansätze', speaker: 'Lydia', icon: '' },
        { label: 'Moderne Entwicklungen & alternative Ansätze', speaker: 'Lydia', icon: '' },
        { label: 'Zukünftige Perspektiven', speaker: 'Lydia', icon: '' },
        { label: 'Diskussion', speaker: 'Alle', icon: '' },
      ],
      notes: '[~1 min] Gliederung vorstellen. Lydia beginnt mit Geschichte.',
      speaker: 'both'
    });

    // ===== QUIZ (Both) — ~3 min =====
    const mediumQuestions: QuizSlideQuestion[] = QUIZ_DATA
      .filter(q => q.difficulty === 'medium')
      .map(q => ({ question: q.question, options: q.options, correct: q.correct }));

    slides.push({
      type: 'quiz',
      title: 'Interaktives Quiz',
      quizQuestions: mediumQuestions,
      notes: '[~3 min] Interaktives Quiz mit der Klasse. Medium-Schwierigkeit. Klicken zum Auflösen.',
      speaker: 'both'
    });

    // ===== 3. GESCHICHTE (Lydia) — ~7 min =====

    slides.push({
      type: 'section',
      icon: '🕰️',
      title: 'Geschichte und Kontext',
      text: 'Von 1870 bis heute — über 150 Jahre Kampf für die Rechte der Kinder',
      notes: '[Überleitung] Lydia beginnt.',
      speaker: 'lydia',
      bgVariant: 'warm',
      bgImage: 'assets/images/slides/section-geschichte.jpg'
    });

    slides.push({
      type: 'info',
      title: 'Geschichte und Kontext der UN-KRK',
      accent: '#FF9800',
      infoItems: [
        'Die Konvention der Vereinten Nationen über die Rechte des Kindes markiert einen bedeutenden Wendepunkt in der Art und Weise, wie Kinder als autonome Wesen und als eigenständige soziale Gruppe mit eigenen Rechten wahrgenommen werden.',
        'Die UN-Kinderrechtskonvention ist jedoch ein Produkt des historischen, kulturellen und politischen Kontextes, aus dem sie hervorgegangen ist.',
        'Die Konvention ist ein Musterbeispiel für einen historischen Wandel im Verständnis von Kindheit.'
      ],
      notes: '[~1 min] Kontext der UN-KRK. Lydia1.pdf Inhalt.',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    slides.push({
      type: 'info',
      title: '',
      accent: '#FF9800',
      infoItems: [
        'Das Konzept der Kindheit änderte sich dies während der Aufklärung und durch den Einfluss Rousseaus, der die Kindheit als eigenständige Entwicklungsphase und als eine Zeit definierte, die vor allem durch Unschuld gekennzeichnet ist.',
        'Anfangs bezog sich diese Konzeptualisierung nur auf die oberen Klassen.',
        'Das 1870 im Vereinigten Königreich in Kraft getretene Bildungsgesetz brachte jedoch bedeutende Fortschritte bei der Änderung dieser Situation.',
        'Von diesem Zeitpunkt an wurden weitere Gesetze und Schutzmaßnahmen eingeführt.',
      ],
      notes: '[~1 min] Rousseau und Aufklärung. Kindheit als Konzept. (Imoah 2012)',
      speaker: 'lydia',
      bgVariant: 'warm',
      compact: true
    });

    slides.push({
      type: 'info',
      title: '',
      accent: '#FF9800',
      infoItems: [
        'Nach dem Ersten und Zweiten Weltkrieg wurden die politischen und rechtlichen Perspektiven des 20. Jahrhunderts grundlegend neu gestaltet (Fass 2011).',
        'Die Zeit nach dem Kalten Krieg führte auch zu einer weiteren Phase der „Liminalität". Institutionen und Weltordnungen, wie man sie bisher kannte, befanden sich erneut im Wandel (Goodall 2015).',
        'Das Aufkommen neuer Verfassungen und politischer Widerstände auf der ganzen Welt (z. B. in Südafrika) trug dazu bei, unser Verständnis von Menschenrechten im Globalen Norden zu prägen.',
        'Die Konvention zielt darauf ab, diese in einer Weise zu universalisieren, die in einem internationalen rechtlichen Kontext (Imoah 2012) anwendbar ist, der über Kulturen hinausgeht (Imoah 2012).',
      ],
      notes: '[~1 min] Weltkriege, Kalter Krieg, Liminalität. Fass 2011, Goodall 2015, Imoah 2012.',
      speaker: 'lydia',
      bgVariant: 'warm',
      compact: true
    });

    slides.push({
      type: 'timeline-group',
      title: 'Grundlagen (1870–1948)',
      events: [
        { year: 1870, title: 'Education Act (UK)', summary: 'Bildung für alle Kinder', color: '#4CAF50' },
        { year: 1924, title: 'Genfer Erklärung', summary: 'Erstes internationales Dokument', color: '#FF9800' },
        { year: 1945, title: 'Gründung der UNO', summary: 'Basis für Menschenrechtsabkommen', color: '#03A9F4' },
        { year: 1948, title: 'Menschenrechtserklärung', summary: 'Besonderer Schutz für Kinder', color: '#03A9F4' },
      ],
      notes: '[~1.5 min] Weltkriege machten Verletzlichkeit deutlich (Fass 2011). Boyden: Kolonialismus verbreitete westliche Kindheitskonzepte.',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    slides.push({
      type: 'timeline-group',
      title: 'Entwicklung (1959–1989)',
      events: [
        { year: 1959, title: 'Rechte des Kindes', summary: '10 Grundsätze, nicht bindend', color: '#4CAF50' },
        { year: 1966, title: 'UN-Sozialpakt', summary: 'Verbindlicher Kinderschutz', color: '#E91E63' },
        { year: 1979, title: 'Jahr des Kindes', summary: 'Polen schlägt KRK vor', color: '#FF9800' },
      ],
      notes: '[~1 min] Goodall 2015: „Liminality" öffnete Raum für Menschenrechtsdiskurs.',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    slides.push({
      type: 'stat',
      statValue: '1989',
      statLabel: 'UN-Kinderrechtskonvention',
      text: '54 Artikel · 196 Staaten · Das meistratifizierte Menschenrechtsabkommen der Welt.',
      color: '#03A9F4',
      statSource: 'UN-Generalversammlung, 20. November 1989',
      notes: '[~1 min] Highlight: 10 Jahre Arbeit. Einstimmig verabschiedet.',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    slides.push({
      type: 'timeline-group',
      title: 'Nach der KRK (1990–2015)',
      events: [
        { year: 1990, title: 'KRK tritt in Kraft', summary: 'Schnellste Ratifikation', color: '#4CAF50' },
        { year: 1992, title: '05. April', summary: 'Ratifizierung Deutschland', color: '#FF9800' },
        { year: 2000, title: 'Zusatzprotokolle', summary: 'Kinderhandel & Kindersoldaten', color: '#E91E63' },
        { year: 2011, title: 'Beschwerderecht', summary: 'Kinder klagen beim UN-Ausschuss', color: '#03A9F4' },
        { year: 2015, title: 'Somalia ratifiziert', summary: 'Nur noch die USA fehlen', color: '#4CAF50' },
      ],
      notes: '[~1 min] Deutschland ratifizierte 1992. Drittes Zusatzprotokoll = individuelles Beschwerderecht.',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    slides.push({
      type: 'timeline-group',
      title: 'Aktuelle Herausforderungen',
      events: [
        { year: 2019, title: '30 Jahre KRK', summary: 'Fortschritte und offene Fragen', color: '#FF9800' },
        { year: 2020, title: 'COVID-19', summary: '1,6 Mrd. Kinder ohne Schule', color: '#C0392B' },
        { year: 2024, title: 'Rekord-Verletzungen', summary: '32.990 Verstöße dokumentiert', color: '#C0392B' },
        { year: 2025, title: '138 Mio. Kinderarbeit', summary: 'UN-Ziel 2025 verfehlt', color: '#B7950B' },
      ],
      notes: '[~1 min] 30 Jahre mit gemischter Bilanz. COVID als Kinderrechtekrise.',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    // ===== 4. ÜBERBLICK & ARTIKEL (Zua) — ~5 min =====
    // Categories merged INTO article-groups: overview + 4 article-groups with category header

    slides.push({
      type: 'section',
      icon: '📄',
      title: 'Überblick & Schlüsselartikel',
      text: 'Die vier Grundprinzipien und die wichtigsten Artikel der UN-KRK.',
      notes: '[Überleitung] Zua übernimmt.',
      speaker: 'zua',
      bgImage: 'assets/images/slides/section-ueberblick.jpg'
    });

    slides.push({
      type: 'overview',
      title: 'Die vier Grundprinzipien',
      text: 'Alle Kinderrechte lassen sich in vier Kategorien einordnen.',
      items: [
        { label: 'Überleben', desc: 'Leben, Gesundheit, Ernährung', color: '#FF9800' },
        { label: 'Entwicklung', desc: 'Bildung, Spiel, Freizeit', color: '#4CAF50' },
        { label: 'Schutz', desc: 'Vor Gewalt, Missbrauch, Ausbeutung', color: '#E91E63' },
        { label: 'Beteiligung', desc: 'Meinungsäußerung, Mitbestimmung', color: '#03A9F4' }
      ],
      notes: '[~1 min] Vier Grundprinzipien erklären. Details folgen in den Artikeln.',
      speaker: 'zua'
    });

    // Article-groups with category context built in
    const keyArticles = ARTICLES_DATA.filter(a => a.key);
    const groups: { key: CategoryKey; name: string; color: string; icon: string }[] = [
      { key: 'survival', name: 'Überleben', color: '#FF9800', icon: '❤️' },
      { key: 'development', name: 'Entwicklung', color: '#4CAF50', icon: '🎓' },
      { key: 'protection', name: 'Schutz', color: '#E91E63', icon: '🛡️' },
      { key: 'participation', name: 'Beteiligung', color: '#03A9F4', icon: '👥' },
    ];

    for (const g of groups) {
      const arts = keyArticles.filter(a => a.category === g.key);
      if (arts.length > 0) {
        slides.push({
          type: 'article-group',
          title: g.name,
          icon: g.icon,
          categoryColor: g.color,
          articles: arts.map(a => ({
            id: a.id,
            title: a.title,
            summary: a.summary,
            full: a.full,
            category: a.category,
            categoryColor: CATEGORIES[a.category].color,
            categoryName: CATEGORIES[a.category].name
          })),
          notes: '[~1 min] ' + arts.map(a => `Art. ${a.id}: ${a.title}`).join('. '),
          speaker: 'zua'
        });
      }
    }

    // Article Browser — interactive search for Q&A
    slides.push({
      type: 'article-browser',
      title: 'Alle 54 Artikel der UN-KRK',
      notes: '[Q&A Hilfsmittel] Artikel suchen und filtern. Nützlich wenn Publikum nach bestimmten Artikeln fragt.',
      speaker: 'both'
    });

    // ===== 5. VERLETZUNGEN (Zua) — ~4 min =====

    slides.push({
      type: 'section',
      icon: '🌍',
      title: 'Verletzungen weltweit',
      text: '2024 war eines der schlimmsten Jahre für Kinder in Konflikten.',
      notes: '[Überleitung] Verletzungen.',
      speaker: 'zua',
      bgVariant: 'red',
      bgImage: 'assets/images/slides/section-verletzungen.jpg'
    });

    slides.push({
      type: 'stat',
      statValue: '473 Mio.',
      statLabel: 'Kinder in Konfliktgebieten',
      text: 'Mehr als jedes sechste Kind weltweit lebt in einer Konfliktzone.',
      color: '#C0392B',
      statSource: 'UNICEF 2024',
      notes: '[~1 min] UNICEF State of the World\'s Children 2024.',
      speaker: 'zua',
      bgVariant: 'red'
    });

    slides.push({
      type: 'stat',
      statValue: '138 Mio.',
      statLabel: 'Kinder in Kinderarbeit',
      text: 'UN-Ziel, Kinderarbeit bis 2025 zu beenden, wurde verfehlt.',
      color: '#E67E22',
      statSource: 'ILO/UNICEF 2024',
      notes: '[~30 sec]',
      speaker: 'zua',
      bgVariant: 'red'
    });

    slides.push({
      type: 'compare',
      title: 'Fortschritte & Rückschläge',
      compareLeft: { title: 'Fortschritte', items: ['Kindersterblichkeit: 33% → 4%', 'Mangelernährung: 40% → 22%', '196 Staaten ratifiziert'], color: '#4CAF50' },
      compareRight: { title: 'Rückschläge', items: ['417 Mio. Kinder in Armut', '650 Mio. Frauen als Kind verheiratet', '52 Mio. ohne Schulzugang'], color: '#C0392B' },
      notes: '[~1 min] Noch 113 Jahre bis zur vollen Umsetzung.',
      speaker: 'zua',
      bgVariant: 'red'
    });

    // Positive note to close violations section
    slides.push({
      type: 'stat',
      statValue: '196',
      statLabel: 'Staaten haben die UN-KRK ratifiziert',
      text: 'Das meistratifizierte Menschenrechtsabkommen der Welt — nur die USA fehlen.',
      color: '#4CAF50',
      statSource: 'UN Treaty Collection 2024',
      notes: '[~30 sec] Hoffnungsnote: Trotz Rückschlägen gibt es breiten Konsens.',
      speaker: 'zua'
    });

    // ===== 6. VERMITTLUNG & SCHUTZ (Zua) — ~4 min =====

    slides.push({
      type: 'section',
      icon: '🏫',
      title: 'Vermittlung & Schutz',
      text: 'Wie werden Kinderrechte vermittelt — und wie werden Kinder geschützt?',
      notes: '[Überleitung] Von Problemen zu Lösungen.',
      speaker: 'zua',
      bgVariant: 'green',
      bgImage: 'assets/images/slides/section-vermittlung.jpg'
    });

    slides.push({
      type: 'overview',
      title: 'Vermittlung an Kinder',
      items: [
        { label: 'Kindergarten (3–6)', desc: 'Bilderbücher, Rollenspiele, Fairness', color: '#FF9800' },
        { label: 'Grundschule (6–10)', desc: 'Projekttage, Klassenräte, Poster', color: '#4CAF50' },
        { label: 'Sekundarstufe (10–18)', desc: 'Planspiele, Debatten, Fallstudien', color: '#03A9F4' }
      ],
      notes: '[~1 min] Altersgerechte Vermittlung. UNICEF-Schulen als Best Practice.',
      speaker: 'zua',
      bgVariant: 'green'
    });

    slides.push({
      type: 'stat',
      statValue: '§ 45',
      statLabel: 'SGB VIII — Betriebserlaubnis',
      text: 'Seit 2021: Gewaltschutzkonzept Pflicht. Seit 2012: Beschwerdemanagement für Kinder.',
      color: '#7B1FA2',
      statSource: '§ 45 Abs. 2 Nr. 3 SGB VIII',
      notes: '[~1 min] § 45 SGB VIII als Schlüsselnorm.',
      speaker: 'zua'
    });

    slides.push({
      type: 'timeline-group',
      title: 'Schutz in Deutschland',
      events: [
        { year: 1949, title: 'Grundgesetz Art. 6', summary: 'Familie unter staatlichem Schutz', color: '#03A9F4' },
        { year: 2000, title: 'Gewaltfreie Erziehung', summary: '§ 1631 Abs. 2 BGB', color: '#4CAF50' },
        { year: 2012, title: 'Beschwerderecht', summary: '§ 45 SGB VIII Pflicht', color: '#FF9800' },
        { year: 2021, title: 'Gewaltschutzkonzept', summary: 'Pflicht für alle Einrichtungen', color: '#E91E63' }
      ],
      notes: '[~1 min] § 8a SGB VIII, Nummer gegen Kummer.',
      speaker: 'zua',
      bgVariant: 'green'
    });

    slides.push({
      type: 'compare',
      title: 'Zukunft der Kinderrechte',
      compareLeft: { title: 'Herausforderungen', items: ['Digitale Rechte & Online-Sicherheit', 'Klimawandel bedroht Gesundheit', 'Grundgesetz-Debatte'], color: '#03A9F4' },
      compareRight: { title: 'Positive Entwicklungen', items: ['2026: Jahr der Kinderrechte', 'Kinderrechte-Index 2025', 'Kinder als politische Akteure'], color: '#4CAF50' },
      notes: '[~1 min] Überleitung zu Lydia.',
      speaker: 'zua',
      bgVariant: 'green'
    });

    // ===== 7. KRITISCHE PERSPEKTIVEN (Lydia) — ~7 min =====

    slides.push({
      type: 'section',
      icon: '🔍',
      title: 'Kritische Perspektiven',
      text: 'Ist die UN-KRK an alle soziokulturellen Kontexte angepasst?',
      notes: '[Überleitung] Lydia übernimmt.',
      speaker: 'lydia',
      bgVariant: 'purple',
      bgImage: 'assets/images/slides/section-kritik.jpg'
    });

    slides.push({
      type: 'quote',
      quoteText: 'Die UN-Kinderrechtskonvention universalisiert westliche Konzepte von Kindheit.',
      quoteAuthor: 'Imoah, 2012',
      notes: '[~1 min] KRK wurzelt in westlichen Entwicklungen. UNO = Produkt des Global North.',
      speaker: 'lydia',
      bgVariant: 'purple'
    });

    slides.push({
      type: 'info',
      title: 'Kritik und interkulturelle Ansätze - Eine Anthropologische Perspektive',
      accent: '#9C27B0',
      infoItems: [
        'Ist die Erklärung an aktuellen soziokulturellen und politischen Kontexte angepasst?',
        'Die Anthropologie der Kindheit versucht, Kindheit als Ausdruck bestimmter Werte und Normen zu verstehen (Goodall 2015). Was als „normale Kindheit" gilt, hängt davon ab, wo man lebt und wo man geboren wurde. Auch unsere Vorstellungen von Rechten und Pflichten ändern sich mit der Zeit (Goodall 2015).',
        'Laut Goodall müssen bei der Betrachtung der Kinderrechte die folgenden Aspekte berücksichtigt werden: Kultur · Geschlecht · Patriarchale Strukturen · Religion · Universelle Bestrebungen · Regulierung der Arbeitsmärkte und Armut',
      ],
      notes: '[~1.5 min] Anthropologische Perspektive. Goodall 2015: 6 Faktoren der Kindheit.',
      speaker: 'lydia',
      bgVariant: 'purple',
      compact: true
    });



    slides.push({
      type: 'info',
      title: '',
      accent: '#9C27B0',
      infoItems: [
        'Eine der Kritikpunkte an der Konvention ist, dass sie zu einer „liberalen, westlichen Voreingenommenheit" neigt und dass sie von Natur aus „paternalistisch" ist (Quennerstedt, Robinson und L\'Anon 2018).',
        'Ein weiteres Argument lautet, dass die Konvention die Spannung zwischen den individuellen Rechten und den kollektiven Rechten, die ein Kind als Mitglied der Gemeinschaft hat, nicht berücksichtigt.',
        'Billaud (2022) spricht über die Bedeutung der Arbeit von Anthropologen, die die alltäglichen Praktiken von Gemeinschaften untersuchen, die Menschenrechte in der „realen Welt" aufrechterhalten.',
        'Es wird argumentiert, dass die Konvention „Unklarheiten und Mehrdeutigkeiten" aufweist (Quennerstedt, Robinson und L\'Anon 2018).',
      ],
      notes: '[~1 min] Kritikpunkte: westlicher Bias, Paternalismus, individuelle vs. kollektive Rechte.',
      speaker: 'lydia',
      bgVariant: 'purple',
      compact: true
    });

    slides.push({
      type: 'info',
      title: '',
      accent: '#9C27B0',
      infoItems: [
        'Die Frage ist: Hält der kulturelle Relativismus einer genauen Prüfung stand? Oder gibt es moralische Absolutheiten, die wir universell aufrechterhalten müssen? Oder liegt die Antwort irgendwo dazwischen?',
        'Wo stehen wir nun?',
        'Ist die Konvention nur ein „westliches Konstrukt"?',
        'Können wir einen Mittelweg finden?',
        'Was bedeutet das für eine multikulturelle Gesellschaft und eine multikulturelle Stadt wie Berlin?',
      ],
      notes: '[~1 min] Offene Fragen zum Nachdenken. Überleitung zur Diskussion.',
      speaker: 'lydia',
      bgVariant: 'purple'
    });

    slides.push({
      type: 'compare',
      title: 'Fallstudien',
      compareLeft: { title: 'Südafrika (Levine 2011)', items: ['Kinderarbeitsgesetze eingeführt', 'Saisonarbeit nicht mehr möglich', 'Armut der Kinder stieg'], color: '#FF9800' },
      compareRight: { title: 'Malawi (Englund / Billaud)', items: ['Menschenrechtsdiskurs kam', '„Freiheit" ignorierte Armut', 'Oberschicht profitierte'], color: '#C0392B' },
      notes: '[~1.5 min] Gut gemeint ≠ gut gemacht. Englund: „Prisoners of Freedom".',
      speaker: 'lydia',
      bgVariant: 'purple'
    });

    slides.push({
      type: 'info',
      title: 'Moderne Entwicklungen und alternative Ansätze',
      accent: '#9C27B0',
      infoItems: [
        'Die Afrikanische Charta über die Rechte und das Wohlergehen des Kindes (1999)',
        'Afrikanischer Sachverständigenausschuss für die Rechte und das Wohlergehen des Kindes',
        'Europäische Sozialcharta',
        'Übereinkommen zum Schutz von Kindern vor sexueller Ausbeutung und sexuellem Missbrauch (Lanzarote-Konvention) 2007',
        'Europäisches Übereinkommen zur Verhütung von Folter und unmenschlicher oder erniedrigender Behandlung oder Strafe (1989)',
        'Charta der Grundrechte der Europäischen Union',
        'Menschenrechtserklärung der Vereinigung südostasiatischer Staaten (ASEAN) (2012)',
      ],
      notes: '[~1 min] Alternative regionale Ansätze zum Schutz der Kinderrechte.',
      speaker: 'lydia',
      bgVariant: 'purple',
      compact: true
    });

    slides.push({
      type: 'info',
      title: '„Post-paternalistischer Ansatz"',
      accent: '#9C27B0',
      infoItems: [
        'Der Aufstieg des Jugendaktivismus als Reaktion auf den Klimawandel hat die Fähigkeit direkter partizipativer Maßnahmen zur Herbeiführung von Veränderungen deutlich gemacht.',
        'Dies hat Auswirkungen auf internationale Rechtsrahmen, die von Natur aus von Erwachsenen geprägt sind (Daly 2022).',
        'Befreiung der Jugend (politische Theorie)',
      ],
      notes: '[~1 min] Post-paternalistischer Ansatz. Daly 2022: Jugendaktivismus und Klimawandel.',
      speaker: 'lydia',
      bgVariant: 'purple'
    });

    slides.push({
      type: 'info',
      title: 'Zukünftige Perspektiven und politische Auswirkungen',
      subtitle: 'Fragen zum Nachdenken und zur Diskussion',
      accent: '#9C27B0',
      infoItems: [
        'Wie sehen Kinderrechte in unserem aktuellen politischen Klima aus?',
        'Im Lichte der sozialen Medien?',
        'Im Lichte des zunehmenden Rechtsextremismus?',
        'Im Lichte der Folgen der Covid-Pandemie?',
        'Im Lichte des Klimawandels?',
      ],
      notes: '[~1 min] Fragen zum Nachdenken. Überleitung zur Interaktion.',
      speaker: 'lydia',
      bgVariant: 'purple'
    });

    // ===== 8. INTERACTION (Both) — ~3 min =====
    slides.push({
      type: 'interaction',
      title: 'Was denkt ihr?',
      interactionQuestion: 'Können Kinderrechte universell gelten — oder müssen sie kulturell angepasst werden?',
      interactionOptions: ['Universell — für alle gleich', 'Kulturell anpassen', 'Kern universal, Details lokal', 'Weiß ich nicht'],
      notes: '[~3 min] Handzeichen. Direkt an Lydias Frage anknüpfen. Kurz diskutieren.',
      speaker: 'both'
    });

    // ===== 9. ZUSAMMENFASSUNG (Both) — ~1 min =====
    slides.push({
      type: 'summary',
      title: 'Zusammenfassung',
      summaryItems: [
        '150+ Jahre Geschichte: Von 1870 bis zur UN-KRK 1989',
        '54 Artikel in 4 Kategorien: Überleben, Entwicklung, Schutz, Beteiligung',
        'Fortschritte (Sterblichkeit ↓) und Rückschläge (473 Mio. in Konflikten)',
        'Vermittlung durch Kita, Schule, Eltern (§ 45, § 8a SGB VIII)',
        'Kritik: Westlicher Bias, kulturelle Unterschiede, unbeabsichtigte Effekte',
      ],
      notes: '[~1 min] Kernpunkte — gleiche Reihenfolge wie Präsentation.',
      speaker: 'both'
    });

    // ===== 10. DISKUSSION (Both) — Q&A up to 30 min =====
    slides.push({
      type: 'question',
      title: 'Diskussionsfragen',
      questions: [
        'Sollten Kinderrechte explizit im Grundgesetz stehen?',
        'Wie können Kinder in der Schule stärker mitbestimmen?',
        'Brauchen wir neue Kinderrechte für die digitale Welt?',
        'Welche Kinderrechte werden in Deutschland am häufigsten übersehen?',
        'Was kann jeder Einzelne für Kinderrechte tun?'
      ],
      notes: '[Q&A bis zu 30 min] Klasse einbeziehen.',
      speaker: 'both'
    });

    // ===== 11. END =====
    slides.push({
      type: 'end',
      title: 'Vielen Dank!',
      subtitle: 'Fragen & Diskussion',
      authors: 'Lydia Howe & Alexandre Zua Caldeira',
      meta: 'Fach: Recht · Lehrer: Uwe Otto · 06. März 2026',
      notes: 'Danke sagen. QR-Code zeigen. Für Fragen offen bleiben.',
      speaker: 'both'
    });

    return slides;
  }
}
