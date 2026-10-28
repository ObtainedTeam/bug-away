import { useState } from 'react';
import { c, FW, R, BTN, CHIP } from '../theme';

// Interactieve maatadviseur op basis van lengte, gewicht en gewenste pasvorm.
// Bug Away is een overkledingstuk (ruime pasvorm, zie size-guide-fittype.png),
// dus het advies gaat uit van lichaamsmaat; "loose" = één maat groter voor
// dikke lagen eronder. Maattabellen (in inches) komen uit de size-guide-PNG's.
// Weet je de verdeling beter (retourdata), pas dan WEIGHT_LB en de lengtegrenzen aan.

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
export const JACKET = { Bust: [44, 46, 50, 52, 56, 59, 62], Length: [25.5, 26.5, 27, 27.5, 30, 32, 34], Sleeve: [24.5, 25.5, 26.5, 28, 29, 30, 32] };
export const PANTS = { Waist: [29, 32, 38, 40, 44, 48, 52], Hips: [47, 48, 52, 56, 60, 64, 68], Inseam: [28.5, 30, 31, 32, 33, 35, 36.5] };

// Bovengrens lichaamsgewicht (lb) per maat, heren- en damessilhouet.
const WEIGHT_LB = {
  men: [135, 160, 185, 210, 235, 265, Infinity],
  women: [120, 140, 165, 190, 215, 245, Infinity],
};

const LB_PER_KG = 2.20462;
const IN_PER_CM = 0.393701;

// Benodigde binnenbeenlengte ongeveer 45% van de lichaamslengte.
function sizeFor({ heightIn, weightLb, fit, body }) {
  const bands = WEIGHT_LB[body] || WEIGHT_LB.men;
  let i = bands.findIndex((max) => weightLb <= max);
  if (i < 0) i = SIZES.length - 1;
  // Lang en licht: één maat groter voor mouw- en beenlengte
  const inseamNeed = heightIn * 0.45;
  while (i < SIZES.length - 1 && PANTS.Inseam[i] < inseamNeed - 1.5) i += 1;
  if (fit === 'snug') i = Math.max(0, i - 1);
  if (fit === 'loose') i = Math.min(SIZES.length - 1, i + 1);
  return i;
}

export default function SizeFinder({ product, onPick }) {
  const body = product.category === 'WOMEN' || product.id.includes('women') ? 'women' : 'men';
  const [unit, setUnit] = useState('us');
  const [ft, setFt] = useState('');
  const [inch, setInch] = useState('');
  const [cm, setCm] = useState('');
  const [w, setW] = useState('');
  const [fit, setFit] = useState('regular');
  const [res, setRes] = useState(null);

  const heightIn = unit === 'us' ? (+ft || 0) * 12 + (+inch || 0) : (+cm || 0) * IN_PER_CM;
  const weightLb = unit === 'us' ? +w || 0 : (+w || 0) * LB_PER_KG;
  const valid = heightIn >= 54 && heightIn <= 84 && weightLb >= 80 && weightLb <= 400;
  const avail = product.sizes.map((s) => (s === 'XXL' ? 'XXL' : s));

  const run = (e) => {
    e.preventDefault();
    if (!valid) { setRes({ err: true }); return; }
    const i = sizeFor({ heightIn, weightLb, fit, body });
    setRes({ i, size: avail[i] || avail[avail.length - 1] });
  };

  const input = { width: '100%', height: 46, border: `1.5px solid ${c.line}`, borderRadius: R.sm, padding: '0 12px', fontSize: 16, color: c.dark, background: c.white };
  const lbl = { fontSize: 13, fontWeight: FW.mid, color: c.grayD, display: 'block', marginBottom: 6 };
  const seg = (on) => ({ ...CHIP, flex: 1, justifyContent: 'center', minHeight: 44, fontSize: 14, border: `1.5px solid ${on ? c.dark : c.line}`, background: on ? c.dark : c.white, color: on ? c.white : c.dark, cursor: 'pointer' });
  const fmt = (v) => (unit === 'us' ? `${v}"` : `${Math.round(v * 2.54)} cm`);

  return (
    <form onSubmit={run} style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={() => { setUnit('us'); setW(''); setRes(null); }} aria-pressed={unit === 'us'} style={seg(unit === 'us')}>ft / lb</button>
        <button type="button" onClick={() => { setUnit('metric'); setW(''); setRes(null); }} aria-pressed={unit === 'metric'} style={seg(unit === 'metric')}>cm / kg</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 10 }}>
        {unit === 'us' ? (
          <div>
            <span style={lbl}>Height</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <input aria-label="Height in feet" inputMode="numeric" placeholder="ft" value={ft} onChange={(e) => setFt(e.target.value.replace(/\D/g, ''))} style={input} />
              <input aria-label="Height in inches" inputMode="numeric" placeholder="in" value={inch} onChange={(e) => setInch(e.target.value.replace(/\D/g, ''))} style={input} />
            </div>
          </div>
        ) : (
          <label><span style={lbl}>Height (cm)</span><input inputMode="numeric" placeholder="178" value={cm} onChange={(e) => setCm(e.target.value.replace(/\D/g, ''))} style={input} /></label>
        )}
        <label><span style={lbl}>Weight ({unit === 'us' ? 'lb' : 'kg'})</span><input inputMode="numeric" placeholder={unit === 'us' ? '175' : '80'} value={w} onChange={(e) => setW(e.target.value.replace(/\D/g, ''))} style={input} /></label>
      </div>
      <div>
        <span style={lbl}>How do you like it to fit?</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {[['snug', 'Closer'], ['regular', 'Regular'], ['loose', 'Loose, over layers']].map(([k, l]) => (
            <button key={k} type="button" onClick={() => { setFit(k); setRes(null); }} aria-pressed={fit === k} style={seg(fit === k)}>{l}</button>
          ))}
        </div>
      </div>
      <button type="submit" style={{ ...BTN, width: '100%' }}>Find my size</button>

      {res && res.err && <p role="alert" style={{ fontSize: 14, color: '#b42318' }}>Please fill in your height and weight.</p>}
      {res && !res.err && (
        <div role="status" style={{ background: c.mint, borderRadius: R.lg, padding: 18 }}>
          <div style={{ fontSize: 14, color: c.grayD }}>Our recommendation</div>
          <div style={{ fontSize: 34, fontWeight: FW.head, color: c.dark, lineHeight: 1.1, margin: '2px 0 8px' }}>{res.size}</div>
          <p style={{ fontSize: 14, lineHeight: 1.5, color: c.dark }}>
            Garment size {res.size}: {!product.id.includes('pants') && <>chest {fmt(JACKET.Bust[res.i])}, sleeve {fmt(JACKET.Sleeve[res.i])}</>}
            {product.id.includes('combo') && ' · '}
            {!product.id.includes('jacket') && <>waist up to {fmt(PANTS.Waist[res.i])}, inseam {fmt(PANTS.Inseam[res.i])}</>}.
            {' '}Bug Away is cut roomy to go over your clothes. Between two sizes or wearing a fleece underneath? Take the larger one.
          </p>
          {onPick && <button type="button" onClick={() => onPick(res.size)} style={{ ...BTN, height: 46, marginTop: 12 }}>Select size {res.size}</button>}
        </div>
      )}
    </form>
  );
}
