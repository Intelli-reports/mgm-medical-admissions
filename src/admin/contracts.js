import { blocksToBlogHtml, deriveExcerptFromHtml, normalizeBlogHtml } from "./blogContentHtml";
import { deriveLegacyBlogContent, normalizeBlogBlocks } from "./blogBlocks";

export const ADMIN_STORAGE_KEY = "medical-college-admin-store-v1";

export const LEAD_STATUSES = ["new", "contacted", "closed"];
export const LEAD_SOURCES = ["quick-desk", "registration", "contact-form"];
export const NOTICE_STATUSES = ["draft", "published"];
export const BLOG_STATUSES = ["draft", "published", "scheduled"];
export const COLLEGE_STATUSES = ["open", "consult", "closed"];

export function makeAdminId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function isoNow() {
  return new Date().toISOString();
}

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function inferUniversityName(college) {
  const source = `${college.fullName || ""} ${college.headerSubtitle || ""}`;
  if (/mgm/i.test(source)) return "MGM";
  if (/d\.?y\.?\s*patil|dy patil/i.test(source)) return "DY Patil";
  if (/terna/i.test(source)) return "Terna";
  return "Other";
}

export function inferCollegeType(college) {
  const source = `${college.headerSubtitle || ""} ${college.fullName || ""}`.toLowerCase();
  if (source.includes("deemed")) return "Deemed";
  if (source.includes("private")) return "Private";
  if (source.includes("government")) return "Government";
  return "Medical College";
}

export function inferCollegeRegion(location = "") {
  if (/navi mumbai/i.test(location)) return "Navi Mumbai";
  if (/pune/i.test(location)) return "Pune";
  if (/sambhajinagar|aurangabad/i.test(location)) return "Sambhajinagar";
  return "Maharashtra";
}

export function normalizeLead(input) {
  return {
    id: input.id || makeAdminId("lead"),
    status: LEAD_STATUSES.includes(input.status) ? input.status : "new",
    source: LEAD_SOURCES.includes(input.source) ? input.source : "contact-form",
    name: input.name?.trim() || "",
    phone: input.phone?.trim() || "",
    email: input.email?.trim() || "",
    city: input.city?.trim() || "",
    state: input.state?.trim() || "",
    course: input.course?.trim() || "",
    score: input.score?.trim() || "",
    message: input.message?.trim() || "",
    sourcePage: input.sourcePage?.trim() || "",
    metadata: input.metadata || {},
    createdAt: input.createdAt || isoNow(),
    updatedAt: input.updatedAt || isoNow()
  };
}

export function normalizeNotice(input) {
  return {
    id: input.id || makeAdminId("notice"),
    title: input.title?.trim() || "",
    text: input.text?.trim() || "",
    dateLabel: input.dateLabel?.trim() || "[New]",
    priority: Number.isFinite(Number(input.priority)) ? Number(input.priority) : 50,
    status: NOTICE_STATUSES.includes(input.status) ? input.status : "draft",
    publishAt: input.publishAt || "",
    expiresAt: input.expiresAt || "",
    createdAt: input.createdAt || isoNow(),
    updatedAt: input.updatedAt || isoNow()
  };
}

function clampFocal(value, fallback = 50) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(100, Math.max(0, number));
}

function normalizeMediaRecord(input = {}) {
  return {
    id: input.id || makeAdminId("media"),
    type: input.type || "image",
    label: input.label?.trim() || input.name?.trim() || "Media item",
    path: input.path?.trim() || input.dataUrl?.trim() || "",
    alt: input.alt?.trim() || "",
    caption: input.caption?.trim() || "",
    focalX: clampFocal(input.focalX),
    focalY: clampFocal(input.focalY),
    createdAt: input.createdAt || isoNow(),
    updatedAt: input.updatedAt || isoNow()
  };
}

export function normalizeMedia(input) {
  return normalizeMediaRecord(input);
}

function normalizeFaqItems(items) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => ({
      id: item?.id || makeAdminId("faq"),
      question: item?.question?.trim() || "",
      answer: item?.answer?.trim() || ""
    }))
    .filter((item) => item.question && item.answer);
}

function normalizeStringList(items) {
  if (!Array.isArray(items)) return [];
  return [...new Set(items.map((item) => item?.trim?.() || "").filter(Boolean))];
}

function normalizeCta(input = {}) {
  return {
    title: input.title?.trim() || "",
    text: input.text?.trim() || "",
    buttonLabel: input.buttonLabel?.trim() || "",
    buttonUrl: input.buttonUrl?.trim() || ""
  };
}

function inferReadingTime(contentHtml, excerpt = "") {
  const source = `${contentHtml || ""} ${excerpt || ""}`
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = source ? source.split(" ").filter(Boolean).length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function normalizeBlog(input) {
  const contentBlocks = normalizeBlogBlocks(input.contentBlocks, input);
  const contentHtml = normalizeBlogHtml(input.contentHtml) || blocksToBlogHtml(contentBlocks);
  const legacyContent = deriveLegacyBlogContent(contentBlocks, input);
  const featuredImage = normalizeMediaRecord({
    id: input.featuredImage?.id || input.mediaId || "",
    type: "image",
    label: input.featuredImage?.label || input.title || "Featured image",
    path: input.featuredImage?.path || input.image || "",
    alt: input.featuredImage?.alt || "",
    caption: input.featuredImage?.caption || "",
    focalX: input.featuredImage?.focalX,
    focalY: input.featuredImage?.focalY
  });
  const categories = normalizeStringList(input.categories || (input.tag ? [input.tag] : []));
  const tags = normalizeStringList(input.tags || (input.tag ? [input.tag] : []));
  const excerpt = input.excerpt?.trim() || deriveExcerptFromHtml(contentHtml);

  return {
    id: input.id || makeAdminId("blog"),
    slug: slugify(input.slug || input.title || "article"),
    title: input.title?.trim() || "",
    tag: input.tag?.trim() || categories[0] || tags[0] || "General",
    categories,
    tags,
    date: input.date?.trim() || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    meta: input.meta?.trim() || "",
    excerpt,
    image: featuredImage.path || "/image/outer_blog_1.webp",
    featuredImage,
    intro: legacyContent.intro,
    sections: legacyContent.sections,
    contentBlocks,
    contentHtml,
    takeaways: legacyContent.takeaways,
    status: BLOG_STATUSES.includes(input.status) ? input.status : "draft",
    publishAt: input.publishAt?.trim() || "",
    author: input.author?.trim() || "BalaJi Editorial Desk",
    canonicalUrl: input.canonicalUrl?.trim() || "",
    seoTitle: input.seoTitle?.trim() || "",
    seoDescription: input.seoDescription?.trim() || excerpt,
    readingTime: Number.isFinite(Number(input.readingTime)) ? Number(input.readingTime) : inferReadingTime(contentHtml, excerpt),
    faqItems: normalizeFaqItems(input.faqItems),
    relatedBlogIds: normalizeStringList(input.relatedBlogIds),
    cta: normalizeCta(input.cta),
    templateKey: input.templateKey?.trim() || "blank",
    featured: Boolean(input.featured),
    createdAt: input.createdAt || isoNow(),
    updatedAt: input.updatedAt || isoNow()
  };
}

export function normalizeCollege(input) {
  const data = input.data || {};
  return {
    id: input.id || makeAdminId("college"),
    slug: input.slug || data.slug || slugify(input.fullName || data.fullName || "college"),
    fullName: input.fullName || data.fullName || "",
    shortName: input.shortName || data.shortName || "",
    university: input.university || inferUniversityName(data),
    type: input.type || inferCollegeType(data),
    region: input.region || inferCollegeRegion(input.locationLine || data.locationLine || ""),
    status: COLLEGE_STATUSES.includes(input.status) ? input.status : "open",
    locationLine: input.locationLine || data.locationLine || "",
    email: input.email || data.email || "",
    phone: input.phone || data.phone || data.helpLine || "",
    data,
    createdAt: input.createdAt || isoNow(),
    updatedAt: input.updatedAt || isoNow()
  };
}
