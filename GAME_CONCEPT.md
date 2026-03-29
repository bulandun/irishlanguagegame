# FocalFocal! — Irish Microgame Mayhem (Mobile-First Design Blueprint)

## 1) Game Concept
FocalFocal! is a WarioWare-style Irish learning game where each vocabulary word becomes a tiny arcade challenge. The player is not answering quiz cards; they are dodging, aiming, catching, sorting, swiping, balancing, and reacting under pressure. Sessions are short, loud, and replayable, with a retro handheld aesthetic inspired by classic Nintendo-era pixel games.

**Core fantasy:** Become the top “Arcade Gaeilge” champion by mastering words through action.

---

## 2) Core Gameplay Loop
1. Start a mode (Quick Play, Endless Arcade, Daily Challenge, etc.)
2. Receive an Irish prompt via text + sprite + optional pronunciation audio
3. Instantly play a 3–8 second microgame linked to the word meaning
4. Get immediate success/fail feedback (visual + sound + corrective translation)
5. Earn points, speed bonus, and streak multiplier
6. Move into the next faster microgame with a different mechanic
7. End run with summary: score, words seen, mistakes, mastery gains, leaderboard placement

---

## 3) Diverse Microgame System (Critical Requirement)
The system is template-driven and intentionally varied so it never collapses into “press the right button” repetition.

### A. Movement / Navigation
- Lane dodge (Báisteach, Bus)
- Obstacle sprint (Rith)
- Jump gap swipe (Léim)
- Swim through channels (Snámh)
- Fly through rings (Eitil)

### B. Physics / Object Interaction
- Drag to destination (Madra, Cóta)
- Catch falling targets while avoiding hazards (Úll)
- Hold-and-release fill meter (Uisce, Ól)
- Throw-angle mini challenge (future: Madra advanced variant)
- Stack / balance challenge (future: “teach/household objects”)

### C. Reaction / Timing
- Tap exactly on timing zone (Dóigh)
- Freeze-on-cue challenge (future: fan mini-game)
- Quick-draw reaction flash (future: verbs set)
- Countdown survival burst (boss wave rounds)

### D. Sorting / Recognition
- Conveyor category sort (animals vs food)
- Odd-one-out under speed pressure
- Spot correct Irish word among decoys
- Partial reveal object recognition

### E. Construction / Transformation
- Build word from scrambled chunks
- Repair / clean / assemble chain
- Dress avatar before weather hazard
- Pack right item set for destination

**Run composition rule:** no back-to-back identical mechanics more than twice; encourage rapid mechanic switching.

---

## 4) Vocabulary + Category Structure
Vocabulary is grouped by practical themes and verb clusters:
- animals
- food
- home objects
- clothes
- weather
- transport
- places
- body parts
- nature
- school items
- daily actions
- common verbs
- movement verbs
- household verbs

Each word includes:
- Irish word
- English meaning
- pronunciation guide
- category
- difficulty tier
- linked microgame type
- sprite/image key
- pronunciation audio
- mastery score

---

## 5) Scoring + Leaderboards
### Scoring
- Base points per clear
- Speed bonus (faster clear = higher score)
- Combo / streak multiplier
- Perfect run bonus (no misses)
- Category completion bonus
- Daily challenge bonus
- Mastery bonus for repeated correct clears
- Variety bonus when multiple game types are cleared in one run

### Leaderboards
- Daily
- Weekly
- All-time
- Category-specific
- Friends
- Endless high score

Player profile tracks: level, streak history, mastered categories, best mode, best mechanic.

---

## 6) Progression + Unlocks
- Unlock vocabulary packs by category
- Unlock advanced variants per mechanic (more hazards, less cue time)
- Unlock visual themes (palette swaps, CRT/pocket LCD shaders)
- Unlock avatars and idle animations
- Unlock bonus modes and boss rounds
- Reward daily practice streaks
- Badges for both language mastery and arcade skill

Difficulty escalates through:
- shorter timer windows,
- denser hazards,
- decoy similarity,
- multi-step microgame chains,
- mixed-prompt rounds (image + audio only).

---

## 7) Onboarding (First 30 Seconds)
- No long tutorial text
- Start with 2–3 clear noun/verb words
- Teach one mechanic at a time in rapid sequence
- Immediate positive feedback and celebratory VFX
- Show contrast: each word plays differently
- Prompt replay immediately to establish “fun first, learning follows”

---

## 8) Technical Architecture
### Client Systems
- `GameLoopManager`: run flow, pacing, transitions
- `MicrogameEngine`: template registry, lifecycle, timeout handling
- `InputLayer`: touch gestures (tap, swipe, drag, hold, release, mash)
- `VocabularyStore`: category filters, difficulty routing, spaced repetition queue
- `ScoreEngine`: points, multipliers, bonuses, anti-idle checks
- `ProgressionSystem`: unlocks, mastery, badges, daily rewards
- `LeaderboardClient`: submit/fetch score rows
- `AudioSystem`: pronunciation + arcade SFX + timing cues

### Backend (lightweight)
- User/profile service
- Vocabulary catalog service
- Run ingestion + validation
- Leaderboard aggregation (daily/weekly/all-time)
- Daily challenge seed endpoint

---

## 9) Data Schema
```ts
interface WordEntry {
  id: string;
  irish: string;
  english: string;
  pronunciation: string;
  category:
    | 'animals' | 'food' | 'home_objects' | 'clothes' | 'weather'
    | 'transport' | 'places' | 'body_parts' | 'nature' | 'school_items'
    | 'daily_actions' | 'common_verbs' | 'movement_verbs' | 'household_verbs';
  difficulty: 1 | 2 | 3;
  microgameType:
    | 'tap_select' | 'swipe' | 'drag_match' | 'timing' | 'sorting'
    | 'avoidance' | 'assembly' | 'targeting' | 'lane_dodge' | 'catch';
  spriteKey: string;
  audioUrl: string;
  masteryScore: number;
}

interface RunResult {
  userId: string;
  mode: 'quick' | 'endless' | 'daily' | 'category' | 'verb' | 'mixed' | 'practice' | 'boss';
  score: number;
  streakMax: number;
  wordsSeen: string[];
  mistakes: string[];
  clearsByMicrogameType: Record<string, number>;
  createdAt: string;
}
```

---

## 10) Retro Arcade UI Direction
- Pixel-art sprites with exaggerated poses and hit reactions
- Bright saturated palette (indigo/violet base + neon accents)
- Chunky outlines, chunky buttons, chunky HUD chips
- Brief screen shake/hit-stop on clear/fail
- Fast transitions (100–180 ms) to sustain arcade rhythm
- Portrait-first layout with thumb-zone controls
- Handheld nostalgia touches: scanline overlays, playful bleep bloop SFX
- Polished simplicity: low cognitive load, high kinetic clarity

---

## Representative Word-to-Mechanic Examples
- **Bó**: guide cow through fence lanes while avoiding mud pits
- **Madra**: drag/throw bone to dog at correct trajectory
- **Éan**: flap/fly through obstacle gap
- **Úll**: catch apples, avoid rotten decoys
- **Uisce**: fill bucket to line, do not overflow
- **Rith**: sprint burst through hazard lane
- **Léim**: swipe up to clear moving gap
- **Snámh**: weave through rock channels and collect bubbles
- **Oscail**: open correct door in timed set
- **Dún**: close all windows before storm gust
- **Glan**: scrub spreading dirt patches quickly
- **Bus**: steer into stop lane without collision
- **Báisteach**: dodge rain and collect umbrellas

This design keeps the educational layer embedded inside high-variety arcade play, ensuring every run feels mechanically fresh and replayable.
