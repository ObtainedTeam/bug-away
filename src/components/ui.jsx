import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { c, rv, FONT, FW, R, SH, T, LH, SP, W, BTN, BTN_SM, BTNO, CHIP, CARD, EYEBROW } from '../theme';
import { pic } from '../img';
import { useCurrency } from '../currency.jsx';
import { CartContext } from './Cart';
import { isPurchasable } from '../shopify';
import { productById, CARD_IMG, HOVER_IMG, SHORT } from '../data/catalog';
import { useReviews, forProduct } from '../reviews';
import { subscribe } from '../brevo';
import Reveal from './Reveal';

export const openCart = () => { if (typeof window !== 'undefined') window.dispatchEvent(new Event('ba:cart-open')); };

// ---------------------------------------------------------------------------
export function Stars({ value = 5, size = 14 }) {
  const full = Math.round(value);
  return (
    <span aria-label={`${value} out of 5 stars`} style={{ color: c.star, fontSize: size, letterSpacing: 1.5, lineHeight: 1, whiteSpace: 'nowrap' }}>
      {'★'.repeat(full)}<span style={{ color: c.glL }}>{'★'.repeat(5 - full)}</span>
    </span>
  );
}

export function Section({ children, bg, id, pad = SP.section, style, className = '' }) {
  return (
    <section id={id} className={`r-pad ${className}`} style={{ background: bg, ...rv('pad', ...pad), ...style }}>
      <div style={{ maxWidth: W.page, margin: '0 auto' }}>{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, intro, align = 'center', action, mb = 36, light = false }) {
  const center = align === 'center';
  return (
    <Reveal style={{ display: 'flex', alignItems: 'flex-end', justifyContent: center ? 'center' : 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: mb, textAlign: center ? 'center' : 'left' }}>
      <div style={{ maxWidth: center ? W.text : 640, margin: center ? '0 auto' : 0 }}>
        {eyebrow && <span style={{ ...EYEBROW, color: light ? c.mist : c.sageD, marginBottom: 10 }}>{eyebrow}</span>}
        <h2 className="r-fs" style={{ fontFamily: FONT, fontWeight: FW.head, ...rv('fs', ...T.h2), lineHeight: LH.head, color: light ? c.white : c.dark }}>{title}</h2>
        {intro && <p className="r-fs" style={{ ...rv('fs', ...T.lg), lineHeight: LH.body, color: light ? c.skyP : c.grayD, marginTop: 12 }}>{intro}</p>}
      </div>
      {action}
    </Reveal>
  );
}

export function Price({ product, size = T.lg[0], center = false }) {
  const { price, compare, fmt, code, region } = useCurrency();
  const p = price(product);
  const cmp = compare(product);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', justifyContent: center ? 'center' : 'flex-start' }}>
      <b style={{ fontSize: size, fontWeight: FW.head, color: c.dark }}>{fmt(p)}{region !== 'US' && <span style={{ fontSize: 11, fontWeight: FW.mid, color: c.grayD, marginLeft: 3 }}>{code}</span>}</b>
      {cmp && cmp > p && <s style={{ fontSize: size * 0.8, color: c.grayD }}><span style={{ position: 'absolute', left: -9999 }}>Regular price </span>{fmt(cmp)}</s>}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Productkaart: beeld, naam, sterren (alleen echte), prijs en snel toevoegen.
// Snel toevoegen: kleur kiezen en een maat aantikken = in de winkelmand.
// ---------------------------------------------------------------------------
export function ProductCard({ id, priority = false, sizes = '(max-width: 767px) 50vw, 290px' }) {
  const product = productById(id);
  const rvw = forProduct(useReviews(), id);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(product?.colors ? product.colors[0] : null);
  const [added, setAdded] = useState(false);
  if (!product) return null;
  const [short, line] = SHORT[id] || [product.name, ''];
  const img = CARD_IMG[id] || product.images[0];
  const hover = HOVER_IMG[id];
  const simple = !product.sizes;
  const sold = simple && !isPurchasable(id);
  const href = `/product/${id}`;
  const fit = product.imageFit === 'contain' ? 'contain' : 'cover';

  const add = (size) => {
    CartContext.add(product, size || null, size ? color : null, 1);
    setAdded(true); setOpen(false); openCart();
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="card-hover" style={{ ...CARD, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <Link to={href} tabIndex={-1} style={{ position: 'relative', display: 'block', aspectRatio: '4 / 5', background: c.off, overflow: 'hidden' }}>
        <img {...pic(img, sizes)} alt={product.name} loading={priority ? 'eager' : 'lazy'} decoding="async" {...(priority ? { fetchpriority: 'high' } : {})}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit, transition: 'opacity .35s ease' }} />
        {hover && <img {...pic(hover, sizes)} alt="" aria-hidden="true" loading="lazy" decoding="async" className="card-alt"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity .35s ease' }} />}
        {product.badge && <span style={{ ...CHIP, position: 'absolute', top: 10, left: 10, background: product.badge === 'New' ? c.dark : c.white, color: product.badge === 'New' ? c.white : c.dark, boxShadow: SH.card }}>{product.badge}</span>}
      </Link>

      <div className="r-pad" style={{ display: 'flex', flexDirection: 'column', flex: 1, ...rv('pad', '16px 18px 18px', '12px 12px 14px') }}>
        <Link to={href} style={{ textDecoration: 'none', color: c.dark }}>
          <h3 className="r-fs" style={{ ...rv('fs', 16, 14), fontWeight: FW.head, lineHeight: LH.head }}>{short}</h3>
        </Link>
        {line && <p className="d-only" style={{ fontSize: T.sm[0], color: c.grayD, marginTop: 3, lineHeight: 1.4 }}>{line}</p>}
        <div style={{ minHeight: 18, marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          {rvw.count > 0 && <><Stars value={rvw.avg} size={13} /><span style={{ fontSize: 12, color: c.grayD }}>({rvw.count})</span></>}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 8 }}><Price product={product} size={16} /></div>
        <button type="button" disabled={sold}
          onClick={() => (simple ? add(null) : setOpen((o) => !o))}
          aria-expanded={simple ? undefined : open}
          style={{ ...BTN_SM, width: '100%', marginTop: 10, background: sold ? c.glL : added ? c.sage : c.sageD, color: sold ? c.grayD : c.white, cursor: sold ? 'default' : 'pointer' }}>
          {sold ? 'Coming soon' : added ? 'Added ✓' : simple ? 'Add to cart' : open ? 'Choose your size' : 'Quick add'}
        </button>
        {!simple && open && (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              {product.colors.map((col, i) => (
                <button key={col} type="button" onClick={() => setColor(col)} aria-pressed={color === col} aria-label={col}
                  style={{ flex: 1, height: 32, borderRadius: R.sm, border: `2px solid ${color === col ? c.dark : c.line}`, background: c.white, fontSize: 12, fontWeight: FW.mid, color: c.dark, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <i style={{ width: 12, height: 12, borderRadius: R.pill, background: product.colorHex[i], border: `1px solid ${c.gray}` }} />{col === 'Arctic White' ? 'White' : col}
                </button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))', gap: 6 }}>
              {product.sizes.map((s) => {
                const ok = isPurchasable(id, s, color);
                return (
                  <button key={s} type="button" disabled={!ok} onClick={() => add(s)}
                    style={{ height: 36, borderRadius: R.sm, border: `1px solid ${c.line}`, background: ok ? c.white : c.off, color: ok ? c.dark : c.gray, fontSize: 12, fontWeight: FW.mid, cursor: ok ? 'pointer' : 'default', textDecoration: ok ? 'none' : 'line-through' }}>{s}</button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Video's: twee brede kaarten boven, vier smalle eronder (flip'nsleep VideoRow).
// Kaart zonder src toont "Video coming soon"; met src opent een modal.
// ---------------------------------------------------------------------------
function PlayIcon({ size = 56 }) {
  return (
    <span aria-hidden="true" style={{ width: size, height: size, borderRadius: R.pill, background: 'rgba(255,255,255,.94)', boxShadow: SH.card, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size * 0.38} height={size * 0.38} viewBox="0 0 24 24" fill={c.forest}><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
    </span>
  );
}

export function VideoModal({ video, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!video) return undefined;
    const prev = document.activeElement;
    closeRef.current && closeRef.current.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const ov = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ov; prev && prev.focus && prev.focus(); };
  }, [video, onClose]);
  if (!video) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={video.caption} onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(26,46,36,.86)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: video.wide ? 'min(960px, 100%)' : 'min(420px, 100%)' }}>
        <video src={video.src} poster={video.poster} controls autoPlay playsInline
          style={{ display: 'block', width: '100%', aspectRatio: video.wide ? '16 / 9' : '9 / 16', maxHeight: '86vh', background: '#000', borderRadius: R.lg, boxShadow: SH.float, objectFit: 'contain' }} />
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close video"
          style={{ position: 'absolute', top: 12, right: 12, width: 44, height: 44, borderRadius: R.pill, border: 'none', background: c.white, color: c.dark, fontSize: 24, lineHeight: 1, cursor: 'pointer', boxShadow: SH.card }}>×</button>
      </div>
    </div>
  );
}

// Gedempte clip die vanzelf speelt zodra de kaart in beeld is (Instagram-stijl).
// Pauzeert buiten beeld; bij prefers-reduced-motion blijft de poster staan.
function AutoClip({ src, poster, pos }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!v.src) v.src = src;
        const p = v.play(); if (p && p.catch) p.catch(() => {});
      } else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return <video ref={ref} muted loop playsInline preload="none" poster={poster} aria-hidden="true"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos || 'center' }} />;
}

function VideoCard({ v, ratio, onOpen, large = false }) {
  const auto = !large && v.src;
  const inner = (
    <>
      {auto && <AutoClip src={v.clip || v.src} poster={v.poster} pos={v.pos} />}
      {!auto && v.poster && <img src={v.poster} alt="" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: v.pos || 'center' }} />}
      <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,46,36,0) 40%, rgba(26,46,36,.82))' }} />
      {!v.src && <span style={{ ...CHIP, position: 'absolute', top: 12, left: 12, background: c.white, color: c.dark }}>Video coming soon</span>}
      {auto
        ? <span style={{ ...CHIP, position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,.9)', color: c.dark, fontSize: 11 }}>🔊 Tap for sound</span>
        : <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: v.src ? 1 : 0.7 }}><PlayIcon size={large ? 68 : 52} /></span>}
      <span className={large ? 'r-fs' : undefined} style={{ position: 'absolute', left: large ? 22 : 14, right: large ? 22 : 14, bottom: large ? 20 : 14, color: c.white, fontWeight: FW.head, ...(large ? rv('fs', 22, 18) : { fontSize: 15 }), lineHeight: LH.head, textShadow: SH.text, textAlign: 'left' }}>
        {v.caption}
        {v.sub && <span style={{ display: 'block', fontWeight: 400, fontSize: 13, marginTop: 4, opacity: 0.9 }}>{v.sub}</span>}
      </span>
    </>
  );
  const box = { position: 'relative', display: 'block', width: '100%', aspectRatio: ratio, borderRadius: R.lg, overflow: 'hidden', boxShadow: SH.card, background: c.forest, border: 'none', padding: 0, backgroundImage: v.poster ? undefined : `linear-gradient(160deg, ${c.sageD}, ${c.forest})` };
  return v.src
    ? <button type="button" className="card-hover" onClick={() => onOpen(v)} aria-label={`Play video: ${v.caption}`} style={{ ...box, cursor: 'pointer' }}>{inner}</button>
    : <div className="card-hover" style={box}>{inner}</div>;
}

export function VideoRow({ big = [], videos = [], eyebrow, title, intro, bg }) {
  const [open, setOpen] = useState(null);
  return (
    <Section bg={bg} style={{ overflow: 'hidden' }}>
      <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
      <Reveal>
        {big.length > 0 && (
          <div className="vid-big r-gap r-mb" style={{ ...rv('gap', ...SP.gap), ...rv('mb', ...SP.gap) }}>
            {big.map((v, i) => <VideoCard key={i} v={v} ratio="9 / 8" onOpen={setOpen} large />)}
          </div>
        )}
        {videos.length > 0 && (
          <div className="vid-row r-gap" style={rv('gap', ...SP.gap)}>
            {videos.map((v, i) => <VideoCard key={i} v={v} ratio="9 / 16" onOpen={setOpen} />)}
          </div>
        )}
      </Reveal>
      <VideoModal video={open} onClose={() => setOpen(null)} />
    </Section>
  );
}

// ---------------------------------------------------------------------------
// Trust-band: garantie, retour, verzending, ontwerp. Rustige iconen.
// ---------------------------------------------------------------------------
const ICON = {
  shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></>,
  ret: <><path d="M4 9h11a5 5 0 0 1 0 10H9" /><path d="M8 5 4 9l4 4" /></>,
  truck: <><path d="M3 6h11v9H3z" /><path d="M14 9h4l3 3v3h-7" /><circle cx="7" cy="17" r="1.8" /><circle cx="17" cy="17" r="1.8" /></>,
  leaf: <><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14Z" /><path d="M5 19 13 11" /></>,
  pin: <><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
};
export function Icon({ name, size = 24, color = c.sageD }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICON[name]}</svg>;
}

export const TRUST_ITEMS = [
  ['shield', 'Not a single bite, or your money back', '30-day guarantee. If a tick or mosquito gets through the mesh, we refund you in full.'],
  ['ret', 'Easy returns', 'Changed your mind or need another size? Return it within 30 days.', '/returns'],
  ['truck', 'Ships from Houston, Texas', 'Tracked delivery to the US and Canada within 5 days. Free on orders over $150.'],
  ['pin', 'Designed in the Netherlands', 'Developed and run from the Netherlands, shipped from our US warehouse.', '/about'],
];

export function TrustBand({ bg = c.mint }) {
  return (
    <Section bg={bg} pad={['56px 40px', '44px 20px']}>
      <div className="trust-grid r-gap" style={rv('gap', 28, 22)}>
        {TRUST_ITEMS.map(([icon, title, text, to], i) => (
          <Reveal key={title} delay={i * 80} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, width: 48, height: 48, borderRadius: R.pill, background: c.white, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: SH.card }}><Icon name={icon} /></span>
            <div>
              <div style={{ fontWeight: FW.head, fontSize: 15, lineHeight: LH.head, color: c.dark }}>{title}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, color: c.grayD, marginTop: 4 }}>{text}{to && <> <Link to={to} className="u-link" style={{ color: c.sageD, fontWeight: FW.mid }}>More about {title.toLowerCase().includes('return') ? 'returns' : 'Bug Away'}</Link></>}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// Nieuwsbrief (Brevo lijst 9). Eén keer per pagina, in de footer (#newsletter).
// ---------------------------------------------------------------------------
export function NewsletterForm({ dark = true }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const submit = async (e) => {
    e.preventDefault();
    setState('busy');
    try { await subscribe(email, 'newsletter'); setState('done'); } catch { setState('error'); }
  };
  if (state === 'done') return <p style={{ fontWeight: FW.mid, color: dark ? c.white : c.dark }}>You're in. Check your inbox for your welcome code.</p>;
  return (
    <>
      <form onSubmit={submit} style={{ display: 'flex', alignItems: 'center', background: c.white, borderRadius: R.sm, padding: 5, maxWidth: 460, boxShadow: SH.card }}>
        <label htmlFor="nl-email" style={{ position: 'absolute', left: -9999 }}>Email address</label>
        <input id="nl-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address"
          style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontSize: 16, padding: '10px 12px', color: c.dark }} />
        <button type="submit" disabled={state === 'busy'} style={{ ...BTN_SM, flexShrink: 0 }}>{state === 'busy' ? '…' : 'Get 15% off'}</button>
      </form>
      {state === 'error' && <p style={{ fontSize: 13, color: '#ffd5d5', marginTop: 8 }}>Something went wrong. Please try again.</p>}
    </>
  );
}

export { BTN, BTNO };
