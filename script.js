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

    // Show all portfolio cards (no pagination in OS layout)
    document.querySelectorAll('.projects-grid .project-card').forEach(card => {
        card.style.display = '';
        card.style.removeProperty('opacity');
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

// ═══════════════════════════════════════════════════════════
// OS WINDOW MANAGER
// ═══════════════════════════════════════════════════════════
(function () {
    'use strict';

    let zTop = 200;

    function bringToFront(win) {
        win.style.zIndex = ++zTop;
        document.querySelectorAll('.app-window').forEach(w => w.classList.remove('is-focused'));
        win.classList.add('is-focused');
    }

    // ── Draggable windows ──
    document.querySelectorAll('.app-window').forEach(win => {
        const titlebar = win.querySelector('.window-titlebar');
        if (!titlebar) return;

        let dragging = false, ox = 0, oy = 0;

        titlebar.addEventListener('mousedown', e => {
            if (e.target.classList.contains('tl')) return;
            e.preventDefault();
            dragging = true;
            const rect = win.getBoundingClientRect();
            ox = e.clientX - rect.left;
            oy = e.clientY - rect.top;
            bringToFront(win);
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', e => {
            if (!dragging) return;
            let nx = e.clientX - ox;
            let ny = e.clientY - oy;
            // Clamp: keep titlebar accessible
            nx = Math.max(-win.offsetWidth + 100, Math.min(window.innerWidth - 60, nx));
            ny = Math.max(30, Math.min(window.innerHeight - 40, ny));
            win.style.left   = nx + 'px';
            win.style.top    = ny + 'px';
            win.style.right  = 'auto';
            win.style.bottom = 'auto';
        });

        document.addEventListener('mouseup', () => {
            if (dragging) {
                dragging = false;
                document.body.style.userSelect = '';
            }
        });

        // Touch drag support
        titlebar.addEventListener('touchstart', e => {
            if (e.target.classList.contains('tl')) return;
            const t = e.touches[0];
            const rect = win.getBoundingClientRect();
            dragging = true;
            ox = t.clientX - rect.left;
            oy = t.clientY - rect.top;
            bringToFront(win);
        }, { passive: true });

        document.addEventListener('touchmove', e => {
            if (!dragging) return;
            const t = e.touches[0];
            let nx = Math.max(0, Math.min(window.innerWidth - 60, t.clientX - ox));
            let ny = Math.max(30, Math.min(window.innerHeight - 40, t.clientY - oy));
            win.style.left = nx + 'px';
            win.style.top  = ny + 'px';
            win.style.right = 'auto';
        }, { passive: true });

        document.addEventListener('touchend', () => { dragging = false; });

        win.addEventListener('mousedown', () => bringToFront(win));
    });

    // ── Traffic light actions ──
    document.querySelectorAll('.tl').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const win    = btn.closest('.app-window');
            const action = btn.dataset.action;
            const winId  = win.id;
            const dot    = document.querySelector(`.dock-icon[data-target="${winId}"] .dock-dot`);

            if (action === 'close' || action === 'minimize') {
                win.classList.add('is-minimized');
                if (dot) dot.classList.remove('visible');
            } else if (action === 'maximize') {
                if (win.dataset.prevGeom) {
                    const g = JSON.parse(win.dataset.prevGeom);
                    win.style.left   = g.l;
                    win.style.top    = g.t;
                    win.style.width  = g.w;
                    win.style.height = g.h;
                    win.style.right  = 'auto';
                    win.style.bottom = 'auto';
                    delete win.dataset.prevGeom;
                } else {
                    win.dataset.prevGeom = JSON.stringify({
                        l: win.style.left   || (win.offsetLeft  + 'px'),
                        t: win.style.top    || (win.offsetTop   + 'px'),
                        w: win.style.width  || (win.offsetWidth + 'px'),
                        h: win.style.height || (win.offsetHeight + 'px'),
                    });
                    win.style.left   = '40px';
                    win.style.top    = '38px';
                    win.style.right  = '40px';
                    win.style.bottom = '90px';
                    win.style.width  = '';
                    win.style.height = '';
                }
            }
        });
    });

    // ── Dock icons → show/focus window ──
    document.querySelectorAll('.dock-icon[data-target]').forEach(btn => {
        const winId = btn.dataset.target;
        const dot   = btn.querySelector('.dock-dot');

        // Mark all as visible initially
        if (dot) dot.classList.add('visible');

        btn.addEventListener('click', () => {
            const win = document.getElementById(winId);
            if (!win) return;

            if (win.classList.contains('is-minimized')) {
                win.classList.remove('is-minimized');
                if (dot) dot.classList.add('visible');
            }
            bringToFront(win);
        });
    });

    // ── Dock magnification ──
    const dock      = document.querySelector('.dock');
    const dockIcons = document.querySelectorAll('.dock-icon');
    if (dock) {
        dock.addEventListener('mousemove', e => {
            dockIcons.forEach(icon => {
                const r    = icon.getBoundingClientRect();
                const cx   = r.left + r.width / 2;
                const dist = Math.abs(e.clientX - cx);
                const scale = dist < 90 ? 1 + (1 - dist / 90) * 0.55 : 1;
                const lift  = dist < 90 ? -(1 - dist / 90) * 16 : 0;
                icon.style.transform = `scale(${scale.toFixed(3)}) translateY(${lift.toFixed(1)}px)`;
            });
        });
        dock.addEventListener('mouseleave', () => {
            dockIcons.forEach(icon => { icon.style.transform = ''; });
        });
    }

    // ── Window entry animation (staggered) ──
    const windows = [...document.querySelectorAll('.app-window')];
    windows.forEach((win, i) => {
        win.style.zIndex   = 100 + i;
        win.style.opacity  = '0';
        win.style.transform = 'scale(0.90) translateY(16px)';
        win.style.transition = 'none';
        setTimeout(() => {
            win.style.transition = 'opacity 0.45s ease-out, transform 0.45s cubic-bezier(0.22,1,0.36,1)';
            win.style.opacity    = '1';
            win.style.transform  = 'scale(1) translateY(0)';
        }, 250 + i * 100);
    });
    // Clear inline transforms after all windows open so CSS hover still works
    setTimeout(() => {
        windows.forEach(win => {
            if (!win.classList.contains('is-minimized')) {
                win.style.transform  = '';
                win.style.transition = '';
            }
        });
    }, 250 + windows.length * 100 + 500);

    // ── Menu bar clock ──
    const clockEl = document.getElementById('menuTime');
    function tick() {
        if (!clockEl) return;
        clockEl.textContent = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit'
        });
    }
    tick();
    setInterval(tick, 1000);

}());
