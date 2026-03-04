import { Injectable, signal, computed } from '@angular/core';
import { PresentationSlide } from '../models/presentation';
import { ARTICLES_DATA } from '../data/articles';
import { TIMELINE_DATA } from '../data/timeline';
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

    // 1 — Hero (both)
    slides.push({
      type: 'hero',
      title: 'Kinderrechte',
      subtitle: 'Die UN-Kinderrechtskonvention — Geschichte, Artikel & Vermittlung',
      authors: 'Lydia Howe & Alexandre Zua Caldeira',
      meta: 'Fach: Recht · Lehrer: Uwe Otto · 06. März 2026',
      notes: 'Begrüßung. Thema vorstellen: UN-KRK, 54 Artikel, seit 1989. 196 Staaten ratifiziert.',
      speaker: 'both'
    });

    // 2 — Overview (Zua)
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

    // 3–6 — Categories (Zua)
    slides.push({ type: 'category', key: 'survival', title: 'Überleben', text: 'Recht auf Leben, Gesundheit, Ernährung und angemessenen Lebensstandard', icon: '❤️', color: '#FF9800', notes: 'Art. 6 (Leben), Art. 24 (Gesundheit), Art. 27 (Lebensstandard).', speaker: 'zua' });
    slides.push({ type: 'category', key: 'development', title: 'Entwicklung', text: 'Recht auf Bildung, Spiel, Freizeit, kulturelle Aktivitäten und Information', icon: '🎓', color: '#4CAF50', notes: 'Art. 28/29 (Bildung), Art. 31 (Spiel/Freizeit), Art. 17 (Information).', speaker: 'zua' });
    slides.push({ type: 'category', key: 'protection', title: 'Schutz', text: 'Schutz vor Gewalt, Missbrauch, Ausbeutung und Diskriminierung', icon: '🛡️', color: '#E91E63', notes: 'Art. 19 (Gewalt), Art. 32 (Kinderarbeit), Art. 2 (Diskriminierung).', speaker: 'zua' });
    slides.push({ type: 'category', key: 'participation', title: 'Beteiligung', text: 'Recht auf Meinungsäußerung, Mitbestimmung und freie Entfaltung', icon: '👥', color: '#03A9F4', notes: 'Art. 12 (Meinung), Art. 13 (freie Meinungsäußerung), Art. 15 (Vereinigung).', speaker: 'zua' });

    // 7 — Timeline title (Lydia)
    slides.push({ type: 'title', title: 'Geschichte der Kinderrechte', subtitle: 'Von 1870 bis heute — über 150 Jahre Kampf für die Rechte der Kinder', notes: 'Überleitung: Wie haben sich Kinderrechte historisch entwickelt?', speaker: 'lydia' });

    // 8+ — Timeline events (Lydia)
    const timelineTotal = TIMELINE_DATA.length;
    TIMELINE_DATA.forEach((ev, i) => {
      slides.push({
        type: 'timeline',
        year: ev.year,
        title: ev.title,
        summary: ev.summary,
        details: ev.details,
        color: ev.color,
        timelineIndex: i,
        timelineTotal,
        speaker: 'lydia'
      });
    });

    // Articles title (Zua)
    slides.push({ type: 'title', title: 'Die 54 Artikel', subtitle: 'Die UN-Kinderrechtskonvention enthält 54 Artikel. Wir schauen uns die 10 wichtigsten Schlüsselartikel an.', notes: 'Überleitung zu den Schlüsselartikeln.', speaker: 'zua' });

    // Key articles (Zua)
    const keyArticles = ARTICLES_DATA.filter(a => a.key);
    keyArticles.forEach(art => {
      const cat = CATEGORIES[art.category];
      slides.push({
        type: 'article',
        articleId: art.id,
        title: art.title,
        summary: art.summary,
        full: art.full,
        category: art.category,
        categoryName: cat.name,
        categoryColor: cat.color,
        notes: `Artikel ${art.id}: ${art.title} — Kategorie ${cat.name}.`,
        speaker: 'zua'
      });
    });

    // --- VERMITTLUNG SECTION (Zua) ---

    slides.push({ type: 'image', image: 'assets/images/slides/children-school.jpg', title: 'Vermittlung', text: 'Wie werden Kinderrechte in Kita, Schule und Familie vermittelt?', notes: 'Überleitung zum Thema Vermittlung.', speaker: 'zua' });

    slides.push({ type: 'info', title: 'Vermittlung an Kinder', accent: '#4CAF50', infoItems: ['Kindergarten (3–6): Bilderbücher, Rollenspiele, Fairness', 'Grundschule (6–10): Projekttage, Klassenräte, Poster', 'Sekundarstufe (10–18): Planspiele, Debatten, Fallstudien'], notes: 'Altersgerechte Vermittlung. UNICEF-Schulen als Best Practice.', speaker: 'zua' });

    slides.push({ type: 'stat', statValue: '§ 45', statLabel: 'SGB VIII — Betriebserlaubnis', text: 'Seit 2021 müssen Einrichtungen ein Gewaltschutzkonzept vorweisen. Beschwerdemanagement für Kinder ist seit 2012 Pflicht.', color: '#7B1FA2', statSource: '§ 45 Abs. 2 Nr. 3 SGB VIII', notes: '§ 45 SGB VIII als Schlüsselnorm. Reform 2021 stärkt Gewaltschutz.', speaker: 'zua' });

    slides.push({ type: 'image', image: 'assets/images/slides/family.jpg', title: 'Gewaltfreie Erziehung', text: 'Seit dem Jahr 2000 haben Kinder in Deutschland das Recht auf gewaltfreie Erziehung (§ 1631 Abs. 2 BGB).', notes: 'Gewaltfreie Erziehung seit 2000 gesetzlich verankert. Nummer gegen Kummer: 116 111.', speaker: 'zua' });

    slides.push({ type: 'info', title: 'Schutz in Deutschland', accent: '#E91E63', infoItems: ['Jugendamt: Schutzauftrag bei Kindeswohlgefährdung (§ 8a SGB VIII)', 'Grundgesetz: Art. 6 + Art. 2 — Schutz der Familie & freie Entfaltung', 'Nummer gegen Kummer: 116 111 (Kinder) / 0800 111 0550 (Eltern)'], notes: '§ 8a SGB VIII regelt den Schutzauftrag.', speaker: 'zua' });

    slides.push({ type: 'compare', title: 'Zukunft der Kinderrechte', compareLeft: { title: 'Neue Herausforderungen', items: ['Digitale Rechte: Datenschutz, Online-Sicherheit', 'Klimawandel bedroht Gesundheit & Zukunft', 'Grundgesetz-Debatte: Kinderrechte verankern?'], color: '#03A9F4' }, compareRight: { title: 'Positive Entwicklungen', items: ['2026: Jahr der Kinderrechte (Bundesregierung)', 'Kinderrechte-Index 2025 schafft Transparenz', 'Fridays for Future: Kinder als Akteure'], color: '#4CAF50' }, notes: 'Kinderrechte-Index 2025. 2026 als Jahr der Kinderrechte.', speaker: 'zua' });

    // --- VERLETZUNGEN SECTION (Zua) ---

    slides.push({ type: 'image', image: 'assets/images/slides/child-conflict.jpg', title: 'Verletzungen weltweit', text: '2024 war eines der schlimmsten Jahre für Kinder in Konflikten.', imageCredit: 'Unsplash', notes: '32.990 schwere Verstöße 2024 dokumentiert.', speaker: 'zua' });

    slides.push({ type: 'stat', statValue: '473 Mio.', statLabel: 'Kinder in Konfliktgebieten', text: 'Mehr als jedes sechste Kind weltweit lebt in einer Konfliktzone.', color: '#C0392B', image: 'assets/images/slides/globe-hands.jpg', statSource: 'UNICEF 2024', notes: 'UNICEF State of the World\'s Children 2024.', speaker: 'zua' });

    slides.push({ type: 'stat', statValue: '138 Mio.', statLabel: 'Kinder in Kinderarbeit', text: 'Das UN-Ziel, Kinderarbeit bis 2025 zu beenden, wurde verfehlt. 54 Mio. Kinder arbeiten unter gefährlichen Bedingungen.', color: '#E67E22', statSource: 'ILO/UNICEF 2024', notes: 'ILO Child Labour Report 2024.', speaker: 'zua' });

    slides.push({ type: 'stat', statValue: '~4%', statLabel: 'Kindersterblichkeit heute', text: 'Von ~33% im Jahr 1924 auf unter 4% heute. Einer der größten Fortschritte der Menschheitsgeschichte.', color: '#4CAF50', image: 'assets/images/slides/hands-together.jpg', statSource: 'WHO/UNICEF 2024', notes: 'Fortschritte durch Impfungen, Ernährung, medizinische Versorgung.', speaker: 'zua' });

    slides.push({ type: 'compare', title: 'Fortschritte & Rückschläge', compareLeft: { title: 'Fortschritte', items: ['Kindersterblichkeit: 33% → 4%', 'Mangelernährung: 40% → 22%', '196 von 197 Staaten ratifiziert', 'Beschwerderecht seit 2011'], color: '#4CAF50' }, compareRight: { title: 'Rückschläge', items: ['417 Mio. Kinder in Armut', '650 Mio. Frauen als Kind verheiratet', '52 Mio. ohne Schulzugang', '1 Mrd. Kinder vulnerabel'], color: '#C0392B' }, notes: 'Bei aktuellem Tempo noch 113 Jahre bis zur vollen Umsetzung.', speaker: 'zua' });

    // --- KRITISCHE PERSPEKTIVEN (Lydia) ---

    slides.push({ type: 'quote', quoteText: 'Die UN-Kinderrechtskonvention universalisiert westliche Konzepte von Kindheit.', quoteAuthor: 'Imoah, 2012', image: 'assets/images/slides/digital-world.jpg', notes: 'Lydias Forschungsteil beginnt. Einleitung zur kritischen Perspektive.', speaker: 'lydia' });

    slides.push({ type: 'info', title: 'Kritische Perspektiven', accent: '#795548', infoItems: ['Westlicher Bias: KRK wurzelt in Werten des Global North (Quennerstedt 2018)', 'Kulturrelativismus vs. Universalismus: Debatte seit 1947 (Billaud 2022)', 'Kindheit ist kulturell geprägt — 6 Faktoren (Goodall 2015)', 'Fallstudien: Kinderarbeitsgesetze erhöhten Armut in Südafrika (Levine 2011)'], notes: 'American Anthropological Association nannte 1947 die Menschenrechtserklärung „cultural imperialism".', speaker: 'lydia' });

    // Questions (both)
    slides.push({ type: 'question', title: 'Diskussionsfragen', questions: ['Sollten Kinderrechte explizit im Grundgesetz stehen?', 'Wie können Kinder in der Schule stärker mitbestimmen?', 'Brauchen wir neue Kinderrechte für die digitale Welt?', 'Was kann jeder Einzelne für Kinderrechte tun?', 'Welche Kinderrechte werden weltweit am häufigsten verletzt?'], notes: 'Klasse einbeziehen. Jede Frage kurz anmoderieren.', speaker: 'both' });

    // End (both)
    slides.push({ type: 'end', title: 'Vielen Dank!', subtitle: 'Fragen & Diskussion', authors: 'Lydia Howe & Alexandre Zua Caldeira', meta: 'Fach: Recht · Lehrer: Uwe Otto · 06. März 2026', notes: 'Danke sagen. QR-Code zeigen. Für Fragen offen bleiben.', speaker: 'both' });

    return slides;
  }
}
