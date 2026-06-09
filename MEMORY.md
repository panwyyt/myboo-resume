# 🧠 Project Memory & AI Instruction Guidelines

## 1. 🎯 Project Vision
This repository houses the personal brand website, resume, and technical portfolio for **Panthawit Chumthong** (Software Tester & QA Professional). 
The goal is a clean, premium **Apple-style** experience: a calm, white-default single-page résumé where the work, not the chrome, carries the weight. It showcases end-to-end quality assurance skills, ranging from manual test design to complex automation pipelines.

> **Redesign note (2026-06-09):** The site was rebuilt from the short-lived macOS-desktop metaphor (draggable windows, dock, menu bar, bug-hunt canvas) into an Apple-style single-page scroll. White by default + dark toggle, font **Anuphan**, light scroll-reveal / magnetic-CTA micro-interactions (no canvas), responsive-first. **`DESIGN.md` and `.impeccable/design.json` are the source of truth for the visual system** — read them before any UI change.

## 2. 🏗 Content Structure
The site uses a dynamic, client-side approach to render blog/portfolio content without a backend or build step:
- **Project Directories**: Each portfolio piece or blog post is stored in its own dedicated directory (e.g., `/appium`, `/playwright`, `/maestro`).
- **Markdown Files**: The core content for each project is written in a standard Markdown file, strictly named `README.md` (or `readme.md`).
- **Assets**: Images, GIFs, and scripts specific to a post are stored within the project's directory (e.g., `/maestro/assets/`).
- **Dynamic Rendering**: When a user clicks a project card, `script.js` fetches the respective `README.md` file and renders it into a centered, Apple-style reader modal (`#readmeOverlay`) using `marked.js`.
- **Multi-Language Support**: The site supports Thai translations. If a `README_th.md` exists in a project directory, a language toggle (EN/TH) will automatically appear in the project modal.

## 3. ⚙️ Tech Stack
Despite having the feel of a complex static site, **this project does NOT use Next.js, Astro, Hugo, or Tailwind**. It is built with raw, lightweight fundamentals to ensure zero build-time and maximum longevity:
- **Core Structure**: Vanilla HTML5.
- **Styling**: Vanilla CSS3 using CSS Variables. It does not use Tailwind. 
- **Logic & Markdown**: Vanilla JavaScript (ES6) with `marked.js` imported via CDN for runtime Markdown-to-HTML compilation.
- **Hosting**: Designed to be hosted on any static file server (e.g., GitHub Pages).

## 4. 🎨 Design System
The site is a single-page scroll with a **dark "Aurora Workbench"** look by default (set 2026-06-10): a grainy aurora gradient with neon multicolor accents. **Full tokens, rules, and component specs live in `DESIGN.md` + `.impeccable/design.json` (source of truth).**
- **Typography**: Uses **Anuphan** (Google Fonts, Thai + Latin) as the single typeface; hierarchy from weight (300–700) + fluid `clamp()` scale, with `-apple-system` fallback. (Replaced IBM Plex Sans Thai in the 2026-06-09 redesign.)
- **Theme**: **Dark by default** (`data-theme="dark"`) on a grainy aurora gradient (orange/magenta/blue/purple radial glows over `#08070d` + film-grain `body::before`). A clean white "Apple" theme is the toggle fallback. Preference persists in `localStorage`, applied pre-paint by a tiny inline `<head>` script.
- **Color**: Dark default uses a **neon palette as solid color** (no gradient text) — orange `#ff8a3c` (primary), magenta `#ff5dbe`, yellow `#ffd23f`, red `#ff5a5a`, periwinkle `#8c93ff`, cyan `#34dceb`. Each section title + each hero focus-area item gets its own neon hue; body text stays light/high-contrast. Light fallback is monochrome + Apple blue `#0071e3`. The one reserved sunset gradient stays on the GAY-DAR card.
- **Page order**: sticky nav → hero → Work (project cards) → Skills → Experience → Certifications → Contact → footer.
- **Layout**: The "Experience" section keeps a two-column grid (≥768px): left = timeline (`.timeline`), right = side panel (`.side-block` × 3 — Languages / Soft skills / Environment); single column on mobile.
- **Motion**: light, Apple-grade micro-interactions — on-scroll reveals (content visible by default), magnetic primary CTAs, soft cursor glow (all `pointer:fine` / non-`reduce`). No canvas, no OS-desktop chrome.
- **Key UI Components**:
  - `project-card`: white tile with `.p-icon` (inline SVG or `img.tool-logo`), `.file-label`, `.file-sub`; opens the README reader.
  - `cert-card`: 4:3 image tile (`data-img`) that opens the full-screen image viewer (`#imageViewer`).
  - `#langToggle`: dynamic EN/TH button inside the reader modal (appears only when a `_th.md` exists).
  - `#readmeOverlay`: centered, Apple-style reader modal (blur on overlay only); fills the screen on mobile.

## 5. ✍️ Editorial Guidelines ('Voice') — updated 2026-06-10
The portfolio tool READMEs are professional **capability lists**, NOT narrated practice-project stories. The previous cutesy/storytelling voice was retired by the user ("ดูไม่โปร / กิ๊กก๊อก"). When writing or editing a tool README:
- **Format**: H1 = tool name + a one-line role, then a `## สิ่งที่ทำได้` (Capabilities) section of concise, specific bullets describing what Boo can actually *do* with the tool. Add `**Stack:**` and `**ใบรับรอง:**` lines where relevant.
- **Tone**: Professional, measured, first-person but restrained — an experienced engineer listing competencies, not a beginner narrating a journey.
- **Be specific & honest**: name real techniques/results (POM, date-picker overwrite fix, JMeter error-rate 19.92%→0.00% over 25k requests). Do NOT fabricate client/production work; demo-app exploration is fine but don't dress it up as paid delivery.
- **Cut**: emojis, cutesy metaphors ("บอสใหญ่", "สนามเด็กเล่น"), "ยินดีต้อนรับ / ขอบคุณที่ติดตาม" framing, "practice/ฝึกฝน" disclaimers, exclamation spam, and images/GIFs inside tool READMEs (keep the prose lean).
- Markdown: GitHub-flavored. No em dashes.
- **Be specific & research-backed**: a too-thin/generic list still reads as "ไม่โปร". Lists should be reasonably rich and use correct current industry terminology (research the tool's real capabilities first). Keep ~9-12 concrete bullets per tool.
- **Status (2026-06-10):** All tool `README_th.md` rewritten as research-backed capability lists. A new **AI Engineering** card was added (`ai-engineering/`, both `README.md` + `README_th.md`, covering MCP, Agent Skills/SKILL.md, CLAUDE.md/GEMINI.md/AGENTS.md, context engineering, agentic workflows, agentic QA). English `README.md` for the original 8 tools is still old narrated+image style, pending conversion.

## 6. 🔍 SEO & Metadata
- **Global SEO**: Handled entirely inside the `<head>` of `index.html`. Make sure `title` and standard `<meta name="description">` tags are present.
- **Post Metadata**: Because this is a native HTML site rendering Markdown via JS, there is no Frontmatter (YAML) in the `.md` files. 
- **Headings Strategy**: Each `README.md` must start with a single `# H1_Title_Here` focusing on the primary keyword (e.g., `# 🎼 Maestro: Next-Gen Mobile UI Testing`), followed by standard `## H2` sub-sections.

## 7. 🚀 Publication Workflow
To add a **new portfolio/blog post**, an AI Agent must follow these exact steps:
1. **Create the Directory**: Create a new folder in the root directory (e.g., `./cypress/`).
2. **Add Assets**: Add any evidence (Images/GIFs) to a folder inside the new directory (e.g., `./cypress/assets/`).
3. **Write the Content**: Draft the `README.md` inside the new folder following the Editorial Guidelines.
4. **Update `index.html` (Card)**: Add a new `<div class="project-card" data-readme="./cypress/README.md" role="button" tabindex="0" aria-label="Open Cypress case study">` inside the `.projects-grid`. Provide a `<span class="p-icon">` (inline SVG using `currentColor` stroke, or `<img class="tool-logo">`), a `<span class="file-label">`, and a short `<span class="file-sub">` descriptor.
5. **Update `index.html` (Skills)**: If a newly learned technology was used, add a `<span class="skill-chip">Cypress</span>` inside `.skills-grid` (a wrapping flex of pills — there is no marquee).
6. **No pagination**: All project cards render in a single responsive `.projects-grid` (`auto-fill, minmax(...)`). There is no pagination to update.

## 8. 📝 Additional AI Rules
- **Image Links**: `script.js` handles relative paths. You can safely write `![Alt Text](./assets/image.png)` in the markdown file and the script will automatically resolve the path correctly.
- **Link Targeting**: External links in the markdown are automatically coerced to open in a new tab (`_blank`) by the parser script.
- **Strict Prohibition**: Do **not** attempt to run `npm install`, add `package.json`, or transform the site into a Node.js/Next.js/React app unless explicitly ordered by the user with manual confirmation. The Vanilla JS setup is intentional.
