function getBlockLabel(block) {
  if (block.type === "paragraph") {
    return block.text?.trim() || "Paragraph";
  }
  if (block.type === "heading" || block.type === "subheading" || block.type === "quote") {
    return block.text?.trim() || block.type;
  }
  if (block.type === "callout") {
    return block.title?.trim() || "Callout";
  }
  return block.type;
}

function BlogBlockListView({ blocks, selectedBlockId, onSelect, onReorder }) {
  return (
    <aside className="admin-editor-listview">
      <div className="admin-editor-listview-head">
        <strong>List View</strong>
      </div>
      <div className="admin-editor-listview-items">
        {blocks.map((block, index) => (
          <button
            key={block.id}
            type="button"
            draggable
            className={`admin-editor-listview-item ${selectedBlockId === block.id ? "is-active" : ""}`}
            onClick={() => onSelect(block.id)}
            onDragStart={(event) => event.dataTransfer.setData("text/plain", block.id)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              const draggedId = event.dataTransfer.getData("text/plain");
              if (draggedId && draggedId !== block.id) {
                onReorder(draggedId, block.id);
              }
            }}
          >
            <span>{index + 1}</span>
            <strong>{getBlockLabel(block)}</strong>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default BlogBlockListView;
