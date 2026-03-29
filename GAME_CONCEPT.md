# Carnival Craic — Irish Fairground Shooting Gallery (Mobile-First)

## 1) Full Game Concept
**Carnival Craic** is a one-mechanic arcade game: a retro fairground shooting gallery where a cheeky carney mascot presents one Irish word at a time, and the player must quickly shoot the matching moving target.

The game is built to feel like an addictive tap arcade first:
- fast target motion,
- instant hit/miss feedback,
- score-chasing,
- streak tension,
- fast “just one more run” pacing.

Irish learning happens naturally through repeated, high-speed visual matching (Irish word -> image).

---

## 2) Gameplay Loop
1. Run starts.
2. Carney holds up an Irish word sign (e.g., **bó**).
3. 4-6 moving targets sweep across the gallery; only one matches.
4. Player taps to shoot.
5. Immediate response:
   - **Correct:** points + streak + speed bonus.
   - **Wrong/timeout:** lose life, streak breaks.
6. Next word appears almost instantly.
7. Speed and pressure ramp up.
8. Run ends on timer or lives.
9. Results show score, accuracy, streak, and words reviewed.

---

## 3) Screen Structure
1. **Home Screen**
   - Title + mascot intro
   - Mode buttons (Classic, Timed, Daily, Practice)
   - Leaderboard tabs preview

2. **Mode Setup Screen (Practice only)**
   - Category picker
   - Start / back

3. **Game Screen**
   - Top HUD: score, streak, lives, timer
   - Carney stage with Irish word sign + pronunciation button
   - Main moving target gallery
   - Hit/miss feedback bar

4. **Results Screen**
   - Final score
   - Accuracy
   - Best streak
   - Words reviewed
   - Mastery progress summary
   - Replay / home

---

## 4) Scoring and Streak Logic
- **Base correct hit points:** 100
- **Speed bonus:** increases as response window shrinks
- **Streak multiplier:** grows per consecutive hit (capped)
- **Wrong hit or timeout:**
  - lose a life,
  - streak reset to 0,
  - no points.
- **Daily challenge completion bonus:** fixed bonus added at run end.

Design goal: easy to understand math, high tension from streak protection.

---

## 5) Word/Category System
Each vocabulary item contains:
- Irish word
- English meaning
- image/icon
- pronunciation audio key
- category
- mastery value

Categories used:
- animals
- food
- household objects
- clothes
- transport
- weather
- body parts
- common objects

Practice mode limits the pool to one selected category.

---

## 6) Leaderboard System
Displayed leaderboards:
- Daily
- Weekly
- All-time
- Category leaderboard

Each entry stores:
- player name
- score

Daily mode updates the daily board when the run ends.

---

## 7) Onboarding Flow
Onboarding is embedded directly into play:
1. Player enters fairground home immediately (no heavy tutorial wall).
2. First rounds use easy words and clear visual targets.
3. Feedback bar teaches rules implicitly:
   - “Direct hit!”
   - “Miss! X means Y.”
4. By round 2-3, player understands the loop naturally.

---

## 8) Technical Architecture
Simple modular browser architecture:
- **UI Layer**: screen switching, HUD, results rendering.
- **Game State Store**: score, streak, lives, timer, active word.
- **Round Generator**: picks prompt word + distractors.
- **Target Motion Engine**: requestAnimationFrame movement + bounce logic.
- **Input Resolver**: tap-to-shoot + hit detection + crosshair animation.
- **Scoring Engine**: points, multipliers, penalties.
- **Leaderboard Service (local)**: board sorting/rendering.

Optimized for mobile portrait with light DOM updates.

---

## 9) Data Schema
```ts
interface WordEntry {
  id: string;
  irish: string;
  english: string;
  image: string;
  audio: string;
  category:
    | 'animals'
    | 'food'
    | 'household_objects'
    | 'clothes'
    | 'transport'
    | 'weather'
    | 'body_parts'
    | 'common_objects';
}

interface RunStats {
  mode: 'classic' | 'timed' | 'daily' | 'practice';
  score: number;
  hits: number;
  shots: number;
  bestStreak: number;
  livesRemaining: number;
  wordsReviewed: string[];
}

interface LeaderboardEntry {
  player: string;
  score: number;
  board: 'daily' | 'weekly' | 'alltime' | 'category';
}
```

---

## 10) Retro Fairground Visual Direction
Visual direction targets “charming arcade stall”:
- wooden booth framing,
- bunting and carnival lighting mood,
- mascot carney standing beside the sign,
- bright circular targets with bold silhouettes,
- chunky pixel-like UI buttons,
- fast pop-style feedback states,
- playful colour palette,
- clean one-glance readability.

Audio direction:
- hit “pop”,
- miss “thunk”,
- bell/chime on streak,
- short pronunciation playback button.

---

## Critical Alignment Check
This is **one polished mechanic** (word-to-target shooting gallery), not a mini-game bundle and not a quiz menu. The learning layer is embedded in arcade action tempo.
