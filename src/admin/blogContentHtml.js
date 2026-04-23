function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inlineMarkdownToHtml(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/_([^_]+)_/g, "<em>$1</em>");
}

function renderParagraph(text) {
  const content = inlineMarkdownToHtml(text).trim();
  return content ? `<!-- wp:paragraph --><p>${content}</p><!-- /wp:paragraph -->` : "";
}

function renderHeading(text, level = 2) {
  const content = inlineMarkdownToHtml(text).trim();
  return content ? `<!-- wp:heading {"level":${level}} --><h${level}>${content}</h${level}><!-- /wp:heading -->` : "";
}

function renderList(items) {
  const cells = (items || [])
    .filter(Boolean)
    .map((item) => `<li>${inlineMarkdownToHtml(item)}</li>`)
    .join("");

  return cells ? `<!-- wp:list --><ul>${cells}</ul><!-- /wp:list -->` : "";
}

function renderQuote(text) {
  const content = inlineMarkdownToHtml(text).trim();
  return content ? `<!-- wp:quote --><blockquote class="wp-block-quote"><p>${content}</p></blockquote><!-- /wp:quote -->` : "";
}

function renderTable(block) {
  const headers = (block.headers || []).filter(Boolean);
  const rows = (block.rows || []).filter((row) => Array.isArray(row) && row.length);
  const headHtml = headers.length
    ? `<thead><tr>${headers.map((cell) => `<th>${inlineMarkdownToHtml(cell)}</th>`).join("")}</tr></thead>`
    : "";
  const bodyHtml = rows.length
    ? `<tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdownToHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>`
    : "";
  const captionHtml = block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : "";

  return headHtml || bodyHtml
    ? `<!-- wp:table --><figure class="wp-block-table"><table>${headHtml}${bodyHtml}</table>${captionHtml}</figure><!-- /wp:table -->`
    : "";
}

function renderImage(block) {
  if (!block.src) return "";
  const img = `<img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt || "")}" />`;
  const caption = block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : "";
  return `<!-- wp:image --><figure class="wp-block-image">${img}${caption}</figure><!-- /wp:image -->`;
}

function renderEmbed(block) {
  if (!block.url) return "";
  const title = block.title ? ` title="${escapeHtml(block.title)}"` : "";
  return `<!-- wp:embed {"url":"${escapeHtml(block.url)}"} --><figure class="wp-block-embed"><div class="wp-block-embed__wrapper"><a href="${escapeHtml(block.url)}"${title} target="_blank" rel="noreferrer">${escapeHtml(block.title || block.url)}</a></div></figure><!-- /wp:embed -->`;
}

export function blocksToBlogHtml(blocks = []) {
  return (blocks || [])
    .map((block) => {
      switch (block.type) {
        case "heading":
          return renderHeading(block.text, 2);
        case "subheading":
          return renderHeading(block.text, 3);
        case "paragraph":
          return renderParagraph(block.text);
        case "quote":
          return renderQuote(block.text);
        case "callout":
          return [renderHeading(block.title, 3), renderParagraph(block.text)].filter(Boolean).join("");
        case "columns":
          return [renderParagraph(block.left), renderParagraph(block.right)].filter(Boolean).join("");
        case "bullet-list":
          return renderList(block.items);
        case "table":
          return renderTable(block);
        case "embed":
          return renderEmbed(block);
        case "image":
          return renderImage(block);
        case "divider":
          return "<!-- wp:separator --><hr class=\"wp-block-separator\" /><!-- /wp:separator -->";
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n");
}

export function normalizeBlogHtml(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function stripHtmlToText(html) {
  return normalizeBlogHtml(html)
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function deriveExcerptFromHtml(html, limit = 180) {
  const text = stripHtmlToText(html);
  if (!text) return "";
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trimEnd()}...`;
}

export function sanitizeBlogHtml(html) {
  return normalizeBlogHtml(html)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son[a-z]+="[^"]*"/gi, "")
    .replace(/\son[a-z]+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}
