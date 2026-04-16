export const ADMIN_STORAGE_KEY = "medical-college-admin-store-v1";

export const LEAD_STATUSES = ["new", "contacted", "closed"];
export const LEAD_SOURCES = ["quick-desk", "registration", "contact-form"];
export const NOTICE_STATUSES = ["draft", "published"];
export const BLOG_STATUSES = ["draft", "published"];
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

export function normalizeBlog(input) {
  return {
    id: input.id || makeAdminId("blog"),
    slug: slugify(input.slug || input.title || "article"),
    title: input.title?.trim() || "",
    tag: input.tag?.trim() || "General",
    date: input.date?.trim() || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    meta: input.meta?.trim() || "",
    excerpt: input.excerpt?.trim() || "",
    image: input.image?.trim() || "/image/outer_blog_1.webp",
    intro: input.intro?.trim() || "",
    sections: Array.isArray(input.sections) ? input.sections : [],
    takeaways: Array.isArray(input.takeaways) ? input.takeaways : [],
    status: BLOG_STATUSES.includes(input.status) ? input.status : "draft",
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
