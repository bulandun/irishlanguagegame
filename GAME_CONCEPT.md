# FocalFocal! — Irish Microgame Mayhem

A mobile-first Irish learning game inspired by WarioWare-style microgames, framed as a **real arcade game first** and a learning system second.

---

## 1) Overall Game Concept

**Fantasy:** You are a rising “Arcade Gaeilge” champion in a chaotic retro handheld tournament.

**Core pitch:** 3–8 second microgames teach Irish through physical action (tap, drag, swipe, timing, sorting), not static multiple-choice quizzes.

**Pillars**
- **Action-first learning:** word meaning is embodied in gameplay.
- **Micro-session friendly:** 30–120 second runs for daily play.
- **Replayable chaos:** random game chains, speed ramps, modifiers, and score chasing.
- **Nostalgic polish:** pixel-art presentation, chunky UI, energetic SFX, and expressive sprites.

---

## 2) Gameplay Loop

1. **Start Run**
   - Choose mode: Quick, Daily, Category, Verb, Endless, Practice.
2. **Cue & Context**
   - Show Irish word + icon/sprite + optional pronunciation audio.
3. **Microgame Action (3–8 sec)**
   - Player performs a fast interaction linked to meaning.
4. **Instant Feedback**
   - Correct = hit-stop + spark animation + score/streak bump.
   - Wrong = humorous fail beat + corrective word pair.
5. **Escalate Difficulty**
   - Less time, more decoys, faster object movement, combo pressure.
6. **Run End**
   - Show score, best streak, words seen, words mastered progress, leaderboard rank estimate.
7. **Retention Hook**
   - Daily mission reward + “Play Again” one-tap CTA.

---

## 3) Screen Structure (Mobile-First)

1. **Home**
   - Primary mode buttons, profile snippet, current streak.
2. **Onboarding / Pre-Run**
   - 2–3 swipe cards max, level selection, first run CTA.
3. **Run Screen**
   - HUD (score, streak, lives, speed), microgame host container, feedback banner.
4. **Results Screen**
   - Total score, streak, words learned, badges earned, rank movement.
5. **Leaderboard Screen**
   - Daily / Weekly / All-time / Category / Friends tabs.
6. **Progress Screen**
   - Mastery map by category, unlocked themes, avatar collection.
7. **Practice Queue Screen**
   - Automatically generated list of recently missed words.

---

## 4) Mini-Game Types

Template-based architecture lets one mechanic map to many words.

### Interaction Templates
- **Tap Select** (quick target recognition)
- **Drag Match** (object-to-target pairing)
- **Swipe Direction** (open/close, up/down verbs)
- **Timing Tap** (hit at marker)
- **Sorting Burst** (multi-item category sort)
- **Word Assembly** (short syllable chunking at higher levels)
- **Reaction Dodge** (avoid wrong object, hit correct object)
- **Sequence Memory** (advanced multi-step command)

### Example Word-to-Game Links
- **Bó**: drag the cow into the field.
- **Madra**: throw the bone to the dog.
- **Éan**: tap to launch the bird into the sky.
- **Úll**: catch the apple before it falls.
- **Rith**: tap rapidly to make the character run.
- **Léim**: swipe up to jump.
- **Oscail**: open the correct door.
- **Dún**: shut the window before rain comes in.
- **Ith**: pick the food quickly.
- **Ól**: move the drink to the character.
- **Codail**: tap to put the character to sleep.
- **Glan**: quickly wipe away the dirt.

---

## 5) Progression System

### Vocabulary Progression
- Categories unlock in waves (starter packs first).
- Difficulty tiers:
  - **Beginner:** high-clarity visuals, low decoy count.
  - **Intermediate:** faster timers, similar distractors.
  - **Advanced:** mixed prompts, dual-action chains, reduced cue time.

### Player Progression
- Run XP increases account level.
- Level rewards:
  - new category packs,
  - pixel theme palettes,
  - avatar characters,
  - challenge modifiers.

### Mastery Model
Each word tracks mastery state:
- New → Learning → Solid → Mastered

Mastery gains depend on repeated success under speed pressure and spaced reappearance.

### Rewards
- Daily login chain rewards.
- Badges (e.g., “Verb Blitz”, “Perfect 10”, “Animal Ace”).
- Event medals and limited cosmetics.

---

## 6) Leaderboard Logic

### Leaderboard Types
- **Daily** (resets every UTC day)
- **Weekly**
- **All-time**
- **Category-specific**
- **Friends-only** (optional social graph)

### Score Validation (basic anti-cheat)
- Server validates run duration and plausible action frequency.
- Reject impossible runs (e.g., >N perfect clears below human threshold).
- Flag suspicious sessions for review.

### Ranking Inputs
- Total run score.
- Tie-breakers: higher streak, faster average clear, fewer mistakes.

---

## 7) Sample Vocabulary Content

Each entry should store:
- Irish
- English
- Pronunciation
- Category
- Difficulty
- Linked game type
- Audio reference

### Starter Set (Examples)

| Irish | English | Pronunciation | Category | Difficulty | Game |
|---|---|---|---|---|---|
| Bó | Cow | boh | Animals | Beginner | Drag Match |
| Madra | Dog | mah-druh | Animals | Beginner | Drag Match |
| Éan | Bird | ayn | Animals | Beginner | Tap Select |
| Úll | Apple | ool | Food | Beginner | Reaction Catch |
| Rith | Run | rih | Common Verbs | Beginner | Rhythm Tap |
| Léim | Jump | laym | Action Verbs | Beginner | Swipe Up |
| Oscail | Open | usk-il | Common Verbs | Intermediate | Swipe Direction |
| Dún | Close | doon | Common Verbs | Intermediate | Swipe Direction |
| Ith | Eat | ih | Daily Routine Verbs | Beginner | Drag Feed |
| Ól | Drink | ohl | Daily Routine Verbs | Beginner | Drag Pour |
| Codail | Sleep | kuh-dal | Daily Routine Verbs | Beginner | Tap Timing |
| Glan | Clean | glahn | Action Verbs | Intermediate | Wipe Swipe |

---

## 8) Technical Architecture (Prototype-Oriented)

### Frontend (current prototype)
- **index.html**: screen shells + microgame templates.
- **styles.css**: retro chunky pixel-inspired UI, high-contrast mobile layout.
- **app.js**: run loop, mode logic, word selection, scoring, feedback, and leaderboard preview.

### Scalable Module Plan
- `GameLoopManager`: run pacing, life system, transition timing.
- `MicrogameEngine`: template registry and per-game lifecycle.
- `InputLayer`: touch abstraction (tap/drag/swipe).
- `VocabularyStore`: category filters, difficulty, mastery queue.
- `ScoreEngine`: points, speed bonus, streak multipliers.
- `ProgressionService`: unlocks, badges, daily streak.
- `LeaderboardService`: score submit/fetch and rank resolution.
- `AudioService`: pronunciation + SFX playback queue.

### Backend (basic)
- REST or lightweight realtime API.
- Auth (guest + optional account link).
- Data services for users, run results, mastery, challenges, leaderboards.

---

## 9) Suggested Data Schema

```sql
-- users and profile
User(
  id PK,
  display_name,
  created_at,
  favorite_category,
  avatar_id,
  highest_streak,
  current_daily_streak
)

-- vocabulary catalog
Word(
  id PK,
  irish,
  english,
  pronunciation,
  category,
  word_class,         -- noun / verb
  difficulty,
  game_type,
  audio_url,
  sprite_key,
  is_active
)

-- per-user mastery
PlayerWordStat(
  user_id FK -> User.id,
  word_id FK -> Word.id,
  attempts,
  successes,
  avg_response_ms,
  mastery_state,
  last_seen_at,
  PRIMARY KEY(user_id, word_id)
)

-- run summary
RunResult(
  id PK,
  user_id FK -> User.id,
  mode,
  started_at,
  ended_at,
  score,
  max_streak,
  words_seen_count,
  words_correct_count,
  duration_ms,
  validated
)

-- run event log (optional for tuning)
RunEvent(
  id PK,
  run_id FK -> RunResult.id,
  word_id FK -> Word.id,
  game_type,
  success,
  response_ms,
  points_awarded,
  created_at
)

-- rotating challenges
DailyChallenge(
  id PK,
  challenge_type,
  params_json,
  reward_json,
  starts_at,
  ends_at,
  active
)

-- leaderboard snapshots/caches
LeaderboardEntry(
  id PK,
  board_type,         -- daily/weekly/all_time/category/friends
  board_scope,        -- category id or friends group id
  user_id FK -> User.id,
  score,
  rank,
  period_start,
  period_end
)
```

---

## 10) Retro Pixel-Art UI Direction

### Visual Tone
- Bright saturated palettes (purple, cyan, yellow, lime).
- Chunky bordered panels and shadowed pixel buttons.
- Bold all-caps headings with slight jitter animations.

### Motion & Feedback
- Tiny hit-stop on success.
- Flash frame + confetti pixels for perfect action.
- Comedic squash/stretch fail reactions.
- Fast scene wipes between microgames.

### UX Principles
- Thumb-zone controls near lower/mid screen.
- Minimal reading during runs.
- High legibility with big iconography.
- Audio-first cues for reinforcement.

### Sound Direction (placeholder-ready)
- 8/16-bit inspired stingers for success/fail.
- Short category jingles.
- Pronunciation clips as clean voice overlays.

---

## Included Prototype Notes

The included HTML/CSS/JS prototype demonstrates:
- Mobile-first screen flow.
- Multiple modes (Quick, Daily, Category, Verb, Endless, Practice).
- Reusable microgame templates (tap-select + drag-match).
- Vocabulary metadata model with pronunciation/audio placeholder fields.
- Score/streak/life systems and speed ramping.
- Basic local leaderboard preview and run results.

It is intentionally lightweight so content packs and additional microgame templates can be added quickly.
