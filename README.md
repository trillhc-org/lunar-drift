# 🌙 Lunar Drift

**The Moon is leaving Earth. Watch it happen.**

A fear-inducing, climate-change-style awareness site about lunar recession. The Moon drifts 3.8 cm farther from Earth every year. This site makes that feel urgent.

**Live:** https://moon.openterminaldevelopment.com

---

## Tech Stack

- Pure HTML/CSS/JS — no build step
- [SunCalc](https://github.com/mourner/suncalc) — client-side astronomical calculations
- No backend, no database, no API calls
- Hosted on Netlify (free tier)

---

## Current Features

- **Hero nanometer counter** — Real-time drift since page load
- **Compound math section** — 3.8 cm → 38 m → 38 km → 38,000 km (each stat shareable)
- **Lifetime calculator** — Enter birth year → personalized drift distance + share result
- **Live distance display** — Current Earth-Moon distance with "Right Now" heading, approaching/receding indicator
- **"What We're Losing" sections:**
  - Tidal ecosystem collapse (coral spawning) + PNAS expert quote
  - Infrastructure failing (leap seconds, GPS)
  - Mars comparison (axis chaos) + Laskar et al. Nature quote
  - Unknown threshold (tipping point)
- **"Already Happening" stats** — 27 leap seconds, 2035 abolition, 55 years data (each stat shareable)
- **"Flying Blind" section** — Research funding gap + Dr. Tom Murphy quote + authority badges (NASA JPL, ILRS, etc.)
- **Timeline** — 4.5B years ago to +2B years future, with historical anchors (Pyramids, dinosaurs)
- **60-day distance chart** — Perigee/apogee visualization
- **"What You Can Do" section** — Three action cards: fund observatories, spread awareness, demand science funding
- **CTA with email signup** — "Join the Watch 🌙" perigee notification hook
- **"Did You Know?" rotating facts**
- **Share button** + per-stat share buttons throughout
- **OG/Twitter card meta** — Social shares show hero image preview
- **Generated images** — 8 AI-generated images across all sections (hero, coral, GPS, Mars, threshold, observatory, ancient earth, hand reaching)

---

## TODO

### Completed ✅

- [x] Add generated images to all placeholder slots (8 AI-generated images)
- [x] Lifetime calculator — "Enter birth year, see how far Moon moved"
- [x] Historical anchors — Pyramids (17 cm closer), dinosaurs (2.5 km closer)
- [x] Tweetable facts — Individual share buttons per stat card
- [x] Newsletter signup — "Join the Watch" perigee notification (localStorage, needs backend)
- [x] Expert quotes from astronomers (Laskar, Murphy, PNAS)
- [x] "What you can do" section (3 action cards)
- [x] OG/Twitter card meta for social sharing

### High Priority

- [ ] "Why isn't anyone talking about this?" section (engagement bait)
- [ ] Screenshot-optimized stats — Design for Twitter/TikTok screenshots
- [ ] Backend for email collection (Netlify Forms or similar)

### Visual Enhancements

- [ ] Animated Moon in hero — Shrinks as you scroll (parallax)
- [ ] Persistent distance bar at top of page
- [ ] Particle effect — Dots drifting away from Moon
- [ ] Glitch effect on scary numbers (0° to 85°)
- [ ] Scroll-triggered word-by-word reveals for key sentences
- [ ] Dark mode toggle joke — "Light mode unavailable. The Moon is leaving."

### Interactive Features

- [ ] Time-travel slider — Scrub through 4.5B years
- [ ] Mobile haptic feedback synced to counter
- [ ] Optional ambient sound — Low drone that pitch-shifts down
- [ ] "Last eclipse countdown" — Estimated eclipses remaining

### Viral/Share Mechanics

- [ ] Personalized OG image — "Moon was X km away when [name] shared"
- [ ] "I watched the Moon leave" badge after 60 seconds
- [ ] Visitor counter — "X people have watched the Moon leave"

### Content Additions

- [ ] Map of 5 active LLR stations
- [ ] Budget comparison — "We spend $X on Y. Lunar research gets $125k"
- [ ] FAQ for skeptics — "Isn't this natural?" "Yes. So is an asteroid."
- [ ] More scientific citations (see RESEARCH.md)

### Emotional Hooks

- [ ] Generational framing — "Your great-great-grandchildren..."
- [ ] Pet/child angle — "A dog born today..."

### Technical Polish

- [ ] Service worker for offline mode
- [ ] Lazy load below-fold content
- [ ] Accessibility improvements (aria-labels with dramatic pauses)
- [ ] Print stylesheet for posters
- [ ] Konami code easter egg

---

## Image Prompts

For generating images to fill placeholder slots:

### 1. Hero — The Distant Moon
```
A hyper-realistic view of the Moon from Earth's surface at night, the Moon appearing slightly smaller than expected, vast empty black space between Earth and Moon emphasized, subtle red/orange atmospheric haze at the horizon suggesting distance and loss, cinematic lighting, 8K, NASA-quality photography style
```

### 2. Coral/Tides — Dying Reef
```
An aerial view of a dying coral reef at low tide, bleached white coral exposed to air, tide pools nearly empty, a sense of abandonment, muted colors, documentary photography style, melancholic atmosphere, golden hour lighting casting long shadows
```

### 3. GPS/Infrastructure — Glitching Satellite
```
A GPS satellite orbiting Earth with glitching/distorted signal waves emanating from it, Earth visible below with city lights, subtle visual corruption/artifacts suggesting timing errors, dark space background, technical/sci-fi aesthetic, ominous mood
```

### 4. Mars Comparison — Earth vs Mars Split
```
Split image: Left side shows Earth with stable seasons and green continents, right side shows Mars as a barren red wasteland with extreme dust storms, visual metaphor for stability vs chaos, space view, dramatic contrast, NASA visualization style
```

### 5. Threshold — Axis Visualization
```
Abstract visualization of Earth's axial tilt, a glowing 23.4° angle indicator with the Moon stabilizing it, but the Moon is distant and fading, subtle red warning indicators appearing, scientific diagram aesthetic mixed with dramatic lighting, sense of impending instability
```

### 6. Observatory — Lonely Laser Station
```
A single laser ranging observatory on a mountaintop at night, green laser beam shooting toward a tiny distant Moon, vast starfield, the observatory appearing small and underfunded against the cosmic scale, melancholic atmosphere, long exposure photography style
```

### 7. Ancient Earth — Massive Moon
```
Earth 4.5 billion years ago with a massive Moon dominating the sky, taking up 1/3 of the visible sky, violent tides crashing, primordial landscape, dramatic orange/red sky, epic scale, concept art style
```

### 8. CTA — Hand Reaching
```
A single human hand reaching toward the Moon in the night sky, the Moon just slightly too far to touch, sense of loss and distance, minimalist composition, high contrast black and white with subtle blue tones, emotional/melancholic mood
```

---

## Image Placement

| Placeholder ID | Location | Prompt # |
|----------------|----------|----------|
| `#hero-image` | Hero background | 1 |
| `#img-coral` | Tidal collapse section | 2 |
| `#img-gps` | Infrastructure section | 3 |
| `#img-mars` | Mars comparison section | 4 |
| `#img-threshold` | Threshold section | 5 |
| `#img-observatory` | Flying Blind section | 6 |
| `#img-ancient` | Timeline section | 7 |
| `#img-hand` | CTA section | 8 |

To add an image, set the `background-image` CSS property on the element:
```css
#img-coral {
  background-image: url('images/coral.jpg');
}
```

---

## Scientific Sources

### Lunar Recession
- Laser ranging: 3.8 cm/year (NASA JPL, Apollo retroreflectors)
- Measured since 1969, ~55 years of data
- Only ~5 stations worldwide capable of lunar ranging

### Axis Stabilization
- Laskar et al. 1993, Nature: "Stabilization of the Earth's obliquity by the Moon"
- Without Moon: Earth's tilt could vary 0° to 85°
- Mars (no large moon): tilt varies 0° to 60°

### Day Length
- Slowing 2.3 ms/century due to tidal friction
- 27 leap seconds added since 1972
- Leap seconds abolished by 2035 (too disruptive)

### Tidal Ecosystems
- Coral spawning synchronized to lunar cycles (PNAS studies)
- Intertidal zones among most biodiverse ecosystems

### Research Funding
- McDonald Observatory lost $125k/year NSF funding in 2009
- ILRS doesn't fund stations — relies on host nations

---

## Development

```bash
# Local dev
npx serve .

# Deploy
export NETLIFY_AUTH_TOKEN="..."
netlify deploy --prod --dir=.
```

---

## License

MIT

---

*The Moon has been leaving for 4.5 billion years. We've only been watching for 55.*
