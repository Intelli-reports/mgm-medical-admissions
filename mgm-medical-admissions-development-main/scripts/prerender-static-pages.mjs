import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const templatePath = path.join(distDir, "index.html");

const { collegePreviewData } = await import(
  pathToFileURL(path.join(projectRoot, "src", "data", "collegePreviewData.js")).href
);
const { legacyBlogs } = await import(
  pathToFileURL(path.join(projectRoot, "src", "data", "site", "blogs.js")).href
);

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
  "https://mgmmbbsmdms.com";

const siteUrl = rawSiteUrl.replace(/\/+$/, "");
const siteName = "BalaJi Admission Guidance";
const defaultImage = `${siteUrl}/image/mgm-admissions-office.png`;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function absoluteUrl(routePath) {
  return `${siteUrl}${routePath.startsWith("/") ? routePath : `/${routePath}`}`;
}

function replaceOrInsertTag(html, regex, replacement, insertBefore = "</head>") {
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html.replace(insertBefore, `${replacement}\n${insertBefore}`);
}

function withSeo(template, { title, description, canonicalPath, image = defaultImage, bodyHtml }) {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const canonicalUrl = absoluteUrl(canonicalPath);
  const imageUrl = /^https?:\/\//i.test(image) ? image : absoluteUrl(image);

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`);
  html = replaceOrInsertTag(
    html,
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  html = replaceOrInsertTag(
    html,
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );
  html = replaceOrInsertTag(
    html,
    /<meta\s+property="og:title"[^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`
  );
  html = replaceOrInsertTag(
    html,
    /<meta\s+property="og:description"[^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  html = replaceOrInsertTag(
    html,
    /<meta\s+property="og:url"[^>]*>/i,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`
  );
  html = replaceOrInsertTag(
    html,
    /<meta\s+property="og:image"[^>]*>/i,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`
  );
  html = replaceOrInsertTag(
    html,
    /<meta\s+name="twitter:title"[^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`
  );
  html = replaceOrInsertTag(
    html,
    /<meta\s+name="twitter:description"[^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );
  html = replaceOrInsertTag(
    html,
    /<meta\s+name="twitter:image"[^>]*>/i,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`
  );
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${bodyHtml}</div>`);
  return html;
}

function writeRoute(routePath, html) {
  const normalized = routePath === "/" ? "" : routePath.replace(/^\/+/, "");
  const targetDir = path.join(distDir, normalized);
  fs.mkdirSync(targetDir || distDir, { recursive: true });
  const filePath = routePath === "/" ? templatePath : path.join(targetDir, "index.html");
  fs.writeFileSync(filePath, html, "utf8");
}

function homeFallback() {
  const collegeLinks = Object.entries(collegePreviewData)
    .map(([slug, college]) => `<li><a href="/preview/${slug}">${escapeHtml(college.fullName)}</a></li>`)
    .join("");

  return `
    <main class="seo-fallback">
      <h1>NEET UG Counseling and Medical College Guidance 2026</h1>
      <p>BalaJi Admission Guidance helps students and parents with NEET UG counseling, medical college shortlisting, MBBS fee comparison, cutoff research, and admission planning across multiple medical colleges.</p>
      <p>This website includes medical college detail pages, admission guidance articles, contact support, state-wise admission context, and counseling-focused content for MBBS aspirants.</p>
      <nav>
        <a href="/blogs">Admission Blogs</a>
        <a href="/contact">Contact BalaJi Admission Guidance</a>
      </nav>
      <section>
        <h2>Featured medical colleges</h2>
        <ul>${collegeLinks}</ul>
      </section>
      <section>
        <h2>Admission support topics</h2>
        <p>Students use this platform to review college facilities, fees, intake, NRI quota information, videos, FAQs, and counseling strategy before making final admission decisions.</p>
      </section>
    </main>
  `;
}

function blogsFallback() {
  const blogItems = legacyBlogs
    .map(
      (blog) => `
        <article>
          <h2>${escapeHtml(blog.title)}</h2>
          <p>${escapeHtml(blog.date)} • ${escapeHtml(blog.meta)}</p>
          <p>${escapeHtml(blog.excerpt)}</p>
        </article>
      `
    )
    .join("");

  return `
    <main class="seo-fallback">
      <h1>Admission Blogs, NEET Updates and Counseling Articles</h1>
      <p>Read guidance articles on NEET counseling, MBBS admissions, choice locking, quota planning, backup strategy, and college comparison for medical admissions.</p>
      <nav>
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
      </nav>
      <section>${blogItems}</section>
    </main>
  `;
}

function contactFallback() {
  return `
    <main class="seo-fallback">
      <h1>Contact BalaJi Admission Guidance</h1>
      <p>Contact BalaJi Admission Guidance for medical college counseling, NEET UG admission support, college shortlisting, and one-to-one counseling in Vashi, Navi Mumbai.</p>
      <ul>
        <li><strong>Phone:</strong> <a href="tel:+919324652984">+91-9324652984</a></li>
        <li><strong>Email:</strong> <a href="mailto:balajieducationservices17@gmail.com">balajieducationservices17@gmail.com</a></li>
        <li><strong>Address:</strong> Haware Infotech Park, A-1401, Sector 30, Near Vashi Railway Station, Vashi, Navi Mumbai - 400703</li>
      </ul>
      <nav>
        <a href="/">Home</a>
        <a href="/blogs">Blogs</a>
      </nav>
    </main>
  `;
}

function collegeFallback(data) {
  const highlightItems = data.highlights
    .slice(0, 8)
    .map(([label, value]) => `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</li>`)
    .join("");

  const faqItems = data.faqs
    .slice(0, 4)
    .map(([question, answer]) => `<li><strong>${escapeHtml(question)}</strong> ${escapeHtml(answer)}</li>`)
    .join("");

  const relatedLinks = data.footerLinks.otherColleges
    .map(([label, href]) => {
      const safeHref = href.startsWith("/preview/") ? href : "/";
      return `<li><a href="${escapeHtml(safeHref)}">${escapeHtml(label)}</a></li>`;
    })
    .join("");

  return `
    <main class="seo-fallback">
      <h1>${escapeHtml(data.fullName)} MBBS Admission 2026, Fees, Cutoff and Contact</h1>
      <p>${escapeHtml(data.welcomeText)}</p>
      <p>${escapeHtml(data.fullName)} in ${escapeHtml(data.locationLine)} is covered here with admission guidance, fees, intake, facilities, videos, FAQs, and counseling-oriented college insights.</p>
      <section>
        <h2>${escapeHtml(data.shortName)} highlights</h2>
        <ul>${highlightItems}</ul>
      </section>
      <section>
        <h2>Frequently asked questions</h2>
        <ul>${faqItems}</ul>
      </section>
      <section>
        <h2>Other colleges</h2>
        <ul>${relatedLinks}</ul>
      </section>
      <nav>
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/blogs">Blogs</a>
      </nav>
    </main>
  `;
}

const template = fs.readFileSync(templatePath, "utf8");
const generatedPages = new Map();

generatedPages.set(
  "/",
  withSeo(template, {
    title: "NEET UG Counseling and Medical College Guidance 2026",
    description:
      "Medical admission guidance for NEET UG counseling, college shortlisting, state-wise options, MBBS fees, and detailed medical college research.",
    canonicalPath: "/",
    bodyHtml: homeFallback()
  })
);

const blogsHtml = withSeo(template, {
  title: "Admission Blogs, NEET Updates and Counseling Articles",
  description:
    "Read NEET counseling strategy, MBBS admission updates, college comparison advice, and practical guidance for students and parents.",
  canonicalPath: "/blogs",
  bodyHtml: blogsFallback()
});

generatedPages.set("/blogs", blogsHtml);
generatedPages.set("/Blogs", blogsHtml);

generatedPages.set(
  "/contact",
  withSeo(template, {
    title: "Contact BalaJi Admission Guidance",
    description:
      "Contact BalaJi Admission Guidance in Vashi, Navi Mumbai for medical college counseling, college shortlisting, and admission support.",
    canonicalPath: "/contact",
    bodyHtml: contactFallback()
  })
);

for (const [slug, data] of Object.entries(collegePreviewData)) {
  generatedPages.set(
    `/preview/${slug}`,
    withSeo(template, {
      title: `${data.fullName} MBBS Admission 2026, Fees, Cutoff and Contact`,
      description: `${data.fullName} admission guide with fees, cutoff trends, eligibility, facilities, videos, FAQs, and contact details for ${data.locationLine}.`,
      canonicalPath: `/preview/${slug}`,
      image: data.image || "/image/mgm-admissions-office.png",
      bodyHtml: collegeFallback(data)
    })
  );
}

for (const [routePath, html] of generatedPages.entries()) {
  writeRoute(routePath, html);
}
