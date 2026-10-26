"""Maakt webp-versies van alle foto's in public/images voor de site.

De data blijft naar de originele bestandsnamen wijzen (public/images/...),
de site toont automatisch de webp uit public/img/ via pic() in src/img.js.
Per foto: <slug>.webp (max 1600 breed) plus -480 en -960 voor srcset.

Opnieuw draaien na het toevoegen of vervangen van een foto:
    python3 scripts/gen-images.py
Bestaande webp's worden overgeslagen tenzij het origineel nieuwer is.
"""
import json, pathlib, re, unicodedata
from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'public' / 'images'
OUT = ROOT / 'public' / 'img'
OUT.mkdir(exist_ok=True)
MAXW, WIDTHS = 1600, (480, 960)

def slug(name):
    s = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode().lower()
    s = re.sub(r'\.(png|jpe?g|webp)$', '', s)
    s = re.sub(r'\.(png|jpe?g)$', '', s)
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

table, used = {}, set()
for f in sorted(SRC.iterdir()):
    if f.suffix.lower() not in ('.png', '.jpg', '.jpeg', '.webp'):
        continue
    s = slug(f.name)
    while s in used:
        s += '-2'
    used.add(s)
    im = ImageOps.exif_transpose(Image.open(f))
    alpha = im.mode in ('RGBA', 'LA', 'P') and im.convert('RGBA').getextrema()[3][0] < 255
    im = im.convert('RGBA' if alpha else 'RGB')
    w = min(im.width, MAXW)
    h = round(im.height * w / im.width)
    main = OUT / f'{s}.webp'
    if not main.exists() or main.stat().st_mtime < f.stat().st_mtime:
        im.resize((w, h), Image.LANCZOS).save(main, 'WEBP', quality=80, method=6)
    sizes = [x for x in WIDTHS if x < w]
    for x in sizes:
        o = OUT / f'{s}-{x}.webp'
        if not o.exists() or o.stat().st_mtime < f.stat().st_mtime:
            im.resize((x, round(im.height * x / im.width)), Image.LANCZOS).save(o, 'WEBP', quality=78, method=6)
    table[f'/images/{f.name}'] = [s, w, h, sizes]

(ROOT / 'src' / 'data' / 'images.js').write_text(
    '// Gegenereerd door scripts/gen-images.py. Niet met de hand bewerken.\n'
    '// origineel pad -> [webp-slug, breedte, hoogte, beschikbare kleinere breedtes]\n'
    f'export const IMAGES = {json.dumps(table, indent=0, ensure_ascii=False)};\n')
print(len(table), 'foto\'s')
