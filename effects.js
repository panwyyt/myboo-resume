document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // ─── 1. CURSOR GLOW ──────────────────────────────────────────────
    function initCursorGlow() {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.setAttribute('aria-hidden', 'true');
        document.body.appendChild(glow);

        let cx = window.innerWidth / 2;
        let cy = window.innerHeight / 2;
        let tx = cx, ty = cy;

        document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

        (function loop() {
            cx += (tx - cx) * 0.09;
            cy += (ty - cy) * 0.09;
            glow.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
            requestAnimationFrame(loop);
        })();
    }

    // ─── 2. TYPEWRITER HERO ──────────────────────────────────────────
    function initTypewriter() {
        const titleEl = document.querySelector('.hero-title');
        const roleEl = document.querySelector('.hero-role');
        if (!titleEl || !roleEl) return;

        const titleText = titleEl.textContent.trim();
        const roleText = roleEl.textContent.trim();

        // Preserve text for screen readers
        titleEl.setAttribute('aria-label', titleText);
        roleEl.setAttribute('aria-label', roleText);

        titleEl.innerHTML = '<span class="tw-chars" aria-hidden="true"></span><span class="tw-cursor" aria-hidden="true">█</span>';
        roleEl.innerHTML = '';

        const titleChars = titleEl.querySelector('.tw-chars');

        function typeOut(container, text, done) {
            let i = 0;
            const chars = [...text];
            function tick() {
                if (i >= chars.length) { if (done) done(); return; }
                const s = document.createElement('span');
                s.className = 'tw-char';
                s.textContent = chars[i++];
                container.appendChild(s);
                setTimeout(tick, 35 + Math.random() * 75);
            }
            tick();
        }

        setTimeout(() => {
            typeOut(titleChars, titleText, () => {
                const cur = titleEl.querySelector('.tw-cursor');
                if (cur) cur.remove();
                setTimeout(() => {
                    roleEl.innerHTML = '<span class="tw-chars" aria-hidden="true"></span><span class="tw-cursor" aria-hidden="true">█</span>';
                    typeOut(roleEl.querySelector('.tw-chars'), roleText, null);
                }, 320);
            });
        }, 350);
    }

    // ─── 3. BUG CANVAS ───────────────────────────────────────────────
    function initBugCanvas() {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;

        const canvas = document.createElement('canvas');
        canvas.className = 'bug-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        hero.insertBefore(canvas, hero.firstChild);

        const ctx = canvas.getContext('2d');
        const mouse = { x: -999, y: -999 };
        const MAX = 14;
        let bugs = [];

        function resize() {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        document.addEventListener('mousemove', e => {
            const r = canvas.getBoundingClientRect();
            mouse.x = e.clientX - r.left;
            mouse.y = e.clientY - r.top;
        });
        document.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

        class Bug {
            constructor() {
                const w = canvas.width, h = canvas.height;
                const side = (Math.random() * 4) | 0;
                if (side === 0) { this.x = Math.random() * w; this.y = -16; }
                else if (side === 1) { this.x = w + 16; this.y = Math.random() * h; }
                else if (side === 2) { this.x = Math.random() * w; this.y = h + 16; }
                else { this.x = -16; this.y = Math.random() * h; }

                const ang = Math.atan2(h / 2 - this.y, w / 2 - this.x) + (Math.random() - 0.5) * 1.4;
                const spd = 0.25 + Math.random() * 0.45;
                this.vx = Math.cos(ang) * spd;
                this.vy = Math.sin(ang) * spd;
                this.angle = ang;
                this.legPhase = Math.random() * Math.PI * 2;
                this.size = 9 + Math.random() * 6;
                this.alpha = 0;
                this.targetAlpha = 0.55 + Math.random() * 0.3;
                this.dead = false;
                this.deathAlpha = 0;
            }

            update() {
                if (this.dead) { this.deathAlpha = Math.max(0, this.deathAlpha - 0.055); return; }
                if (this.alpha < this.targetAlpha) this.alpha = Math.min(this.targetAlpha, this.alpha + 0.006);

                const dx = this.x - mouse.x, dy = this.y - mouse.y;
                const dist = Math.hypot(dx, dy);

                if (dist < 20) {
                    this.dead = true;
                    this.deathAlpha = 1.0;
                    return;
                }
                if (dist < 95) {
                    const f = Math.pow(1 - dist / 95, 2) * 1.5;
                    this.vx += (dx / dist) * f;
                    this.vy += (dy / dist) * f;
                }

                const spd = Math.hypot(this.vx, this.vy);
                if (spd > 3.2) { this.vx = this.vx / spd * 3.2; this.vy = this.vy / spd * 3.2; }

                this.vx = this.vx * 0.974 + (Math.random() - 0.5) * 0.065;
                this.vy = this.vy * 0.974 + (Math.random() - 0.5) * 0.065;

                if (spd > 0.06) {
                    const tA = Math.atan2(this.vy, this.vx);
                    let d = tA - this.angle;
                    while (d > Math.PI) d -= Math.PI * 2;
                    while (d < -Math.PI) d += Math.PI * 2;
                    this.angle += d * 0.13;
                }

                this.legPhase += 0.14 + spd * 0.05;
                this.x += this.vx;
                this.y += this.vy;

                const m = 28, w = canvas.width, h = canvas.height;
                if (this.x < -m) this.x = w + m;
                else if (this.x > w + m) this.x = -m;
                if (this.y < -m) this.y = h + m;
                else if (this.y > h + m) this.y = -m;
            }

            draw() {
                const a = this.dead ? this.deathAlpha : this.alpha;
                if (a < 0.005) return;
                ctx.save();
                ctx.globalAlpha = a;
                ctx.translate(this.x, this.y);

                if (this.dead) {
                    ctx.strokeStyle = '#ff6060';
                    ctx.lineWidth = 1.5;
                    ctx.lineCap = 'round';
                    const s = this.size * 1.8;
                    ctx.beginPath();
                    ctx.moveTo(-s, -s); ctx.lineTo(s, s);
                    ctx.moveTo(s, -s); ctx.lineTo(-s, s);
                    ctx.stroke();
                    ctx.restore();
                    return;
                }

                ctx.rotate(this.angle + Math.PI / 2);
                const s = this.size;
                const ls = Math.sin(this.legPhase);

                const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
                const bugColor = isDark ? '#ffffff' : '#1a1a2e';
                ctx.fillStyle = ctx.strokeStyle = bugColor;
                ctx.lineWidth = isDark ? 0.9 : 1.1;
                ctx.lineCap = 'round';

                // Abdomen
                ctx.beginPath();
                ctx.ellipse(0, s * 0.38, s * 0.44, s * 0.72, 0, 0, Math.PI * 2);
                ctx.fill();
                // Thorax
                ctx.beginPath();
                ctx.ellipse(0, -s * 0.38, s * 0.36, s * 0.44, 0, 0, Math.PI * 2);
                ctx.fill();
                // Head
                ctx.beginPath();
                ctx.arc(0, -s * 1.08, s * 0.27, 0, Math.PI * 2);
                ctx.fill();
                // Antennae
                ctx.beginPath();
                ctx.moveTo(-s * 0.12, -s * 1.25);
                ctx.lineTo(-s * 0.58, -s * 1.9);
                ctx.moveTo(s * 0.12, -s * 1.25);
                ctx.lineTo(s * 0.58, -s * 1.9);
                ctx.stroke();
                // 3 leg pairs
                [-s * 0.44, -s * 0.08, s * 0.24].forEach((ly, i) => {
                    const sw = ls * (i % 2 === 0 ? 0.4 : -0.4) * s;
                    ctx.beginPath();
                    ctx.moveTo(-s * 0.38, ly);
                    ctx.lineTo(-s * 1.65, ly + s * 0.55 + sw);
                    ctx.moveTo(s * 0.38, ly);
                    ctx.lineTo(s * 1.65, ly + s * 0.55 - sw);
                    ctx.stroke();
                });
                ctx.restore();
            }

            isDone() { return this.dead && this.deathAlpha < 0.005; }
        }

        // Stagger-spawn initial crew
        for (let i = 0; i < MAX; i++) {
            setTimeout(() => bugs.push(new Bug()), i * 220 + 800);
        }

        let lastSpawn = 0;
        requestAnimationFrame(function tick(ts) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            bugs = bugs.filter(b => !b.isDone());
            if (bugs.filter(b => !b.dead).length < MAX && ts - lastSpawn > 900) {
                bugs.push(new Bug());
                lastSpawn = ts;
            }
            bugs.forEach(b => { b.update(); b.draw(); });
            requestAnimationFrame(tick);
        });
    }

    // ─── 4. SKILL CHIPS FLY-IN ───────────────────────────────────────
    function initChipsFlyIn() {
        const chips = [...document.querySelectorAll('.skill-chip')];
        if (!chips.length) return;

        const dirs = [[-65,-38],[65,-38],[-65,38],[65,38],[0,-72],[0,72],[-38,-62],[38,-62]];
        chips.forEach((c, i) => {
            const [dx, dy] = dirs[i % dirs.length];
            c.style.opacity = '0';
            c.style.transform = `translate(${dx}px,${dy}px) scale(0.65)`;
            c.style.transition = 'none';
        });

        const obs = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            chips.forEach((c, i) => {
                setTimeout(() => {
                    c.style.transition = `opacity 0.5s ease-out, transform 0.65s cubic-bezier(0.22,1,0.36,1)`;
                    c.style.opacity = '1';
                    c.style.transform = 'translate(0,0) scale(1)';
                    // Clean up inline styles so CSS hover takes over
                    c.addEventListener('transitionend', () => {
                        c.style.opacity = '';
                        c.style.transform = '';
                        c.style.transition = '';
                    }, { once: true });
                }, i * 40);
            });
            obs.disconnect();
        }, { threshold: 0.18 });

        const sec = document.querySelector('.skills-section');
        if (sec) obs.observe(sec);
    }

    // ─── 5. PROJECT CARDS STAGGER ────────────────────────────────────
    function initCardStagger() {
        const cards = [...document.querySelectorAll('.project-card')];
        if (!cards.length) return;

        // Run after script.js DOMContentLoaded sets opacity:1
        cards.forEach(c => {
            c.style.opacity = '0';
            c.style.transform = 'translateY(22px) scale(0.97)';
            c.style.transition = 'none';
        });

        const obs = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            cards.forEach((c, i) => {
                setTimeout(() => {
                    c.style.transition = 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.22,1,0.36,1)';
                    c.style.opacity = '1';
                    c.style.transform = 'translateY(0) scale(1)';
                    c.addEventListener('transitionend', () => {
                        c.style.opacity = '';
                        c.style.transform = '';
                        c.style.transition = '';
                    }, { once: true });
                }, i * 55);
            });
            obs.disconnect();
        }, { threshold: 0.05 });

        const sec = document.querySelector('.projects-section');
        if (sec) obs.observe(sec);
    }

    // ─── 6. SECTION + TIMELINE + CERT REVEALS ────────────────────────
    function initReveals() {
        const items = [
            ...document.querySelectorAll('.experience-section'),
            ...document.querySelectorAll('.certifications-section'),
            ...document.querySelectorAll('.timeline-item'),
            ...document.querySelectorAll('.cert-card'),
            ...document.querySelectorAll('.side-block'),
        ];

        items.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(26px)';
            el.style.transition = 'none';
        });

        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                e.target.style.transition = 'opacity 0.65s ease-out, transform 0.65s cubic-bezier(0.22,1,0.36,1)';
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
                e.target.addEventListener('transitionend', () => {
                    e.target.style.opacity = '';
                    e.target.style.transform = '';
                    e.target.style.transition = '';
                }, { once: true });
                obs.unobserve(e.target);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        items.forEach(el => obs.observe(el));
    }

    // ─── INIT ALL ─────────────────────────────────────────────────────
    initCursorGlow();
    initTypewriter();
    initBugCanvas();
    initChipsFlyIn();
    initCardStagger();
    initReveals();
});
