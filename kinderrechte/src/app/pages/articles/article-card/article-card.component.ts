import { Component, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Article } from '../../../models/article';
import { CategoryKey, CategoryInfo } from '../../../models/category';
import { CATEGORIES } from '../../../data/categories';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  article = input.required<Article>();
  flipped = signal(false);

  toggle(): void {
    this.flipped.update(v => !v);
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggle();
    }
  }

  getCategoryInfo(): CategoryInfo {
    return CATEGORIES[this.article().category as CategoryKey];
  }
}
