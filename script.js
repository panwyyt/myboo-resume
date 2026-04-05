document.addEventListener("DOMContentLoaded", () => {

    marked.setOptions({ breaks: true, gfm: true });

    const overlay = document.getElementById('readmeOverlay');
    const content = document.getElementById('readmeContent');
    const closeBtn = document.getElementById('readmeClose');

    // History stack for back navigation
    let history = [];

    // Reusable function to load and render any .md file
    async function loadMarkdown(path, pushHistory = true) {
        if (pushHistory && history.length > 0) {
            // save current scroll position isn't needed, we scroll to top anyway
        }
        if (pushHistory) {
            history.push(path);
        }

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        content.innerHTML = '<p class="loading-text">Loading...</p>';
        overlay.scrollTop = 0;

        // Update close button to show Back if we have history
        if (history.length > 1) {
            closeBtn.innerHTML = '[ ← ] RETURN';
        } else {
            closeBtn.innerHTML = '[ X ] ABORT';
        }

        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error('File not found');
            content.innerHTML = marked.parse(await res.text());

            // Fix relative image paths
            const folder = path.substring(0, path.lastIndexOf('/') + 1);
            content.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src');
                if (src && !src.startsWith('http') && !src.startsWith('/')) {
                    img.src = folder + src;
                }
            });

            // Handle links
            const GITHUB_REPO = 'https://github.com/panwyyt/myboo-resume/blob/main/';
            const imageExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

            content.querySelectorAll('a').forEach(a => {
                const href = a.getAttribute('href');
                if (!href) return;

                // Internal .md links → open in same overlay
                if (href.endsWith('.md') && !href.startsWith('http')) {
                    a.addEventListener('click', (e) => {
                        e.preventDefault();
                        const resolvedPath = folder + href;
                        loadMarkdown(resolvedPath, true);
                    });
                    a.style.cursor = 'pointer';
                } else if (!href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('#')) {
                    // Local file links (e.g. .robot) → rewrite to GitHub repo
                    const isImage = imageExts.some(ext => href.toLowerCase().endsWith(ext));
                    if (!isImage) {
                        a.href = GITHUB_REPO + folder + href;
                    } else {
                        a.href = folder + href;
                    }
                    a.setAttribute('target', '_blank');
                    a.setAttribute('rel', 'noopener noreferrer');
                } else {
                    // External links → new tab
                    a.setAttribute('target', '_blank');
                    a.setAttribute('rel', 'noopener noreferrer');
                }
            });
        } catch (e) {
            content.innerHTML = `<p class="loading-text">⚠️ Could not load — ${e.message}</p>`;
        }
    }

    // ===== Project Card Click =====
    document.querySelectorAll('.project-card[data-readme]').forEach(card => {
        card.addEventListener('click', () => {
            history = []; // Reset history for new project
            loadMarkdown(card.getAttribute('data-readme'), true);
        });
    });

    // Close / Back
    function handleClose() {
        if (history.length > 1) {
            // Go back
            history.pop();
            const prev = history[history.length - 1];
            loadMarkdown(prev, false);
        } else {
            // Close overlay
            history = [];
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    closeBtn.addEventListener('click', handleClose);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') handleClose(); });

    // ===== Theme Toggle =====
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('toggleIcon');
    const html = document.documentElement;

    // Check saved preference
    const saved = localStorage.getItem('theme');
    if (saved) {
        html.setAttribute('data-theme', saved);
        icon.textContent = saved === 'light' ? '🌙' : '☀️';
    }

    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        icon.textContent = next === 'light' ? '🌙' : '☀️';
        localStorage.setItem('theme', next);
    });

    // ===== Portfolio Pagination =====
    const itemsPerPage = 6;
    const projectCards = Array.from(document.querySelectorAll('.projects-grid .project-card'));
    const paginationContainer = document.getElementById('portfolioPagination');
    
    if (projectCards.length > itemsPerPage && paginationContainer) {
        const totalPages = Math.ceil(projectCards.length / itemsPerPage);
        
        // Show specific page
        const showPage = (pageIndex) => {
            const start = pageIndex * itemsPerPage;
            const end = start + itemsPerPage;
            
            projectCards.forEach((card, index) => {
                if (index >= start && index < end) {
                    card.style.display = '';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    card.style.display = 'none';
                }
            });
        };

        // Create cyber buttons
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('cyber-pg-btn');
            dot.textContent = `PAGE_0${i + 1}`;
            dot.setAttribute('aria-label', `Page ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                showPage(i);
                // Update active button
                document.querySelectorAll('.cyber-pg-btn').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
            paginationContainer.appendChild(dot);
        }
        
        // Init first page
        projectCards.forEach(c => {
            c.style.transition = 'opacity 0.3s ease';
        });
        showPage(0);
    }

});
