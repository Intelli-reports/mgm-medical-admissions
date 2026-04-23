import { createBlogBlock, normalizeBlogBlocks } from "./blogBlocks";
import { blocksToBlogHtml } from "./blogContentHtml";

export function createBlogDraft(blog) {
  const contentBlocks = normalizeBlogBlocks(blog?.contentBlocks, blog || { contentBlocks: [createBlogBlock("paragraph")] });

  return {
    id: blog?.id || "",
    title: blog?.title || "",
    slug: blog?.slug || "",
    tag: blog?.tag || "NEET UG",
    date: blog?.date || "",
    meta: blog?.meta || "",
    image: blog?.image || "/image/outer_blog_1.webp",
    excerpt: blog?.excerpt || "",
    status: blog?.status || "draft",
    publishAt: blog?.publishAt || "",
    featured: Boolean(blog?.featured),
    author: blog?.author || "BalaJi Editorial Desk",
    canonicalUrl: blog?.canonicalUrl || "",
    seoTitle: blog?.seoTitle || "",
    seoDescription: blog?.seoDescription || "",
    categoriesText: Array.isArray(blog?.categories) ? blog.categories.join(", ") : blog?.tag || "NEET UG",
    tagsText: Array.isArray(blog?.tags) ? blog.tags.join(", ") : blog?.tag || "NEET UG",
    relatedBlogIds: Array.isArray(blog?.relatedBlogIds) ? blog.relatedBlogIds : [],
    faqItems: Array.isArray(blog?.faqItems) ? blog.faqItems : [],
    cta: blog?.cta || { title: "", text: "", buttonLabel: "", buttonUrl: "" },
    templateKey: blog?.templateKey || "blank",
    featuredImage: blog?.featuredImage || {
      id: "",
      path: blog?.image || "/image/outer_blog_1.webp",
      alt: "",
      caption: "",
      focalX: 50,
      focalY: 50
    },
    takeawaysText: blog?.takeawaysText || (blog?.takeaways || []).join("\n"),
    contentBlocks,
    contentHtml: blog?.contentHtml || blocksToBlogHtml(contentBlocks)
  };
}
