const appState = {
  mode: 'quick',
  score: 0,
  streak: 0,
  bestStreak: 0,
  lives: 3,
  speedLevel: 0,
  runGames: 0,
  maxGames: 12,
  wordsLearnedThisRun: new Set(),
  wrongWords: new Set(),
  mastery: new Map(),
  activeCleanup: null,
};

const vocabulary = [
  { id: 'bo', irish: 'Bó', english: 'Cow', pronunciation: 'boh', category: 'animals', difficulty: 1, gameType: 'lane_dodge', sprite: '🐄', audio: 'audio/bo.mp3' },
  { id: 'madra', irish: 'Madra', english: 'Dog', pronunciation: 'mah-druh', category: 'animals', difficulty: 1, gameType: 'drag_match', sprite: '🐕', audio: 'audio/madra.mp3' },
  { id: 'ean', irish: 'Éan', english: 'Bird', pronunciation: 'ayn', category: 'animals', difficulty: 1, gameType: 'swipe', sprite: '🐦', audio: 'audio/ean.mp3' },
  { id: 'ull', irish: 'Úll', english: 'Apple', pronunciation: 'ool', category: 'food', difficulty: 1, gameType: 'catch', sprite: '🍎', audio: 'audio/ull.mp3' },
  { id: 'uisce', irish: 'Uisce', english: 'Water', pronunciation: 'ish-ka', category: 'food', difficulty: 2, gameType: 'hold', sprite: '💧', audio: 'audio/uisce.mp3' },
  { id: 'baisteach', irish: 'Báisteach', english: 'Rain', pronunciation: 'bawsh-takh', category: 'weather', difficulty: 2, gameType: 'lane_dodge', sprite: '🌧️', audio: 'audio/baisteach.mp3' },
  { id: 'rith', irish: 'Rith', english: 'Run', pronunciation: 'rih', category: 'movement_verbs', difficulty: 1, gameType: 'tap_select', sprite: '🏃', audio: 'audio/rith.mp3' },
  { id: 'leim', irish: 'Léim', english: 'Jump', pronunciation: 'laym', category: 'movement_verbs', difficulty: 1, gameType: 'swipe', sprite: '🦘', audio: 'audio/leim.mp3' },
  { id: 'snamh', irish: 'Snámh', english: 'Swim', pronunciation: 'snaav', category: 'movement_verbs', difficulty: 2, gameType: 'lane_dodge', sprite: '🏊', audio: 'audio/snamh.mp3' },
  { id: 'eitil', irish: 'Eitil', english: 'Fly', pronunciation: 'etch-il', category: 'movement_verbs', difficulty: 2, gameType: 'swipe', sprite: '✈️', audio: 'audio/eitil.mp3' },
  { id: 'oscail', irish: 'Oscail', english: 'Open', pronunciation: 'usk-il', category: 'household_verbs', difficulty: 2, gameType: 'swipe', sprite: '🚪', audio: 'audio/oscail.mp3' },
  { id: 'dun', irish: 'Dún', english: 'Close', pronunciation: 'doon', category: 'household_verbs', difficulty: 2, gameType: 'tap_select', sprite: '🔒', audio: 'audio/dun.mp3' },
  { id: 'glan', irish: 'Glan', english: 'Clean', pronunciation: 'glahn', category: 'household_verbs', difficulty: 2, gameType: 'drag_match', sprite: '🧽', audio: 'audio/glan.mp3' },
  { id: 'bus', irish: 'Bus', english: 'Bus', pronunciation: 'boos', category: 'transport', difficulty: 1, gameType: 'lane_dodge', sprite: '🚌', audio: 'audio/bus.mp3' },
  { id: 'cota', irish: 'Cóta', english: 'Coat', pronunciation: 'koh-ta', category: 'clothes', difficulty: 1, gameType: 'drag_match', sprite: '🧥', audio: 'audio/cota.mp3' },
  { id: 'ol', irish: 'Ól', english: 'Drink', pronunciation: 'ohl', category: 'daily_actions', difficulty: 1, gameType: 'hold', sprite: '🥤', audio: 'audio/ol.mp3' },
];

const modeConfig = {
  quick: { label: 'Quick Play', maxGames: 12, lives: 3 },
  endless: { label: 'Endless Arcade', maxGames: Number.MAX_SAFE_INTEGER, lives: 1 },
  daily: { label: 'Daily Challenge', maxGames: 10, lives: 3, bonus: 300 },
  category: { label: 'Category Run', maxGames: 10, lives: 3, filter: ['animals', 'food', 'home_objects', 'weather', 'transport'] },
  verb: { label: 'Verb Rush', maxGames: 10, lives: 3, filter: ['common_verbs', 'movement_verbs', 'household_verbs', 'daily_actions'] },
  mixed: { label: 'Mixed Madness', maxGames: 14, lives: 3 },
  practice: { label: 'Practice Mode', maxGames: 8, lives: 99, practiceOnly: true },
  boss: { label: 'Boss Mode', maxGames: 6, lives: 2, boss: true },
};

const leaderboards = {
  daily: [{ name: 'Aoife', score: 5920 }, { name: 'Niamh', score: 5480 }, { name: 'Tadhg', score: 5160 }, { name: 'You', score: 0 }],
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

function showScreen(name) {
  Object.values(ui.screens).forEach((s) => s.classList.remove('active'));
  ui.screens[name].classList.add('active');
}

function setMode(mode) {
  appState.mode = mode;
  appState.maxGames = modeConfig[mode].maxGames;
  appState.lives = modeConfig[mode].lives;
}

function resetRun() {
  appState.score = 0;
  appState.streak = 0;
  appState.bestStreak = 0;
  appState.speedLevel = 0;
  appState.runGames = 0;
  appState.wordsLearnedThisRun.clear();
  updateHud();
}

function cleanupActiveMicrogame() {
  if (appState.activeCleanup) {
    appState.activeCleanup();
    appState.activeCleanup = null;
  }
}

function updateHud() {
  const cfg = modeConfig[appState.mode];
  ui.hudMode.textContent = cfg.label;
  ui.hudScore.textContent = `Score ${Math.floor(appState.score)}`;
  ui.hudStreak.textContent = `Streak ${appState.streak}`;
  ui.hudLives.textContent = `Lives ${appState.lives}`;
}

function timerWindowMs() {
  const base = modeConfig[appState.mode].boss ? 2800 : 4200;
  return Math.max(1800, base - appState.speedLevel * 240);
}

function pickWord() {
  const cfg = modeConfig[appState.mode];
  let pool = vocabulary;
  if (cfg.practiceOnly) {
    const practice = vocabulary.filter((w) => appState.wrongWords.has(w.id));
    pool = practice.length ? practice : vocabulary.slice(0, 6);
  } else if (cfg.filter) {
    pool = vocabulary.filter((w) => cfg.filter.includes(w.category));
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function startTimer(container, ms, onTimeout) {
  const bar = document.createElement('div');
  bar.className = 'timer-bar';
  const fill = document.createElement('div');
  fill.className = 'fill';
  bar.appendChild(fill);
  container.appendChild(bar);
  fill.style.transition = `transform ${ms}ms linear`;
  requestAnimationFrame(() => {
    fill.style.transformOrigin = 'left center';
    fill.style.transform = 'scaleX(0)';
  });
  const timeoutId = setTimeout(onTimeout, ms);
  return () => clearTimeout(timeoutId);
}

function header(word, prompt) {
  const wrap = document.createElement('div');
  wrap.className = 'microgame';
  wrap.innerHTML = `<h3>${word.irish} (${word.english}) ${word.sprite}</h3><p class="prompt">${prompt}</p>`;
  return wrap;
}

function resolveMicrogame(success, word, bonus = 0, timeout = false) {
  cleanupActiveMicrogame();
  if (success) {
    const base = 120;
    const speedBonus = 30 + appState.speedLevel * 12;
    const streakMult = 1 + Math.min(appState.streak, 12) * 0.1;
    const points = (base + speedBonus + bonus) * streakMult;
    appState.score += points;
    appState.streak += 1;
    appState.bestStreak = Math.max(appState.bestStreak, appState.streak);
    appState.mastery.set(word.id, (appState.mastery.get(word.id) || 0) + 1);
    ui.feedback.textContent = `Great! +${Math.floor(points)} • ${word.irish}`;
    ui.feedback.className = 'feedback good';
  } else {
    appState.streak = 0;
    appState.lives -= 1;
    appState.wrongWords.add(word.id);
    appState.mastery.set(word.id, Math.max(0, (appState.mastery.get(word.id) || 0) - 1));
    ui.feedback.textContent = timeout ? `Too slow! ${word.irish} means ${word.english}.` : `Miss! ${word.irish} = ${word.english}.`;
    ui.feedback.className = 'feedback bad';
  }

  if (appState.mode === 'daily' && appState.runGames === appState.maxGames) {
    appState.score += modeConfig.daily.bonus;
  }
  updateHud();
  setTimeout(nextMicrogame, 650);
}

function nextMicrogame() {
  cleanupActiveMicrogame();
  if (appState.lives <= 0 || appState.runGames >= appState.maxGames) return endRun();

  appState.runGames += 1;
  appState.speedLevel = Math.floor(appState.runGames / 3);
  const word = pickWord();
  appState.wordsLearnedThisRun.add(word.id);
  console.info(`Pronunciation ▶ ${word.audio} (${word.pronunciation})`);

  const renderers = {
    tap_select: renderTapSelect,
    drag_match: renderDragMatch,
    swipe: renderSwipe,
    hold: renderHold,
    lane_dodge: renderLaneDodge,
    catch: renderCatch,
  };
  (renderers[word.gameType] || renderTapSelect)(word);
}

function renderTapSelect(word) {
  const wrap = header(word, 'Hit the matching sprite before the timer ends!');
  const choicesEl = document.createElement('div');
  choicesEl.className = 'choices';
  const decoys = ['🪨', '🧱', '🌪️', '🦆', '🥔'].sort(() => Math.random() - 0.5).slice(0, 3);
  const choices = [word.sprite, ...decoys].sort(() => Math.random() - 0.5);
  choices.forEach((icon) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = icon;
    btn.onclick = () => resolveMicrogame(icon === word.sprite, word);
    choicesEl.appendChild(btn);
  });
  wrap.appendChild(choicesEl);
  const cancel = startTimer(wrap, timerWindowMs(), () => resolveMicrogame(false, word, 0, true));
  appState.activeCleanup = cancel;
  ui.host.replaceChildren(wrap);
}

function renderDragMatch(word) {
  const wrap = header(word, 'Drag the correct sprite onto the target zone.');
  const target = document.createElement('div');
  target.className = 'swipe-pad';
  target.textContent = 'Drop Zone 🎯';
  const row = document.createElement('div');
  row.className = 'drag-row';
  const options = [word.sprite, '🪵', '🪨', '🧊'].sort(() => Math.random() - 0.5);
  options.forEach((icon) => {
    const el = document.createElement('button');
    el.className = 'drag-item';
    el.textContent = icon;
    el.draggable = true;
    el.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', icon));
    el.onclick = () => resolveMicrogame(icon === word.sprite, word);
    row.appendChild(el);
  });
  target.addEventListener('dragover', (e) => e.preventDefault());
  target.addEventListener('drop', (e) => {
    const icon = e.dataTransfer.getData('text/plain');
    resolveMicrogame(icon === word.sprite, word, 25);
  });
  wrap.append(target, row);
  const cancel = startTimer(wrap, timerWindowMs(), () => resolveMicrogame(false, word, 0, true));
  appState.activeCleanup = cancel;
  ui.host.replaceChildren(wrap);
}

function renderSwipe(word) {
  const directions = ['up', 'down', 'left', 'right'];
  const expected = directions[Math.floor(Math.random() * directions.length)];
  const arrows = { up: '⬆️', down: '⬇️', left: '⬅️', right: '➡️' };
  const wrap = header(word, `Swipe ${expected.toUpperCase()} ${arrows[expected]}`);
  const pad = document.createElement('div');
  pad.className = 'swipe-pad';
  pad.textContent = 'Swipe here';
  let startX = 0;
  let startY = 0;
  const onStart = (e) => {
    const t = e.touches ? e.touches[0] : e;
    startX = t.clientX;
    startY = t.clientY;
  };
  const onEnd = (e) => {
    const t = e.changedTouches ? e.changedTouches[0] : e;
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
    const actual = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
    resolveMicrogame(actual === expected, word, 20);
  };
  pad.addEventListener('touchstart', onStart, { passive: true });
  pad.addEventListener('touchend', onEnd, { passive: true });
  pad.addEventListener('mousedown', onStart);
  pad.addEventListener('mouseup', onEnd);

  wrap.appendChild(pad);
  const cancel = startTimer(wrap, timerWindowMs(), () => resolveMicrogame(false, word, 0, true));
  appState.activeCleanup = cancel;
  ui.host.replaceChildren(wrap);
}

function renderHold(word) {
  const wrap = header(word, 'Hold to fill. Release inside the target zone (45-70%).');
  const meter = document.createElement('div');
  meter.className = 'hold-meter';
  const fill = document.createElement('div');
  fill.className = 'hold-fill';
  meter.appendChild(fill);
  const zone = document.createElement('p');
  zone.className = 'hold-zone';
  zone.textContent = 'Target Zone: 45% - 70%';
  let value = 0;
  let intervalId = null;
  const begin = () => {
    if (intervalId) return;
    intervalId = setInterval(() => {
      value = Math.min(100, value + 2.8);
      fill.style.width = `${value}%`;
      if (value >= 100) resolveMicrogame(false, word);
    }, 45);
  };
  const stop = () => {
    clearInterval(intervalId);
    intervalId = null;
    resolveMicrogame(value >= 45 && value <= 70, word, Math.max(0, 35 - Math.abs(57 - value)));
  };
  meter.addEventListener('mousedown', begin);
  meter.addEventListener('touchstart', begin, { passive: true });
  meter.addEventListener('mouseup', stop);
  meter.addEventListener('mouseleave', () => intervalId && stop());
  meter.addEventListener('touchend', stop, { passive: true });
  wrap.append(meter, zone);
  const cancel = startTimer(wrap, timerWindowMs(), () => resolveMicrogame(false, word, 0, true));
  appState.activeCleanup = () => {
    clearInterval(intervalId);
    cancel();
  };
  ui.host.replaceChildren(wrap);
}

function renderLaneDodge(word) {
  const wrap = header(word, 'Swipe left/right to dodge hazards and survive!');
  const lanesEl = document.createElement('div');
  lanesEl.className = 'lane-wrap';
  let lane = 1;
  const lanes = [0, 1, 2].map(() => {
    const el = document.createElement('div');
    el.className = 'lane';
    lanesEl.appendChild(el);
    return el;
  });
  const player = document.createElement('div');
  player.className = 'player';
  player.textContent = word.sprite;
  lanes[lane].appendChild(player);

  const setLane = (next) => {
    lane = Math.max(0, Math.min(2, next));
    lanes[lane].appendChild(player);
  };
  let sx = 0;
  lanesEl.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  lanesEl.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    if (dx > 25) setLane(lane + 1);
    if (dx < -25) setLane(lane - 1);
  }, { passive: true });

  const buttons = document.createElement('div');
  buttons.className = 'choices';
  ['⬅️', '➡️'].forEach((arrow, i) => {
    const b = document.createElement('button');
    b.className = 'lane-btn';
    b.textContent = arrow;
    b.onclick = () => setLane(lane + (i === 0 ? -1 : 1));
    buttons.appendChild(b);
  });

  let ticks = 0;
  const obstacleTicker = setInterval(() => {
    ticks += 1;
    const badLane = Math.floor(Math.random() * 3);
    const o = document.createElement('div');
    o.className = 'obstacle';
    o.textContent = '💥';
    lanes[badLane].appendChild(o);
    o.animate([{ top: '-8px' }, { top: '80px' }], { duration: 380, easing: 'linear' });
    setTimeout(() => o.remove(), 380);
    if (badLane === lane && ticks > 1) {
      clearInterval(obstacleTicker);
      resolveMicrogame(false, word);
    }
    if (ticks >= 8) {
      clearInterval(obstacleTicker);
      resolveMicrogame(true, word, 55);
    }
  }, 350);

  wrap.append(lanesEl, buttons);
  const cancel = startTimer(wrap, timerWindowMs(), () => resolveMicrogame(false, word, 0, true));
  appState.activeCleanup = () => {
    clearInterval(obstacleTicker);
    cancel();
  };
  ui.host.replaceChildren(wrap);
}

function renderCatch(word) {
  const wrap = header(word, 'Drag the basket and catch only the correct item.');
  const zone = document.createElement('div');
  zone.className = 'catch-zone';
  const basket = document.createElement('div');
  basket.className = 'basket';
  basket.textContent = '🧺';
  zone.appendChild(basket);
  let basketX = 45;
  let score = 0;

  function moveBasket(clientX) {
    const rect = zone.getBoundingClientRect();
    basketX = ((clientX - rect.left) / rect.width) * 100;
    basketX = Math.max(5, Math.min(90, basketX));
    basket.style.left = `${basketX}%`;
  }

  zone.addEventListener('pointermove', (e) => {
    if (e.buttons || e.pointerType === 'touch') moveBasket(e.clientX);
  });
  zone.addEventListener('pointerdown', (e) => moveBasket(e.clientX));

  const dropper = setInterval(() => {
    const item = document.createElement('div');
    item.className = 'faller';
    const good = Math.random() > 0.35;
    item.textContent = good ? word.sprite : '💣';
    const x = 8 + Math.random() * 84;
    item.style.left = `${x}%`;
    zone.appendChild(item);
    const start = Date.now();
    const fly = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / 700);
      item.style.top = `${8 + p * 90}px`;
      if (p >= 1) {
        clearInterval(fly);
        const hit = Math.abs(x - basketX) < 12;
        if (hit && good) score += 1;
        if (hit && !good) score = -99;
        item.remove();
      }
    }, 30);
  }, 300);

  wrap.append(zone);
  const cancel = startTimer(wrap, timerWindowMs(), () => resolveMicrogame(false, word, 0, true));
  appState.activeCleanup = () => {
    clearInterval(dropper);
    cancel();
  };
  ui.host.replaceChildren(wrap);

  setTimeout(() => {
    if (score >= 2) resolveMicrogame(true, word, 60);
    else if (score < 0) resolveMicrogame(false, word);
  }, timerWindowMs() - 120);
}

function endRun() {
  cleanupActiveMicrogame();
  const learned = appState.wordsLearnedThisRun.size;
  const missed = appState.wrongWords.size;
  const rank = estimateRank(appState.score);
  document.getElementById('result-score').textContent = `Score: ${Math.floor(appState.score)}`;
  document.getElementById('result-streak').textContent = `Best Streak: ${appState.bestStreak}`;
  document.getElementById('result-learned').textContent = `Words encountered: ${learned}`;
  document.getElementById('result-missed').textContent = `Words to practice: ${missed}`;
  document.getElementById('result-rank').textContent = `Estimated daily rank: #${rank}`;
  renderLeaderboardPreview();
  document.getElementById('profile-stats').textContent = `Level ${1 + Math.floor(appState.score / 1400)} • Daily Streak ${Math.min(7, Math.floor(appState.runGames / 3))} • Mastered ${Array.from(appState.mastery.values()).filter((v) => v >= 3).length} words`;
  showScreen('results');
}

function estimateRank(score) {
  if (score > 7000) return 1;
  if (score > 6100) return 2;
  if (score > 5400) return 3;
  if (score > 4200) return 8;
  return 35;
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
  ['quick', 'endless', 'daily', 'category', 'verb', 'mixed', 'practice', 'boss'].forEach((mode) => {
    document.getElementById(`btn-${mode}`).onclick = () => {
      setMode(mode);
      showScreen('onboard');
    };
  });
  document.getElementById('btn-start-run').onclick = () => {
    resetRun();
    showScreen('run');
    nextMicrogame();
  };
  document.getElementById('btn-replay').onclick = () => showScreen('onboard');
  document.getElementById('btn-home').onclick = () => showScreen('home');
}

bindControls();
