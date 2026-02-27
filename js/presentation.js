/* ===== PRESENTATION MODE ===== */
(function () {
  'use strict';

  /* -- Category config -- */
  const CATEGORIES = {
    survival: { name: 'Überleben', color: '#FF9800', icon: '❤️' },
    development: { name: 'Entwicklung', color: '#4CAF50', icon: '🎓' },
    protection: { name: 'Schutz', color: '#E91E63', icon: '🛡️' },
    participation: { name: 'Beteiligung', color: '#03A9F4', icon: '👥' }
  };

  const CATEGORY_BG = {
    survival: 'rgba(255, 152, 0, 0.15)',
    development: 'rgba(76, 175, 80, 0.15)',
    protection: 'rgba(233, 30, 99, 0.15)',
    participation: 'rgba(3, 169, 244, 0.15)'
  };

  /* -- Build PRESENTATION_SLIDES -- */
  function buildSlides() {
    const slides = [];

    /* 1 — Title */
    slides.push({
      type: 'title',
      title: 'Kinderrechte',
      subtitle: 'Die UN-Kinderrechtskonvention — Geschichte, Artikel & Vermittlung'
    });

    /* 2 — Overview: 4 Grundprinzipien */
    slides.push({
      type: 'overview',
      title: 'Die vier Grundprinzipien',
      text: 'Alle Kinderrechte lassen sich in vier zentrale Kategorien einordnen.',
      items: [
        { label: 'Überleben', desc: 'Leben, Gesundheit, Ernährung', color: '#FF9800' },
        { label: 'Entwicklung', desc: 'Bildung, Spiel, Freizeit', color: '#4CAF50' },
        { label: 'Schutz', desc: 'Vor Gewalt, Missbrauch, Ausbeutung', color: '#E91E63' },
        { label: 'Beteiligung', desc: 'Meinungsäußerung, Mitbestimmung', color: '#03A9F4' }
      ]
    });

    /* 3–6 — Each category */
    slides.push({
      type: 'category',
      key: 'survival',
      title: 'Überleben',
      text: 'Recht auf Leben, Gesundheit, Ernährung und angemessenen Lebensstandard',
      icon: '❤️',
      color: '#FF9800'
    });
    slides.push({
      type: 'category',
      key: 'development',
      title: 'Entwicklung',
      text: 'Recht auf Bildung, Spiel, Freizeit, kulturelle Aktivitäten und Information',
      icon: '🎓',
      color: '#4CAF50'
    });
    slides.push({
      type: 'category',
      key: 'protection',
      title: 'Schutz',
      text: 'Schutz vor Gewalt, Missbrauch, Ausbeutung und Diskriminierung',
      icon: '🛡️',
      color: '#E91E63'
    });
    slides.push({
      type: 'category',
      key: 'participation',
      title: 'Beteiligung',
      text: 'Recht auf Meinungsäußerung, Mitbestimmung und freie Entfaltung',
      icon: '👥',
      color: '#03A9F4'
    });

    /* 7 — Timeline title */
    slides.push({
      type: 'title',
      title: 'Geschichte der Kinderrechte',
      subtitle: 'Von 1924 bis heute — über 100 Jahre Kampf für die Rechte der Kinder'
    });

    /* 8–18 — Timeline events */
    if (typeof TIMELINE_DATA !== 'undefined') {
      TIMELINE_DATA.forEach(function (ev) {
        slides.push({
          type: 'timeline',
          year: ev.year,
          title: ev.title,
          summary: ev.summary,
          details: ev.details,
          color: ev.color
        });
      });
    }

    /* 19 — Articles overview */
    slides.push({
      type: 'title',
      title: 'Die 54 Artikel',
      subtitle: 'Die UN-Kinderrechtskonvention enthält 54 Artikel. Wir schauen uns die 10 wichtigsten Schlüsselartikel an.'
    });

    /* 20–29 — 10 key articles */
    if (typeof ARTICLES_DATA !== 'undefined') {
      var keyArticles = ARTICLES_DATA.filter(function (a) { return a.key; });
      keyArticles.forEach(function (art) {
        var cat = CATEGORIES[art.category] || { name: art.category, color: '#03A9F4' };
        slides.push({
          type: 'article',
          articleId: art.id,
          title: art.title,
          summary: art.summary,
          full: art.full,
          category: art.category,
          categoryName: cat.name,
          categoryColor: cat.color
        });
      });
    }

    /* 30 — Vermittlung an Kinder */
    slides.push({
      type: 'info',
      title: 'Vermittlung an Kinder',
      accent: '#4CAF50',
      items: [
        'Kindergarten (3–6): Bilderbücher, Rollenspiele, Regeln über Fairness',
        'Grundschule (6–10): Projekttage, Kinderrechteposter, Klassenräte',
        'Sekundarstufe (10–18): Planspiele, Debatten, Fallstudien',
        'UNICEF-Kinderrechte-Schulen: Kinderrechte als gelebte Praxis',
        'Digitale Medien: Interaktive Websites, Apps und Videos'
      ]
    });

    /* 31 — Vermittlung an Eltern */
    slides.push({
      type: 'info',
      title: 'Vermittlung an Eltern',
      accent: '#FF9800',
      items: [
        'Elternabende: Workshops zu gewaltfreier Erziehung',
        'Broschüren & Ratgeber: Mehrsprachige Materialien',
        'Beratungsstellen: Erziehungsberatung, Familienberatung, Frühe Hilfen',
        'Seit 2000: Recht auf gewaltfreie Erziehung (§ 1631 Abs. 2 BGB)',
        'Eltern als wichtigste Vermittler im Alltag'
      ]
    });

    /* 32 — Schutz in Deutschland */
    slides.push({
      type: 'info',
      title: 'Schutz in Deutschland',
      accent: '#E91E63',
      items: [
        'Jugendamt: Schutzauftrag bei Kindeswohlgefährdung (§ 8a SGB VIII)',
        'Grundgesetz: Art. 6 (Schutz der Familie), Art. 2 (freie Entfaltung)',
        'BGB § 1631 Abs. 2: Recht auf gewaltfreie Erziehung',
        'Nummer gegen Kummer: 116 111 (Kinder) / 0800 111 0550 (Eltern)',
        'Kinderschutzbund, Jugendbeauftragte, Online-Beratung'
      ]
    });

    /* 33 — Zukunft */
    slides.push({
      type: 'info',
      title: 'Zukunft der Kinderrechte',
      accent: '#03A9F4',
      items: [
        'Digitale Rechte: Datenschutz, Online-Sicherheit, Recht auf Vergessen',
        'Grundgesetz-Debatte: Kinderrechte explizit verankern?',
        'Klimawandel: Bedrohung für Gesundheit, Wasser, Nahrung, Zukunft',
        'Kinder als Akteure: Fridays for Future, Jugendparlamente',
        'EU-Strategie „Digital Rights for Children"'
      ]
    });

    /* 34 — Diskussionsfragen */
    slides.push({
      type: 'question',
      title: 'Diskussionsfragen',
      questions: [
        'Sollten Kinderrechte explizit im Grundgesetz stehen?',
        'Wie können Kinder in der Schule stärker mitbestimmen?',
        'Brauchen wir neue Kinderrechte für die digitale Welt?',
        'Was kann jeder Einzelne für Kinderrechte tun?',
        'Welche Kinderrechte werden weltweit am häufigsten verletzt?'
      ]
    });

    /* 35 — End */
    slides.push({
      type: 'end',
      title: 'Vielen Dank!',
      subtitle: 'Fragen & Diskussion',
      authors: 'Lydia Howe & Alexandre Zua Caldeira',
      meta: 'Fach: Recht · Lehrer: Uwe Otto · 06. März 2026'
    });

    return slides;
  }

  /* -- Render a single slide -- */
  function renderSlide(slide) {
    var html = '';

    switch (slide.type) {
      case 'title':
        html = '<div class="pres-slide pres-slide--title">' +
          '<div class="pres-title">' + escHtml(slide.title) + '</div>' +
          '<div class="pres-subtitle">' + escHtml(slide.subtitle) + '</div>' +
          '</div>';
        break;

      case 'overview':
        var gridHtml = '';
        slide.items.forEach(function (item) {
          gridHtml += '<div class="pres-grid-item" style="border-color: ' + item.color + '">' +
            '<h4 style="color: ' + item.color + '">' + escHtml(item.label) + '</h4>' +
            '<p>' + escHtml(item.desc) + '</p></div>';
        });
        html = '<div class="pres-slide pres-slide--overview">' +
          '<div class="pres-title">' + escHtml(slide.title) + '</div>' +
          '<div class="pres-text">' + escHtml(slide.text) + '</div>' +
          '<div class="pres-grid">' + gridHtml + '</div>' +
          '</div>';
        break;

      case 'category':
        html = '<div class="pres-slide pres-slide--category">' +
          '<div class="pres-icon" style="background: ' + slide.color + '">' + slide.icon + '</div>' +
          '<div class="pres-title" style="color: ' + slide.color + '">' + escHtml(slide.title) + '</div>' +
          '<div class="pres-text">' + escHtml(slide.text) + '</div>' +
          '</div>';
        break;

      case 'timeline':
        var yearColor = slide.color.replace('var(--color-survival)', '#FF9800')
          .replace('var(--color-development)', '#4CAF50')
          .replace('var(--color-protection)', '#E91E63')
          .replace('var(--color-participation)', '#03A9F4');
        html = '<div class="pres-slide pres-slide--timeline">' +
          '<div class="pres-year" style="color: ' + yearColor + '">' + slide.year + '</div>' +
          '<div class="pres-title">' + escHtml(slide.title) + '</div>' +
          '<div class="pres-summary">' + escHtml(slide.summary) + '</div>' +
          '<div class="pres-details">' + escHtml(slide.details) + '</div>' +
          '</div>';
        break;

      case 'article':
        var bgCol = CATEGORY_BG[slide.category] || 'rgba(3, 169, 244, 0.15)';
        html = '<div class="pres-slide pres-slide--article">' +
          '<div class="pres-article-num" style="background: ' + bgCol + '; color: ' + slide.categoryColor + '">Artikel ' + slide.articleId + '</div>' +
          '<div class="pres-title">' + escHtml(slide.title) + '</div>' +
          '<div class="pres-badge" style="background: ' + bgCol + '; color: ' + slide.categoryColor + '">' + escHtml(slide.categoryName) + '</div>' +
          '<div class="pres-text">' + escHtml(slide.full) + '</div>' +
          '</div>';
        break;

      case 'info':
        var listHtml = '';
        slide.items.forEach(function (item) {
          listHtml += '<li>' + escHtml(item) + '</li>';
        });
        html = '<div class="pres-slide pres-slide--info">' +
          '<div class="pres-title">' + escHtml(slide.title) + '</div>' +
          '<ul class="pres-list" style="--accent: ' + (slide.accent || '#03A9F4') + '">' + listHtml + '</ul>' +
          '</div>';
        break;

      case 'question':
        var qHtml = '';
        slide.questions.forEach(function (q) {
          qHtml += '<li>' + escHtml(q) + '</li>';
        });
        html = '<div class="pres-slide pres-slide--question">' +
          '<div class="pres-title">' + escHtml(slide.title) + '</div>' +
          '<ol class="pres-questions">' + qHtml + '</ol>' +
          '</div>';
        break;

      case 'end':
        html = '<div class="pres-slide pres-slide--end">' +
          '<div class="pres-title">' + escHtml(slide.title) + '</div>' +
          '<div class="pres-subtitle">' + escHtml(slide.subtitle) + '</div>' +
          '<div class="pres-authors">' + escHtml(slide.authors) + '</div>' +
          '<div class="pres-meta">' + escHtml(slide.meta) + '</div>' +
          '<div class="pres-qr"><img src="assets/images/qr-code.png" alt="QR-Code zur Website"></div>' +
          '<div class="pres-qr-label">kinderrechte.zuacaldeira.com</div>' +
          '</div>';
        break;
    }
    return html;
  }

  function escHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* -- Presentation Engine -- */
  var overlay = null;
  var slideContainer = null;
  var counterEl = null;
  var progressEl = null;
  var prevBtn = null;
  var nextBtn = null;
  var slides = [];
  var currentSlide = 0;
  var touchStartX = 0;
  var touchStartY = 0;

  function startPresentation() {
    slides = buildSlides();
    currentSlide = 0;

    /* Create overlay */
    overlay = document.createElement('div');
    overlay.className = 'pres-overlay';
    overlay.innerHTML =
      '<button class="pres-close" aria-label="Präsentation beenden">&times;</button>' +
      '<button class="pres-nav pres-nav--prev" aria-label="Vorherige Folie">&#9665;</button>' +
      '<button class="pres-nav pres-nav--next" aria-label="Nächste Folie">&#9655;</button>' +
      '<div class="pres-slide-container"></div>' +
      '<div class="pres-counter"></div>' +
      '<div class="pres-progress"></div>';

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    slideContainer = overlay.querySelector('.pres-slide-container');
    slideContainer.style.cssText = 'flex:1;display:flex;width:100%;';
    counterEl = overlay.querySelector('.pres-counter');
    progressEl = overlay.querySelector('.pres-progress');
    prevBtn = overlay.querySelector('.pres-nav--prev');
    nextBtn = overlay.querySelector('.pres-nav--next');

    /* Event listeners */
    overlay.querySelector('.pres-close').addEventListener('click', stopPresentation);
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    document.addEventListener('keydown', handleKeydown);
    overlay.addEventListener('touchstart', handleTouchStart, { passive: true });
    overlay.addEventListener('touchend', handleTouchEnd, { passive: true });

    showSlide(0);

    /* Try fullscreen */
    tryFullscreen();
  }

  function stopPresentation() {
    if (!overlay) return;

    document.removeEventListener('keydown', handleKeydown);

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(function () {});
    }

    overlay.remove();
    overlay = null;
    document.body.style.overflow = '';
  }

  function showSlide(n) {
    if (n < 0 || n >= slides.length) return;

    var oldSlide = slideContainer.querySelector('.pres-slide');

    if (oldSlide) {
      oldSlide.classList.add('fade-out');
      setTimeout(function () {
        slideContainer.innerHTML = renderSlide(slides[n]);
        currentSlide = n;
        updateUI();
      }, 200);
    } else {
      slideContainer.innerHTML = renderSlide(slides[n]);
      currentSlide = n;
      updateUI();
    }
  }

  function nextSlide() {
    if (currentSlide < slides.length - 1) showSlide(currentSlide + 1);
  }

  function prevSlide() {
    if (currentSlide > 0) showSlide(currentSlide - 1);
  }

  function updateUI() {
    counterEl.textContent = (currentSlide + 1) + ' / ' + slides.length;
    var pct = ((currentSlide + 1) / slides.length * 100).toFixed(1);
    progressEl.style.width = pct + '%';
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === slides.length - 1;
  }

  /* Keyboard */
  function handleKeydown(e) {
    if (!overlay) return;

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'Enter':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'Backspace':
        e.preventDefault();
        prevSlide();
        break;
      case 'Escape':
        e.preventDefault();
        stopPresentation();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        tryFullscreen();
        break;
    }
  }

  /* Touch / Swipe */
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }

  function handleTouchEnd(e) {
    var dx = e.changedTouches[0].screenX - touchStartX;
    var dy = e.changedTouches[0].screenY - touchStartY;

    /* Only horizontal swipes (ignore vertical scrolling) */
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;

    if (dx < 0) {
      nextSlide(); /* swipe left = next */
    } else {
      prevSlide(); /* swipe right = prev */
    }
  }

  /* Fullscreen */
  function tryFullscreen() {
    if (!overlay) return;
    if (document.fullscreenElement) return;

    if (overlay.requestFullscreen) {
      overlay.requestFullscreen().catch(function () {});
    }
  }

  /* -- Init: bind play button -- */
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('start-presentation');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        startPresentation();
      });
    }
  });

  /* Expose for external use */
  window.startPresentation = startPresentation;
  window.stopPresentation = stopPresentation;
})();
