import { Component, inject, signal, computed } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QuizService } from '../../../services/quiz.service';
import { MemoryCard } from '../../../models/quiz';

interface GameCard {
  pairId: string;
  name: string;
  icon: string;
  flipped: boolean;
  matched: boolean;
  uniqueId: number;
}

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [MatButtonToggleModule, MatDialogModule],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.scss'
})
export class MemoryComponent {
  private quizService = inject(QuizService);
  private dialog = inject(MatDialog);

  readonly difficulty = signal<'easy' | 'medium' | 'hard'>('easy');
  readonly cards = signal<GameCard[]>([]);
  readonly moves = signal(0);
  readonly matchedPairs = signal(0);
  readonly totalPairs = computed(() => this.getDifficultyCount());
  readonly won = signal(false);

  private flippedCards: GameCard[] = [];
  private locked = false;

  constructor() {
    this.startGame('easy');
  }

  getDifficultyCount(): number {
    switch (this.difficulty()) {
      case 'easy': return 6;
      case 'medium': return 8;
      case 'hard': return 12;
    }
  }

  getGridClass(): string {
    return 'memory-grid--' + this.difficulty();
  }

  setDifficulty(diff: 'easy' | 'medium' | 'hard'): void {
    this.difficulty.set(diff);
    this.startGame(diff);
  }

  startGame(diff: 'easy' | 'medium' | 'hard'): void {
    const count = diff === 'easy' ? 6 : diff === 'medium' ? 8 : 12;
    const pairs = this.quizService.getMemoryPairs(count);
    const gameCards: GameCard[] = [];
    let id = 0;

    pairs.forEach(pair => {
      gameCards.push({ pairId: pair.id, name: pair.name, icon: pair.icon, flipped: false, matched: false, uniqueId: id++ });
      gameCards.push({ pairId: pair.id, name: pair.name, icon: pair.icon, flipped: false, matched: false, uniqueId: id++ });
    });

    // Shuffle
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }

    this.cards.set(gameCards);
    this.moves.set(0);
    this.matchedPairs.set(0);
    this.won.set(false);
    this.flippedCards = [];
    this.locked = false;
  }

  flipCard(card: GameCard): void {
    if (this.locked || card.flipped || card.matched) return;

    card.flipped = true;
    this.cards.update(c => [...c]);
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.moves.update(m => m + 1);
      this.locked = true;

      const [first, second] = this.flippedCards;
      if (first.pairId === second.pairId) {
        first.matched = true;
        second.matched = true;
        this.cards.update(c => [...c]);
        this.matchedPairs.update(p => p + 1);
        this.flippedCards = [];
        this.locked = false;

        if (this.matchedPairs() === this.totalPairs()) {
          this.won.set(true);
        }
      } else {
        setTimeout(() => {
          first.flipped = false;
          second.flipped = false;
          this.cards.update(c => [...c]);
          this.flippedCards = [];
          this.locked = false;
        }, 1000);
      }
    }
  }

  onCardKeydown(e: KeyboardEvent, card: GameCard): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.flipCard(card);
    }
  }
}
