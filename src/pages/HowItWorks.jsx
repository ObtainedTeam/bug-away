import { Link } from 'react-router-dom';
import { c, useIsMobile, BTN, H2, LBL } from '../theme';
import VideoBlock from '../components/VideoBlock';

export default function HowItWorks() {
  const isMobile = useIsMobile();
  const pad = isMobile ? "48px 20px" : "64px 60px";

  return (
    <div style={{ fontFamily:"'Archivo',sans-serif", color:c.dark }}>

      {/* Hero */}
      <section style={{ background:`linear-gradient(135deg,${c.skyP} 0%,${c.mist} 100%)`, padding:isMobile?"56px 20px":"80px 60px", textAlign:"center" }}>
        <div style={LBL}>The science</div>
        <h1 style={{ fontSize:isMobile?30:48, fontWeight:800, color:c.dark, marginBottom:16, letterSpacing:"-0.02em", maxWidth:600, margin:"0 auto 16px" }}>
          How Bug Away Works
        </h1>
        <p style={{ fontSize:isMobile?14:16, color:c.grayD, fontFamily:"'Poppins',sans-serif", fontWeight:300, lineHeight:1.8, maxWidth:560, margin:"0 auto 32px" }}>
          No magic, no chemicals — just smart physical protection based on simple science. Here's exactly how our mesh keeps ticks away from your skin.
        </p>
        <Link to="/shop" style={{ ...BTN, textDecoration:"none" }}>Shop Now</Link>
      </section>

      {/* The core principle */}
      <section style={{ padding:pad, background:"#fff" }}>
        <div style={{ maxWidth:860, margin:"0 auto", display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?32:60, alignItems:"center" }}>
          <div>
            <div style={LBL}>The principle</div>
            <h2 style={{ ...H2, marginBottom:16 }}>A screen porch for your body</h2>
            <p style={{ fontSize:14, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.9, marginBottom:14, fontWeight:300 }}>
              Think of a window screen — it lets air through but keeps insects out. Bug Away works on exactly the same principle. Our noseeum-grade mesh has openings smaller than the body width of a tick, so they physically cannot pass through.
            </p>
            <p style={{ fontSize:14, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.9, fontWeight:300 }}>
              The critical element is the <strong style={{ fontWeight:600, color:c.dark }}>air gap</strong> between the mesh and your skin. When worn loosely (as intended), ticks that land on the mesh cannot reach your skin even if they try to crawl through. No skin contact = no bite.
            </p>
          </div>
          <div style={{ background:`linear-gradient(160deg,${c.skyP} 0%,${c.sageL} 100%)`, borderRadius:16, padding:"40px 32px", textAlign:"center" }}>
            <div style={{ fontSize:64, marginBottom:16 }}>🛡️</div>
            <div style={{ fontSize:14, fontWeight:700, color:c.dark, marginBottom:8 }}>Mesh opening size</div>
            <div style={{ fontSize:36, fontWeight:800, color:c.sageD, marginBottom:4 }}>{"< 0.6mm"}</div>
            <div style={{ fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.grayD }}>Average tick body width: 1.0–3.0mm</div>
          </div>
        </div>
      </section>

      {/* Step by step */}
      <section style={{ padding:pad, background:c.off }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ ...LBL, textAlign:"center" }}>Step by step</div>
            <h2 style={{ ...H2, textAlign:"center" }}>What happens when you wear Bug Away</h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {[
              { n:"01", icon:"🌿", title:"You enter tick territory", desc:"You step into a forest, garden, or tall grass area — typical tick habitats. Ticks wait on grass blades and low shrubs, ready to latch onto a passing warm body." },
              { n:"02", icon:"🕷️", title:"A tick lands on the mesh", desc:"A tick transfers from the vegetation onto your Bug Away clothing. Instead of finding bare skin, it encounters the noseeum-grade mesh." },
              { n:"03", icon:"🔬", title:"The mesh stops the tick", desc:"The tick cannot pass through the fine mesh openings — they're simply too small. It cannot reach your skin, which means it cannot bite, cannot feed and cannot transmit disease." },
              { n:"04", icon:"💨", title:"The air gap prevents contact", desc:"Even if a tick somehow finds the edge of the garment, the loose fit creates an air gap between the mesh and your skin. The tick would need to navigate this gap while working against the fabric — practically impossible." },
              { n:"05", icon:"✅", title:"You enjoy your time outside", desc:"You hike, garden, play or relax without worrying about tick bites. After returning indoors, simply do a quick check and shake out your Bug Away clothing." },
            ].map((s,i)=>(
              <div key={i} style={{ display:"flex", gap:isMobile?16:24, background:"#fff", borderRadius:10, padding:isMobile?"18px":"24px 28px", border:`1px solid ${c.glL}`, alignItems:"flex-start" }}>
                <div style={{ flexShrink:0, width:isMobile?40:52, height:isMobile?40:52, borderRadius:"50%", background:`linear-gradient(135deg,${c.skyL},${c.sageL})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:isMobile?18:24 }}>
                  {s.icon}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                    <span style={{ fontSize:10, fontFamily:"'Poppins',sans-serif", fontWeight:700, color:c.sage, letterSpacing:"0.12em" }}>{s.n}</span>
                    <h3 style={{ fontSize:isMobile?14:16, fontWeight:700, color:c.dark }}>{s.title}</h3>
                  </div>
                  <p style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.8, fontWeight:300 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof section */}
      <section style={{ padding:pad, background:"#fff" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={LBL}>Real proof</div>
          <h2 style={{ ...H2, marginBottom:12 }}>See the mesh in action</h2>
          <p style={{ fontSize:14, fontFamily:"'Poppins',sans-serif", color:c.grayD, fontWeight:300, lineHeight:1.85, marginBottom:32, maxWidth:600 }}>
            These photos show insects on the outside of Bug Away mesh — unable to reach the skin underneath. This is exactly how it works in the field.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)", gap:16, marginBottom:32 }}>
            {[
              { src:"/images/proof-mosquito.jpg", caption:"Mosquito on the mesh — can't get through" },
              { src:"/images/proof-spider.jpg", caption:"Spider on the outside — skin protected" },
              { src:"/images/proof-ticks.jpg", caption:"Ticks visible on fabric — zero skin contact" },
            ].map((p,i)=>(
              <div key={i} style={{ borderRadius:10, overflow:"hidden", border:`1px solid ${c.glL}` }}>
                <img src={p.src} alt={p.caption} style={{ width:"100%", height:isMobile?200:260, objectFit:"cover", display:"block" }}/>
                <div style={{ padding:"10px 14px", background:c.off, fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.5 }}>{p.caption}</div>
              </div>
            ))}
          </div>
          <img src="/images/how-it-works-infographic.png" alt="How Bug Away mesh works" style={{ width:"100%", borderRadius:10, border:`1px solid ${c.glL}` }}/>
        </div>
      </section>

      {/* Video */}
      <section style={{ padding:pad, background:c.dark }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ ...LBL, color:c.sage, textAlign:"center" }}>See it yourself</div>
            <h2 style={{ ...H2, color:"#fff", textAlign:"center" }}>Watch Bug Away in action</h2>
          </div>
          {/* Replace with youtube="YOUR_ID" or vimeo="YOUR_ID" when ready */}
          <VideoBlock placeholder height={isMobile?220:400} />
        </div>
      </section>

      {/* The integrated foot cover */}
      <section style={{ padding:pad, background:"#fff" }}>
        <div style={{ maxWidth:860, margin:"0 auto", display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?32:60, alignItems:"center" }}>
          <div style={{ order:isMobile?2:1 }}>
            <div style={{ background:`linear-gradient(160deg,${c.mist} 0%,${c.sky} 100%)`, borderRadius:16, padding:"48px 32px", textAlign:"center" }}>
              <div style={{ fontSize:72, marginBottom:16 }}>🥾</div>
              <div style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.sageD, fontWeight:600, lineHeight:1.5 }}>
                One continuous piece<br/><span style={{ fontWeight:300, color:c.grayD }}>from waist to toe</span>
              </div>
            </div>
          </div>
          <div style={{ order:isMobile?1:2 }}>
            <div style={LBL}>Our key innovation</div>
            <h2 style={{ ...H2, marginBottom:16 }}>The integrated foot cover</h2>
            <p style={{ fontSize:14, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.9, marginBottom:14, fontWeight:300 }}>
              Most tick protection clothing leaves a gap at the ankle — and that's exactly where ticks find their way in. Bug Away's pants feature an integrated foot cover: the pant leg and foot are one continuous piece of mesh.
            </p>
            <p style={{ fontSize:14, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.9, fontWeight:300, marginBottom:20 }}>
              No gap. No entry point. The foot cover sits snugly over your sock and tucks under your shoe, creating a complete seal from waist to toe.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {["No gap at the ankle", "Sits over your sock, under your shoe", "Stretchy mesh adapts to your foot shape", "Works with any shoe type"].map((f,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ color:c.sageD, fontWeight:700 }}>✓</span>
                  <span style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.grayD }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Bug Away vs alternatives */}
      <section style={{ padding:pad, background:c.off }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={LBL}>Comparison</div>
          <h2 style={{ ...H2, marginBottom:32 }}>Bug Away vs other protection methods</h2>
          <div style={{ background:"#fff", borderRadius:10, overflow:"hidden", border:`1px solid ${c.glL}` }}>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", background:c.dark, padding:"12px 20px" }}>
              {["","Bug Away","DEET spray","Permethrin"].map((h,i)=>(
                <div key={i} style={{ fontSize:11, fontFamily:"'Poppins',sans-serif", fontWeight:700, color:i===1?c.sageL:"#fff", textAlign:"center", letterSpacing:"0.06em" }}>{h}</div>
              ))}
            </div>
            {[
              ["Blocks ticks physically","✓","–","–"],
              ["Chemical-free","✓","✗","✗"],
              ["Safe for children","✓","⚠️","⚠️"],
              ["Safe for pregnant women","✓","⚠️","✗"],
              ["Works in rain","✓","✗","✓"],
              ["Reusable / washable","✓","✗","Limited"],
              ["Safe for bees & nature","✓","–","✗"],
              ["No skin irritation","✓","Often","Sometimes"],
            ].map(([feat,...vals],i)=>(
              <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", padding:"12px 20px", background:i%2===0?"#fff":c.off, alignItems:"center" }}>
                <div style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.dark }}>{feat}</div>
                {vals.map((v,j)=>(
                  <div key={j} style={{ textAlign:"center", fontSize:13, fontFamily:"'Poppins',sans-serif", color:v==="✓"?c.sageD:v==="✗"?"#C0504D":c.gray, fontWeight:v==="✓"?700:400 }}>{v}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:pad, background:`linear-gradient(135deg,${c.sageD} 0%,#3a6450 100%)`, textAlign:"center" }}>
        <h2 style={{ ...H2, color:"#fff", marginBottom:12 }}>Ready to try it yourself?</h2>
        <p style={{ fontSize:14, color:c.mist, fontFamily:"'Poppins',sans-serif", fontWeight:300, marginBottom:28, maxWidth:400, margin:"0 auto 28px" }}>
          100% chemical-free. 30-day returns. Free shipping over €59.
        </p>
        <Link to="/shop" style={{ ...BTN, background:"#fff", color:c.sageD, textDecoration:"none" }}>Shop Bug Away</Link>
      </section>

    </div>
  );
}
