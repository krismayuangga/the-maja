// Generate OG Image using pure SVG → PNG conversion via sharp or as SVG fallback
const fs = require('fs');
const path = require('path');

const width = 1200;
const height = 630;

const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0015;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1a0a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0d1b2a;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#b8860b;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#d4a017;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#b8860b;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#b8860b;stop-opacity:0" />
      <stop offset="20%" style="stop-color:#d4a017;stop-opacity:1" />
      <stop offset="80%" style="stop-color:#d4a017;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#b8860b;stop-opacity:0" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  
  <!-- Decorative corners -->
  <path d="M 50 50 L 150 50 L 150 55 L 55 55 L 55 150 L 50 150 Z" fill="#d4a017" opacity="0.6" />
  <path d="M ${width-50} 50 L ${width-150} 50 L ${width-150} 55 L ${width-55} 55 L ${width-55} 150 L ${width-50} 150 Z" fill="#d4a017" opacity="0.6" />
  <path d="M 50 ${height-50} L 150 ${height-50} L 150 ${height-55} L 55 ${height-55} L 55 ${height-150} L 50 ${height-150} Z" fill="#d4a017" opacity="0.6" />
  <path d="M ${width-50} ${height-50} L ${width-150} ${height-50} L ${width-150} ${height-55} L ${width-55} ${height-55} L ${width-55} ${height-150} L ${width-50} ${height-150} Z" fill="#d4a017" opacity="0.6" />
  
  <!-- Gold ornamental line top -->
  <line x1="200" y1="180" x2="1000" y2="180" stroke="url(#goldLine)" stroke-width="1" />
  
  <!-- Diamond ornament -->
  <polygon points="600,165 608,180 600,195 592,180" fill="#d4a017" opacity="0.8" />
  
  <!-- Title: MAJA -->
  <text x="600" y="270" font-family="serif" font-size="96" font-weight="bold" fill="url(#gold)" text-anchor="middle" letter-spacing="20">MAJA</text>
  
  <!-- Subtitle -->
  <text x="600" y="340" font-family="serif" font-size="24" fill="#c4b5a0" text-anchor="middle" letter-spacing="8" opacity="0.9">DIGITAL MUSEUM</text>
  
  <!-- Gold ornamental line middle -->
  <line x1="250" y1="370" x2="950" y2="370" stroke="url(#goldLine)" stroke-width="1" />
  <polygon points="600,355 608,370 600,385 592,370" fill="#d4a017" opacity="0.8" />
  
  <!-- Description -->
  <text x="600" y="430" font-family="sans-serif" font-size="22" fill="#e8d5b7" text-anchor="middle" opacity="0.85">Creative Economy Infrastructure of Nusantara</text>
  
  <!-- Tagline -->
  <text x="600" y="475" font-family="sans-serif" font-size="16" fill="#a0917d" text-anchor="middle" letter-spacing="4" opacity="0.7">UNITING NUSANTARA THROUGH CREATIVITY</text>
  
  <!-- Bottom decorative dots -->
  <circle cx="560" cy="530" r="3" fill="#d4a017" opacity="0.5" />
  <circle cx="580" cy="530" r="3" fill="#d4a017" opacity="0.7" />
  <circle cx="600" cy="530" r="4" fill="#d4a017" opacity="0.9" />
  <circle cx="620" cy="530" r="3" fill="#d4a017" opacity="0.7" />
  <circle cx="640" cy="530" r="3" fill="#d4a017" opacity="0.5" />
  
  <!-- URL -->
  <text x="600" y="580" font-family="sans-serif" font-size="14" fill="#7a6b5a" text-anchor="middle" letter-spacing="3">THEMAJA.COM</text>
</svg>`;

const outputDir = path.join(__dirname, '..', 'public', 'images');
const svgPath = path.join(outputDir, 'og-image.svg');
const pngPath = path.join(outputDir, 'og-image.png');

// Save SVG
fs.writeFileSync(svgPath, svg);
console.log(`✅ SVG saved: ${svgPath}`);

// Try to convert to PNG using sharp
try {
  const sharp = require('sharp');
  sharp(Buffer.from(svg))
    .png()
    .toFile(pngPath)
    .then(() => {
      console.log(`✅ PNG saved: ${pngPath}`);
      // Remove SVG after PNG is created
      fs.unlinkSync(svgPath);
    })
    .catch(() => {
      console.log('⚠️  sharp PNG conversion failed, keeping SVG');
      // Rename SVG to PNG path for fallback (won't work for OG, but placeholder)
    });
} catch {
  console.log('⚠️  sharp not available, using SVG as og-image');
  // Rename to .png won't help, keep as SVG
  // For proper OG image, user should convert manually or install sharp
  console.log('💡 Run: npm install sharp && node scripts/generate-og-image.js');
}
