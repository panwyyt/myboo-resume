document.addEventListener("DOMContentLoaded", () => {

    marked.setOptions({ breaks: true, gfm: true });

    const overlay = document.getElementById('readmeOverlay');
    const content = document.getElementById('readmeContent');
    const closeBtn = document.getElementById('readmeClose');

    // History stack for back navigation
    let history = [];

    // Check saved lang preference
    let currentLang = localStorage.getItem('app_lang') || 'en';

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
            let fetchPath = path;
            let thExists = false;
            let thPath = '';

            // Handle TH translation fallback
            if (path.endsWith('.md')) {
                thPath = path.replace(/\.md$/i, '_th.md');
                const checkTh = await fetch(thPath).catch(() => null);
                if (checkTh && checkTh.ok) {
                    thExists = true;
                }
            }
            
            const langToggle = document.getElementById('langToggle');
            if (langToggle) {
                langToggle.style.display = thExists ? 'inline-block' : 'none';
                langToggle.innerHTML = currentLang === 'en' ? '[ <span style="color:var(--accent)">EN</span> / TH ]' : '[ EN / <span style="color:var(--accent)">TH</span> ]';
            }

            if (currentLang === 'th' && thExists) {
                fetchPath = thPath;
            } else {
                fetchPath = path;
            }

            const res = await fetch(fetchPath);
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

    // ===== Language Toggle =====
    const langToggle = document.getElementById('langToggle');
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'th' : 'en';
        localStorage.setItem('app_lang', currentLang);
        
        // Reload current page without pushing history
        if (history.length > 0) {
            loadMarkdown(history[history.length - 1], false);
        }
    });

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
    // All projects display on single page - no pagination
    const projectCards = Array.from(document.querySelectorAll('.projects-grid .project-card'));
    projectCards.forEach(card => {
        card.style.display = '';
        card.style.opacity = '1';
    });


    // ===== Certifications Viewer =====
    const viewer = document.getElementById('imageViewer');
    const viewerImg = document.getElementById('viewerImage');
    const viewerCaption = document.getElementById('viewerCaption');
    const viewerClose = document.getElementById('viewerClose');

    if (viewer && viewerImg && viewerClose) {
        document.querySelectorAll('.cert-card').forEach(card => {
            card.addEventListener('click', () => {
                const imgSrc = card.getAttribute('data-img');
                const overlaySpan = card.querySelector('.cert-overlay span');
                const caption = overlaySpan ? overlaySpan.textContent : '';
                
                viewerImg.src = imgSrc;
                viewerCaption.innerText = caption;
                viewer.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeViewer = () => {
            viewer.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (viewerClose) viewerClose.addEventListener('click', closeViewer);
        viewer.addEventListener('click', (e) => {
            if (e.target === viewer) closeViewer();
        });

        // Also close on Escape
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && viewer.classList.contains('active')) {
                closeViewer();
            }
        });
    }

});
