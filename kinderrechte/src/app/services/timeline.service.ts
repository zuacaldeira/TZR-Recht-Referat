import { Injectable, signal } from '@angular/core';
import { TimelineEvent } from '../models/timeline-event';
import { TIMELINE_DATA } from '../data/timeline';

@Injectable({ providedIn: 'root' })
export class TimelineService {
  readonly events = signal<TimelineEvent[]>(TIMELINE_DATA);
}
