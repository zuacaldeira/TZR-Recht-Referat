import { Component, signal, computed } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { TIMELINE_DATA, TIMELINE_TYPE_LABELS, TIMELINE_TYPE_COLORS } from '../../data/timeline';
import { TimelineEventType } from '../../models/timeline-event';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  readonly allEvents = TIMELINE_DATA;
  readonly typeLabels = TIMELINE_TYPE_LABELS;
  readonly typeColors = TIMELINE_TYPE_COLORS;

  readonly activeFilter = signal<string>('all');
  readonly expandedIndex = signal<number | null>(null);

  readonly filterTypes = [
    { key: 'law', label: 'Gesetzgebung', color: TIMELINE_TYPE_COLORS['law'] },
    { key: 'progress', label: 'Fortschritt', color: TIMELINE_TYPE_COLORS['progress'] },
    { key: 'crisis', label: 'Krise', color: TIMELINE_TYPE_COLORS['crisis'] },
    { key: 'report', label: 'Bericht', color: TIMELINE_TYPE_COLORS['report'] },
  ];

  readonly filteredEvents = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.allEvents;
    return this.allEvents.filter(e => e.type === filter);
  });

  setFilter(type: string): void {
    this.activeFilter.set(type);
    this.expandedIndex.set(null);
  }

  toggleExpand(index: number): void {
    this.expandedIndex.update(current => current === index ? null : index);
  }
}
