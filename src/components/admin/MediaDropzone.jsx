import { useRef, useState } from "react";

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Unable to read file."));
    reader.readAsDataURL(file);
  });
}

function MediaDropzone({ label = "Drop image here", onSelect, compact = false }) {
  const inputRef = useRef(null);
  const [isOver, setIsOver] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(fileList) {
    const file = fileList?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are supported.");
      return;
    }

    setError("");
    const dataUrl = await fileToDataUrl(file);
    onSelect({
      name: file.name,
      dataUrl
    });
  }

  return (
    <div className={`admin-media-dropzone ${compact ? "is-compact" : ""} ${isOver ? "is-over" : ""}`}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => handleFiles(event.target.files)}
      />
      <button
        type="button"
        className="admin-media-dropzone-button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsOver(false);
          handleFiles(event.dataTransfer.files);
        }}
      >
        {label}
      </button>
      {error ? <p className="admin-media-dropzone-error">{error}</p> : null}
    </div>
  );
}

export default MediaDropzone;
