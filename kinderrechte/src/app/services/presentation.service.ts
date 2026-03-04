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

    // 1 — Hero
    slides.push({
      type: 'hero',
      title: 'Kinderrechte',
      subtitle: 'Die UN-Kinderrechtskonvention — Geschichte, Artikel & Vermittlung',
      authors: 'Lydia Howe & Alexandre Zua Caldeira',
      meta: 'Fach: Recht · Lehrer: Uwe Otto · 06. März 2026',
      notes: 'Begrüßung. Thema vorstellen: UN-KRK, 54 Artikel, seit 1989. 196 Staaten ratifiziert. Quelle: ohchr.org/en/instruments-mechanisms/instruments/convention-rights-child.'
    });

    // 2 — Overview
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
      notes: 'Vier Grundprinzipien erklären. Jede Kategorie kurz ansprechen.'
    });

    // 3–6 — Categories
    slides.push({ type: 'category', key: 'survival', title: 'Überleben', text: 'Recht auf Leben, Gesundheit, Ernährung und angemessenen Lebensstandard', icon: '❤️', color: '#FF9800', notes: 'Art. 6 (Leben), Art. 24 (Gesundheit), Art. 27 (Lebensstandard).' });
    slides.push({ type: 'category', key: 'development', title: 'Entwicklung', text: 'Recht auf Bildung, Spiel, Freizeit, kulturelle Aktivitäten und Information', icon: '🎓', color: '#4CAF50', notes: 'Art. 28/29 (Bildung), Art. 31 (Spiel/Freizeit), Art. 17 (Information).' });
    slides.push({ type: 'category', key: 'protection', title: 'Schutz', text: 'Schutz vor Gewalt, Missbrauch, Ausbeutung und Diskriminierung', icon: '🛡️', color: '#E91E63', notes: 'Art. 19 (Gewalt), Art. 32 (Kinderarbeit), Art. 2 (Diskriminierung).' });
    slides.push({ type: 'category', key: 'participation', title: 'Beteiligung', text: 'Recht auf Meinungsäußerung, Mitbestimmung und freie Entfaltung', icon: '👥', color: '#03A9F4', notes: 'Art. 12 (Meinung), Art. 13 (freie Meinungsäußerung), Art. 15 (Vereinigung).' });

    // 7 — Timeline title
    slides.push({ type: 'title', title: 'Geschichte der Kinderrechte', subtitle: 'Von 1924 bis heute — über 100 Jahre Kampf für die Rechte der Kinder', notes: 'Überleitung: Wie haben sich Kinderrechte historisch entwickelt?' });

    // 8–18 — Timeline events
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
        timelineTotal
      });
    });

    // 19 — Articles overview
    slides.push({ type: 'title', title: 'Die 54 Artikel', subtitle: 'Die UN-Kinderrechtskonvention enthält 54 Artikel. Wir schauen uns die 10 wichtigsten Schlüsselartikel an.', notes: 'Überleitung zu den Schlüsselartikeln.' });

    // 20–29 — Key articles
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
        notes: `Artikel ${art.id}: ${art.title} — Kategorie ${cat.name}.`
      });
    });

    // 30–34 — Info slides
    slides.push({ type: 'info', title: 'Vermittlung an Kinder', accent: '#4CAF50', infoItems: ['Kindergarten (3–6): Bilderbücher, Rollenspiele, Regeln über Fairness', 'Grundschule (6–10): Projekttage, Kinderrechteposter, Klassenräte', 'Sekundarstufe (10–18): Planspiele, Debatten, Fallstudien', 'UNICEF-Kinderrechte-Schulen: Kinderrechte als gelebte Praxis', 'Digitale Medien: Interaktive Websites, Apps und Videos'], notes: 'Altersgerechte Vermittlung betonen. UNICEF-Schulen (unicef.de/informieren/einsatz-fuer-kinderrechte/kinderrechteschulen) als Best Practice. Makista Modellschul-Netzwerk in Hessen als Beispiel.' });
    slides.push({ type: 'info', title: 'Für Erzieher*innen', accent: '#7B1FA2', infoItems: ['§ 45 SGB VIII: Betriebserlaubnis erfordert seit 2021 Gewaltschutzkonzept', 'Beschwerdemanagement in Kitas seit 2012 gesetzlich vorgeschrieben (§ 45 Abs. 2 Nr. 3 SGB VIII)', 'Bildungs- und Erziehungspläne: 16 Länder, je eigener Plan — Kinderrechte als Querschnittsthema', 'KiTa-Qualitätsgesetz: ca. 4 Mrd. EUR (2023–2024) für frühkindliche Bildungsqualität', 'Kinderrechte-Landschaften 2025–2026: 10 Kitas + 16 Schulen (DKJS)', 'Klassenrat: Praktische Umsetzung von Artikel 12 UN-KRK'], notes: '§ 45 SGB VIII als Schlüsselnorm. Reform 2021 stärkt Gewaltschutz. Beschwerdemanagement seit 2012 Pflicht. KiTa-Qualitätsgesetz: bmfsfj.bund.de. Kinderrechte-Landschaften: kinderrechte.de/projekte/programm-kinderrechte-landschaften/.' });
    slides.push({ type: 'info', title: 'Vermittlung an Eltern', accent: '#FF9800', infoItems: ['Elternabende: Workshops zu gewaltfreier Erziehung', 'Broschüren & Ratgeber: Mehrsprachige Materialien', 'Beratungsstellen: Erziehungsberatung, Familienberatung, Frühe Hilfen', 'Seit 2000: Recht auf gewaltfreie Erziehung (§ 1631 Abs. 2 BGB)', 'Eltern als wichtigste Vermittler im Alltag'], notes: 'Gewaltfreie Erziehung seit 2000 gesetzlich verankert (§ 1631 Abs. 2 BGB). Nummer gegen Kummer: nummergegenkummer.de, Tel. 116 111.' });
    slides.push({ type: 'info', title: 'Schutz in Deutschland', accent: '#E91E63', infoItems: ['Jugendamt: Schutzauftrag bei Kindeswohlgefährdung (§ 8a SGB VIII)', 'Grundgesetz: Art. 6 (Schutz der Familie), Art. 2 (freie Entfaltung)', 'BGB § 1631 Abs. 2: Recht auf gewaltfreie Erziehung', 'Nummer gegen Kummer: 116 111 (Kinder) / 0800 111 0550 (Eltern)', 'Kinderschutzbund, Jugendbeauftragte, Online-Beratung'], notes: 'Jugendamt und Grundgesetz als Schutzpfeiler. § 8a SGB VIII regelt den Schutzauftrag. Beratungsnummern: nummergegenkummer.de. DeGeDe: degede.de/abc/un-kinderrechtskonvention/.' });
    slides.push({ type: 'info', title: 'Zukunft der Kinderrechte', accent: '#03A9F4', infoItems: ['Digitale Rechte: Datenschutz, Online-Sicherheit, Recht auf Vergessen', 'Grundgesetz-Debatte: Kinderrechte explizit verankern?', 'Klimawandel: Bedrohung für Gesundheit, Wasser, Nahrung, Zukunft', 'Kinderrechte-Index 2025: Umsetzung variiert stark nach Bundesland', '2026 als Jahr der Kinderrechte — bundesweite Kampagnen und Projekte', 'Kinder als Akteure: Fridays for Future, Jugendparlamente'], notes: 'Kinderrechte-Index 2025: jugendhilfeportal.de/artikel/kinder-und-jugendrechte-kinderrechte-index-2025. 2026 als Jahr der Kinderrechte von der Bundesregierung ausgerufen. UNICEF Kinderrechteschulen: 7-stufiges Programm in NRW, NI, SN, SH.' });

    // Verletzungen weltweit
    slides.push({ type: 'info', title: 'Verletzungen weltweit', accent: '#C0392B', infoItems: ['473 Mio. Kinder leben in Konfliktgebieten (UNICEF 2024)', '417 Mio. Kinder in extremer Entbehrung (UNICEF 2025)', '138 Mio. Kinder in Kinderarbeit — UN-Ziel für 2025 verfehlt (ILO/UNICEF)', '650 Mio. Frauen als Kind verheiratet (World Bank 2023)', '1 Mrd. Kinder vulnerabel für Gewalt (UN 2024)', '52 Mio. Kinder in Konfliktzonen ohne Schule (UNICEF 2024)'], notes: '2024 eines der schlimmsten Jahre: 32.990 schwere Verstöße dokumentiert. Gaza: alle Schulen geschlossen, 625.000 Kinder ohne Bildung. Sudan: größte Kindervertriebenenkrise der Welt. Quellen: unicef.org, press.un.org, kidsrights.org.' });

    // Fortschritte
    slides.push({ type: 'info', title: 'Fortschritte der Kinderrechte', accent: '#4CAF50', infoItems: ['Kindersterblichkeit: von ~33% (1924) auf ~4% heute', 'Mangelernährung unter 5: 40% (1990) → 22% (2022)', 'Kinderarbeit: 160 Mio. (2020) → 138 Mio. (2024)', 'Kinderarmut: Rückgang von 51% (2013) auf 41% (2023)', '196 von 197 UN-Staaten haben die KRK ratifiziert', 'Individuelles Beschwerderecht seit 2011 (3. Zusatzprotokoll)'], notes: 'Fortschritte durch politischen Willen. Aber: Bei aktuellem Tempo noch 113 Jahre bis zur vollen Umsetzung (ChildFund World Index 2024). 4,5 Mio. Kinder könnten bis 2030 durch Kürzungen sterben (The Lancet).' });

    // Kritische Perspektiven (Lydia)
    slides.push({ type: 'info', title: 'Kritische Perspektiven', accent: '#795548', infoItems: ['Westlicher Bias: KRK wurzelt in Werten des Global North (Quennerstedt et al. 2018)', 'Kulturrelativismus vs. Universalismus: Debatte seit 1947 (Billaud 2022)', 'Anthropologische Kritik: Kindheit ist kulturell geprägt (Goodall 2015)', 'Fallstudie Südafrika: Kinderarbeitsgesetze erhöhten Armut (Levine 2011)', 'Fallstudie Malawi: „Freiheit" vernachlässigte Arbeiterrechte (Englund/Billaud 2022)', 'KRK als Konsens-Dokument: Meinungsverschiedenheiten wurden übergangen'], notes: 'Lydias Forschungsteil. Goodalls 6 Faktoren: Kultur, Gender, Patriarchat, Religion, Universale Aspirationen, Arbeitsmärkte. American Anthropological Association nannte 1947 die Menschenrechtserklärung „cultural imperialism". Die KRK universalisiert westliche Konzepte von Kindheit (Imoah 2012).' });

    // Questions
    slides.push({ type: 'question', title: 'Diskussionsfragen', questions: ['Sollten Kinderrechte explizit im Grundgesetz stehen?', 'Wie können Kinder in der Schule stärker mitbestimmen?', 'Brauchen wir neue Kinderrechte für die digitale Welt?', 'Was kann jeder Einzelne für Kinderrechte tun?', 'Welche Kinderrechte werden weltweit am häufigsten verletzt?'], notes: 'Klasse einbeziehen. Jede Frage kurz anmoderieren.' });

    // 35 — End
    slides.push({ type: 'end', title: 'Vielen Dank!', subtitle: 'Fragen & Diskussion', authors: 'Lydia Howe & Alexandre Zua Caldeira', meta: 'Fach: Recht · Lehrer: Uwe Otto · 06. März 2026', notes: 'Danke sagen. QR-Code zeigen. Für Fragen offen bleiben.' });

    return slides;
  }
}
