# FocalFocal! — Irish Microgame Mayhem (Mobile-First Concept)

## Vision
A chaotic, joyful Irish-learning game where each word becomes a **2–5 second action challenge**. Think rapid-fire, silly, tactile mini-games that teach meaning through movement and reaction—not translation drills.

Tone: playful, punchy, energetic, meme-friendly.  
Visual style: bright colors, chunky icons, clean UI, exaggerated feedback.

---

## 1) Core Gameplay Loop

1. **Start a Run (30–90 seconds)**
   - Player selects a category mix (or Daily Challenge playlist).
   - Countdown: **3…2…1… Imir!**

2. **Microgame Burst**
   - Words appear one after another as voice + text + icon cue.
   - Each word triggers a unique interaction (tap, swipe, drag, shake, trace, tilt).
   - Each challenge lasts 2–5 seconds.

3. **Instant Feedback**
   - Correct: flashy animation, sound hit, +points, streak meter rises.
   - Miss: funny fail animation (“Oops! Sin capall, not cat!”), quick correction, move on immediately.

4. **Escalation**
   - Game speed increases every few words.
   - Distractions and decoys appear at higher levels.

5. **Run Results**
   - Score, streak max, accuracy, XP, newly mastered words.
   - Compare with friends/global leaderboard.

6. **Return Hook**
   - Daily challenge rewards.
   - “One more run” button front and center.

---

## 2) Mini-Game Types (Action, Not Quiz)

Each microgame is built to embody the word meaning physically.

1. **Catch It!**
   - Word: *iasc* (fish) → fish dart across water; catch the fish.
2. **Feed It!**
   - Word: *madra* (dog) → drag correct food to barking dog.
3. **Build It!**
   - Word: *teach* (house) → quickly assemble roof + walls.
4. **Dodge It!**
   - Word: *báisteach* (rain) → avoid raindrops by moving character.
5. **Pop It!**
   - Word: *úll* (apple) → pop only apples, avoid other fruit.
6. **Swipe Direction**
   - Verb: *oscail* (open) → swipe open door/chest.
7. **Close/Stop Action**
   - Verb: *dún* (close) → slam windows before wind blows in.
8. **Trace Motion**
   - Verb: *scríobh* (write) → trace quick letter stroke.
9. **Match Silhouettes**
   - Nouns: match object to shadow in under 3 seconds.
10. **Rhythm Tap**
   - Verb: *rith* (run) → tap rapidly to sprint character.
11. **Sort Frenzy**
   - Category round: sort 6 flying objects into bins.
12. **Hide & Seek Flash**
   - Word appears briefly; find corresponding object in crowded scene.

Design rule: if a mini-game can be solved without understanding the word, redesign it.

---

## 3) Category System for Irish Vocabulary

### Primary Categories
- **Animals** (*ainmhithe*)
- **Food** (*bia*)
- **Household Objects** (*rudaí tí*)
- **Weather** (*aimsir*)
- **Places** (*áiteanna*)
- **Body Parts** (*baill choirp*)
- **Common Verbs** (*briathra coitianta*)

### Internal Word Grouping
- **Noun tracks**: singular form first, then article usage in later tiers.
- **Verb tracks**: imperative/action commands first (great for gameplay), then tense variations in advanced modes.
- **Difficulty tags per word**:
  - Tier 1: concrete, visual, high-frequency words.
  - Tier 2: faster variants + decoys.
  - Tier 3: similar-looking/sounding traps + mixed-category chaos.

---

## 4) Points, Streak, Multiplier & Leaderboard Logic

## Base Scoring
- Correct microgame: **+100**
- Fast clear bonus (under target time): **+25 to +100**
- Perfect action (no mistakes in gesture/timing): **+50**

## Streak System
- Consecutive correct answers build streak meter.
- Every 5 streak: multiplier increases.
  - x1.0 → x1.2 → x1.5 → x2.0 cap
- Mistake breaks multiplier by one tier (not total reset at mid/high progression for fairness).

## Chaos Bonus
- Mixed-category rounds award extra points if accuracy remains above threshold.

## Daily Challenges
- 3 rotating missions, e.g.:
  - “Hit 20 correct verbs in one run”
  - “No misses in Weather Frenzy”
  - “Reach x2 multiplier twice today”
- Completing all gives chest/currency/cosmetic.

## Leaderboards
- **Daily score** (resets every 24h)
- **Weekly category boards** (Animals week, Verbs week, etc.)
- **Friends board** + optional regional/global board
- Anti-cheat basics: validated session data + suspicious-score flagging.

---

## 5) Onboarding Flow (30–90 seconds)

1. **Cold Open**
   - Player dropped into 3 instant mini-games, no forms.
2. **Micro Tutorial Overlay**
   - One-line prompts: “Tap the *cat*!”, “Swipe to *open*!”
3. **Immediate Win Screen**
   - “You just learned 3 Irish words 🔥”
4. **Choose Play Style**
   - “Animals first” / “Verbs first” / “Mixed chaos”
5. **Name + Optional Account Link**
   - Delay signup pressure until after first reward.
6. **Day 1 Challenge Unlock**
   - Give a clear short-term target to drive retention.

Guiding principle: Teach controls and vocabulary simultaneously through action.

---

## 6) Example Irish Words + Matching Mini-Games

### Animals
- **cat** (cat): Tap the correct cat popping from boxes.
- **madra** (dog): Drag bone to the barking dog.
- **éan** (bird): Tilt phone to guide bird into nest.

### Food
- **úll** (apple): Pop apples only in fruit storm.
- **arán** (bread): Slice loaf at timing marker.
- **bainne** (milk): Catch milk bottle before it spills.

### Household Objects
- **cathaoir** (chair): Drag chair to match table.
- **doras** (door): Swipe to open/close based on command.
- **fuinneog** (window): Tap windows before rain enters.

### Weather
- **báisteach** (rain): Dodge raindrops.
- **gaoth** (wind): Hold object steady against gusts.
- **grian** (sun): Pull clouds away to reveal sun.

### Places
- **teach** (house): Assemble house pieces quickly.
- **scoil** (school): Guide child icon to school gate.
- **siopa** (shop): Toss coins into shop counter tray.

### Body Parts
- **lámh** (hand): Tap the hand on a character diagram.
- **cos** (leg/foot): Swipe shoes onto correct leg.
- **ceann** (head): Place hat on head before timer ends.

### Verbs
- **rith** (run): Rapid-tap sprint race.
- **léim** (jump): Time tap to jump obstacle.
- **ith** (eat): Drag food into mouth before buzzer.
- **ól** (drink): Tilt to pour drink into cup.
- **codail** (sleep): Dim lights + tuck character in.

---

## 7) Progression & Unlock Ideas

## Player Progression
- **XP from runs** → player level.
- Every level grants coins + occasional new mini-game modifier.

## Vocabulary Mastery
- Each word has mastery states:
  - New → Practicing → Solid → Lightning
- Faster reaction + fewer mistakes advances mastery.

## Unlockables
- New categories and sub-packs (e.g., farm animals, kitchen set).
- Cosmetic themes (UI skins, character costumes, goofy sound packs).
- “Chaos Mutators” (mirror controls, low gravity, speed burst mode).

## Long-Term Retention
- Streak calendar (soft pressure, forgiving grace token).
- Weekend events (double XP by category).
- Seasonal leaderboard badges.

---

## 8) Simple App Structure for Implementation

## Core Screens
1. **Home**
   - Play, Daily Challenge, Events, Leaderboard button
2. **Category Select**
   - Category cards + suggested training path
3. **Run Screen**
   - Microgame host container (loads mini-game modules)
4. **Results Screen**
   - Score, streak, learned words, rematch button
5. **Leaderboard Screen**
   - Daily / Weekly / Friends tabs
6. **Profile/Progress**
   - Mastery map, unlocks, streak calendar

## Suggested Technical Modules
- `GameLoopManager`: sequencing, timers, speed ramp
- `MiniGameRegistry`: maps word IDs to mini-game prefabs/components
- `VocabularyService`: word metadata, category tags, mastery stats
- `ScoringEngine`: points, streaks, multipliers
- `ChallengeService`: daily mission generation and tracking
- `LeaderboardService`: submission + retrieval
- `AnalyticsService`: retention, difficulty tuning, fail points

## Data Model (Minimal)
- `Word`: id, irish, english, category, difficulty, miniGameType
- `PlayerWordStat`: wordId, mastery, attempts, successRate, avgResponseMs
- `RunResult`: score, streakMax, wordsSeen, wordsCorrect, timestamp
- `DailyChallenge`: id, conditions, reward, expiry

---

## Why This Works for Casual Daily Play
- Sessions are short and high-energy.
- Interaction creates memory faster than passive flashcards.
- Constant variation + chaos keeps replayability high.
- Daily challenge + leaderboard gives reason to return.
- Learning is embedded in action, not separated into "study mode".

In short: this feels like a party game first, language learning second—and that’s exactly why players keep coming back and still learn.
