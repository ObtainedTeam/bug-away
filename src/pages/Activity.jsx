import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { c, BTN, BTNO, H2, LBL } from "../theme";
import { getActivity, activities } from "../data/activities";
import { products } from "../data";
import { CartContext } from "../components/Cart";
import { useCurrency, formatPrice, getPrice } from "../currency.jsx";

/**
 * Eén component voor /gardening, /hiking, /fishing en /families.
 * De inhoud staat in src/data/activities.js.
 *
 * Let op de styling: deze pagina gebruikt bewust GEEN useIsMobile maar echte
 * CSS media queries. Deze pagina's worden geprerenderd, en useIsMobile leest
 * window.innerWidth, wat tijdens het prerenderen niet bestaat. De server zou dan
 * altijd de desktop-variant wegschrijven en op een telefoon zie je die eerst
 * staan tot React hem corrigeert. Met media queries klopt de HTML meteen voor
 * elk scherm en is er niks te corrigeren.
 */

const CSS = `
.act-hero { position: relative; min-height: 300px; display: flex; align-items: center;
  background-size: cover; background-position: center; }
.act-hero-in { max-width: 700px; padding: 72px 40px; color: #fff; }
.act-h1 { font-family: Archivo, sans-serif; font-size: 44px; font-weight: 900;
  line-height: 1.12; letter-spacing: -0.02em; margin: 0 0 16px; text-wrap: balance; }
.act-lede { font-size: 16px; line-height: 1.65; opacity: .9; max-width: 520px; margin: 0; }

.act-sec { padding: 72px 40px; }
.act-in { max-width: 1100px; margin: 0 auto; }
.act-narrow { max-width: 820px; margin: 0 auto; }

.act-stat { background: ${c.sageD}; color: #fff; padding: 28px 40px; text-align: center; }
.act-stat-v { font-family: Archivo, sans-serif; font-size: 38px; font-weight: 900; line-height: 1; }
.act-stat-l { font-family: 'Poppins', sans-serif; font-size: 13px; opacity: .85; margin-top: 6px; }

.act-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
.act-grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.act-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

.act-block + .act-block { margin-top: 28px; }
.act-block h3 { font-family: Archivo, sans-serif; font-size: 17px; font-weight: 800;
  line-height: 1.35; margin: 0 0 8px; color: ${c.dark}; }
.act-block p { font-size: 14px; line-height: 1.7; color: #666; margin: 0; }
.act-block-p { border-left: 3px solid #e8ede9; padding-left: 18px; }
.act-block-s { border-left: 3px solid ${c.sage}; padding-left: 18px; }

.act-tips { list-style: none; padding: 0; margin: 0; display: grid;
  grid-template-columns: 1fr 1fr; gap: 14px; }
.act-tips li { display: flex; gap: 12px; align-items: flex-start; font-size: 14px;
  line-height: 1.65; color: #555; background: #fff; border-radius: 12px; padding: 16px 18px;
  box-shadow: 0 2px 10px rgba(0,0,0,.05); }
.act-tips svg { flex-shrink: 0; margin-top: 3px; }

.act-gal img { width: 100%; height: 220px; object-fit: cover; border-radius: 16px; display: block; }

.act-card { background: #fff; border-radius: 16px; overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,.05); display: flex; flex-direction: column; }
.act-card-img { height: 190px; overflow: hidden; background: ${c.off}; }
.act-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.act-card-b { padding: 18px; display: flex; flex-direction: column; flex: 1; }
.act-card-n { font-weight: 700; font-size: 14px; line-height: 1.35; margin-bottom: 4px; }
.act-card-p { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600;
  color: ${c.sageD}; margin-bottom: 12px; }
.act-sizes { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 12px; }
.act-size { border: 1.5px solid #e0e8e3; background: #fff; border-radius: 5px;
  padding: 5px 9px; font-size: 11px; font-weight: 700; cursor: pointer; color: #555;
  font-family: 'Poppins', sans-serif; transition: all .15s; }
.act-size:hover { border-color: ${c.sage}; }
.act-size[data-on="1"] { background: ${c.sageD}; border-color: ${c.sageD}; color: #fff; }
.act-add { margin-top: auto; width: 100%; background: ${c.sageD}; color: #fff; border: none;
  border-radius: 4px; padding: 11px; font-size: 11px; font-family: 'Poppins', sans-serif;
  letter-spacing: .1em; text-transform: uppercase; font-weight: 600; cursor: pointer; }
.act-add:hover { filter: brightness(1.1); }
.act-add[data-ok="1"] { background: ${c.sage}; }
.act-card-l { display: block; text-align: center; margin-top: 8px; font-size: 11px;
  color: ${c.gray}; text-decoration: none; font-family: 'Poppins', sans-serif; }
.act-card-l:hover { color: ${c.sageD}; }

.act-next a { display: block; background: #fff; border-radius: 14px; padding: 18px;
  text-decoration: none; color: inherit; box-shadow: 0 2px 10px rgba(0,0,0,.05);
  transition: transform .15s; }
.act-next a:hover { transform: translateY(-3px); }

@media (max-width: 767px) {
  .act-hero { min-height: 220px; }
  .act-hero-in { padding: 48px 20px; }
  .act-h1 { font-size: 30px; }
  .act-sec { padding: 44px 20px; }
  .act-stat { padding: 22px 20px; }
  .act-stat-v { font-size: 30px; }
  .act-grid2, .act-grid3, .act-grid4, .act-tips { grid-template-columns: 1fr; gap: 24px; }
  .act-grid4 { gap: 16px; }
  .act-tips { gap: 10px; }
  .act-gal img { height: 180px; }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .act-grid4 { grid-template-columns: 1fr 1fr; }
}
`;

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.sage} strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function ProductCard({ product, onCartOpen }) {
  const { symbol, isUS } = useCurrency();
  const [size, setSize] = useState(null);
  const [added, setAdded] = useState(false);

  function add() {
    if (!size) return;
    CartContext.add(product, size, product.colors[0], 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    if (onCartOpen) onCartOpen();
  }

  return (
    <div className="act-card">
      <Link to={`/product/${product.id}`} className="act-card-img">
        <img src={product.images?.[0]} alt={product.name} loading="lazy" />
      </Link>
      <div className="act-card-b">
        <div className="act-card-n">{product.name}</div>
        <div className="act-card-p">{formatPrice(getPrice(product, isUS), symbol)}</div>

        <div className="act-sizes">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              className="act-size"
              data-on={size === s ? "1" : "0"}
              onClick={() => setSize(s)}
              aria-pressed={size === s}
            >
              {s}
            </button>
          ))}
        </div>

        <button type="button" className="act-add" data-ok={added ? "1" : "0"} onClick={add}>
          {added ? "Added ✓" : size ? "Add to cart" : "Select a size"}
        </button>
        <Link to={`/product/${product.id}`} className="act-card-l">
          View details →
        </Link>
      </div>
    </div>
  );
}

export default function Activity({ onCartOpen }) {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/|\/$/g, "");
  const a = getActivity(slug);

  if (!a) return null;

  const picks = a.productIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const others = activities.filter((x) => x.slug !== a.slug);

  return (
    <div>
      <style>{CSS}</style>

      {/* HERO */}
      <section
        className="act-hero"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(30,50,40,.78) 55%, rgba(30,50,40,.35) 100%), url('${a.hero}')`,
        }}
      >
        <div className="act-hero-in">
          <div style={{ ...LBL, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>{a.label}</div>
          <h1 className="act-h1">{a.h1}</h1>
          <p className="act-lede">{a.lede}</p>
        </div>
      </section>

      {/* STAT */}
      <div className="act-stat">
        <div className="act-stat-v">{a.stat.value}</div>
        <div className="act-stat-l">{a.stat.label}</div>
      </div>

      {/* PROBLEEM / OPLOSSING */}
      <section className="act-sec" style={{ background: "#fff" }}>
        <div className="act-in act-grid2">
          <div>
            <div style={{ ...LBL, color: "#c0392b" }}>THE PROBLEM</div>
            <h2 style={{ ...H2, fontSize: 26, marginBottom: 24 }}>What you are up against</h2>
            {a.problems.map((p) => (
              <div key={p.title} className="act-block act-block-p">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
          <div>
            <div style={{ ...LBL }}>THE SOLUTION</div>
            <h2 style={{ ...H2, fontSize: 26, marginBottom: 24 }}>How Bug Away handles it</h2>
            {a.solutions.map((s) => (
              <div key={s.title} className="act-block act-block-s">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIJ */}
      <section className="act-sec" style={{ background: c.off, paddingTop: 0, paddingBottom: 0 }}>
        <div className="act-in act-grid3 act-gal" style={{ padding: "48px 0" }}>
          {a.gallery.map((g) => (
            <img key={g.src} src={g.src} alt={g.alt} loading="lazy" />
          ))}
        </div>
      </section>

      {/* PRODUCTEN */}
      <section className="act-sec" style={{ background: "#fff" }}>
        <div className="act-in">
          <div style={{ ...LBL }}>WHAT TO WEAR</div>
          <h2 style={{ ...H2, marginBottom: 8 }}>Built for this</h2>
          <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, marginBottom: 32, maxWidth: 620 }}>
            Pick a size and add it straight to your cart. Free shipping on US orders over $150, and the
            combo sets come in under that on their own.
          </p>
          <div className="act-grid4">
            {picks.map((p) => (
              <ProductCard key={p.id} product={p} onCartOpen={onCartOpen} />
            ))}
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section className="act-sec" style={{ background: c.off }}>
        <div className="act-narrow">
          <div style={{ ...LBL }}>PRACTICAL</div>
          <h2 style={{ ...H2, marginBottom: 24 }}>Worth knowing</h2>
          <ul className="act-tips">
            {a.tips.map((t) => (
              <li key={t}>
                <Check />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="act-sec" style={{ background: c.sage, textAlign: "center" }}>
        <div className="act-narrow">
          <h2 style={{ ...H2, color: "#fff", fontSize: 30, marginBottom: 12 }}>
            Protection that cannot wash out
          </h2>
          <p style={{ color: "rgba(255,255,255,.85)", fontSize: 15, marginBottom: 28, lineHeight: 1.7 }}>
            No permethrin, no reapplying, nothing to wear off. Just a weave that ticks and mosquitoes
            cannot get through.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/shop" style={{ ...BTN, background: "#1a2e24", textDecoration: "none" }}>
              Shop all products
            </Link>
            <Link
              to="/how-it-works"
              style={{ ...BTNO, color: "#fff", borderColor: "#fff", textDecoration: "none" }}
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* ANDERE ACTIVITEITEN — interne links */}
      <section className="act-sec" style={{ background: "#fff" }}>
        <div className="act-in">
          <div style={{ ...LBL }}>ALSO FOR</div>
          <h2 style={{ ...H2, fontSize: 24, marginBottom: 24 }}>Other ways people use it</h2>
          <div className="act-grid3 act-next">
            {others.map((o) => (
              <Link key={o.slug} to={`/${o.slug}`}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{o.nav} →</div>
                <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  {o.lede.split(". ")[0]}.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
