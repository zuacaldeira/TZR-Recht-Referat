import { CategoryKey } from './category';

export interface Article {
  id: number;
  title: string;
  summary: string;
  full: string;
  category: CategoryKey;
  key: boolean;
}
