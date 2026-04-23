function BlogFaqEditor({ items, onChange }) {
  function updateItem(index, patch) {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  return (
    <div className="admin-faq-editor">
      <div className="admin-picker-head">
        <strong>FAQ schema</strong>
        <span>Used for rich snippets and post detail.</span>
      </div>

      <div className="admin-faq-list">
        {items.map((item, index) => (
          <div key={item.id || index} className="admin-faq-item">
            <label className="admin-form-field admin-form-field-wide">
              <span>Question</span>
              <input value={item.question} onChange={(event) => updateItem(index, { question: event.target.value })} />
            </label>
            <label className="admin-form-field admin-form-field-wide">
              <span>Answer</span>
              <textarea rows="3" value={item.answer} onChange={(event) => updateItem(index, { answer: event.target.value })} />
            </label>
            <button
              type="button"
              className="admin-inline-link"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="admin-gutenberg-toolbar-button"
        onClick={() => onChange([...items, { id: `faq-${Date.now()}`, question: "", answer: "" }])}
      >
        Add FAQ
      </button>
    </div>
  );
}

export default BlogFaqEditor;
