/* ═══════════════════════════════════════════════════════════════
   Light, Apple-flavoured micro-interactions.
   Reveals + magnetic CTAs + soft cursor + sticky nav. No canvas.
   All motion is opt-out via prefers-reduced-motion; content is
   visible by default and reveals only enhance it.
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer  = window.matchMedia('(pointer: fine)').matches;

    // Non-motion enhancements always run.
    initNavScroll();
    initActiveLink();

    if (reduceMotion) return;

    // Motion enhancements.
    initHeroReveal();
    revealEach('.section-head');
    revealGroup('.projects-section', '.project-card', { stagger: 55, y: 22 });
    revealGroup('.experience-section .timeline', '.timeline-item', { stagger: 70, y: 22 });
    revealEach('.side-block', { y: 22 });
    revealGroup('.certifications-section', '.cert-card', { stagger: 45, y: 22 });

    if (finePointer) {
        initMagneticButtons();
        initCursorGlow();
    }

    revealSafety();

    // ─── Sticky nav: frosted on scroll ───────────────────────────
    function initNavScroll() {
        const nav = document.getElementById('nav');
        if (!nav) return;
        const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // ─── Active nav link follows the section in view ──────────────
    function initActiveLink() {
        const links = [...document.querySelectorAll('.nav-link')];
        const map = new Map();
        links.forEach(link => {
            const id = (link.getAttribute('href') || '').slice(1);
            const sec = id && document.getElementById(id);
            if (sec) map.set(sec, link);
        });
        if (!map.size) return;

        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                links.forEach(l => l.classList.remove('is-active'));
                map.get(e.target)?.classList.add('is-active');
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

        map.forEach((_, sec) => obs.observe(sec));
    }

    // ─── Reveal helpers ───────────────────────────────────────────
    function prep(el, y) {
        el.style.opacity = '0';
        el.style.transform = `translateY(${y}px)`;
        el.style.willChange = 'opacity, transform';
    }
    function play(el) {
        el.style.transition = 'opacity 0.7s var(--ease), transform 0.7s var(--ease)';
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.addEventListener('transitionend', () => {
            el.style.transition = '';
            el.style.transform = '';
            el.style.willChange = '';
        }, { once: true });
    }

    // Reveal each matching element independently as it scrolls in.
    function revealEach(selector, { y = 20 } = {}) {
        const els = [...document.querySelectorAll(selector)];
        if (!els.length) return;
        els.forEach(el => prep(el, y));
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                play(e.target);
                o.unobserve(e.target);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
        els.forEach(el => obs.observe(el));
    }

    // Reveal a group's children in a stagger when the container enters.
    function revealGroup(containerSel, childSel, { stagger = 55, y = 20 } = {}) {
        document.querySelectorAll(containerSel).forEach(container => {
            const kids = [...container.querySelectorAll(childSel)];
            if (!kids.length) return;
            kids.forEach(k => prep(k, y));
            const obs = new IntersectionObserver(([e], o) => {
                if (!e.isIntersecting) return;
                kids.forEach((k, i) => setTimeout(() => play(k), i * stagger));
                o.disconnect();
            }, { threshold: 0.08 });
            obs.observe(container);
        });
    }

    function initHeroReveal() {
        const kids = [...document.querySelectorAll('.hero-inner > *')];
        if (!kids.length) return;
        kids.forEach(k => prep(k, 22));
        requestAnimationFrame(() => {
            kids.forEach((k, i) => setTimeout(() => {
                k.style.transition = 'opacity 0.8s var(--ease), transform 0.8s var(--ease)';
                k.style.opacity = '1';
                k.style.transform = 'none';
                k.addEventListener('transitionend', () => {
                    k.style.transition = '';
                    k.style.transform = '';
                    k.style.willChange = '';
                }, { once: true });
            }, 100 + i * 85));
        });
    }

    // Safety net: never leave content hidden if an observer never fires.
    function revealSafety() {
        setTimeout(() => {
            document.querySelectorAll(
                '.hero-inner > *, .section-head, .project-card, .skills-ticker, .timeline-item, .side-block, .cert-card'
            ).forEach(el => {
                if (el.style.opacity === '0') {
                    el.style.transition = 'none';
                    el.style.opacity = '';
                    el.style.transform = '';
                    el.style.willChange = '';
                }
            });
        }, 1300);
    }

    // ─── Magnetic primary CTAs ────────────────────────────────────
    function initMagneticButtons() {
        const strength = 0.28;
        document.querySelectorAll('.btn-primary, .btn-resume').forEach(el => {
            el.addEventListener('pointermove', e => {
                if (e.pointerType && e.pointerType !== 'mouse') return;
                const r = el.getBoundingClientRect();
                const mx = e.clientX - (r.left + r.width / 2);
                const my = e.clientY - (r.top + r.height / 2);
                el.style.transform = `translate(${(mx * strength).toFixed(1)}px, ${(my * strength - 2).toFixed(1)}px)`;
            });
            el.addEventListener('pointerleave', () => { el.style.transform = ''; });
        });
    }

    // ─── Soft cursor glow ─────────────────────────────────────────
    function initCursorGlow() {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.setAttribute('aria-hidden', 'true');
        document.body.appendChild(glow);

        let x = window.innerWidth / 2, y = window.innerHeight / 2;
        let tx = x, ty = y, on = false;

        window.addEventListener('pointermove', e => {
            if (e.pointerType && e.pointerType !== 'mouse') return;
            tx = e.clientX; ty = e.clientY;
            if (!on) { on = true; glow.classList.add('is-on'); }
        }, { passive: true });

        document.addEventListener('mouseleave', () => { on = false; glow.classList.remove('is-on'); });

        (function loop() {
            x += (tx - x) * 0.12;
            y += (ty - y) * 0.12;
            glow.style.transform = `translate(${(x - 260).toFixed(1)}px, ${(y - 260).toFixed(1)}px)`;
            requestAnimationFrame(loop);
        })();
    }
});
