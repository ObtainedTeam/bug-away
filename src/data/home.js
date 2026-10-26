// Inhoud van de homepage. Teksten en beelden aanpassen = hier aanpassen.
import { webp } from '../img';

// Producttabs direct onder de hero.
export const HOME_TABS = [
  { key: 'best', label: 'Best sellers', ids: ['ba-combo-men', 'ba-combo-women', 'ba-kids-set', 'ba-jacket-women'] },
  { key: 'sets', label: 'Full sets', ids: ['ba-combo-men', 'ba-combo-women', 'ba-kids-set'] },
  { key: 'jackets', label: 'Jackets', ids: ['ba-jacket-men', 'ba-jacket-women'] },
  { key: 'pants', label: 'Pants', ids: ['ba-pants-men', 'ba-pants-women'] },
  { key: 'kids', label: 'Kids', ids: ['ba-kids-set'] },
  { key: 'accessories', label: 'Accessories', ids: ['ba-tick-kit', 'ba-storage-pouch', 'ba-repellent-spray'] },
];

// De drie kernvragen: werkt het, is het draagbaar, is het veilig.
export const BENEFITS = [
  {
    q: 'Does it actually work?',
    title: 'A barrier ticks physically can\'t get through',
    text: 'The mesh openings are smaller than 0.6 mm, finer than a no-see-um. Ticks, mosquitoes and black flies simply don\'t fit. The hood is sewn on and the foot cover is sewn onto the pants, so there is no gap at the neck or the ankle.',
    points: ['No-see-um-grade mesh, openings under 0.6 mm', 'Closed from the hood down to the foot cover', 'Works from the first minute, no drying time'],
    img: '/images/proof-ticks.jpg', alt: 'A tick on Bug Away mesh, unable to get through', pos: 'center',
  },
  {
    q: 'Can I wear it in the heat?',
    title: 'So light you forget it\'s on',
    text: 'A full set weighs under 80 grams and air moves straight through it. Wear it over a t-shirt and shorts on a warm day, or over your hiking gear. It packs into its own pocket when you don\'t need it.',
    points: ['Full set under 80 g', 'Breathable mesh, no trapped heat', 'Pulls on over your own clothes in seconds'],
    img: '/images/Female _ White mesh _ mountain solo.png', alt: 'Woman hiking in the mountains in a white Bug Away set', pos: 'center 62%',
  },
  {
    q: 'Is it safe for my family?',
    title: 'Nothing on your skin. Nothing to wash out.',
    text: 'There is no DEET, no permethrin and no treatment to wear off after a few washes. The protection is the weave itself, so it\'s the same on day one as after a whole season, for adults, kids and the dog walk in between.',
    points: ['No insecticides, no sprays', 'Machine washable, protection doesn\'t fade', 'Kids sizes 4 to 12 with a safe elastic hood trim'],
    img: '/images/Family .png', alt: 'Family outdoors wearing Bug Away mesh sets', pos: 'center 25%',
  },
];

// Review- en informatievideo's: twee breed boven, vier smal eronder.
// Een video zonder `src` toont "Video coming soon". Nieuwe video's: zet het
// bestand in public/videos en vul src (en poster) in.
export const HOME_VIDEOS = {
  big: [
    { src: '/videos/see-in-action-720.mp4', poster: '/img/see-in-action-poster.webp', caption: 'See it in action', sub: 'A live tick on the mesh, up close', pos: 'center 40%' },
    { src: '/videos/hero-1280.mp4', poster: '/img/hero-poster.webp', caption: 'Built for real days outside', sub: 'Hiking, fishing, camping, gardening', wide: true },
  ],
  small: [
    { caption: 'Hiking review', poster: webp('/images/2 guys _ white and black mesh_ hiking.png') },
    { caption: 'Gardening review', poster: webp('/images/jacket-women-lifestyle-gardening.jpg') },
    { caption: 'Family review', poster: webp('/images/kids-lifestyle-forest-playing.jpg') },
    { caption: 'Fishing review', poster: webp('/images/MAle _ Black Mesh _ Fly fishing.png') },
  ],
};

// Vaste kennisblokken (getoond tot de blogartikelen geladen zijn).
export const GUIDES = [
  { href: '/how-it-works', img: '/images/how-it-works-infographic.png', cat: 'Guide', title: 'How mesh stops ticks without chemicals', meta: '4 min read' },
  { href: '/why-choose-us', img: '/images/detail-collage-white.jpg', cat: 'Compare', title: 'Mesh vs permethrin vs DEET: an honest comparison', meta: '6 min read' },
  { href: '/tick-safety-guide.pdf', img: '/images/pants-detail-feet-grass.jpg', cat: 'Free guide', title: 'The tick safety guide for families', meta: 'PDF' },
];

// Seizoensboodschap voor het urgentieblok (CDC: nimfen vooral lente en zomer,
// volwassen teken van herfst tot vroege lente op elke dag boven het vriespunt).
export function season(month = new Date().getMonth()) {
  if (month >= 2 && month <= 4) return {
    tag: 'Spring tick season',
    title: 'Tick season is starting again',
    text: 'As soon as it warms up, nymph ticks become active. They are tiny, hard to spot and responsible for most bites. Gear up before your first long walk of the year.',
  };
  if (month >= 5 && month <= 7) return {
    tag: 'Peak tick season',
    title: 'Summer is peak season for nymph ticks',
    text: 'Nymph ticks are about the size of a poppy seed and most active in late spring and summer, exactly when you spend the most time outside. Cover up before you head out.',
  };
  return {
    tag: 'Fall and winter tick season',
    title: 'Adult deer ticks are active right now',
    text: 'Adult blacklegged ticks look for a host from fall into early spring, on any day above freezing. Gear up the whole family before your next hike.',
  };
}
