import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { c, rv, FW, R, LH, W, CHIP, EYEBROW, T } from '../theme';
import { products } from '../data';
import { CATS, AUDIENCES } from '../data/catalog';
import { useCurrency } from '../currency.jsx';
import { ProductCard, TrustBand } from '../components/ui';

// Collectiepagina met werkende filters. Filters staan in de URL
// (/shop?cat=sets, /shop?for=women) zodat menu, footer en advertenties naar
// een voorgefilterde selectie kunnen linken. Oude links (/shop/men,
// ?cat=MEN) worden vertaald.
const LEGACY = { men: ['for', 'men'], women: ['for', 'women'], kids: ['cat', 'kids'], bundles: ['cat', 'sets'], accessories: ['cat', 'accessories'], pets: ['cat', 'all'] };
const SORTS = [['featured', 'Featured'], ['low', 'Price: low to high'], ['high', 'Price: high to low']];
const ORDER = ['ba-combo-men', 'ba-combo-women', 'ba-kids-set', 'ba-jacket-men', 'ba-jacket-women', 'ba-pants-men', 'ba-pants-women', 'ba-tick-kit', 'ba-storage-pouch', 'ba-repellent-spray'];

function readFilters(search, param) {
  const q = new URLSearchParams(search);
  let cat = (q.get('cat') || 'all').toLowerCase();
  let aud = (q.get('for') || 'all').toLowerCase();
  const legacy = LEGACY[(param || '').toLowerCase()] || LEGACY[cat];
  if (legacy) { if (legacy[0] === 'for') { aud = legacy[1]; cat = 'all'; } else cat = legacy[1]; }
  if (cat !== 'all' && !CATS.some((x) => x.key === cat && !x.soon)) cat = 'all';
  if (aud !== 'all' && !AUDIENCES.some((x) => x.key === aud)) aud = 'all';
  return { cat, aud };
}

export default function Shop() {
  const loc = useLocation();
  const nav = useNavigate();
  const { category } = useParams();
  const { price } = useCurrency();
  // Eerste render = server-HTML (alles); daarna de filters uit de URL.
  const [f, setF] = useState({ cat: 'all', aud: 'all' });
  const [sort, setSort] = useState('featured');
  useEffect(() => { setF(readFilters(loc.search, category)); }, [loc.search, category]);

  const set = (next) => {
    const v = { ...f, ...next };
    const q = new URLSearchParams();
    if (v.cat !== 'all') q.set('cat', v.cat);
    if (v.aud !== 'all') q.set('for', v.aud);
    nav(`/shop${q.toString() ? `?${q}` : ''}`, { replace: true });
  };

  const catIds = f.cat === 'all' ? ORDER : CATS.find((x) => x.key === f.cat).ids;
  const audIds = f.aud === 'all' ? null : AUDIENCES.find((x) => x.key === f.aud).ids;
  let list = ORDER.filter((id) => catIds.includes(id) && (!audIds || audIds.includes(id)) && products.some((p) => p.id === id));
  if (sort !== 'featured') {
    const byId = Object.fromEntries(products.map((p) => [p.id, p]));
    list = [...list].sort((a, b) => (price(byId[a]) - price(byId[b])) * (sort === 'low' ? 1 : -1));
  }
  const cat = CATS.find((x) => x.key === f.cat);
  const title = f.aud !== 'all' ? `${AUDIENCES.find((x) => x.key === f.aud).label}` : cat ? cat.label : 'Shop all';
  const intro = cat ? cat.intro : 'Chemical-free mesh protection for the whole family, plus the accessories that finish the job.';

  const chip = (on) => ({ ...CHIP, fontSize: 14, padding: '10px 16px', minHeight: 42, border: `1.5px solid ${on ? c.dark : c.line}`, background: on ? c.dark : c.white, color: on ? c.white : c.dark, cursor: 'pointer', justifyContent: 'flex-start' });

  return (
    <div>
      <section className="r-pad" style={{ background: c.off, ...rv('pad', '48px 40px 36px', '30px 20px 24px') }}>
        <div style={{ maxWidth: W.page, margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: c.grayD, marginBottom: 10 }}><Link to="/" style={{ color: c.grayD }}>Home</Link> › Shop</nav>
          <h1 className="r-fs" style={{ ...rv('fs', ...T.h1), fontWeight: FW.head, lineHeight: LH.tight }}>{title}</h1>
          <p style={{ fontSize: 16, color: c.grayD, lineHeight: LH.body, marginTop: 10, maxWidth: 620 }}>{intro}</p>
        </div>
      </section>

      <section className="r-pad" style={rv('pad', '36px 40px 72px', '20px 16px 56px')}>
        <div className="shop-layout" style={{ maxWidth: W.page, margin: '0 auto' }}>
          <aside aria-label="Filters">
            <div style={{ ...EYEBROW, color: c.grayD, marginBottom: 10 }}>Category</div>
            <div className="tabs" style={{ flexWrap: 'wrap' }}>
              <button type="button" onClick={() => set({ cat: 'all' })} aria-pressed={f.cat === 'all'} style={chip(f.cat === 'all')}>All</button>
              {CATS.filter((x) => !x.soon).map((x) => (
                <button key={x.key} type="button" onClick={() => set({ cat: x.key })} aria-pressed={f.cat === x.key} style={chip(f.cat === x.key)}>{x.label}</button>
              ))}
            </div>
            <div style={{ ...EYEBROW, color: c.grayD, margin: '20px 0 10px' }}>For</div>
            <div className="tabs" style={{ flexWrap: 'wrap' }}>
              <button type="button" onClick={() => set({ aud: 'all' })} aria-pressed={f.aud === 'all'} style={chip(f.aud === 'all')}>Everyone</button>
              {AUDIENCES.filter((a) => a.key !== 'sets').map((a) => (
                <button key={a.key} type="button" onClick={() => set({ aud: a.key })} aria-pressed={f.aud === a.key} style={chip(f.aud === a.key)}>{a.label}</button>
              ))}
            </div>
            <div className="d-only" style={{ marginTop: 24, padding: 16, borderRadius: R.lg, background: c.mint }}>
              <b style={{ fontSize: 14, color: c.sageD }}>Buy 3 sets, get the 4th free</b>
              <p style={{ fontSize: 13, color: c.grayD, marginTop: 4, lineHeight: 1.5 }}>Mix men's, women's and kids' sets. Applied automatically at checkout.</p>
            </div>
          </aside>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 14, color: c.grayD }}>{list.length} product{list.length === 1 ? '' : 's'}</span>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: c.grayD }}>
                Sort
                <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ border: `1px solid ${c.line}`, borderRadius: R.sm, padding: '9px 10px', fontSize: 14, color: c.dark, background: c.white }}>
                  {SORTS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
              </label>
            </div>
            {list.length === 0
              ? <p style={{ padding: '40px 0', color: c.grayD }}>Nothing here yet. <button type="button" onClick={() => set({ cat: 'all', aud: 'all' })} style={{ border: 'none', background: 'none', color: c.sageD, fontWeight: FW.head, cursor: 'pointer' }}>Show all products</button></p>
              : <div className="pgrid pgrid-3 r-gap" style={rv('gap', 20, 12)}>{list.map((id, i) => <ProductCard key={id} id={id} priority={i < 2} />)}</div>}

            {CATS.some((x) => x.soon) && (
              <div style={{ marginTop: 36, padding: 20, borderRadius: R.lg, border: `1px dashed ${c.mist}`, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
                <b style={{ fontSize: 15 }}>Coming soon:</b>
                {CATS.filter((x) => x.soon).map((x) => <span key={x.key} style={{ ...CHIP, background: c.mint, color: c.sageD }}>{x.label}</span>)}
                <a href="#newsletter" className="u-link" style={{ marginLeft: 'auto', fontWeight: FW.head, color: c.sageD, fontSize: 14 }}>Hear first →</a>
              </div>
            )}
          </div>
        </div>
      </section>
      <TrustBand />
    </div>
  );
}
