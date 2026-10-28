/* ============================================================
   The Cake Lady Guernsey — site behaviour
   Sections: header · mobile menu · reveals · menu + cake stand · polaroid deck
             lightbox · quote form · mobile call bar
   ============================================================ */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Footer year ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header: goes solid once you scroll past the hero top ---------- */
  const header = $('#site-header');
  const onScrollHeader = () => {
    const solid = window.scrollY > 40;
    header.classList.toggle('bg-cream/95', solid);
    header.classList.toggle('backdrop-blur-md', solid);
    header.classList.toggle('shadow-[0_3px_0_#3A2414]', solid);
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('#menu-btn');
  const mobileMenu = $('#mobile-menu');
  const setMenu = (open) => {
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $('#mb-top').style.transform = open ? 'translateY(3.5px) rotate(45deg)' : '';
    $('#mb-bot').style.transform = open ? 'translateY(-3.5px) rotate(-45deg)' : '';
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('is-open')));
  $$('a', mobileMenu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth >= 1024 && mobileMenu.classList.contains('is-open')) setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$('.reveal, .pop:not(.is-in), .drip-edge');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  const hero = $('#top');

  /* ---------- Menu: one item open at a time, shown on the cake stand ---------- */
  const items = $$('.menu-item');
  const standWrap = $('.stand-photo');
  const standImg = $('#stand-img');
  const standCap = $('#stand-cap');
  const showOnStand = (item) => {
    if (!standImg) return;
    const base = item.dataset.photo;
    standWrap.classList.add('is-swapping');
    setTimeout(() => {
      standImg.src = `${base}-sm.webp`;
      standImg.srcset = `${base}-sm.webp 640w, ${base}.webp ${item.dataset.w}w`;
      standImg.height = Math.round(640 * item.dataset.h / item.dataset.w);
      standImg.alt = item.dataset.alt;
      standCap.innerHTML = item.dataset.cap;
      standWrap.classList.remove('is-swapping');
    }, reduceMotion ? 0 : 260);
  };
  items.forEach((item) => {
    const btn = $('.menu-row', item);
    btn.addEventListener('click', () => {
      const opening = !item.classList.contains('is-open');
      items.forEach((it) => {
        const on = it === item && opening;
        it.classList.toggle('is-open', on);
        $('.menu-row', it).setAttribute('aria-expanded', String(on));
      });
      if (opening) showOnStand(item);
    });
    // desktop: hovering a closed item previews it on the stand
    if (finePointer) btn.addEventListener('mouseenter', () => { if (window.innerWidth >= 1024) showOnStand(item); });
  });
  const menu = $('#menu');
  if (menu && finePointer) menu.addEventListener('mouseleave', () => {
    const open = items.find((it) => it.classList.contains('is-open'));
    if (open && window.innerWidth >= 1024) showOnStand(open);
  });

  // "Ask about…" buttons pre-select the form's service
  const serviceSelect = $('#f-service');
  $$('.js-ask').forEach((btn) => btn.addEventListener('click', () => {
    serviceSelect.value = btn.dataset.service;
    serviceSelect.classList.remove('is-invalid');
  }));

  /* ---------- Polaroid deck ---------- */
  const deck = $('#deck');
  const cards = $$('.card', deck);
  const nums = $$('.deck-num');
  const live = $('#deck-live');
  let order = cards.map((_, i) => i);
  const poses = [
    'translate(0,0) rotate(-2deg)',
    'translate(18px,10px) rotate(5deg) scale(.96)',
    'translate(-20px,18px) rotate(-7deg) scale(.92)',
    'translate(6px,26px) rotate(3deg) scale(.88)',
  ];
  const layout = () => {
    order.forEach((ci, pos) => {
      const c = cards[ci];
      c.style.zIndex = String(cards.length - pos);
      c.style.transform = poses[Math.min(pos, poses.length - 1)];
      c.style.opacity = pos < poses.length ? '1' : '0';
      c.setAttribute('aria-hidden', String(pos !== 0));
    });
    const n = String(order[0] + 1).padStart(2, '0');
    nums.forEach((el) => { el.textContent = n; });
    live.textContent = `${$('figcaption', cards[order[0]]).textContent}, ${order[0] + 1} of ${cards.length}`;
  };
  const go = (dir) => {
    if (dir > 0) {
      const top = cards[order[0]];
      top.style.transform = 'translate(-120%, -20px) rotate(-22deg)';
      top.style.opacity = '0';
      setTimeout(() => { order.push(order.shift()); layout(); }, reduceMotion ? 0 : 280);
    } else {
      order.unshift(order.pop());
      const top = cards[order[0]];
      top.style.transition = 'none';
      top.style.transform = 'translate(120%, -20px) rotate(22deg)';
      top.style.opacity = '0';
      top.offsetWidth; // reflow so it flies back in
      top.style.transition = '';
      layout();
    }
  };
  $$('.deck-next').forEach((b) => b.addEventListener('click', () => go(1)));
  $$('.deck-prev').forEach((b) => b.addEventListener('click', () => go(-1)));
  deck.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    if (e.key === 'Enter') openLb(order[0]);
  });
  // drag / swipe the top card
  let startX = 0, dx = 0, dragging = false, moved = false;
  deck.addEventListener('pointerdown', (e) => {
    const top = cards[order[0]];
    if (!top.contains(e.target)) return;
    dragging = true; moved = false; startX = e.clientX; dx = 0;
    top.classList.add('is-dragging');
    top.setPointerCapture(e.pointerId);
  });
  deck.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    dx = e.clientX - startX;
    if (Math.abs(dx) > 6) moved = true;
    cards[order[0]].style.transform = `translate(${dx}px, 0) rotate(${dx / 14 - 2}deg)`;
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    const top = cards[order[0]];
    top.classList.remove('is-dragging');
    if (Math.abs(dx) > 80) go(dx < 0 ? 1 : -1);
    else layout();
    if (!moved) openLb(order[0]);
  };
  deck.addEventListener('pointerup', endDrag);
  deck.addEventListener('pointercancel', () => { dragging = false; cards[order[0]].classList.remove('is-dragging'); layout(); });
  layout();

  /* ---------- Lightbox (opened from the deck) ---------- */
  const lb = $('#lightbox');
  const lbImg = $('#lb-img');
  const lbCap = $('#lb-cap');
  let lastFocus = null;
  function openLb(ci) {
    const c = cards[ci];
    lastFocus = document.activeElement;
    lbImg.style.opacity = '0';
    const pre = new Image();
    pre.onload = () => { lbImg.src = c.dataset.full; lbImg.alt = $('img', c).alt; lbImg.style.opacity = '1'; };
    pre.src = c.dataset.full;
    lbCap.textContent = $('figcaption', c).textContent;
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('#lb-close').focus();
  }
  const closeLb = () => {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };
  $('#lb-close').addEventListener('click', closeLb);
  lb.addEventListener('click', (e) => { if (e.target !== lbImg && !e.target.closest('#lb-close')) closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'Tab') { e.preventDefault(); $('#lb-close').focus(); }
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
    if (bad.length) { e.preventDefault(); bad[0].focus(); return; }
    const btn = $('#f-submit');
    btn.disabled = true;
    btn.classList.add('opacity-80');
    $('.js-label', btn).textContent = 'Sending…';
    $('.js-spin', btn).classList.remove('hidden');
  });

  /* ---------- Sticky mobile bar: shows after the hero, hides at the form ---------- */
  const bar = $('#call-bar');
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
