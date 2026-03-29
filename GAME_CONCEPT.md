# FocalFocal! — Mobile-First Irish Arcade Learning Game

## 1) Overall Game Concept
**FocalFocal!** is a portrait mobile game inspired by WarioWare-style microgames, but tuned for **clarity first**.

- Every round teaches one Irish word (noun or verb).
- The player gets one clear prompt and one simple action.
- A round lasts roughly **3–5 seconds**.
- The goal is “instant fun, instant understanding, instant feedback.”

The learning effect comes from repetition + visual association + action memory (e.g., seeing **Bó** and dragging a cow into a field again and again).

---

## 2) Gameplay Loop
1. Start run (Quick, Daily, Category, Verb, etc.)
2. Show one Irish prompt (word + sprite, with optional pronunciation audio)
3. Play one simple microgame linked to that word
4. Show immediate success/fail feedback with English meaning
5. Award points + streak/speed bonuses
6. Move to next word quickly
7. End run with score, streak, reviewed words, and leaderboard preview

Design target: a player should understand each microgame in under one second.

---

## 3) Simplified Microgame System
A reusable template system where each template has **one objective** and **one dominant input type**.

### Core templates
1. **Drag object to target**  
   - Example: **Bó** → drag cow to field.
2. **Tap correct object**  
   - Example: **Arán** → tap bread sprite among decoys.
3. **Swipe direction**  
   - Example: **Léim** → swipe up to jump.
4. **Catch falling item**  
   - Example: **Úll** → move basket and catch apples.
5. **Hold to fill**  
   - Example: **Uisce / Ól** → hold and release in target fill zone.
6. **Simple lane dodge**  
   - Example: **Báisteach** → move left/right to avoid raindrops.

### Fairness constraints
- No multi-step instructions.
- No precision-heavy physics.
- No tiny hitboxes.
- Readable foreground with low visual clutter.
- Difficulty increases by speed/variety, not confusion.

---

## 4) Vocabulary Category Structure
Use practical, beginner-friendly sets:

- animals
- food
- home objects
- clothes
- weather
- places
- transport
- nature
- body parts
- daily verbs
- action verbs

Each word stores:
- Irish word
- English meaning
- pronunciation
- category
- difficulty
- linked microgame template
- sprite/image key
- audio reference
- mastery score

---

## 5) Scoring + Leaderboard Logic
### Score formula (simple + readable)
- **Base points** on success
- **Small speed bonus**
- **Streak multiplier** (capped)
- **Daily bonus** for completing daily mode
- **Category completion bonus** for clean category runs

### Leaderboards
- Daily
- Weekly
- All-time
- Optional friends board

Leaderboard entries include: player, score, mode, date, top streak.

---

## 6) Progression System
- Unlock categories over time
- Unlock visual themes (palette/UI skins)
- Unlock avatars
- Slightly increase run speed at higher tiers
- Track mastered words (mastery score threshold)
- Daily streak rewards for return play

Progression should feel rewarding without blocking early fun.

---

## 7) Onboarding Flow (Play-First)
First session teaches through action, not text walls.

1. **Round 1 (noun):** very easy drag game (e.g., **Bó**)
2. **Round 2 (verb):** very easy swipe or tap game (e.g., **Léim**)
3. **Round 3:** repeat with slight speed increase
4. Show “You’re doing great” feedback and quick replay prompt
5. Introduce score/streak only after player already succeeds

Tone: celebratory, low pressure, immediate wins.

---

## 8) Technical Architecture
### Frontend (mobile web)
- `GameLoopManager`: controls run pacing and transitions
- `MicrogameEngine`: registers/renders templates
- `InputLayer`: normalized tap/swipe/drag/hold handlers
- `VocabularyStore`: word pools by category/difficulty
- `ScoreEngine`: points, bonuses, streak logic
- `ProgressionService`: unlocks + mastery tracking
- `LeaderboardService`: local preview + API sync
- `AudioSystem`: pronunciation + arcade SFX

### Performance priorities
- Portrait-first layout
- Fast scene swaps
- Low-latency input response
- Lightweight effects (no heavy particle overload)

---

## 9) Data Schema
```ts
interface WordEntry {
  id: string;
  irish: string;
  english: string;
  pronunciation: string;
  category:
    | 'animals'
    | 'food'
    | 'home_objects'
    | 'clothes'
    | 'weather'
    | 'places'
    | 'transport'
    | 'nature'
    | 'body_parts'
    | 'daily_verbs'
    | 'action_verbs';
  difficulty: 1 | 2 | 3;
  microgameType:
    | 'drag_match'
    | 'tap_select'
    | 'swipe'
    | 'catch'
    | 'hold'
    | 'lane_dodge';
  spriteKey: string;
  audioUrl: string;
  masteryScore: number;
}

interface RunResult {
  userId: string;
  mode: 'quick' | 'endless' | 'daily' | 'category' | 'verb' | 'mixed' | 'practice' | 'boss';
  score: number;
  bestStreak: number;
  wordsSeen: string[];
  mistakes: string[];
  clearsByType: Record<string, number>;
  createdAt: string;
}
```

---

## 10) Retro Arcade UI Direction
- Retro Nintendo-inspired pixel look
- Bright, saturated palette
- Chunky buttons and HUD chips
- Expressive sprites and readable silhouettes
- Simple backgrounds + high-contrast foreground objects
- Short “pop” transitions and crisp feedback states
- Clear success/fail color coding
- Fun-first arcade vibe over educational formality

---

## Playability Checklist (Critical Requirement)
A microgame ships only if it is:
- understandable in < 1 second,
- playable with one clear action,
- fair on first try,
- readable on small mobile screens,
- fun to replay repeatedly.
