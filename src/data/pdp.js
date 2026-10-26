// Gedeelde inhoud voor de productpagina's (kleding).

// Harde cijfers onder de koopsectie.
export const SPECS = [
  ['< 0.6 mm', 'mesh openings, finer than a no-see-um'],
  ['< 80 g', 'for the full set, jacket plus pants'],
  ['0', 'insecticides: no DEET, no permethrin'],
  ['30 days', 'money-back guarantee and returns'],
];

// Bewijsbeelden met onderschrift (naast de video).
export const PROOF = [
  { img: '/images/proof-ticks.jpg', cap: 'Tick stopped on the outside of the mesh', pos: 'center' },
  { img: '/images/proof-mosquito.jpg', cap: 'A mosquito can\'t get its mouth through', pos: 'center' },
  { img: '/images/pants-detail-feet-grass.jpg', cap: 'Sewn-in foot cover: no gap at the ankle', pos: 'center' },
];

// Bezwaren wegnemen. Antwoorden komen overeen met data.js en het retourbeleid.
export const PDP_FAQ = [
  ['Won\'t I overheat in an extra layer?', 'It is mesh, so air moves straight through it. The full set weighs under 80 grams and you can wear it over a t-shirt on a warm day.'],
  ['Does it really stop ticks?', 'Yes. The openings are smaller than 0.6 mm. An adult deer tick is roughly 1 to 3 mm and cannot get through or bite through the weave. Keep the mesh loose over your clothes, so nothing presses it against your skin.'],
  ['What about mosquitoes and black flies?', 'The mesh is no-see-um grade, so mosquitoes, black flies, gnats and no-see-ums stay on the outside too.'],
  ['How does it fit over my clothes?', 'Bug Away is an over-garment. Wear it over your hiking, fishing or garden clothes. If you are between two sizes, size up.'],
  ['How do I wash it?', 'Machine wash cold on a gentle cycle, then hang dry or tumble dry low. There is no chemical treatment, so nothing washes out.'],
  ['What if it doesn\'t work for me?', 'You are covered by our 30-day money-back guarantee. If a tick or mosquito gets through the mesh, we refund you in full.'],
];

// "Complete your protection": op een set eerst de andere sets (richting de
// familiebundel), anders de bijpassende set en accessoires.
const SETS = ['ba-combo-men', 'ba-combo-women', 'ba-kids-set'];
const MATCH = {
  'ba-jacket-men': ['ba-combo-men', 'ba-pants-men'], 'ba-pants-men': ['ba-combo-men', 'ba-jacket-men'],
  'ba-jacket-women': ['ba-combo-women', 'ba-pants-women'], 'ba-pants-women': ['ba-combo-women', 'ba-jacket-women'],
};
export function related(id) {
  const acc = ['ba-tick-kit', 'ba-storage-pouch', 'ba-repellent-spray'];
  const list = SETS.includes(id) ? [...SETS.filter((x) => x !== id), 'ba-storage-pouch', 'ba-tick-kit'] : [...(MATCH[id] || SETS), ...acc];
  return [...new Set(list)].filter((x) => x !== id).slice(0, 4);
}
