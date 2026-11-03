# ReelYarn motion plan

The goal is motion on the level of Awwwards sites, for a product page whose visitors are small-business owners and creators. Motion has to sell the product's promise, not just decorate the page.

## Motion thesis

**One line becomes a finished video.** The page tells that story once, properly, in the hero. Every section after that follows the same idea on a smaller scale: a rough input (a line, pixels, a raw clip) resolves into a finished piece. Avoid a fade-and-rise on every section. That's the template look Awwwards juries mark down.

- **Focal moment:** the hero app mock builds the café promo in front of the visitor.
- **Continuity:** gallery card → video modal, the edit-tab indicator, pricing numbers, FAQ open and close.
- **Feedback:** buttons, the slider, arrows, the subscribe form, and copying or playing.
- **Budget:** one scroll-scrubbed scene (the hero). Everything else plays once on enter, or on interaction.

## Stack

| Piece | Why |
|---|---|
| `gsap` + `@gsap/react` (`useGSAP`) | Timelines, interruption, and cleanup through `gsap.context`. All plugins are free now. |
| `ScrollTrigger` | Enter triggers and the one hero scrub. |
| `SplitText` | Line and word masks for headings, with built-in `autoSplit` on resize. |
| `lenis` | Smooth scroll with inertia, synced to the ScrollTrigger ticker. Off for reduced motion and for touch devices. |
| CSS transitions | Hover, focus and press states. No JavaScript for these. |
| View Transitions API | Gallery card → modal shared element, falling back to a crossfade. |

That adds about 55 KB gzipped. It all loads in one client `MotionProvider`, after the page's own content is painted.

**Easing tokens** (in `globals.css`):
- `--ease-out: cubic-bezier(.16,1,.3,1)` for arrivals
- `--ease-in-out: cubic-bezier(.65,0,.35,1)` for scrubs and morphs
- `--ease-snap: cubic-bezier(.3,1.4,.5,1)` for small feedback only, never on large surfaces

**Durations:** 120 ms for feedback, 240 ms for state changes, 450 ms for layout and overlays, and 700–900 ms for the hero only.

## Section by section

### 0. Global
- **Nav:** hides on scroll down and comes back on scroll up, gaining a white blur backdrop after the hero. A small orange dot underlines the active section link and slides between links (FLIP).
- **Buttons:** on hover, the label rolls: two stacked copies slide up 100% with a 280 ms ease-out. The arrow nudges 4 px. Pressing scales to 0.97. The primary orange CTAs are magnetic, pulled up to 6 px toward the cursor, on pointer devices only.
- **Anchor links:** Lenis `scrollTo` with an offset for the nav, so jumps glide instead of snapping.
- **No preloader.** The content is in the HTML and readable without JavaScript.

### 1. Hero: the focal sequence (about 2.4 s, starts after fonts are ready)
1. **Headline:** SplitText lines rise out of masks (`yPercent:110 → 0`), staggered 90 ms. The dim second line lands last, its colour easing from ink to the dim grey, as if the line were being "written".
2. **Sub, CTAs and fine print:** a short fade and 12 px rise, overlapping the tail of the headline.
3. **App mock assembles:**
   - The agent message types out at about 40 characters per second, with a caret.
   - The four steps tick in turn: each check draws in (stroke-dashoffset) and the row text goes from muted to ink. The existing pulse moves on to the next step.
   - The dissolve squares sweep away left to right in a wave (staggered from the left, scale 1 → 0 with opacity), uncovering the finished phone mock. This is "pixels resolve into a video" made literal.
   - The timeline segments fill and a playhead runs across them. The caption "every morning at **7**" pops word by word, like the product's own captions.
4. **On scroll (the one scrub):** the app mock goes from `scale .94, rotateX 8°` to flat as it reaches the middle of the viewport. The glass ribbon drifts up at 0.6× scroll speed (parallax) and turns slowly (`rotate 0 → 6°`).

### 2. Who it's for (carousel)
- Drag to scroll with inertia on desktop. The cursor becomes a small "Drag" pill over the track.
- Cards tilt very slightly toward the pointer (±3°, with a moving sheen). Turned off on touch.
- On first entry the cards slide in from 40 px right with a 60 ms stagger, limited to the visible ones.
- Arrows: on hover, the circle fills ink and the arrow icon slides out and back in.

### 3. Gallery
- **Hover preview:** the poster crossfades into the muted, looping video after a 150 ms hover delay, and pauses and resets on leave. The video elements load lazily, only after the first hover.
- **Cursor:** over a card, a round "Play" chip follows the pointer with lag (gsap `quickTo`) and replaces the static play button on desktop.
- **Open:** a View Transition makes the poster grow into the modal player (shared `view-transition-name`). Closing reverses it. The backdrop blur fades in over 300 ms.
- **Grid entry:** a clip-path reveal on each card (`inset(100% 0 0 0) → inset(0)`), staggered by column, played once.

### 4. Formats tiles (each tile acts out its format once on enter, and replays on hover)
- **Lessons:** the hop arc draws from 3 to 7, then the "4" counts up.
- **Top lists:** the five rows stack in from the bottom, ranked 5 → 1.
- **Promos:** the shot slides up and the "Order now" chip bounces in once.
- **Captions:** the waveform bars animate in height and "so here's" appears word by word.
- **Stick figures:** the figures draw in (stroke-dashoffset on each path).
- **Product ads:** the frame sweeps across and the headline masks in.

### 5. Start however you like
- **Upload:** the three file chips fly in an arc into the drop zone, then land as a list. The drop-zone border goes dashed → solid orange for 200 ms.
- **Website:** "Reading yourshop.com · 1 → 4 pages" counts up while the existing scan line runs. The page blocks highlight one by one as they're "read".

### 6. Let ReelYarn edit (tabs)
- **Active tab indicator:** slides between tabs (FLIP), and the inactive labels dim.
- **Panel swap:** the outgoing panel fades out in 150 ms. The incoming one reveals with a clip-path from the top in 350 ms.
- **Inside each panel:**
  - **Voices:** a waveform plays on the voice row you hover.
  - **Captions:** each style animates its own words (bold pops, clean fades, pop scales, minimal types).
  - **Language:** the greeting cycles through the languages with a vertical text roll.
  - **Shapes:** one frame morphs 9:16 → 1:1 → 16:9 on a loop while the panel is visible.
  - **Chat:** the messages arrive one after another, with three-dot typing before each ReelYarn reply.

### 7. Pricing
- **Slider:** the price and credits roll like an odometer: each digit is a vertical strip and changes direction with the drag. The naira line crossfades. The thumb squashes slightly while held. The active tick label scales to 1.15 and turns ink.
- **The "Get N credits" button:** its number rolls in sync.
- **Credit rows:** each icon draws in once (stroke) as the row enters, with the rows staggered 80 ms.

### 8. Support and FAQ
- **Support cards:** the icon strokes draw in on enter. On hover the arrow slides and a hairline underline grows left to right.
- **FAQ:** opening animates the height smoothly (`interpolate-size: allow-keywords` plus `::details-content`, falling back to an instant open), and the plus rotates into a minus. Only one question is open at a time.

### 9. Footer
- A large "ReelYarn" wordmark at the bottom of the footer, drawn as one continuous thread (an SVG stroke) when the footer scrolls into view. It's the brand's yarn metaphor, and the page's closing beat.
- **Subscribe:** pressing the button morphs it into a spinner, then a check. The input shakes 6 px once on an invalid email.

## Rules every animation follows
- **Content visible by default.** Starting states are applied only when an inline script has put `html.motion` on the page before first paint. A 2 s safety timeout removes the class if the bundle fails. Headings are never hidden for crawlers or for people with JavaScript off.
- **`prefers-reduced-motion`:** no Lenis, scrub, parallax, tilt, magnetic pull or cursor follower. Reveals become 200 ms opacity fades. State feedback (tab indicator, slider numbers, FAQ) stays, but without travel.
- **Touch and small screens:** no cursor effects, tilt or magnetic pull. The hero scrub is shortened, and loops pause when they're offscreen (IntersectionObserver).
- **Performance:**
  - Animate only transform, opacity and clip-path.
  - Use `will-change` only while a tween runs.
  - Hover videos `preload="none"`.
  - Targets: LCP under 2.0 s on mid-range Android, and CLS stays at 0.
- **CSS `zoom:.8` on desktop:** confirm ScrollTrigger positions and the `quickTo` cursor maths under zoom (rects are in zoomed pixels, the same issue we fixed in the carousel). If it fights GSAP, replace the zoom with a `--scale` on the root font size and container width.
- **Cleanup:** every component uses `useGSAP({ scope })` so the triggers are reverted on unmount.

## Build order
1. **Foundation:** packages, `MotionProvider` (Lenis plus the ScrollTrigger sync), easing tokens, `html.motion` gating, the reduced-motion switch, button text roll, magnetic CTAs, nav behaviour.
2. **Hero focal sequence and scrub.** Review it with you before going further, because it sets the tone.
3. **Showcase sections:** gallery (preview, cursor, View Transition), formats tiles, start-ways.
4. **Interactive parts:** edit tabs, pricing odometer, FAQ, carousel drag and tilt.
5. **Footer thread wordmark and subscribe states.**
6. **QA pass:** desktop, mobile and reduced motion; a Lighthouse run; check for jank in a performance trace.

Motion goes into the Next.js site only. The static `reelyarn-landing.html` stays as it is, unless you want it mirrored.
