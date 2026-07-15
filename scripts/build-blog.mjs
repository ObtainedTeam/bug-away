/**
 * build-blog.mjs
 *
 * Haalt alle gepubliceerde BabyLoveGrowth artikelen op en schrijft ze weg als
 * statische, crawlbare HTML in dist/blog/. Draait NA `vite build`.
 *
 * Waarom statisch en niet client-side: een Vite SPA levert lege HTML aan de
 * crawler. Googlebot rendert soms JS, de AI-crawlers (ChatGPT, Perplexity,
 * Claude) doen dat niet betrouwbaar. Deze pagina's bevatten de volledige tekst
 * in de eerste HTML-response, zonder JS.
 *
 * Env:
 *   BABYLOVE_API_KEY  (verplicht)  API key uit BLG Settings > Integrations > API
 *   SITE_URL          (optioneel)  default https://bugawaygear.com
 *
 * Gebruik:
 *   node scripts/build-blog.mjs
 */

import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const API_BASE = 'https://api.babylovegrowth.ai/api/integrations/v1';
const API_KEY = process.env.BABYLOVE_API_KEY;
const SITE_URL = (process.env.SITE_URL || 'https://bugawaygear.com').replace(/\/$/, '');
const OUT_DIR = path.resolve('dist');
const BLOG_DIR = path.join(OUT_DIR, 'blog');
const TEMPLATE_DIR = path.resolve('blog-template');

const CONCURRENCY = 4;

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const log = (...a) => console.log('[blog]', ...a);

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Slugs komen van een externe API. Nooit rechtstreeks in een pad plakken,
 * anders is ../../ een geldige "slug".
 */
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

async function apiGet(pathname, attempt = 1) {
  const res = await fetch(`${API_BASE}${pathname}`, {
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 429 || res.status >= 500) {
    if (attempt >= 5) throw new Error(`${pathname} gaf ${res.status} na ${attempt} pogingen`);
    const wait = Math.min(2 ** attempt * 500, 8000);
    log(`${res.status} op ${pathname}, retry over ${wait}ms`);
    await new Promise((r) => setTimeout(r, wait));
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
  const workers = Array.from({ length: Math.min(size, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return out;
}

/* ------------------------------------------------------------------ */
/* fetch                                                               */
/* ------------------------------------------------------------------ */

async function fetchArticleList() {
  const all = [];
  let offset = 0;
  const limit = 50; // API max

  while (true) {
    const batch = await apiGet(`/articles?limit=${limit}&offset=${offset}`);
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < limit) break;
    offset += limit;
  }

  return all;
}

/* ------------------------------------------------------------------ */
/* content processing                                                  */
/* ------------------------------------------------------------------ */

/**
 * De docs zeggen dat content_html al JSON-LD script tags kan bevatten. We
 * strippen die en injecteren de schema's zelf uit de jsonLd/faqJsonLd velden,
 * anders staat dezelfde schema twee keer op de pagina.
 */
function stripEmbeddedJsonLd(html = '') {
  return html.replace(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
    ''
  );
}

/**
 * BLG levert soms een <h1> in content_html mee. Onze template zet zelf al een
 * h1 neer, dus die eerste h1 halen we eruit om dubbele h1's te voorkomen.
 */
function stripLeadingH1(html = '') {
  return html.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/i, '');
}

function jsonLdBlock(...objects) {
  return objects
    .filter((o) => o && typeof o === 'object' && Object.keys(o).length > 0)
    .map(
      (o) =>
        `<script type="application/ld+json">${JSON.stringify(o).replace(
          /</g,
          '\\u003c'
        )}</script>`
    )
    .join('\n');
}

function fillTemplate(tpl, vars) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : ''
  );
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ------------------------------------------------------------------ */
/* main                                                                */
/* ------------------------------------------------------------------ */

async function main() {
  if (!API_KEY) {
    // Belangrijk: NIET de build laten falen. Een preview deploy zonder key
    // moet nog steeds de rest van de site kunnen bouwen.
    log('BABYLOVE_API_KEY ontbreekt, blog wordt overgeslagen.');
    return;
  }

  if (!existsSync(OUT_DIR)) {
    throw new Error('dist/ bestaat niet. Draai dit script na `vite build`.');
  }

  const [articleTpl, indexTpl, header, footer] = await Promise.all([
    readFile(path.join(TEMPLATE_DIR, 'article.html'), 'utf8'),
    readFile(path.join(TEMPLATE_DIR, 'index.html'), 'utf8'),
    readFile(path.join(TEMPLATE_DIR, 'partials/header.html'), 'utf8').catch(() => ''),
    readFile(path.join(TEMPLATE_DIR, 'partials/footer.html'), 'utf8').catch(() => ''),
  ]);

  log('artikellijst ophalen...');
  const summaries = await fetchArticleList();
  log(`${summaries.length} artikelen gevonden`);

  if (summaries.length === 0) {
    log('geen artikelen, klaar.');
    return;
  }

  log('volledige content ophalen...');
  const articles = await pool(summaries, CONCURRENCY, async (s) => {
    try {
      const full = await apiGet(`/articles/${s.id}`);
      return { ...s, ...full };
    } catch (err) {
      log(`artikel ${s.id} overgeslagen: ${err.message}`);
      return null;
    }
  });

  const valid = articles
    .filter(Boolean)
    .filter((a) => a.content_html && a.title)
    .map((a) => ({ ...a, _slug: safeSlug(a.slug, a.id) }));

  // Dubbele slugs zijn mogelijk. Eerste wint (nieuwste eerst uit de API).
  const seen = new Set();
  const unique = valid.filter((a) => {
    if (seen.has(a._slug)) {
      log(`dubbele slug "${a._slug}", artikel ${a.id} overgeslagen`);
      return false;
    }
    seen.add(a._slug);
    return true;
  });

  await mkdir(BLOG_DIR, { recursive: true });

  // blog.css meekopiëren naar dist
  const cssSrc = path.join(TEMPLATE_DIR, 'blog.css');
  if (existsSync(cssSrc)) {
    await copyFile(cssSrc, path.join(BLOG_DIR, 'blog.css'));
  }

  /* --- artikelpagina's --- */
  for (const a of unique) {
    const url = `${SITE_URL}/blog/${a._slug}`;
    const body = stripLeadingH1(stripEmbeddedJsonLd(a.content_html));

    const hero = a.hero_image_url
      ? `<img class="post-hero" src="${escapeHtml(a.hero_image_url)}" alt="${escapeHtml(
          a.title
        )}" width="1200" height="630" fetchpriority="high">`
      : '';

    const html = fillTemplate(articleTpl, {
      LANG: escapeHtml(a.languageCode || 'en'),
      TITLE: escapeHtml(a.title),
      META_DESCRIPTION: escapeHtml(a.meta_description || a.excerpt || ''),
      CANONICAL: escapeHtml(url),
      OG_IMAGE: escapeHtml(a.hero_image_url || ''),
      SITE_URL: escapeHtml(SITE_URL),
      JSON_LD: jsonLdBlock(a.jsonLd, a.faqJsonLd),
      HEADER: header,
      FOOTER: footer,
      HERO: hero,
      HEADING: escapeHtml(a.title),
      DATE_ISO: escapeHtml(a.created_at || ''),
      DATE_HUMAN: escapeHtml(formatDate(a.created_at)),
      CONTENT: body,
    });

    const dir = path.join(BLOG_DIR, a._slug);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), html, 'utf8');
  }
  log(`${unique.length} artikelpagina's geschreven`);

  /* --- indexpagina --- */
  const cards = unique
    .map((a) => {
      const img = a.hero_image_url
        ? `<img class="card-img" src="${escapeHtml(a.hero_image_url)}" alt="" loading="lazy" width="600" height="315">`
        : '';
      return `<li class="card">
  <a class="card-link" href="/blog/${a._slug}">
    ${img}
    <div class="card-body">
      ${a.created_at ? `<time class="card-date" datetime="${escapeHtml(a.created_at)}">${escapeHtml(formatDate(a.created_at))}</time>` : ''}
      <h2 class="card-title">${escapeHtml(a.title)}</h2>
      <p class="card-excerpt">${escapeHtml(a.excerpt || a.meta_description || '')}</p>
    </div>
  </a>
</li>`;
    })
    .join('\n');

  const blogListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Bug Away Blog',
    url: `${SITE_URL}/blog`,
    blogPost: unique.slice(0, 20).map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      url: `${SITE_URL}/blog/${a._slug}`,
      datePublished: a.created_at,
      image: a.hero_image_url || undefined,
    })),
  };

  await writeFile(
    path.join(BLOG_DIR, 'index.html'),
    fillTemplate(indexTpl, {
      SITE_URL: escapeHtml(SITE_URL),
      CANONICAL: escapeHtml(`${SITE_URL}/blog`),
      JSON_LD: jsonLdBlock(blogListJsonLd),
      HEADER: header,
      FOOTER: footer,
      CARDS: cards,
      COUNT: String(unique.length),
    }),
    'utf8'
  );
  log('blog/index.html geschreven');

  /* --- sitemap --- */
  const urls = [
    `  <url><loc>${SITE_URL}/blog</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`,
    ...unique.map((a) => {
      const lastmod = a.created_at ? a.created_at.slice(0, 10) : '';
      return `  <url><loc>${SITE_URL}/blog/${a._slug}</loc>${
        lastmod ? `<lastmod>${lastmod}</lastmod>` : ''
      }<changefreq>monthly</changefreq><priority>0.7</priority></url>`;
    }),
  ].join('\n');

  await writeFile(
    path.join(OUT_DIR, 'blog-sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    'utf8'
  );
  log('blog-sitemap.xml geschreven');

  log('klaar.');
}

main().catch((err) => {
  console.error('[blog] FOUT:', err);
  process.exit(1);
});
