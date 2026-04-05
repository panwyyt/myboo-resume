# 🧠 Project Memory & AI Instruction Guidelines

## 1. 🎯 Project Vision
This repository houses the personal brand website, resume, and technical portfolio for **Panthawit Chumthong** (Software Tester & QA Professional). 
The goal is to maintain a professional, high-tech, yet highly accessible and friendly personal site. It showcases end-to-end quality assurance skills, ranging from manual test design to complex automation pipelines.

## 2. 🏗 Content Structure
The site uses a dynamic, client-side approach to render blog/portfolio content without a backend or build step:
- **Project Directories**: Each portfolio piece or blog post is stored in its own dedicated directory (e.g., `/appium`, `/playwright`, `/maestro`).
- **Markdown Files**: The core content for each project is written in a standard Markdown file, strictly named `README.md` (or `readme.md`).
- **Assets**: Images, GIFs, and scripts specific to a post are stored within the project's directory (e.g., `/maestro/assets/`).
- **Dynamic Rendering**: When a user clicks a project card, `script.js` fetches the respective `README.md` file and renders it into a fullscreen terminal-style overlay using `marked.js`.

## 3. ⚙️ Tech Stack
Despite having the feel of a complex static site, **this project does NOT use Next.js, Astro, Hugo, or Tailwind**. It is built with raw, lightweight fundamentals to ensure zero build-time and maximum longevity:
- **Core Structure**: Vanilla HTML5.
- **Styling**: Vanilla CSS3 using CSS Variables. It does not use Tailwind. 
- **Logic & Markdown**: Vanilla JavaScript (ES6) with `marked.js` imported via CDN for runtime Markdown-to-HTML compilation.
- **Hosting**: Designed to be hosted on any static file server (e.g., GitHub Pages).

## 4. 🎨 Design System
The site employs a "Cyber/Terminal" aesthetic combined with the **Solarized Eye-Care Palette**.
- **Themes**: Supports dynamic switching between `Solarized Dark` and `Solarized Light` via `data-theme` variables in `style.css`.
- **Typography**: 
  - `Share Tech Mono`: Used for headers, terminal text, buttons, and system logs to enforce the sci-fi operator vibe.
  - `Rajdhani`: Used for body text to maintain readability while keeping a futuristic cut.
- **Key UI Components**:
  - `project-card`: The interactive grid items in the portfolio section. Features hover animations and pulsing icons.
  - `cyber-pagination`: Terminal-style pagination buttons at the bottom of the portfolio grid (e.g., `[ PAGE_01 ]`).
  - `skills-marquee`: Infinite horizontal scrolling tape of skills.
  - `sys-timeline`: Resume/Chronology nodes with vertical lines and markers.
  - `readme-overlay`: A fullscreen, glassmorphism "Terminal" that pops up to render `.md` contents.

## 5. ✍️ Editorial Guidelines ('Voice')
When generating or modifying content (`README.md` files), future AI agents MUST adhere strictly to the following tone:
- **Tone**: Casual, friendly, enthusiastic, yet deeply professional. Use conversational English (or Thai if requested).
- **Perspective**: First-person perspective ("I built this", "I wanted to test...").
- **Emojis**: Heavily encouraged! Use them in headers and throughout the body to break up text and add personality (e.g., 🚀, 🌟, 📌, 🤖).
- **Formatting Constraints**: 
  - Never write boring "Wikipedia-style" technical manuals.
  - Frame technical achievements as stories or challenges (e.g., "The iOS Challenge", "Why I Added X to My Toolkit").
  - Use GitHub-style Markdown. Always caption images using italics (`*(This is a caption)*`).

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
