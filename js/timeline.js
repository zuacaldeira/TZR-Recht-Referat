document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  initTimelineInteraction();
  initScrollReveal(); // re-observe dynamically added .reveal elements
});

function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container || typeof TIMELINE_DATA === 'undefined') return;

  container.innerHTML = TIMELINE_DATA.map((item, i) => `
    <div class="timeline-item reveal" data-index="${i}" tabindex="0" role="button"
         aria-expanded="false" aria-label="${item.year}: ${item.title}">
      <div class="timeline-dot" style="background: ${item.color}"></div>
      <div class="timeline-year">${item.year}</div>
      <div class="timeline-card" style="border-color: ${item.color}">
        <h3>${item.title}</h3>
        <p class="summary">${item.summary}</p>
        <div class="details" aria-hidden="true">
          <p>${item.details}</p>
        </div>
        <div class="timeline-toggle-hint">
          <span>Klicken für Details</span>
        </div>
      </div>
    </div>
  `).join('');
}

function initTimelineInteraction() {
  const container = document.getElementById('timeline');
  if (!container) return;

  // Click to expand
  container.addEventListener('click', (e) => {
    const item = e.target.closest('.timeline-item');
    if (!item) return;
    toggleItem(item);
  });

  // Keyboard navigation
  container.addEventListener('keydown', (e) => {
    const item = e.target.closest('.timeline-item');
    if (!item) return;

    const items = [...container.querySelectorAll('.timeline-item')];
    const index = items.indexOf(item);

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggleItem(item);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        if (index < items.length - 1) items[index + 1].focus();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        if (index > 0) items[index - 1].focus();
        break;
    }
  });
}

function toggleItem(item) {
  const isActive = item.classList.contains('active');
  // Close all
  item.parentElement.querySelectorAll('.timeline-item.active').forEach(el => {
    el.classList.remove('active');
    el.setAttribute('aria-expanded', 'false');
    el.querySelector('.details').setAttribute('aria-hidden', 'true');
  });
  // Open clicked (if wasn't open)
  if (!isActive) {
    item.classList.add('active');
    item.setAttribute('aria-expanded', 'true');
    item.querySelector('.details').setAttribute('aria-hidden', 'false');
  }
}
