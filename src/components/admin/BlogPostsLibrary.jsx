import { FilePlus2, Trash2 } from "lucide-react";

function StatusChip({ value }) {
  return <span className={`admin-status-chip is-${String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{value}</span>;
}

function BlogPostsLibrary({ blogs, searchQuery, onOpenNew, onOpenEdit, onDeleteBlog }) {
  return (
    <section className="admin-blog-library-screen">
      <div className="admin-blog-library-bar">
        <div>
          <p className="admin-topbar-kicker">Blog Studio</p>
          <h2>All posts</h2>
          <p className="admin-blog-library-copy">
            {searchQuery ? `Filtered by "${searchQuery}"` : "Manage published posts and drafts."}
          </p>
        </div>
        <button type="button" className="admin-primary-button" onClick={onOpenNew}>
          <FilePlus2 size={16} /> New blog
        </button>
      </div>

      <div className="admin-blog-library-list admin-card">
        {blogs.length ? (
          blogs.map((blog) => (
            <article key={blog.id} className="admin-blog-library-row">
              <button type="button" className="admin-blog-library-main" onClick={() => onOpenEdit(blog)}>
                <strong>{blog.title}</strong>
                <span>{blog.slug}</span>
              </button>
              <div className="admin-blog-library-meta">
                {blog.featured ? <StatusChip value="featured" /> : null}
                <StatusChip value={blog.status} />
              </div>
              <button type="button" className="admin-inline-link is-danger" onClick={() => onDeleteBlog(blog.id)}>
                <Trash2 size={14} /> Delete
              </button>
            </article>
          ))
        ) : (
          <div className="admin-empty-state">
            <strong>No blog records found</strong>
            <p>Create a new blog to open the editor.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogPostsLibrary;
