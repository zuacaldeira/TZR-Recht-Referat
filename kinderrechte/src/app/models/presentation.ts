export type SlideType = 'hero' | 'title' | 'overview' | 'category' | 'timeline' | 'article' | 'info' | 'question' | 'end';

export interface PresentationSlide {
  type: SlideType;
  title?: string;
  subtitle?: string;
  text?: string;
  notes?: string;
  // Hero/End
  authors?: string;
  meta?: string;
  // Overview
  items?: OverviewItem[];
  // Category
  key?: string;
  icon?: string;
  color?: string;
  // Timeline
  year?: number;
  summary?: string;
  details?: string;
  timelineIndex?: number;
  timelineTotal?: number;
  // Article
  articleId?: number;
  full?: string;
  category?: string;
  categoryName?: string;
  categoryColor?: string;
  // Info
  accent?: string;
  infoItems?: string[];
  // Question
  questions?: string[];
}

export interface OverviewItem {
  label: string;
  desc: string;
  color: string;
}
