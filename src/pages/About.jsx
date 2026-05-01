import { Link } from "react-router-dom";
import { c, useIsMobile, BTN, H2, LBL } from "../theme";

const VALUES = [
  { icon: "🌿", title: "Chemical-free", desc: "We believe protection shouldn't come at the cost of your health or the environment." },
  { icon: "🔬", title: "Science-backed", desc: "Noseeum mesh technology used in medical and outdoor applications worldwide." },
  { icon: "♻️", title: "Eco-responsible", desc: "No toxic runoff, no waste. Bug Away lasts for years and leaves no chemical trace." },
  { icon: "🌍", title: "Made for everyone", desc: "Designed for hikers, families, gardeners — anyone who loves spending time outdoors." },
];

export default function About() {
  const isMobile = useIsMobile();
  return (
    <div>
      <section style={{
        position: "relative", minHeight: isMobile ? 300 : 420,
        background: `linear-gradient(to right, rgba(30,50,40,.72) 55%, rgba(30,50,40,.3) 100%), url('/images/combo-lifestyle-couple-forest-green.jpg') center/cover no-repeat`,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 700, padding: isMobile ? "60px 24px" : "80px 64px", color: "#fff" }}>
          <div style={{ ...LBL, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>OUR STORY</div>
          <h1 style={{ fontFamily: "Archivo, sans-serif", fontSize: isMobile ? 32 : 48, fontWeight: 900, lineHeight: 1.15, margin: "0 0 16px" }}>
            We built Bug Away<br /><span style={{ color: "#a8d5b5" }}>because we needed it.</span>
          </h1>
          <p style={{ fontSize: 16, opacity: 0.88, maxWidth: 480, lineHeight: 1.65, margin: 0 }}>
            After one too many tick checks mid-hike, we wondered: why isn't there a simple, chemical-free solution? Bug Away is that solution.
          </p>
        </div>
      </section>

      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ ...LBL, marginBottom: 12 }}>HOW IT STARTED</div>
            <h2 style={{ ...H2, marginBottom: 20 }}>One hike. One idea.</h2>
            <p style={{ color: "#555", fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
              It started during a family hike in the Dutch forests. Every few minutes, someone was stopping to check for ticks — kids, dogs, adults. By the end of the trail, the walk had turned into a tick patrol.
            </p>
            <p style={{ color: "#555", fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
              Chemical sprays felt wrong. Tucking trousers into socks was uncomfortable and unreliable. There had to be a better way.
            </p>
            <p style={{ color: "#555", fontSize: 15, lineHeight: 1.75, margin: 0 }}>
              We found noseeum mesh — the same ultra-fine fabric used in medical-grade insect barriers — and designed a lightweight base layer around it. Bug Away was born.
            </p>
          </div>
          <div style={{ borderRadius: 20, overflow: "hidden", height: isMobile ? 280 : 400 }}>
            <img src="/images/jacket-men-lifestyle-bicycle-forest.jpg" alt="Outdoor adventure with Bug Away"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      <section style={{ background: c.sage, padding: isMobile ? "48px 20px" : "72px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ ...LBL, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>OUR MISSION</div>
          <h2 style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: isMobile ? 28 : 40, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
            To make outdoor time safe, simple and chemical-free.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, lineHeight: 1.75, margin: 0 }}>
            Every product we make is designed with one goal: to let you enjoy nature without fear. No sprays, no toxins, no compromise. Just you, the outdoors, and a smart layer between you and the bugs.
          </p>
        </div>
      </section>

      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>WHAT WE STAND FOR</div>
          <h2 style={{ ...H2, marginBottom: 40 }}>Our values</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 24 }}>
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: "#fff", borderRadius: 16, padding: 24, textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{title}</div>
                <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 foto collage — alle drie bestaan in de images map */}
      <section style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 0 }}>
        {[
          { src: "/images/combo-lifestyle-couple-forest-white.jpg", alt: "Couple in forest" },
          { src: "/images/kids-lifestyle-jumping-stream.jpg", alt: "Kids outdoors" },
          { src: "/images/jacket-women-lifestyle-meadow-sunset.jpg", alt: "Woman in meadow" },
        ].map(({ src, alt }) => (
          <div key={alt} style={{ height: isMobile ? 200 : 320, overflow: "hidden" }}>
            <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </section>

      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div style={{ borderRadius: 20, overflow: "hidden", height: isMobile ? 260 : 380 }}>
            <img src="/images/combo-lifestyle-couple-coffee-tent.jpg" alt="Bug Away lifestyle"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ ...LBL, marginBottom: 12 }}>OUR PROMISE</div>
            <h2 style={{ ...H2, marginBottom: 20 }}>Quality you can trust</h2>
            <p style={{ color: "#555", fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
              Every Bug Away garment is made from certified noseeum-grade mesh with durable construction designed to last through hundreds of washes and outdoor seasons.
            </p>
            <p style={{ color: "#555", fontSize: 15, lineHeight: 1.75, marginBottom: 28 }}>
              We stand behind our products with a 30-day return policy and a commitment to continuous improvement based on customer feedback.
            </p>
            <Link to="/shop" style={{ ...BTN, textDecoration: "none", display: "inline-block" }}>Explore the collection</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
