import MediaDropzone from "./MediaDropzone";

function parsePipeList(value) {
  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parsePipeRows(value) {
  return value
    .split("\n")
    .map((row) => parsePipeList(row))
    .filter((row) => row.length);
}

function joinPipeList(items) {
  return (items || []).join(" | ");
}

function joinPipeRows(rows) {
  return (rows || []).map((row) => row.join(" | ")).join("\n");
}

function BlogBlockInspector({ block, onChange }) {
  if (!block) {
    return <p className="admin-block-note">Select a block in the canvas to edit its settings.</p>;
  }

  switch (block.type) {
    case "heading":
    case "subheading":
    case "paragraph":
    case "quote":
      return (
        <label className="admin-form-field admin-form-field-wide">
          <span>Content</span>
          <textarea rows={block.type === "paragraph" ? 6 : 4} value={block.text || ""} onChange={(event) => onChange({ text: event.target.value })} />
        </label>
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
            <span>Title</span>
            <input value={block.title || ""} onChange={(event) => onChange({ title: event.target.value })} />
          </label>
          <label className="admin-form-field admin-form-field-wide">
            <span>Text</span>
            <textarea rows={4} value={block.text || ""} onChange={(event) => onChange({ text: event.target.value })} />
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
          <textarea rows={6} value={(block.items || []).join("\n")} onChange={(event) => onChange({ items: event.target.value.split("\n") })} />
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
            <span>Headers</span>
            <input value={joinPipeList(block.headers)} onChange={(event) => onChange({ headers: parsePipeList(event.target.value) })} />
          </label>
          <label className="admin-form-field admin-form-field-wide">
            <span>Rows</span>
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
            <span>Title</span>
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
      return <p className="admin-block-note">Divider blocks do not have additional settings.</p>;
  }
}

export default BlogBlockInspector;
