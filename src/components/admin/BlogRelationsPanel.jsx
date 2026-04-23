function BlogRelationsPanel({ blogs, selectedIds, onChange }) {
  const selectedSet = new Set(selectedIds);

  return (
    <div className="admin-picker-panel">
      <div className="admin-picker-head">
        <strong>Related posts</strong>
        <span>Choose posts to recommend below the article.</span>
      </div>

      <div className="admin-related-list">
        {blogs.map((blog) => (
          <label key={blog.id} className="admin-related-item">
            <input
              type="checkbox"
              checked={selectedSet.has(blog.id)}
              onChange={(event) =>
                onChange(
                  event.target.checked
                    ? [...selectedIds, blog.id]
                    : selectedIds.filter((item) => item !== blog.id)
                )
              }
            />
            <span>{blog.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default BlogRelationsPanel;
