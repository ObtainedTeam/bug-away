/**
 * activities.js
 *
 * De inhoud van /gardening, /hiking, /fishing en /families.
 * Losgekoppeld van de rendering: Activity.jsx tekent dit uit, hier staat wat er
 * in staat. Nieuwe activiteit toevoegen betekent hier een blok bijzetten, de
 * route in App.jsx en het label in Nav.jsx. Sitemap en llms.txt lezen dit
 * bestand uit tijdens de build, dus die lopen vanzelf mee.
 *
 * Alle foto's komen uit /public/images en worden elders op de site al gebruikt.
 */

export const activities = [
  /* ------------------------------------------------------------------ */
  {
    slug: "gardening",
    nav: "Gardening",
    label: "FOR GARDENERS",
    h1: "Tick protection for gardening",
    lede: "Your own garden is tick habitat. The hedge, the long grass at the fence, the leaf litter under the shrubs. You do not have to travel to tick country when you are standing in it.",
    metaTitle: "Tick Protection for Gardening | Chemical-Free Garden Clothing",
    metaDescription:
      "Ticks live in your hedge, your lawn edge and your leaf litter. Bug Away mesh stops them without spraying insecticide near your soil, your food or your pets.",
    hero: "/images/jacket-women-lifestyle-gardening.jpg",
    heroAlt: "Woman gardening in Bug Away mesh jacket",

    stat: { value: "75%", label: "of tick bites happen within 500 metres of home" },

    problems: [
      {
        title: "The garden is the most under-estimated tick habitat there is",
        body: "People think of ticks as a forest problem. They are not. Ticks sit in the transition zones: the edge where the lawn meets the hedge, the shady strip along the fence, the pile of leaves you have been meaning to clear. That is exactly where you kneel, weed and prune.",
      },
      {
        title: "Gardening is the worst possible posture for tick exposure",
        body: "You are down at their level, kneeling in the leaf litter, reaching into shrubs with bare forearms, brushing against grass with your ankles. A tick does not jump. It waits with its front legs out and grabs whatever passes. Gardening hands it everything.",
      },
      {
        title: "You do not want insecticide in a garden",
        body: "Permethrin is the standard answer, and it is the wrong one here. It is toxic to bees and lethal to cats, who cannot metabolise it. Spraying it on your clothes while you tend the vegetable beds and the pollinator border is working against yourself.",
      },
    ],

    solutions: [
      {
        title: "A barrier, not a chemical",
        body: "The mesh openings are under 0.6mm, smaller than a no-see-um and far smaller than a tick. Nothing gets through because nothing fits through. There is nothing to spray, nothing near your soil and nothing that harms the bees you are trying to attract.",
      },
      {
        title: "The ankle is closed",
        body: "The pants are one continuous piece of mesh from waist to foot. No cuff, no gap, nothing to tuck into your socks. That matters more in a garden than anywhere else, because the ankle is where a tick that has been waiting in the lawn edge finds you.",
      },
      {
        title: "Breathable enough to actually wear",
        body: "It is mesh. Air moves through it. That is the whole point: you can wear it over a t-shirt on a warm afternoon of weeding without cooking, which is why it stays on instead of ending up on the bench.",
      },
    ],

    tips: [
      "Keep the mesh loose. Pressed flat against skin gives a mosquito something to bite through.",
      "Do the ankles and the waistband first when you check. That is where garden ticks land.",
      "Clear leaf litter and keep the lawn edge short. Fewer ticks beats better protection.",
      "Shower within two hours of coming in. It washes off anything that has not attached yet.",
    ],

    productIds: ["ba-jacket-women", "ba-pants-women", "ba-combo-women", "ba-combo-men"],
    gallery: [
      { src: "/images/jacket-women-lifestyle-gardening-closeup.jpg", alt: "Close-up of Bug Away mesh while gardening" },
      { src: "/images/pants-detail-feet-grass.jpg", alt: "Bug Away pants with integrated foot cover in grass" },
      { src: "/images/proof-ticks.jpg", alt: "Tick unable to pass through no-see-um-grade mesh" },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "hiking",
    nav: "Hiking",
    label: "FOR HIKERS",
    h1: "Tick protection for hiking",
    lede: "The trail is narrow, the grass leans in, and every step brushes something. Six hours in, you are not thinking about ticks any more. That is exactly the problem.",
    metaTitle: "Tick Protection for Hiking | Breathable Chemical-Free Hiking Gear",
    metaDescription:
      "Ticks wait at trail edge height and grab what passes. Bug Away mesh blocks them physically, breathes on the climb, and never washes out.",
    hero: "/images/2 guys  _ white and black mesh_ hiking.png",
    heroAlt: "Two hikers on a forest trail in Bug Away mesh",

    stat: { value: "0.6mm", label: "mesh openings, finer than a no-see-um" },

    problems: [
      {
        title: "The trail edge is where ticks wait",
        body: "Ticks climb to roughly knee height on grass and low vegetation, extend their front legs and hold. It is called questing. They cannot jump and they cannot fly. They just wait for something to brush past, and a single-track trail through summer growth guarantees you will.",
      },
      {
        title: "A long day is a long exposure",
        body: "A short walk is a small risk. Six hours of continuous contact with trail-side vegetation is not. And by hour four you have stopped scanning your legs, because you are watching your footing and your water.",
      },
      {
        title: "Spray fails exactly when you need it",
        body: "Permethrin-treated clothing wears out somewhere between 20 and 70 washes, and there is no indicator. Your favourite hiking trousers from three seasons ago are almost certainly untreated by now. You would not know until it mattered.",
      },
    ],

    solutions: [
      {
        title: "Protection that does not degrade",
        body: "There is no treatment to wear off. The mesh gauge is the protection, and a weave does not expire. The jacket you buy this year works identically in five years, wash count irrelevant.",
      },
      {
        title: "It breathes on the climb",
        body: "This is mesh, not a membrane. Under 45 grams for the jacket, and air passes straight through. You wear it as a layer over a t-shirt on the ascent instead of stripping it off at the first switchback.",
      },
      {
        title: "No gap at the boot",
        body: "The pant leg and foot cover are one piece. Nothing to tuck, nothing to ride up over the sock during a long descent, no opening at the exact height where questing ticks are waiting.",
      },
    ],

    tips: [
      "Walk in the centre of the trail. Most bites come from brushing the edge.",
      "Check behind the knees, the waistband and the hairline afterwards. Ticks move to warm, thin skin.",
      "Light colours make a tick easier to spot during a check. It does not stop anything, but it helps.",
      "A tick usually needs many hours attached to transmit anything. Finding it the same day matters.",
    ],

    productIds: ["ba-jacket-men", "ba-pants-men", "ba-combo-men", "ba-combo-women"],
    gallery: [
      { src: "/images/Men and female hiking on mountain.png", alt: "Hikers on a mountain trail in Bug Away mesh" },
      { src: "/images/Female _ White mesh _ Forest solo.png", alt: "Hiker in white Bug Away mesh in forest" },
      { src: "/images/detail-zipper.jpg", alt: "Close-up of Bug Away jacket zip and mesh" },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "fishing",
    nav: "Fishing",
    label: "FOR ANGLERS",
    h1: "Insect protection for fishing",
    lede: "Standing still in wet ground at dusk is the single best way to get eaten alive. Everything that bites lives where the fish are.",
    metaTitle: "Insect Protection for Fishing | Chemical-Free Mesh for Anglers",
    metaDescription:
      "Mosquitoes, black flies and no-see-ums own the waterline at dusk. Bug Away mesh blocks them without DEET on your hands, your line or your flies.",
    hero: "/images/2 males _ Black MEesh _ Fly fishing.png",
    heroAlt: "Two anglers fly fishing in Bug Away black mesh",

    stat: { value: "0", label: "drops of DEET anywhere near your hands or your line" },

    problems: [
      {
        title: "You are standing still where they breed",
        body: "Mosquitoes and black flies breed in and around water. Fishing puts you in their nursery, at the hour they are most active, doing the one thing that makes you an easy target: not moving. A hiker passes through. An angler stays.",
      },
      {
        title: "DEET and fishing do not mix",
        body: "DEET is a solvent. It melts monofilament, softens fly line coatings and damages varnish on rod blanks and reel seats. Every angler who has sprayed their hands and then handled tackle has learned this the expensive way.",
      },
      {
        title: "The bugs go for what you cannot cover",
        body: "Your hands are working. Your face is watching the drift. Your neck is exposed while you look down at the water. Black flies and no-see-ums find exactly those places, and a no-see-um walks straight through standard mosquito netting.",
      },
    ],

    solutions: [
      {
        title: "Nothing on your hands, nothing on your gear",
        body: "There is no repellent, so there is nothing to transfer to your line, your leader or your flies. You handle tackle with clean hands and your mono lasts the season it is supposed to.",
      },
      {
        title: "Fine enough for no-see-ums",
        body: "This is not standard mosquito netting. The openings are under 0.6mm, which is what no-see-um-grade means. Black flies and biting midges cannot pass through, and those are the ones that ruin an evening on the water.",
      },
      {
        title: "Hood up, face covered, hands free",
        body: "The drawstring hood gives full face coverage while you are watching the drift, and the mesh does not fog, catch light or block your view of the water the way a head net over a cap does.",
      },
    ],

    tips: [
      "Dusk and dawn are peak biting hours and peak feeding hours. That overlap is not a coincidence.",
      "Wear it loose. Fabric pressed flat against your forearm is fabric a mosquito can reach through.",
      "Black mesh reflects less light on the water than white.",
      "Still air near the bank is worse than a breeze. Fish the windward side when you can.",
    ],

    productIds: ["ba-jacket-men", "ba-pants-men", "ba-combo-men", "ba-jacket-women"],
    gallery: [
      { src: "/images/Male _ Black mesh _ fish in hand.png", alt: "Angler holding a fish, wearing Bug Away mesh" },
      { src: "/images/MAle _ Black Mesh _ Fly fishing.png", alt: "Fly fisherman in Bug Away black mesh" },
      { src: "/images/proof-mosquito.jpg", alt: "Mosquito unable to pass through Bug Away mesh" },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "families",
    nav: "Families",
    label: "FOR FAMILIES",
    h1: "Tick protection for kids and families",
    lede: "Kids are lower to the ground, deeper in the grass, and worse at standing still for a tick check than anyone. They are also the ones you least want to spray.",
    metaTitle: "Tick Protection for Kids & Families | Chemical-Free Outdoor Clothing",
    metaDescription:
      "Kids play at tick height and cannot check themselves. Bug Away mesh protects them physically, with no insecticide on a child's skin or clothing.",
    hero: "/images/Family .png",
    heroAlt: "Family outdoors in Bug Away mesh clothing",

    stat: { value: "2", label: "hours: shower within that window and unattached ticks wash off" },

    problems: [
      {
        title: "Kids play at exactly tick height",
        body: "Ticks quest at roughly knee height on an adult. On a six-year-old that is chest height. Children crawl through undergrowth, sit down in long grass and push into hedges because that is where the good stuff is. Everything about how a child plays maximises contact.",
      },
      {
        title: "A tick check on a child is a negotiation",
        body: "The check has to be thorough: behind the ears, the hairline, the neck, behind the knees, the waistband. It has to happen after every single outing. Anyone who has tried this with a tired seven-year-old knows how reliably it gets done.",
      },
      {
        title: "You do not want to spray a child",
        body: "The standard advice is permethrin on clothing and DEET on skin. Most parents are not comfortable doing that daily on a small body all summer, and if you have a cat at home, permethrin is not a debate: they cannot metabolise it at all.",
      },
    ],

    solutions: [
      {
        title: "Nothing on their skin",
        body: "The protection is the weave. There is no insecticide, no repellent, nothing absorbed and nothing to reapply before they go out. You put the suit on and that is the whole procedure.",
      },
      {
        title: "Built for how kids actually are",
        body: "The kids set uses safe elastic at the hood instead of a drawstring, the foot cover is integrated so there is nothing to tuck, and there are deep pockets, because everything interesting found in a forest is coming home with you.",
      },
      {
        title: "The check gets much shorter",
        body: "Covered skin is skin you are not searching. The check becomes the gaps and the hairline instead of a full inspection, and a check that takes ninety seconds is a check that actually happens every time.",
      },
    ],

    tips: [
      "Make it the outdoor uniform, not a decision. It stops being a fight in about a week.",
      "Still check the hairline, behind the ears and the neck. That is where a tick heads on a child.",
      "Shower within two hours of coming in. Anything unattached washes straight off.",
      "If you have a cat, permethrin-treated clothing in the house is a genuine risk. This is not.",
    ],

    productIds: ["ba-kids-set", "ba-combo-women", "ba-combo-men", "ba-jacket-men"],
    gallery: [
      { src: "/images/kids-lifestyle-forest-playing.jpg", alt: "Children playing in a forest in Bug Away kids sets" },
      { src: "/images/kids-lifestyle-jumping-stream.jpg", alt: "Kids jumping a stream in Bug Away mesh" },
      { src: "/images/combo-lifestyle-group-campfire-green.jpg", alt: "Family around a campfire in Bug Away mesh" },
    ],
  },
];

export const getActivity = (slug) => activities.find((a) => a.slug === slug);
