import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { BLOG_BLOCK_TYPES, createBlogBlock } from "../../admin/blogBlocks";
import MediaDropzone from "./MediaDropzone";

function parsePipeList(value) {
  return value.split("|").map((item) => item.trim()).filter(Boolean);
}

function parsePipeRows(value) {
  return value.split("\n").map((row) => parsePipeList(row)).filter((row) => row.length);
}

function joinPipeList(items) {
  return (items || []).join(" | ");
}

function joinPipeRows(rows) {
  return (rows || []).map((row) => row.join(" | ")).join("\n");
}

function getBlockLabel(type) {
  return BLOG_BLOCK_TYPES.find((item) => item.value === type)?.label || type;
}

function fuzzyScore(type, query) {
  const normalized = query.trim().toLowerCase().replace(/^\//, "");
  if (!normalized) return 0;
  const label = type.label.toLowerCase();
  const value = type.value.toLowerCase();

  if (value === normalized || label === normalized) return 100;
  if (value.startsWith(normalized)) return 90;
  if (label.startsWith(normalized)) return 80;
  if (value.includes(normalized)) return 70;
  if (label.includes(normalized)) return 60;

  let cursor = 0;
  let matches = 0;
  for (const char of normalized) {
    const next = value.indexOf(char, cursor);
    if (next >= 0) {
      matches += 1;
      cursor = next + 1;
    }
  }
  return matches ? matches * 10 : -1;
}

function blockTypeMatches(type, query) {
  return fuzzyScore(type, query) >= 0;
}

function isTextBlock(type) {
  return ["paragraph", "heading", "subheading", "quote"].includes(type);
}

function RichTextToolbar({ onBold, onItalic, onLink }) {
  return (
    <div className="admin-inline-toolbar">
      <button type="button" onClick={onBold}>Bold</button>
      <button type="button" onClick={onItalic}>Italic</button>
      <button type="button" onClick={onLink}>Link</button>
    </div>
  );
}

function InlineBlockInserter({ onAdd, openToken }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (openToken) {
      setOpen(true);
    }
  }, [openToken]);

  return (
    <div className="admin-inline-inserter">
      <button type="button" className="admin-inline-inserter-toggle" onClick={() => setOpen((value) => !value)}>
        +
      </button>
      {open ? (
        <div className="admin-inline-inserter-menu">
          {BLOG_BLOCK_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => {
                onAdd(type.value);
                setOpen(false);
              }}
            >
              {type.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SlashCommandMenu({ query, highlightedIndex, onHover, onSelect }) {
  const matches = BLOG_BLOCK_TYPES.filter((type) => blockTypeMatches(type, query)).slice(0, 6);

  if (!query.startsWith("/") || !matches.length) return null;

  return (
    <div className="admin-slash-menu">
      {matches.map((type, index) => (
        <button
          key={type.value}
          type="button"
          className={highlightedIndex === index ? "is-active" : ""}
          onMouseEnter={() => onHover(index)}
          onClick={() => onSelect(type.value)}
        >
          <strong>{type.label}</strong>
          <span>/{type.value}</span>
        </button>
      ))}
    </div>
  );
}

function BlockFields({
  block,
  onChange,
  onWrap,
  textAreaRef,
  selected,
  onCreateAfter,
  onNavigate,
  onSelect
}) {
  const [slashQuery, setSlashQuery] = useState("");
  const matches = useMemo(
    () =>
      BLOG_BLOCK_TYPES
        .map((type) => ({ type, score: fuzzyScore(type, slashQuery) }))
        .filter((item) => item.score >= 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.type)
        .slice(0, 6),
    [slashQuery]
  );
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (!selected) {
      setSlashQuery("");
      setHighlightedIndex(0);
    }
  }, [selected]);

  function handleTextChange(value) {
    if (block.type === "paragraph") {
      if (value === "# ") {
        onChange({ type: "heading", text: "" });
        return;
      }
      if (value === "## ") {
        onChange({ type: "subheading", text: "" });
        return;
      }
      if (value === "> ") {
        onChange({ type: "quote", text: "" });
        return;
      }
      if (value === "- ") {
        onChange({ type: "bullet-list", items: [""] });
        return;
      }
    }

    onChange({ text: value });
    const trimmed = value.trim();
    const nextQuery = trimmed.startsWith("/") ? trimmed : "";
    setSlashQuery(nextQuery);
    setHighlightedIndex(0);
  }

  function handleTextKeyDown(event) {
    const textarea = textAreaRef.current;
    const value = block.text || "";
    const selectionStart = textarea?.selectionStart ?? 0;
    const selectionEnd = textarea?.selectionEnd ?? 0;
    const atStart = selectionStart === 0 && selectionEnd === 0;
    const atEnd = selectionStart === value.length && selectionEnd === value.length;

    if (slashQuery && matches.length) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((current) => (current + 1) % matches.length);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((current) => (current - 1 + matches.length) % matches.length);
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        onChange(createBlogBlock(matches[highlightedIndex].value));
        setSlashQuery("");
        return;
      }
      if (event.key === "Escape") {
        setSlashQuery("");
        return;
      }
    }

    if (event.key === "Enter" && !event.shiftKey && atEnd) {
      event.preventDefault();
      onCreateAfter("paragraph");
      return;
    }

    if (event.key === "ArrowUp" && atStart) {
      event.preventDefault();
      onNavigate(-1);
      return;
    }

    if (event.key === "ArrowDown" && atEnd) {
      event.preventDefault();
      onNavigate(1);
    }
  }

  switch (block.type) {
    case "heading":
    case "subheading":
    case "paragraph":
    case "quote":
      return (
        <div className="admin-editor-textblock">
          {selected ? (
            <RichTextToolbar
              onBold={() => onWrap("**", "**", "strong text")}
              onItalic={() => onWrap("_", "_", "emphasis")}
              onLink={() => onWrap("[", "](https://example.com)", "link text")}
            />
          ) : null}
          <textarea
            ref={textAreaRef}
            className={`admin-editor-textarea is-${block.type}`}
            rows={block.type === "paragraph" ? 3 : 2}
            value={block.text || ""}
            placeholder={block.type === "paragraph" ? "Type / to choose a block" : `Add ${block.type}`}
            onFocus={onSelect}
            onChange={(event) => handleTextChange(event.target.value)}
            onKeyDown={handleTextKeyDown}
          />
          {selected ? (
            <SlashCommandMenu
              query={slashQuery}
              highlightedIndex={highlightedIndex}
              onHover={setHighlightedIndex}
              onSelect={(type) => {
                onChange(createBlogBlock(type));
                setSlashQuery("");
              }}
            />
          ) : null}
        </div>
      );
    case "callout":
      return (
        <>
          <label className="admin-form-field">
            <span>Tone</span>
            <select value={block.tone || "info"} onChange={(event) => onChange({ tone: event.target.value })}>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
            </select>
          </label>
          <label className="admin-form-field">
            <span>Callout title</span>
            <input value={block.title || ""} onChange={(event) => onChange({ title: event.target.value })} />
          </label>
          <label className="admin-form-field admin-form-field-wide">
            <span>Callout text</span>
            <textarea ref={textAreaRef} rows={4} value={block.text || ""} onChange={(event) => onChange({ text: event.target.value })} />
          </label>
        </>
      );
    case "columns":
      return (
        <>
          <label className="admin-form-field">
            <span>Left column</span>
            <textarea rows={5} value={block.left || ""} onChange={(event) => onChange({ left: event.target.value })} />
          </label>
          <label className="admin-form-field">
            <span>Right column</span>
            <textarea rows={5} value={block.right || ""} onChange={(event) => onChange({ right: event.target.value })} />
          </label>
        </>
      );
    case "bullet-list":
      return (
        <label className="admin-form-field admin-form-field-wide">
          <span>List items, one per line</span>
          <textarea rows={5} value={(block.items || []).join("\n")} onChange={(event) => onChange({ items: event.target.value.split("\n") })} />
        </label>
      );
    case "table":
      return (
        <>
          <label className="admin-form-field admin-form-field-wide">
            <span>Caption</span>
            <input value={block.caption || ""} onChange={(event) => onChange({ caption: event.target.value })} />
          </label>
          <label className="admin-form-field admin-form-field-wide">
            <span>Headers, separated by |</span>
            <input value={joinPipeList(block.headers)} onChange={(event) => onChange({ headers: parsePipeList(event.target.value) })} />
          </label>
          <label className="admin-form-field admin-form-field-wide">
            <span>Rows, one row per line, cells separated by |</span>
            <textarea rows={5} value={joinPipeRows(block.rows)} onChange={(event) => onChange({ rows: parsePipeRows(event.target.value) })} />
          </label>
        </>
      );
    case "embed":
      return (
        <>
          <label className="admin-form-field admin-form-field-wide">
            <span>Embed URL</span>
            <input value={block.url || ""} onChange={(event) => onChange({ url: event.target.value })} />
          </label>
          <label className="admin-form-field admin-form-field-wide">
            <span>Embed title</span>
            <input value={block.title || ""} onChange={(event) => onChange({ title: event.target.value })} />
          </label>
        </>
      );
    case "image":
      return (
        <>
          <label className="admin-form-field admin-form-field-wide">
            <span>Image path</span>
            <input value={block.src || ""} onChange={(event) => onChange({ src: event.target.value })} />
          </label>
          <div className="admin-form-field admin-form-field-wide">
            <span>Upload image</span>
            <MediaDropzone compact label="Drop or choose image" onSelect={({ dataUrl }) => onChange({ src: dataUrl })} />
          </div>
          <label className="admin-form-field">
            <span>Alt text</span>
            <input value={block.alt || ""} onChange={(event) => onChange({ alt: event.target.value })} />
          </label>
          <label className="admin-form-field">
            <span>Caption</span>
            <input value={block.caption || ""} onChange={(event) => onChange({ caption: event.target.value })} />
          </label>
        </>
      );
    case "divider":
    default:
      return <p className="admin-block-note">Divider block adds a visual break in the article body.</p>;
  }
}

function BlogBlockCard({
  block,
  index,
  isFirst,
  isLast,
  onUpdate,
  onMove,
  onRemove,
  onSelect,
  isSelected,
  registerTextRef,
  onCreateAfter,
  onNavigate
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isTextBlock(block.type)) {
      registerTextRef(block.id, textareaRef.current);
      return () => registerTextRef(block.id, null);
    }
    return undefined;
  }, [block.id, block.type, registerTextRef]);

  function wrapSelection(prefix, suffix, placeholder) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const selectionStart = textarea.selectionStart ?? 0;
    const selectionEnd = textarea.selectionEnd ?? 0;
    const value = block.text || "";
    const selectedText = value.slice(selectionStart, selectionEnd) || placeholder;
    const nextValue = `${value.slice(0, selectionStart)}${prefix}${selectedText}${suffix}${value.slice(selectionEnd)}`;

    onUpdate({ text: nextValue });

    window.requestAnimationFrame(() => {
      textarea.focus();
      const caret = selectionStart + prefix.length + selectedText.length + suffix.length;
      textarea.setSelectionRange(caret, caret);
    });
  }

  return (
    <article
      className={`admin-block-card is-${block.type} ${isSelected ? "is-selected" : ""}`}
      onFocusCapture={() => onSelect(block.id)}
      onMouseDown={() => onSelect(block.id)}
    >
      <div className="admin-block-card-head">
        <div className="admin-block-index-wrap">
          <span className="admin-block-index">{getBlockLabel(block.type)} {index + 1}</span>
        </div>

        {isSelected ? (
          <div className="admin-block-actions">
            <button type="button" onClick={() => onMove(-1)} disabled={isFirst}>Up</button>
            <button type="button" onClick={() => onMove(1)} disabled={isLast}>Down</button>
            <button type="button" className="is-danger" onClick={onRemove}>Remove</button>
          </div>
        ) : null}
      </div>

      <div className="admin-form-grid">
        <BlockFields
          block={block}
          onChange={onUpdate}
          onWrap={wrapSelection}
          textAreaRef={textareaRef}
          selected={isSelected}
          onCreateAfter={onCreateAfter}
          onNavigate={onNavigate}
          onSelect={() => onSelect(block.id)}
        />
      </div>
    </article>
  );
}

const BlogBlockEditor = forwardRef(function BlogBlockEditor({ blocks, onChange, selectedBlockId, onSelectionChange }, ref) {
  const [rootInserterToken, setRootInserterToken] = useState(0);
  const textRefs = useRef({});

  useImperativeHandle(ref, () => ({
    openInserter() {
      setRootInserterToken((value) => value + 1);
    },
    focusBlock(blockId) {
      const element = textRefs.current[blockId];
      if (element) {
        element.focus();
      }
    }
  }));

  function registerTextRef(blockId, node) {
    if (node) {
      textRefs.current[blockId] = node;
    } else {
      delete textRefs.current[blockId];
    }
  }

  function updateBlock(blockId, patch) {
    onChange(blocks.map((block) => (block.id === blockId ? { ...block, ...patch } : block)));
  }

  function replaceBlock(blockId, nextBlock) {
    onChange(blocks.map((block) => (block.id === blockId ? { ...nextBlock, id: blockId } : block)));
  }

  function moveBlock(blockId, direction) {
    const index = blocks.findIndex((block) => block.id === blockId);
    if (index < 0) return;
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= blocks.length) return;
    const nextBlocks = [...blocks];
    const [item] = nextBlocks.splice(index, 1);
    nextBlocks.splice(nextIndex, 0, item);
    onChange(nextBlocks);
  }

  function removeBlock(blockId) {
    const nextBlocks = blocks.filter((block) => block.id !== blockId);
    const fallbackBlocks = nextBlocks.length ? nextBlocks : [createBlogBlock("paragraph")];
    onChange(fallbackBlocks);
    const nextSelectedId = fallbackBlocks[0]?.id || "";
    onSelectionChange?.(nextSelectedId);
    window.requestAnimationFrame(() => {
      const node = textRefs.current[nextSelectedId];
      if (node) node.focus();
    });
  }

  function addBlock(type) {
    const nextBlock = createBlogBlock(type);
    const nextBlocks = [...blocks, nextBlock];
    onChange(nextBlocks);
    onSelectionChange?.(nextBlock.id);
    window.requestAnimationFrame(() => {
      const node = textRefs.current[nextBlock.id];
      if (node) node.focus();
    });
  }

  function insertBlock(type, index) {
    const nextBlocks = [...blocks];
    const nextBlock = createBlogBlock(type);
    nextBlocks.splice(index, 0, nextBlock);
    onChange(nextBlocks);
    onSelectionChange?.(nextBlock.id);
    window.requestAnimationFrame(() => {
      const node = textRefs.current[nextBlock.id];
      if (node) node.focus();
    });
  }

  function createParagraphAfter(blockId) {
    const index = blocks.findIndex((block) => block.id === blockId);
    if (index < 0) return;
    insertBlock("paragraph", index + 1);
  }

  function navigateFrom(blockId, direction) {
    const index = blocks.findIndex((block) => block.id === blockId);
    if (index < 0) return;
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= blocks.length) return;
    const nextId = blocks[nextIndex].id;
    onSelectionChange?.(nextId);
    window.requestAnimationFrame(() => {
      const node = textRefs.current[nextId];
      if (node) node.focus();
    });
  }

  return (
    <div className="admin-block-editor">
      <InlineBlockInserter onAdd={addBlock} openToken={rootInserterToken} />

      <div className="admin-block-stack">
        {blocks.map((block, index) => (
          <div key={block.id} className="admin-block-stack-item">
            <BlogBlockCard
              block={block}
              index={index}
              isFirst={index === 0}
              isLast={index === blocks.length - 1}
              isSelected={selectedBlockId === block.id}
              registerTextRef={registerTextRef}
              onUpdate={(patch) => {
                if (patch.id || patch.type) {
                  replaceBlock(block.id, patch);
                  onSelectionChange?.(block.id);
                  return;
                }
                updateBlock(block.id, patch);
              }}
              onMove={(direction) => moveBlock(block.id, direction)}
              onRemove={() => removeBlock(block.id)}
              onSelect={(blockId) => onSelectionChange?.(blockId)}
              onCreateAfter={() => createParagraphAfter(block.id)}
              onNavigate={(direction) => navigateFrom(block.id, direction)}
            />
            <InlineBlockInserter onAdd={(type) => insertBlock(type, index + 1)} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default BlogBlockEditor;
