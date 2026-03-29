const categories = [
  'animals',
  'food',
  'household_objects',
  'clothes',
  'transport',
  'weather',
  'body_parts',
  'common_objects',
];

const words = [
  { id: 'bo', irish: 'bó', english: 'cow', image: '🐄', category: 'animals', audio: 'bo.mp3' },
  { id: 'madra', irish: 'madra', english: 'dog', image: '🐕', category: 'animals', audio: 'madra.mp3' },
  { id: 'cat', irish: 'cat', english: 'cat', image: '🐈', category: 'animals', audio: 'cat.mp3' },
  { id: 'muic', irish: 'muc', english: 'pig', image: '🐖', category: 'animals', audio: 'muc.mp3' },
  { id: 'ull', irish: 'úll', english: 'apple', image: '🍎', category: 'food', audio: 'ull.mp3' },
  { id: 'aran', irish: 'arán', english: 'bread', image: '🍞', category: 'food', audio: 'aran.mp3' },
  { id: 'iasc', irish: 'iasc', english: 'fish', image: '🐟', category: 'food', audio: 'iasc.mp3' },
  { id: 'cairid', irish: 'cairéad', english: 'carrot', image: '🥕', category: 'food', audio: 'cairead.mp3' },
  { id: 'bord', irish: 'bord', english: 'table', image: '🪵', category: 'household_objects', audio: 'bord.mp3' },
  { id: 'cathaoir', irish: 'cathaoir', english: 'chair', image: '🪑', category: 'household_objects', audio: 'cathaoir.mp3' },
  { id: 'leaba', irish: 'leaba', english: 'bed', image: '🛏️', category: 'household_objects', audio: 'leaba.mp3' },
  { id: 'lampa', irish: 'lampa', english: 'lamp', image: '💡', category: 'household_objects', audio: 'lampa.mp3' },
  { id: 'cota', irish: 'cóta', english: 'coat', image: '🧥', category: 'clothes', audio: 'cota.mp3' },
  { id: 'briste', irish: 'bríste', english: 'trousers', image: '👖', category: 'clothes', audio: 'briste.mp3' },
  { id: 'hata', irish: 'hata', english: 'hat', image: '🧢', category: 'clothes', audio: 'hata.mp3' },
  { id: 'brog', irish: 'bróg', english: 'shoe', image: '👟', category: 'clothes', audio: 'brog.mp3' },
  { id: 'bus', irish: 'bus', english: 'bus', image: '🚌', category: 'transport', audio: 'bus.mp3' },
  { id: 'traein', irish: 'traein', english: 'train', image: '🚆', category: 'transport', audio: 'traein.mp3' },
  { id: 'rothar', irish: 'rothar', english: 'bike', image: '🚲', category: 'transport', audio: 'rothar.mp3' },
  { id: 'eitlean', irish: 'eitleán', english: 'plane', image: '✈️', category: 'transport', audio: 'eitlean.mp3' },
  { id: 'grian', irish: 'grian', english: 'sun', image: '☀️', category: 'weather', audio: 'grian.mp3' },
  { id: 'fearthainn', irish: 'fearthainn', english: 'rain', image: '🌧️', category: 'weather', audio: 'fearthainn.mp3' },
  { id: 'sneachta', irish: 'sneachta', english: 'snow', image: '❄️', category: 'weather', audio: 'sneachta.mp3' },
  { id: 'gaoth', irish: 'gaoth', english: 'wind', image: '💨', category: 'weather', audio: 'gaoth.mp3' },
  { id: 'lamh', irish: 'lámh', english: 'hand', image: '✋', category: 'body_parts', audio: 'lamh.mp3' },
  { id: 'cos', irish: 'cos', english: 'leg', image: '🦵', category: 'body_parts', audio: 'cos.mp3' },
  { id: 'suil', irish: 'súil', english: 'eye', image: '👁️', category: 'body_parts', audio: 'suil.mp3' },
  { id: 'cluas', irish: 'cluas', english: 'ear', image: '👂', category: 'body_parts', audio: 'cluas.mp3' },
  { id: 'leabhar', irish: 'leabhar', english: 'book', image: '📘', category: 'common_objects', audio: 'leabhar.mp3' },
  { id: 'eochair', irish: 'eochair', english: 'key', image: '🔑', category: 'common_objects', audio: 'eochair.mp3' },
  { id: 'fón', irish: 'fón', english: 'phone', image: '📱', category: 'common_objects', audio: 'fon.mp3' },
  { id: 'cupan', irish: 'cupán', english: 'cup', image: '☕', category: 'common_objects', audio: 'cupan.mp3' },
];

const ui = {
  screens: {
    home: document.getElementById('screen-home'),
    mode: document.getElementById('screen-mode'),
    game: document.getElementById('screen-game'),
    results: document.getElementById('screen-results'),
  },
  categorySelect: document.getElementById('category-select'),
  modeTitle: document.getElementById('mode-title'),
  modeCopy: document.getElementById('mode-copy'),
  btnStart: document.getElementById('btn-start'),
  btnBack: document.getElementById('btn-back'),
  hudMode: document.getElementById('hud-mode'),
  hudScore: document.getElementById('hud-score'),
  hudStreak: document.getElementById('hud-streak'),
  hudLives: document.getElementById('hud-lives'),
  hudTimer: document.getElementById('hud-timer'),
  irishWord: document.getElementById('irish-word'),
  englishHint: document.getElementById('english-hint'),
  gallery: document.getElementById('gallery'),
  feedback: document.getElementById('feedback'),
  crosshair: document.getElementById('crosshair'),
  resultScore: document.getElementById('result-score'),
  resultAccuracy: document.getElementById('result-accuracy'),
  resultStreak: document.getElementById('result-streak'),
  resultReviewed: document.getElementById('result-reviewed'),
  resultMastery: document.getElementById('result-mastery'),
  leaderboardList: document.getElementById('leaderboard-list'),
  btnReplay: document.getElementById('btn-replay'),
  btnHome: document.getElementById('btn-home'),
  btnAudio: document.getElementById('btn-audio'),
};

const leaderboards = {
  daily: [
    { player: 'Aoife', score: 8700 },
    { player: 'Tadhg', score: 8220 },
    { player: 'Niamh', score: 7900 },
  ],
  weekly: [
    { player: 'Bríd', score: 41400 },
    { player: 'Eoin', score: 39850 },
    { player: 'Cian', score: 37600 },
  ],
  alltime: [
    { player: 'SeánMór', score: 150220 },
    { player: 'PixelPuca', score: 148010 },
    { player: 'You', score: 0 },
  ],
  category: [
    { player: 'AnimalAce', score: 9300 },
    { player: 'FoodFlash', score: 9020 },
    { player: 'You', score: 0 },
  ],
};

const modeConfig = {
  classic: { label: 'Classic', lives: 3, timed: false, rounds: 24 },
  timed: { label: 'Timed 60s', lives: 99, timed: true, seconds: 60 },
  daily: { label: 'Daily Challenge', lives: 3, timed: false, rounds: 20, fixedSeed: 'daily' },
  practice: { label: 'Practice', lives: 5, timed: false, rounds: 20 },
};

const state = {
  mode: 'classic',
  practiceCategory: categories[0],
  score: 0,
  streak: 0,
  bestStreak: 0,
  lives: 3,
  timeLeft: 60,
  round: 0,
  hits: 0,
  shots: 0,
  reviewed: new Set(),
  mastery: new Map(),
  currentWord: null,
  running: false,
  moveRaf: null,
  gameClock: null,
  spawnTimeout: null,
  speed: 1,
  targetCount: 4,
  responseMs: 3200,
};

function showScreen(name) {
  Object.values(ui.screens).forEach((screen) => screen.classList.remove('active'));
  ui.screens[name].classList.add('active');
}

function setupCategorySelect() {
  ui.categorySelect.innerHTML = '';
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.replace('_', ' ');
    ui.categorySelect.appendChild(option);
  });
}

function updateHud() {
  ui.hudMode.textContent = modeConfig[state.mode].label;
  ui.hudScore.textContent = `Score ${Math.floor(state.score)}`;
  ui.hudStreak.textContent = `Streak x${state.streak}`;
  ui.hudLives.textContent = `Lives ${state.lives > 90 ? '∞' : state.lives}`;
  ui.hudTimer.textContent = `Time ${Math.max(0, Math.ceil(state.timeLeft))}`;
}

function setFeedback(text, type = '') {
  ui.feedback.textContent = text;
  ui.feedback.className = `feedback ${type}`.trim();
}

function pickPool() {
  if (state.mode === 'practice') {
    return words.filter((w) => w.category === state.practiceCategory);
  }
  return words;
}

function seededOrder(pool) {
  if (state.mode !== 'daily') return pool.sort(() => Math.random() - 0.5);
  const dayKey = new Date().toISOString().slice(0, 10);
  let seed = dayKey.split('-').join('').split('').reduce((acc, n) => acc + Number(n), 0);
  const items = [...pool];
  for (let i = items.length - 1; i > 0; i -= 1) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function resetRun() {
  const cfg = modeConfig[state.mode];
  state.score = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.lives = cfg.lives;
  state.timeLeft = cfg.seconds || 99;
  state.round = 0;
  state.hits = 0;
  state.shots = 0;
  state.reviewed.clear();
  state.running = true;
  state.speed = 1;
  state.targetCount = 4;
  state.responseMs = 3200;
  ui.gallery.replaceChildren();
  setFeedback('Shoot the matching target!', '');
  updateHud();
}

function animateCrosshair(x, y) {
  ui.crosshair.style.left = `${x}px`;
  ui.crosshair.style.top = `${y}px`;
  ui.crosshair.classList.add('active');
  setTimeout(() => ui.crosshair.classList.remove('active'), 160);
}

function chooseRoundWord() {
  if (!state.deck || !state.deck.length) {
    state.deck = seededOrder(pickPool());
  }
  const word = state.deck[state.round % state.deck.length];
  state.currentWord = word;
  state.reviewed.add(word.id);
}

function getDistractors(correct, count) {
  const pool = pickPool().filter((w) => w.id !== correct.id);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count - 1);
}

function buildTargets() {
  const galleryRect = ui.gallery.getBoundingClientRect();
  const correct = state.currentWord;
  const options = [correct, ...getDistractors(correct, state.targetCount)].sort(() => Math.random() - 0.5);

  options.forEach((word, index) => {
    const target = document.createElement('button');
    target.className = 'target';
    target.dataset.wordId = word.id;
    target.innerHTML = `<span class="target-inner">${word.image}<span class="label">${word.english}</span></span>`;

    const startX = Math.random() * (galleryRect.width - 86);
    const startY = 14 + Math.random() * (galleryRect.height - 96);
    const vx = (Math.random() * 0.9 + 0.45) * (index % 2 === 0 ? 1 : -1) * state.speed;
    const vy = (Math.random() * 0.55 + 0.2) * (Math.random() > 0.5 ? 1 : -1) * state.speed;
    target.style.left = `${startX}px`;
    target.style.top = `${startY}px`;

    const motion = { x: startX, y: startY, vx, vy };
    target.motion = motion;

    target.addEventListener('click', (event) => {
      if (!state.running) return;
      state.shots += 1;
      const localX = event.clientX - galleryRect.left;
      const localY = event.clientY - galleryRect.top;
      animateCrosshair(localX, localY);
      resolveShot(word.id === state.currentWord.id, word);
    });

    ui.gallery.appendChild(target);
  });
}

function runMotion() {
  const galleryRect = ui.gallery.getBoundingClientRect();
  const maxX = galleryRect.width - 80;
  const maxY = galleryRect.height - 80;

  const frame = () => {
    if (!state.running) return;
    ui.gallery.querySelectorAll('.target').forEach((target) => {
      const m = target.motion;
      m.x += m.vx;
      m.y += m.vy;
      if (m.x < 0 || m.x > maxX) m.vx *= -1;
      if (m.y < 0 || m.y > maxY) m.vy *= -1;
      m.x = Math.max(0, Math.min(maxX, m.x));
      m.y = Math.max(0, Math.min(maxY, m.y));
      target.style.left = `${m.x}px`;
      target.style.top = `${m.y}px`;
    });
    state.moveRaf = requestAnimationFrame(frame);
  };

  cancelAnimationFrame(state.moveRaf);
  state.moveRaf = requestAnimationFrame(frame);
}

function playPronunciation() {
  if (!state.currentWord) return;
  const utter = new SpeechSynthesisUtterance(state.currentWord.irish);
  utter.lang = 'ga-IE';
  utter.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

function scheduleTimeout() {
  clearTimeout(state.spawnTimeout);
  state.spawnTimeout = setTimeout(() => {
    state.shots += 1;
    resolveShot(false, state.currentWord, true);
  }, state.responseMs);
}

function resolveShot(correct, word, timeout = false) {
  if (!state.running) return;
  clearTimeout(state.spawnTimeout);

  if (correct) {
    state.hits += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    const speedBonus = Math.max(10, Math.floor((state.responseMs / 100) * 0.8));
    const streakMult = 1 + Math.min(state.streak, 12) * 0.12;
    const points = (100 + speedBonus) * streakMult;
    state.score += points;
    state.mastery.set(word.id, Math.min(5, (state.mastery.get(word.id) || 0) + 1));
    setFeedback(`Direct hit! ${word.irish} = ${word.english} (+${Math.floor(points)})`, 'good');
  } else {
    state.streak = 0;
    state.lives -= 1;
    state.mastery.set(state.currentWord.id, Math.max(0, (state.mastery.get(state.currentWord.id) || 0) - 1));
    const message = timeout
      ? `Too slow! ${state.currentWord.irish} means ${state.currentWord.english}.`
      : `Miss! You hit ${word.english}. ${state.currentWord.irish} means ${state.currentWord.english}.`;
    setFeedback(message, 'bad');
  }

  updateHud();
  setTimeout(nextRound, 400);
}

function scaleDifficulty() {
  state.speed = 1 + Math.floor(state.round / 6) * 0.2;
  state.targetCount = Math.min(6, 4 + Math.floor(state.round / 5));
  state.responseMs = Math.max(1300, 3200 - state.round * 65);
}

function nextRound() {
  if (!state.running) return;
  const cfg = modeConfig[state.mode];

  if (state.lives <= 0) return endRun();
  if (!cfg.timed && state.round >= cfg.rounds) return endRun();

  state.round += 1;
  scaleDifficulty();
  chooseRoundWord();

  ui.irishWord.textContent = state.currentWord.irish;
  ui.englishHint.textContent = state.currentWord.english;
  ui.gallery.replaceChildren();

  buildTargets();
  runMotion();
  scheduleTimeout();
  updateHud();

  if (state.round <= 3) {
    setFeedback('Tap the matching picture!', '');
  }
}

function runClock() {
  clearInterval(state.gameClock);
  if (!modeConfig[state.mode].timed) return;
  state.gameClock = setInterval(() => {
    if (!state.running) return;
    state.timeLeft -= 1;
    updateHud();
    if (state.timeLeft <= 0) endRun();
  }, 1000);
}

function endRun() {
  state.running = false;
  cancelAnimationFrame(state.moveRaf);
  clearInterval(state.gameClock);
  clearTimeout(state.spawnTimeout);

  if (state.mode === 'daily') {
    state.score += 250;
    leaderboards.daily.push({ player: 'You', score: Math.floor(state.score) });
    leaderboards.daily.sort((a, b) => b.score - a.score);
    leaderboards.daily = leaderboards.daily.slice(0, 5);
  }

  const accuracy = state.shots ? Math.round((state.hits / state.shots) * 100) : 0;
  const mastered = [...state.mastery.values()].filter((value) => value >= 3).length;

  ui.resultScore.textContent = `Score: ${Math.floor(state.score)}`;
  ui.resultAccuracy.textContent = `Accuracy: ${accuracy}% (${state.hits}/${state.shots})`;
  ui.resultStreak.textContent = `Best streak: x${state.bestStreak}`;
  ui.resultReviewed.textContent = `Words reviewed: ${state.reviewed.size}`;
  ui.resultMastery.textContent = `Words mastered this profile: ${mastered}`;

  renderLeaderboard(document.querySelector('.leader-tab.active')?.dataset.board || 'daily');
  showScreen('results');
}

function startRun() {
  resetRun();
  showScreen('game');
  runClock();
  nextRound();
}

function renderLeaderboard(board) {
  ui.leaderboardList.innerHTML = '';
  (leaderboards[board] || []).forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = `${entry.player} — ${entry.score}`;
    ui.leaderboardList.appendChild(li);
  });
}

function openModeScreen(mode) {
  state.mode = mode;
  state.deck = [];
  if (mode === 'practice') {
    ui.modeTitle.textContent = 'Practice Mode';
    ui.modeCopy.textContent = 'Choose one category and drill it with arcade speed.';
    ui.categorySelect.parentElement.style.display = 'block';
    showScreen('mode');
    return;
  }

  ui.categorySelect.parentElement.style.display = 'none';
  startRun();
}

function attachEvents() {
  document.querySelectorAll('[data-mode]').forEach((btn) => {
    btn.addEventListener('click', () => openModeScreen(btn.dataset.mode));
  });

  document.querySelectorAll('.leader-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.leader-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderLeaderboard(tab.dataset.board);
    });
  });

  ui.btnStart.addEventListener('click', () => {
    state.practiceCategory = ui.categorySelect.value;
    startRun();
  });
  ui.btnBack.addEventListener('click', () => showScreen('home'));
  ui.btnReplay.addEventListener('click', () => startRun());
  ui.btnHome.addEventListener('click', () => showScreen('home'));
  ui.btnAudio.addEventListener('click', playPronunciation);
}

function init() {
  setupCategorySelect();
  attachEvents();
  renderLeaderboard('daily');
}

init();
