import { useState } from "react";
import { Link } from "react-router-dom";
import { c, useIsMobile, BTN, H2, LBL } from "../theme";
import { products } from "../data";
import { useCurrency } from "../currency";

const Star = () => <span style={{ color: "#F59E0B" }}>★</span>;

function ProductCard({ product }) {
  const { symbol } = useCurrency();
  const isMobile = useIsMobile();
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", transition: "transform .2s, box-shadow .2s", cursor: "pointer" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.13)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)"; }}
      >
        <div style={{ position: "relative", height: isMobile ? 180 : 240, background: "#f3f4f2", overflow: "hidden" }}>
          <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {product.badge && (
            <span style={{ position: "absolute", top: 12, left: 12, background: c.sage, color: "#fff", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>{product.badge}</span>
          )}
        </div>
        <div style={{ padding: "16px 16px 20px" }}>
          <div style={{ fontSize: 11, color: c.sage, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{product.category}</div>
          <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{product.name}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 800, fontSize: 16, color: c.sageD }}>{symbol}{product.price}</span>
            <span style={{ ...BTN, fontSize: 12, padding: "6px 14px" }}>View</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const TESTIMONIALS = [
  { name: "Maaike V.", stars: 5, text: "Finally something that actually keeps ticks away. Wore it hiking all weekend — not a single bite.", location: "Netherlands" },
  { name: "James R.", stars: 5, text: "My whole family wears these now. Kids can play in the forest without us constantly checking.", location: "Canada" },
  { name: "Sophie L.", stars: 5, text: "The integrated foot cover is genius. No more tucking trousers into socks.", location: "Germany" },
  { name: "Bart M.", stars: 4, text: "Lightweight, breathable, does exactly what it says. Great for gardening too.", location: "Belgium" },
];

const DISEASES = [
  { name: "Lyme Disease", severity: "High Risk", color: "#dc2626", desc: "Caused by Borrelia bacteria transmitted through tick bites. Can lead to chronic fatigue, joint pain and neurological issues if untreated." },
  { name: "TBE (Tick-Borne Encephalitis)", severity: "Serious", color: "#d97706", desc: "Viral infection affecting the nervous system. No cure — prevention is the only protection." },
  { name: "Anaplasmosis", severity: "Moderate Risk", color: "#ca8a04", desc: "Bacterial infection causing fever, headache and muscle aches. Increasingly common in Europe and North America." },
  { name: "Babesiosis", severity: "Moderate Risk", color: "#ca8a04", desc: "Parasitic infection of red blood cells. Can be life-threatening in elderly or immunocompromised individuals." },
];

export default function Home() {
  const isMobile = useIsMobile();
  const { symbol } = useCurrency();
  const bestsellers = products.filter(p => p.badge === "Best Seller");

  return (
    <div>
      {/* HERO */}
      <section style={{
        position: "relative", minHeight: isMobile ? 420 : 520,
        background: `linear-gradient(to right, rgba(30,50,40,.72) 55%, rgba(30,50,40,.3) 100%), url('/images/combo-lifestyle-couple-forest-green.jpg') center/cover no-repeat`,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 640, padding: isMobile ? "60px 24px" : "80px 64px", color: "#fff" }}>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 24, padding: "5px 16px", fontSize: 12, marginBottom: 20 }}>
            🛡️ Insecticide-free · Tick-proof · Eco-responsible
          </span>
          <h1 style={{ fontFamily: "Archivo, sans-serif", fontSize: isMobile ? 36 : 56, fontWeight: 900, lineHeight: 1.1, margin: "0 0 12px" }}>
            Enjoy the Outdoors.<br /><span style={{ color: c.sageL }}>Safe & Carefree.</span>
          </h1>
          <p style={{ fontSize: 16, opacity: 0.88, maxWidth: 420, lineHeight: 1.6, margin: "0 0 12px" }}>
            Lightweight mesh clothing that physically blocks ticks and insects. No DEET, no chemicals — just a smart layer between you and nature.
          </p>
          <p style={{ fontStyle: "italic", color: c.sageL, fontSize: 14, marginBottom: 28 }}>"Like a screen porch for your body 🌿"</p>
          <Link to="/shop" style={{ ...BTN, fontSize: 15, padding: "14px 32px", display: "inline-block", textDecoration: "none" }}>SHOP NOW</Link>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: "#fff", borderBottom: "1px solid #e8ede9", padding: "14px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: isMobile ? 16 : 40 }}>
          {[
            { icon: "⭐", text: "500+ happy customers" },
            { icon: "🔵", text: "100% chemical-free" },
            { icon: "🌍", text: "Ships to EU & North America" },
            { icon: "📦", text: "30-day returns" },
          ].map(({ icon, text }) => (
            <span key={text} style={{ fontSize: 13, color: "#555", display: "flex", alignItems: "center", gap: 6 }}>
              <span>{icon}</span>{text}
            </span>
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>SHOP BY CATEGORY</div>
          <h2 style={{ ...H2, marginBottom: 32 }}>Protection for everyone</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16 }}>
            {[
              { label: "Men", img: "/images/jacket-men-white-front.jpg", link: "/shop?cat=men" },
              { label: "Women", img: "/images/jacket-women-white-front.jpg", link: "/shop?cat=women" },
              { label: "Kids", img: "/images/kids-set-green-flatlay.jpg", link: "/shop?cat=kids" },
              { label: "Bundles", img: "/images/combo-lifestyle-couple-coffee-tent.jpg", link: "/shop?cat=bundles" },
            ].map(({ label, img, link }) => (
              <Link key={label} to={link} style={{ textDecoration: "none" }}>
                <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: isMobile ? 160 : 260, cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.querySelector("img").style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.currentTarget.querySelector("img").style.transform = "scale(1)"}
                >
                  <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
                  <div style={{ position: "absolute", bottom: 16, left: 16, color: "#fff" }}>
                    <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 800, fontSize: 18 }}>{label}</div>
                    <div style={{ fontSize: 12, opacity: 0.85 }}>Shop →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NATURE PHOTO STRIP */}
      <section style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", height: isMobile ? "auto" : 300, overflow: "hidden" }}>
        <div style={{ overflow: "hidden", height: isMobile ? 180 : "100%" }}>
          <img src="/images/combo-lifestyle-couple-forest-white.jpg" alt="Family protection" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ overflow: "hidden", height: isMobile ? 180 : "100%" }}>
          <img src="/images/kids-lifestyle-forest-playing.jpg" alt="Kids in forest" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ overflow: "hidden", height: isMobile ? 180 : "100%" }}>
          <img src="/images/jacket-men-lifestyle-birdwatching.jpg" alt="Birdwatching outdoors" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: c.sage, padding: "32px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5,1fr)", gap: 24, textAlign: "center", color: "#fff" }}>
          {[
            { num: "1.5M+", label: "Tick bites/year NL" },
            { num: "27,000", label: "New Lyme cases/yr" },
            { num: "100%", label: "Chemical-free" },
            { num: "360°", label: "Body coverage" },
            { num: "< 80g", label: "Per set" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: isMobile ? 22 : 28 }}>{num}</div>
              <div style={{ fontSize: 12, opacity: 0.82, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>OUR PICKS</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <h2 style={{ ...H2, margin: 0 }}>Best Sellers</h2>
            <Link to="/shop" style={{ fontSize: 13, color: c.sage, textDecoration: "none", fontWeight: 600 }}>View all →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 20 }}>
            {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>HOW IT WORKS</div>
          <h2 style={{ ...H2, marginBottom: 40 }}>The science is simple</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4,1fr)", gap: 28 }}>
            {[
              { step: "01", title: "Put it on", desc: "Slip on the lightweight mesh suit as a base layer under your regular clothes." },
              { step: "02", title: "Physical barrier", desc: "The ultra-fine noseeum mesh creates a physical barrier — ticks and insects simply can't get through." },
              { step: "03", title: "Sealed at the foot", desc: "The pant leg and foot cover are one continuous piece — no gap, no entry point at the ankle." },
              { step: "04", title: "Enjoy nature freely", desc: "Hike, garden, camp — no sprays, no worry, just comfort and protection all day." },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 32, color: c.sageL, marginBottom: 12 }}>{step}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{title}</div>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEE IT IN ACTION VIDEO */}
      <section style={{ background: "#1a2e24", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...LBL, color: c.sageL, marginBottom: 8 }}>SEE IT IN ACTION</div>
          <h2 style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: isMobile ? 28 : 36, color: "#fff", marginBottom: 32 }}>Watch it in the wild</h2>
          <video autoPlay muted loop playsInline style={{ width: "100%", borderRadius: 16, maxHeight: 480, objectFit: "cover" }}>
            <source src="/videos/see-in-action.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>WHO IS IT FOR</div>
          <h2 style={{ ...H2, marginBottom: 36 }}>Designed for outdoor life</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 24 }}>
            {[
              { label: "Hikers", icon: "🥾", desc: "Hours in the forest without constantly checking for ticks. Focus on the trail, not the bugs.", img: "/images/jacket-men-lifestyle-forest-walking.jpg" },
              { label: "Gardeners", icon: "🌿", desc: "Weeding, planting, pruning — tick territory. Bug Away lets you garden without worry.", img: "/images/jacket-women-lifestyle-gardening.jpg" },
              { label: "Families", icon: "👨‍👩‍👧", desc: "Kids playing in tall grass or exploring nature — protected without any chemical sprays.", img: "/images/kids-lifestyle-jumping-stream.jpg" },
            ].map(({ label, icon, desc, img }) => (
              <div key={label} style={{ background: "#F7F9F8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                <div style={{ height: 180, overflow: "hidden" }}>
                  <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{label}</div>
                  <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICK AWARENESS VIDEO */}
      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>TICK AWARENESS</div>
          <h2 style={{ ...H2, marginBottom: 32 }}>Know your risk</h2>
          <video autoPlay muted loop playsInline style={{ width: "100%", borderRadius: 16, maxHeight: 480, objectFit: "cover" }}>
            <source src="/videos/lyme-awareness.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* DISEASE INFO */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>HEALTH & SAFETY</div>
          <h2 style={{ ...H2, marginBottom: 36 }}>Diseases ticks carry</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 20 }}>
            {DISEASES.map(({ name, severity, color, desc }) => (
              <div key={name} style={{ background: "#F7F9F8", borderRadius: 16, padding: 24, borderLeft: `4px solid ${color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{name}</div>
                  <span style={{ background: color + "20", color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", marginLeft: 8 }}>{severity}</span>
                </div>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36, background: c.sage, borderRadius: 16, padding: isMobile ? "28px 20px" : "36px 40px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
            <div>
              <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 6 }}>Don't leave it to chance</div>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, margin: 0 }}>Bug Away gives you physical tick protection — no chemicals, no sprays, no compromise.</p>
            </div>
            <Link to="/shop" style={{ ...BTN, background: "#fff", color: c.sageD, whiteSpace: "nowrap", flexShrink: 0, textDecoration: "none", display: "inline-block" }}>Shop Now</Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>REVIEWS</div>
          <h2 style={{ ...H2, marginBottom: 36 }}>What our customers say</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 20 }}>
            {TESTIMONIALS.map(({ name, stars, text, location }) => (
              <div key={name} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                <div style={{ marginBottom: 12 }}>{Array(stars).fill(0).map((_, i) => <Star key={i} />)}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "#333", margin: "0 0 16px", fontStyle: "italic" }}>"{text}"</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: c.sageD }}>{name} <span style={{ color: "#999", fontWeight: 400 }}>— {location}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <div style={{ ...LBL, marginBottom: 8 }}>KNOWLEDGE BASE</div>
              <h2 style={{ ...H2, margin: 0 }}>Learn about tick protection</h2>
            </div>
            <Link to="/blog" style={{ fontSize: 13, color: c.sage, textDecoration: "none", fontWeight: 600 }}>All articles →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 24 }}>
            {[
              { cat: "EDUCATION", title: "Tick Season 2025: When Are Ticks Most Active?", excerpt: "Ticks become active as soon as temperatures rise above 7°C. Find out when the risk is highest and how to protect yourself.", img: "/images/proof-ticks.jpg" },
              { cat: "HEALTH", title: "How to Recognize a Tick Bite and What to Do", excerpt: "Not every tick bite leads to Lyme disease. But knowing what to do immediately after a bite can make all the difference.", img: "/images/proof-mosquito.jpg" },
              { cat: "PETS", title: "Ticks and Dogs: Risks and How to Protect Your Pet", excerpt: "Dogs face the exact same tick risks as humans. Discover how to protect your dog this outdoor season.", img: "/images/pants-detail-feet-grass.jpg" },
            ].map(({ cat, title, excerpt, img }) => (
              <Link key={title} to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ background: "#F0F5F2", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", transition: "transform .2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}
                >
                  <div style={{ height: 160, overflow: "hidden" }}>
                    <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: c.sage, marginBottom: 8 }}>{cat}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, lineHeight: 1.4 }}>{title}</div>
                    <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6, margin: "0 0 12px" }}>{excerpt}</p>
                    <span style={{ fontSize: 13, color: c.sage, fontWeight: 600 }}>Read more →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
