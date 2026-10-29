// Catalogusstructuur: één plek voor navigatie, collectiefilters en de
// producttabs op de homepage. Schaalbaar: een nieuw product = een id erbij in
// de juiste groep; een nieuwe productlijn = één regel in CATS.
// Een aangekondigd product krijgt `soon` (afbeelding + korte tekst) in plaats
// van `ids`; navigatie toont dan automatisch een "Soon"-badge met aanmeldlink.
import { products } from '../data';

export const productById = (id) => products.find((p) => p.id === id);

// Kaartfoto per product: rustige studiofoto op lichte achtergrond.
// Lifestylefoto: voor tegels en hover. Pas hier aan, nergens anders.
export const CARD_IMG = {
  'ba-combo-men': '/images/Male _ White mesh _ front 1_1.jpg',
  'ba-combo-women': '/images/Female _ White Mesh _ Front 1_1.jpg',
  'ba-kids-set': '/images/Family .png',
  'ba-jacket-men': '/images/Male _ White mesh _ torso close up front 1_1.jpg',
  'ba-jacket-women': '/images/Female _ white mesh _ smiling torso 1_1.jpg',
  'ba-pants-men': '/images/Male _ White mesh _ pants 1_1.jpg',
  'ba-pants-women': '/images/Female _ White mesh _ Pants 1_1.jpg',
  'ba-tick-kit': '/images/tick-kit-hero.jpg',
  'ba-storage-pouch': '/images/storage-pouch-hero.jpg',
  'ba-repellent-spray': '/images/repellent-lifestyle-spray.jpg',
};
export const HOVER_IMG = {
  'ba-combo-men': '/images/Male _ Black mesh _ full suit front 1_1.jpg',
  'ba-combo-women': '/images/Female _ black mesh _ Full 1_1.jpg',
  'ba-jacket-men': '/images/Male _ Black Mesh _ Hoodie on 1_1.jpg',
  'ba-jacket-women': '/images/Female _ black mesh _ hoodie on front 1_1.jpg',
  'ba-pants-men': '/images/Male _ black mesh _ pants fronts full body 1_1.jpg',
  'ba-pants-women': '/images/Female _ white mesh _ pants smiling 1_1.jpg',
};

// Korte naam en één regel voordeel voor kaarten en menu.
export const SHORT = {
  'ba-combo-men': ['Full Set — Men', 'Jacket + pants, hood to ankle'],
  'ba-combo-women': ['Full Set — Women', 'Jacket + pants, tailored fit'],
  'ba-kids-set': ['Kids Set', 'Jacket + pants, ages 4 to 12'],
  'ba-jacket-men': ['Jacket — Men', 'Hooded mesh jacket'],
  'ba-jacket-women': ['Jacket — Women', 'Hooded mesh jacket, slim fit'],
  'ba-pants-men': ['Pants — Men', 'Sewn-in foot cover'],
  'ba-pants-women': ['Pants — Women', 'Sewn-in foot cover'],
  'ba-tick-kit': ['Tick Removal Kit', 'For people and pets'],
  'ba-storage-pouch': ['Storage Pouch', 'Fits a full set'],
  'ba-repellent-spray': ['Natural Repellent', 'DEET-free, for exposed skin'],
};

export const CATS = [
  { key: 'sets', label: 'Full Sets', intro: 'Jacket and pants together, sealed from hood to ankle. Less than the two pieces apart, and buy 3 sets, get the 4th free.', ids: ['ba-combo-men', 'ba-combo-women', 'ba-kids-set'] },
  { key: 'jackets', label: 'Jackets', intro: 'Hooded no-see-um mesh jackets that go over what you already wear.', ids: ['ba-jacket-men', 'ba-jacket-women'] },
  { key: 'pants', label: 'Pants', intro: 'Mesh pants with a sewn-in foot cover, so nothing gets in at the ankle.', ids: ['ba-pants-men', 'ba-pants-women'] },
  { key: 'kids', label: 'Kids', intro: 'The full set in kids sizes 4 to 12, with a safe elastic hood trim.', ids: ['ba-kids-set'], hideInShopMenu: true },
  { key: 'accessories', label: 'Accessories', intro: 'The small things that finish your protection on the trail and at home.', ids: ['ba-tick-kit', 'ba-storage-pouch', 'ba-repellent-spray'] },
  { key: 'hoodie-shirts', label: 'Mosquito Shirt with Hood', soon: { img: '/images/Female _ White mesh _ hoodie on 1_1.jpg', text: 'A lightweight mesh shirt with a hood for warm days with mosquitoes around.' } },
  { key: 'scarf-shirts', label: 'Mosquito Shirt with Scarf', soon: { img: '/images/Female _ White mesh _ hoodie on 1_1.jpg', text: 'A mesh shirt with a neck scarf that covers the gap at your collar.' } },
  { key: 'gloves', label: 'Gloves', soon: { img: '/images/detail-zipper.jpg', text: 'Sheer mesh gloves for hands that stay out of the sleeves.' } },
  { key: 'masks', label: 'Face Masks', soon: { img: '/images/detail-collage-white.jpg', text: 'A mesh face cover for the worst black-fly days.' } },
  { key: 'dogs', label: 'Dog Suit', soon: { img: '/images/tick-kit-hero.jpg', text: 'A mesh suit that keeps ticks off your dog on the trail.' } },
];

// Doelgroepen voor collectie en categoriekaarten.
export const AUDIENCES = [
  { key: 'men', label: 'Men', ids: ['ba-combo-men', 'ba-jacket-men', 'ba-pants-men'], img: '/images/MAle _ Black Mesh _ Fly fishing.png' },
  { key: 'women', label: 'Women', ids: ['ba-combo-women', 'ba-jacket-women', 'ba-pants-women'], img: '/images/Female _ White mesh _ Forest solo.png' },
  { key: 'kids', label: 'Kids', ids: ['ba-kids-set'], img: '/images/Family .png' },
  { key: 'sets', label: 'Bundles', ids: ['ba-combo-men', 'ba-combo-women', 'ba-kids-set'], img: '/images/2 guys black and white _ white and black mesh_ hiking.png' },
];


export const SECONDARY_LINKS = [
  ['/how-it-works', 'How it works'],
  ['/reviews', 'Reviews'],
  ['/blog', 'Blog'],
  ['/faq', 'Help'],
];

export const USE_CASES_NAV = [
  ['/hiking', 'Hiking'], ['/camping', 'Camping'], ['/gardening', 'Gardening'], ['/fishing', 'Fishing'], ['/travel', 'Travel'], ['/families', 'Families'],
];
