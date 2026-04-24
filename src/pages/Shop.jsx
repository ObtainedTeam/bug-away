import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { c, useIsMobile, BTN, H2, LBL } from '../theme';
import { products } from '../data';

const categories = [
  { label:"All", key:"all" },
  { label:"Men", key:"men" },
  { label:"Women", key:"women" },
  { label:"Kids", key:"kids" },
  { label:"Bundles", key:"bundles" },
  { label:"Extras", key:"extras" },
];

export default function Shop() {
  const { category } = useParams();
  const [activeFilter, setActiveFilter] = useState(category || "all");
  const isMobile = useIsMobile();

  const visible = activeFilter === "all" ? products : products.filter(p => p.cat === activeFilter);

  const catLabel = categories.find(c => c.key === activeFilter)?.label || "All Products";

  return (
    <div style={{ fontFamily:"'Archivo',sans-serif", color:c.dark }}>

      {/* Shop header */}
      <div style={{ background:`linear-gradient(135deg,${c.skyP} 0%,${c.mist} 100%)`, padding:isMobile?"40px 20px":"56px 60px" }}>
        <div style={LBL}>Shop</div>
        <h1 style={{ fontSize:isMobile?28:38, fontWeight:800, color:c.dark, marginBottom:8, letterSpacing:"-0.02em" }}>{catLabel}</h1>
        <p style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.grayD, fontWeight:300 }}>
          Tick-proof mesh clothing — chemical-free, lightweight, always effective.
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ background:"#fff", borderBottom:`1px solid ${c.glL}`, padding:`12px ${isMobile?"16px":"60px"}`, display:"flex", gap:8, flexWrap:"wrap", overflowX:"auto" }}>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveFilter(cat.key)}
            style={{
              padding:"7px 18px", borderRadius:24, whiteSpace:"nowrap",
              border:`1.5px solid ${activeFilter===cat.key?c.sageD:c.glL}`,
              background:activeFilter===cat.key?c.sageD:"#fff",
              color:activeFilter===cat.key?"#fff":c.grayD,
              fontSize:12, fontFamily:"'Poppins',sans-serif", fontWeight:600, cursor:"pointer",
            }}
          >
            {cat.label}
          </button>
        ))}
        <span style={{ marginLeft:"auto", fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.gray, alignSelf:"center", whiteSpace:"nowrap" }}>
          {visible.length} product{visible.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Product grid */}
      <section style={{ padding:isMobile?"24px 16px":"40px 60px" }}>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(3,1fr)", gap:isMobile?12:24 }}>
          {visible.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration:"none" }}>
              <div
                style={{ background:"#fff", borderRadius:8, overflow:"hidden", border:`1px solid ${c.glL}`, transition:"box-shadow 0.2s,transform 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 8px 32px rgba(90,102,96,0.13)"; e.currentTarget.style.transform="translateY(-4px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}
              >
                {/* Image */}
                <div style={{ height:isMobile?160:260, background:product.placeholderBg+"55", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:8, position:"relative" }}>
                  <span style={{ fontSize:isMobile?48:64 }}>{product.placeholderEmoji}</span>
                  <div style={{ display:"flex", gap:5 }}>
                    {product.colorHex.slice(0,4).map((col,i)=>(
                      <div key={i} style={{ width:12, height:12, borderRadius:"50%", background:col, border:`1.5px solid ${c.glL}` }}/>
                    ))}
                  </div>
                  {product.badge && (
                    <div style={{ position:"absolute", top:10, left:10, background:c.sageD, color:"#fff", fontSize:10, fontFamily:"'Poppins',sans-serif", fontWeight:700, padding:"3px 10px", borderRadius:20 }}>
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding:isMobile?"12px":"18px 20px 20px" }}>
                  <div style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:c.sage, fontFamily:"'Poppins',sans-serif", fontWeight:700, marginBottom:3 }}>{product.tag}</div>
                  <div style={{ fontSize:isMobile?13:15, fontWeight:700, color:c.dark, marginBottom:4 }}>{product.name}</div>
                  {!isMobile && <div style={{ fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.gray, marginBottom:8, lineHeight:1.5 }}>{product.description.substring(0,80)}…</div>}
                  <div style={{ fontSize:15, color:c.grayD, fontFamily:"'Poppins',sans-serif", marginBottom:12, fontWeight:500 }}>
                    € {product.price.toFixed(2).replace('.', ',')}
                  </div>
                  <div style={{ ...BTN, width:"100%", fontSize:11, padding:"10px 0", textAlign:"center", borderRadius:4 }}>
                    View Product
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {visible.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 0", color:c.gray, fontFamily:"'Poppins',sans-serif" }}>
            No products found in this category.
          </div>
        )}
      </section>

      {/* Tick protection banner */}
      <div style={{ background:`linear-gradient(120deg,${c.skyP} 0%,${c.sageL}55 100%)`, margin:`0 ${isMobile?"16px":"60px"}`, marginBottom:isMobile?24:40, borderRadius:10, padding:isMobile?"24px 20px":"32px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:20, flexDirection:isMobile?"column":"row", border:`1px solid ${c.mist}` }}>
        <div>
          <div style={{ fontSize:16, fontWeight:700, color:c.dark, marginBottom:6 }}>Not sure which size?</div>
          <div style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.grayD, fontWeight:300 }}>Check our size guide — Bug Away is designed to wear loosely over regular clothing.</div>
        </div>
        <Link to="/faq" style={{ ...BTN, whiteSpace:"nowrap", textDecoration:"none" }}>Size Guide</Link>
      </div>
    </div>
  );
}
