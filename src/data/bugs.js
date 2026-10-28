// "Protect from": per insect een pagina (/protect/<key>), een menu-ingang en
// een shopfilter (/shop?bug=<key>). Welk product tegen welk insect helpt staat
// in PROTECTS. Nieuw product? Zet zijn id erbij met de insecten die het écht
// tegenhoudt; menu, filter en insectpagina's lopen vanzelf mee.
// Nieuw insect? Eén blok in BUGS. Houd de tekst feitelijk: geen medische claims.

const MESH = ['ticks', 'mosquitoes', 'no-see-ums', 'black-flies'];

export const PROTECTS = {
  'ba-combo-men': MESH, 'ba-combo-women': MESH, 'ba-kids-set': MESH,
  'ba-jacket-men': MESH, 'ba-jacket-women': MESH, 'ba-pants-men': MESH, 'ba-pants-women': MESH,
  'ba-tick-kit': ['ticks'],
  'ba-repellent-spray': ['mosquitoes'],
};

export const BUGS = [
  {
    key: 'ticks', label: 'Ticks', short: 'Stop them before they climb', img: '/images/proof-ticks.jpg',
    h1: 'Protection from ticks',
    lede: 'Ticks wait in grass and low brush and climb onto whatever brushes past. Bug Away keeps them on the outside, without a drop of insecticide.',
    facts: [
      ['Where they wait', 'On grass, leaf litter and low vegetation, roughly at knee height. Ticks can\'t jump or fly, they hold on to whatever brushes past.'],
      ['How they bite', 'They crawl upward to warm, thin skin before they bite, and a bite can go unnoticed for hours. In North America the blacklegged (deer) tick can carry Lyme disease.'],
      ['How Bug Away stops them', 'Mesh openings under 0.6 mm are far smaller than a tick. The hood is sewn on and the foot cover is sewn onto the pants, so there is no way in at the neck or the ankle.'],
    ],
    tips: ['Walk in the middle of the trail.', 'Check the waistband, behind the knees and the hairline afterwards.', 'Shower within two hours of coming inside.'],
    metaTitle: 'Tick Protection Clothing | Chemical-Free Mesh | Bug Away',
    metaDescription: 'Ticks climb on from grass and brush. Bug Away mesh keeps them on the outside, sealed at the hood and ankle, with no permethrin or DEET.',
  },
  {
    key: 'mosquitoes', label: 'Mosquitoes', short: 'No bites through the mesh', img: '/images/proof-mosquito.jpg',
    h1: 'Protection from mosquitoes',
    lede: 'Mosquitoes find you near water, in the shade and at dusk. A loose layer of fine mesh keeps them off your skin without spraying anything.',
    facts: [
      ['Where they are', 'Around standing water, in damp shade and, for many species, most active around dusk and dawn.'],
      ['How they bite', 'A mosquito can bite through thin fabric that lies tight against your skin, which is why ordinary shirts often don\'t help.'],
      ['How Bug Away stops them', 'The mesh openings are too small to get through, and Bug Away is cut roomy so the mesh sits away from your skin. Keep it loose and they can\'t reach you.'],
    ],
    tips: ['Wear it loose, with a t-shirt underneath.', 'Put it on before dusk, not after the first bite.', 'Use a DEET-free repellent on your hands and face if they are exposed.'],
    metaTitle: 'Mosquito Protection Clothing | Chemical-Free Mesh | Bug Away',
    metaDescription: 'Fine mesh that keeps mosquitoes off your skin at dusk, by the water and around camp. No DEET, nothing to reapply.',
  },
  {
    key: 'no-see-ums', label: 'No-see-ums', short: 'Small enough for the tiniest biters', img: '/images/detail-collage-white.jpg',
    h1: 'Protection from no-see-ums',
    lede: 'No-see-ums are biting midges so small they slip through ordinary insect netting. Bug Away is made from no-see-um-grade mesh for exactly that reason.',
    facts: [
      ['Where they are', 'Near beaches, marshes, lakes and rivers, especially on still, humid evenings.'],
      ['Why they get through', 'They are only a millimetre or two long, small enough to pass through the wider mesh of a standard bug net.'],
      ['How Bug Away stops them', 'No-see-um-grade mesh with openings under 0.6 mm, closed from the hood down to the foot cover.'],
    ],
    tips: ['Wind keeps them down: sit where the breeze reaches you.', 'Pull the hood drawstring snug around your face on still evenings.', 'Light-coloured mesh makes it easier to see what lands on you.'],
    metaTitle: 'No-See-Um Protection Clothing | Fine Mesh | Bug Away',
    metaDescription: 'Biting midges slip through ordinary netting. Bug Away uses no-see-um-grade mesh with openings under 0.6 mm.',
  },
  {
    key: 'black-flies', label: 'Black flies', short: 'Nowhere to crawl in', img: '/images/MAle _ Black Mesh _ Fly fishing.png',
    h1: 'Protection from black flies',
    lede: 'Black flies swarm near running water in spring and early summer and crawl into every gap they can find. Bug Away leaves them none.',
    facts: [
      ['Where they are', 'Near clean, fast-flowing rivers and streams, especially in Canada and the northern US in late spring and early summer.'],
      ['How they bite', 'They crawl into gaps at the collar, cuffs and hairline before they bite, and they come in swarms.'],
      ['How Bug Away stops them', 'The drawstring hood closes around your face and the set covers you from head to ankle in fine mesh.'],
    ],
    tips: ['Tighten the hood before you reach the water.', 'Dark clothing attracts them more, so a white set helps.', 'Keep the mesh on during the calm hours of the morning and evening.'],
    metaTitle: 'Black Fly Protection Clothing | Chemical-Free Mesh | Bug Away',
    metaDescription: 'Black flies crawl into every gap. Bug Away covers you from hood to ankle in fine mesh, with no chemicals.',
  },
];

export const getBug = (key) => BUGS.find((b) => b.key === key);
export const protectsAgainst = (id, bug) => (PROTECTS[id] || []).includes(bug);
