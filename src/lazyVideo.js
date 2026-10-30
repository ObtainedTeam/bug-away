import { useEffect } from 'react';

// Achtergrondvideo's pas laden als ze nodig zijn. De markup heeft geen src
// (alleen data-src en eventueel data-src-mobile), zodat de
// browser bij paginalading alleen de poster ophaalt. Deze hook zet de juiste
// bron zodra de video in beeld komt; met { afterLoad: true } pas na de
// paginalading en een rustig moment (voor de hero, zodat de poster de LCP is).
export function startVideo(v) {
  if (!v || v.dataset.started) return;
  v.dataset.started = '1';
  const mobile = v.dataset.srcMobile && window.matchMedia('(max-width: 759px)').matches;
  v.muted = true;
  v.defaultMuted = true;
  v.playsInline = true;
  v.autoplay = true; // speelt vanzelf zodra er genoeg data is, ook als play() te vroeg was
  v.src = mobile ? v.dataset.srcMobile : v.dataset.src;
  const tryPlay = () => { if (v.paused) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } };
  tryPlay();
  v.addEventListener('canplay', tryPlay, { once: true });
}

export function useLazyVideo(ref, { afterLoad = false } = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined; // alleen de poster
    // Video's steeds opnieuw opzoeken in de container: React kan de innerHTML
    // na de hydration vervangen, de container zelf blijft hetzelfde element.
    const start = () => root.querySelectorAll('video[data-src]').forEach(startVideo);
    let cancelled = false;

    if (afterLoad) {
      const go = () => {
        if (cancelled) return;
        const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 300));
        idle(() => { if (!cancelled) start(); }, { timeout: 2500 });
      };
      if (document.readyState === 'complete') go();
      else window.addEventListener('load', go, { once: true });
      // Vangnet: nooit later dan 3 s na mount, ook als idle-callbacks uitblijven.
      const safety = setTimeout(() => { if (!cancelled) start(); }, 3000);
      // iOS energiebesparing of een tab die op de achtergrond laadde: start
      // alsnog bij de eerste aanraking, scroll, klik of als de tab zichtbaar wordt.
      const kick = () => { start(); root.querySelectorAll('video[data-started]').forEach((v) => { if (v.paused) v.play().catch(() => {}); }); };
      const onVis = () => { if (document.visibilityState === 'visible') kick(); };
      const evs = ['touchstart', 'scroll', 'click', 'keydown'];
      evs.forEach((e) => window.addEventListener(e, kick, { once: true, passive: true }));
      document.addEventListener('visibilitychange', onVis);
      return () => {
        cancelled = true; clearTimeout(safety);
        window.removeEventListener('load', go);
        evs.forEach((e) => window.removeEventListener(e, kick));
        document.removeEventListener('visibilitychange', onVis);
      };
    }

    if (!('IntersectionObserver' in window)) { start(); return undefined; }
    let seen = false;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { seen = true; start(); }
    }, { rootMargin: '200px 0px' });
    io.observe(root);
    // Wordt de video na het starten vervangen (nieuwe innerHTML), start die dan ook.
    const mo = new MutationObserver(() => { if (seen) start(); });
    mo.observe(root, { childList: true, subtree: true });
    return () => { cancelled = true; io.disconnect(); mo.disconnect(); };
  }, [ref, afterLoad]);
}

// HTML-string voor een gedempte achtergrondvideo (via innerHTML, zodat de
// attributen ook in de geprerenderde HTML staan).
export function videoHtml({ src, srcMobile, poster, width, height }) {
  return `<video muted autoplay loop playsinline webkit-playsinline disablepictureinpicture preload="none"` +
    (poster ? ` poster="${poster}"` : '') +
    (width ? ` width="${width}" height="${height}"` : '') +
    ` data-src="${src}"` + (srcMobile ? ` data-src-mobile="${srcMobile}"` : '') +
    ` style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>`;
}
