const STD = [
  "/images/proof-mosquito.jpg",
  "/images/proof-ticks.jpg",
  "/images/proof-spider.jpg",
  "/images/size-guide-jacket.png",
  "/images/size-guide-fittype.png",
  "/images/size-guide-chart.png",
];

// Region-aware prices for single items and sets.
// Used together with getPrice(product, isUS) from currency.jsx.
const PRICE_SINGLE = { usd: 44.99, eur: 38.99 };
const PRICE_SET    = { usd: 79.99, eur: 68.99 };

// New product colors: only Arctic White and Black.
// IMPORTANT: Black variant IDs must exist in Shopify before checkout works for Black.
// See shopify.js — Black entries currently fall back to the product page.
const COLORS = ["Arctic White", "Black"];
const COLOR_HEX = ["#F5F5F0", "#1a1a1a"];

export const products = [
  {
    id: "ba-jacket-men",
    name: "Bug Away Jacket — Men",
    category: "MEN",
    price: PRICE_SINGLE.eur,          // legacy field, kept for backward compatibility
    prices: PRICE_SINGLE,              // new region-aware prices
    badge: "Best Seller",
    colors: COLORS,
    colorHex: COLOR_HEX,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    desc: "Full-coverage mesh jacket for men. Drawstring hood, zip closure and side pockets. Pairs perfectly with our Bug Away Pants for complete 360° tick protection. Chemical-free, lightweight and breathable.",
    longDesc: `The Bug Away Jacket is built around one idea: a physical barrier is the only barrier you can truly trust. Made from noseeum-grade nylon mesh with openings smaller than 0.6mm, it stops ticks, mosquitoes, harvest mites and gnats before they ever reach your skin — without a single drop of insecticide.

Pull it on over your regular clothes in seconds. You'll barely notice it's there — the full set weighs under 80g — but the bugs certainly will. The drawstring hood seals around your face, the zip closure keeps the front protected, and the side pockets keep your hands bite-free while you hike, garden or camp.

This jacket is designed for the outdoors, not the lab. No DEET, no permethrin, no chemical residue on your clothes or your skin. Just a smart, breathable layer between you and the insects that carry Lyme disease, TBE and anaplasmosis.

Wear it as a base layer under your regular jacket, or on its own on warm days. It breathes freely, doesn't trap heat and packs small enough to throw in a daypack.`,
    features: [
      "Noseeum-grade mesh — openings < 0.6mm block ticks, mosquitoes and gnats",
      "Drawstring hood with full face coverage",
      "Full-length zip closure",
      "Two deep side pockets",
      "Weight: < 45g per jacket",
      "UPF 30+ sun protection",
      "Machine washable, cold gentle cycle",
      "100% chemical-free — no permethrin, no DEET",
      "Pairs with Bug Away Pants for 360° coverage",
    ],
    useCases: ["Hiking & trail running", "Gardening", "Camping", "Dog walking in tall grass", "Outdoor festivals", "Travel in tick-heavy regions"],
    // Order: studio front -> studio side -> studio back -> studio detail -> new lifestyle (4:5) -> detail collage -> STD
    images: [
      "/images/Male _ White mesh _ front 1_1.jpg",
      "/images/Male _ White mesh _ Side profile 1_1.jpg",
      "/images/Male _ White mesh _ backside 1_1.jpg",
      "/images/Male _ White mesh _ torso close up front 1_1.jpg",
      "/images/Male _ Black mesh _ full suit front 1_1.jpg",
      "/images/Male _ Black mesh _torso front 1_1.jpg",
      "/images/Male _ Black mesh _ backside 1_1.jpg",
      "/images/Male _ Black Mesh _ Hoodie on 1_1.jpg",
      "/images/Male _ black mesh _ bino's hunting.png",
      "/images/MAle _ Black Mesh _ Fly fishing.png",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-pants-men",
    name: "Bug Away Pants — Men",
    category: "MEN",
    price: PRICE_SINGLE.eur,
    prices: PRICE_SINGLE,
    badge: "Best Seller",
    colors: COLORS,
    colorHex: COLOR_HEX,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    desc: "Tick-protection pants for men with integrated foot cover. The pant leg and foot are one continuous piece of mesh — no gap at the ankle, no entry point for ticks. Lightweight, breathable and chemical-free.",
    longDesc: `Ticks don't announce themselves. They wait in tall grass, brush their way onto your ankle and crawl upward before you ever notice. The Bug Away Pants close that gap — literally.

The pant leg and foot cover are one single, continuous piece of noseeum-grade mesh. There is no elastic band at the ankle, no separate sock to tuck in, no gap for insects to exploit. From waistband to toe, the mesh flows uninterrupted — the way proper tick protection should work.

Worn as a base layer under your regular trousers or directly as lightweight outdoor pants, they're virtually weightless and fully breathable. The elastic waistband sits comfortably, and the mesh allows air to circulate freely even on warm days.

No chemicals. No permethrin runoff into the environment. No DEET on your skin. Just a physical barrier made from nylon mesh finer than most insects can navigate.

Pair with the Bug Away Jacket for complete head-to-toe protection.`,
    features: [
      "Integrated foot cover — one continuous piece of mesh, no gap at the ankle",
      "Noseeum-grade mesh — openings < 0.6mm",
      "Elastic waistband — comfortable all-day wear",
      "Weight: < 35g per pair",
      "Machine washable, cold gentle cycle",
      "100% chemical-free",
      "Wear as base layer or standalone",
      "Pairs with Bug Away Jacket for full-body coverage",
    ],
    useCases: ["Hiking in tall grass", "Gardening & weeding", "Dog walking", "Camping & outdoor sleeping", "Fishing", "Foraging"],
    images: [
      "/images/Male _ White mesh _ pants 1_1.jpg",
      "/images/Male _ White mesh _ front angle pants 1_1.jpg",
      "/images/Male _ White mesh _ Pants zoomed out 1_1.jpg",
      "/images/Male _ black mesh _ pants fronts full body 1_1.jpg",
      "/images/Male _ Black mesh _ side front pants 1_1.jpg",
      "/images/Male _ Black mesh _ fish in hand.png",
      "/images/2 males _ Black MEesh _ Fly fishing.png",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-jacket-women",
    name: "Bug Away Jacket — Women",
    category: "WOMEN",
    price: PRICE_SINGLE.eur,
    prices: PRICE_SINGLE,
    badge: "Best Seller",
    colors: COLORS,
    colorHex: COLOR_HEX,
    sizes: ["XS", "S", "M", "L"],
    desc: "Full-coverage mesh jacket for women. Slim tailored fit, drawstring hood and zip closure. Perfect as a base layer for hiking, gardening and outdoor adventures. Chemical-free and breathable.",
    longDesc: `The Bug Away Women's Jacket gives you the same noseeum-grade mesh protection as our men's version, in a slimmer, more tailored silhouette. It's designed to be worn comfortably under your regular outdoor layers — or on its own when it's warm.

The drawstring hood seals around your face to keep mosquitoes and gnats away from your neck and hairline — the most frequently bitten areas. The full zip closure keeps the front protected, and the slim fit means no excess fabric catching on branches or gear.

Made from nylon mesh finer than 0.6mm openings, the jacket physically blocks ticks, mosquitoes, harvest mites and black flies. No chemicals, no sprays, no residue. Just a layer of protection you put on and forget about.

Breathable enough for summer hikes, light enough to pack into a jacket pocket. Pair with the Bug Away Pants for complete coverage from collar to toe.`,
    features: [
      "Slim tailored fit — designed for women's proportions",
      "Noseeum-grade mesh — openings < 0.6mm",
      "Drawstring hood for face and neck coverage",
      "Full-length zip closure",
      "Weight: < 45g",
      "UPF 30+ sun protection",
      "Machine washable",
      "100% chemical-free and insecticide-free",
    ],
    useCases: ["Hiking", "Gardening", "Outdoor yoga & fitness", "Camping", "Dog walking", "Nature photography"],
    images: [
      "/images/Female _ White Mesh _ Front 1_1.jpg",
      "/images/Female _ white mesh _ smiling torso 1_1.jpg",
      "/images/Female _ white mesh _ full backside 1_1.jpg",
      "/images/Female _ White mesh _ hoodie on 1_1.jpg",
      "/images/Female _ black mesh _ Full 1_1.jpg",
      "/images/Female _ black mesh _ front angle 1_1.jpg",
      "/images/Female _ black mesh _ side profile 1_1.jpg",
      "/images/Female _ black mesh _ backside 1_1.jpg",
      "/images/Female _ black mesh _ hoodie on front 1_1.jpg",
      "/images/Female_Black Mesh _ smiling 1_1.jpg",
      "/images/Female _ black mesh _ walking 1_1.jpg",
      "/images/Female _ White mesh _ Forest solo.png",
      "/images/Female _ Black mesh.png",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-pants-women",
    name: "Bug Away Pants — Women",
    category: "WOMEN",
    price: PRICE_SINGLE.eur,
    prices: PRICE_SINGLE,
    badge: null,
    colors: COLORS,
    colorHex: COLOR_HEX,
    sizes: ["XS", "S", "M", "L"],
    desc: "Tick-protection pants for women with integrated foot cover. One continuous piece of mesh from waist to toe — no gap, no entry point. Tailored fit, lightweight and breathable.",
    longDesc: `The Bug Away Women's Pants solve the single biggest weakness in tick protection: the ankle gap. Where most solutions stop — at a sock, a cuff, an elastic band — Bug Away continues. The pant leg flows directly into the foot cover, one uninterrupted piece of noseeum-grade mesh from waist to toe.

No tucking your trousers into your socks. No separate foot covers to keep track of. No weak point for ticks to exploit.

The tailored fit is designed specifically for women's proportions: a clean silhouette that works as a base layer under your regular outdoor trousers or as a lightweight standalone layer on warmer days. The elastic waistband is comfortable for all-day wear, and the mesh breathes freely so you don't overheat.

0.6mm mesh openings. 100% chemical-free. Under 35g per pair. Machine washable.`,
    features: [
      "Integrated foot cover — one continuous mesh piece, no ankle gap",
      "Tailored fit for women's proportions",
      "Noseeum-grade mesh — openings < 0.6mm",
      "Comfortable elastic waistband",
      "Weight: < 35g",
      "Machine washable",
      "100% chemical-free",
    ],
    useCases: ["Hiking & trail walking", "Gardening", "Camping", "Outdoor yoga", "Dog walking in fields", "Countryside travel"],
    images: [
      "/images/Female _ White mesh _ Pants 1_1.jpg",
      "/images/Female _ white mesh _ pants backside 1_1.jpg",
      "/images/Female _ white mesh _ pants smiling 1_1.jpg",
      "/images/Female _ White mesh _ mountain solo.png",
      "/images/Female _ Black mesh.png",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-combo-adults",
    name: "Bug Away Combo Set — Jacket + Pants",
    category: "BUNDLES",
    price: PRICE_SET.eur,
    prices: PRICE_SET,
    badge: "Best Seller",
    colors: COLORS,
    colorHex: COLOR_HEX,
    sizes: ["XS", "S", "M", "L"],
    desc: "Complete tick protection in one set. Bug Away Jacket + Bug Away Pants bundled together — save versus buying separately. Chemical-free, lightweight noseeum-grade mesh with integrated foot cover.",
    longDesc: `The Bug Away Combo Set is the complete solution. Jacket and pants together, matched in color, covering every inch from hood to toe — including the integrated foot cover that closes the ankle gap ticks rely on.

The full set weighs under 80g and packs into its own jacket pocket. You'll barely feel it on. Bugs definitely will.

Both pieces are made from the same noseeum-grade nylon mesh with openings smaller than 0.6mm — a physical barrier that ticks, mosquitoes, harvest mites and black flies simply cannot penetrate. No chemicals, no permethrin, no DEET. Just mesh.

Wear the jacket and pants together for complete 360° coverage, or mix and match with your existing outdoor clothing. Machine washable, breathable, reusable for years.

Buying the set saves you compared to purchasing the items separately.`,
    features: [
      "Complete jacket + pants set — 360° coverage",
      "Integrated foot cover on pants — no ankle gap",
      "Noseeum-grade mesh — < 0.6mm openings throughout",
      "Full set weighs under 80g",
      "Packs into jacket pocket",
      "Save vs buying separately",
      "Machine washable",
      "100% chemical-free",
      "UPF 30+ sun protection",
    ],
    useCases: ["Multi-day hiking trips", "Camping", "Gardening", "Family outdoor adventures", "Travel in tick-endemic regions", "Outdoor work"],
    images: [
      "/images/Male _ White mesh _ front 1_1.jpg",
      "/images/Female _ White Mesh _ Front 1_1.jpg",
      "/images/Male _ Black mesh _ full suit front 1_1.jpg",
      "/images/Female _ black mesh _ Full 1_1.jpg",
      "/images/Couple _ camping.png",
      "/images/Men and female hiking on mountain.png",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-kids-set",
    name: "Bug Away Kids Set",
    category: "KIDS",
    price: PRICE_SET.eur,
    prices: PRICE_SET,
    badge: "Best Seller",
    colors: COLORS,
    colorHex: COLOR_HEX,
    sizes: ["4-6Y", "6-8Y", "8-10Y", "10-12Y"],
    desc: "Complete tick protection for kids. Jacket + pants set designed for safe outdoor play. Safe elastic at the hood (no drawstrings), integrated foot cover and extra pockets for nature treasures.",
    longDesc: `Kids run through tall grass, tumble in leaves, and sit in the dirt — exactly where ticks wait. The Bug Away Kids Set keeps them protected without restricting a single moment of play.

The jacket and pants are made from the same noseeum-grade mesh as our adult range — openings smaller than 0.6mm that physically block ticks, mosquitoes and harvest mites. The hood uses a safe elastic trim instead of drawstrings, designed specifically for children's safety standards.

The pants include the same integrated foot cover as our adult version — one continuous piece of mesh from waistband to toe, no ankle gap, no separate parts to lose. The pockets are deep enough for the frogs, rocks and flowers that always end up in kids' hands on outdoor adventures.

Chemical-free. Machine washable. Gentle on sensitive skin. Safe for kids of all ages.

Lyme disease is not just an adult concern — children are particularly vulnerable due to time spent at ground level where ticks are most active. Bug Away gives parents one less thing to worry about.`,
    features: [
      "Complete jacket + pants set for kids",
      "Safe elastic hood trim — no drawstrings",
      "Integrated foot cover on pants — no ankle gap",
      "Noseeum-grade mesh — openings < 0.6mm",
      "Extra deep pockets for outdoor discoveries",
      "Gentle on sensitive skin",
      "Machine washable",
      "100% chemical-free — safe for children",
      "Available in sizes 4-6Y through 10-12Y",
    ],
    useCases: ["Forest play", "School nature trips", "Camping with family", "Garden play", "Hiking with parents", "Summer camps"],
    images: [
      "/images/Family.png",
      "/images/proof-mosquito.jpg",
      "/images/proof-ticks.jpg",
      "/images/proof-spider.jpg",
      "/images/size-guide-chart.png",
    ],
  },
];

export const reviews = [
  { id: 1, name: "Maaike V.", rating: 5, text: "Finally something that actually keeps ticks away. Wore it hiking all weekend — not a single bite.", product: "ba-jacket-men" },
  { id: 2, name: "James R.", rating: 5, text: "My whole family wears these now. Kids can play in the forest without us constantly checking.", product: "ba-kids-set" },
  { id: 3, name: "Sophie L.", rating: 5, text: "The integrated foot cover is genius. No more tucking trousers into socks.", product: "ba-pants-women" },
  { id: 4, name: "Bart M.", rating: 4, text: "Lightweight, breathable, does exactly what it says. Great for gardening too.", product: "ba-jacket-women" },
  { id: 5, name: "Karen T.", rating: 5, text: "I got Lyme disease two years ago. I won't go outside without this now. Worth every penny.", product: "ba-combo-adults" },
  { id: 6, name: "David H.", rating: 5, text: "Bought the combo set for a hiking trip in the Veluwe. Zero tick checks needed. Incredible.", product: "ba-combo-adults" },
];
