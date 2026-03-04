import { CategoryKey, CategoryInfo } from '../models/category';

export const CATEGORIES: Record<CategoryKey, CategoryInfo> = {
  survival: { name: 'Überleben', color: '#FF9800', icon: '❤️', bgLight: '#FFF3E0', textDark: '#E65100' },
  development: { name: 'Entwicklung', color: '#4CAF50', icon: '🎓', bgLight: '#E8F5E9', textDark: '#2E7D32' },
  protection: { name: 'Schutz', color: '#E91E63', icon: '🛡️', bgLight: '#FCE4EC', textDark: '#C2185B' },
  participation: { name: 'Beteiligung', color: '#03A9F4', icon: '👥', bgLight: '#E1F5FE', textDark: '#0277BD' },
};

export const CATEGORY_NAMES: Record<CategoryKey, string> = {
  survival: 'Überleben',
  development: 'Entwicklung',
  protection: 'Schutz',
  participation: 'Beteiligung',
};
