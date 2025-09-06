(function(){
    const toggle = document.getElementById('navToggle');
    const drawer = document.getElementById('drawer');
    const closeBtn = document.getElementById('drawerClose');
    const backdrop = document.getElementById('backdrop');
    let lastFocus = null;

    const focusablesSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    function focusTrap(e){
        if (e.key !== 'Tab') return;
        const nodes = drawer.querySelectorAll(focusablesSelector);
        if (!nodes.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function openDrawer(){
        lastFocus = document.activeElement;
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden','false');
        toggle.setAttribute('aria-expanded','true');
        backdrop.hidden = false; backdrop.classList.add('open');
        document.body.classList.add('body-lock');
        const firstLink = drawer.querySelector(focusablesSelector);
        firstLink && firstLink.focus();
        document.addEventListener('keydown', onKey);
        drawer.addEventListener('keydown', focusTrap);
    }

    function closeDrawer(){
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden','true');
        toggle.setAttribute('aria-expanded','false');
        backdrop.classList.remove('open');
        document.body.classList.remove('body-lock');
        const onEnd = () => {
            backdrop.hidden = true;
            drawer.removeEventListener('transitionend', onEnd);
        };
        drawer.addEventListener('transitionend', onEnd);
        document.removeEventListener('keydown', onKey);
        drawer.removeEventListener('keydown', focusTrap);
        lastFocus && lastFocus.focus();
    }

    function onKey(e){
        if (e.key === 'Escape') closeDrawer();
    }

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        expanded ? closeDrawer() : openDrawer();
    });

    closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    const mq = window.matchMedia('(min-width: 881px)');
    mq.addEventListener('change', (e) => { if (e.matches) closeDrawer(); });
})();
