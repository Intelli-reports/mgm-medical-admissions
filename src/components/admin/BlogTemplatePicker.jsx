import { BLOG_TEMPLATES } from "../../admin/blogTemplates";

function BlogTemplatePicker({ activeTemplateKey, onApplyTemplate }) {
  return (
    <div className="admin-picker-panel">
      <div className="admin-picker-head">
        <strong>Templates</strong>
        <span>Starter structures for common blog types.</span>
      </div>

      <div className="admin-template-list">
        {BLOG_TEMPLATES.map((template) => (
          <button
            key={template.key}
            type="button"
            className={`admin-template-item ${activeTemplateKey === template.key ? "is-active" : ""}`}
            onClick={() => onApplyTemplate(template)}
          >
            <strong>{template.label}</strong>
            <span>{template.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default BlogTemplatePicker;
