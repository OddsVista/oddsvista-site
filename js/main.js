/* ===== main.js — визуальные эффекты OddsVista ===== */

/* Respect user preference */
const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1) Sticky header */
(function stickyHeader(){
  const h = document.querySelector('.site-header');
  if (!h) return;
  const onScroll = () => {
    if (window.scrollY > 10) h.classList.add('scrolled');
    else h.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* 2) Подсветка активного языка в строке Languages */
(function highlightActiveLang(){
  const lang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
  document.querySelectorAll('[data-lang-link]').forEach(a=>{
    if (a.getAttribute('data-lang-link')?.toLowerCase() === lang){
      a.classList.add('lang-pill--active');
    }
  });
})();

/* 3) Reveal-анимации для заголовка/подзаголовка/KPI/CTA/Trust */
(function revealIn(){
  const sel = ['.hero-title', '.hero-sub', '.kpi-hero', '.hero-cta', '.trust'];
  const items = document.querySelectorAll(sel.join(','));
  if (!items.length) return;
  items.forEach((el, i) => el.classList.add('reveal', `d${Math.min(i,4)}`));
  if (REDUCE_MOTION) { items.forEach(el=>el.classList.add('in')); return; }
  const io = new IntersectionObserver((ents) => {
    ents.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  }, { threshold: .12 });
  items.forEach(el => io.observe(el));
})();

/* 4) KPI number animation (коэффициент) */
(function animateKPI(){
  const el = document.getElementById('kpiNumber');            // id в твоём HTML
  if (!el) return;
  const target = parseFloat(el.dataset.target || el.textContent || '197.0') || 197.0;
  if (REDUCE_MOTION) { el.textContent = target.toFixed(1); return; }

  const dur = 1200;
  const t0 = performance.now();
  const ease = p => 0.5 - 0.5 * Math.cos(Math.PI * p);        // smooth ease-in-out

  function tick(t){
    const p = Math.min(1, (t - t0) / dur);
    const v = (target * ease(p)).toFixed(1);
    el.textContent = v;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target.toFixed(1);
  }
  requestAnimationFrame(tick);
})();

/* 5) “Дыхание” кнопки Telegram (мягкий пульс) */
(function pulseTelegram(){
  const btn = document.querySelector('.hero-cta .btn-tele');
  if (!btn || REDUCE_MOTION) return;
  setInterval(() => {
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 1800);
  }, 4200);
})();

/* 6) Лёгкий параллакс для фоновых слоёв в hero */
(function parallaxBG(){
  const glow = document.querySelector('.bg-glow');
  const mesh = document.querySelector('.grid-mesh');
  if (!glow && !mesh) return;
  let ticking = false;
  function onScroll(){
    if (ticking || REDUCE_MOTION) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY || 0;
      if (glow) glow.style.transform = `translateY(${y * 0.06}px)`;
      if (mesh) mesh.style.transform = `translateY(${y * 0.03}px)`;
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive:true });
})();
