// ABOUT PAGE
import { Link } from 'react-router-dom';
import { c, useIsMobile, BTN, H2, LBL } from '../theme';

export function About() {
  const isMobile = useIsMobile();
  const pad = isMobile ? "48px 20px" : "64px 60px";

  return (
    <div style={{ fontFamily:"'Archivo',sans-serif", color:c.dark }}>

      {/* Hero */}
      <section style={{ position:"relative", minHeight:isMobile?320:400, background:`linear-gradient(135deg,${c.skyP} 0%,${c.sageL} 100%)`, display:"flex", alignItems:"center", padding:isMobile?"56px 20px":"80px 60px", overflow:"hidden" }}>
        <img src="/images/lifestyle-couple-forest.png" alt="Forest" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.2 }}/>
        <div style={{ position:"relative", zIndex:1, maxWidth:580 }}>
          <div style={LBL}>Our story</div>
          <h1 style={{ fontSize:isMobile?30:48, fontWeight:800, color:c.dark, lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:16 }}>
            We love the outdoors.<br/><span style={{ color:c.sageD }}>Ticks? Not so much.</span>
          </h1>
          <p style={{ fontSize:isMobile?14:16, color:c.grayD, fontFamily:"'Poppins',sans-serif", fontWeight:300, lineHeight:1.75 }}>
            Bug Away was born from a personal frustration: why should fear of ticks keep anyone indoors? We set out to create the most effective, chemical-free tick protection possible.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding:pad, background:"#fff" }}>
        <div style={{ maxWidth:860, margin:"0 auto", display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?32:60, alignItems:"center" }}>
          <div>
            <div style={LBL}>How it started</div>
            <h2 style={{ ...H2, marginBottom:16 }}>A walk in the woods changed everything</h2>
            <p style={{ fontSize:14, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.9, marginBottom:14, fontWeight:300 }}>
              After a family member was diagnosed with Lyme disease following a routine forest walk, we started researching tick protection options. What we found was disappointing: DEET sprays that wash off in rain, permethrin treatments that kill beneficial insects, and clothing that leaves gaps at the ankles.
            </p>
            <p style={{ fontSize:14, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.9, fontWeight:300 }}>
              We knew there had to be a better way. The answer was surprisingly simple: fine mesh, worn as a base layer, with no gaps. Bug Away was born.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <img src="/images/lifestyle-kids-forest.png" alt="Forest" style={{ width:"100%", height:200, objectFit:"cover", borderRadius:8, filter:"brightness(0.85) saturate(0.9)" }}/>
            <img src="/images/lifestyle-men-outdoor.png" alt="Nature" style={{ width:"100%", height:200, objectFit:"cover", borderRadius:8, marginTop:24, filter:"brightness(0.85) saturate(0.9)" }}/>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding:pad, background:c.off }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ ...LBL, textAlign:"center" }}>Our mission</div>
            <h2 style={{ ...H2, textAlign:"center", marginBottom:12 }}>Protect people. Respect nature.</h2>
            <p style={{ fontSize:14, color:c.grayD, fontFamily:"'Poppins',sans-serif", fontWeight:300, lineHeight:1.85, maxWidth:540, margin:"0 auto" }}>
              We believe outdoor life should be enjoyed without chemical sprays that harm wildlife, pollinators and the environment. Bug Away is our answer: 100% physical protection.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)", gap:isMobile?12:24 }}>
            {[
              { icon:"🌿", title:"Chemical-free always", text:"No DEET. No permethrin. No insecticides. We will never compromise on this — it's core to who we are." },
              { icon:"♻️", title:"Eco-responsible materials", text:"Our mesh is made from recycled polyester. We're continuously working to reduce our environmental footprint." },
              { icon:"🐝", title:"Safe for nature", text:"What you spray near your skin ends up in nature. Our physical barrier approach means zero chemical impact." },
            ].map((v,i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:10, padding:"28px 24px", border:`1px solid ${c.glL}`, textAlign:"center" }}>
                <div style={{ fontSize:32, marginBottom:12 }}>{v.icon}</div>
                <div style={{ fontSize:15, fontWeight:700, color:c.dark, marginBottom:8 }}>{v.title}</div>
                <div style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.7 }}>{v.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:pad, background:`linear-gradient(135deg,${c.sageD} 0%,#3a6450 100%)`, textAlign:"center" }}>
        <h2 style={{ ...H2, color:"#fff", marginBottom:12 }}>Join the Bug Away community</h2>
        <p style={{ fontSize:14, color:c.mist, fontFamily:"'Poppins',sans-serif", fontWeight:300, marginBottom:28 }}>500+ outdoor enthusiasts already protect themselves the natural way.</p>
        <Link to="/shop" style={{ ...BTN, background:"#fff", color:c.sageD, textDecoration:"none" }}>Shop Now</Link>
      </section>
    </div>
  );
}

export default About;
