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
        content.innerHTML = '<p class="loading-text">Loading…</p>';
        overlay.scrollTop = 0;

        closeBtn.innerHTML = history.length > 1 ? '← Back' : 'Close';
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
                    ? '[ <span style="color:var(--accent)">EN</span> / TH ]'
                    : '[ EN / <span style="color:var(--accent)">TH</span> ]';
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

    const SVG_SUN  = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    const SVG_MOON = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    // Sync icon with whatever theme is active (the <head> script applies the saved theme pre-paint).
    const activeTheme = html.getAttribute('data-theme') || 'light';
    icon.innerHTML = activeTheme === 'light' ? SVG_MOON : SVG_SUN;

    toggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        icon.innerHTML = next === 'light' ? SVG_MOON : SVG_SUN;
        localStorage.setItem('theme', next);
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
