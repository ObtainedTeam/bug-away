const STD = [
  "/images/proof-mosquito.jpg",
  "/images/proof-ticks.jpg",
  "/images/proof-spider.jpg",
  "/images/size-guide-jacket.png",
  "/images/size-guide-fittype.png",
  "/images/size-guide-chart.png",
];

export const products = [
  {
    id: "ba-jacket-men",
    name: "Bug Away Jacket — Men",
    category: "MEN",
    price: 44.99,
    badge: "Best Seller",
    colors: ["Sage Green", "Stone Gray", "Arctic White"],
    colorHex: ["#6B9E7A", "#9E9E8F", "#F5F5F0"],
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
    images: [
      "/images/jacket-men-white-front.jpg",
      "/images/jacket-men-white-side.jpg",
      "/images/jacket-men-white-back.jpg",
      "/images/jacket-flatlay-white.jpg",
      "/images/jacket-men-lifestyle-birdwatching.jpg",
      "/images/jacket-men-lifestyle-forest-walking.jpg",
      "/images/jacket-men-lifestyle-bicycle-forest.jpg",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-pants-men",
    name: "Bug Away Pants — Men",
    category: "MEN",
    price: 44.99,
    badge: "Best Seller",
    colors: ["Sage Green", "Stone Gray", "Arctic White"],
    colorHex: ["#6B9E7A", "#9E9E8F", "#F5F5F0"],
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
      "/images/pants-men-white-front.jpg",
      "/images/pants-men-white-side.jpg",
      "/images/pants-men-white-back.jpg",
      "/images/pants-men-green-front.jpg",
      "/images/pants-detail-feet-grass.jpg",
      "/images/pants-lifestyle-feet-closeup.jpg",
      "/images/jacket-men-lifestyle-forest-walking.jpg",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-jacket-women",
    name: "Bug Away Jacket — Women",
    category: "WOMEN",
    price: 44.99,
    badge: "Best Seller",
    colors: ["Sage Green", "Stone Gray", "Arctic White"],
    colorHex: ["#6B9E7A", "#9E9E8F", "#F5F5F0"],
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
      "/images/jacket-women-white-front.jpg",
      "/images/jacket-women-white-detail.jpg",
      "/images/jacket-women-lifestyle-meadow-sunset.jpg",
      "/images/jacket-women-lifestyle-phone-forest.jpg",
      "/images/jacket-women-lifestyle-gardening.jpg",
      "/images/jacket-women-lifestyle-gardening-closeup.jpg",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-pants-women",
    name: "Bug Away Pants — Women",
    category: "WOMEN",
    price: 44.99,
    badge: null,
    colors: ["Sage Green", "Stone Gray", "Arctic White"],
    colorHex: ["#6B9E7A", "#9E9E8F", "#F5F5F0"],
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
      "/images/pants-women-white-front.jpg",
      "/images/pants-women-white-side.jpg",
      "/images/pants-women-white-back.jpg",
      "/images/pants-women-lifestyle-picnic-lake.jpg",
      "/images/pants-women-lifestyle-stars-field.jpg",
      "/images/pants-detail-feet-grass.jpg",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-combo-adults",
    name: "Bug Away Combo Set — Jacket + Pants",
    category: "BUNDLES",
    price: 78.99,
    badge: "Best Seller",
    colors: ["Sage Green", "Stone Gray", "Arctic White"],
    colorHex: ["#6B9E7A", "#9E9E8F", "#F5F5F0"],
    sizes: ["XS", "S", "M", "L"],
    desc: "Complete tick protection in one set. Bug Away Jacket + Bug Away Pants bundled together — save €11 compared to buying separately. Chemical-free, lightweight noseeum-grade mesh with integrated foot cover.",
    longDesc: `The Bug Away Combo Set is the complete solution. Jacket and pants together, matched in color, covering every inch from hood to toe — including the integrated foot cover that closes the ankle gap ticks rely on.

The full set weighs under 80g and packs into its own jacket pocket. You'll barely feel it on. Bugs definitely will.

Both pieces are made from the same noseeum-grade nylon mesh with openings smaller than 0.6mm — a physical barrier that ticks, mosquitoes, harvest mites and black flies simply cannot penetrate. No chemicals, no permethrin, no DEET. Just mesh.

Wear the jacket and pants together for complete 360° coverage, or mix and match with your existing outdoor clothing. Machine washable, breathable, reusable for years.

Buying the set saves you €11 compared to purchasing separately.`,
    features: [
      "Complete jacket + pants set — 360° coverage",
      "Integrated foot cover on pants — no ankle gap",
      "Noseeum-grade mesh — < 0.6mm openings throughout",
      "Full set weighs under 80g",
      "Packs into jacket pocket",
      "Save €11 vs buying separately",
      "Machine washable",
      "100% chemical-free",
      "UPF 30+ sun protection",
    ],
    useCases: ["Multi-day hiking trips", "Camping", "Gardening", "Family outdoor adventures", "Travel in tick-endemic regions", "Outdoor work"],
    images: [
      "/images/combo-lifestyle-couple-forest-green.jpg",
      "/images/combo-lifestyle-couple-forest-white.jpg",
      "/images/combo-lifestyle-couple-coffee-tent.jpg",
      "/images/combo-lifestyle-group-campfire-green.jpg",
      "/images/combo-lifestyle-woman-picnic-lake.jpg",
      "/images/combo-lifestyle-couple-beach-sunset.jpg",
      "/images/jacket-men-white-front.jpg",
      "/images/pants-men-white-front.jpg",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-kids-set",
    name: "Bug Away Kids Set",
    category: "KIDS",
    price: 78.99,
    badge: "Best Seller",
    colors: ["Sage Green", "Stone Gray", "Arctic White"],
    colorHex: ["#6B9E7A", "#9E9E8F", "#F5F5F0"],
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
      "/images/kids-set-green-flatlay.jpg",
      "/images/kids-lifestyle-forest-playing.jpg",
      "/images/kids-lifestyle-jumping-stream.jpg",
      "/images/detail-collage-green.jpg",
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
