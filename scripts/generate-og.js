#!/usr/bin/env node
/**
 * Generates static/og.png and static/og@2x.png from siteMetadata.
 * Run automatically on `npm run build` (prebuild), or manually: `npm run og:generate`
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const config = require(path.join(root, 'gatsby-config.js'));
const meta = config.siteMetadata || {};

const title = meta.title || 'Otmane El Bourki';

// Split title for layout: name line + role line
const emDash = title.includes('—') ? '—' : title.includes(' - ') ? ' - ' : null;
const nameLine = emDash ? title.split(emDash)[0].trim() : 'Otmane El Bourki';
const roleLine = emDash ? title.split(emDash).slice(1).join(emDash).trim() : 'AI Engineer';

// Dedicated short blurb (location is drawn in the footer — don't repeat it)
const blurb =
  'AI Engineer specializing in production LLM, RAG, and agentic AI — inference optimization, cloud/MLOps, and evaluation.';

const escapeXml = s =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function buildSvg(width, height) {
  const pad = Math.round(width * 0.06);
  const nameSize = Math.round(width * 0.048);
  const roleSize = Math.round(width * 0.028);
  const bodySize = Math.round(width * 0.018);
  const labelSize = Math.round(width * 0.014);
  const blurbLines = wrapText(blurb, width >= 2000 ? 72 : 58);
  const blurbStartY = Math.round(height * 0.58);
  const lineGap = Math.round(bodySize * 1.45);

  const blurbTspans = blurbLines
    .map(
      (line, i) =>
        `<tspan x="${pad}" dy="${i === 0 ? 0 : lineGap}">${escapeXml(line)}</tspan>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d0d0d"/>
      <stop offset="55%" stop-color="#121212"/>
      <stop offset="100%" stop-color="#161616"/>
    </linearGradient>
    <radialGradient id="glow" cx="85%" cy="15%" r="45%">
      <stop offset="0%" stop-color="#4eb5ff" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#4eb5ff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${Math.round(width * 0.008)}" height="${height}" fill="#4eb5ff"/>

  <text x="${pad}" y="${Math.round(height * 0.18)}" fill="#4eb5ff" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="${labelSize}" letter-spacing="0.12em">OELBOURKI.COM</text>

  <text x="${pad}" y="${Math.round(height * 0.34)}" fill="#f0f0f0" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="${nameSize}" font-weight="700">${escapeXml(nameLine)}</text>

  <text x="${pad}" y="${Math.round(height * 0.44)}" fill="#7dd8ff" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="${roleSize}" font-weight="500">${escapeXml(roleLine)}</text>

  <text x="${pad}" y="${blurbStartY}" fill="#a3a3a3" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="${bodySize}">${blurbTspans}</text>

  <text x="${pad}" y="${height - pad}" fill="#6e6e6e" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="${labelSize}">Carrières-sous-Poissy, Île-de-France, France</text>
</svg>`;
}

async function writePng(svg, outPath, width, height) {
  await sharp(Buffer.from(svg))
    .resize(width, height)
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`Wrote ${path.relative(root, outPath)} (${width}×${height})`);
}

async function main() {
  const outDir = path.join(root, 'static');
  fs.mkdirSync(outDir, { recursive: true });

  const svg1x = buildSvg(1200, 630);
  const svg2x = buildSvg(2400, 1260);

  // Keep SVG source for inspection / design tweaks
  fs.writeFileSync(path.join(outDir, 'og.svg'), svg1x, 'utf8');

  await writePng(svg1x, path.join(outDir, 'og.png'), 1200, 630);
  await writePng(svg2x, path.join(outDir, 'og@2x.png'), 2400, 1260);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
