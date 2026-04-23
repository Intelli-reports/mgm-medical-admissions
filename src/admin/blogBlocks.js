function makeBlockId() {
  return `block-${Math.random().toString(36).slice(2, 10)}`;
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanItems(items) {
  if (!Array.isArray(items)) return [];
  return items.map((item) => cleanText(item)).filter(Boolean);
}

function cleanRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row) => cleanItems(row))
    .filter((row) => row.length);
}

function stripInlineFormatting(value) {
  return cleanText(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1");
}

export const BLOG_BLOCK_TYPES = [
  { value: "paragraph", label: "Paragraph" },
  { value: "heading", label: "Heading" },
  { value: "subheading", label: "Subheading" },
  { value: "callout", label: "Callout" },
  { value: "columns", label: "Columns" },
  { value: "bullet-list", label: "Bullet List" },
  { value: "quote", label: "Quote" },
  { value: "table", label: "Table" },
  { value: "embed", label: "Embed" },
  { value: "image", label: "Image" },
  { value: "divider", label: "Divider" }
];

export function createBlogBlock(type = "paragraph") {
  const base = { id: makeBlockId(), type };

  switch (type) {
    case "heading":
    case "subheading":
    case "paragraph":
    case "quote":
      return { ...base, text: "" };
    case "callout":
      return { ...base, tone: "info", title: "", text: "" };
    case "columns":
      return { ...base, left: "", right: "" };
    case "bullet-list":
      return { ...base, items: [""] };
    case "table":
      return {
        ...base,
        caption: "",
        headers: ["Column 1", "Column 2"],
        rows: [["Value 1", "Value 2"]]
      };
    case "embed":
      return { ...base, url: "", title: "" };
    case "image":
      return { ...base, src: "", alt: "", caption: "" };
    case "divider":
    default:
      return base;
  }
}

export function normalizeBlogBlock(input) {
  const fallback = createBlogBlock(input?.type);
  const type = fallback.type;
  const base = {
    id: cleanText(input?.id) || fallback.id,
    type
  };

  switch (type) {
    case "heading":
    case "subheading":
    case "paragraph":
    case "quote":
      return { ...base, text: cleanText(input?.text) };
    case "callout":
      return {
        ...base,
        tone: cleanText(input?.tone) || "info",
        title: cleanText(input?.title),
        text: cleanText(input?.text)
      };
    case "columns":
      return {
        ...base,
        left: cleanText(input?.left),
        right: cleanText(input?.right)
      };
    case "bullet-list":
      return { ...base, items: cleanItems(input?.items) };
    case "table":
      return {
        ...base,
        caption: cleanText(input?.caption),
        headers: cleanItems(input?.headers),
        rows: cleanRows(input?.rows)
      };
    case "embed":
      return {
        ...base,
        url: cleanText(input?.url),
        title: cleanText(input?.title)
      };
    case "image":
      return {
        ...base,
        src: cleanText(input?.src),
        alt: cleanText(input?.alt),
        caption: cleanText(input?.caption)
      };
    case "divider":
    default:
      return base;
  }
}

export function legacyBlogToBlocks(blog = {}) {
  const blocks = [];

  if (cleanText(blog.intro)) {
    blocks.push(
      normalizeBlogBlock({
        type: "paragraph",
        text: blog.intro
      })
    );
  }

  (blog.sections || []).forEach((section) => {
    if (cleanText(section.heading)) {
      blocks.push(
        normalizeBlogBlock({
          type: "heading",
          text: section.heading
        })
      );
    }

    (section.paragraphs || []).forEach((paragraph) => {
      if (cleanText(paragraph)) {
        blocks.push(
          normalizeBlogBlock({
            type: "paragraph",
            text: paragraph
          })
        );
      }
    });
  });

  return blocks.length ? blocks : [createBlogBlock("paragraph")];
}

export function normalizeBlogBlocks(blocks, fallbackBlog = {}) {
  const source = Array.isArray(blocks) && blocks.length ? blocks : legacyBlogToBlocks(fallbackBlog);
  return source.map((block) => normalizeBlogBlock(block));
}

export function deriveLegacyBlogContent(blocks, fallbackBlog = {}) {
  const normalized = normalizeBlogBlocks(blocks, fallbackBlog);
  const fallbackIntro = cleanText(fallbackBlog.intro);
  let intro = fallbackIntro;
  const sections = [];
  let currentSection = null;

  normalized.forEach((block) => {
    if (block.type === "heading" || block.type === "subheading") {
      if (currentSection?.heading && currentSection.paragraphs.length) {
        sections.push(currentSection);
      }

      currentSection = {
        heading: stripInlineFormatting(block.text),
        paragraphs: []
      };
      return;
    }

    if (block.type === "paragraph" || block.type === "quote" || block.type === "callout") {
      const plainText = stripInlineFormatting(block.text);
      if (!plainText) return;

      if (!intro) {
        intro = plainText;
      }

      if (currentSection) {
        currentSection.paragraphs.push(plainText);
      }
    }

    if (block.type === "columns") {
      const columnText = [block.left, block.right].map((value) => stripInlineFormatting(value)).filter(Boolean);
      if (!columnText.length) return;

      if (!intro) {
        intro = columnText[0];
      }

      if (currentSection) {
        currentSection.paragraphs.push(...columnText);
      }
    }
  });

  if (currentSection?.heading && currentSection.paragraphs.length) {
    sections.push(currentSection);
  }

  return {
    intro: intro || fallbackIntro,
    sections: sections.length ? sections : fallbackBlog.sections || [],
    takeaways: cleanItems(fallbackBlog.takeaways)
  };
}
