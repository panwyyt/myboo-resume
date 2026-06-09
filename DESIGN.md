---
name: Panthawit Chumthong — QA Portfolio
description: A dark, grainy-aurora single-page résumé with neon multicolor accents (dark default, clean white Apple theme as fallback); the work, not the chrome, carries the weight.
colors:
  paper: "#ffffff"
  mist: "#f5f5f7"
  ink: "#1d1d1f"
  ink-2: "#6e6e73"
  ink-3: "#86868b"
  hairline: "#d2d2d7"
  hairline-strong: "#b9b9c0"
  accent: "#0071e3"
  accent-hover: "#0077ed"
  sig-email: "#0071e3"
  sig-phone: "#0a84c4"
  sig-linkedin: "#0a66c2"
  sig-resume: "#0a7d3e"
  alert-red: "#ff453a"
  flare-from: "#ff5a5a"
  flare-to: "#ff8a1e"
  dark-bg: "#000000"
  dark-surface: "#1c1c1e"
  dark-ink: "#f5f5f7"
  dark-accent: "#2997ff"
typography:
  display:
    fontFamily: "'Anuphan', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2.6rem, 8.5vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  title:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "clamp(1.85rem, 4vw, 2.85rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "clamp(1.08rem, 2vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  body:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.06em"
rounded:
  sm: "10px"
  md: "16px"
  lg: "22px"
  pill: "980px"
  full: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  section: "clamp(4rem, 9vw, 7.5rem)"
components:
  button:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.72rem 1.4rem"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0.72rem 1.7rem"
  button-ghost:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.72rem 1.7rem"
  button-resume:
    backgroundColor: "{colors.sig-resume}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  skill-chip:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.1rem"
  project-card:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
  side-block:
    backgroundColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "1.25rem 1.4rem"
  cert-card:
    backgroundColor: "#ffffff"
    rounded: "{rounded.md}"
  modal-panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
---

# Design System: Panthawit Chumthong — QA Portfolio

## 1. Overview

**Creative North Star: "Aurora Workbench"**

A single-page résumé that opens on a **dark, grainy aurora gradient** (warm orange,
magenta, blue, and purple glows over near-black, dusted with film grain). The structure
stays calm and scannable like a good résumé, but the surface is vivid: each section title
and each item in the hero's focus list glows in its own **neon color** (orange, magenta,
yellow, periwinkle, cyan), echoing a bold category-banner look. Content floats on the
gradient in translucent glass cards.

**Dark is the default** (`data-theme="dark"`); a clean white "Apple" theme remains as a
fully working fallback behind the nav toggle. One typeface does all the work, and neon is
used as deliberate accent (titles, the hero focus row, hover glows), never splashed
everywhere. Personality comes from the color, grain, and a few light micro-interactions,
while body copy stays high-contrast and readable.

This system still rejects the generic résumé-template look and the macOS-desktop metaphor
(no windows, dock, terminal cosplay). Neon is **solid color only** (no gradient *text*);
the single reserved sunset gradient stays on the GAY-DAR card. The site itself is the QA
work sample, so it must be polished, responsive, accessible, and bug-free.

**Key Characteristics:**
- Single-page vertical scroll: sticky nav → hero → work → skills → experience → certifications → contact → footer.
- **Dark by default** (`data-theme="dark"`) on a grainy aurora gradient; a clean white theme is the toggle fallback.
- **Neon multicolor accents**: each section title and each hero focus-area item has its own neon hue; body text stays light and high-contrast.
- One typeface (**Anuphan**) for Thai and English; hierarchy from weight + fluid `clamp()` scale.
- Translucent glass cards/chips float on the gradient, with a neon glow on hover.
- A subtle, static film-grain texture sits over the gradient for depth.
- Responsive-first: works cleanly from 320px to large desktops, no horizontal scroll.

## 2. Colors

**Default (dark):** a near-black base (`#08070d`) under a grainy aurora gradient (warm
orange, magenta, blue, and purple glows). Accents are a **neon palette used as solid
color**: orange `#ff8a3c`, magenta `#ff5dbe`, yellow `#ffd23f`, red `#ff5a5a`, periwinkle
`#8c93ff`, cyan `#34dceb`. Orange is the primary action color; the neon hues color the
section titles and the hero focus list. Body text is light (`#f4f3f8` / `#b9b7c6`) and
high-contrast.

**Fallback (light):** a monochrome white-and-graphite Apple palette with **Apple blue**
(`#0071e3`) as the single resting accent; every other hue is a functional signal on hover.

### Primary
- **Accent Blue** (`#0071e3` light · `#2997ff` dark): Links, the primary "See my work" CTA,
  active-state cues, focus rings. The single resting accent in the neutral field.

### Neutral (the surface)
- **Paper** (`#ffffff`) / **Mist** (`#f5f5f7`): The body ground and the raised-surface /
  alternating-section tone. In dark mode: **#000000** ground, **#1c1c1e** surface.
- **Ink ramp**: Ink `#1d1d1f` (primary text) → Ink-2 `#6e6e73` (secondary, ≈5:1 on white) →
  Ink-3 `#86868b` (captions, footer). Dark: `#f5f5f7` → `#a1a1a6` → `#86868b`.
- **Hairline** (`#d2d2d7`, strong `#b9b9c0`): All borders and dividers; a 1px whisper.

### Secondary (functional signal hues)
- **Email** `#0071e3` · **Phone** `#0a84c4` · **LinkedIn** `#0a66c2`: adopted on contact-button
  hover (border + text + soft colored shadow). At rest these buttons are monochrome.
- **Résumé green** (`#0a7d3e`, white text ≈5.3:1): the one contact action that carries its
  color at rest, because downloading the CV is the primary conversion.
- **Alert Red** (`#ff453a`): the modal Close control only.

### Tertiary (reserved decorative)
- **Sunset Flare** (`linear-gradient(125deg, #ff5a5a, #ff8a1e)`): used on exactly one element,
  the GAY-DAR side-project card's icon tile. The only gradient in the system.

### Named Rules
**The Monochrome Voice Rule.** The surface is white-and-graphite. Color enters only as
functional signal (the blue accent, a contact hue on hover, résumé green, red for
destructive). Never introduce a decorative brand color into the neutral field.

**The Single Flare Rule.** The sunset gradient appears on exactly one element: the
GAY-DAR card's icon tile. Do not reach for it anywhere else, and never apply it to text.

## 3. Typography

**Family:** Anuphan (weights 300–700), with `-apple-system, BlinkMacSystemFont, "Segoe UI",
Roboto, sans-serif` fallback so Apple devices fall back to SF Pro.

**Character:** One Thai-first humanist geometric sans (Cadson Demak) that renders Thai and
Latin at matching quality, so the bilingual content never feels seamed. It reads clean and
modern, Apple-adjacent without copying SF. Anuphan was chosen deliberately over the reflex
picks (Inter / IBM Plex / Noto Sans).

### Hierarchy
- **Display** (700, `clamp(2.6rem, 8.5vw, 5.5rem)`, `-0.04em`): The hero name. The only place
  the page raises its voice typographically; the "Boo" nickname steps to Ink-2.
- **Title** (600, `clamp(1.85rem, 4vw, 2.85rem)`): Section headings.
- **Lead** (400, `clamp(1.08rem, 2vw, 1.4rem)`, Ink-2): The hero one-liner.
- **Body** (400, `1rem`, line-height 1.6): Prose and section subs, ≤56ch.
- **Label** (600, `0.78rem`, `0.06em`, UPPERCASE, Ink-3): Side-panel block titles only.

### Named Rules
**The One Family Rule.** Anuphan carries every word. Hierarchy comes from weight
(300/400/500/600/700) and fluid scale, never from a second typeface.

**The Restrained Caps Rule.** Uppercase + tracking is allowed only on the short side-panel
block labels. Never set a heading, sentence, or section eyebrow in all caps; there are no
tracked-uppercase eyebrows on section headings.

## 4. Elevation & Motion

Flat at rest; depth is a response to interaction, not ambient decoration. Surfaces are
separated by tonal layering (Paper ground → Mist surface) plus 1px hairlines. The avatar
and the modals carry the only resting shadows.

- **Hover lift**: `translateY(-2px → -6px)` + a soft shadow on buttons, project cards, cert
  cards, chips. Easing `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out, no overshoot/bounce).
- **Blur is rationed**: `backdrop-filter` appears only on the scrolled nav and the two modal
  overlays. It is never a default surface treatment.
- **Light micro-interactions** (the "Google-doodle-but-quiet" brief): on-scroll reveals
  (fade + small translateY, staggered per group), magnetic primary CTAs, and a soft cursor
  glow. All are `pointer:fine` / non-`reduce` only, and content is fully visible by default
  so the reveals only enhance, never gate.

**The Flat-At-Rest Rule.** Every surface is flat until the cursor arrives. The avatar and
modal panels are the only elements allowed a resting shadow.

## 5. Components

- **Buttons** are pills (`980px` radius). Primary = Apple-blue fill, white text. Ghost =
  hairline border, ink text. Contact buttons are monochrome pills that warm to their signal
  hue on hover; Résumé rests in green. The modal Close is a red-on-hover ghost.
- **Skill chips**: white pill, 1px hairline, ink text; lift on hover. Display only.
- **Project cards**: white tile, 1px hairline, rounded `16px`; a rounded icon tile (the
  GAY-DAR tile carries the flare gradient), a bold label, and a small descriptor. Flat at
  rest, lifts `-5px` on hover. They open the README reader.
- **Certificate cards**: 4:3 image tile with a caption strip; lifts `-6px` and the image
  scales slightly on hover. They open the full-screen image viewer.
- **Side blocks**: white containers (Languages / Soft skills / Environment) with an
  UPPERCASE label.
- **Sticky nav**: 56px, transparent over the hero, frosted (blur + hairline) once scrolled;
  brand monogram + section anchors (hidden under 700px) + theme toggle.

### Signature Component — The Reader Modal
A centered overlay (`backdrop-filter: blur(14px)`) holding an ~860px panel on the Paper
ground with a Mist header reading "Documentation", a Close control, and an optional EN/TH
language toggle (shown only when a `_th.md` exists). Project READMEs render into it via
marked.js with full markdown styling. On mobile it fills the screen.

## 6. Do's and Don'ts

### Do
- Keep the single-page scroll calm and white, with generous section spacing and one idea per stretch.
- Keep the surface monochrome; let color in only as functional signal (blue accent, contact-hue on hover, résumé green, red for destructive).
- Stay flat at rest and lift on interaction; keep easing ease-out, no bounce.
- Set every word in Anuphan; build hierarchy with weight and fluid scale.
- Treat Thai and English as equal first-class content (UI English-primary; case studies bilingual).
- Keep content visible by default; honor `prefers-reduced-motion`; keep body contrast at WCAG AA (≥4.5:1).
- Test every breakpoint (320 / 375 / 734 / 1024 / 1440); no horizontal scroll, touch targets ≥44px.

### Don't
- Don't let it read as a generic résumé-template / CV-builder; nothing off-the-shelf.
- Don't bring back the macOS-desktop metaphor (windows, dock, menu bar, terminal cosplay) or the bug-hunt canvas.
- Don't drift toward a loud SaaS gradient page: no gradient text, no hero-metric template. The sunset flare is for the one GAY-DAR tile only.
- Don't introduce a second typeface or a decorative brand color into the neutral field.
- Don't add tracked-uppercase eyebrows above section headings, numbered section markers, or em dashes in copy.
- Don't spread `backdrop-filter` glass beyond the nav and modals, and never use a colored side-stripe border greater than 1px.
