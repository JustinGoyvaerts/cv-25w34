(function () {
    const wrap = document.getElementById('timelineWrap');
    const prev = document.getElementById('tlPrev');
    const next = document.getElementById('tlNext');

    function itemWidth() {
        return wrap.querySelector('.t-item')?.getBoundingClientRect().width || 320;
    }

    function scrollByAmount(dir) {
        wrap.scrollBy({left: dir * (itemWidth() + 18), behavior: 'smooth'});
    }

    prev.addEventListener('click', () => scrollByAmount(-1));
    next.addEventListener('click', () => scrollByAmount(1));

    let isDown = false, startX = 0, startLeft = 0;
    wrap.addEventListener('pointerdown', e => {
        isDown = true;
        wrap.setPointerCapture(e.pointerId);
        startX = e.clientX;
        startLeft = wrap.scrollLeft;
    });
    wrap.addEventListener('pointermove', e => {
        if (!isDown) return;
        wrap.scrollLeft = startLeft - (e.clientX - startX);
    });
    wrap.addEventListener('pointerup', () => {
        isDown = false;
    });

    wrap.addEventListener('wheel', e => {
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
            wrap.scrollLeft += e.deltaY;
            e.preventDefault();
        }
    }, {passive: false});
})();
