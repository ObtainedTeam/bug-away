import { useState } from 'react';
import { Link } from 'react-router-dom';
import { c, useIsMobile, BTN, H2, LBL } from '../theme';
import { faqs } from '../data';

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:`1px solid ${c.glL}` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width:"100%", textAlign:"left", padding:"16px 0", background:"none", border:"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:16 }}
      >
        <span style={{ fontSize:14, fontWeight:600, color:c.dark, lineHeight:1.4 }}>{q}</span>
        <span style={{ fontSize:20, color:c.sageD, flexShrink:0, transition:"transform 0.2s", transform:open?"rotate(45deg)":"none", display:"inline-block" }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom:16 }}>
          <p style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.85, fontWeight:300 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const isMobile = useIsMobile();
  const pad = isMobile ? "48px 20px" : "64px 60px";
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", ...faqs.map(f => f.category)];
  const visible = activeCategory === "all" ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div style={{ fontFamily:"'Archivo',sans-serif", color:c.dark }}>

      {/* Header */}
      <section style={{ background:`linear-gradient(135deg,${c.skyP} 0%,${c.mist} 100%)`, padding:isMobile?"48px 20px":"64px 60px" }}>
        <div style={LBL}>Support</div>
        <h1 style={{ fontSize:isMobile?28:42, fontWeight:800, color:c.dark, marginBottom:12, letterSpacing:"-0.02em" }}>Frequently Asked Questions</h1>
        <p style={{ fontSize:14, color:c.grayD, fontFamily:"'Poppins',sans-serif", fontWeight:300, maxWidth:480 }}>
          Everything you need to know about Bug Away. Can't find your answer? Contact us anytime.
        </p>
      </section>

      {/* Category filter */}
      <div style={{ background:"#fff", borderBottom:`1px solid ${c.glL}`, padding:`12px ${isMobile?"16px":"60px"}`, display:"flex", gap:8, flexWrap:"wrap" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{ padding:"7px 16px", borderRadius:20, border:`1.5px solid ${activeCategory===cat?c.sageD:c.glL}`, background:activeCategory===cat?c.sageD:"#fff", color:activeCategory===cat?"#fff":c.grayD, fontSize:12, fontFamily:"'Poppins',sans-serif", fontWeight:600, cursor:"pointer", textTransform:"capitalize" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ content */}
      <section style={{ padding:pad }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          {visible.map((section, i) => (
            <div key={i} style={{ marginBottom:40 }}>
              <h2 style={{ fontSize:18, fontWeight:700, color:c.dark, marginBottom:4, paddingBottom:12, borderBottom:`2px solid ${c.sageD}` }}>
                {section.category}
              </h2>
              {section.questions.map((item, j) => (
                <Accordion key={j} q={item.q} a={item.a} />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Size guide */}
      <section style={{ padding:pad, background:"#fff", borderTop:`1px solid ${c.glL}` }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={LBL}>Size guide</div>
          <h2 style={{ ...H2, marginBottom:8 }}>Find your perfect fit</h2>
          <p style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.grayD, marginBottom:24, fontWeight:300, lineHeight:1.7 }}>
            Bug Away is designed to be worn loosely as a base layer over your regular clothing. When in doubt, size up. All measurements are in cm.
          </p>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"'Poppins',sans-serif", fontSize:13 }}>
              <thead>
                <tr style={{ background:c.dark, color:"#fff" }}>
                  {["Size","Chest","Waist","Hip","Inseam"].map(h=>(
                    <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontWeight:600, letterSpacing:"0.04em", fontSize:11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["XS","84–88","68–72","92–96","74"],
                  ["S","88–92","72–76","96–100","76"],
                  ["M","92–96","76–80","100–104","78"],
                  ["L","96–100","80–84","104–108","80"],
                  ["XL","100–104","84–88","108–112","82"],
                  ["XXL","104–108","88–92","112–116","84"],
                ].map((row,i)=>(
                  <tr key={i} style={{ background:i%2===0?"#fff":c.off }}>
                    {row.map((cell,j)=>(
                      <td key={j} style={{ padding:"10px 16px", color:j===0?c.dark:c.grayD, fontWeight:j===0?700:400 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.gray, marginTop:12, fontStyle:"italic" }}>
            Tip: Measure yourself wearing the clothing you'll wear underneath Bug Away. Size up if you're between sizes.
          </p>
          {/* Size guide images */}
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:20, marginTop:28 }}>
            <img src="/images/size-guide-jacket.png" alt="How to measure" style={{ width:"100%", borderRadius:8, border:`1px solid ${c.glL}` }} />
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <img src="/images/size-guide-fittype.png" alt="Fit type" style={{ width:"100%", borderRadius:8, border:`1px solid ${c.glL}` }} />
              <img src="/images/size-guide-chart.png" alt="Size chart" style={{ width:"100%", borderRadius:8, border:`1px solid ${c.glL}` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ padding:pad, background:c.off }}>
        <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:40, marginBottom:16 }}>💬</div>
          <h2 style={{ ...H2, marginBottom:8 }}>Still have questions?</h2>
          <p style={{ fontSize:14, fontFamily:"'Poppins',sans-serif", color:c.grayD, fontWeight:300, lineHeight:1.7, marginBottom:24 }}>
            We're happy to help. Send us a message and we'll get back to you within 24 hours.
          </p>
          <a href="mailto:info@bugaway.com" style={{ ...BTN, textDecoration:"none" }}>Contact Us</a>
        </div>
      </section>
    </div>
  );
}
