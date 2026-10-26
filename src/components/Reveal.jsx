import { useRef, useEffect, useState } from 'react';

// Zacht infaden bij inscrollen. De server-HTML is altijd zichtbaar (SEO en
// zonder JS); pas in de browser worden blokken onder de vouw verborgen tot ze
// in beeld komen. Blokken die al in beeld staan worden nooit verborgen.
export default function Reveal({ children, delay = 0, className = '', style, as: Tag = 'div' }) {
  const ref = useRef(null);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return undefined;
    setHide(true);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setHide(false); io.disconnect(); }
    }, { rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`rv${hide ? ' rv-hide' : ''}${className ? ' ' + className : ''}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}>
      {children}
    </Tag>
  );
}
