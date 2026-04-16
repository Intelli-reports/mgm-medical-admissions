import { useMemo, useState } from "react";
import MediaDropzone from "./MediaDropzone";

function MediaLibraryPicker({ mediaItems, onUpload, onSelect, selectedMediaId }) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return mediaItems;
    return mediaItems.filter((item) => `${item.label} ${item.alt} ${item.caption}`.toLowerCase().includes(normalized));
  }, [mediaItems, query]);

  return (
    <div className="admin-picker-panel">
      <div className="admin-picker-head">
        <strong>Media library</strong>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search media"
        />
      </div>

      <MediaDropzone label="Upload to library" onSelect={onUpload} compact />

      <div className="admin-media-library-grid">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`admin-media-library-item ${selectedMediaId === item.id ? "is-active" : ""}`}
            onClick={() => onSelect(item)}
          >
            <img src={item.path} alt={item.alt || item.label} />
            <strong>{item.label}</strong>
            <span>{item.alt || item.caption || "No alt/caption yet"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MediaLibraryPicker;
