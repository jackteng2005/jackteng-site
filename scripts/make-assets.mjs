/**
 * Generates the favicons and the Open Graph card from the JT brand mark.
 *
 * Run with `npm run assets`. Re-run whenever brand/jack-teng-jt-logo.png
 * changes — the outputs in public/ are generated, not hand-made.
 *
 * sharp comes in with Astro (it backs astro:assets), so there is no extra
 * dependency to install.
 */
import sharp from 'sharp';
import path from 'node:path';

const SRC = 'brand/jack-teng-jt-logo.png';
const OUT = 'public';

// Brand tokens, matching src/styles/global.css
const NAVY = '#0e1730';
const TEAL = '#17a9a5';

// The mark is a flat PNG with its own off-white baked in, and it is not quite
// the site's --bg. Compositing it onto --bg left a visible lighter rectangle
// behind the logo, so sample the source's actual background and build the
// canvas from that instead. Seamless, and no alpha-keying needed.
const corner = await sharp(SRC)
  .extract({ left: 0, top: 0, width: 1, height: 1 })
  .raw()
  .toBuffer();
const BG = `#${[...corner.subarray(0, 3)]
  .map((v) => v.toString(16).padStart(2, '0'))
  .join('')}`;
console.log(`sampled mark background: ${BG}`);

// The source has a wide uniform margin. Trim to the mark's real bounds so it
// can be positioned deliberately instead of inheriting that padding.
const trimmed = await sharp(SRC).trim({ threshold: 6 }).png().toBuffer();
const tm = await sharp(trimmed).metadata();
console.log(`source trimmed to ${tm.width}x${tm.height}`);

// ---------- Open Graph card, 1200x630 ----------
const W = 1200;
const H = 630;
const BAR = 14;
const markH = 300;
const markW = Math.round((tm.width / tm.height) * markH);

// Shapes only, no text: librsvg would fall back to a system font for any
// text, which would be off-brand — and a link preview already renders the
// page title and description as real text beside the image.
const backdrop = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="2" fill="${NAVY}" opacity="0.07"/>
      </pattern>
    </defs>
    <rect width="${W}" height="${H}" fill="${BG}"/>
    <rect width="${W}" height="${H}" fill="url(#dots)"/>
    <rect x="0" y="${H - BAR}" width="${W}" height="${BAR}" fill="${TEAL}"/>
  </svg>`);

const markForOg = await sharp(trimmed)
  .resize({ width: markW, height: markH, fit: 'contain', background: BG })
  .toBuffer();

await sharp(backdrop)
  .composite([
    {
      input: markForOg,
      left: Math.round((W - markW) / 2),
      top: Math.round((H - BAR - markH) / 2),
    },
  ])
  .png({ compressionLevel: 9, palette: true })
  .toFile(path.join(OUT, 'og.png'));

const og = await sharp(path.join(OUT, 'og.png')).metadata();
console.log(`wrote og.png (${og.width}x${og.height})`);

// ---------- Favicons ----------
// Pad the trimmed mark back to a square with a small even margin, so it fills
// the tab icon rather than floating inside the source's wide border.
const side = Math.round(Math.max(tm.width, tm.height) * 1.16);
const square = await sharp({
  create: { width: side, height: side, channels: 3, background: BG },
})
  .composite([
    {
      input: trimmed,
      left: Math.round((side - tm.width) / 2),
      top: Math.round((side - tm.height) / 2),
    },
  ])
  .png()
  .toBuffer();

for (const [name, size] of [
  ['favicon-32.png', 32],
  ['favicon-192.png', 192],
  ['apple-touch-icon.png', 180],
]) {
  await sharp(square)
    .resize(size, size, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, name));
  console.log(`wrote ${name} (${size}x${size})`);
}
