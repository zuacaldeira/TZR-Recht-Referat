import { Component, signal, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { VIOLATION_CATEGORIES, VIOLATION_OVERVIEW } from '../../data/violations';

@Component({
  selector: 'app-violations',
  standalone: true,
  imports: [MatCardModule, MatButtonToggleModule, ScrollRevealDirective],
  templateUrl: './violations.component.html',
  styleUrl: './violations.component.scss'
})
export class ViolationsComponent {
  readonly categories = VIOLATION_CATEGORIES;
  readonly overview = VIOLATION_OVERVIEW;
  readonly activeCategory = signal('conflict');

  readonly currentCategory = computed(() =>
    this.categories.find(c => c.id === this.activeCategory())!
  );

  setCategory(id: string): void {
    this.activeCategory.set(id);
  }
}
