/**
 * build-blog.mjs
 *
 * Haalt BabyLoveGrowth artikelen op en schrijft:
 *   dist/blog/<slug>/index.html   statische artikelpagina, crawlbaar, in huisstijl
 *   dist/blog-articles.json       lijst die src/pages/Blog.jsx uitleest
 *   dist/sitemap.xml              volledige sitemap: pagina's + producten + artikelen
 *   dist/llms.txt                 markdown-kaart van de site voor AI-modellen
 *
 * Draait NA `vite build`.
 *
 * We schrijven bewust GEEN dist/blog/index.html. Die zou de React Blog pagina
 * overschaduwen bij een harde navigatie, en die pagina is beter. De artikelen
 * zelf moeten wel statisch, want daar staat de tekst en dat is wat crawlers
 * lezen. Een overzichtspagina hoeft dat niet, discovery loopt via de sitemap.
 *
 * Env:
 *   BABYLOVE_API_KEY  (verplicht)
 *   SITE_URL          (optioneel, default https://www.bugawaygear.com)
 */

import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { products } from '../src/data.js';

const API_BASE = 'https://api.babylovegrowth.ai/api/integrations/v1';
const API_KEY = process.env.BABYLOVE_API_KEY;
const SITE_URL = (process.env.SITE_URL || 'https://www.bugawaygear.com').replace(/\/$/, '');
const OUT_DIR = path.resolve('dist');
const BLOG_DIR = path.join(OUT_DIR, 'blog');
const TEMPLATE_DIR = path.resolve('blog-template');

/**
 * BLG knijpt hard af. Bij twee artikelen kregen we al een 429 op concurrency 4.
 * Serieel met een pauze ertussen is trager maar levert alle artikelen op, en
 * een artikel dat de retries niet haalt verdwijnt van de site terwijl Google
 * hem al geindexeerd heeft. Dat is erger dan tien seconden extra buildtijd.
 */
const CONCURRENCY = 1;
const REQUEST_SPACING_MS = 350;

const log = (...a) => console.log('[blog]', ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Slugs komen van een externe API. Nooit rechtstreeks in een pad plakken. */
function safeSlug(raw, fallbackId) {
  const s = String(raw || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return s || `article-${fallbackId}`;
}

/**
 * BLG levert geen categorie, alleen keywords en een seedKeyword. De filters op
 * de blogpagina zijn ALL/EDUCATION/HEALTH/OUTDOORS/PETS/FAMILY, dus we leiden
 * hem af. Eerste match wint, vandaar de volgorde: PETS voor HEALTH, want
 * "tick bite on your dog" is een pets-artikel, geen health-artikel.
 */
const CAT_RULES = [
  ['PETS', /\b(dogs?|pets?|cats?|pupp(y|ies)|canine|paws?|kennel|horses?)\b/i],
  ['FAMILY', /\b(kids?|child(ren)?|famil(y|ies)|bab(y|ies)|toddlers?|playground|school)\b/i],
  ['HEALTH', /\b(lyme|diseases?|symptoms?|bites?|rash|infections?|illness|doctor|antibiotic|treatment|diagnos)/i],
  ['OUTDOORS', /\b(hik|camp|trail|forest|woods|garden|yard|fish|hunt|outdoor|backpack|trek|park|lawn)/i],
];

function deriveCategory(a) {
  const hay = [a.title, a.seedKeyword, ...(a.keywords || [])].filter(Boolean).join(' ');
  for (const [cat, re] of CAT_RULES) if (re.test(hay)) return cat;
  return 'EDUCATION';
}

/** BLG geeft geen leestijd. 200 woorden per minuut is de gangbare aanname. */
function readTime(html = '') {
  const words = String(html).replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

async function apiGet(pathname, attempt = 1) {
  const res = await fetch(`${API_BASE}${pathname}`, {
    headers: { 'X-API-Key': API_KEY, 'Content-Type': 'application/json' },
  });

  if (res.status === 429 || res.status >= 500) {
    if (attempt >= 6) throw new Error(`${pathname} gaf ${res.status} na ${attempt} pogingen`);
    const wait = Math.min(2 ** attempt * 400, 10000);
    log(`${res.status} op ${pathname}, retry over ${wait}ms`);
    await sleep(wait);
    return apiGet(pathname, attempt + 1);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${pathname} gaf ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

async function pool(items, size, fn) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await fn(items[idx], idx);
        if (REQUEST_SPACING_MS) await sleep(REQUEST_SPACING_MS);
      }
    })
  );
  return out;
}

/* ------------------------------------------------------------------ */
/* content                                                             */
/* ------------------------------------------------------------------ */

/** content_html kan al JSON-LD bevatten; wij injecteren zelf uit de losse velden. */
const stripEmbeddedJsonLd = (h = '') =>
  h.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');

/** BLG zet een h1 in de body, onze template zet er zelf al een. */
const stripLeadingH1 = (h = '') => h.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/i, '');

function jsonLdBlock(...objects) {
  return objects
    .filter((o) => o && typeof o === 'object' && Object.keys(o).length > 0)
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n');
}

const fillTemplate = (tpl, vars) =>
  tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (Object.prototype.hasOwnProperty.call(vars, k) ? vars[k] : ''));

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ------------------------------------------------------------------ */

async function fetchArticleList() {
  const all = [];
  let offset = 0;
  const limit = 50;
  while (true) {
    const batch = await apiGet(`/articles?limit=${limit}&offset=${offset}`);
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < limit) break;
    offset += limit;
    await sleep(REQUEST_SPACING_MS);
  }
  return all;
}

/* ------------------------------------------------------------------ */
/* sitemap                                                             */
/* ------------------------------------------------------------------ */

/**
 * Er stond geen sitemap.xml in de repo, dus Google had nooit een kaart van de
 * site. Deze dekt alles: vaste pagina's, de 7 productpagina's uit src/data.js
 * en de artikelen.
 *
 * /shop/men en /shop?cat=MEN staan er bewust NIET in. Shop.jsx filtert op
 * lokale state en negeert de route-param, dus die URLs renderen allemaal
 * dezelfde ongefilterde shop. Dat in een sitemap zetten is duplicate content.
 */
const STATIC_PAGES = [
  ['/', '1.0', 'weekly'],
  ['/shop', '0.9', 'weekly'],
  ['/blog', '0.8', 'daily'],
  ['/how-it-works', '0.7', 'monthly'],
  ['/faq', '0.6', 'monthly'],
  ['/about', '0.5', 'monthly'],
  ['/pets', '0.4', 'monthly'],
  ['/accessories', '0.4', 'monthly'],
  ['/privacy', '0.3', 'yearly'],
  ['/returns', '0.3', 'yearly'],
  ['/terms', '0.3', 'yearly'],
];

async function writeSitemap(articles) {
  const today = new Date().toISOString().slice(0, 10);
  const url = (loc, lastmod, freq, pri) =>
    `  <url><loc>${SITE_URL}${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${freq}</changefreq><priority>${pri}</priority></url>`;

  const entries = [
    ...STATIC_PAGES.map(([loc, pri, freq]) => url(loc, today, freq, pri)),
    ...products.map((p) => url(`/product/${p.id}`, today, 'weekly', '0.8')),
    ...articles.map((a) => url(`/blog/${a._slug}`, (a.created_at || today).slice(0, 10), 'monthly', '0.7')),
  ];

  await writeFile(
    path.join(OUT_DIR, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`,
    'utf8'
  );
  log(`sitemap.xml: ${STATIC_PAGES.length} pagina's + ${products.length} producten + ${articles.length} artikelen = ${entries.length} URLs`);
}

/* ------------------------------------------------------------------ */
/* llms.txt                                                            */
/* ------------------------------------------------------------------ */

/**
 * https://llmstxt.org — een markdown-kaart van de site voor AI-modellen.
 *
 * Eerlijk over wat dit doet: de meetbare opbrengst is vandaag ongeveer nul.
 * De AI-crawlers halen dit bestand nauwelijks op, ze lezen gewoon je HTML.
 * Daarom kost dit hier ook niks: het wordt bij elke build meegegenereerd uit
 * data die we toch al hebben, en er is geen onderhoud aan. Blijkt het over een
 * jaar wel te tellen, dan stond hij er al.
 *
 * Sitemap is een kale URL-lijst voor crawlers. Dit is context: wat verkoop je,
 * waarom is het anders, welke pagina gaat waarover.
 */
async function writeLlmsTxt(articles) {
  const clean = (t = '') => String(t).replace(/\s+/g, ' ').trim();
  const usd = (p) => (p?.prices?.usd != null ? `$${p.prices.usd}` : '');

  const productLines = products.map((p) => {
    const price = usd(p);
    const sizes = p.sizes?.length ? ` Sizes ${p.sizes[0]}–${p.sizes[p.sizes.length - 1]}.` : '';
    return `- [${clean(p.name)}](${SITE_URL}/product/${p.id}): ${clean(p.desc)}${
      price ? ` ${price} USD.` : ''
    }${sizes}`;
  });

  const articleLines = articles.map(
    (a) => `- [${clean(a.title)}](${SITE_URL}/blog/${a._slug}): ${clean(a.excerpt || a.meta_description || '')}`
  );

  const body = `# Bug Away

> Chemical-free tick and insect protective clothing for the US and Canada. Bug Away uses no-see-um-grade mesh with openings under 0.6mm, which stops ticks, mosquitoes, black flies and gnats physically rather than with an insecticide.

Most insect-protective clothing is treated with permethrin. That treatment washes out somewhere between the twentieth and the seventieth wash, and the wearer has no way of knowing when the protection is gone. Bug Away takes the other approach: the mesh openings are smaller than the insects, so nothing gets through because nothing fits through. There is no chemical, nothing to reapply, and nothing to wash out. The protection lasts as long as the garment does.

Key facts:
- Mesh openings under 0.6mm, finer than a no-see-um and far finer than a tick
- No permethrin or any other insecticide, which also makes it safe around cats, who cannot metabolise permethrin
- Free shipping on US orders over $150
- Sizes XS through 3XL, plus a kids range
- Best worn loose; fabric pressed flat against skin gives a mosquito something to bite through

## Products

${productLines.join('\n')}

## Guides
${articleLines.length ? '\n' + articleLines.join('\n') : '\n(No articles published yet.)'}

## About

- [How It Works](${SITE_URL}/how-it-works): How no-see-um-grade mesh blocks ticks and mosquitoes without insecticide.
- [Shop](${SITE_URL}/shop): Full catalogue of jackets, pants, combo sets and kids gear.
- [Blog](${SITE_URL}/blog): Tick awareness, insect protection and field-tested gear advice.
- [FAQ](${SITE_URL}/faq): Sizing, care, shipping and returns.
- [About](${SITE_URL}/about): Who Bug Away is and why the brand is insecticide-free.

## Optional

- [Pets](${SITE_URL}/pets): Tick protection for dogs.
- [Accessories](${SITE_URL}/accessories): Head, neck, hand and ankle coverage.
- [Returns](${SITE_URL}/returns)
- [Privacy](${SITE_URL}/privacy)
- [Terms](${SITE_URL}/terms)
`;

  await writeFile(path.join(OUT_DIR, 'llms.txt'), body, 'utf8');
  log(`llms.txt: ${products.length} producten + ${articles.length} artikelen`);
}

async function main() {
  if (!API_KEY) {
    log('BABYLOVE_API_KEY ontbreekt, blog wordt overgeslagen.');
    return;
  }
  if (!existsSync(OUT_DIR)) throw new Error('dist/ bestaat niet. Draai dit na `vite build`.');

  const articleTpl = await readFile(path.join(TEMPLATE_DIR, 'article.html'), 'utf8');

  log('artikellijst ophalen...');
  const summaries = await fetchArticleList();
  log(`${summaries.length} artikelen gevonden`);
  if (summaries.length === 0) {
    await writeFile(path.join(OUT_DIR, 'blog-articles.json'), '[]', 'utf8');
    await writeSitemap([]);
    await writeLlmsTxt([]);
    return;
  }

  log('volledige content ophalen...');
  const fetched = await pool(summaries, CONCURRENCY, async (s) => {
    try {
      return { ...s, ...(await apiGet(`/articles/${s.id}`)) };
    } catch (err) {
      log(`LET OP artikel ${s.id} ("${s.slug}") overgeslagen: ${err.message}`);
      return null;
    }
  });

  const seen = new Set();
  const articles = fetched
    .filter((a) => a && a.content_html && a.title)
    .map((a) => ({ ...a, _slug: safeSlug(a.slug, a.id) }))
    .filter((a) => {
      if (seen.has(a._slug)) {
        log(`dubbele slug "${a._slug}", artikel ${a.id} overgeslagen`);
        return false;
      }
      seen.add(a._slug);
      return true;
    });

  const dropped = summaries.length - articles.length;
  if (dropped > 0) log(`LET OP ${dropped} van de ${summaries.length} artikelen niet gebouwd`);

  await mkdir(BLOG_DIR, { recursive: true });

  const cssSrc = path.join(TEMPLATE_DIR, 'blog.css');
  if (existsSync(cssSrc)) await copyFile(cssSrc, path.join(BLOG_DIR, 'blog.css'));

  /* --- artikelpagina's --- */
  const manifest = [];

  for (const a of articles) {
    const url = `${SITE_URL}/blog/${a._slug}`;
    const body = stripLeadingH1(stripEmbeddedJsonLd(a.content_html));
    const cat = deriveCategory(a);
    const rt = readTime(a.content_html);

    const html = fillTemplate(articleTpl, {
      LANG: escapeHtml(a.languageCode || 'en'),
      TITLE: escapeHtml(a.title),
      META_DESCRIPTION: escapeHtml(a.meta_description || a.excerpt || ''),
      CANONICAL: escapeHtml(url),
      OG_IMAGE: escapeHtml(a.hero_image_url || ''),
      JSON_LD: jsonLdBlock(a.jsonLd, a.faqJsonLd),
      CATEGORY: escapeHtml(cat),
      HEADING: escapeHtml(a.title),
      DATE_ISO: escapeHtml(a.created_at || ''),
      DATE_HUMAN: escapeHtml(formatDate(a.created_at)),
      READ_TIME: escapeHtml(rt),
      HERO: a.hero_image_url
        ? `<img class="post-hero" src="${escapeHtml(a.hero_image_url)}" alt="${escapeHtml(a.title)}" width="1200" height="630" fetchpriority="high">`
        : '',
      CONTENT: body,
    });

    const dir = path.join(BLOG_DIR, a._slug);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), html, 'utf8');

    manifest.push({
      id: a.id,
      slug: a._slug,
      cat,
      title: a.title,
      excerpt: a.excerpt || a.meta_description || '',
      img: a.hero_image_url || null,
      readTime: rt,
      date: a.created_at || null,
    });
  }
  log(`${articles.length} artikelpagina's geschreven`);

  /* --- manifest voor de React blogpagina --- */
  await writeFile(path.join(OUT_DIR, 'blog-articles.json'), JSON.stringify(manifest), 'utf8');
  log(`blog-articles.json geschreven (${manifest.length})`);

  await writeSitemap(articles);
  await writeLlmsTxt(articles);

  log('klaar.');
}

main().catch((err) => {
  console.error('[blog] FOUT:', err);
  process.exit(1);
});
