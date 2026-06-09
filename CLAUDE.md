# CLAUDE.md

Guidance for Claude Code / AI agents working in this repository.
> The full project playbook (vision, content structure, tech stack, design system,
> editorial voice, SEO, publication workflow) lives in **`MEMORY.md`** at the repo
> root. Read it before making changes. This file adds the user's working preferences.
> Design context also lives in **`PRODUCT.md`** (strategy/voice) and **`DESIGN.md`**
> (visual system / tokens) — read them before any UI work.

## 0. 💖 How to address the user
- Always address the user, **Panthawit "Boo"**, as **"ที่รัก"** in every reply.
- Reply in **Thai by default** (the user communicates in Thai).

## 1. 🧠 Memory discipline — do this EVERY time a task is finished
When you finish **any** task (งานเสร็จ), before ending your turn, **record what you learned**:
- What changed and **why**, decisions made, gotchas discovered, and any new conventions.
- Write it where it belongs: update this repo's **`MEMORY.md`** for project-level knowledge,
  and/or your persistent memory. Keep entries concise and factual.
- Convert relative dates to absolute (e.g. "today" → the actual date).
- This is **mandatory, not optional.** Treat task completion as the trigger to update memory.

## 2. 🚫 Hard constraints (from `MEMORY.md`)
- Stack is **intentionally Vanilla**: HTML5 + CSS3 (CSS variables, **no Tailwind**) +
  Vanilla JS (ES6) + `marked.js` via CDN. **No** Next.js / React / Astro / Hugo, **no** build step.
- **Do not** add a root `package.json` or run `npm install` at the repo root.
  (The `/playwright` subfolder is the only place with its own npm project — that's fine.)
- Design language is **"Linear Minimalist"**, font **IBM Plex Sans Thai**.

## 3. 🎨 Use the impeccable skill for design/UI work (don't wait to be told)
This project uses the **impeccable** design skill (installed at `.claude/skills/impeccable/`).
For **any** frontend / UI / design work — building, redesigning, critiquing, auditing,
polishing, layout, typography, color, motion, accessibility, copy — **use impeccable by
default**. The user should NOT have to select the skill each time; treat it as the standing
way we do design here.

- On a design/UI task, run the matching command yourself: `/impeccable <command> [target]`
  (e.g. `critique`, `audit`, `polish`, `layout`, `typeset`, `colorize`, `animate`), or
  `/impeccable` with no argument to see context-aware recommendations.
- Project context is already set up: `PRODUCT.md`, `DESIGN.md`, and `.impeccable/design.json`
  exist, and live mode is configured (`.impeccable/live/config.json` → `index.html`).
  Honor `DESIGN.md` for visual decisions and `PRODUCT.md` for strategy/voice.
- Quick local scan without the full flow: `npx impeccable detect index.html style.css`.

## 4. 🧱 Project at a glance
Static QA/Software-Tester portfolio. `index.html` + `style.css` + `script.js`.
Each tool lives in its own folder (`/selenium`, `/playwright`, `/appium`, `/maestro`,
`/postman`, `/jmeter`, `/sql`, `/manual-testing`) with a `README.md` (+ optional
`README_th.md` → EN/TH toggle). Clicking a `.project-card` fetches the README and
renders it via marked.js into the fullscreen terminal-style `readme-overlay` modal.
`script.js` paginates cards (6/page) and resolves relative image paths automatically.
To add a new post, follow the **Publication Workflow** section in `MEMORY.md`.
