/* ============================================================
   The Cake Lady Guernsey — site behaviour
   Sections: header · mobile menu · reveals · hero photo card
             services explorer · gallery filter + lightbox
             quote form · mobile call bar
   ============================================================ */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Footer year ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header: goes solid once you scroll ---------- */
  const header = $('#site-header');
  const onScrollHeader = () => {
    const solid = window.scrollY > 24;
    header.classList.toggle('bg-cream/90', solid);
    header.classList.toggle('backdrop-blur-md', solid);
    header.classList.toggle('shadow-[0_10px_30px_-20px_rgba(58,36,20,.5)]', solid);
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('#menu-btn');
  const menu = $('#mobile-menu');
  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $('#mb-top').style.transform = open ? 'translateY(3.5px) rotate(45deg)' : '';
    $('#mb-bot').style.transform = open ? 'translateY(-3.5px) rotate(-45deg)' : '';
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) header.classList.add('bg-cream');
    else header.classList.remove('bg-cream');
  };
  menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth >= 1024 && menu.classList.contains('is-open')) setMenu(false); });

  /* ---------- Reveal on scroll (+ piped underlines, drips) ---------- */
  const revealEls = $$('.reveal, .drip-edge');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Hero photo card: gently cycles three cakes ---------- */
  const heroImgs = $$('.hero-photo img');
  const heroCap = $('#hero-photo-cap');
  if (heroImgs.length > 1 && !reduceMotion) {
    let i = 0;
    setInterval(() => {
      if (document.hidden) return;
      heroImgs[i].classList.remove('is-on');
      i = (i + 1) % heroImgs.length;
      heroImgs[i].classList.add('is-on');
      heroCap.innerHTML = heroImgs[i].dataset.cap;
    }, 4200);
  }

  /* ---------- Services explorer (ARIA tabs) ---------- */
  const tabs = $$('[role="tab"]');
  const selectTab = (tab, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      panel.classList.toggle('is-showing', on);
    });
    if (focus) tab.focus();
    // keep the active chip in view on mobile (horizontal scroll)
    const strip = tab.parentElement.parentElement;
    if (strip.scrollWidth > strip.clientWidth) {
      strip.scrollTo({ left: tab.offsetLeft - 16, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };
  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (e) => {
      let next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = tabs[(idx + 1) % tabs.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = tabs[(idx - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next, true); }
    });
  });

  // Thumbnails swap the panel's main photo
  $$('.svc-panel').forEach((panel) => {
    const main = $('.js-panel-img', panel);
    const thumbs = $$('.thumb', panel);
    thumbs.forEach((th) => th.addEventListener('click', () => {
      thumbs.forEach((t) => t.setAttribute('aria-pressed', String(t === th)));
      const base = th.dataset.src;
      main.style.opacity = '0';
      setTimeout(() => {
        main.src = `${base}-sm.webp`;
        main.srcset = `${base}-sm.webp 640w, ${base}.webp ${th.dataset.w}w`;
        main.width = 640;
        main.height = Math.round(640 * th.dataset.h / th.dataset.w);
        main.alt = th.dataset.alt;
        main.style.opacity = '1';
      }, reduceMotion ? 0 : 180);
    }));
    main.style.transition = 'opacity .25s ease';
  });

  // "Ask about…" buttons pre-select the form's service
  const serviceSelect = $('#f-service');
  $$('.js-ask').forEach((btn) => btn.addEventListener('click', () => {
    serviceSelect.value = btn.dataset.service;
    serviceSelect.classList.remove('is-invalid');
  }));

  /* ---------- Gallery filter ---------- */
  const gallery = $('#gallery');
  const tiles = $$('.tile', gallery);
  const chips = $$('[data-filter]');
  chips.forEach((chip) => chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    gallery.classList.toggle('is-filtered', f !== 'all');
    tiles.forEach((t) => {
      const show = f === 'all' || t.dataset.cat === f;
      t.classList.toggle('is-hidden', !show);
      if (show && !reduceMotion) {
        t.animate([{ opacity: 0, transform: 'scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.2,.8,.2,1)' });
      }
    });
  }));

  /* ---------- Lightbox ---------- */
  const lb = $('#lightbox');
  const lbImg = $('#lb-img');
  const lbCap = $('#lb-cap');
  const lbCount = $('#lb-count');
  let current = 0;
  let lastFocus = null;
  const visibleTiles = () => tiles.filter((t) => !t.classList.contains('is-hidden'));

  const show = (idx) => {
    const list = visibleTiles();
    current = (idx + list.length) % list.length;
    const t = list[current];
    const img = $('img', t);
    lbImg.style.opacity = '0';
    const pre = new Image();
    pre.onload = () => {
      lbImg.src = t.getAttribute('href');
      lbImg.alt = img.alt;
      lbImg.style.opacity = '1';
    };
    pre.src = t.getAttribute('href');
    lbCap.textContent = t.dataset.caption;
    lbCount.textContent = `${current + 1} of ${list.length}`;
  };
  const openLb = (idx) => {
    lastFocus = document.activeElement;
    show(idx);
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('#lb-close').focus();
  };
  const closeLb = () => {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };
  tiles.forEach((t) => t.addEventListener('click', (e) => {
    e.preventDefault();
    openLb(visibleTiles().indexOf(t));
  }));
  $('#lb-close').addEventListener('click', closeLb);
  $('#lb-prev').addEventListener('click', () => show(current - 1));
  $('#lb-next').addEventListener('click', () => show(current + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.parentElement === lb && e.target.tagName !== 'P') closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'Tab') { // keep focus inside the viewer
      const f = $$('button', lb).filter((b) => b.offsetParent !== null);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // swipe on touch screens
  let x0 = null;
  lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  /* ---------- Quote form: inline validation + submit state ---------- */
  const form = $('#quote-form');
  const fields = $$('[required]', form);
  const check = (el) => {
    const ok = el.checkValidity() && (el.tagName !== 'SELECT' || el.value !== '');
    el.classList.toggle('is-invalid', !ok);
    el.setAttribute('aria-invalid', String(!ok));
    return ok;
  };
  fields.forEach((el) => {
    el.addEventListener('blur', () => { if (el.value) check(el); });
    el.addEventListener('input', () => { if (el.classList.contains('is-invalid')) check(el); });
    el.addEventListener('change', () => { if (el.classList.contains('is-invalid')) check(el); });
  });
  form.addEventListener('submit', (e) => {
    const bad = fields.filter((el) => !check(el));
    if (bad.length) {
      e.preventDefault();
      bad[0].focus();
      return;
    }
    const btn = $('#f-submit');
    btn.disabled = true;
    btn.classList.add('opacity-80');
    $('.js-label', btn).textContent = 'Sending…';
    $('.js-spin', btn).classList.remove('hidden');
  });

  /* ---------- Sticky mobile bar: shows after the hero ---------- */
  const bar = $('#call-bar');
  const hero = $('#top');
  const contact = $('#contact');
  const onScrollBar = () => {
    const pastHero = window.scrollY > hero.offsetHeight * 0.6;
    const r = contact.getBoundingClientRect();
    const atForm = r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.4;
    bar.classList.toggle('is-shown', pastHero && !atForm);
  };
  onScrollBar();
  window.addEventListener('scroll', onScrollBar, { passive: true });
})();
