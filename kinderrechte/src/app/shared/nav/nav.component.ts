import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PresentationService } from '../../services/presentation.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  private presentation = inject(PresentationService);
  menuOpen = signal(false);

  readonly links = [
    { path: '/', label: 'Start', exact: true },
    { path: '/geschichte', label: 'Geschichte', exact: false },
    { path: '/artikel', label: 'Artikel', exact: false },
    { path: '/spiele', label: 'Spiele', exact: false },
    { path: '/vermittlung', label: 'Vermittlung', exact: false },
    { path: '/verletzungen', label: 'Verletzungen', exact: false },
  ];

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  startPresentation(): void {
    this.presentation.start();
  }
}
