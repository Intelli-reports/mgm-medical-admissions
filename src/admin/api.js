import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE } from "../config/site";
import { collegePreviewData } from "../data/collegePreviewData";
import { legacyBlogs as staticBlogs } from "../data/site/blogs";
import {
  ADMIN_STORAGE_KEY,
  inferCollegeRegion,
  inferCollegeType,
  inferUniversityName,
  normalizeBlog,
  normalizeCollege,
  normalizeLead,
  normalizeNotice,
  slugify
} from "./contracts";

const initialNoticeSeed = [
  { dateLabel: "[20 Jun]", title: "Karnataka NEET UG Mock Allotment Out", text: "Karnataka NEET UG Mock Allotment Out", priority: 10, status: "published" },
  { dateLabel: "[16 Jul]", title: "UP DGME Releases Round 1 Seat Matrix", text: "UP DGME Releases Round 1 Seat Matrix", priority: 20, status: "published" },
  { dateLabel: "[15 Jul]", title: "2 New Medical Colleges Approved in Maharashtra", text: "2 New Medical Colleges Approved in Maharashtra", priority: 30, status: "published" }
];

function createSeedStore() {
  const blogs = staticBlogs.map((blog, index) =>
    normalizeBlog({
      ...blog,
      id: `blog-${index + 1}`,
      status: "published",
      featured: index === 0
    })
  );

  const colleges = Object.entries(collegePreviewData).map(([slug, college], index) =>
    normalizeCollege({
      id: `college-${index + 1}`,
      slug,
      fullName: college.fullName,
      shortName: college.shortName,
      university: inferUniversityName(college),
      type: inferCollegeType(college),
      region: inferCollegeRegion(college.locationLine),
      status: "open",
      locationLine: college.locationLine,
      email: college.email,
      phone: college.phone || college.helpLine,
      data: { ...college, slug }
    })
  );

  return {
    leads: [],
    notices: initialNoticeSeed.map((notice, index) =>
      normalizeNotice({
        ...notice,
        id: `notice-${index + 1}`
      })
    ),
    blogs,
    colleges,
    notifications: [],
    media: [
      ...blogs.map((blog) => ({ id: `media-blog-${blog.id}`, type: "blog", label: blog.title, path: blog.image })),
      ...colleges.map((college) => ({
        id: `media-college-${college.id}`,
        type: "college",
        label: college.fullName,
        path: college.data.image || ""
      }))
    ],
    settings: {
      contactPhone: CONTACT_PHONE,
      contactEmail: CONTACT_EMAIL,
      contactAddress: CONTACT_ADDRESS,
      whatsappTemplate: "New admission enquiry received.",
      notifyByEmail: true,
      notifyByWhatsApp: false
    }
  };
}

let memoryStore = createSeedStore();

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function ensureStore() {
  if (!hasStorage()) return clone(memoryStore);

  const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
  if (!raw) {
    const seeded = createSeedStore();
    window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(seeded));
    return clone(seeded);
  }

  try {
    const parsed = JSON.parse(raw);
    return clone(parsed);
  } catch {
    const seeded = createSeedStore();
    window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(seeded));
    return clone(seeded);
  }
}

function commitStore(store) {
  memoryStore = clone(store);

  if (hasStorage()) {
    window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(store));
  }

  return clone(store);
}

function readStore() {
  return ensureStore();
}

function writeStore(updater) {
  const current = readStore();
  const next = updater(current);
  return commitStore(next);
}

function pushNotification(store, payload) {
  store.notifications.unshift({
    id: `notification-${Date.now()}`,
    title: payload.title,
    text: payload.text,
    createdAt: new Date().toISOString(),
    read: false
  });
  store.notifications = store.notifications.slice(0, 24);
}

function sortBlogs(blogs) {
  return [...blogs].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

function resolvePublishedNotice(notice) {
  if (notice.status !== "published") return false;
  const now = Date.now();
  const publishAt = notice.publishAt ? new Date(notice.publishAt).getTime() : null;
  const expiresAt = notice.expiresAt ? new Date(notice.expiresAt).getTime() : null;
  if (publishAt && publishAt > now) return false;
  if (expiresAt && expiresAt < now) return false;
  return true;
}

function mergeCollegeRecord(record) {
  return {
    ...record.data,
    fullName: record.fullName,
    shortName: record.shortName || record.data.shortName,
    locationLine: record.locationLine,
    email: record.email,
    phone: record.phone,
    helpLine: record.phone,
    status: record.status,
    slug: record.slug,
    university: record.university,
    type: record.type,
    region: record.region
  };
}

export function getLeadContract() {
  return {
    required: ["name", "phone", "source"],
    optional: ["email", "city", "state", "course", "score", "message", "sourcePage", "metadata"]
  };
}

export function getNoticeContract() {
  return {
    required: ["title", "text", "status"],
    optional: ["dateLabel", "priority", "publishAt", "expiresAt"]
  };
}

export function getBlogContract() {
  return {
    required: ["slug", "title", "tag", "excerpt", "intro", "sections", "status"],
    optional: ["date", "meta", "image", "takeaways", "featured"]
  };
}

export function getCollegeContract() {
  return {
    required: ["slug", "fullName", "shortName", "locationLine", "status"],
    optional: ["university", "type", "region", "email", "phone", "data"]
  };
}

export async function listLeads() {
  const store = readStore();
  return [...store.leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createLead(input) {
  const lead = normalizeLead(input);
  writeStore((store) => {
    store.leads.unshift(lead);
    pushNotification(store, {
      title: `New ${lead.source.replace(/-/g, " ")} lead`,
      text: `${lead.name} submitted a ${lead.course || "general"} enquiry.`
    });
    return store;
  });
  return lead;
}

export async function updateLeadStatus(id, status) {
  const nextStore = writeStore((store) => {
    store.leads = store.leads.map((lead) =>
      lead.id === id ? { ...lead, status, updatedAt: new Date().toISOString() } : lead
    );
    return store;
  });
  return nextStore.leads.find((lead) => lead.id === id) || null;
}

export async function listNotices() {
  return readStore().notices.sort((a, b) => a.priority - b.priority);
}

export async function saveNotice(input) {
  const notice = normalizeNotice(input);
  const nextStore = writeStore((store) => {
    const existingIndex = store.notices.findIndex((item) => item.id === notice.id);
    if (existingIndex >= 0) {
      store.notices[existingIndex] = notice;
    } else {
      store.notices.push(notice);
    }
    return store;
  });
  return nextStore.notices.find((item) => item.id === notice.id) || notice;
}

export async function deleteNotice(id) {
  writeStore((store) => {
    store.notices = store.notices.filter((notice) => notice.id !== id);
    return store;
  });
}

export function getPublicNoticesSync() {
  return readStore().notices
    .filter(resolvePublishedNotice)
    .sort((a, b) => a.priority - b.priority)
    .map((notice) => ({ date: notice.dateLabel, text: notice.text, id: notice.id }));
}

export async function listBlogs() {
  return sortBlogs(readStore().blogs);
}

export async function saveBlog(input) {
  const blog = normalizeBlog(input);
  const nextStore = writeStore((store) => {
    const existingIndex = store.blogs.findIndex((item) => item.id === blog.id || item.slug === blog.slug);
    if (existingIndex >= 0) {
      store.blogs[existingIndex] = { ...store.blogs[existingIndex], ...blog, updatedAt: new Date().toISOString() };
    } else {
      store.blogs.push(blog);
    }
    return store;
  });
  return nextStore.blogs.find((item) => item.id === blog.id || item.slug === blog.slug) || blog;
}

export async function deleteBlog(id) {
  writeStore((store) => {
    store.blogs = store.blogs.filter((blog) => blog.id !== id);
    return store;
  });
}

export function getPublishedBlogsSync() {
  return sortBlogs(readStore().blogs).filter((blog) => blog.status === "published");
}

export function getPublishedBlogBySlugSync(slug) {
  return getPublishedBlogsSync().find((blog) => blog.slug === slug) || null;
}

export async function listColleges() {
  return readStore().colleges.sort((a, b) => a.fullName.localeCompare(b.fullName));
}

export async function saveCollege(input) {
  const college = normalizeCollege({
    ...input,
    slug: input.slug || slugify(input.fullName || input.data?.fullName || "college")
  });
  const nextStore = writeStore((store) => {
    const existingIndex = store.colleges.findIndex((item) => item.id === college.id || item.slug === college.slug);
    if (existingIndex >= 0) {
      store.colleges[existingIndex] = {
        ...store.colleges[existingIndex],
        ...college,
        data: { ...store.colleges[existingIndex].data, ...college.data },
        updatedAt: new Date().toISOString()
      };
    } else {
      store.colleges.push(college);
    }
    return store;
  });
  return nextStore.colleges.find((item) => item.id === college.id || item.slug === college.slug) || college;
}

export function getManagedCollegesSync() {
  return readStore().colleges.map(mergeCollegeRecord);
}

export function getManagedCollegeBySlugSync(slug) {
  const record = readStore().colleges.find((college) => college.slug === slug);
  return record ? mergeCollegeRecord(record) : null;
}

export async function listMedia() {
  return readStore().media;
}

export async function listNotifications() {
  return readStore().notifications;
}

export async function getSettings() {
  return readStore().settings;
}

export async function saveSettings(patch) {
  const nextStore = writeStore((store) => {
    store.settings = { ...store.settings, ...patch };
    return store;
  });
  return nextStore.settings;
}

export async function getDashboardSummary() {
  const store = readStore();
  const leads = store.leads;
  const notices = store.notices;
  const blogs = store.blogs;
  const colleges = store.colleges;

  return {
    leadsToday: leads.filter((lead) => new Date(lead.createdAt).toDateString() === new Date().toDateString()).length,
    openEnquiries: leads.filter((lead) => lead.status === "new").length,
    noticesPublished: notices.filter((notice) => notice.status === "published").length,
    blogDrafts: blogs.filter((blog) => blog.status === "draft").length,
    collegeUpdatesPending: colleges.filter((college) => college.status !== "open").length
  };
}
