import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { c, FONT, FW, R, SH, T, LH, W, BTN, CHIP, CARD } from '../theme';
import { pic } from '../img';
import { CartContext } from './Cart';
import { useCurrency, REGIONS } from '../currency.jsx';
import { products } from '../data';
import { CATS, SECONDARY_LINKS, USE_CASES_NAV, productById, CARD_IMG, SHORT } from '../data/catalog';
import { BUGS } from '../data/bugs';
import { activities } from '../data/activities';
import { Price } from './ui';

// Navigatie naar het flip'nsleep-model: sluitbare aankondigingsbalk, sticky
// header, categorieën met dropdownpanelen op desktop en een drawer met
// accordeon op mobiel/tablet. Alle categorieën komen uit CATS in
// src/data/catalog.js; een categorie met `soon` krijgt vanzelf een
// "Soon"-badge. Desktop vs mobiel gaat via CSS (.nav-lg/.nav-sm), zodat de
// geprerenderde HTML en de browser-HTML identiek zijn.

const LINE = `1px solid ${c.line}`;

// Hoofdmenu: drie ingangen (product, insect, situatie) plus twee directe links.
const MENU = [
  { key: 'shop', label: 'Shop' },
  { key: 'bugs', label: 'Protect from' },
  { key: 'made', label: 'Made for' },
  { key: 'kids', label: 'Kids', to: '/shop?cat=kids' },
  { key: 'reviews', label: 'Reviews', to: '/reviews' },
];
const SHOP_CATS = CATS.filter((x) => !x.hideInShopMenu);
const SOON = { ...CHIP, fontSize: 10, padding: '3px 7px', background: c.mint, color: c.sageD, letterSpacing: '0.04em' };

function goNewsletter(e) {
  if (typeof document === 'undefined') return;
  const el = document.getElementById('newsletter');
  if (el) { e && e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
}

const svg = (d, size = 22) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const BagIcon = () => svg(<><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" /><path d="M9 10V6.5a3 3 0 0 1 6 0V10" /></>);
const SearchIcon = () => svg(<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>);
const UserIcon = () => svg(<><circle cx="12" cy="8" r="3.8" /><path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4" /></>);

function Chevron({ open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style={{ transition: 'transform .2s ease', transform: open ? 'rotate(180deg)' : 'none' }}>
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PanelCard({ id, onPick }) {
  const p = productById(id);
  const [name, line] = SHORT[id] || [p.name, ''];
  return (
    <Link to={`/product/${id}`} onClick={onPick} className="card-hover" style={{ ...CARD, textDecoration: 'none', overflow: 'hidden', display: 'block', color: c.dark }}>
      <div style={{ position: 'relative', background: c.off, aspectRatio: '1 / 1' }}>
        <img {...pic(CARD_IMG[id] || p.images[0], '200px')} loading="lazy" decoding="async" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: p.imageFit === 'contain' ? 'contain' : 'cover' }} />
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ fontWeight: FW.head, fontSize: 14, lineHeight: LH.head }}>{name}</div>
        <div style={{ fontSize: 12, color: c.grayD, margin: '2px 0 6px' }}>{line}</div>
        <Price product={p} size={14} />
      </div>
    </Link>
  );
}

function RegionSelect({ compact = false }) {
  const { region, setRegion } = useCurrency();
  return (
    <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <span style={{ position: 'absolute', left: -9999 }}>Currency</span>
      <select value={region} onChange={(e) => setRegion(e.target.value)}
        style={{ appearance: 'none', WebkitAppearance: 'none', border: LINE, borderRadius: R.sm, background: c.white, color: c.dark, fontSize: 13, fontWeight: FW.mid, padding: compact ? '7px 26px 7px 9px' : '8px 28px 8px 10px', cursor: 'pointer' }}>
        {Object.entries(REGIONS).map(([k, r]) => <option key={k} value={k}>{r.flag} {r.code}</option>)}
      </select>
      <span style={{ position: 'absolute', right: 9, pointerEvents: 'none', color: c.grayD, display: 'flex' }}><Chevron /></span>
    </label>
  );
}

function SearchPanel({ open, onClose }) {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  const nav = useNavigate();
  useEffect(() => { if (open) { setQ(''); setTimeout(() => inputRef.current && inputRef.current.focus(), 30); } }, [open]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  const term = q.trim().toLowerCase();
  const hits = term ? products.filter((p) => `${p.name} ${p.category} ${(p.useCases || []).join(' ')}`.toLowerCase().includes(term)).slice(0, 6) : [];
  return (
    <div role="dialog" aria-modal="true" aria-label="Search" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 250, background: 'rgba(26,46,36,.45)' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: c.white, padding: '18px 16px 22px', boxShadow: SH.float }}>
        <form onSubmit={(e) => { e.preventDefault(); if (hits[0]) { nav(`/product/${hits[0].id}`); onClose(); } }} style={{ maxWidth: W.text, margin: '0 auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ color: c.grayD, display: 'flex' }}><SearchIcon /></span>
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jackets, pants, kids, tick kit…" aria-label="Search products"
            style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', fontSize: 18, padding: '8px 0', color: c.dark }} />
          <button type="button" onClick={onClose} aria-label="Close search" style={{ border: 'none', background: 'none', fontSize: 26, lineHeight: 1, cursor: 'pointer', color: c.dark, padding: 6 }}>×</button>
        </form>
        {term && (
          <div style={{ maxWidth: W.text, margin: '12px auto 0' }}>
            {hits.length === 0 && <p style={{ color: c.grayD, fontSize: 14, padding: '8px 0' }}>No products found. Try "jacket", "kids" or "tick".</p>}
            {hits.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', textDecoration: 'none', color: c.dark, borderTop: LINE }}>
                <img {...pic(CARD_IMG[p.id] || p.images[0], '56px')} alt="" loading="lazy" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: R.sm, background: c.off }} />
                <span style={{ flex: 1, minWidth: 0, fontWeight: FW.mid, fontSize: 14 }}>{p.name}</span>
                <Price product={p} size={14} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const drawerRow = { display: 'flex', alignItems: 'center', gap: 8, minHeight: 44, textDecoration: 'none', color: c.dark, fontSize: 15, borderTop: `1px solid ${c.line}` };

function Panel({ id, open, width, children }) {
  return (
    <div id={`nav-panel-${id}`} className={`nav-panel${open ? ' is-open' : ''}`} role="region"
      style={{ position: 'absolute', top: 0, width: `min(${width}px, calc(100% - 48px))`, paddingTop: 10 }}>
      <div style={{ background: c.white, borderRadius: R.lg, boxShadow: SH.float, padding: 24, borderTop: `3px solid ${c.sage}` }}>{children}</div>
    </div>
  );
}

// Shop-paneel: categorieën links, producten van de aangewezen categorie rechts.
function ShopPanel({ onPick }) {
  const [cur, setCur] = useState(SHOP_CATS[0].key);
  const cat = SHOP_CATS.find((x) => x.key === cur);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px minmax(0, 1fr)', gap: 28, alignItems: 'start' }}>
      <ul style={{ listStyle: 'none', borderRight: LINE, paddingRight: 16 }}>
        {SHOP_CATS.map((x) => (
          <li key={x.key}>
            <Link to={x.soon ? '/shop' : `/shop?cat=${x.key}`} onMouseEnter={() => setCur(x.key)} onFocus={() => setCur(x.key)} onClick={onPick}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: R.sm, textDecoration: 'none', fontSize: 15, fontWeight: FW.mid, color: cur === x.key ? c.sageD : c.dark, background: cur === x.key ? c.mint : 'transparent' }}>
              {x.label}{x.soon && <span style={SOON}>SOON</span>}
            </Link>
          </li>
        ))}
        <li><Link to="/shop" onClick={onPick} className="u-link" style={{ display: 'block', padding: '12px 12px 4px', fontSize: 14, fontWeight: FW.head, color: c.sageD }}>Shop all products →</Link></li>
      </ul>
      {cat.soon ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, minHeight: 200 }}>
          <img {...pic(cat.soon.img, '160px')} loading="lazy" alt="" style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: R.sm, filter: 'grayscale(.3)' }} />
          <div>
            <span style={SOON}>COMING SOON</span>
            <div style={{ fontWeight: FW.head, fontSize: 20, margin: '8px 0 4px' }}>{cat.label}</div>
            <p style={{ fontSize: 14, color: c.grayD, lineHeight: 1.5, marginBottom: 8 }}>{cat.soon.text}</p>
            <a href="#newsletter" onClick={(e) => { onPick(); goNewsletter(e); }} className="u-link" style={{ fontSize: 14, fontWeight: FW.head, color: c.sageD }}>Join the list to hear first →</a>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: 14, color: c.grayD, lineHeight: 1.5, marginBottom: 14, maxWidth: 560 }}>{cat.intro}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 14 }}>
            {cat.ids.slice(0, 4).map((pid) => <PanelCard key={pid} id={pid} onPick={onPick} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function TilePanel({ title, intro, items, onPick, cols = 4 }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 16 }}>
        <b style={{ fontSize: 19 }}>{title}</b><span style={{ fontSize: 14, color: c.grayD }}>{intro}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 14 }}>
        {items.map((it) => (
          <Link key={it.to} to={it.to} onClick={onPick} className="card-hover" style={{ position: 'relative', display: 'block', aspectRatio: '4 / 5', borderRadius: R.lg, overflow: 'hidden', textDecoration: 'none' }}>
            <img {...pic(it.img, '220px')} loading="lazy" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,46,36,0) 40%, rgba(26,46,36,.82))' }} />
            <span style={{ position: 'absolute', left: 14, right: 14, bottom: 12, color: c.white, textShadow: SH.text }}>
              <b style={{ display: 'block', fontSize: 16 }}>{it.label}</b><span style={{ fontSize: 12.5, opacity: 0.92 }}>{it.sub}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Nav({ onCartOpen }) {
  const [drawer, setDrawer] = useState(false);
  const [acc, setAcc] = useState('shop');
  const [openCat, setOpenCat] = useState(null);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bar, setBar] = useState(true);
  const [count, setCount] = useState(0);
  const loc = useLocation();
  const headerRef = useRef(null);
  const btnRefs = useRef({});
  const drawerRef = useRef(null);

  useEffect(() => {
    const update = (items) => setCount((items || CartContext.items).reduce((s, i) => s + i.quantity, 0));
    update();
    CartContext.subscribe(update);
    return () => CartContext.unsubscribe(update);
  }, []);

  useEffect(() => {
    try { if (sessionStorage.getItem('ba-bar') === '0') setBar(false); } catch { /* */ }
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bij routewissel menu's sluiten
  const [path, setPath] = useState(loc.pathname);
  if (path !== loc.pathname) { setPath(loc.pathname); setDrawer(false); setOpenCat(null); setSearch(false); }

  useEffect(() => {
    if (!openCat) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') { const b = btnRefs.current[openCat]; setOpenCat(null); b && b.focus(); } };
    const onDown = (e) => { if (headerRef.current && !headerRef.current.contains(e.target)) setOpenCat(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, [openCat]);

  useEffect(() => {
    if (!drawer) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setDrawer(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = drawerRef.current && drawerRef.current.querySelector('button, a');
    first && first.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [drawer]);

  const close = () => setOpenCat(null);
  const closeBar = () => { setBar(false); try { sessionStorage.setItem('ba-bar', '0'); } catch { /* */ } };
  const iconBtn = { background: 'none', border: 'none', cursor: 'pointer', color: c.dark, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: R.pill, position: 'relative', textDecoration: 'none' };

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>

      {/* Aankondigingsbalk: één boodschap, sluitbaar */}
      {bar && (
        <div style={{ position: 'relative', background: c.forest, color: c.white, textAlign: 'center', padding: '9px 44px', fontSize: 13, lineHeight: LH.head, fontWeight: FW.mid }}>
          <Link to="/shop" className="u-link" style={{ color: c.white }}>
            Free shipping on orders over $150<span className="d-only"> · Tracked delivery to the US &amp; Canada from Houston, TX</span>
          </Link>
          <button type="button" onClick={closeBar} aria-label="Close announcement"
            style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, border: 'none', background: 'none', color: c.white, fontSize: 20, lineHeight: 1, cursor: 'pointer', opacity: 0.8 }}>×</button>
        </div>
      )}

      <header ref={headerRef} onMouseLeave={close}
        style={{ position: 'sticky', top: 0, zIndex: 90, background: 'rgba(255,255,255,.94)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: LINE, boxShadow: scrolled ? SH.card : 'none', transition: 'box-shadow .2s ease' }}>
        <div className="nav-bar" style={{ maxWidth: W.page + 80, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="nav-sm" type="button" aria-label="Open menu" aria-expanded={drawer} aria-controls="nav-drawer" onClick={() => setDrawer(true)} style={{ ...iconBtn, marginLeft: -8, flexDirection: 'column', gap: 5 }}>
            {[0, 1, 2].map((i) => <i key={i} style={{ width: 20, height: 2, background: c.dark, borderRadius: R.pill, display: 'block' }} />)}
          </button>

          <Link to="/" onMouseEnter={close} aria-label="Bug Away, home" style={{ textDecoration: 'none', fontWeight: 900, fontSize: 21, letterSpacing: '-0.02em', color: c.sageD, flexShrink: 0, whiteSpace: 'nowrap' }}>
            BUG AWAY
          </Link>

          {/* Desktop categorieën */}
          <nav className="nav-lg" aria-label="Shop by category" style={{ flex: 1, justifyContent: 'center' }}>
            <ul style={{ listStyle: 'none', display: 'flex', alignItems: 'center' }}>
              {MENU.map((m) => {
                const open = openCat === m.key;
                const style = { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '10px 13px', borderRadius: R.pill, color: open || (m.to && loc.pathname + loc.search === m.to) ? c.sageD : c.dark, fontSize: 15, fontWeight: FW.mid, whiteSpace: 'nowrap', textDecoration: 'none' };
                return (
                  <li key={m.key}>
                    {m.to ? (
                      <Link to={m.to} className="nav-cat" onMouseEnter={close} style={style}>{m.label}</Link>
                    ) : (
                      <button ref={(el) => { btnRefs.current[m.key] = el; }} type="button" className="nav-cat"
                        aria-expanded={open} aria-controls={`nav-panel-${m.key}`}
                        onMouseEnter={() => setOpenCat(m.key)}
                        onClick={(e) => setOpenCat(open && e.detail === 0 ? null : m.key)} style={style}>
                        {m.label}<Chevron open={open} />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }} onMouseEnter={close}>
            <div className="nav-lg" style={{ gap: 14, marginRight: 6 }}>
              <RegionSelect />
            </div>
            <button type="button" aria-label="Search" onClick={() => setSearch(true)} style={iconBtn}><SearchIcon /></button>
            <a href="https://checkout.bugawaygear.com/account" aria-label="Account" className="nav-lg" style={iconBtn}><UserIcon /></a>
            <button type="button" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`} onClick={onCartOpen} style={{ ...iconBtn, marginRight: -8 }}>
              <BagIcon />
              {count > 0 && <b style={{ position: 'absolute', top: 4, right: 2, minWidth: 18, height: 18, padding: '0 5px', background: c.sageD, color: c.white, fontSize: 11, lineHeight: 1, borderRadius: R.pill, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</b>}
            </button>
          </div>
        </div>

        {/* Dropdownpanelen (desktop) */}
        <div className="nav-lg" style={{ position: 'absolute', top: '100%', left: 0, right: 0, justifyContent: 'center', pointerEvents: 'none' }}>
          <Panel id="shop" open={openCat === 'shop'} width={W.page}>
            <ShopPanel onPick={close} />
          </Panel>
          <Panel id="bugs" open={openCat === 'bugs'} width={1000}>
            <TilePanel title="Protect from" intro="Every Bug Away set stops all four. Pick the one that bothers you most and see what works best."
              items={BUGS.map((b) => ({ to: `/protect/${b.key}`, img: b.img, label: b.label, sub: b.short }))} onPick={close} />
          </Panel>
          <Panel id="made" open={openCat === 'made'} width={W.page}>
            <TilePanel title="Made for" intro="Pick your situation and see what to wear for it."
              items={activities.map((a) => ({ to: `/${a.slug}`, img: a.hero, label: a.nav, sub: a.label.replace(/^FOR /, 'For ').toLowerCase().replace(/^for/, 'For') }))} onPick={close} cols={6} />
          </Panel>
        </div>
      </header>

      <SearchPanel open={search} onClose={() => setSearch(false)} />

      {/* Mobiele drawer */}
      <div className="nav-sm" style={{ display: 'contents' }}>
        <div onClick={() => setDrawer(false)} aria-hidden="true" className={`nav-scrim${drawer ? ' is-open' : ''}`} />
        <aside id="nav-drawer" ref={drawerRef} className={`nav-drawer${drawer ? ' is-open' : ''}`} aria-label="Menu" aria-hidden={!drawer} style={{ background: c.white, boxShadow: SH.float }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px 10px 20px', borderBottom: LINE }}>
            <span style={{ fontWeight: 900, fontSize: 19, color: c.sageD, letterSpacing: '-0.02em' }}>BUG AWAY</span>
            <button type="button" aria-label="Close menu" onClick={() => setDrawer(false)} style={iconBtn}>
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M5 5l12 12M17 5 5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
            {[['shop', 'Shop'], ['bugs', 'Protect from'], ['made', 'Made for']].map(([key, label]) => {
              const open = acc === key;
              return (
                <div key={key} style={{ borderBottom: LINE }}>
                  <button type="button" aria-expanded={open} aria-controls={`nav-acc-${key}`} onClick={() => setAcc(open ? null : key)}
                    style={{ width: '100%', minHeight: 54, display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: '12px 20px', color: c.dark, fontSize: 17, fontWeight: FW.head, textAlign: 'left' }}>
                    {label}<span style={{ marginLeft: 'auto', display: 'flex' }}><Chevron open={open} /></span>
                  </button>
                  <div id={`nav-acc-${key}`} hidden={!open} style={{ padding: '0 20px 14px' }}>
                    {key === 'shop' && SHOP_CATS.map((cat) => (
                      cat.soon
                        ? <a key={cat.key} href="#newsletter" onClick={(e) => { setDrawer(false); goNewsletter(e); }} style={drawerRow}>{cat.label}<span style={SOON}>SOON</span></a>
                        : <Link key={cat.key} to={`/shop?cat=${cat.key}`} onClick={() => setDrawer(false)} style={drawerRow}>{cat.label}<span style={{ marginLeft: 'auto', fontSize: 13, color: c.grayD }}>{cat.ids.length}</span></Link>
                    ))}
                    {key === 'shop' && <Link to="/shop" onClick={() => setDrawer(false)} style={{ ...drawerRow, color: c.sageD, fontWeight: FW.head }}>Shop all products →</Link>}
                    {key === 'bugs' && BUGS.map((b) => (
                      <Link key={b.key} to={`/protect/${b.key}`} onClick={() => setDrawer(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '7px 0', textDecoration: 'none', color: c.dark }}>
                        <img {...pic(b.img, '56px')} loading="lazy" alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: R.sm, flexShrink: 0 }} />
                        <span><b style={{ display: 'block', fontSize: 15 }}>{b.label}</b><span style={{ fontSize: 13, color: c.grayD }}>{b.short}</span></span>
                      </Link>
                    ))}
                    {key === 'made' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 2 }}>
                        {USE_CASES_NAV.map(([to, l]) => (
                          <Link key={to} to={to} onClick={() => setDrawer(false)} style={{ ...CHIP, fontSize: 14, padding: '10px 14px', background: c.mint, color: c.dark, textDecoration: 'none' }}>{l}</Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <Link to="/shop?cat=kids" onClick={() => setDrawer(false)} style={{ display: 'flex', alignItems: 'center', minHeight: 54, padding: '0 20px', color: c.dark, fontSize: 17, fontWeight: FW.head, textDecoration: 'none', borderBottom: LINE }}>Kids</Link>

            <div style={{ padding: '12px 0' }}>
              {[...SECONDARY_LINKS, ['/about', 'Our story'], ['/contact', 'Contact']].map(([to, label]) => (
                <Link key={to} to={to} onClick={() => setDrawer(false)} style={{ display: 'flex', alignItems: 'center', minHeight: 44, padding: '0 20px', color: loc.pathname === to ? c.sageD : c.dark, fontSize: 16, textDecoration: 'none' }}>{label}</Link>
              ))}
              <a href="https://checkout.bugawaygear.com/account" style={{ display: 'flex', alignItems: 'center', minHeight: 44, padding: '0 20px', color: c.dark, fontSize: 16, textDecoration: 'none' }}>My account</a>
            </div>
          </div>

          <div style={{ padding: '14px 20px calc(14px + env(safe-area-inset-bottom))', borderTop: LINE, display: 'flex', gap: 10, alignItems: 'center' }}>
            <RegionSelect compact />
            <Link to="/shop?cat=sets" onClick={() => setDrawer(false)} style={{ ...BTN, flex: 1, height: 46 }}>Shop full sets</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
