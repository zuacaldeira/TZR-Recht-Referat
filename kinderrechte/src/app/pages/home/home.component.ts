import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, ScrollRevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly categories = [
    { key: 'survival', name: 'Überleben', desc: 'Recht auf Leben, Gesundheit, Ernährung und angemessenen Lebensstandard', iconColor: '#FF9800', bgColor: '#FFF8E1', svgPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
    { key: 'development', name: 'Entwicklung', desc: 'Recht auf Bildung, Spiel, Freizeit, kulturelle Aktivitäten und Information', iconColor: '#4CAF50', bgColor: '#E8F5E9', svgPath: 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z' },
    { key: 'protection', name: 'Schutz', desc: 'Schutz vor Gewalt, Missbrauch, Ausbeutung und Diskriminierung', iconColor: '#E91E63', bgColor: '#FCE4EC', svgPath: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' },
    { key: 'participation', name: 'Beteiligung', desc: 'Recht auf Meinungsäußerung, Mitbestimmung und freie Entfaltung', iconColor: '#03A9F4', bgColor: '#E1F5FE', svgPath: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
  ];

  readonly facts = [
    { number: '196', text: 'Staaten haben die UN-Kinderrechtskonvention ratifiziert — der meistratifizierte Menschenrechtsvertrag der Welt.', source: 'UN-KRK, ohchr.org' },
    { number: '2026', text: 'wurde von der Bundesregierung zum Jahr der Kinderrechte erklärt.', source: 'Bundesregierung' },
    { number: '16', text: 'Bundesländer — und jedes setzt Kinderrechte unterschiedlich um, zeigt der Kinderrechte-Index 2025.', source: 'Deutsches Kinderhilfswerk' },
    { number: '§ 45', text: 'SGB VIII verpflichtet Kitas seit 2012 zu einem Beschwerdemanagement für Kinder.', source: '§ 45 Abs. 2 Nr. 3 SGB VIII' },
  ];

  readonly navCards = [
    { path: '/geschichte', title: 'Geschichte', desc: 'Von 1924 bis heute — die Meilensteine der Kinderrechte', arrow: 'Zur Timeline', variant: 'timeline' },
    { path: '/artikel', title: '54 Artikel', desc: 'Alle Artikel der UN-Kinderrechtskonvention im Überblick', arrow: 'Artikel lesen', variant: 'articles' },
    { path: '/spiele', title: 'Quiz & Memory', desc: 'Teste dein Wissen über Kinderrechte spielerisch', arrow: 'Spielen', variant: 'games' },
    { path: '/vermittlung', title: 'Vermittlung & Schutz', desc: 'Wie Kinderrechte vermittelt und geschützt werden', arrow: 'Mehr erfahren', variant: 'vermittlung' },
    { path: '/verletzungen', title: 'Verletzungen', desc: 'Globale Statistiken zu Kinderrechtsverletzungen mit Quellen', arrow: 'Statistiken ansehen', variant: 'violations' },
  ];
}
