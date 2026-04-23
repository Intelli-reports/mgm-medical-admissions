import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, makeAbsoluteUrl } from "../../config/site";

function upsertMeta(attr, key, content) {
  if (!content) return;

  let element = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) return;

  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function upsertSchema(schema) {
  const existing = document.head.querySelector('script[data-seo-schema="true"]');
  if (existing) existing.remove();
  if (!schema) return;

  const payload = Array.isArray(schema)
    ? { "@context": "https://schema.org", "@graph": schema }
    : schema;

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo-schema", "true");
  script.textContent = JSON.stringify(payload);
  document.head.appendChild(script);
}

function makeTitle(title) {
  if (!title) return SITE_NAME;
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export default function SeoHead({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  canonicalPath,
  robots = "index,follow",
  keywords,
  schema
}) {
  const location = useLocation();

  useEffect(() => {
    const canonicalUrl = makeAbsoluteUrl(canonicalPath || location.pathname);
    const imageUrl = makeAbsoluteUrl(image);
    const fullTitle = makeTitle(title);

    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "author", SITE_NAME);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:site_name", SITE_NAME);
    if (keywords?.length) {
      upsertMeta("name", "keywords", keywords.join(", "));
    }

    upsertLink("canonical", canonicalUrl);
    upsertSchema(schema);
  }, [canonicalPath, description, image, keywords, location.pathname, robots, schema, title, type]);

  return null;
}
