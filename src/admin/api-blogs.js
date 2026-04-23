/**
 * api-blogs.js — Minimal blog read API for public pages
 *
 * This module exists purely for performance:
 * - api.js imports collegePreviewData (all 9 college files ~100KB)
 * - BlogsPage / BlogArticlePage only need blog read functions
 * - This file imports ZERO college data, reducing those pages from 108KB → ~18KB
 *
 * Storage: reads from the SAME localStorage key as api.js,
 * so admin-published blogs appear correctly on the public site.
 */
import { ADMIN_STORAGE_KEY, normalizeBlog } from "./contracts";
import { legacyBlogs as staticBlogs } from "../data/site/blogs";

function sortBlogs(blogs) {
  return [...blogs].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

function readBlogsFromStore() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
      if (raw) {
        const store = JSON.parse(raw);
        if (Array.isArray(store.blogs) && store.blogs.length > 0) {
          return store.blogs.map((blog) => normalizeBlog(blog));
        }
      }
    }
  } catch {
    // fall through to static seed
  }

  // Fallback: static seed data (same seed as api.js createSeedStore)
  return staticBlogs.map((blog, index) =>
    normalizeBlog({
      ...blog,
      id: `blog-${index + 1}`,
      status: "published",
      featured: index === 0
    })
  );
}

export function getPublishedBlogsSync() {
  return sortBlogs(readBlogsFromStore()).filter((blog) => {
    if (blog.status === "published") return true;
    if (blog.status !== "scheduled") return false;
    const publishAt = blog.publishAt ? new Date(blog.publishAt).getTime() : 0;
    return publishAt && publishAt <= Date.now();
  });
}

export function getPublishedBlogBySlugSync(slug) {
  return getPublishedBlogsSync().find((blog) => blog.slug === slug) || null;
}
