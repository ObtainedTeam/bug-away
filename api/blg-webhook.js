/**
 * api/blg-webhook.js
 *
 * Ontvangt de BabyLoveGrowth webhook en triggert een Vercel rebuild.
 * Bij die rebuild draait scripts/build-blog.mjs en haalt het nieuwe artikel op.
 *
 * We slaan de payload bewust niet op. De build haalt alles opnieuw op via de
 * API, dus de webhook hoeft alleen "er is iets nieuws" te zeggen. Dat scheelt
 * een database en het houdt de API de enige bron van waarheid.
 *
 * BLG verwacht een 200 binnen 5 seconden, anders retryen ze. Een deploy hook
 * afvuren duurt ~200ms, dus dat haalt het ruim.
 *
 * Env:
 *   BLG_WEBHOOK_SECRET       bearer token, zelfde waarde als in BLG ingevuld
 *   VERCEL_DEPLOY_HOOK_URL   deploy hook uit Vercel > Settings > Git
 */

import crypto from 'node:crypto';

function timingSafeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.BLG_WEBHOOK_SECRET;
  const deployHook = process.env.VERCEL_DEPLOY_HOOK_URL;

  if (!secret || !deployHook) {
    console.error('[blg-webhook] env vars ontbreken');
    return res.status(500).json({ error: 'Not configured' });
  }

  const auth = req.headers.authorization || '';
  if (!timingSafeEqual(auth, `Bearer ${secret}`)) {
    console.warn('[blg-webhook] ongeldige token');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const article = req.body || {};
  console.log('[blg-webhook] ontvangen:', {
    id: article.id,
    slug: article.slug,
    title: article.title,
  });

  try {
    const hookRes = await fetch(deployHook, { method: 'POST' });

    if (!hookRes.ok) {
      // Wel 200 terug naar BLG. Als we hier 500 sturen blijven ze retryen en
      // krijgen we een reeks builds voor hetzelfde artikel. Het artikel staat
      // toch in hun API, dus de eerstvolgende build pakt het alsnog op.
      console.error('[blg-webhook] deploy hook faalde:', hookRes.status);
      return res.status(200).json({ received: true, deploy: 'failed' });
    }

    const body = await hookRes.json().catch(() => ({}));
    console.log('[blg-webhook] build getriggerd:', body?.job?.id || 'ok');

    return res.status(200).json({ received: true, deploy: 'triggered' });
  } catch (err) {
    console.error('[blg-webhook] fout:', err.message);
    return res.status(200).json({ received: true, deploy: 'error' });
  }
}
