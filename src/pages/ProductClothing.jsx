import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { c, rv, FW, R, SH, T, LH, SP, W, BTN, BTNO, CHIP, CARD, EYEBROW } from '../theme';
import { pic } from '../img';
import { products } from '../data';
import { buyNow, FAMILY_BUNDLE_SET_IDS, isPurchasable } from '../shopify';
import { CartContext } from '../components/Cart';
import { useCurrency } from '../currency.jsx';
import { useReviews, forProduct } from '../reviews';
import { Section, SectionHead, ProductCard, Stars, Price, Icon, TrustBand, VideoModal } from '../components/ui';
import { PayBadges } from '../components/Footer';
import { PDP_FAQ, PROOF, SPECS, related } from '../data/pdp';
import Reveal from '../components/Reveal';
import SizeFinder from '../components/SizeFinder';

// Productpagina kleding: de hele funnel op één pagina. Fotokolom links blijft
// staan (pd-sticky) terwijl de koopkolom meescrollt; op mobiel onder elkaar
// met een vaste koopbalk onderin. Alle claims komen uit data.js en data/pdp.js.

function Gallery({ product, color }) {
  // Foto's van de gekozen kleur eerst (bestandsnamen bevatten White/Black).
  const key = color === 'Black' ? /black/i : /white/i;
  const imgs = [...product.images.filter((s) => key.test(s)), ...product.images.filter((s) => !key.test(s))];
  const [i, setI] = useState(0);
  useEffect(() => { setI(0); }, [product.id, color]);
  const go = (d) => setI((x) => (x + d + imgs.length) % imgs.length);
  const src = imgs[i];
  const contain = /size-guide|infographic/.test(src);
  return (
    <div>
      <div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: R.lg, overflow: 'hidden', background: c.off }}>
        <img key={src} {...pic(src, '(max-width: 767px) 100vw, 620px')} alt={product.name} fetchpriority={i === 0 ? 'high' : undefined}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: contain ? 'contain' : 'cover', background: c.white }} />
        {imgs.length > 1 && ['prev', 'next'].map((d) => (
          <button key={d} type="button" onClick={() => go(d === 'prev' ? -1 : 1)} aria-label={d === 'prev' ? 'Previous photo' : 'Next photo'}
            style={{ position: 'absolute', top: '50%', [d === 'prev' ? 'left' : 'right']: 12, transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: R.pill, border: 'none', background: 'rgba(255,255,255,.92)', boxShadow: SH.card, cursor: 'pointer', fontSize: 18, color: c.dark }}>{d === 'prev' ? '←' : '→'}</button>
        ))}
        <span style={{ ...CHIP, position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,.92)', color: c.dark }}>{i + 1} / {imgs.length}</span>
      </div>
      <div className="thumbs">
        {imgs.map((s, k) => (
          <button key={s} type="button" onClick={() => setI(k)} aria-label={`Photo ${k + 1}`}
            style={{ border: `2px solid ${k === i ? c.sageD : 'transparent'}`, borderRadius: R.sm, padding: 0, cursor: 'pointer', background: c.off, overflow: 'hidden' }}>
            <img {...pic(s, '72px')} alt="" loading="lazy" decoding="async" style={{ width: 68, height: 68, objectFit: 'cover', display: 'block' }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function SizeGuide({ product, onClose, onPick }) {
  const kids = product.id.includes('kids');
  const [tab, setTab] = useState(kids ? 'chart' : 'finder');
  const charts = product.id.includes('kids') ? ['/images/size-guide-kids.png']
    : product.id.includes('pants') ? ['/images/size-guide-pants.png']
      : product.id.includes('jacket') ? ['/images/size-guide-chart.png']
        : ['/images/size-guide-chart.png', '/images/size-guide-pants.png'];
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const ov = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ov; };
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-label="Size guide" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(26,46,36,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ ...CARD, width: 'min(720px, 100%)', maxHeight: '90vh', overflowY: 'auto', padding: 24, position: 'relative' }}>
        <button type="button" onClick={onClose} aria-label="Close size guide" style={{ position: 'absolute', top: 10, right: 10, width: 44, height: 44, border: 'none', background: 'none', fontSize: 26, cursor: 'pointer', color: c.dark }}>×</button>
        <h2 style={{ fontSize: 22, fontWeight: FW.head, marginBottom: 6 }}>Find your size</h2>
        <p style={{ fontSize: 14, color: c.grayD, marginBottom: 16 }}>Bug Away goes over your own clothes. Between two sizes? Size up: a looser fit breathes better and gives a mosquito nothing to press against.</p>
        {!kids && (
          <div role="tablist" style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {[['finder', 'Size finder'], ['chart', 'Size chart']].map(([k, l]) => (
              <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
                style={{ ...CHIP, minHeight: 42, fontSize: 14, padding: '0 16px', border: `1.5px solid ${tab === k ? c.dark : c.line}`, background: tab === k ? c.dark : c.white, color: tab === k ? c.white : c.dark, cursor: 'pointer' }}>{l}</button>
            ))}
          </div>
        )}
        {tab === 'finder' && <SizeFinder product={product} onPick={(s) => { onPick(s); onClose(); }} />}
        {tab === 'chart' && <>{charts.map((s) => <img key={s} {...pic(s, '680px')} alt="Size chart" style={{ width: '100%', borderRadius: R.sm, marginBottom: 10 }} />)}
        <div className="grid-2m1" style={{ gap: 10 }}>
          <img {...pic('/images/size-guide-jacket.png', '340px')} alt="How to measure" style={{ width: '100%', borderRadius: R.sm }} />
          <img {...pic('/images/size-guide-fittype.png', '340px')} alt="Fit type" style={{ width: '100%', borderRadius: R.sm }} />
        </div></>}
      </div>
    </div>
  );
}

export default function ProductClothing({ onCartOpen }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) || products[0];
  const { price, compare, fmt, code, region } = useCurrency();
  const all = useReviews();
  const own = forProduct(all, product.id);
  const rating = own.count ? own : (all && all.count ? { ...all, store: true } : null);

  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [need, setNeed] = useState(false);
  const [added, setAdded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [guide, setGuide] = useState(false);
  const [video, setVideo] = useState(null);
  const [sticky, setSticky] = useState(false);
  const buyRef = useRef(null);

  useEffect(() => { setColor(product.colors[0]); setSize(null); setQty(1); setNeed(false); }, [product.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Vaste koopbalk op mobiel zodra de koopknoppen uit beeld zijn
  useEffect(() => {
    const el = buyRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => setSticky(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    document.body.classList.add('has-sticky-buy');
    return () => { io.disconnect(); document.body.classList.remove('has-sticky-buy'); };
  }, [product.id]);

  const p = price(product);
  const cmp = compare(product);
  const isSet = FAMILY_BUNDLE_SET_IDS.includes(product.id);

  const requireSize = () => {
    if (size) return true;
    setNeed(true);
    const el = document.getElementById('size-picker');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  };
  const add = () => {
    if (!requireSize()) return;
    CartContext.add(product, size, color, qty);
    setAdded(true); onCartOpen && onCartOpen();
    setTimeout(() => setAdded(false), 2000);
  };
  const buy = async () => {
    if (!requireSize()) return;
    setBusy(true);
    await buyNow(product.id, size, color);
    setBusy(false);
  };

  const label = { fontSize: 14, fontWeight: FW.head, color: c.dark };

  return (
    <div>
      <nav aria-label="Breadcrumb" style={{ maxWidth: W.page + 80, margin: '0 auto', padding: '14px 20px 0', fontSize: 13, color: c.grayD }}>
        <Link to="/" style={{ color: c.grayD }}>Home</Link> <span aria-hidden="true">›</span> <Link to="/shop" style={{ color: c.grayD }}>Shop</Link> <span aria-hidden="true">›</span> <span style={{ color: c.dark }}>{product.name}</span>
      </nav>

      {/* 1. Boven de vouw: sticky galerij + koopkolom */}
      <section className="pd-top r-pad r-gap" style={{ maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', '20px 40px 64px', '12px 16px 40px'), ...rv('gap', 56, 22) }}>
        <div className="pd-sticky"><Gallery product={product} color={color} /></div>

        <div>
          <span style={{ ...EYEBROW, marginBottom: 8 }}>{isSet ? 'Full set · jacket + pants' : product.category === 'KIDS' ? 'Kids' : product.category === 'WOMEN' ? 'Women' : 'Men'}</span>
          <h1 className="r-fs" style={{ ...rv('fs', 38, 28), fontWeight: FW.head, lineHeight: LH.tight }}>{product.name}</h1>

          {rating && (
            <a href="#reviews" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 10, textDecoration: 'none', color: c.grayD, fontSize: 14 }}>
              <Stars value={rating.avg} size={16} />
              <span><b style={{ color: c.dark }}>{rating.avg}</b> · {rating.count} review{rating.count === 1 ? '' : 's'}{rating.store ? ' across Bug Away' : ''}</span>
            </a>
          )}

          <p style={{ fontSize: 16, lineHeight: LH.body, color: c.dark, fontWeight: FW.mid, marginTop: 14 }}>
            {product.benefit || 'A physical barrier ticks and mosquitoes can\'t get through. No DEET, no permethrin, nothing on your skin.'}
          </p>

          {product.useCases && (
            <ul aria-label="Made for" style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
              {product.useCases.slice(0, 5).map((u) => <li key={u} style={{ ...CHIP, background: c.mint, color: c.sageD, fontWeight: FW.mid }}>{u}</li>)}
            </ul>
          )}

          {/* Prijs */}
          <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px 12px', marginTop: 20 }}>
            <span style={{ fontSize: 32, fontWeight: FW.head, color: c.dark }}>{fmt(p)}<span style={{ fontSize: 13, color: c.grayD, marginLeft: 4 }}>{code}</span></span>
            {cmp && cmp > p && <s style={{ fontSize: 19, color: c.grayD }}>{fmt(cmp)}</s>}
            {cmp && cmp > p && <span style={{ ...CHIP, background: c.sageD, color: c.white }}>You save {fmt(cmp - p)}</span>}
          </div>
          <p style={{ fontSize: 13, color: c.grayD, marginTop: 4 }}>
            {cmp && cmp > p ? 'Less than buying the jacket and pants apart. ' : ''}Taxes and shipping calculated at checkout{region === 'CA' ? '. Price in CAD at today\'s rate.' : '.'}
          </p>

          {isSet && (
            <div style={{ marginTop: 16, background: c.mint, border: `1px solid ${c.mist}`, borderRadius: R.sm, padding: '12px 14px' }}>
              <b style={{ fontSize: 14, color: c.sageD }}>Family bundle: buy 3 sets, get the 4th free</b>
              <p style={{ fontSize: 13.5, color: c.grayD, marginTop: 2, lineHeight: 1.5 }}>Mix men's, women's and kids' sets. Add four and you only pay for three, applied automatically at checkout.</p>
            </div>
          )}

          {/* Kleur */}
          <div style={{ marginTop: 22 }}>
            <div style={label}>Color: <span style={{ fontWeight: 400, color: c.grayD }}>{color}</span></div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              {product.colors.map((col, k) => (
                <button key={col} type="button" onClick={() => setColor(col)} aria-pressed={color === col} aria-label={col}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px 0 10px', borderRadius: R.pill, border: `2px solid ${color === col ? c.dark : c.line}`, background: c.white, cursor: 'pointer', fontSize: 14, fontWeight: FW.mid, color: c.dark }}>
                  <i style={{ width: 22, height: 22, borderRadius: R.pill, background: product.colorHex[k], border: `1px solid ${c.gray}` }} />{col}
                </button>
              ))}
            </div>
          </div>

          {/* Maat */}
          <div id="size-picker" style={{ marginTop: 20, scrollMarginTop: 120 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={label}>Size: <span style={{ fontWeight: 400, color: need && !size ? '#b42318' : c.grayD }}>{size || (need ? 'Please choose a size' : 'Choose your size')}</span></div>
              <button type="button" onClick={() => setGuide(true)} className="u-link" style={{ background: 'none', border: 'none', color: c.sageD, fontWeight: FW.mid, fontSize: 14, cursor: 'pointer', padding: '8px 0' }}>Find my size</button>
            </div>
            <div className="sizes" style={{ marginTop: 8 }}>
              {product.sizes.map((s) => {
                const ok = isPurchasable(product.id, s, color);
                const on = size === s;
                return (
                  <button key={s} type="button" disabled={!ok} onClick={() => { setSize(s); setNeed(false); }} aria-pressed={on}
                    style={{ height: 46, borderRadius: R.sm, border: `2px solid ${on ? c.sageD : need && !size ? '#f3b4ae' : c.line}`, background: on ? c.sageD : ok ? c.white : c.off, color: on ? c.white : ok ? c.dark : c.gray, fontSize: 14, fontWeight: FW.mid, cursor: ok ? 'pointer' : 'default', textDecoration: ok ? 'none' : 'line-through' }}>{s}</button>
                );
              })}
            </div>
          </div>

          {/* Koopknoppen */}
          <div ref={buyRef} style={{ display: 'flex', gap: 10, marginTop: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: `2px solid ${c.line}`, borderRadius: R.sm, flexShrink: 0 }}>
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity" style={{ width: 40, height: 48, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: c.dark }}>−</button>
              <span aria-live="polite" style={{ width: 28, textAlign: 'center', fontWeight: FW.head }}>{qty}</span>
              <button type="button" onClick={() => setQty(qty + 1)} aria-label="Increase quantity" style={{ width: 40, height: 48, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: c.dark }}>+</button>
            </div>
            <button type="button" onClick={buy} disabled={busy} style={{ ...BTN, flex: 1, fontSize: 15, opacity: busy ? 0.7 : 1 }}>{busy ? 'One moment…' : 'Buy now'}</button>
          </div>
          <button type="button" onClick={add} style={{ ...BTNO, width: '100%', marginTop: 10, background: added ? c.mint : 'transparent' }}>{added ? 'Added to cart ✓' : 'Add to cart'}</button>

          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 16, padding: '12px 14px', borderRadius: R.sm, background: c.off }}>
            <Icon name="shield" size={22} />
            <div>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: c.dark }}><b>Not a single bite, or your money back.</b> <span style={{ color: c.grayD }}>30-day guarantee and 30-day returns.</span></p>
              <p style={{ fontSize: 13, lineHeight: 1.45, color: c.sageD, fontWeight: FW.mid, marginTop: 4 }}>Only 0.5% of customers ever use it. The other 99.5% keep it on.</p>
            </div>
          </div>

          <div className="grid-3m1" style={{ gap: 8, marginTop: 14 }}>
            {[['truck', 'Free shipping over $150'], ['leaf', 'No DEET, no permethrin'], ['pin', 'Ships from Houston, TX']].map(([ic, t]) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: FW.mid, color: c.dark }}><Icon name={ic} size={18} />{t}</div>
            ))}
          </div>
          <div style={{ marginTop: 14 }}><PayBadges dark={false} /></div>

          {/* Details als accordeon */}
          <div className="pd-acc" style={{ marginTop: 22 }}>
            {[
              ['Description', product.longDesc.split('\n\n').map((t, k) => <p key={k} style={{ marginBottom: 12 }}>{t}</p>)],
              ['Features', <ul key="f" style={{ listStyle: 'none', display: 'grid', gap: 8 }}>{product.features.map((f) => <li key={f} style={{ display: 'flex', gap: 10 }}><span style={{ color: c.sageD, fontWeight: FW.head }}>✓</span>{f}</li>)}</ul>],
              ['Shipping & returns', <p key="s">Orders ship from our warehouse in Houston, Texas, with tracking to the US and Canada. Shipping is free on orders over $150. Not happy? Return it within 30 days. If a tick or mosquito gets through the mesh, you get a full refund. <Link to="/returns" style={{ color: c.sageD, fontWeight: FW.mid }}>Return policy</Link></p>],
              ['Care', <p key="c">Machine wash cold on a gentle cycle, hang to dry or tumble dry low. There is no treatment to wash out, so the protection stays the same wash after wash.</p>],
            ].map(([q, a, open]) => (
              <details key={q} open={open}>
                <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '16px 0', minHeight: 52, fontSize: 15, fontWeight: FW.head, color: c.dark }}>
                  {q}<span className="pd-acc-icon" aria-hidden="true" style={{ fontSize: 22, fontWeight: 400 }}>+</span>
                </summary>
                <div style={{ fontSize: 15, lineHeight: LH.body, color: c.grayD, paddingBottom: 18 }}>{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Harde specificaties */}
      <section style={{ background: c.forest, color: c.white }}>
        <div className="grid-4m2 r-pad" style={{ maxWidth: W.page, margin: '0 auto', ...rv('pad', '40px 40px', '30px 20px'), gap: 20 }}>
          {SPECS.map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div className="r-fs" style={{ ...rv('fs', 32, 26), fontWeight: FW.head, lineHeight: 1.1 }}>{v}</div>
              <div style={{ fontSize: 13.5, color: c.mist, marginTop: 6, lineHeight: 1.4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. See it in action + bewijsbeelden */}
      <Section bg={c.off}>
        <SectionHead eyebrow="See it in action" title="Watch a tick try to get through" intro="Real ticks and mosquitoes on the actual Bug Away mesh. The openings are smaller than 0.6 mm, so they stay on the outside." />
        <div className="grid-4m2 r-gap" style={rv('gap', 18, 12)}>
          <Reveal>
            <button type="button" onClick={() => setVideo({ src: '/videos/see-in-action-720.mp4', poster: '/img/see-in-action-poster.webp', caption: 'See it in action' })} className="card-hover" aria-label="Play video: see it in action"
              style={{ position: 'relative', display: 'block', width: '100%', aspectRatio: '3 / 4', borderRadius: R.lg, overflow: 'hidden', border: 'none', padding: 0, cursor: 'pointer', background: c.forest, boxShadow: SH.card }}>
              <img src="/img/see-in-action-poster.webp" alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,46,36,0) 45%, rgba(26,46,36,.8))' }} />
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 60, height: 60, borderRadius: R.pill, background: 'rgba(255,255,255,.94)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill={c.forest}><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
              </span>
              <span style={{ position: 'absolute', left: 14, right: 14, bottom: 12, color: c.white, fontWeight: FW.head, fontSize: 15, textAlign: 'left', textShadow: SH.text }}>Play the video</span>
            </button>
          </Reveal>
          {PROOF.map((x, k) => (
            <Reveal key={x.cap} delay={(k + 1) * 80}>
              <figure style={{ ...CARD, overflow: 'hidden', height: '100%' }}>
                <div style={{ position: 'relative', aspectRatio: '3 / 4' }}>
                  <img {...pic(x.img, '(max-width: 767px) 50vw, 290px')} alt={x.cap} loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: x.pos }} />
                </div>
                <figcaption style={{ padding: '10px 14px 14px', fontSize: 14, fontWeight: FW.mid, color: c.dark, lineHeight: 1.4 }}>{x.cap}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>
      <VideoModal video={video} onClose={() => setVideo(null)} />

      {/* 4. Reviews */}
      {all && all.count > 0 && (
        <Section id="reviews" style={{ scrollMarginTop: 80 }}>
          <SectionHead align="left" eyebrow="Verified reviews" title={own.count ? 'What buyers of this product say' : 'What Bug Away wearers say'} mb={22}
            action={<Link to="/reviews" className="u-link" style={{ fontWeight: FW.head, color: c.sageD }}>All reviews →</Link>} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <Stars value={(own.count ? own : all).avg} size={20} />
            <span style={{ fontSize: 15, color: c.grayD }}><b style={{ color: c.dark }}>{(own.count ? own : all).avg} out of 5</b> · {(own.count ? own : all).count} reviews</span>
          </div>
          <div className="grid-3m1 r-gap" style={rv('gap', 20, 14)}>
            {(own.count ? own.reviews : all.reviews).slice(0, 6).map((r, k) => (
              <article key={k} style={{ ...CARD, padding: 22 }}>
                <Stars value={r.rating} size={14} />
                {r.title && <h3 style={{ fontSize: 16, fontWeight: FW.head, marginTop: 8 }}>{r.title}</h3>}
                <p className="clamp-5" style={{ fontSize: 15, lineHeight: LH.body, color: c.grayD, marginTop: 8 }}>“{r.body.trim()}”</p>
                <div style={{ marginTop: 12, fontSize: 14, fontWeight: FW.head }}>{(r.name || '').split(' ')[0]} {r.verified && <span style={{ ...CHIP, fontSize: 11, padding: '3px 8px', background: c.mint, color: c.sageD, marginLeft: 6 }}>Verified buyer</span>}</div>
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* 5. FAQ */}
      <Section bg={c.off}>
        <SectionHead title="Questions, answered" />
        <div className="pd-acc" style={{ maxWidth: W.text, margin: '0 auto' }}>
          {PDP_FAQ.map(([q, a]) => (
            <details key={q}>
              <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '18px 0', minHeight: 56, fontSize: 16, fontWeight: FW.head, color: c.dark }}>
                {q}<span className="pd-acc-icon" aria-hidden="true" style={{ fontSize: 22, fontWeight: 400 }}>+</span>
              </summary>
              <p style={{ fontSize: 15, lineHeight: LH.body, color: c.grayD, paddingBottom: 18 }}>{a}</p>
            </details>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 22, fontSize: 15 }}><Link to="/faq" className="u-link" style={{ color: c.sageD, fontWeight: FW.head }}>More questions in our help center →</Link></p>
      </Section>

      {/* 6. Complete your protection */}
      <Section>
        <SectionHead align="left" eyebrow="Complete your protection" title={isSet ? 'Gear up the whole family' : 'Finish the setup'}
          intro={isSet ? 'Every set counts toward the family bundle: buy 3, get the 4th free.' : undefined} mb={24} />
        <div className="pgrid r-gap" style={rv('gap', 20, 12)}>
          {related(product.id).map((rid) => <ProductCard key={rid} id={rid} />)}
        </div>
      </Section>

      <TrustBand />

      {guide && <SizeGuide product={product} onClose={() => setGuide(false)} onPick={(sz) => { setSize(sz); setNeed(false); }} />}

      {/* Vaste koopbalk (mobiel) */}
      <div className="m-only" aria-hidden={!sticky} style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 150, background: c.white, borderTop: `1px solid ${c.line}`, boxShadow: '0 -8px 24px rgba(44,53,48,.12)', padding: '10px 14px calc(10px + env(safe-area-inset-bottom))', display: 'flex', gap: 12, alignItems: 'center', transform: sticky ? 'none' : 'translateY(110%)', transition: 'transform .25s ease' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: FW.head, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</div>
          <Price product={product} size={15} />
        </div>
        <button type="button" tabIndex={sticky ? 0 : -1} onClick={size ? buy : () => requireSize()} style={{ ...BTN, height: 48, padding: '0 22px' }}>{size ? 'Buy now' : 'Choose size'}</button>
      </div>
    </div>
  );
}
