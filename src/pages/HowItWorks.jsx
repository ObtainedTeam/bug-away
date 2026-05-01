import { Link } from "react-router-dom";
import { c, useIsMobile, BTN, H2, LBL } from "../theme";

const STEPS = [
  { num: "01", title: "Wear it as a base layer", desc: "Simply put on the Bug Away mesh suit underneath your regular clothes. It weighs less than 80g for the full set — you'll barely notice it's there." },
  { num: "02", title: "Ultra-fine physical barrier", desc: "The noseeum-grade mesh has openings smaller than 0.6mm — fine enough to block ticks, mosquitoes, harvest mites and other insects while remaining fully breathable." },
  { num: "03", title: "Sealed at every entry point", desc: "The pant leg and foot cover are one single continuous piece of mesh. No gap at the ankle, no elastic cuff — ticks have no entry point." },
  { num: "04", title: "Move freely all day", desc: "Bug Away is lightweight, breathable and moisture-wicking. Wear it hiking, gardening or camping — no heat buildup, no restrictions, no sprays needed." },
];

const PROOF = [
  { img: "/images/proof-mosquito.jpg", label: "Mosquito blocked by mesh" },
  { img: "/images/proof-ticks.jpg", label: "Tick unable to penetrate" },
  { img: "/images/proof-spider.jpg", label: "Spider stopped at surface" },
];

const FEATURES = [
  { icon: "🕷️", title: "Noseeum-grade mesh", desc: "Openings < 0.6mm — blocks ticks, harvest mites, mosquitoes and gnats." },
  { icon: "🌬️", title: "Fully breathable", desc: "Air circulates freely through the mesh. No sweating, no overheating." },
  { icon: "⚗️", title: "Zero chemicals", desc: "No permethrin, no DEET, no insecticide of any kind. Safe for kids, pets and the planet." },
  { icon: "🦶", title: "Integrated foot cover", desc: "The pant leg flows directly into the foot — one continuous piece with no gap." },
  { icon: "🪶", title: "Ultra-lightweight", desc: "The full set (jacket + pants) weighs under 80g. Packs into its own pocket." },
  { icon: "♻️", title: "Eco-responsible", desc: "No chemical pollution, reusable for years. Better for you and the environment." },
];

export default function HowItWorks() {
  const isMobile = useIsMobile();

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        position: "relative", minHeight: isMobile ? 280 : 360,
        background: `linear-gradient(to right, rgba(30,50,40,.75) 60%, rgba(30,50,40,.35) 100%), url('/images/jacket-men-lifestyle-birdwatching.jpg') center/cover no-repeat`,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 700, padding: isMobile ? "60px 24px" : "80px 64px", color: "#fff" }}>
          <div style={{ ...LBL, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>HOW IT WORKS</div>
          <h1 style={{ fontFamily: "Archivo, sans-serif", fontSize: isMobile ? 32 : 48, fontWeight: 900, lineHeight: 1.15, margin: 0 }}>
            Simple physics.<br /><span style={{ color: "#a8d5b5" }}>Total protection.</span>
          </h1>
        </div>
      </section>

      {/* ── 4 STEPS ── */}
      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>THE PROCESS</div>
          <h2 style={{ ...H2, marginBottom: 48 }}>Four simple steps</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4,1fr)", gap: 24 }}>
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 36, color: c.sageL, marginBottom: 16 }}>{num}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{title}</div>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MESH SIZE PROOF ── */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>PROOF IT WORKS</div>
          <h2 style={{ ...H2, marginBottom: 16 }}>See the barrier in action</h2>
          <p style={{ color: "#555", fontSize: 15, maxWidth: 600, marginBottom: 40 }}>
            The mesh openings are smaller than 0.6mm — insects simply cannot pass through. These photos show real insects resting on the outside of the fabric, unable to penetrate.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 20, marginBottom: 40 }}>
            {PROOF.map(({ img, label }) => (
              <div key={label} style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                <img src={img} alt={label} style={{ width: "100%", height: isMobile ? 200 : 260, objectFit: "cover", display: "block" }} />
                <div style={{ background: "#F7F9F8", padding: "12px 16px", fontSize: 13, fontWeight: 600, color: c.sageD }}>{label}</div>
              </div>
            ))}
          </div>
          {/* mesh size callout */}
          <div style={{ background: c.sage, borderRadius: 16, padding: isMobile ? "24px 20px" : "32px 40px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", gap: 20 }}>
            <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: isMobile ? 36 : 52, color: "#fff", flexShrink: 0 }}>{"< 0.6mm"}</div>
            <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 15, lineHeight: 1.65 }}>
              That's the maximum opening size of Bug Away's noseeum mesh. The average tick nymph is 1.5–2mm wide — it physically cannot fit through the fabric, even when it tries to crawl.
            </div>
          </div>
        </div>
      </section>

      {/* ── INFOGRAPHIC ── */}
      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>HOW THE LAYERS WORK</div>
          <h2 style={{ ...H2, marginBottom: 32 }}>The layering system</h2>
          <img src="/images/how-it-works-infographic.png" alt="How Bug Away layering works"
            style={{ width: "100%", borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            onError={e => e.target.style.display = "none"}
          />
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>KEY FEATURES</div>
          <h2 style={{ ...H2, marginBottom: 40 }}>What makes Bug Away different</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 24 }}>
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: "#F7F9F8", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{title}</div>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE PHOTOS ── */}
      <section style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 0 }}>
        {[
          { src: "/images/jacket-men-lifestyle-forest-walking.jpg", alt: "Hiking in Bug Away" },
          { src: "/images/jacket-women-lifestyle-gardening.jpg", alt: "Gardening protected" },
        ].map(({ src, alt }) => (
          <div key={alt} style={{ height: isMobile ? 220 : 380, overflow: "hidden" }}>
            <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#1a2e24", padding: isMobile ? "48px 20px" : "72px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: isMobile ? 28 : 36, color: "#fff", marginBottom: 16 }}>Ready to protect yourself?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, marginBottom: 32 }}>Join 500+ outdoor lovers who chose physical protection over sprays.</p>
          <Link to="/shop" style={{ ...BTN, fontSize: 16, padding: "16px 40px", textDecoration: "none", display: "inline-block" }}>Shop Bug Away</Link>
        </div>
      </section>
    </div>
  );
}
