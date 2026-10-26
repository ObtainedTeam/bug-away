import { IMAGES } from './data/images';

// Alle foto's in de data verwijzen naar het origineel in /images/. pic() geeft
// de lichte webp uit /img/ terug met breedte, hoogte en srcset, zodat de
// browser op een telefoon de 480- of 960-versie laadt.
// Gebruik: <img {...pic(src, '(max-width: 767px) 50vw, 300px')} alt="" />
// Nieuwe of vervangen foto? Draai python3 scripts/gen-images.py.
export function pic(src, sizes = '100vw') {
  const e = IMAGES[src];
  if (!e) return { src };
  const [slug, w, h, widths] = e;
  const base = `/img/${slug}`;
  const out = { src: `${base}.webp`, width: w, height: h };
  if (widths.length) {
    out.srcSet = [...widths.map((x) => `${base}-${x}.webp ${x}w`), `${base}.webp ${w}w`].join(', ');
    out.sizes = sizes;
  }
  return out;
}

// Alleen de url van de lichte versie (voor posters en achtergronden).
export const webp = (src) => (IMAGES[src] ? `/img/${IMAGES[src][0]}.webp` : src);
