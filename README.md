# Rayen Chaouch — Portfolio

Static, dependency-free portfolio for motion design, graphic design and color grading.
No build step: three files + an `assets/` folder.

```
index.html    markup
style.css     design system + sections
script.js     animations & interactions
assets/img    photos, before/after grading frames
assets/vid    5s loops used as hover previews in the work list + reel.mp4 (showreel)
assets/js     gsap, ScrollTrigger and lenis (vendored, so no CDN is needed)
```

## Run locally

```bash
python3 -m http.server 8080     # then open http://localhost:8080
```

## What's inside

- WebGL hero background (raw shader, no library) with mouse-reactive light pool
- Preloader with counter + name reveal, curtain wipe
- Lenis smooth scroll, GSAP + ScrollTrigger reveals (char, word and clip reveals)
- Custom cursor (difference blend, `VIEW` state, magnetic buttons)
- Work list with a cursor-following video preview + category filters
- Pinned horizontal "What I do" section with progress bar
- Draggable color-grading before/after comparison
- Fullscreen showreel pinned to the viewport: the scroll position *is* the playhead
  (timecode + progress bar), with a play button that hands control back to the video
- Design & vectors gallery: parallax columns, velocity skew, click-to-zoom lightbox
- Clients grid with magnetic cells, awards list, KPI counters
- FAQ accordion
- Infinite tickers, animated counters, process line draw
- Certifications grid, animated skills radar chart
- Behind-the-scenes gallery (reuses the lightbox)
- Interactive grade "look" playground (CSS-filter presets on a still frame)
- Free resources cards, tap-to-play video testimonials wall
- Social feed mockup grid, 7-day availability/booking strip
- Newsletter signup
- Reduced-motion and mobile fallbacks

## Making it yours

| What | Where |
| --- | --- |
| Name / logo / meta | `index.html` head + `.nav__logotype` + `#loader` |
| Projects | `.work__list` rows — `data-cat` (motion/grade/brand) and `data-media` (video path) |
| Hover previews | drop your own `.mp4` in `assets/vid/` (640×400, ~5s, muted) |
| Before/after grade | replace `assets/img/grade-raw.jpg` and `grade-after.jpg` |
| Showreel | replace `assets/vid/reel.mp4` (keyframe-dense export scrubs smoother) |
| Gallery | `assets/img/g1…g8.jpg` + the `#design` figures (`data-full` = lightbox image) |
| Clients / awards / FAQ | `#clients` and `#faq` in `index.html` — plain markup, no JS to touch |
| Colors | `:root` in `style.css` (`--acc`, `--acc-2`, `--bg`) |
| Email | `#copyMail[data-mail]` and the `mailto:` in `script.js` |

Replace the placeholder photos/videos with your real reels before publishing —
the current ones are stock stand-ins.

## Deploy

Drag the folder onto [Netlify Drop](https://app.netlify.com/drop), or push it to a
GitHub repo and enable GitHub Pages (root). Nothing to compile.