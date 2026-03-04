import { Component, input, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { CategoryKey } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-badge',
  standalone: true,
  imports: [MatChipsModule],
  template: `
    <mat-chip [style.background]="info.bgLight" [style.color]="info.textDark">
      {{ info.name }}
    </mat-chip>
  `,
  styles: [`
    mat-chip {
      font-weight: 700;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  `]
})
export class CategoryBadgeComponent {
  categoryKey = input.required<CategoryKey>();
  private categoryService = inject(CategoryService);

  get info() {
    return this.categoryService.getCategory(this.categoryKey());
  }
}
