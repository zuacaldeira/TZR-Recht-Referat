export type TimelineEventType = 'law' | 'progress' | 'crisis' | 'report';

export interface TimelineEvent {
  year: number;
  title: string;
  summary: string;
  details: string;
  color: string;
  type: TimelineEventType;
  source?: string;
  highlight?: boolean;
}
