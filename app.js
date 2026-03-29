const appState = {
  mode: 'quick',
  score: 0,
  streak: 0,
  lives: 3,
  speedLevel: 0,
  seenWords: new Set(),
  wrongWords: new Set(),
  runGames: 0,
  maxGames: 12,
  wordsLearnedThisRun: new Set(),
};

const vocabulary = [
  { id: 'bo', irish: 'Bó', english: 'Cow', pronunciation: 'boh', category: 'animals', difficulty: 'beginner', gameType: 'drag', audio: 'audio/bo.mp3', emoji: '🐄', action: 'Drag the cow into the field', target: '🌾' },
  { id: 'madra', irish: 'Madra', english: 'Dog', pronunciation: 'mah-druh', category: 'animals', difficulty: 'beginner', gameType: 'drag', audio: 'audio/madra.mp3', emoji: '🐕', action: 'Throw the bone to the dog', target: '🦴' },
  { id: 'ean', irish: 'Éan', english: 'Bird', pronunciation: 'ayn', category: 'animals', difficulty: 'beginner', gameType: 'tap', audio: 'audio/ean.mp3', emoji: '🐦', action: 'Tap to launch the bird', decoys: ['🦆', '🐓', '🐧'] },
  { id: 'ull', irish: 'Úll', english: 'Apple', pronunciation: 'ool', category: 'food', difficulty: 'beginner', gameType: 'tap', audio: 'audio/ull.mp3', emoji: '🍎', action: 'Catch the apple before it falls', decoys: ['🍐', '🍊', '🥔'] },
  { id: 'rith', irish: 'Rith', english: 'Run', pronunciation: 'rih', category: 'common_verbs', difficulty: 'beginner', gameType: 'tap', audio: 'audio/rith.mp3', emoji: '🏃', action: 'Tap rapidly to make them run', decoys: ['🚶', '🧍', '🧎'] },
  { id: 'leim', irish: 'Léim', english: 'Jump', pronunciation: 'laym', category: 'action_verbs', difficulty: 'beginner', gameType: 'tap', audio: 'audio/leim.mp3', emoji: '🦘', action: 'Swipe up to jump (tap prototype)', decoys: ['🐢', '🐌', '🪨'] },
  { id: 'oscail', irish: 'Oscail', english: 'Open', pronunciation: 'usk-il', category: 'common_verbs', difficulty: 'intermediate', gameType: 'tap', audio: 'audio/oscail.mp3', emoji: '🚪', action: 'Open the correct door', decoys: ['🪟', '🪑', '📦'] },
  { id: 'dun', irish: 'Dún', english: 'Close', pronunciation: 'doon', category: 'common_verbs', difficulty: 'intermediate', gameType: 'tap', audio: 'audio/dun.mp3', emoji: '🔒', action: 'Shut the window before rain', decoys: ['☔', '🌧️', '🫧'] },
  { id: 'ith', irish: 'Ith', english: 'Eat', pronunciation: 'ih', category: 'daily_routine_verbs', difficulty: 'beginner', gameType: 'drag', audio: 'audio/ith.mp3', emoji: '🍽️', action: 'Pick food quickly', target: '😋' },
  { id: 'ol', irish: 'Ól', english: 'Drink', pronunciation: 'ohl', category: 'daily_routine_verbs', difficulty: 'beginner', gameType: 'drag', audio: 'audio/ol.mp3', emoji: '🥤', action: 'Move the drink to character', target: '🙂' },
  { id: 'codail', irish: 'Codail', english: 'Sleep', pronunciation: 'kuh-dal', category: 'daily_routine_verbs', difficulty: 'beginner', gameType: 'tap', audio: 'audio/codail.mp3', emoji: '😴', action: 'Tap to put character to sleep', decoys: ['🤸', '🏀', '🎺'] },
  { id: 'glan', irish: 'Glan', english: 'Clean', pronunciation: 'glahn', category: 'action_verbs', difficulty: 'intermediate', gameType: 'drag', audio: 'audio/glan.mp3', emoji: '🧽', action: 'Quickly wipe away dirt', target: '🟫' },
];

const leaderboards = {
  daily: [{ name: 'Aoife', score: 5420 }, { name: 'Niamh', score: 4970 }, { name: 'You', score: 0 }],
  weekly: [],
  allTime: [],
  categories: {},
};

const ui = {
  screens: {
    home: document.getElementById('screen-home'),
    onboard: document.getElementById('screen-onboard'),
    run: document.getElementById('screen-run'),
    results: document.getElementById('screen-results'),
  },
  host: document.getElementById('microgame-host'),
  feedback: document.getElementById('feedback'),
  hudMode: document.getElementById('hud-mode'),
  hudScore: document.getElementById('hud-score'),
  hudStreak: document.getElementById('hud-streak'),
  hudLives: document.getElementById('hud-lives'),
};

const modeConfig = {
  quick: { label: 'Quick Play', maxGames: 12, lives: 3 },
  daily: { label: 'Daily Challenge', maxGames: 10, lives: 3, bonus: 300 },
  category: { label: 'Category Mode', maxGames: 10, lives: 3, filter: ['animals', 'food', 'household', 'weather'] },
  verb: { label: 'Verb Mode', maxGames: 10, lives: 3, filter: ['common_verbs', 'action_verbs', 'daily_routine_verbs'] },
  endless: { label: 'Endless Mode', maxGames: Number.MAX_SAFE_INTEGER, lives: 1 },
  practice: { label: 'Practice Mode', maxGames: 8, lives: 99, practiceOnly: true },
};

function showScreen(name) {
  Object.values(ui.screens).forEach((s) => s.classList.remove('active'));
  ui.screens[name].classList.add('active');
}

function setMode(mode) {
  appState.mode = mode;
  const cfg = modeConfig[mode];
  appState.maxGames = cfg.maxGames;
  appState.lives = cfg.lives;
}

function resetRun() {
  appState.score = 0;
  appState.streak = 0;
  appState.speedLevel = 0;
  appState.runGames = 0;
  appState.wordsLearnedThisRun.clear();
  updateHud();
}

function updateHud() {
  const cfg = modeConfig[appState.mode];
  ui.hudMode.textContent = cfg.label;
  ui.hudScore.textContent = `Score ${Math.floor(appState.score)}`;
  ui.hudStreak.textContent = `Streak ${appState.streak}`;
  ui.hudLives.textContent = `Lives ${appState.lives}`;
}

function pickWord() {
  const cfg = modeConfig[appState.mode];
  let pool = vocabulary;
  if (cfg.practiceOnly) {
    const practice = vocabulary.filter((w) => appState.wrongWords.has(w.id));
    pool = practice.length ? practice : vocabulary.slice(0, 5);
  } else if (cfg.filter) {
    pool = vocabulary.filter((w) => cfg.filter.includes(w.category));
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function playPronunciationPlaceholder(word) {
  console.info(`Placeholder audio ▶ ${word.audio} (${word.pronunciation})`);
}

function nextMicrogame() {
  if (appState.lives <= 0 || appState.runGames >= appState.maxGames) {
    endRun();
    return;
  }

  appState.runGames += 1;
  appState.speedLevel = Math.floor(appState.runGames / 3);
  const word = pickWord();
  appState.seenWords.add(word.id);
  appState.wordsLearnedThisRun.add(word.id);
  playPronunciationPlaceholder(word);

  if (word.gameType === 'drag') {
    renderDragMicrogame(word);
  } else {
    renderTapMicrogame(word);
  }
}

function timerWindowMs() {
  return Math.max(1800, 4200 - appState.speedLevel * 300);
}

function renderTapMicrogame(word) {
  const tpl = document.getElementById('tpl-tap-select').content.cloneNode(true);
  tpl.querySelector('.word').textContent = `${word.irish} (${word.english}) ${word.emoji}`;
  tpl.querySelector('.prompt').textContent = word.action;
  const choicesEl = tpl.querySelector('.choices');
  const choices = [word.emoji, ...(word.decoys || ['❓', '🌀', '🧱'])]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  let resolved = false;
  const timeMs = timerWindowMs();
  const fill = tpl.querySelector('.fill');
  animateTimer(fill, timeMs);

  choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = choice;
    btn.addEventListener('click', () => {
      if (resolved) return;
      resolved = true;
      const success = choice === word.emoji;
      resolveMicrogame(success, word, timeMs);
    });
    choicesEl.appendChild(btn);
  });

  ui.host.replaceChildren(tpl);
  setTimeout(() => {
    if (!resolved) {
      resolved = true;
      resolveMicrogame(false, word, timeMs, true);
    }
  }, timeMs);
}

function renderDragMicrogame(word) {
  const tpl = document.getElementById('tpl-drag-match').content.cloneNode(true);
  tpl.querySelector('.word').textContent = `${word.irish} (${word.english}) ${word.emoji}`;
  tpl.querySelector('.prompt').textContent = word.action;

  const target = tpl.querySelector('.target');
  const draggables = tpl.querySelector('.draggables');
  target.textContent = `Target ${word.target || '🎯'}`;

  const options = [word.emoji, '🧱', '🪨'].sort(() => Math.random() - 0.5);

  let resolved = false;
  const timeMs = timerWindowMs();
  const fill = tpl.querySelector('.fill');
  animateTimer(fill, timeMs);

  options.forEach((icon) => {
    const btn = document.createElement('button');
    btn.className = 'draggable';
    btn.textContent = icon;
    btn.addEventListener('click', () => {
      if (resolved) return;
      resolved = true;
      const success = icon === word.emoji;
      resolveMicrogame(success, word, timeMs);
    });
    draggables.appendChild(btn);
  });

  ui.host.replaceChildren(tpl);
  setTimeout(() => {
    if (!resolved) {
      resolved = true;
      resolveMicrogame(false, word, timeMs, true);
    }
  }, timeMs);
}

function animateTimer(fillEl, ms) {
  fillEl.style.transition = `transform ${ms}ms linear`;
  requestAnimationFrame(() => {
    fillEl.style.transformOrigin = 'left center';
    fillEl.style.transform = 'scaleX(0)';
  });
}

function resolveMicrogame(success, word, limitMs, timeout = false) {
  if (success) {
    const base = 100;
    const speedBonus = Math.max(0, Math.round((limitMs - 1300) / 40));
    const streakMult = 1 + Math.min(appState.streak, 10) * 0.1;
    const points = (base + speedBonus) * streakMult;
    appState.score += points;
    appState.streak += 1;
    ui.feedback.textContent = `Great! +${Math.floor(points)} (${word.irish})`;
    ui.feedback.className = 'feedback good';
  } else {
    appState.streak = 0;
    appState.lives -= 1;
    appState.wrongWords.add(word.id);
    ui.feedback.textContent = timeout
      ? `Too slow! ${word.irish} means ${word.english}.`
      : `Oops! ${word.irish} = ${word.english}.`;
    ui.feedback.className = 'feedback bad';
  }

  if (appState.mode === 'daily' && appState.runGames === appState.maxGames) {
    appState.score += modeConfig.daily.bonus;
  }

  updateHud();
  setTimeout(nextMicrogame, 650);
}

function endRun() {
  const learned = Array.from(appState.wordsLearnedThisRun).length;
  const rank = estimateRank(appState.score);

  document.getElementById('result-score').textContent = `Score: ${Math.floor(appState.score)}`;
  document.getElementById('result-streak').textContent = `Best Streak: ${Math.max(appState.streak, 0)}`;
  document.getElementById('result-learned').textContent = `Words touched: ${learned}`;
  document.getElementById('result-rank').textContent = `Estimated leaderboard position: #${rank}`;

  renderLeaderboardPreview();
  showScreen('results');
}

function estimateRank(score) {
  if (score > 5500) return 1;
  if (score > 4800) return 2;
  if (score > 4000) return 3;
  if (score > 3000) return 10;
  return 42;
}

function renderLeaderboardPreview() {
  const ul = document.getElementById('leaderboard-preview');
  const list = [...leaderboards.daily];
  list[list.length - 1] = { name: 'You', score: Math.floor(appState.score) };
  list.sort((a, b) => b.score - a.score);
  ul.replaceChildren(...list.map((row, i) => {
    const li = document.createElement('li');
    li.textContent = `#${i + 1} ${row.name} — ${row.score}`;
    return li;
  }));
}

function bindControls() {
  document.getElementById('btn-quick').onclick = () => { setMode('quick'); showScreen('onboard'); };
  document.getElementById('btn-daily').onclick = () => { setMode('daily'); showScreen('onboard'); };
  document.getElementById('btn-category').onclick = () => { setMode('category'); showScreen('onboard'); };
  document.getElementById('btn-verb').onclick = () => { setMode('verb'); showScreen('onboard'); };
  document.getElementById('btn-endless').onclick = () => { setMode('endless'); showScreen('onboard'); };
  document.getElementById('btn-practice').onclick = () => { setMode('practice'); showScreen('onboard'); };

  document.getElementById('btn-start-run').onclick = () => {
    resetRun();
    showScreen('run');
    nextMicrogame();
  };

  document.getElementById('btn-replay').onclick = () => {
    showScreen('onboard');
  };
  document.getElementById('btn-home').onclick = () => showScreen('home');
}

bindControls();
