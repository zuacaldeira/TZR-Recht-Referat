export type SlideType = 'hero' | 'title' | 'overview' | 'category' | 'timeline' | 'article' | 'info' | 'stat' | 'quote' | 'image' | 'compare' | 'question' | 'end' | 'agenda' | 'summary' | 'interaction' | 'article-group' | 'timeline-group' | 'section' | 'article-browser' | 'quiz';

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
  // Stat
  statValue?: string;
  statLabel?: string;
  statSource?: string;
  // Quote
  quoteText?: string;
  quoteAuthor?: string;
  // Image
  image?: string;
  imageCredit?: string;
  // Compare
  compareLeft?: CompareColumn;
  compareRight?: CompareColumn;
  // Question
  questions?: string[];
  // Speaker
  speaker?: 'lydia' | 'zua' | 'both';
  // Agenda
  agendaItems?: AgendaItem[];
  // Summary
  summaryItems?: string[];
  // Interaction
  interactionQuestion?: string;
  interactionOptions?: string[];
  // Article Group (2-3 articles per slide)
  articles?: ArticleBrief[];
  // Timeline Group (2-4 events per slide)
  events?: TimelineBrief[];
  // Quiz
  quizQuestions?: QuizSlideQuestion[];
  // Section background variant
  bgVariant?: 'warm' | 'cool' | 'red' | 'green' | 'purple';
  // Background image
  bgImage?: string;
  // Compact text mode (smaller font for dense content)
  compact?: boolean;
}

export interface OverviewItem {
  label: string;
  desc: string;
  color: string;
}

export interface CompareColumn {
  title: string;
  items: string[];
  color: string;
}

export interface AgendaItem {
  label: string;
  speaker: string;
  icon: string;
}

export interface ArticleBrief {
  id: number;
  title: string;
  summary: string;
  full: string;
  category: string;
  categoryColor: string;
  categoryName: string;
}

export interface TimelineBrief {
  year: number;
  title: string;
  summary: string;
  color: string;
}

export interface QuizSlideQuestion {
  question: string;
  options: string[];
  correct: number;
}
