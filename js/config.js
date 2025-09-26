
(function(){
  const SUP=['en','de','fr','es','it','pt','nl','pl','tr','ar','zh','ja','ko','sv'];
  function detectLocale(pathname){ const m=(pathname.match(/^\/(en|de|fr|es|it|pt|nl|pl|tr|ar|zh|ja|ko|sv)\b/)||[])[1]; return m||null; }
  function replaceLocale(pathname, target){
    const parts=pathname.split('/');
    if(parts.length>1 && SUP.includes(parts[1])){ parts[1]=target; return parts.join('/'); }
    const tail=parts.filter(Boolean).join('/'); return '/'+target+(tail?'/'+tail:'');
  }
  function go(target){
    if(!SUP.includes(target)) target='en'; try{ localStorage.setItem('lang', target); }catch(e){}
    const next=replaceLocale(location.pathname, target).replace(/\/+/g,'/'); location.assign(next + (location.search||'') + (location.hash||''));
  }
  document.addEventListener('DOMContentLoaded', function(){
    const sel=document.getElementById('lang');
    if(sel){ let cur=detectLocale(location.pathname) || (navigator.language||'en').slice(0,2); if(!SUP.includes(cur)) cur='en'; if(sel.querySelector(`[value="${cur}"]`)) sel.value=cur; sel.addEventListener('change', ()=>go(sel.value)); }
    document.querySelectorAll('[data-lang-link]').forEach(a=>{ a.addEventListener('click', e=>{ e.preventDefault(); go(a.getAttribute('data-lang-link')); }); });
  });
})();// Header glow on scroll
(function(){
  function onScroll(){
    var h = document.querySelector('.site-header');
    if(!h) return;
    if(window.scrollY > 6) h.classList.add('scrolled');
    else h.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

// (optional) ensure hero ticker duplicates content for seamless loop
(function(){
  var s = document.querySelector('.hero-ticker .stream');
  if(!s) return;
  s.innerHTML = (s.innerHTML + " • " + s.innerHTML + " • " + s.innerHTML);
})();
// Hero number animation
(function(){
  const el=document.getElementById("hero-num");
  if(!el) return;
  let i=0, target=197, step=0.8;
  const timer=setInterval(()=>{
    i+=step;
    if(i>=target){i=target;clearInterval(timer);}
    el.textContent=i.toFixed(1);
  },30);
})();

// Highlight slider
(function(){
  const el=document.getElementById("highlight");
  if(!el) return;
  const items=[
    "decimal <strong>1.97</strong> ↔ implied <strong>50.8%</strong>",
    "decimal <strong>2.45</strong> ↔ implied <strong>40.8%</strong>",
    "decimal <strong>3.10</strong> ↔ implied <strong>32.2%</strong>"
  ];
  let i=0;
  setInterval(()=>{
    i=(i+1)%items.length;
    el.querySelector(".small").innerHTML=items[i];
  },5000);
})();
// Count-up 0.0 -> 197.0 + glow loop
(function(){
  const target = 197.0;
  const kpi = document.getElementById('kpiNumber');
  if(kpi){
    let start = null;
    const duration = 1800;
    function step(ts){
      if(!start) start = ts;
      const p = Math.min((ts - start)/duration, 1);
      kpi.textContent = (target * p).toFixed(1);
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    kpi.animate([
      {filter:'drop-shadow(0 12px 32px rgba(155,92,255,.25))'},
      {filter:'drop-shadow(0 18px 52px rgba(0,255,255,.35))'},
      {filter:'drop-shadow(0 12px 32px rgba(155,92,255,.25))'}
    ], {duration:4000, iterations:Infinity});
  }

  // particles drift
  document.querySelectorAll('.particles .p').forEach((el)=>{
    const delay = Math.random()*1500;
    const dur = 3000 + Math.random()*3000;
    const x1 = (Math.random()*60-30);
    const x2 = (Math.random()*20-10);
    const x3 = (Math.random()*60-30);
    el.animate([
      {transform:`translate(${x1}px, -10px) scale(.8)`, opacity:.0},
      {transform:`translate(${x2}px, -60px) scale(1.1)`, opacity:.8},
      {transform:`translate(${x3}px, -120px) scale(.9)`, opacity:0}
    ], {duration:dur, iterations:Infinity, delay});
  });

  // typewriter/fade-in for title
  const title = document.querySelector('.hero-title.split');
  if(title){
    const text = title.textContent; title.textContent='';
    [...text].forEach((ch,idx)=>{
      const span = document.createElement('span');
      span.textContent = ch;
      span.style.display='inline-block';
      span.style.opacity='0';
      span.style.transform='translateY(8px)';
      title.appendChild(span);
      setTimeout(()=>{
        span.animate([{opacity:0, transform:'translateY(8px)'},{opacity:1, transform:'translateY(0)'}], {duration:320, fill:'forwards'});
      }, 40*idx);
    });
  }

  // parallax bg
  const glow = document.querySelector('.bg-glow');
  const mesh = document.querySelector('.grid-mesh');
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    if(glow) glow.style.transform = `translateY(${y*-0.06}px)`;
    if(mesh) mesh.style.transform = `translateY(${y*-0.03}px)`;
  }, {passive:true});
})();
