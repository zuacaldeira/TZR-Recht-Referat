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

    // ===== 1. HERO =====
    slides.push({
      type: 'hero',
      title: 'Kinderrechte',
      subtitle: 'Die UN-Kinderrechtskonvention — Geschichte, Artikel & Vermittlung',
      authors: 'Lydia Howe & Alexandre Zua Caldeira',
      meta: 'Fach: Recht · Lehrer: Uwe Otto · 06. März 2026',
      notes: 'Begrüßung. Thema vorstellen: UN-KRK, 54 Artikel, seit 1989. 196 Staaten ratifiziert.',
      speaker: 'both'
    });

    // ===== 2. AGENDA =====
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
      notes: 'Gliederung vorstellen. Wer präsentiert was.',
      speaker: 'both'
    });

    // ===== 3. OVERVIEW & CATEGORIES (Zua) =====
    slides.push({
      type: 'overview',
      title: 'Die vier Grundprinzipien',
      text: 'Alle Kinderrechte lassen sich in vier zentrale Kategorien einordnen.',
      items: [
        { label: 'Überleben', desc: 'Leben, Gesundheit, Ernährung', color: '#FF9800' },
        { label: 'Entwicklung', desc: 'Bildung, Spiel, Freizeit', color: '#4CAF50' },
        { label: 'Schutz', desc: 'Vor Gewalt, Missbrauch, Ausbeutung', color: '#E91E63' },
        { label: 'Beteiligung', desc: 'Meinungsäußerung, Mitbestimmung', color: '#03A9F4' }
      ],
      notes: 'Vier Grundprinzipien erklären. Jede Kategorie kurz ansprechen.',
      speaker: 'zua'
    });

    slides.push({ type: 'category', key: 'survival', title: 'Überleben', text: 'Recht auf Leben, Gesundheit, Ernährung und angemessenen Lebensstandard', icon: '❤️', color: '#FF9800', notes: 'Art. 6 (Leben), Art. 24 (Gesundheit), Art. 27 (Lebensstandard).', speaker: 'zua' });
    slides.push({ type: 'category', key: 'development', title: 'Entwicklung', text: 'Recht auf Bildung, Spiel, Freizeit, kulturelle Aktivitäten und Information', icon: '🎓', color: '#4CAF50', notes: 'Art. 28/29 (Bildung), Art. 31 (Spiel/Freizeit), Art. 17 (Information).', speaker: 'zua' });
    slides.push({ type: 'category', key: 'protection', title: 'Schutz', text: 'Schutz vor Gewalt, Missbrauch, Ausbeutung und Diskriminierung', icon: '🛡️', color: '#E91E63', notes: 'Art. 19 (Gewalt), Art. 32 (Kinderarbeit), Art. 2 (Diskriminierung).', speaker: 'zua' });
    slides.push({ type: 'category', key: 'participation', title: 'Beteiligung', text: 'Recht auf Meinungsäußerung, Mitbestimmung und freie Entfaltung', icon: '👥', color: '#03A9F4', notes: 'Art. 12 (Meinung), Art. 13 (freie Meinungsäußerung), Art. 15 (Vereinigung).', speaker: 'zua' });

    // ===== 4. GESCHICHTE (Lydia) — grouped timeline =====

    // Section transition
    slides.push({ type: 'image', image: 'assets/images/slides/un-flags.jpg', title: 'Geschichte der Kinderrechte', text: 'Von 1870 bis heute — über 150 Jahre Kampf für die Rechte der Kinder', notes: 'Überleitung: Lydia übernimmt. Geschichte der Kinderrechte.', speaker: 'lydia', bgVariant: 'warm' });

    // Enlightenment context (from Lydia's research — NOT in timeline)
    slides.push({ type: 'quote', quoteText: 'Die Aufklärung definierte Kindheit erstmals als eigenständige Entwicklungsphase — geprägt von Unschuld und Schutzbedürftigkeit.', quoteAuthor: 'Nach Rousseau · Imoah 2012', notes: 'Rousseau und die Aufklärung. Kindheit vorher: Kinder in der Erwachsenenwelt ohne besonderen Schutz. Aufklärung: Kindheit als eigene Phase. Zunächst nur Oberschicht — Kinder der unteren Klassen mussten arbeiten.', speaker: 'lydia', bgVariant: 'warm' });

    // Grouped timeline: Foundations 1870–1948
    slides.push({
      type: 'timeline-group',
      title: 'Grundlagen (1870–1948)',
      events: [
        { year: 1870, title: 'Education Act (UK)', summary: 'Bildung für alle Kinder — unabhängig von Herkunft', color: '#4CAF50' },
        { year: 1924, title: 'Genfer Erklärung', summary: 'Erstes internationales Dokument zu Kinderrechten', color: '#FF9800' },
        { year: 1945, title: 'Gründung der UNO', summary: 'Grundlage für internationale Menschenrechtsabkommen', color: '#03A9F4' },
        { year: 1948, title: 'Menschenrechtserklärung', summary: 'Erstmals besonderer Schutz für Kinder erwähnt', color: '#03A9F4' },
      ],
      notes: 'Weltkriege machten Verletzlichkeit von Kindern deutlich (Fass 2011). Boyden: Kolonialismus verbreitete westliche Kindheitskonzepte. Education Act 1870 als Wendepunkt.',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    // Grouped timeline: Development 1959–1989
    slides.push({
      type: 'timeline-group',
      title: 'Entwicklung (1959–1989)',
      events: [
        { year: 1959, title: 'Erklärung der Rechte des Kindes', summary: '10 Grundsätze — aber nicht rechtsverbindlich', color: '#4CAF50' },
        { year: 1966, title: 'UN-Sozialpakt & Zivilpakt', summary: 'Verbindliche Bestimmungen zum Kinderschutz', color: '#E91E63' },
        { year: 1979, title: 'Jahr des Kindes', summary: 'Polen schlägt verbindliche Konvention vor', color: '#FF9800' },
      ],
      notes: 'Post-Cold-War Ära: Neue Verfassungen weltweit (z.B. Südafrika) prägten Menschenrechtsverständnis. Goodall 2015: „Liminality" öffnete Raum für transnationalen Menschenrechtsdiskurs.',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    // Key moment: 1989 KRK — standalone
    slides.push({
      type: 'stat',
      statValue: '1989',
      statLabel: 'UN-Kinderrechtskonvention',
      text: '54 Artikel. 196 Staaten. Das meistratifizierte Menschenrechtsabkommen der Welt. Kinder erstmals als eigenständige Rechtsträger anerkannt.',
      color: '#03A9F4',
      statSource: 'UN-Generalversammlung, 20. November 1989',
      notes: 'Highlight-Moment. 10 Jahre Arbeit seit Polens Vorschlag. Einstimmig verabschiedet. NGOs hatten großen Einfluss auf den Entwurfsprozess.',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    // Grouped timeline: After KRK 1990–2015
    slides.push({
      type: 'timeline-group',
      title: 'Nach der KRK (1990–2015)',
      events: [
        { year: 1990, title: 'KRK tritt in Kraft', summary: 'Schneller als jeder andere Menschenrechtsvertrag', color: '#4CAF50' },
        { year: 2000, title: 'Zwei Zusatzprotokolle', summary: 'Kinderhandel & Kindersoldaten + gewaltfreie Erziehung DE', color: '#E91E63' },
        { year: 2011, title: 'Beschwerderecht', summary: 'Kinder können beim UN-Ausschuss klagen', color: '#03A9F4' },
        { year: 2015, title: 'Somalia ratifiziert', summary: 'Nur noch die USA fehlen', color: '#4CAF50' },
      ],
      notes: 'Deutschland ratifizierte 1992. Drittes Zusatzprotokoll 2011 = individuelles Beschwerderecht. Rise of NGOs trug zur Neugestaltung von Kinderrechten bei (Fass 2011).',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    // Grouped timeline: Crises 2019–2025
    slides.push({
      type: 'timeline-group',
      title: 'Aktuelle Herausforderungen (2019–2025)',
      events: [
        { year: 2019, title: '30 Jahre KRK', summary: '196 Staaten — Fortschritte und offene Fragen', color: '#FF9800' },
        { year: 2020, title: 'COVID-19', summary: '1,6 Mrd. Kinder ohne Schule, Kinderarbeit steigt', color: '#C0392B' },
        { year: 2024, title: 'Rekord-Verletzungen', summary: 'Gaza, Sudan, Ukraine — 32.990 Verstöße', color: '#C0392B' },
        { year: 2025, title: '138 Mio. Kinderarbeit', summary: 'UN-Ziel 2025 verfehlt', color: '#B7950B' },
      ],
      notes: '30 Jahre Jubiläum 2019 mit gemischter Bilanz. COVID als Kinderrechtekrise. 2024 dunkelsten Jahr für Kinder in Konflikten.',
      speaker: 'lydia',
      bgVariant: 'warm'
    });

    // ===== 5. SCHLÜSSELARTIKEL (Zua) — grouped =====

    // Section transition
    slides.push({ type: 'image', image: 'assets/images/slides/children-school.jpg', title: 'Die Schlüsselartikel', text: 'Die UN-KRK enthält 54 Artikel. Wir schauen uns die wichtigsten an.', notes: 'Überleitung: Zua übernimmt. Schlüsselartikel.', speaker: 'zua' });

    // Group articles by category (2-3 per slide)
    const keyArticles = ARTICLES_DATA.filter(a => a.key);
    const survivalArts = keyArticles.filter(a => a.category === 'survival');
    const devArts = keyArticles.filter(a => a.category === 'development');
    const protArts = keyArticles.filter(a => a.category === 'protection');
    const partArts = keyArticles.filter(a => a.category === 'participation');

    if (survivalArts.length > 0) {
      slides.push({
        type: 'article-group',
        title: 'Überleben',
        color: '#FF9800',
        categoryName: 'Überleben',
        categoryColor: '#FF9800',
        articles: survivalArts.map(a => ({ id: a.id, title: a.title, summary: a.summary, category: a.category, categoryColor: CATEGORIES[a.category].color })),
        notes: survivalArts.map(a => `Art. ${a.id}: ${a.title}`).join('. '),
        speaker: 'zua'
      });
    }

    if (devArts.length > 0) {
      slides.push({
        type: 'article-group',
        title: 'Entwicklung',
        color: '#4CAF50',
        categoryName: 'Entwicklung',
        categoryColor: '#4CAF50',
        articles: devArts.map(a => ({ id: a.id, title: a.title, summary: a.summary, category: a.category, categoryColor: CATEGORIES[a.category].color })),
        notes: devArts.map(a => `Art. ${a.id}: ${a.title}`).join('. '),
        speaker: 'zua'
      });
    }

    if (protArts.length > 0) {
      slides.push({
        type: 'article-group',
        title: 'Schutz',
        color: '#E91E63',
        categoryName: 'Schutz',
        categoryColor: '#E91E63',
        articles: protArts.map(a => ({ id: a.id, title: a.title, summary: a.summary, category: a.category, categoryColor: CATEGORIES[a.category].color })),
        notes: protArts.map(a => `Art. ${a.id}: ${a.title}`).join('. '),
        speaker: 'zua'
      });
    }

    if (partArts.length > 0) {
      slides.push({
        type: 'article-group',
        title: 'Beteiligung',
        color: '#03A9F4',
        categoryName: 'Beteiligung',
        categoryColor: '#03A9F4',
        articles: partArts.map(a => ({ id: a.id, title: a.title, summary: a.summary, category: a.category, categoryColor: CATEGORIES[a.category].color })),
        notes: partArts.map(a => `Art. ${a.id}: ${a.title}`).join('. '),
        speaker: 'zua'
      });
    }

    // ===== 6. VERMITTLUNG (Zua) =====

    slides.push({ type: 'image', image: 'assets/images/slides/children-school.jpg', title: 'Vermittlung', text: 'Wie werden Kinderrechte in Kita, Schule und Familie vermittelt?', notes: 'Überleitung zum Thema Vermittlung.', speaker: 'zua' });

    slides.push({ type: 'info', title: 'Vermittlung an Kinder', accent: '#4CAF50', infoItems: ['Kindergarten (3–6): Bilderbücher, Rollenspiele, Fairness', 'Grundschule (6–10): Projekttage, Klassenräte, Poster', 'Sekundarstufe (10–18): Planspiele, Debatten, Fallstudien'], notes: 'Altersgerechte Vermittlung. UNICEF-Schulen als Best Practice.', speaker: 'zua' });

    slides.push({ type: 'stat', statValue: '§ 45', statLabel: 'SGB VIII — Betriebserlaubnis', text: 'Seit 2021 müssen Einrichtungen ein Gewaltschutzkonzept vorweisen. Beschwerdemanagement für Kinder ist seit 2012 Pflicht.', color: '#7B1FA2', statSource: '§ 45 Abs. 2 Nr. 3 SGB VIII', notes: '§ 45 SGB VIII als Schlüsselnorm.', speaker: 'zua' });

    slides.push({ type: 'image', image: 'assets/images/slides/family.jpg', title: 'Gewaltfreie Erziehung', text: 'Seit dem Jahr 2000 haben Kinder in Deutschland das Recht auf gewaltfreie Erziehung (§ 1631 Abs. 2 BGB).', notes: 'Nummer gegen Kummer: 116 111.', speaker: 'zua' });

    slides.push({ type: 'info', title: 'Schutz in Deutschland', accent: '#E91E63', infoItems: ['Jugendamt: Schutzauftrag bei Kindeswohlgefährdung (§ 8a SGB VIII)', 'Grundgesetz: Art. 6 + Art. 2 — Schutz der Familie & freie Entfaltung', 'Nummer gegen Kummer: 116 111 (Kinder) / 0800 111 0550 (Eltern)'], notes: '§ 8a SGB VIII regelt den Schutzauftrag.', speaker: 'zua' });

    slides.push({ type: 'compare', title: 'Zukunft der Kinderrechte', compareLeft: { title: 'Neue Herausforderungen', items: ['Digitale Rechte: Datenschutz, Online-Sicherheit', 'Klimawandel bedroht Gesundheit & Zukunft', 'Grundgesetz-Debatte: Kinderrechte verankern?'], color: '#03A9F4' }, compareRight: { title: 'Positive Entwicklungen', items: ['2026: Jahr der Kinderrechte (Bundesregierung)', 'Kinderrechte-Index 2025 schafft Transparenz', 'Fridays for Future: Kinder als Akteure'], color: '#4CAF50' }, notes: '2026 als Jahr der Kinderrechte.', speaker: 'zua' });

    // ===== 7. VERLETZUNGEN (Zua) =====

    slides.push({ type: 'image', image: 'assets/images/slides/child-conflict.jpg', title: 'Verletzungen weltweit', text: '2024 war eines der schlimmsten Jahre für Kinder in Konflikten.', imageCredit: 'Unsplash', notes: '32.990 schwere Verstöße dokumentiert.', speaker: 'zua', bgVariant: 'red' });

    slides.push({ type: 'stat', statValue: '473 Mio.', statLabel: 'Kinder in Konfliktgebieten', text: 'Mehr als jedes sechste Kind weltweit lebt in einer Konfliktzone.', color: '#C0392B', image: 'assets/images/slides/globe-hands.jpg', statSource: 'UNICEF 2024', notes: 'UNICEF State of the World\'s Children 2024.', speaker: 'zua', bgVariant: 'red' });

    slides.push({ type: 'stat', statValue: '138 Mio.', statLabel: 'Kinder in Kinderarbeit', text: 'Das UN-Ziel, Kinderarbeit bis 2025 zu beenden, wurde verfehlt.', color: '#E67E22', statSource: 'ILO/UNICEF 2024', notes: 'ILO Child Labour Report 2024.', speaker: 'zua', bgVariant: 'red' });

    slides.push({ type: 'stat', statValue: '~4%', statLabel: 'Kindersterblichkeit heute', text: 'Von ~33% im Jahr 1924 auf unter 4% heute. Einer der größten Fortschritte der Menschheitsgeschichte.', color: '#4CAF50', image: 'assets/images/slides/hands-together.jpg', statSource: 'WHO/UNICEF 2024', notes: 'Fortschritte durch Impfungen, Ernährung, medizinische Versorgung.', speaker: 'zua' });

    slides.push({ type: 'compare', title: 'Fortschritte & Rückschläge', compareLeft: { title: 'Fortschritte', items: ['Kindersterblichkeit: 33% → 4%', 'Mangelernährung: 40% → 22%', '196 von 197 Staaten ratifiziert', 'Beschwerderecht seit 2011'], color: '#4CAF50' }, compareRight: { title: 'Rückschläge', items: ['417 Mio. Kinder in Armut', '650 Mio. Frauen als Kind verheiratet', '52 Mio. ohne Schulzugang', '1 Mrd. Kinder vulnerabel'], color: '#C0392B' }, notes: 'Noch 113 Jahre bis zur vollen Umsetzung.', speaker: 'zua' });

    // ===== 8. INTERACTION =====
    slides.push({
      type: 'interaction',
      title: 'Was denkt ihr?',
      interactionQuestion: 'Welches Kinderrecht ist eurer Meinung nach am wichtigsten?',
      interactionOptions: ['Recht auf Bildung', 'Recht auf Schutz vor Gewalt', 'Recht auf Mitbestimmung', 'Recht auf Gesundheit'],
      notes: 'Handzeichen: Wer stimmt für welches? Kurz diskutieren warum. 2-3 Minuten.',
      speaker: 'both'
    });

    // ===== 9. KRITISCHE PERSPEKTIVEN (Lydia) =====

    // Section transition
    slides.push({ type: 'image', image: 'assets/images/slides/digital-world.jpg', title: 'Kritische Perspektiven', text: 'Ist die UN-KRK an aktuelle soziokulturelle und politische Kontexte angepasst?', notes: 'Lydia übernimmt. Anthropologische Perspektive.', speaker: 'lydia', bgVariant: 'purple' });

    // Enlightenment → KRK lineage
    slides.push({ type: 'quote', quoteText: 'Die UN-Kinderrechtskonvention universalisiert westliche Konzepte von Kindheit.', quoteAuthor: 'Imoah, 2012', notes: 'KRK wurzelt in westlichen kulturellen Entwicklungen des Global North. Universalisiert durch ein internationales Rechtsinstrument, das selbst ein Produkt des Global North ist (UNO).', speaker: 'lydia', bgVariant: 'purple' });

    // Western bias + anthropological lens
    slides.push({ type: 'info', title: 'Anthropologische Kritik', accent: '#795548', infoItems: [
      '„Liberaler, westlicher Bias" und paternalistisch (Quennerstedt 2018)',
      'Kindheit ist kulturell geprägt — keine universelle Definition (Goodall 2015)',
      'AAA kritisierte 1947 die Menschenrechtserklärung als „cultural imperialism" (Billaud 2022)',
      'KRK durch Konsens entstanden — Meinungsverschiedenheiten wurden überdeckt'
    ], notes: 'Quennerstedt, Robinson & L\'Anon 2018: Konvention bleibt im theoretisch-rechtlichen Rahmen. Art. 3 „Kindeswohl" wurde nie definiert, trotz Einwänden. Anthropologen seit 1980er: Rechte als dynamische soziale Praxis, nicht abstrakte Normen (Billaud 2022).', speaker: 'lydia', bgVariant: 'purple' });

    // Goodall's 6 factors — visual
    slides.push({ type: 'overview', title: '6 Faktoren der Kindheit', text: 'Was als „normale Kindheit" gilt, hängt davon ab, wo man lebt (Goodall 2015).',
      items: [
        { label: 'Kultur', desc: 'Lokale Werte & Normen', color: '#FF9800' },
        { label: 'Gender', desc: 'Geschlechterrollen', color: '#E91E63' },
        { label: 'Patriarchat', desc: 'Machtstrukturen', color: '#795548' },
        { label: 'Religion', desc: 'Glaubenssysteme', color: '#9C27B0' },
      ],
      notes: 'Weitere Faktoren: 5. Universale Aspirationen, 6. Regulierung von Arbeitsmärkten & Armut. Kulturrelativismus vs. Universalismus: Gibt es moralische Absoluta?',
      speaker: 'lydia',
      bgVariant: 'purple'
    });

    // Case Studies
    slides.push({ type: 'compare', title: 'Fallstudien', compareLeft: { title: 'Südafrika (Levine 2011)', items: ['Kinderarbeitsgesetze eingeführt', 'Kinder konnten nicht mehr Saisonarbeit leisten', 'Armut der Kinder stieg an', 'Gut gemeint ≠ gut gemacht'], color: '#FF9800' }, compareRight: { title: 'Malawi (Englund / Billaud)', items: ['Menschenrechtsdiskurs während Demokratisierung', '„Freiheit" ignorierte Niedriglohn & Armut', 'Oberschicht profitierte, Arme marginalisiert', '„Prisoners of Freedom"'], color: '#C0392B' }, notes: 'Levine 2011 / Hanson 2014: Kinderarbeitsgesetze in SA erhöhten Armut. Englund: Menschenrechtssprache kann unbeabsichtigte Effekte haben. Billaud 2022: Anthropologen untersuchen, wie Rechte im Alltag erfahren werden — jenseits bürokratischer Rechtsinstrumente.', speaker: 'lydia', bgVariant: 'purple' });

    // Reflection
    slides.push({ type: 'quote', quoteText: 'Kulturrelativismus oder universelle Rechte? Oder liegt die Antwort in der Mitte?', quoteAuthor: 'Offene Frage zur Diskussion', notes: 'Lydia stellt die Frage offen an die Klasse. Überleitung zu den Diskussionsfragen.', speaker: 'lydia', bgVariant: 'purple' });

    // ===== 10. ZUSAMMENFASSUNG =====
    slides.push({
      type: 'summary',
      title: 'Zusammenfassung',
      summaryItems: [
        '54 Artikel schützen Kinder weltweit — in 4 Kategorien: Überleben, Entwicklung, Schutz, Beteiligung',
        'Über 150 Jahre Geschichte: Von 1870 bis zur UN-KRK 1989 und darüber hinaus',
        'Vermittlung durch Kita, Schule, Eltern — mit gesetzlicher Grundlage (§ 45, § 8a SGB VIII)',
        'Fortschritte (Kindersterblichkeit ↓) aber auch Rückschläge (473 Mio. in Konfliktgebieten)',
        'Kritische Perspektiven: Westlicher Bias, kulturelle Unterschiede, unbeabsichtigte Effekte',
      ],
      notes: 'Kurze Zusammenfassung der Kernpunkte. Dann Diskussion.',
      speaker: 'both'
    });

    // ===== 11. DISKUSSION =====
    slides.push({ type: 'question', title: 'Diskussionsfragen', questions: ['Sollten Kinderrechte explizit im Grundgesetz stehen?', 'Wie können Kinder in der Schule stärker mitbestimmen?', 'Brauchen wir neue Kinderrechte für die digitale Welt?', 'Sind Kinderrechte universell — oder kulturell bedingt?', 'Was kann jeder Einzelne für Kinderrechte tun?'], notes: 'Klasse einbeziehen. Jede Frage kurz anmoderieren.', speaker: 'both' });

    // ===== 12. END =====
    slides.push({ type: 'end', title: 'Vielen Dank!', subtitle: 'Fragen & Diskussion', authors: 'Lydia Howe & Alexandre Zua Caldeira', meta: 'Fach: Recht · Lehrer: Uwe Otto · 06. März 2026', notes: 'Danke sagen. QR-Code zeigen. Für Fragen offen bleiben.', speaker: 'both' });

    return slides;
  }
}
