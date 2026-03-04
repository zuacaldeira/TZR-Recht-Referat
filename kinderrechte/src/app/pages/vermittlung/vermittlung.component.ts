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
    { question: 'Welche Kinderrechte werden weltweit am häufigsten verletzt?', answer: 'Kinderarbeit (160 Millionen Kinder weltweit), fehlender Zugang zu Bildung, Kindersoldaten, Kinderehen, Mangelernährung, fehlende Gesundheitsversorgung. Auch in Deutschland gibt es Herausforderungen: Kinderarmut, Bildungsungleichheit und Gewalt gegen Kinder.' },
  ];
}
