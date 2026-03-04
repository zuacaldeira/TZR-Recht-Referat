import { Injectable, signal, computed } from '@angular/core';
import { QuizQuestion, MemoryCard } from '../models/quiz';
import { QUIZ_DATA, MEMORY_DATA } from '../data/quiz';

@Injectable({ providedIn: 'root' })
export class QuizService {
  readonly allQuestions = signal<QuizQuestion[]>(QUIZ_DATA);
  readonly memoryCards = signal<MemoryCard[]>(MEMORY_DATA);
  readonly difficulty = signal<'easy' | 'medium' | 'hard'>('medium');

  readonly questions = computed(() =>
    this.allQuestions().filter(q => q.difficulty === this.difficulty())
  );

  readonly currentQuestion = signal(0);
  readonly score = signal(0);
  readonly answered = signal(false);
  readonly selectedOption = signal<number | null>(null);
  readonly quizFinished = signal(false);

  readonly totalQuestions = computed(() => this.questions().length);
  readonly progress = computed(() =>
    ((this.currentQuestion() + 1) / this.totalQuestions()) * 100
  );

  setDifficulty(diff: 'easy' | 'medium' | 'hard'): void {
    this.difficulty.set(diff);
    this.resetQuiz();
  }

  answerQuestion(optionIndex: number): boolean {
    if (this.answered()) return false;
    this.selectedOption.set(optionIndex);
    this.answered.set(true);
    const correct = optionIndex === this.questions()[this.currentQuestion()].correct;
    if (correct) {
      this.score.update(s => s + 1);
    }
    return correct;
  }

  nextQuestion(): void {
    if (this.currentQuestion() < this.totalQuestions() - 1) {
      this.currentQuestion.update(q => q + 1);
      this.answered.set(false);
      this.selectedOption.set(null);
    } else {
      this.quizFinished.set(true);
    }
  }

  resetQuiz(): void {
    this.currentQuestion.set(0);
    this.score.set(0);
    this.answered.set(false);
    this.selectedOption.set(null);
    this.quizFinished.set(false);
  }

  getMemoryPairs(count: number): MemoryCard[] {
    return MEMORY_DATA.slice(0, count);
  }
}
