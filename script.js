document.addEventListener("DOMContentLoaded", () => {

    marked.setOptions({ breaks: true, gfm: true });

    const overlay = document.getElementById('readmeOverlay');
    const content = document.getElementById('readmeContent');
    const closeBtn = document.getElementById('readmeClose');

    // ===== Fullscreen README Overlay =====
    document.querySelectorAll('.project-card[data-readme]').forEach(card => {
        card.addEventListener('click', async () => {
            const path = card.getAttribute('data-readme');

            // Show overlay
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            content.innerHTML = '<p class="loading-text">Loading README...</p>';

            // Scroll overlay to top
            overlay.scrollTop = 0;

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

                // External links in new tab
                content.querySelectorAll('a').forEach(a => {
                    a.setAttribute('target', '_blank');
                    a.setAttribute('rel', 'noopener noreferrer');
                });
            } catch (e) {
                content.innerHTML = `<p class="loading-text">⚠️ Could not load — ${e.message}</p>`;
            }
        });
    });

    // Close overlay
    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });

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

});
