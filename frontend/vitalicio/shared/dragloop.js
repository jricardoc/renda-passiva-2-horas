/* ================================================================
   DRAGLOOP — esteira infinita arrastável (dedo e mouse) com inércia
   e deriva automática. Pausa fora do viewport. 60fps (só transform).

   Uso:
     <div class="minha-zona" data-dragloop data-speed="26">
       <div data-track> ...itens... </div>
     </div>
     CSS da zona: overflow:hidden; touch-action:pan-y; cursor:grab
     CSS do track: display:flex; width:max-content; will-change:transform
     JS: makeDragLoop(zoneEl, { speed: 26 })  // px/s; negativo = direção oposta
   Ou automático: dragloopAuto() instancia todos [data-dragloop].
   ================================================================ */
(function(){
  'use strict';
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function makeDragLoop(zone, opts){
    opts = opts || {};
    var track = zone.querySelector('[data-track]');
    if (!track) return null;

    /* duplica o conteúdo até ter pelo menos 2x a largura da zona (loop perfeito) */
    var base = track.innerHTML;
    var guard = 0;
    while (track.scrollWidth < zone.clientWidth * 2.2 && guard < 6) {
      track.innerHTML += base;
      guard++;
    }
    /* metade = um ciclo completo do conteúdo original duplicado */
    track.innerHTML += track.innerHTML;
    var half = track.scrollWidth / 2;

    /* imagens lazy que chegam DEPOIS da medição mudam o scrollWidth e fariam o
       wrap saltar — re-mede half a cada load (dims fixas por CSS evitam; isto é o cinto) */
    function remeasure(){ half = track.scrollWidth / 2; }
    track.querySelectorAll('img').forEach(function(im){
      if (!im.complete) im.addEventListener('load', remeasure, { once: true });
    });

    var x = opts.start || 0;
    var speed = RM ? 0 : (opts.speed != null ? opts.speed : 24); /* px/s deriva */
    var vel = 0;              /* velocidade de inércia (px/frame @60) */
    var dragging = false;
    var visible = true;
    var lastT = 0;
    var raf = null;

    function apply(){
      var w = ((x % half) + half) % half;
      track.style.transform = 'translate3d(' + (-w) + 'px,0,0)';
    }

    function tick(t){
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) { lastT = t; return; }
      var dt = lastT ? Math.min(64, t - lastT) : 16.7;
      lastT = t;
      if (!dragging) {
        if (Math.abs(vel) > .08) {
          x += vel * (dt / 16.7);
          vel *= Math.pow(.94, dt / 16.7);        /* atrito */
        } else {
          vel = 0;
          x += speed * (dt / 1000);               /* deriva */
        }
        apply();
      }
    }

    /* drag por pointer events (mouse + touch) */
    var px = 0, moved = 0, lastDx = 0;
    zone.addEventListener('pointerdown', function(ev){
      dragging = true; moved = 0; vel = 0;
      px = ev.clientX; lastDx = 0;
      zone.setPointerCapture(ev.pointerId);
      zone.classList.add('dragging');
    });
    zone.addEventListener('pointermove', function(ev){
      if (!dragging) return;
      var dx = ev.clientX - px;
      px = ev.clientX;
      lastDx = dx;
      moved += Math.abs(dx);
      x -= dx;
      apply();
    });
    function endDrag(ev){
      if (!dragging) return;
      dragging = false;
      zone.classList.remove('dragging');
      vel = -lastDx;                               /* solta com a velocidade do gesto */
      if (Math.abs(vel) > 40) vel = 40 * Math.sign(vel);
    }
    zone.addEventListener('pointerup', endDrag);
    zone.addEventListener('pointercancel', endDrag);
    /* evita "clique" nos itens após um arrasto real */
    zone.addEventListener('click', function(ev){
      if (moved > 6) { ev.preventDefault(); ev.stopPropagation(); }
    }, true);

    /* pausa fora do viewport */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function(es){
        es.forEach(function(en){ visible = en.isIntersecting; });
      }, { rootMargin: '160px 0px' }).observe(zone);
    }

    apply();
    raf = requestAnimationFrame(tick);

    /* recalcula no resize (larguras mudam) */
    var rto = null;
    window.addEventListener('resize', function(){
      clearTimeout(rto);
      rto = setTimeout(function(){ half = track.scrollWidth / 2; }, 180);
    });

    return { get x(){ return x; }, set speed(v){ speed = v; }, refresh: remeasure };
  }

  function dragloopAuto(){
    document.querySelectorAll('[data-dragloop]').forEach(function(z){
      makeDragLoop(z, { speed: parseFloat(z.dataset.speed || '24') });
    });
  }

  window.makeDragLoop = makeDragLoop;
  window.dragloopAuto = dragloopAuto;
})();
