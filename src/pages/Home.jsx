import { Link } from 'react-router-dom';
import { c, useIsMobile, BTN, BTNO, H2, LBL } from '../theme';
import { products, reviews, blogPosts } from '../data';
import VideoBlock from '../components/VideoBlock';
import { useCurrency, formatPrice } from '../currency';

const pad = (m) => m ? "48px 20px" : "64px 60px";

function StarRow({ n }) {
  return <div style={{ display:"flex", gap:2 }}>{[...Array(n)].map((_,i)=><span key={i} style={{ color:"#F0B429", fontSize:14 }}>★</span>)}</div>;
}

function ProductCard({ product, isMobile, symbol }) {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration:"none" }}>
      <div style={{ background:"#fff", borderRadius:8, overflow:"hidden", border:`1px solid ${c.glL}`, transition:"box-shadow 0.2s, transform 0.2s" }}
        onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 8px 32px rgba(90,102,96,0.13)"; e.currentTarget.style.transform="translateY(-4px)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}>
        {/* Product image */}
        <div style={{ height:isMobile?160:220, position:"relative", background:product.placeholderBg+"55", overflow:"hidden" }}>
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
            onError={e=>{ e.target.style.display="none"; }}
          />
          {product.badge && (
            <div style={{ position:"absolute", top:12, left:12, background:c.sageD, color:"#fff", fontSize:10, fontFamily:"'Poppins',sans-serif", fontWeight:700, padding:"3px 10px", borderRadius:20, letterSpacing:"0.06em" }}>
              {product.badge}
            </div>
          )}
          <div style={{ position:"absolute", bottom:10, left:12, display:"flex", gap:5 }}>
            {product.colorHex.slice(0,4).map((col,i)=>(
              <div key={i} style={{ width:11, height:11, borderRadius:"50%", background:col, border:`1.5px solid rgba(255,255,255,0.8)` }}/>
            ))}
          </div>
        </div>
        <div style={{ padding:isMobile?"12px 14px 16px":"16px 18px 20px" }}>
          <div style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:c.sage, fontFamily:"'Poppins',sans-serif", fontWeight:700, marginBottom:3 }}>{product.tag}</div>
          <div style={{ fontSize:isMobile?13:15, fontWeight:700, color:c.dark, marginBottom:4 }}>{product.name}</div>
          <div style={{ fontSize:14, color:c.grayD, fontFamily:"'Poppins',sans-serif", marginBottom:12, fontWeight:500 }}>{formatPrice(product.price, symbol)}</div>
          <div style={{ ...BTN, width:"100%", fontSize:11, padding:"10px 0", textAlign:"center", borderRadius:4 }}>Add to Cart</div>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const isMobile = useIsMobile();
  const { symbol } = useCurrency();
  const featuredProducts = products.slice(0, isMobile ? 4 : 4);

  return (
    <div style={{ fontFamily:"'Archivo',sans-serif", color:c.dark }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        position:"relative", minHeight:isMobile?480:560,
        background:`linear-gradient(135deg,${c.skyP} 0%,${c.mist} 45%,${c.sageL} 100%)`,
        display:"flex", alignItems:"center",
        padding:isMobile?"60px 20px 48px":"0 60px",
        overflow:"hidden",
      }}>
        {/* Background nature image */}
        <img
          src="/images/lifestyle-couple-forest.png"
          alt="Couple hiking in forest with Bug Away"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.5 }}
        />
        {/* Dark overlay for text readability */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 100%)" }} />
        <div style={{ position:"relative", zIndex:1, maxWidth:600 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", border:`1px solid rgba(255,255,255,0.3)`, borderRadius:20, padding:"6px 14px", fontSize:11, color:"#ffffff", fontFamily:"'Poppins',sans-serif", fontWeight:600, marginBottom:20 }}>
            🌿 Insecticide-free · Tick-proof · Eco-responsible
          </div>
          <h1 style={{ fontSize:isMobile?36:58, fontWeight:800, lineHeight:1.08, color:"#ffffff", marginBottom:16, letterSpacing:"-0.02em" }}>
            Enjoy the Outdoors.<br/><span style={{ color:c.sageL }}>Safe & Carefree.</span>
          </h1>
          <p style={{ fontSize:isMobile?14:16, color:"rgba(255,255,255,0.88)", fontFamily:"'Poppins',sans-serif", fontWeight:300, lineHeight:1.75, maxWidth:460, marginBottom:12 }}>
            Lightweight mesh clothing that physically blocks ticks and insects. No DEET, no chemicals — just a smart layer between you and nature.
          </p>
          <p style={{ fontSize:13, color:c.sageL, fontFamily:"'Poppins',sans-serif", fontWeight:500, marginBottom:32, fontStyle:"italic" }}>
            "Like a screen porch for your body 🌿"
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Link to="/shop" style={{ ...BTN, textDecoration:"none" }}>Shop Now</Link>
            <Link to="/how-it-works" style={{ ...BTNO, textDecoration:"none" }}>How It Works</Link>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ─────────────────────────────── */}
      <div style={{ background:"#fff", borderBottom:`1px solid ${c.glL}`, padding:"16px 40px", display:"flex", alignItems:"center", justifyContent:"center", gap:isMobile?24:48, flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ display:"flex", gap:1 }}>{[...Array(5)].map((_,i)=><span key={i} style={{ color:"#F0B429", fontSize:14 }}>★</span>)}</div>
          <span style={{ fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.grayD }}>500+ happy customers</span>
        </div>
        {!isMobile && <div style={{ width:1, height:20, background:c.glL }} />}
        <div style={{ fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.grayD }}>🛡️ 100% chemical-free</div>
        {!isMobile && <div style={{ width:1, height:20, background:c.glL }} />}
        <div style={{ fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.grayD }}>🌍 Ships to EU & North America</div>
        {!isMobile && <div style={{ width:1, height:20, background:c.glL }} />}
        <div style={{ fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.grayD }}>↩️ 30-day returns</div>
      </div>

      {/* ── SHOP BY CATEGORY ─────────────────────────────── */}
      <section style={{ padding:pad(isMobile), background:c.off }}>
        <div style={LBL}>Shop by category</div>
        <h2 style={{ ...H2, marginBottom:32 }}>Protection for everyone</h2>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)", gap:isMobile?12:20 }}>
          {[
            { label:"Men", to:"/shop/men", img:"/images/product-men-jacket-front.png" },
            { label:"Women", to:"/shop/women", img:"/images/lifestyle-women-outdoor.png" },
            { label:"Kids", to:"/shop/kids", img:"/images/lifestyle-kids-forest.png" },
            { label:"Bundles", to:"/shop/bundles", img:"/images/lifestyle-couple-forest.png" },
          ].map((cat,i)=>(
            <Link key={i} to={cat.to} style={{ textDecoration:"none" }}>
              <div style={{ borderRadius:10, overflow:"hidden", position:"relative", height:isMobile?160:220, cursor:"pointer", transition:"transform 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                <img src={cat.img} alt={cat.label} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"brightness(0.75)" }}/>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 60%)" }}/>
                <div style={{ position:"absolute", bottom:16, left:16 }}>
                  <div style={{ fontSize:isMobile?16:18, fontWeight:800, color:"#fff", letterSpacing:"-0.01em" }}>{cat.label}</div>
                  <div style={{ fontSize:11, fontFamily:"'Poppins',sans-serif", color:"rgba(255,255,255,0.8)", marginTop:2 }}>Shop →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────── */}
      <section style={{ padding:pad(isMobile), background:"#fff" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:32, flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={LBL}>Featured</div>
            <h2 style={H2}>Our best sellers</h2>
          </div>
          <Link to="/shop" style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.sageD, fontWeight:600, textDecoration:"none" }}>View all →</Link>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)", gap:isMobile?12:20 }}>
          {featuredProducts.map(p => <ProductCard key={p.id} product={p} isMobile={isMobile} symbol={symbol} />)}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section style={{ padding:pad(isMobile), background:`linear-gradient(135deg,${c.skyP} 0%,${c.off} 100%)` }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ ...LBL, textAlign:"center" }}>How it works</div>
            <h2 style={{ ...H2, textAlign:"center", marginBottom:12 }}>Like a screen porch for your body</h2>
            <p style={{ fontSize:14, color:c.grayD, fontFamily:"'Poppins',sans-serif", fontWeight:300, lineHeight:1.85, maxWidth:560, margin:"0 auto" }}>
              The mesh physically blocks ticks while letting air through. Simple, effective, chemical-free.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)", gap:isMobile?12:24 }}>
            {[
              { step:"01", icon:"🕷️", title:"Ticks crawl upward", text:"Looking for warm skin through grass and shrubs." },
              { step:"02", icon:"🧥", title:"Mesh blocks them", text:"Noseeum-grade mesh is too fine for any tick to penetrate." },
              { step:"03", icon:"💨", title:"Air gap protects", text:"The space between mesh and skin keeps ticks at distance." },
              { step:"04", icon:"✅", title:"You enjoy outside", text:"Chemical-free, light and breathable. Just put it on." },
            ].map((s,i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:10, padding:isMobile?"16px":"24px 20px", border:`1px solid ${c.glL}` }}>
                <div style={{ fontSize:10, fontFamily:"'Poppins',sans-serif", fontWeight:700, color:c.sage, letterSpacing:"0.12em", marginBottom:8 }}>{s.step}</div>
                <div style={{ fontSize:isMobile?22:28, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontSize:isMobile?12:14, fontWeight:700, color:c.dark, marginBottom:6, lineHeight:1.3 }}>{s.title}</div>
                <div style={{ fontSize:11, fontFamily:"'Poppins',sans-serif", color:c.gray, lineHeight:1.6 }}>{s.text}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:32 }}>
            <Link to="/how-it-works" style={{ ...BTNO, textDecoration:"none" }}>Learn More</Link>
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ────────────────────────────────── */}
      <section style={{ padding:pad(isMobile), background:c.dark }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ ...LBL, color:c.sage, textAlign:"center" }}>See it in action</div>
            <h2 style={{ ...H2, color:"#fff", textAlign:"center", marginBottom:12 }}>Real protection, real outdoors</h2>
            <p style={{ fontSize:14, color:c.gray, fontFamily:"'Poppins',sans-serif", fontWeight:300, textAlign:"center", maxWidth:480, margin:"0 auto" }}>
              Watch how Bug Away works in real conditions — hiking, gardening, playing outside.
            </p>
          </div>
          {/* 
            TO ADD YOUR VIDEO: Replace 'placeholder' with one of:
            youtube="YOUR_YOUTUBE_ID"        e.g. youtube="dQw4w9WgXcQ"
            vimeo="YOUR_VIMEO_ID"            e.g. vimeo="123456789"
            src="/videos/my-video.mp4"       e.g. your own video file
          */}
          <VideoBlock
            src="/videos/see-in-action.mp4"
            label="Watch Bug Away in action"
            height={isMobile ? 240 : 420}
          />
        </div>
      </section>

      {/* ── NATURE STRIP ─────────────────────────────────── */}
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1.2fr 1fr 1fr", height:isMobile?180:260, overflow:"hidden" }}>
        {[
          { url:"/images/lifestyle-kids-forest.png", label:"Family Protection" },
          { url:"/images/lifestyle-women-outdoor.png", label:"Adventure Ready" },
          { url:"/images/lifestyle-men-outdoor.png", label:"Adventure Ready" },
        ].filter((_,i)=>!isMobile||i===0).map((img,i)=>(
          <div key={i} style={{ position:"relative", overflow:"hidden" }}>
            <img src={img.url} alt={img.label} style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.72) saturate(0.85)" }}/>
            <div style={{ position:"absolute", bottom:12, left:12, background:"rgba(255,255,255,0.14)", backdropFilter:"blur(6px)", borderRadius:6, padding:"4px 12px", fontSize:12, color:"#fff", fontFamily:"'Poppins',sans-serif", fontWeight:600 }}>{img.label}</div>
          </div>
        ))}
      </div>

      {/* ── STATS BAR ────────────────────────────────────── */}
      <div style={{ background:c.sageD, padding:isMobile?"20px 16px":"24px 60px", display:"grid", gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(5,1fr)", gap:isMobile?16:0 }}>
        {[{num:"1.5M+",label:"Tick bites/year NL"},{num:"27,000",label:"New Lyme cases/yr"},{num:"100%",label:"Chemical-free"},{num:"360°",label:"Body coverage"},{num:"< 80g",label:"Per set"}].map((s,i)=>(
          <div key={i} style={{ textAlign:"center" }}>
            <div style={{ fontSize:isMobile?20:24, fontWeight:800, color:"#fff", letterSpacing:"-0.02em" }}>{s.num}</div>
            <div style={{ fontSize:10, color:c.mist, fontFamily:"'Poppins',sans-serif", fontWeight:300, marginTop:3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── LIFESTYLE USE CASES ──────────────────────────── */}
      <section style={{ padding:pad(isMobile), background:"#fff" }}>
        <div style={{ maxWidth:940, margin:"0 auto" }}>
          <div style={LBL}>Who is it for</div>
          <h2 style={{ ...H2, marginBottom:40 }}>Designed for outdoor life</h2>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(3,1fr)", gap:isMobile?12:20 }}>
            {[
              { emoji:"🥾", title:"Hikers", text:"Hours in the forest without constantly checking for ticks. Focus on the trail, not the bugs.", img:"/images/lifestyle-couple-forest.png" },
              { emoji:"🌿", title:"Gardeners", text:"Weeding, planting, pruning — tick territory. Bug Away lets you garden without worry.", img:"/images/lifestyle-women-outdoor.png" },
              { emoji:"👨‍👩‍👧", title:"Families", text:"Kids playing in tall grass or exploring nature — protected without any chemical sprays.", img:"/images/lifestyle-kids-forest.png" },
            ].map((u,i)=>(
              <div key={i} style={{ borderRadius:10, overflow:"hidden", border:`1px solid ${c.glL}` }}>
                <div style={{ height:isMobile?140:200, position:"relative", overflow:"hidden" }}>
                  <img src={u.img} alt={u.title} style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.8) saturate(0.9)" }}/>
                  <div style={{ position:"absolute", bottom:12, left:12, fontSize:24 }}>{u.emoji}</div>
                </div>
                <div style={{ padding:"16px 18px 20px", background:c.off }}>
                  <div style={{ fontSize:15, fontWeight:700, color:c.dark, marginBottom:6 }}>{u.title}</div>
                  <div style={{ fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.65 }}>{u.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────── */}
      <section style={{ padding:pad(isMobile), background:c.off }}>
        <div style={{ ...LBL }}>Customer reviews</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:36, flexWrap:"wrap", gap:12 }}>
          <h2 style={H2}>What our customers say</h2>
          <div style={{ display:"flex", gap:4, alignItems:"center" }}>
            <div style={{ display:"flex", gap:1 }}>{[...Array(5)].map((_,i)=><span key={i} style={{ color:"#F0B429", fontSize:16 }}>★</span>)}</div>
            <span style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.grayD, marginLeft:6 }}>4.9 / 5 (500+ reviews)</span>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)", gap:isMobile?12:20 }}>
          {reviews.slice(0,3).map((r,i)=>(
            <div key={i} style={{ background:"#fff", borderRadius:10, padding:"22px", border:`1px solid ${c.glL}` }}>
              <StarRow n={r.stars} />
              <p style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.75, margin:"12px 0 16px", fontWeight:300, fontStyle:"italic" }}>"{r.text}"</p>
              <div style={{ borderTop:`1px solid ${c.glL}`, paddingTop:12 }}>
                <div style={{ fontSize:13, fontWeight:700, color:c.dark }}>{r.name}</div>
                <div style={{ fontSize:11, fontFamily:"'Poppins',sans-serif", color:c.gray, marginTop:2 }}>{r.loc} · {r.product}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECOND VIDEO SLOT ────────────────────────────── */}
      <section style={{ padding:pad(isMobile), background:c.off }}>
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={LBL}>Tick awareness</div>
            <h2 style={{ ...H2, marginBottom:8, textAlign:"center" }}>Know your risk</h2>
            <p style={{ fontSize:14, color:c.grayD, fontFamily:"'Poppins',sans-serif", fontWeight:300, textAlign:"center" }}>
              A short explainer on Lyme disease and why tick prevention matters.
            </p>
          </div>
          <VideoBlock
            src="/videos/lyme-awareness.mp4"
            height={isMobile?200:360}
          />
        </div>
      </section>

      {/* ── BLOG PREVIEW ─────────────────────────────────── */}
      <section style={{ padding:pad(isMobile), background:"#fff" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:32, flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={LBL}>Knowledge base</div>
            <h2 style={H2}>Learn about tick protection</h2>
          </div>
          <Link to="/blog" style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.sageD, fontWeight:600, textDecoration:"none" }}>All articles →</Link>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)", gap:isMobile?12:22 }}>
          {blogPosts.map((b,i)=>(
            <Link key={i} to={`/blog/${b.slug}`} style={{ textDecoration:"none" }}>
              <div style={{ border:`1px solid ${c.glL}`, borderRadius:10, overflow:"hidden", background:c.off, transition:"transform 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                <div style={{ height:isMobile?100:130, background:`linear-gradient(135deg,${c.skyP} 0%,${c.sageL}55 100%)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:isMobile?40:52 }}>{b.emoji}</div>
                <div style={{ padding:"16px 18px 20px" }}>
                  <div style={{ fontSize:10, fontFamily:"'Poppins',sans-serif", fontWeight:700, color:c.sage, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>{b.tag}</div>
                  <div style={{ fontSize:isMobile?13:14, fontWeight:700, color:c.dark, marginBottom:6, lineHeight:1.4 }}>{b.title}</div>
                  <div style={{ fontSize:11, fontFamily:"'Poppins',sans-serif", color:c.gray, lineHeight:1.6, marginBottom:12 }}>{b.excerpt}</div>
                  <div style={{ fontSize:12, color:c.sageD, fontFamily:"'Poppins',sans-serif", fontWeight:600 }}>Read more →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section style={{ padding:pad(isMobile), background:`linear-gradient(135deg,${c.sageD} 0%,#3a6450 100%)` }}>
        <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center" }}>
          <h2 style={{ ...H2, color:"#fff", fontSize:isMobile?24:32, marginBottom:12 }}>Ready for tick-free adventures?</h2>
          <p style={{ fontSize:14, color:c.mist, fontFamily:"'Poppins',sans-serif", fontWeight:300, lineHeight:1.75, marginBottom:28 }}>
            Join 500+ outdoor enthusiasts who have already discovered the difference.
          </p>
          <Link to="/shop" style={{ ...BTN, background:"#fff", color:c.sageD, textDecoration:"none", fontSize:13 }}>Shop Now</Link>
        </div>
      </section>

    </div>
  );
}
