import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { QuizComponent } from './quiz/quiz.component';
import { MemoryComponent } from './memory/memory.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [MatTabsModule, ScrollRevealDirective, QuizComponent, MemoryComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {}
