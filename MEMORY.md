# 🧠 Project Memory & AI Instruction Guidelines

## 1. 🎯 Project Vision
This repository houses the personal brand website, resume, and technical portfolio for **Panthawit Chumthong** (Software Tester & QA Professional). 
The goal is to maintain a professional, high-end "Linear Minimalist" aesthetic that is clean, balanced, and premium. It showcases end-to-end quality assurance skills, ranging from manual test design to complex automation pipelines.

## 2. 🏗 Content Structure
The site uses a dynamic, client-side approach to render blog/portfolio content without a backend or build step:
- **Project Directories**: Each portfolio piece or blog post is stored in its own dedicated directory (e.g., `/appium`, `/playwright`, `/maestro`).
- **Markdown Files**: The core content for each project is written in a standard Markdown file, strictly named `README.md` (or `readme.md`).
- **Assets**: Images, GIFs, and scripts specific to a post are stored within the project's directory (e.g., `/maestro/assets/`).
- **Dynamic Rendering**: When a user clicks a project card, `script.js` fetches the respective `README.md` file and renders it into a fullscreen minimalist terminal modal using `marked.js`.
- **Multi-Language Support**: The site supports Thai translations. If a `README_th.md` exists in a project directory, a language toggle (EN/TH) will automatically appear in the project modal.

## 3. ⚙️ Tech Stack
Despite having the feel of a complex static site, **this project does NOT use Next.js, Astro, Hugo, or Tailwind**. It is built with raw, lightweight fundamentals to ensure zero build-time and maximum longevity:
- **Core Structure**: Vanilla HTML5.
- **Styling**: Vanilla CSS3 using CSS Variables. It does not use Tailwind. 
- **Logic & Markdown**: Vanilla JavaScript (ES6) with `marked.js` imported via CDN for runtime Markdown-to-HTML compilation.
- **Hosting**: Designed to be hosted on any static file server (e.g., GitHub Pages).

## 4. 🎨 Design System
The site follows a **"Linear Minimalist"** design philosophy — focusing on clarity, whitespace, and high-end professional balance.
- **Typography**: Uses **IBM Plex Sans Thai** (from Google Fonts) as the primary typeface for both English and Thai text, providing a modern and highly readable feel across the entire site.
- **Color Palette**: Uses a curated, neutral minimalist palette with subtle highlights for interactive elements.
- **Layout Evolution**: The "Experience" section uses a two-column grid layout:
  - **Left Column**: Professional timeline (Chrono Logs).
  - **Right Column (Side Panel)**: Supplementary info including **Languages**, **Soft Skills**, and **Environment** (Tools/OS).
- **Key UI Components**:
  - `project-card`: Clean, white-space focused grid items.
  - `language-toggle`: A dynamic button inside the project modal that switches between EN and TH content.
  - `readme-overlay`: A fullscreen, glassmorphism modal with a clean terminal-inspired layout.

## 5. ✍️ Editorial Guidelines ('Voice')
When generating or modifying content (`README.md` files), future AI agents MUST adhere strictly to the following tone:
- **Tone**: Casual, friendly, enthusiastic, yet deeply professional ("เป็นกันเองแต่สุภาพ").
- **Perspective**: First-person narrative ("I built this", "I found a snag...").
- **Storytelling (Step-by-Step)**: Frame technical achievements as a journey. Break down complex projects into logical steps (e.g., Step 1: Playground, Step 2: Scripting, Step 3: Action).
- **The "Aha!" Moment**: Highlight specific problem-solving instances (e.g., how a bug was solved or a difficult locator was found) to show technical maturity.
- **Formatting Constraints**: 
  - Use GitHub-style Markdown. 
  - Images should be organized as single blocks or balanced grids (`<p align="center">`).
  - Use emojis to add personality and break up white space.

## 6. 🔍 SEO & Metadata
- **Global SEO**: Handled entirely inside the `<head>` of `index.html`. Make sure `title` and standard `<meta name="description">` tags are present.
- **Post Metadata**: Because this is a native HTML site rendering Markdown via JS, there is no Frontmatter (YAML) in the `.md` files. 
- **Headings Strategy**: Each `README.md` must start with a single `# H1_Title_Here` focusing on the primary keyword (e.g., `# 🎼 Maestro: Next-Gen Mobile UI Testing`), followed by standard `## H2` sub-sections.

## 7. 🚀 Publication Workflow
To add a **new portfolio/blog post**, an AI Agent must follow these exact steps:
1. **Create the Directory**: Create a new folder in the root directory (e.g., `./cypress/`).
2. **Add Assets**: Add any evidence (Images/GIFs) to a folder inside the new directory (e.g., `./cypress/assets/`).
3. **Write the Content**: Draft the `README.md` inside the new folder following the Editorial Guidelines.
4. **Update `index.html` (Card)**: Add a new `<div class="project-card" data-readme="./cypress/README.md">` inside the `.projects-grid`. Use a relevant emoji for the `<span class="p-icon">` and assign an appropriate `<span class="p-tag">`.
5. **Update `index.html` (Skills)**: If a newly learned technology was used, add it into the `<div class="skills-track">` lists so the infinite marquee updates.
6. **Verify Pagination**: The site automatically paginates every 6 cards via `script.js`. No manual offset coding is required.

## 8. 📝 Additional AI Rules
- **Image Links**: `script.js` handles relative paths. You can safely write `![Alt Text](./assets/image.png)` in the markdown file and the script will automatically resolve the path correctly.
- **Link Targeting**: External links in the markdown are automatically coerced to open in a new tab (`_blank`) by the parser script.
- **Strict Prohibition**: Do **not** attempt to run `npm install`, add `package.json`, or transform the site into a Node.js/Next.js/React app unless explicitly ordered by the user with manual confirmation. The Vanilla JS setup is intentional.
