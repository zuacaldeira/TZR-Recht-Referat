import { Injectable, signal, computed } from '@angular/core';
import { Article } from '../models/article';
import { CategoryKey } from '../models/category';
import { ARTICLES_DATA } from '../data/articles';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  readonly articles = signal<Article[]>(ARTICLES_DATA);

  readonly activeCategory = signal<CategoryKey | 'all'>('all');
  readonly showKeyOnly = signal(false);
  readonly searchTerm = signal('');

  readonly filteredArticles = computed(() => {
    let result = this.articles();
    const category = this.activeCategory();
    const keyOnly = this.showKeyOnly();
    const search = this.searchTerm().toLowerCase().trim();

    if (category !== 'all') {
      result = result.filter(a => a.category === category);
    }
    if (keyOnly) {
      result = result.filter(a => a.key);
    }
    if (search) {
      result = result.filter(a =>
        a.title.toLowerCase().includes(search) ||
        a.summary.toLowerCase().includes(search) ||
        a.full.toLowerCase().includes(search) ||
        a.id.toString().includes(search)
      );
    }
    return result;
  });

  getKeyArticles(): Article[] {
    return ARTICLES_DATA.filter(a => a.key);
  }
}
