import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-vermittlung',
  standalone: true,
  imports: [MatCardModule, MatExpansionModule, ScrollRevealDirective],
  templateUrl: './vermittlung.component.html',
  styleUrl: './vermittlung.component.scss'
})
export class VermittlungComponent {
  readonly discussionQuestions = [
    { question: 'Sollten Kinderrechte explizit im Grundgesetz stehen?', answer: 'Pro: Stärkere Rechtsposition, Signalwirkung, besserer Schutz bei Interessenkonflikten. Contra: Bereits durch Art. 1–6 GG geschützt, Gefahr der Aufweichung des Elternrechts. Diskutiert: Welchen praktischen Unterschied würde es machen?' },
    { question: 'Wie können Kinder in der Schule stärker mitbestimmen?', answer: 'Mögliche Ansätze: Klassenräte mit echten Entscheidungsbefugnissen, Schülerparlamente, Beteiligung an Schulentwicklung, Feedback-Systeme. Artikel 12 der UN-KRK fordert die Berücksichtigung der Kindesmeinung — wie wird das in eurer Schule umgesetzt?' },
    { question: 'Brauchen wir neue Kinderrechte für die digitale Welt?', answer: 'Themen: Recht auf Datenschutz, Schutz vor Online-Mobbing, altersgerechte Inhalte, Recht auf digitale Bildung, Recht auf Vergessen (Fotos von Kindern im Internet). Reichen die bestehenden 54 Artikel aus, oder brauchen wir ein Update?' },
    { question: 'Was kann jeder Einzelne für Kinderrechte tun?', answer: 'Kinderrechte beginnen im Alltag: Kinder ernst nehmen, zuhören und mitentscheiden lassen. Sich informieren und andere aufklären. Hinschauen, wenn Kindern Unrecht geschieht. Organisationen wie UNICEF, Kinderschutzbund oder lokale Initiativen unterstützen.' },
    { question: 'Welche Kinderrechte werden weltweit am häufigsten verletzt?', answer: 'Kinderarbeit: 138 Mio. Kinder betroffen, 54 Mio. in gefährlicher Arbeit (ILO/UNICEF 2024). Armut: 417 Mio. Kinder in extremer Entbehrung (UNICEF 2025). Konflikte: 473 Mio. Kinder in Konfliktgebieten, 32.990 schwere Verstöße 2023 dokumentiert (UN). Kinderehe: 650 Mio. Frauen als Kind verheiratet (World Bank 2023). Gewalt: 1 Mrd. Kinder vulnerabel (UN 2024). Bildung: 52 Mio. Kinder in Konfliktzonen ohne Schule. Auch in Deutschland: Kinderarmut, Bildungsungleichheit und Gewalt gegen Kinder.' },
  ];

  readonly erzieherItems = [
    { title: '§ 45 SGB VIII — Betriebserlaubnis', text: 'Seit der Reform 2021 müssen Einrichtungen der Kinder- und Jugendhilfe ein Gewaltschutzkonzept vorweisen. Die Betriebserlaubnis nach § 45 SGB VIII setzt Beteiligungs- und Beschwerdeverfahren voraus.' },
    { title: 'Beschwerdemanagement in Kitas', text: 'Seit 2012 (§ 45 Abs. 2 Nr. 3 SGB VIII) sind institutionelle Beschwerdeverfahren für Kinder in Einrichtungen der Kinder- und Jugendhilfe gesetzlich vorgeschrieben.' },
    { title: 'Bildungs- und Erziehungspläne', text: 'Alle 16 Bundesländer haben eigene Bildungspläne für den frühkindlichen Bereich. Sie legen Grundsätze für Bildung, Erziehung und Betreuung fest — Kinderrechte sind dabei ein Querschnittsthema.' },
    { title: 'KiTa-Qualitätsgesetz', text: 'Das KiTa-Qualitätsgesetz stellt rund 4 Mrd. EUR (2023–2024) und weitere Mittel bis 2026 bereit, um die Qualität der frühkindlichen Bildung bundesweit zu verbessern.' },
    { title: 'Klassenrat als Partizipationstool', text: 'Der Klassenrat ist ein praktisches Werkzeug zur Umsetzung von Artikel 12 UN-KRK. Kinder lernen demokratische Prozesse, Konfliktlösung und erfahren Selbstwirksamkeit.' },
  ];

  readonly zukunftCompare = {
    left: {
      label: 'Herausforderungen',
      items: [
        { title: 'Digitale Rechte', text: 'Datenschutz, Online-Mobbing, altersgerechte Inhalte und das Recht auf Vergessen. Die EU arbeitet an einer „Digital Rights for Children"-Strategie.' },
        { title: 'Klimawandel', text: 'Bedroht Kinderrechte weltweit: Recht auf Gesundheit, sauberes Wasser, Nahrung und eine sichere Zukunft.' },
        { title: 'Grundgesetz-Debatte', text: 'Ein Gesetzentwurf von 2021 scheiterte. Die Debatte um explizite Verankerung von Kinderrechten geht weiter.' },
      ]
    },
    right: {
      label: 'Positive Entwicklungen',
      items: [
        { title: '2026 — Jahr der Kinderrechte', text: 'Die Bundesregierung hat 2026 zum Jahr der Kinderrechte erklärt, mit zahlreichen Aktionen und Kampagnen.' },
        { title: 'Kinderrechte-Index 2025', text: 'Der Index des Deutschen Kinderhilfswerks macht Umsetzungsunterschiede zwischen Bundesländern sichtbar.' },
        { title: 'Kinder als politische Akteure', text: 'Kinder und Jugendliche werden zunehmend aktiv in Klimabewegung, Schülerparlamenten und politischer Mitgestaltung.' },
      ]
    }
  };

  readonly programmeItems = [
    { title: 'Kinderrechte-Landschaften 2025–2026', text: 'Das Programm der Deutschen Kinder- und Jugendstiftung (DKJS) vernetzt 10 Kitas und 16 Schulen, um Kinderrechte strukturell in den Einrichtungsalltag zu integrieren.' },
    { title: 'UNICEF Kinderrechteschulen', text: 'Ein 7-stufiges Ausbildungsprogramm, das Schulen dabei unterstützt, Kinderrechte ganzheitlich zu leben. Aktiv in NRW, Niedersachsen, Sachsen und Schleswig-Holstein.' },
    { title: 'Kinderrechte-Index 2025', text: 'Der Kinderrechte-Index des Deutschen Kinderhilfswerks zeigt, wie unterschiedlich Kinderrechte in den einzelnen Bundesländern umgesetzt werden — von Bildung über Beteiligung bis Schutz.' },
    { title: '2026 als Jahr der Kinderrechte', text: 'Die Bundesregierung hat 2026 zum Jahr der Kinderrechte erklärt. Zahlreiche Aktionen, Projekte und Kampagnen sollen Kinderrechte stärker ins öffentliche Bewusstsein rücken.' },
  ];

  readonly externalLinks = [
    { title: 'UNICEF Kinderrechteschulen', url: 'https://www.unicef.de/informieren/einsatz-fuer-kinderrechte/kinderrechteschulen' },
    { title: 'Kinderrechte-Landschaften (DKJS)', url: 'https://www.kinderrechte.de/projekte/programm-kinderrechte-landschaften/' },
    { title: 'Kinderrechte-Index 2025', url: 'https://jugendhilfeportal.de/artikel/kinder-und-jugendrechte-kinderrechte-index-2025' },
    { title: 'KiTa-Qualitätsgesetz (BMFSFJ)', url: 'https://www.bmfsfj.bund.de/bmfsfj/themen/familie/kinderbetreuung/kita-qualitaetsgesetz' },
    { title: 'UNICEF Unterrichtsmaterial', url: 'https://www.unicef.de/informieren/schulen/unterrichtsmaterial/kinderrechte' },
    { title: 'Nummer gegen Kummer', url: 'https://www.nummergegenkummer.de' },
    { title: 'UN-Kinderrechtskonvention (DeGeDe)', url: 'https://degede.de/abc/un-kinderrechtskonvention/' },
    { title: 'Modellschul-Netzwerk Kinderrechte Hessen (Makista)', url: 'https://www.makista.de/projekte/modellschul-netzwerk-fuer-kinderrechte-hessen/' },
  ];
}
