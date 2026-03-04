import { Component, inject, signal, HostListener } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { TimelineService } from '../../services/timeline.service';
import { TIMELINE_TYPE_LABELS, TIMELINE_TYPE_COLORS } from '../../data/timeline';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [MatExpansionModule, ScrollRevealDirective],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  private timelineService = inject(TimelineService);
  readonly events = this.timelineService.events;
  readonly progress = signal(0);
  readonly typeLabels = TIMELINE_TYPE_LABELS;
  readonly typeColors = TIMELINE_TYPE_COLORS;

  @HostListener('window:scroll')
  onScroll(): void {
    const timeline = document.querySelector('.timeline') as HTMLElement;
    if (!timeline) return;
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalHeight = timeline.offsetHeight;
    const scrolled = windowHeight - rect.top;
    const pct = Math.min(100, Math.max(0, (scrolled / totalHeight) * 100));
    this.progress.set(pct);
  }
}
