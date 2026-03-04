import { Injectable, signal, computed } from '@angular/core';
import { PresentationSlide } from '../models/presentation';
import { ARTICLES_DATA } from '../data/articles';
import { CATEGORIES } from '../data/categories';

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

    // ===== 1. HERO (Both) — ~1 min =====
    slides.push({
      type: 'hero',
      title: 'Kinderrechte',
      subtitle: 'Die UN-Kinderrechtskonvention — Geschichte, Artikel & Vermittlung',
      authors: 'Lydia Howe & Alexandre Zua Caldeira',
      meta: 'Fach: Recht · Lehrer: Uwe Otto · 06. März 2026',
      notes: '[~1 min] Begrüßung. Thema vorstellen: UN-KRK, 54 Artikel, seit 1989.',
      speaker: 'both'
    });

    // ===== 2. AGENDA (Both) — ~1 min =====
    slides.push({
      type: 'agenda',
      title: 'Gliederung',
      agendaItems: [
        { label: 'Überblick & Kategorien', speaker: 'Zua', icon: '📊' },
        { label: 'Geschichte der Kinderrechte', speaker: 'Lydia', icon: '🕰️' },
        { label: '10 Schlüsselartikel', speaker: 'Zua', icon: '📄' },
        { label: 'Vermittlung & Schutz', speaker: 'Zua', icon: '🏫' },
        { label: 'Verletzungen weltweit', speaker: 'Zua', icon: '🌍' },
        { label: 'Kritische Perspektiven', speaker: 'Lydia', icon: '🔍' },
        { label: 'Diskussion', speaker: 'Alle', icon: '💬' },
      ],
      notes: '[~1 min] Gliederung vorstellen. Wer präsentiert was.',
      speaker: 'both'
    });

    // ===== 3. OVERVIEW & CATEGORIES (Zua) — ~3 min =====
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
      notes: '[~1 min] Vier Grundprinzipien erklären.',
      speaker: 'zua'
    });

    slides.push({ type: 'category', key: 'survival', title: 'Überleben', text: 'Recht auf Leben, Gesundheit und angemessenen Lebensstandard', icon: '❤️', color: '#FF9800', notes: 'Art. 6, 24, 27.', speaker: 'zua' });
    slides.push({ type: 'category', key: 'development', title: 'Entwicklung', text: 'Recht auf Bildung, Spiel, Freizeit und Information', icon: '🎓', color: '#4CAF50', notes: 'Art. 28/29, 31, 17.', speaker: 'zua' });
    slides.push({ type: 'category', key: 'protection', title: 'Schutz', text: 'Schutz vor Gewalt, Missbrauch und Ausbeutung', icon: '🛡️', color: '#E91E63', notes: 'Art. 19, 32, 2.', speaker: 'zua' });
    slides.push({ type: 'category', key: 'participation', title: 'Beteiligung', text: 'Recht auf Meinungsäußerung und Mitbestimmung', icon: '👥', color: '#03A9F4', notes: 'Art. 12, 13, 15.', speaker: 'zua' });

    // ===== 4. GESCHICHTE (Lydia) — ~7 min =====

    slides.push({
      type: 'section',
      icon: '🕰️',
      title: 'Geschichte der Kinderrechte',
      text: 'Von 1870 bis heute — über 150 Jahre Kampf für die Rechte der Kinder',
      notes: '[Überleitung] Lydia übernimmt.',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    slides.push({
      type: 'quote',
      quoteText: 'Die Aufklärung definierte Kindheit erstmals als eigenständige Entwicklungsphase — geprägt von Unschuld und Schutzbedürftigkeit.',
      quoteAuthor: 'Nach Rousseau · Imoah 2012',
      notes: '[~1 min] Rousseau: Kindheit als eigene Phase. Zunächst nur Oberschicht.',
      speaker: 'lydia',
      bgVariant: 'warm'
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
      notes: '[~1 min] Post-Cold-War: Neue Verfassungen. Goodall 2015: „Liminality" öffnete Raum für Menschenrechtsdiskurs.',
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
      notes: '[~1 min] Highlight: 10 Jahre Arbeit. Einstimmig verabschiedet. NGOs hatten großen Einfluss.',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    slides.push({
      type: 'timeline-group',
      title: 'Nach der KRK (1990–2015)',
      events: [
        { year: 1990, title: 'KRK tritt in Kraft', summary: 'Schnellste Ratifikation', color: '#4CAF50' },
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
      notes: '[~1 min] 30 Jahre Jubiläum mit gemischter Bilanz. COVID als Kinderrechtekrise.',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    // ===== 5. SCHLÜSSELARTIKEL (Zua) — ~4 min =====

    slides.push({
      type: 'section',
      icon: '📄',
      title: 'Die Schlüsselartikel',
      text: 'Die UN-KRK enthält 54 Artikel — hier die wichtigsten.',
      notes: '[Überleitung] Zua übernimmt.',
      speaker: 'zua'
    });

    const keyArticles = ARTICLES_DATA.filter(a => a.key);
    const survivalArts = keyArticles.filter(a => a.category === 'survival');
    const devArts = keyArticles.filter(a => a.category === 'development');
    const protArts = keyArticles.filter(a => a.category === 'protection');
    const partArts = keyArticles.filter(a => a.category === 'participation');

    if (survivalArts.length > 0) {
      slides.push({
        type: 'article-group',
        title: 'Überleben',
        categoryColor: '#FF9800',
        articles: survivalArts.map(a => ({ id: a.id, title: a.title, summary: a.summary, category: a.category, categoryColor: CATEGORIES[a.category].color })),
        notes: '[~1 min] ' + survivalArts.map(a => `Art. ${a.id}: ${a.title}`).join('. '),
        speaker: 'zua'
      });
    }

    if (devArts.length > 0) {
      slides.push({
        type: 'article-group',
        title: 'Entwicklung',
        categoryColor: '#4CAF50',
        articles: devArts.map(a => ({ id: a.id, title: a.title, summary: a.summary, category: a.category, categoryColor: CATEGORIES[a.category].color })),
        notes: '[~1 min] ' + devArts.map(a => `Art. ${a.id}: ${a.title}`).join('. '),
        speaker: 'zua'
      });
    }

    if (protArts.length > 0) {
      slides.push({
        type: 'article-group',
        title: 'Schutz',
        categoryColor: '#E91E63',
        articles: protArts.map(a => ({ id: a.id, title: a.title, summary: a.summary, category: a.category, categoryColor: CATEGORIES[a.category].color })),
        notes: '[~1 min] ' + protArts.map(a => `Art. ${a.id}: ${a.title}`).join('. '),
        speaker: 'zua'
      });
    }

    if (partArts.length > 0) {
      slides.push({
        type: 'article-group',
        title: 'Beteiligung',
        categoryColor: '#03A9F4',
        articles: partArts.map(a => ({ id: a.id, title: a.title, summary: a.summary, category: a.category, categoryColor: CATEGORIES[a.category].color })),
        notes: '[~1 min] ' + partArts.map(a => `Art. ${a.id}: ${a.title}`).join('. '),
        speaker: 'zua'
      });
    }

    // ===== 6. VERMITTLUNG (Zua) — ~4 min =====

    slides.push({
      type: 'section',
      icon: '🏫',
      title: 'Vermittlung',
      text: 'Wie werden Kinderrechte in Kita, Schule und Familie vermittelt?',
      notes: '[Überleitung] Thema Vermittlung.',
      speaker: 'zua',
      bgVariant: 'green'
    });

    slides.push({
      type: 'info',
      title: 'Vermittlung an Kinder',
      accent: '#4CAF50',
      infoItems: [
        'Kindergarten (3–6): Bilderbücher, Rollenspiele, Fairness',
        'Grundschule (6–10): Projekttage, Klassenräte, Poster',
        'Sekundarstufe (10–18): Planspiele, Debatten, Fallstudien'
      ],
      notes: '[~1 min] Altersgerechte Vermittlung. UNICEF-Schulen als Best Practice.',
      speaker: 'zua'
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
      type: 'info',
      title: 'Schutz in Deutschland',
      accent: '#E91E63',
      infoItems: [
        'Jugendamt: Schutzauftrag (§ 8a SGB VIII)',
        'Grundgesetz: Art. 6 + Art. 2 — Familie & Entfaltung',
        'Gewaltfreie Erziehung seit 2000 (§ 1631 Abs. 2 BGB)',
        'Nummer gegen Kummer: 116 111'
      ],
      notes: '[~1 min] § 8a SGB VIII, Nummer gegen Kummer.',
      speaker: 'zua'
    });

    slides.push({
      type: 'compare',
      title: 'Zukunft der Kinderrechte',
      compareLeft: { title: 'Herausforderungen', items: ['Digitale Rechte & Online-Sicherheit', 'Klimawandel bedroht Gesundheit', 'Grundgesetz-Debatte'], color: '#03A9F4' },
      compareRight: { title: 'Positive Entwicklungen', items: ['2026: Jahr der Kinderrechte', 'Kinderrechte-Index 2025', 'Kinder als politische Akteure'], color: '#4CAF50' },
      notes: '[~1 min] 2026 als Jahr der Kinderrechte.',
      speaker: 'zua'
    });

    // ===== 7. VERLETZUNGEN (Zua) — ~4 min =====

    slides.push({
      type: 'section',
      icon: '🌍',
      title: 'Verletzungen weltweit',
      text: '2024 war eines der schlimmsten Jahre für Kinder in Konflikten.',
      notes: '[Überleitung] Verletzungen.',
      speaker: 'zua',
      bgVariant: 'red'
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
      type: 'stat',
      statValue: '~4%',
      statLabel: 'Kindersterblichkeit heute',
      text: 'Von ~33% (1924) auf unter 4% — einer der größten Fortschritte der Menschheit.',
      color: '#4CAF50',
      statSource: 'WHO/UNICEF 2024',
      notes: '[~30 sec] Fortschritte durch Impfungen, Ernährung, Medizin.',
      speaker: 'zua'
    });

    slides.push({
      type: 'compare',
      title: 'Fortschritte & Rückschläge',
      compareLeft: { title: 'Fortschritte', items: ['Kindersterblichkeit: 33% → 4%', 'Mangelernährung: 40% → 22%', '196 Staaten ratifiziert'], color: '#4CAF50' },
      compareRight: { title: 'Rückschläge', items: ['417 Mio. Kinder in Armut', '650 Mio. Frauen als Kind verheiratet', '52 Mio. ohne Schulzugang'], color: '#C0392B' },
      notes: '[~1 min] Noch 113 Jahre bis zur vollen Umsetzung.',
      speaker: 'zua'
    });

    // ===== 8. KRITISCHE PERSPEKTIVEN (Lydia) — ~7 min =====

    slides.push({
      type: 'section',
      icon: '🔍',
      title: 'Kritische Perspektiven',
      text: 'Ist die UN-KRK an alle soziokulturellen Kontexte angepasst?',
      notes: '[Überleitung] Lydia übernimmt.',
      speaker: 'lydia',
      bgVariant: 'purple'
    });

    slides.push({
      type: 'quote',
      quoteText: 'Die UN-Kinderrechtskonvention universalisiert westliche Konzepte von Kindheit.',
      quoteAuthor: 'Imoah, 2012',
      notes: '[~1 min] KRK wurzelt in westlichen Entwicklungen. UNO selbst = Produkt des Global North.',
      speaker: 'lydia',
      bgVariant: 'purple'
    });

    slides.push({
      type: 'info',
      title: 'Anthropologische Kritik',
      accent: '#9C27B0',
      infoItems: [
        '„Liberaler, westlicher Bias" (Quennerstedt 2018)',
        'Kindheit ist kulturell geprägt, nicht universell (Goodall 2015)',
        'AAA kritisierte 1947: „cultural imperialism" (Billaud 2022)',
        'Art. 3 „Kindeswohl" wurde nie definiert'
      ],
      notes: '[~1.5 min] Quennerstedt, Robinson & L\'Anon 2018. Anthropologen seit 1980er: Rechte als dynamische soziale Praxis.',
      speaker: 'lydia',
      bgVariant: 'purple'
    });

    // All 6 Goodall factors
    slides.push({
      type: 'overview',
      title: '6 Faktoren der Kindheit (Goodall 2015)',
      text: 'Was als „normale Kindheit" gilt, variiert weltweit.',
      items: [
        { label: 'Kultur', desc: 'Lokale Werte & Normen', color: '#FF9800' },
        { label: 'Gender', desc: 'Geschlechterrollen', color: '#E91E63' },
        { label: 'Patriarchat', desc: 'Machtstrukturen', color: '#795548' },
        { label: 'Religion', desc: 'Glaubenssysteme', color: '#9C27B0' },
      ],
      notes: '[~1 min] + 2 weitere Faktoren: Universale Aspirationen und Regulierung von Arbeitsmärkten & Armut. Kulturrelativismus vs. Universalismus.',
      speaker: 'lydia',
      bgVariant: 'purple'
    });

    slides.push({
      type: 'info',
      title: 'Weitere Faktoren',
      accent: '#795548',
      infoItems: [
        'Universale Aspirationen — globale Ideale vs. lokale Realitäten',
        'Regulierung von Arbeitsmärkten & Armut — ökonomische Kontexte prägen Kindheit',
      ],
      notes: 'Goodall\'s 5. und 6. Faktor. Wie Armut und Arbeitsmarktregulierung Kindheit definieren.',
      speaker: 'lydia',
      bgVariant: 'purple'
    });

    slides.push({
      type: 'compare',
      title: 'Fallstudien',
      compareLeft: { title: 'Südafrika (Levine 2011)', items: ['Kinderarbeitsgesetze eingeführt', 'Saisonarbeit nicht mehr möglich', 'Armut der Kinder stieg'], color: '#FF9800' },
      compareRight: { title: 'Malawi (Englund / Billaud)', items: ['Menschenrechtsdiskurs kam', '„Freiheit" ignorierte Armut', 'Oberschicht profitierte'], color: '#C0392B' },
      notes: '[~1.5 min] Levine/Hanson 2014: Gut gemeint ≠ gut gemacht. Englund: „Prisoners of Freedom".',
      speaker: 'lydia',
      bgVariant: 'purple'
    });

    slides.push({
      type: 'quote',
      quoteText: 'Kulturrelativismus oder universelle Rechte? Oder liegt die Antwort in der Mitte?',
      quoteAuthor: 'Offene Frage zur Diskussion',
      notes: '[~30 sec] Frage offen an die Klasse stellen. Überleitung zur Interaktion.',
      speaker: 'lydia',
      bgVariant: 'purple'
    });

    // ===== 9. INTERACTION (Both) — ~3 min =====
    slides.push({
      type: 'interaction',
      title: 'Was denkt ihr?',
      interactionQuestion: 'Welches Kinderrecht ist eurer Meinung nach am wichtigsten?',
      interactionOptions: ['Recht auf Bildung', 'Recht auf Schutz vor Gewalt', 'Recht auf Mitbestimmung', 'Recht auf Gesundheit'],
      notes: '[~3 min] Handzeichen. Kurz diskutieren warum.',
      speaker: 'both'
    });

    // ===== 10. ZUSAMMENFASSUNG (Both) — ~1 min =====
    slides.push({
      type: 'summary',
      title: 'Zusammenfassung',
      summaryItems: [
        '54 Artikel in 4 Kategorien: Überleben, Entwicklung, Schutz, Beteiligung',
        '150+ Jahre Geschichte: Von 1870 bis zur UN-KRK 1989',
        'Vermittlung durch Kita, Schule, Eltern (§ 45, § 8a SGB VIII)',
        'Fortschritte (Sterblichkeit ↓) und Rückschläge (473 Mio. in Konflikten)',
        'Kritik: Westlicher Bias, kulturelle Unterschiede, unbeabsichtigte Effekte',
      ],
      notes: '[~1 min] Kernpunkte zusammenfassen.',
      speaker: 'both'
    });

    // ===== 11. DISKUSSION (Both) — Q&A up to 30 min =====
    slides.push({
      type: 'question',
      title: 'Diskussionsfragen',
      questions: [
        'Sollten Kinderrechte explizit im Grundgesetz stehen?',
        'Wie können Kinder in der Schule stärker mitbestimmen?',
        'Brauchen wir neue Kinderrechte für die digitale Welt?',
        'Sind Kinderrechte universell — oder kulturell bedingt?',
        'Was kann jeder Einzelne für Kinderrechte tun?'
      ],
      notes: '[Q&A bis zu 30 min] Klasse einbeziehen. Jede Frage kurz anmoderieren.',
      speaker: 'both'
    });

    // ===== 12. END =====
    slides.push({
      type: 'end',
      title: 'Vielen Dank!',
      subtitle: 'Fragen & Diskussion',
      authors: 'Lydia Howe & Alexandre Zua Caldeira',
      meta: 'Fach: Recht · Lehrer: Uwe Otto · 06. März 2026',
      notes: 'Danke sagen. Für Fragen offen bleiben.',
      speaker: 'both'
    });

    return slides;
  }
}
