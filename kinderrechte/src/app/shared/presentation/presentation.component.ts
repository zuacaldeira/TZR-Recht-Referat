import { Component, inject, HostListener, signal, effect } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PresentationService } from '../../services/presentation.service';
import { PresentationSlide } from '../../models/presentation';
import { CATEGORIES } from '../../data/categories';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss'
})
export class PresentationComponent {
  readonly pres = inject(PresentationService);
  readonly fadeOut = signal(false);
  private touchStartX = 0;
  private touchStartY = 0;

  readonly TYPE_ICONS: Record<string, string> = {
    hero: '🎬', title: '📌', overview: '📊', category: '🏷️',
    timeline: '🕰️', article: '📄', info: '📋', stat: '📈',
    quote: '💬', image: '🖼️', compare: '⚖️', question: '❓', end: '🎉',
    agenda: '📋', summary: '✅', interaction: '🙋', 'article-group': '📑', 'timeline-group': '📅', section: '🔷'
  };

  readonly CATEGORY_BG: Record<string, string> = {
    survival: 'rgba(255, 152, 0, 0.15)',
    development: 'rgba(76, 175, 80, 0.15)',
    protection: 'rgba(233, 30, 99, 0.15)',
    participation: 'rgba(3, 169, 244, 0.15)'
  };

  @HostListener('document:keydown', ['$event'])
  handleKeydown(e: KeyboardEvent): void {
    if (!this.pres.isActive()) return;

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
        if (!this.pres.showGrid()) this.navigateNext();
        break;
      case 'ArrowLeft':
      case 'Backspace':
        e.preventDefault();
        if (!this.pres.showGrid()) this.navigatePrev();
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
      this.fadeOut.set(false);
    }, 200);
  }

  navigatePrev(): void {
    this.fadeOut.set(true);
    setTimeout(() => {
      this.pres.prev();
      this.fadeOut.set(false);
    }, 200);
  }

  goToSlide(index: number): void {
    this.pres.goTo(index);
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

  getCatBg(category?: string): string {
    return this.CATEGORY_BG[category || ''] || 'rgba(3, 169, 244, 0.15)';
  }

  getTimelineDots(slide: PresentationSlide): { class: string }[] {
    const dots: { class: string }[] = [];
    for (let i = 0; i < (slide.timelineTotal || 0); i++) {
      if (i < (slide.timelineIndex || 0)) dots.push({ class: 'done' });
      else if (i === slide.timelineIndex) dots.push({ class: 'active' });
      else dots.push({ class: 'inactive' });
    }
    return dots;
  }
}
