function renderInlineText(text, keyPrefix = "inline") {
  const source = String(text || "");
  const tokenPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|\*\*([^*]+)\*\*|_([^_]+)_/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenPattern.exec(source)) !== null) {
    if (match.index > lastIndex) {
      parts.push(source.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      parts.push(
        <a key={`${keyPrefix}-${parts.length}`} href={match[2]} target="_blank" rel="noreferrer">
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      parts.push(<strong key={`${keyPrefix}-${parts.length}`}>{match[3]}</strong>);
    } else if (match[4]) {
      parts.push(<em key={`${keyPrefix}-${parts.length}`}>{match[4]}</em>);
    }

    lastIndex = tokenPattern.lastIndex;
  }

  if (lastIndex < source.length) {
    parts.push(source.slice(lastIndex));
  }

  return parts;
}

function getEmbedUrl(url) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }

    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }

    if (parsed.hostname.includes("youtube.com") && parsed.pathname.includes("/embed/")) {
      return url;
    }

    if (parsed.hostname.includes("player.vimeo.com")) {
      return url;
    }

    if (parsed.hostname.includes("vimeo.com")) {
      const videoId = parsed.pathname.replace("/", "");
      if (videoId) return `https://player.vimeo.com/video/${videoId}`;
    }
  } catch {
    return "";
  }

  return "";
}

function BlogContentBlocks({ blocks }) {
  return (
    <div className="legacy-blog-block-stack">
      {blocks.map((block) => {
        if (block.type === "heading") {
          return <h2 key={block.id} className="legacy-blog-block-heading">{renderInlineText(block.text, block.id)}</h2>;
        }

        if (block.type === "subheading") {
          return <h3 key={block.id} className="legacy-blog-block-subheading">{renderInlineText(block.text, block.id)}</h3>;
        }

        if (block.type === "paragraph") {
          return <p key={block.id} className="legacy-blog-block-paragraph">{renderInlineText(block.text, block.id)}</p>;
        }

        if (block.type === "callout") {
          return (
            <div key={block.id} className={`legacy-blog-block-callout is-${block.tone || "info"}`}>
              {block.title ? <strong>{renderInlineText(block.title, `${block.id}-title`)}</strong> : null}
              <p>{renderInlineText(block.text, `${block.id}-text`)}</p>
            </div>
          );
        }

        if (block.type === "columns") {
          return (
            <div key={block.id} className="legacy-blog-block-columns">
              <div className="legacy-blog-block-column">
                <p>{renderInlineText(block.left, `${block.id}-left`)}</p>
              </div>
              <div className="legacy-blog-block-column">
                <p>{renderInlineText(block.right, `${block.id}-right`)}</p>
              </div>
            </div>
          );
        }

        if (block.type === "quote") {
          return <blockquote key={block.id} className="legacy-blog-block-quote">{renderInlineText(block.text, block.id)}</blockquote>;
        }

        if (block.type === "bullet-list") {
          return (
            <ul key={block.id} className="legacy-blog-block-list">
              {(block.items || []).filter(Boolean).map((item, index) => (
                <li key={`${block.id}-${index}`}>{renderInlineText(item, `${block.id}-${index}`)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "table") {
          return (
            <div key={block.id} className="legacy-blog-block-table-wrap">
              <table className="legacy-blog-block-table">
                {block.caption ? <caption>{block.caption}</caption> : null}
                {(block.headers || []).length ? (
                  <thead>
                    <tr>
                      {block.headers.map((header, index) => (
                        <th key={`${block.id}-header-${index}`}>{renderInlineText(header, `${block.id}-header-${index}`)}</th>
                      ))}
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {(block.rows || []).map((row, rowIndex) => (
                    <tr key={`${block.id}-row-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${block.id}-cell-${rowIndex}-${cellIndex}`}>
                          {renderInlineText(cell, `${block.id}-cell-${rowIndex}-${cellIndex}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "embed") {
          const embedUrl = getEmbedUrl(block.url);

          if (embedUrl) {
            return (
              <div key={block.id} className="legacy-blog-block-embed">
                <iframe
                  src={embedUrl}
                  title={block.title || "Embedded content"}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          }

          return (
            <a key={block.id} className="legacy-blog-block-embed-link" href={block.url} target="_blank" rel="noreferrer">
              {block.title || block.url}
            </a>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={block.id} className="legacy-blog-block-image">
              <img src={block.src} alt={block.alt || block.caption || "Blog media"} />
              {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            </figure>
          );
        }

        if (block.type === "divider") {
          return <hr key={block.id} className="legacy-blog-block-divider" />;
        }

        return null;
      })}
    </div>
  );
}

export default BlogContentBlocks;
