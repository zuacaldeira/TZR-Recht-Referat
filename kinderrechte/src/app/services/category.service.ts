import { Injectable } from '@angular/core';
import { CategoryKey, CategoryInfo } from '../models/category';
import { CATEGORIES, CATEGORY_NAMES } from '../data/categories';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  readonly categories = CATEGORIES;
  readonly categoryNames = CATEGORY_NAMES;

  getCategory(key: CategoryKey): CategoryInfo {
    return this.categories[key];
  }

  getCategoryName(key: CategoryKey): string {
    return this.categoryNames[key];
  }

  getAllKeys(): CategoryKey[] {
    return ['survival', 'development', 'protection', 'participation'];
  }
}
