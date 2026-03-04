import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  readonly quiz = inject(QuizService);
  feedbackState = '';

  get currentQ() {
    return this.quiz.questions()[this.quiz.currentQuestion()];
  }

  selectOption(index: number): void {
    if (this.quiz.answered()) return;
    const correct = this.quiz.answerQuestion(index);
    this.feedbackState = correct ? 'correct' : 'wrong';
  }

  next(): void {
    this.feedbackState = '';
    this.quiz.nextQuestion();
  }

  restart(): void {
    this.feedbackState = '';
    this.quiz.resetQuiz();
  }

  getOptionClass(index: number): string {
    if (!this.quiz.answered()) return '';
    if (index === this.currentQ.correct) return 'correct';
    if (index === this.quiz.selectedOption()) return 'wrong';
    return 'disabled';
  }

  getResultMessage(): string {
    const pct = (this.quiz.score() / this.quiz.totalQuestions()) * 100;
    if (pct === 100) return 'Perfekt! Du kennst dich super aus!';
    if (pct >= 70) return 'Sehr gut! Du weißt viel über Kinderrechte!';
    if (pct >= 40) return 'Nicht schlecht! Lies noch etwas nach.';
    return 'Übung macht den Meister! Versuch es nochmal.';
  }
}
