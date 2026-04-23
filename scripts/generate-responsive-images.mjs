/**
 * generate-responsive-images.mjs
 *
 * Generates mobile-optimised WebP variants for every large image.
 * Naming convention: image.webp → image-480w.webp (mobile) + image-800w.webp (tablet)
 *
 * Run: node scripts/generate-responsive-images.mjs
 */
import sharp from "sharp";
import { statSync, existsSync } from "fs";
import { join, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const imgDir = join(__dirname, "../public/image");

// width → quality mapping: mobile images can be slightly lower quality
// because they display at small physical pixel sizes
const targets = [
  {
    src: "mgm-college.webp",           // hero + about section (181 KB → goal: ~18 KB mobile)
    widths: [480, 800],
    quality: 72,
  },
  {
    src: "mgm-admissions-office.webp", // about/proof section (292 KB → goal: ~25 KB mobile)
    widths: [480, 800],
    quality: 74,
  },
  {
    src: "register-guidance-banner.webp", // CTA banner (97 KB → goal: ~15 KB mobile)
    widths: [480, 800],
    quality: 72,
  },
  {
    src: "hero-ai-image.webp",          // hero visual (62 KB → goal: ~12 KB mobile)
    widths: [480, 800],
    quality: 74,
  },
  {
    src: "outer_blog_2.webp",           // blogs page hero (52 KB → goal: ~10 KB mobile)
    widths: [480, 800],
    quality: 72,
  },
  {
    src: "outer_blog_1.webp",
    widths: [480],
    quality: 74,
  },
  {
    src: "outer_blog_3.webp",
    widths: [480],
    quality: 74,
  },
  {
    src: "outer_blog_4.webp",
    widths: [480],
    quality: 74,
  },
  {
    src: "outer_blog_5.webp",
    widths: [480],
    quality: 74,
  },
];

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function outName(src, width) {
  return src.replace(/\.webp$/, `-${width}w.webp`);
}

console.log("🖼️  Generating responsive image variants...\n");

let totalSaved = 0;

for (const target of targets) {
  const srcPath = join(imgDir, target.src);
  if (!existsSync(srcPath)) {
    console.log(`⚠️  SKIP ${target.src} — not found`);
    continue;
  }

  const srcSize = statSync(srcPath).size;
  const meta = await sharp(srcPath).metadata();

  for (const width of target.widths) {
    // Skip if source is already smaller than the target width
    if (meta.width && meta.width <= width) {
      console.log(`⏭️  SKIP ${target.src} @ ${width}w — source (${meta.width}px) already smaller`);
      continue;
    }

    const outFile = join(imgDir, outName(target.src, width));
    const result = await sharp(srcPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: target.quality, effort: 5 })
      .toFile(outFile);

    const saved = srcSize - result.size;
    totalSaved += saved;

    console.log(
      `✅  ${target.src} → ${outName(target.src, width)}\n` +
      `    ${kb(srcSize)} → ${kb(result.size)}  (saves ${kb(saved)} per mobile request)\n`
    );
  }
}

console.log(`\n🎉 Done! Total saved per mobile page load: ~${kb(totalSaved)}`);
console.log("📝 Next: update JSX img tags with srcset attribute.");
