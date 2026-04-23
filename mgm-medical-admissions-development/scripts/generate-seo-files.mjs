import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const dataModule = await import(pathToFileURL(path.join(projectRoot, "src", "data", "collegePreviewData.js")).href);

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};

  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((acc, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) return acc;

      const [key, ...rest] = trimmed.split("=");
      acc[key.replace(/^\uFEFF/, "").trim()] = rest.join("=").trim().replace(/^['"]|['"]$/g, "");
      return acc;
    }, {});
}

const envFromFiles = {
  ...readEnvFile(path.join(projectRoot, ".env")),
  ...readEnvFile(path.join(projectRoot, ".env.production"))
};

const rawSiteUrl =
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  envFromFiles.VITE_SITE_URL ||
  envFromFiles.SITE_URL ||
  "";
const siteUrl = rawSiteUrl ? rawSiteUrl.replace(/\/+$/, "") : "https://mgmmbbsmdms.com";

const pages = [
  "/",
  "/blogs",
  "/contact",
  ...Object.keys(dataModule.collegePreviewData).map((slug) => `/preview/${slug}`)
];

const sitemapEntries = pages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page}</loc>
    <changefreq>${page === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${page === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");

if (!rawSiteUrl) {
  console.warn("SEO build note: VITE_SITE_URL is not set. sitemap.xml and robots.txt use https://mgmmbbsmdms.com.");
}
