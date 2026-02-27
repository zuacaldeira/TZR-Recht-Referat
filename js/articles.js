document.addEventListener('DOMContentLoaded', () => {
  if (typeof ARTICLES_DATA === 'undefined') return;
  initArticles();
});

function initArticles() {
  const grid = document.getElementById('articles-grid');
  const searchInput = document.getElementById('articles-search');
  const filterBtns = document.querySelectorAll('.filter-btn[data-category]');
  const keyToggle = document.getElementById('key-toggle');
  const countEl = document.getElementById('articles-count');

  let activeCategory = 'all';
  let showKeyOnly = false;
  let searchTerm = '';

  function getFilteredArticles() {
    return ARTICLES_DATA.filter(article => {
      const matchCategory = activeCategory === 'all' || article.category === activeCategory;
      const matchKey = !showKeyOnly || article.key;
      const matchSearch = !searchTerm ||
        article.title.toLowerCase().includes(searchTerm) ||
        article.summary.toLowerCase().includes(searchTerm) ||
        article.full.toLowerCase().includes(searchTerm) ||
        String(article.id).includes(searchTerm);
      return matchCategory && matchKey && matchSearch;
    });
  }

  function renderArticles() {
    const filtered = getFilteredArticles();
    countEl.textContent = `${filtered.length} von ${ARTICLES_DATA.length} Artikeln`;

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="articles-empty">Keine Artikel gefunden.</div>';
      return;
    }

    grid.innerHTML = filtered.map(article => {
      const catName = CATEGORY_NAMES[article.category];
      const keyStar = article.key ? '<span class="article-key-star" title="Schlüsselartikel">&#9733;</span>' : '';

      return `
        <div class="article-flip-card" tabindex="0" role="button"
             aria-label="Artikel ${article.id}: ${article.title}"
             data-id="${article.id}">
          <div class="article-flip-inner">
            <div class="article-front">
              <div class="article-front-header article-front-header--${article.category}">
                <span class="article-number">Art. ${article.id}</span>
                <span class="article-badge">${catName}</span>
              </div>
              <div class="article-front-body">
                <div>
                  <h3>${article.title}${keyStar}</h3>
                  <p>${article.summary}</p>
                </div>
                <div class="article-flip-hint">Klicken zum Umdrehen</div>
              </div>
            </div>
            <div class="article-back">
              <h3>Artikel ${article.id}: ${article.title}</h3>
              <p>${article.full}</p>
              <div class="back-hint">Klicken zum Zurückdrehen</div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Flip on click
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.article-flip-card');
    if (card) card.classList.toggle('flipped');
  });

  // Flip on keyboard
  grid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.article-flip-card');
      if (card) {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    }
  });

  // Category filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      renderArticles();
    });
  });

  // Key articles toggle
  keyToggle?.addEventListener('change', () => {
    showKeyOnly = keyToggle.checked;
    renderArticles();
  });

  // Search
  searchInput?.addEventListener('input', () => {
    searchTerm = searchInput.value.toLowerCase().trim();
    renderArticles();
  });

  renderArticles();
}
