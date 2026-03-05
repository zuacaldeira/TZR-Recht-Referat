import { Component, inject, HostListener, signal, computed } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PresentationService } from '../../services/presentation.service';
import { CATEGORIES } from '../../data/categories';
import { ARTICLES_DATA } from '../../data/articles';
import { Article } from '../../models/article';
import { CategoryKey } from '../../models/category';
import { QuizSlideQuestion } from '../../models/presentation';
import { SLIDE_TYPE_SVGS, EMOJI_TO_SVG } from './slide-icons';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss'
})
export class PresentationComponent {
  readonly pres = inject(PresentationService);
  private readonly sanitizer = inject(DomSanitizer);
  readonly fadeOut = signal(false);
  private touchStartX = 0;
  private touchStartY = 0;

  readonly TYPE_ICONS: Record<string, string> = {
    hero: '🎬', title: '📌', overview: '📊', category: '🏷️',
    timeline: '🕰️', article: '📄', info: '📋', stat: '📈',
    quote: '💬', image: '🖼️', compare: '⚖️', question: '❓', end: '🎉',
    agenda: '📋', summary: '✅', interaction: '🙋', 'article-group': '📑', 'timeline-group': '📅', section: '🔷', 'article-browser': '🔍', quiz: '🧠'
  };

  // Quiz state
  readonly quizIndex = signal(0);
  readonly quizSelected = signal<number | null>(null);
  readonly quizRevealed = signal(false);
  readonly quizScore = signal(0);
  readonly quizFinished = signal(false);

  readonly currentQuizQuestion = computed<QuizSlideQuestion | null>(() => {
    const slide = this.pres.currentSlideData();
    if (!slide?.quizQuestions) return null;
    const idx = this.quizIndex();
    return idx < slide.quizQuestions.length ? slide.quizQuestions[idx] : null;
  });

  selectQuizOption(index: number): void {
    if (this.quizRevealed()) return;
    this.quizSelected.set(index);
    this.quizRevealed.set(true);
    const q = this.currentQuizQuestion();
    if (q && index === q.correct) {
      this.quizScore.update(s => s + 1);
    }
    // Auto-advance after a short delay
    setTimeout(() => this.nextQuizQuestion(), 1500);
  }

  nextQuizQuestion(): void {
    const slide = this.pres.currentSlideData();
    if (!slide?.quizQuestions) return;
    const nextIdx = this.quizIndex() + 1;
    if (nextIdx >= slide.quizQuestions.length) {
      this.quizFinished.set(true);
    } else {
      this.quizIndex.set(nextIdx);
      this.quizSelected.set(null);
      this.quizRevealed.set(false);
    }
  }

  resetQuiz(): void {
    this.quizIndex.set(0);
    this.quizSelected.set(null);
    this.quizRevealed.set(false);
    this.quizScore.set(0);
    this.quizFinished.set(false);
  }

  // Sanitized SVG icons
  readonly TYPE_SVGS: Record<string, SafeHtml> = {};
  readonly EMOJI_SVGS: Record<string, SafeHtml> = {};


  constructor() {
    for (const [k, v] of Object.entries(SLIDE_TYPE_SVGS)) {
      this.TYPE_SVGS[k] = this.sanitizer.bypassSecurityTrustHtml(v);
    }
    for (const [k, v] of Object.entries(EMOJI_TO_SVG)) {
      this.EMOJI_SVGS[k] = this.sanitizer.bypassSecurityTrustHtml(v);
    }
  }

  getSvgIcon(emoji: string): SafeHtml | null {
    return this.EMOJI_SVGS[emoji] || null;
  }

  // Article Browser state
  readonly allArticles: Article[] = ARTICLES_DATA;
  readonly abSearch = signal('');
  readonly abCategory = signal<CategoryKey | 'all'>('all');
  readonly abKeyOnly = signal(false);
  readonly abSearchFocused = signal(false);

  readonly CATEGORY_FILTERS: { key: CategoryKey | 'all'; label: string; color: string }[] = [
    { key: 'all', label: 'Alle', color: '#fff' },
    { key: 'survival', label: 'Überleben', color: CATEGORIES.survival.color },
    { key: 'development', label: 'Entwicklung', color: CATEGORIES.development.color },
    { key: 'protection', label: 'Schutz', color: CATEGORIES.protection.color },
    { key: 'participation', label: 'Beteiligung', color: CATEGORIES.participation.color },
  ];

  readonly filteredArticles = computed(() => {
    let result = this.allArticles;
    const cat = this.abCategory();
    if (cat !== 'all') result = result.filter(a => a.category === cat);
    if (this.abKeyOnly()) result = result.filter(a => a.key);
    const q = this.abSearch().toLowerCase().trim();
    if (q) {
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.full.toLowerCase().includes(q) ||
        String(a.id).includes(q)
      );
    }
    return result;
  });

  getCatColor(cat: string): string {
    return CATEGORIES[cat as CategoryKey]?.color || '#03A9F4';
  }

  onAbSearchInput(e: Event): void {
    this.abSearch.set((e.target as HTMLInputElement).value);
  }

  setAbCategory(cat: CategoryKey | 'all'): void {
    this.abCategory.set(cat);
  }

  toggleAbKeyOnly(): void {
    this.abKeyOnly.update(v => !v);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(e: KeyboardEvent): void {
    if (!this.pres.isActive()) return;

    // Skip navigation keys when article browser search is focused
    if (this.abSearchFocused()) {
      if (e.key === 'Escape') {
        (e.target as HTMLElement)?.blur();
        this.abSearchFocused.set(false);
        e.preventDefault();
      }
      return;
    }

    // Block slide navigation keys on quiz slides (let quiz handle its own flow)
    const isQuizSlide = this.pres.currentSlideData()?.type === 'quiz';

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        if (this.pres.showGrid()) {
          this.pres.showGrid.set(false);
        } else {
          this.pres.stop();
        }
        break;
      case 'ArrowRight':
      case ' ':
      case 'Enter':
        e.preventDefault();
        if (!this.pres.showGrid() && !isQuizSlide) this.navigateNext();
        break;
      case 'ArrowLeft':
      case 'Backspace':
        e.preventDefault();
        if (!this.pres.showGrid() && !isQuizSlide) this.navigatePrev();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        this.tryFullscreen();
        break;
      case 'g':
      case 'G':
        e.preventDefault();
        this.pres.toggleGrid();
        break;
      case 'n':
      case 'N':
        e.preventDefault();
        this.pres.toggleNotes();
        break;
    }
  }

  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.changedTouches[0].screenX;
    this.touchStartY = e.changedTouches[0].screenY;
  }

  onTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].screenX - this.touchStartX;
    const dy = e.changedTouches[0].screenY - this.touchStartY;

    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;

    if (dx < 0) {
      this.navigateNext();
    } else {
      this.navigatePrev();
    }
  }

  navigateNext(): void {
    this.fadeOut.set(true);
    setTimeout(() => {
      this.pres.next();
      this.resetQuiz();
      this.fadeOut.set(false);
    }, 200);
  }

  navigatePrev(): void {
    this.fadeOut.set(true);
    setTimeout(() => {
      this.pres.prev();
      this.resetQuiz();
      this.fadeOut.set(false);
    }, 200);
  }

  goToSlide(index: number): void {
    this.pres.goTo(index);
    this.resetQuiz();
  }

  close(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    this.pres.stop();
  }

  tryFullscreen(): void {
    const overlay = document.querySelector('.pres-overlay') as HTMLElement;
    if (!overlay || document.fullscreenElement) return;
    overlay.requestFullscreen?.().catch(() => {});
  }

}
