import sharp from "sharp";
import { existsSync } from "fs";
import { join, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicImageDir = join(__dirname, "../public/image");

// Images to convert and their quality settings
const targets = [
  {
    input: join(publicImageDir, "mgm-college.png"),
    output: join(publicImageDir, "mgm-college.webp"),
    // Hero background — can be slightly lower quality
    options: { quality: 78, effort: 5 }
  },
  {
    input: join(publicImageDir, "register-guidance-banner.png"),
    output: join(publicImageDir, "register-guidance-banner.webp"),
    options: { quality: 78, effort: 5 }
  },
  {
    input: join(publicImageDir, "mgm-admissions-office.png"),
    output: join(publicImageDir, "mgm-admissions-office.webp"),
    options: { quality: 80, effort: 5 }
  },
  {
    input: join(publicImageDir, "ChatGPT Image Mar 20, 2026, 11_42_33 AM.png"),
    output: join(publicImageDir, "hero-ai-image.webp"),
    options: { quality: 80, effort: 5 }
  },
  {
    input: join(publicImageDir, "logo.png"),
    output: join(publicImageDir, "logo.webp"),
    options: { quality: 90, effort: 5 }
  }
];

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

for (const target of targets) {
  if (!existsSync(target.input)) {
    console.log(`⚠️  SKIP  ${basename(target.input)} — file not found`);
    continue;
  }

  try {
    const meta = await sharp(target.input).metadata();
    const result = await sharp(target.input)
      .webp(target.options)
      .toFile(target.output);

    const inputSize = (await import("fs")).statSync(target.input).size;
    const outputSize = result.size;
    const saving = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);

    console.log(
      `✅  ${basename(target.input)}\n` +
      `    ${formatBytes(inputSize)}  →  ${formatBytes(outputSize)}  (${saving}% smaller)\n` +
      `    Output: ${basename(target.output)}\n`
    );
  } catch (err) {
    console.error(`❌  ERROR converting ${basename(target.input)}:`, err.message);
  }
}

console.log("Done! Update your JSX to use .webp paths.");
