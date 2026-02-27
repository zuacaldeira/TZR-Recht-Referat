document.addEventListener('DOMContentLoaded', () => {
  if (typeof QUIZ_DATA === 'undefined') return;
  initGameTabs();
  initQuiz();
  initMemory();
});

/* ===== GAME TABS ===== */
function initGameTabs() {
  const tabs = document.querySelectorAll('.game-tab');
  const panels = document.querySelectorAll('.game-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.game)?.classList.add('active');
    });
  });
}

/* ===== QUIZ ===== */
function initQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    if (currentQuestion >= QUIZ_DATA.length) {
      renderResult();
      return;
    }

    const q = QUIZ_DATA[currentQuestion];
    const progress = ((currentQuestion) / QUIZ_DATA.length) * 100;

    container.innerHTML = `
      <div class="quiz-header">
        <span class="quiz-progress-text">Frage ${currentQuestion + 1} / ${QUIZ_DATA.length}</span>
        <span class="quiz-score">Punkte: ${score}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
      <div class="quiz-question-card">
        <p class="quiz-question">${q.question}</p>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}">${opt}</button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
      </div>
    `;

    answered = false;

    container.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(btn, q));
    });
  }

  function handleAnswer(btn, q) {
    if (answered) return;
    answered = true;

    const selected = parseInt(btn.dataset.index);
    const isCorrect = selected === q.correct;
    const feedback = document.getElementById('quiz-feedback');

    // Disable all buttons
    container.querySelectorAll('.quiz-option').forEach(b => {
      b.classList.add('disabled');
    });

    // Highlight correct answer
    container.querySelectorAll('.quiz-option')[q.correct].classList.add('correct');

    if (isCorrect) {
      score++;
      btn.classList.add('correct', 'pop');
      feedback.className = 'quiz-feedback correct';
      feedback.textContent = 'Richtig!';
    } else {
      btn.classList.add('wrong', 'shake');
      feedback.className = 'quiz-feedback wrong';
      feedback.textContent = `Falsch! Die richtige Antwort ist: ${q.options[q.correct]}`;
    }

    setTimeout(() => {
      currentQuestion++;
      renderQuestion();
    }, 2000);
  }

  function renderResult() {
    const percent = Math.round((score / QUIZ_DATA.length) * 100);
    let message = '';
    if (percent === 100) message = 'Perfekt! Du bist ein Kinderrechte-Experte!';
    else if (percent >= 80) message = 'Sehr gut! Du kennst dich prima aus!';
    else if (percent >= 60) message = 'Gut gemacht! Du weißt schon einiges!';
    else if (percent >= 40) message = 'Nicht schlecht! Schau dir die Artikel nochmal an.';
    else message = 'Übung macht den Meister! Lies die Artikel und versuche es nochmal.';

    container.innerHTML = `
      <div class="quiz-result pop">
        <div class="quiz-result-score">${score} / ${QUIZ_DATA.length}</div>
        <p class="quiz-result-text">${message}</p>
        <div class="quiz-result-bar">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${percent}%"></div>
          </div>
        </div>
        <button class="btn btn-primary" id="quiz-restart">Nochmal spielen</button>
      </div>
    `;

    document.getElementById('quiz-restart').addEventListener('click', () => {
      currentQuestion = 0;
      score = 0;
      renderQuestion();
    });
  }

  renderQuestion();
}

/* ===== MEMORY ===== */
function initMemory() {
  const grid = document.getElementById('memory-grid');
  const movesEl = document.getElementById('memory-moves');
  const pairsEl = document.getElementById('memory-pairs');
  const winEl = document.getElementById('memory-win');
  if (!grid) return;

  let cards = [];
  let flippedCards = [];
  let moves = 0;
  let matchedPairs = 0;
  let totalPairs = 0;
  let lockBoard = false;
  let currentDifficulty = 'easy';

  const difficulties = { easy: 6, medium: 8, hard: 12 };

  // Difficulty buttons
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDifficulty = btn.dataset.difficulty;
      startMemory();
    });
  });

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startMemory() {
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    lockBoard = false;
    totalPairs = difficulties[currentDifficulty];
    winEl.classList.remove('visible');

    const selected = shuffle(MEMORY_DATA).slice(0, totalPairs);
    // Create pairs: one with icon, one with name
    const pairs = [];
    selected.forEach(item => {
      pairs.push({ pairId: item.id, type: 'icon', display: item.icon, name: item.name });
      pairs.push({ pairId: item.id, type: 'name', display: item.name, name: item.name });
    });
    cards = shuffle(pairs);

    grid.className = `memory-grid memory-grid--${currentDifficulty}`;
    grid.innerHTML = cards.map((card, i) => `
      <div class="memory-card" data-index="${i}" data-pair="${card.pairId}" tabindex="0"
           role="button" aria-label="Memory-Karte ${i + 1}">
        <div class="memory-card-inner">
          <div class="memory-card-face memory-card-front">?</div>
          <div class="memory-card-face memory-card-back">
            ${card.type === 'icon'
              ? `<span class="memory-icon">${card.display}</span><span class="memory-name">${card.name}</span>`
              : `<span class="memory-name">${card.display}</span>`
            }
          </div>
        </div>
      </div>
    `).join('');

    updateStats();

    // Events
    grid.querySelectorAll('.memory-card').forEach(card => {
      card.addEventListener('click', () => flipCard(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          flipCard(card);
        }
      });
    });
  }

  function flipCard(card) {
    if (lockBoard) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      moves++;
      updateStats();
      lockBoard = true;

      const [a, b] = flippedCards;
      if (a.dataset.pair === b.dataset.pair) {
        a.classList.add('matched');
        b.classList.add('matched');
        matchedPairs++;
        updateStats();
        flippedCards = [];
        lockBoard = false;

        if (matchedPairs === totalPairs) {
          setTimeout(() => {
            winEl.classList.add('visible');
            winEl.querySelector('.memory-win-moves').textContent = moves;
          }, 500);
        }
      } else {
        setTimeout(() => {
          a.classList.remove('flipped');
          b.classList.remove('flipped');
          flippedCards = [];
          lockBoard = false;
        }, 1000);
      }
    }
  }

  function updateStats() {
    movesEl.textContent = moves;
    pairsEl.textContent = `${matchedPairs} / ${totalPairs}`;
  }

  startMemory();
}
