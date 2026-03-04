import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ArticleCardComponent } from './article-card/article-card.component';
import { ArticlesService } from '../../services/articles.service';
import { CategoryService } from '../../services/category.service';
import { CategoryKey } from '../../models/category';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatChipsModule, MatSlideToggleModule, ScrollRevealDirective, ArticleCardComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent {
  readonly articlesService = inject(ArticlesService);
  readonly categoryService = inject(CategoryService);

  readonly categoryKeys: (CategoryKey | 'all')[] = ['all', 'survival', 'development', 'protection', 'participation'];

  getCategoryLabel(key: CategoryKey | 'all'): string {
    return key === 'all' ? 'Alle' : this.categoryService.getCategoryName(key as CategoryKey);
  }

  getCategoryColor(key: CategoryKey | 'all'): string {
    if (key === 'all') return '';
    return this.categoryService.getCategory(key as CategoryKey).color;
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.articlesService.searchTerm.set(value);
  }

  setCategory(key: CategoryKey | 'all'): void {
    this.articlesService.activeCategory.set(key);
  }

  toggleKeyOnly(): void {
    this.articlesService.showKeyOnly.update(v => !v);
  }
}
