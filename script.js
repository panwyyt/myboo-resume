document.addEventListener("DOMContentLoaded", () => {

    marked.setOptions({ breaks: true, gfm: true });

    const overlay = document.getElementById('readmeOverlay');
    const content = document.getElementById('readmeContent');
    const closeBtn = document.getElementById('readmeClose');

    let history = [];
    let currentLang = localStorage.getItem('app_lang') || 'en';
    let readmeTrigger = null;

    async function loadMarkdown(path, pushHistory = true) {
        if (pushHistory) history.push(path);

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        content.innerHTML = '<p class="loading-text">Loading...</p>';
        overlay.scrollTop = 0;

        closeBtn.innerHTML = history.length > 1 ? '[ ← ] RETURN' : '[ X ] ABORT';
        requestAnimationFrame(() => closeBtn.focus());

        try {
            let fetchPath = path;
            let thExists = false;
            let thPath = '';

            if (path.endsWith('.md')) {
                thPath = path.replace(/\.md$/i, '_th.md');
                const checkTh = await fetch(thPath).catch(() => null);
                if (checkTh && checkTh.ok) thExists = true;
            }

            const langToggle = document.getElementById('langToggle');
            if (langToggle) {
                langToggle.style.display = thExists ? 'inline-block' : 'none';
                langToggle.innerHTML = currentLang === 'en'
                    ? '[ <span style="color:var(--accent-color)">EN</span> / TH ]'
                    : '[ EN / <span style="color:var(--accent-color)">TH</span> ]';
            }

            fetchPath = (currentLang === 'th' && thExists) ? thPath : path;

            const res = await fetch(fetchPath);
            if (!res.ok) throw new Error('File not found');
            content.innerHTML = marked.parse(await res.text());

            const folder = path.substring(0, path.lastIndexOf('/') + 1);
            content.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src');
                if (src && !src.startsWith('http') && !src.startsWith('/')) {
                    img.src = folder + src;
                }
            });

            const GITHUB_REPO = 'https://github.com/panwyyt/myboo-resume/blob/main/';
            const imageExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

            content.querySelectorAll('a').forEach(a => {
                const href = a.getAttribute('href');
                if (!href) return;

                if (href.endsWith('.md') && !href.startsWith('http')) {
                    a.addEventListener('click', (e) => {
                        e.preventDefault();
                        loadMarkdown(folder + href, true);
                    });
                    a.style.cursor = 'pointer';
                } else if (!href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('#')) {
                    const isImage = imageExts.some(ext => href.toLowerCase().endsWith(ext));
                    if (!isImage) {
                        a.href = GITHUB_REPO + folder + href;
                    } else {
                        a.href = folder + href;
                    }
                    a.setAttribute('target', '_blank');
                    a.setAttribute('rel', 'noopener noreferrer');
                } else {
                    a.setAttribute('target', '_blank');
                    a.setAttribute('rel', 'noopener noreferrer');
                }
            });
        } catch (e) {
            content.innerHTML = `<p class="loading-text">⚠️ Could not load — ${e.message}</p>`;
        }
    }

    // ===== Project Card Interaction (keyboard + click) =====
    document.querySelectorAll('.project-card[data-readme]').forEach(card => {
        const openCard = () => {
            readmeTrigger = card;
            history = [];
            loadMarkdown(card.getAttribute('data-readme'), true);
        };
        card.addEventListener('click', openCard);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCard();
            }
        });
    });

    // ===== Close / Back =====
    function handleClose() {
        if (history.length > 1) {
            history.pop();
            loadMarkdown(history[history.length - 1], false);
        } else {
            history = [];
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            if (readmeTrigger) {
                readmeTrigger.focus();
                readmeTrigger = null;
            }
        }
    }

    closeBtn.addEventListener('click', handleClose);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) handleClose();
    });

    // Focus trap for readme modal
    overlay.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !overlay.classList.contains('active')) return;
        const focusable = [...overlay.querySelectorAll('button:not([disabled]), a[href], [tabindex="0"]')]
            .filter(el => el.offsetParent !== null && getComputedStyle(el).display !== 'none');
        if (focusable.length < 2) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    // ===== Language Toggle =====
    const langToggle = document.getElementById('langToggle');
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'th' : 'en';
        localStorage.setItem('app_lang', currentLang);
        if (history.length > 0) loadMarkdown(history[history.length - 1], false);
    });

    // ===== Theme Toggle =====
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('toggleIcon');
    const html = document.documentElement;

    const saved = localStorage.getItem('theme');
    if (saved) {
        html.setAttribute('data-theme', saved);
        icon.textContent = saved === 'light' ? '🌙' : '☀️';
    }

    toggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        icon.textContent = next === 'light' ? '🌙' : '☀️';
        localStorage.setItem('theme', next);
    });

    // Show all portfolio cards
    document.querySelectorAll('.projects-grid .project-card').forEach(card => {
        card.style.display = '';
        card.style.opacity = '1';
    });

    // ===== Certifications Viewer =====
    const viewer = document.getElementById('imageViewer');
    const viewerImg = document.getElementById('viewerImage');
    const viewerCaption = document.getElementById('viewerCaption');
    const viewerClose = document.getElementById('viewerClose');
    let certTrigger = null;

    if (viewer && viewerImg && viewerClose) {
        const openViewer = (card) => {
            certTrigger = card;
            const imgSrc = card.getAttribute('data-img');
            const caption = card.querySelector('.cert-overlay span')?.textContent || '';
            viewerImg.src = imgSrc;
            viewerImg.alt = caption;
            viewerImg.removeAttribute('aria-hidden');
            viewerCaption.textContent = caption;
            viewer.classList.add('active');
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => viewerClose.focus());
        };

        document.querySelectorAll('.cert-card').forEach(card => {
            card.addEventListener('click', () => openViewer(card));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openViewer(card);
                }
            });
        });

        const closeViewer = () => {
            viewer.classList.remove('active');
            document.body.style.overflow = '';
            viewerImg.setAttribute('aria-hidden', 'true');
            if (certTrigger) {
                certTrigger.focus();
                certTrigger = null;
            }
        };

        viewerClose.addEventListener('click', closeViewer);
        viewer.addEventListener('click', (e) => { if (e.target === viewer) closeViewer(); });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && viewer.classList.contains('active')) closeViewer();
        });
    }
});
