import { Link } from "react-router-dom";
import { c, BTN, BTNO, H2, LBL } from "../theme";

/**
 * /why-choose-us
 *
 * Geen reviews op deze pagina. De testimonials die nu op de homepage staan zijn
 * niet echt, en een aparte pagina die daarop leunt is richting Amerikaanse
 * consumenten een FTC-risico. Zodra er echte reviews zijn hoort er een blok bij.
 *
 * Zelfde reden als Activity.jsx voor de CSS media queries in plaats van
 * useIsMobile: deze pagina wordt geprerenderd.
 */

const CSS = `
.wcu-hero { background: ${c.dark}; color: #fff; padding: 80px 40px; }
.wcu-hero-in { max-width: 760px; margin: 0 auto; text-align: center; }
.wcu-h1 { font-family: Archivo, sans-serif; font-size: 44px; font-weight: 900;
  line-height: 1.12; letter-spacing: -0.02em; margin: 0 0 18px; text-wrap: balance; }
.wcu-lede { font-size: 16px; line-height: 1.7; color: ${c.mist}; margin: 0 auto; max-width: 600px; }

.wcu-sec { padding: 72px 40px; }
.wcu-in { max-width: 1100px; margin: 0 auto; }
.wcu-narrow { max-width: 820px; margin: 0 auto; }

.wcu-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.wcu-pillar { background: #fff; border-radius: 16px; padding: 28px;
  box-shadow: 0 2px 10px rgba(0,0,0,.05); }
.wcu-pillar-n { font-family: Archivo, sans-serif; font-size: 30px; font-weight: 900;
  color: ${c.sage}; line-height: 1; margin-bottom: 12px; }
.wcu-pillar h3 { font-family: Archivo, sans-serif; font-size: 17px; font-weight: 800;
  margin: 0 0 8px; color: ${c.dark}; }
.wcu-pillar p { font-size: 14px; line-height: 1.7; color: #666; margin: 0; }

.wcu-tw { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.wcu-table { width: 100%; min-width: 620px; border-collapse: collapse;
  font-family: 'Poppins', sans-serif; font-size: 13px; background: #fff;
  border-radius: 14px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,.05); }
.wcu-table th, .wcu-table td { padding: 14px 16px; text-align: left;
  border-bottom: 1px solid #eef2f0; }
.wcu-table thead th { background: ${c.off}; font-weight: 700; color: ${c.dark}; font-size: 12px; }
.wcu-table thead th.on { background: ${c.sageD}; color: #fff; }
.wcu-table td.on { background: #F2F8F4; font-weight: 600; color: ${c.sageD}; }
.wcu-table tbody th { font-weight: 600; color: ${c.dark}; background: #fff; }
.wcu-table tr:last-child th, .wcu-table tr:last-child td { border-bottom: none; }

.wcu-mesh { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
.wcu-mesh img { width: 100%; border-radius: 16px; display: block;
  box-shadow: 0 4px 20px rgba(0,0,0,.08); }

.wcu-dis { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.wcu-dis-c { background: #fff; border-radius: 12px; padding: 20px;
  border-left: 4px solid; box-shadow: 0 2px 10px rgba(0,0,0,.04); }
.wcu-dis-h { display: flex; justify-content: space-between; align-items: center;
  gap: 10px; margin-bottom: 8px; }
.wcu-dis-n { font-weight: 800; font-size: 14px; color: ${c.dark}; font-family: Archivo, sans-serif; }
.wcu-dis-s { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 10px;
  color: #fff; white-space: nowrap; font-family: 'Poppins', sans-serif; }
.wcu-dis-c p { font-size: 13px; line-height: 1.65; color: #666; margin: 0; }

.wcu-limits { background: #fff; border: 1px solid #e8ede9; border-radius: 16px; padding: 32px; }
.wcu-limits ul { list-style: none; padding: 0; margin: 0; }
.wcu-limits li { padding: 14px 0; border-bottom: 1px solid #f2f5f3;
  font-size: 14px; line-height: 1.7; color: #555; }
.wcu-limits li:last-child { border-bottom: none; padding-bottom: 0; }
.wcu-limits strong { color: ${c.dark}; }

@media (max-width: 767px) {
  .wcu-hero { padding: 52px 20px; }
  .wcu-h1 { font-size: 30px; }
  .wcu-sec { padding: 44px 20px; }
  .wcu-pillars, .wcu-mesh, .wcu-dis { grid-template-columns: 1fr; gap: 20px; }
  .wcu-limits { padding: 22px; }
}
`;

const COMPARE = [
  ["Stops ticks and mosquitoes", "Yes, physically", "Mostly", "Mostly", "No"],
  ["Contains insecticide", "No", "Yes", "Yes", "No"],
  ["Washes out over time", "Never", "20–70 washes", "Every few hours", "N/A"],
  ["Safe around cats", "Yes", "No", "No", "Yes"],
  ["Safe around bees", "Yes", "No", "No", "Yes"],
  ["Needs reapplying", "No", "No", "Yes", "No"],
  ["Breathable in summer", "Yes, it is mesh", "Depends", "N/A", "Depends"],
  ["Closed at the ankle", "Yes, one piece", "No", "No", "No"],
];

const DISEASES = [
  { name: "Lyme disease", sev: "High risk", color: "#dc2626",
    desc: "Caused by Borrelia bacteria carried by ticks. Untreated it can lead to lasting joint, neurological and cardiac problems. The most common tick-borne illness in North America." },
  { name: "Anaplasmosis", sev: "Moderate risk", color: "#ca8a04",
    desc: "Bacterial infection causing fever, headache and severe muscle aches. Cases have risen sharply across the northeastern and midwestern US over the last decade." },
  { name: "Alpha-gal syndrome", sev: "Life-changing", color: "#d97706",
    desc: "A bite from a lone star tick can trigger a lasting allergy to red meat. There is no cure and no treatment beyond avoidance." },
  { name: "Babesiosis", sev: "Moderate risk", color: "#ca8a04",
    desc: "A parasite that infects red blood cells. Usually mild, but can be serious or fatal for elderly and immunocompromised people." },
];

export default function WhyChooseUs() {
  return (
    <div>
      <style>{CSS}</style>

      {/* HERO */}
      <section className="wcu-hero">
        <div className="wcu-hero-in">
          <div style={{ ...LBL, color: c.sageL, marginBottom: 14 }}>WHY BUG AWAY</div>
          <h1 className="wcu-h1">A barrier beats a chemical</h1>
          <p className="wcu-lede">
            Almost every other option on the market works by poisoning the insect. Ours works by not
            letting it through. That difference decides everything else on this page.
          </p>
        </div>
      </section>

      {/* PIJLERS */}
      <section className="wcu-sec" style={{ background: c.off }}>
        <div className="wcu-in wcu-pillars">
          <div className="wcu-pillar">
            <div className="wcu-pillar-n">0.6mm</div>
            <h3>Finer than a no-see-um</h3>
            <p>
              The mesh openings are under 0.6mm. That is smaller than a biting midge, which makes it
              far smaller than a tick or a mosquito. Nothing gets through because nothing fits
              through. No judgement call, no percentage, no window where it half works.
            </p>
          </div>
          <div className="wcu-pillar">
            <div className="wcu-pillar-n">0</div>
            <h3>Zero insecticide</h3>
            <p>
              No permethrin, no DEET, nothing absorbed through skin and nothing to reapply. That
              matters for your kids, for the bees in your garden, and for cats, who cannot metabolise
              permethrin and can die from contact with treated fabric.
            </p>
          </div>
          <div className="wcu-pillar">
            <div className="wcu-pillar-n">∞</div>
            <h3>It never wears off</h3>
            <p>
              Treated clothing loses its protection somewhere between the 20th and 70th wash, and
              nothing tells you when. A weave has no expiry date. The garment protects on its last
              day exactly as well as on its first.
            </p>
          </div>
        </div>
      </section>

      {/* VERGELIJKING */}
      <section className="wcu-sec" style={{ background: "#fff" }}>
        <div className="wcu-in">
          <div style={{ ...LBL }}>THE COMPARISON</div>
          <h2 style={{ ...H2, marginBottom: 8 }}>Against the alternatives</h2>
          <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, marginBottom: 28, maxWidth: 620 }}>
            The honest version. Treated clothing and sprays do work. The question is for how long, at
            what cost, and what happens when you stop paying attention.
          </p>
          <div className="wcu-tw">
            <table className="wcu-table">
              <thead>
                <tr>
                  <th />
                  <th className="on">Bug Away</th>
                  <th>Permethrin clothing</th>
                  <th>DEET spray</th>
                  <th>Regular clothing</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([row, a, b, cc, d]) => (
                  <tr key={row}>
                    <th scope="row">{row}</th>
                    <td className="on">{a}</td>
                    <td>{b}</td>
                    <td>{cc}</td>
                    <td>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* MESH */}
      <section className="wcu-sec" style={{ background: c.off }}>
        <div className="wcu-in wcu-mesh">
          <div>
            <div style={{ ...LBL }}>THE MECHANISM</div>
            <h2 style={{ ...H2, marginBottom: 16 }}>Why a tick cannot get through</h2>
            <p style={{ color: "#666", fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
              A tick does not jump, fly or burrow through fabric. It climbs to roughly knee height on
              grass, holds its front legs out and waits for something to brush past. Then it crawls
              upward looking for an opening: a cuff, a waistband, the gap above a sock.
            </p>
            <p style={{ color: "#666", fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
              That behaviour is the whole reason this works. Close every opening with a weave finer
              than the animal itself and there is no route in. Mosquitoes are different, they bite
              through fabric pressed against skin, which is why the mesh is worn loose with air behind
              it.
            </p>
            <Link to="/how-it-works" style={{ ...BTNO, textDecoration: "none" }}>
              See how it works
            </Link>
          </div>
          <img src="/images/proof-ticks.jpg" alt="A tick on Bug Away mesh, unable to pass through the weave" loading="lazy" />
        </div>
      </section>

      {/* ZIEKTEN */}
      <section className="wcu-sec" style={{ background: "#fff" }}>
        <div className="wcu-in">
          <div style={{ ...LBL, color: "#c0392b" }}>WHAT IS AT STAKE</div>
          <h2 style={{ ...H2, marginBottom: 8 }}>What ticks actually carry</h2>
          <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, marginBottom: 28, maxWidth: 620 }}>
            A tick bite is not the problem. What comes with it is. Most of these need the tick
            attached for many hours, which is why prevention and a same-day check beat everything
            else.
          </p>
          <div className="wcu-dis">
            {DISEASES.map((d) => (
              <div key={d.name} className="wcu-dis-c" style={{ borderLeftColor: d.color }}>
                <div className="wcu-dis-h">
                  <span className="wcu-dis-n">{d.name}</span>
                  <span className="wcu-dis-s" style={{ background: d.color }}>{d.sev}</span>
                </div>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ color: c.gray, fontSize: 12, lineHeight: 1.6, marginTop: 20, fontFamily: "'Poppins',sans-serif" }}>
            General information, not medical advice. If you think you have been bitten and feel
            unwell, speak to a doctor.
          </p>
        </div>
      </section>

      {/* EERLIJKE GRENZEN */}
      <section className="wcu-sec" style={{ background: c.off }}>
        <div className="wcu-narrow">
          <div style={{ ...LBL }}>THE HONEST PART</div>
          <h2 style={{ ...H2, marginBottom: 8 }}>What Bug Away does not do</h2>
          <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
            Every brand tells you what their product does. Here is the other half, because you will
            find this out anyway and we would rather you hear it now.
          </p>
          <div className="wcu-limits">
            <ul>
              <li>
                <strong>It does not replace a tick check.</strong> It covers what it covers. Ticks
                find the gap: the wrist, above the ankle, behind the ear. Check the warm spots after
                every outing. It takes ninety seconds.
              </li>
              <li>
                <strong>It is a layer, not an outfit.</strong> This goes over what you are already
                wearing. It is mesh. You can see through it, and that is deliberate.
              </li>
              <li>
                <strong>Worn tight, mosquitoes win.</strong> Fabric pressed flat against skin gives a
                mosquito something to bite through. Size for airflow, not for fit.
              </li>
              <li>
                <strong>It does not protect your dog.</strong> A dog through undergrowth is a tick
                magnet and carries them straight back into the house. That is a separate problem and
                we do not have a product for it yet.
              </li>
              <li>
                <strong>It is not warm.</strong> Mesh breathes, which is exactly why it works in
                July and why it does nothing for you in November.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wcu-sec" style={{ background: c.sage, textAlign: "center" }}>
        <div className="wcu-narrow">
          <h2 style={{ ...H2, color: "#fff", fontSize: 30, marginBottom: 12 }}>
            Find the version for how you use it
          </h2>
          <p style={{ color: "rgba(255,255,255,.85)", fontSize: 15, marginBottom: 28, lineHeight: 1.7 }}>
            The gear is the same. The problem it solves looks different depending on whether you are
            kneeling in a flower bed or standing in a river at dusk.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              ["Gardening", "/gardening"],
              ["Hiking", "/hiking"],
              ["Fishing", "/fishing"],
              ["Families", "/families"],
            ].map(([label, to]) => (
              <Link key={to} to={to} style={{ ...BTNO, color: "#fff", borderColor: "#fff", textDecoration: "none" }}>
                {label}
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            <Link to="/shop" style={{ ...BTN, background: "#1a2e24", textDecoration: "none" }}>
              Shop all products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
