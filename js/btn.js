const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            const el = e.target;
            const d = parseInt(el.getAttribute('data-delay') || '0', 10);
            el.style.animationDelay = d ? d + 'ms' : '0ms';
            el.classList.add('in-view');
            io.unobserve(el);
        }
    });
}, {rootMargin: '0px 0px -10% 0px', threshold: 0.1});

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// pointer-follow glow on buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        btn.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
});