export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MemoryCard {
  id: string;
  name: string;
  icon: string;
}
