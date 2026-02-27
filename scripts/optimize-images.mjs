/**
 * MAJA Museum — Image Optimization Script
 * Resizes, compresses, and converts images to WebP for optimal performance.
 * 
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

const MUSEUM_DIR = "public/images/museum";

// Target sizes per image (width, height) — based on IMAGE_ASSETS_GUIDE.md
// For images that need transparency: keep PNG but compress
// For photos/textures: convert to WebP
const imageConfigs = {
  // Opening
  "opening/door-left.png":       { width: 800, height: 1200, format: "png",  quality: 85, keepTransparency: true },
  "opening/door-right.png":      { width: 800, height: 1200, format: "png",  quality: 85, keepTransparency: true },

  // Sejarah
  "sejarah/relief-texture.webp": { width: 2560, height: 1440, format: "webp", quality: 75 },
  "sejarah/ornament-border.png": { width: 1920, height: 200,  format: "png",  quality: 80, keepTransparency: true },

  // Masalah
  "masalah/broken-painting-1.png":  { width: 600, height: 800, format: "webp", quality: 78 },
  "masalah/broken-painting-2.png":  { width: 600, height: 800, format: "webp", quality: 78 },
  "masalah/broken-painting-3.png":  { width: 800, height: 600, format: "webp", quality: 78 },
  "masalah/artist-silhouette.png":  { width: 800, height: 600, format: "webp", quality: 75 },

  // Solusi — transparent PNGs
  "solusi/physical-art.png":     { width: 500, height: 650, format: "webp", quality: 78 },
  "solusi/nft-hologram.png":     { width: 500, height: 650, format: "webp", quality: 78 },
  "solusi/art-nft-linked.png":   { width: 600, height: 500, format: "webp", quality: 78 },

  // Nusantara
  "nusantara/batik-jawa.webp":       { width: 600, height: 400, format: "webp", quality: 75 },
  "nusantara/ukiran-bali.webp":      { width: 600, height: 400, format: "webp", quality: 75 },
  "nusantara/ulos-sumatera.webp":    { width: 600, height: 400, format: "webp", quality: 75 },
  "nusantara/seni-dayak.webp":       { width: 600, height: 400, format: "webp", quality: 75 },
  "nusantara/toraja-sulawesi.webp":  { width: 600, height: 400, format: "webp", quality: 75 },
  "nusantara/noken-papua.webp":      { width: 600, height: 400, format: "webp", quality: 75 },

  // Ekonomi
  "ekonomi/maja-coin-front.png": { width: 800, height: 800, format: "png",  quality: 85, keepTransparency: true },
  "ekonomi/maja-coin-back.png":  { width: 800, height: 800, format: "png",  quality: 85, keepTransparency: true },

  // Masa Depan
  "masa-depan/digital-sky.webp": { width: 3840, height: 1080, format: "webp", quality: 72 },

  // Branding
  "branding/maja-logo-3d.png":   { width: 1000, height: 1000, format: "png", quality: 85, keepTransparency: true },
  "branding/og-image.jpg":       { width: 1200, height: 630,  format: "jpg", quality: 80 },
};

async function optimizeImage(relPath, config) {
  const inputPath = path.join(MUSEUM_DIR, relPath);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`  ⏭  SKIP (not found): ${relPath}`);
    return null;
  }

  const originalSize = fs.statSync(inputPath).size;
  const originalKB = (originalSize / 1024).toFixed(0);

  // Determine output path (may change extension)
  const ext = path.extname(relPath);
  const baseName = relPath.replace(ext, "");
  const newExt = config.format === "webp" ? ".webp" : config.format === "jpg" ? ".jpg" : ".png";
  const outputRelPath = baseName + newExt;
  const outputPath = path.join(MUSEUM_DIR, outputRelPath);
  
  // Temp path to avoid overwriting during processing — use different directory
  const tempDir = path.join("scripts", ".img-tmp");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
  const tempPath = path.join(tempDir, path.basename(outputPath));

  try {
    // Read file into buffer first to release the file handle
    const inputBuffer = fs.readFileSync(inputPath);
    let pipeline = sharp(inputBuffer, { failOn: "none" });

    // Get metadata to decide if resize is needed
    const metadata = await pipeline.metadata();
    const needsResize = metadata.width > config.width || metadata.height > config.height;

    if (needsResize) {
      pipeline = pipeline.resize(config.width, config.height, {
        fit: "inside",        // Keep aspect ratio, fit within bounds
        withoutEnlargement: true, // Never upscale
      });
    }

    // Apply format-specific compression
    if (config.format === "webp") {
      pipeline = pipeline.webp({ quality: config.quality, effort: 6 });
    } else if (config.format === "png") {
      pipeline = pipeline.png({ 
        quality: config.quality, 
        compressionLevel: 9,
        palette: !config.keepTransparency,
      });
    } else if (config.format === "jpg") {
      pipeline = pipeline.jpeg({ quality: config.quality, mozjpeg: true });
    }

    await pipeline.toFile(tempPath);

    const newSize = fs.statSync(tempPath).size;
    const newKB = (newSize / 1024).toFixed(0);
    const savings = ((1 - newSize / originalSize) * 100).toFixed(0);

    // Remove original if extension changed
    if (relPath !== outputRelPath && fs.existsSync(inputPath)) {
      try { fs.unlinkSync(inputPath); } catch {}
    }

    // Replace with optimized version — handle same-file overwrite
    try {
      if (outputPath === inputPath) {
        // Same file: delete original first, then rename temp
        try { fs.unlinkSync(outputPath); } catch {}
      } else if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      fs.renameSync(tempPath, outputPath);
    } catch {
      // If rename fails, try copy + delete
      fs.copyFileSync(tempPath, outputPath);
      try { fs.unlinkSync(tempPath); } catch {}
    }

    const resized = needsResize ? ` (resized ${metadata.width}×${metadata.height} → ${config.width}×${config.height})` : "";
    const converted = relPath !== outputRelPath ? ` [→ ${newExt}]` : "";
    console.log(`  ✅ ${relPath}: ${originalKB}KB → ${newKB}KB (${savings}% saved)${resized}${converted}`);

    return {
      original: relPath,
      optimized: outputRelPath,
      changed: relPath !== outputRelPath,
      originalSize,
      newSize,
    };
  } catch (err) {
    // Cleanup temp file
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.log(`  ❌ ERROR ${relPath}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log("\n🎨 MAJA Museum — Image Optimization\n");
  console.log("=" .repeat(60));

  const results = [];
  let totalOriginal = 0;
  let totalNew = 0;
  const renames = [];

  for (const [relPath, config] of Object.entries(imageConfigs)) {
    const result = await optimizeImage(relPath, config);
    if (result) {
      results.push(result);
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      if (result.changed) {
        renames.push({ from: result.original, to: result.optimized });
      }
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`\n📊 Summary:`);
  console.log(`   Files optimized: ${results.length}`);
  console.log(`   Original total:  ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Optimized total: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total saved:     ${((totalOriginal - totalNew) / 1024 / 1024).toFixed(2)} MB (${((1 - totalNew / totalOriginal) * 100).toFixed(0)}%)`);

  if (renames.length > 0) {
    console.log(`\n⚠️  Files renamed (need code update):`);
    renames.forEach(r => console.log(`   ${r.from} → ${r.to}`));
  }

  console.log("\n✅ Done!\n");
}

main().catch(console.error);
