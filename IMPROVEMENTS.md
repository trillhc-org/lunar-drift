# Lunar Drift — Improvement Plan

Research-backed improvements based on persuasion psychology, landing page conversion best practices, and emotional flow theory (Nabi & Green, 2014).

## Current Strengths
- Real-time drift counter creates personal urgency
- Compound math escalation (3.8 cm → 38,000 km) uses anchoring effectively
- Concrete consequences avoid vague fear appeals
- Dark theme + monospace + red accents signal danger visually

---

## Planned Improvements

### 1. 🙋 Lifetime Calculator (Personalization)
**Status:** ✅ Shipped
**Impact:** Very High — personalized data creates ~10x more engagement than generic stats
**What:** "Enter your birth year" → shows how far Moon has moved in their lifetime, and projections to age 80.
**Why:** People screenshot personalized results. This is the #1 viral mechanic missing.
**Placement:** After the compound math section, before consequences.

### 2. 🧑‍🔬 Expert Quotes (Authority / Social Proof)
**Status:** ✅ Shipped
**Impact:** High — authority bias significantly increases credibility and reduces skepticism
**What:** 2-3 pull quotes from real scientists (Laskar, NASA JPL researchers) placed beside key claims. Institutional logos (NASA, ILRS, McDonald Observatory).
**Why:** The science is cited in README but invisible on the page. Visitors have no reason to trust the claims without authority signals.
**Placement:** Inline with consequence sections and the "Flying Blind" section.

### 3. 🚨 "What You Can Do" Section (Fear → Hope Emotional Flow)
**Status:** ✅ Shipped
**Impact:** High — research shows pure fear causes psychological reactance (shutdown). Fear → hope flow is the most persuasive narrative arc.
**What:** Concrete actions: support lunar ranging research, restore McDonald Observatory funding ($125k/year), contact representatives, share awareness.
**Why:** The site is 100% dread with zero agency. The CTA says "we need to understand" but gives no action. Fear without hope = disengagement.
**Placement:** Between "Flying Blind" and the CTA.

### 4. 🎯 Clear CTA with Email Capture (Conversion)
**Status:** ✅ Shipped (localStorage — needs backend for real collection)
**Impact:** High — every sales/advocacy page needs one clear action
**What:** Email signup ("Get notified at next perigee" or "Join X people watching the Moon leave"), pre-written share text, or petition link.
**Why:** Current CTA is vague — "The Moon Won't Wait" leads to nothing actionable.
**Placement:** Replace or enhance existing CTA section.

### 5. 📱 Shareable Stat Cards (Viral Mechanics)
**Status:** ✅ Shipped
**Impact:** Medium-High — individual share buttons per fact enable micro-sharing on social media
**What:** Each scary stat becomes a standalone shareable card with its own share button and OG-optimized layout.
**Why:** The site is one long scroll with nothing optimized for screenshots or social sharing. Stats like "27 leap seconds since 1972" are Twitter/TikTok gold if shareable independently.
**Placement:** Enhanced versions of existing stat sections.

---

## Future Improvements (Not Yet Planned)

### 6. 📊 Visitor Counter / Social Proof
"X people have watched the Moon leave" — bandwagon effect.

### 7. ⏱️ Scroll Progress Bar
Persistent top bar: "You've been watching for X seconds — the Moon moved X nm." Reinforces commitment.

### 8. 📖 Historical Anchors
"When the pyramids were built, the Moon was 1.7 meters closer." Grounds abstract numbers in human experience.

### 9. 🔄 Animated Moon Parallax
Moon shrinks as you scroll — visual metaphor for recession.

### 10. 🎵 Ambient Sound
Low drone that pitch-shifts down — subconscious unease.

---

## Research References
- Nabi & Green (2014) — Emotional flow hypothesis: fear → hope transitions sustain engagement and increase persuasion
- Tversky & Kahneman (1974) — Cognitive heuristics and anchoring effects
- Schwartz (2004) — Paradox of choice / decision fatigue
- Laskar et al. (1993) — Moon's role in stabilizing Earth's obliquity
- Lindgaard et al. (2006) — 50-millisecond first impression rule
- Elliot & Maier (2012) — Color psychology in urgency/action contexts
