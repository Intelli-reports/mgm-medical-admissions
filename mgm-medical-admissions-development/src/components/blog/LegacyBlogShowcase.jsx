// src/components/blog/LegacyBlogShowcase.jsx
import { Link, useNavigate } from "react-router-dom";
import { legacyBlogs } from "../../data/legacyBundleData"; 

function blogTagClass(tag) {
  return `legacy-blog-tag legacy-blog-tag-${tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;
}

function BlogCard({ blog, index }) {
  const navigate = useNavigate();

  return (
    <article className="legacy-blog-card">
      <div className="legacy-blog-image-wrap">
        <img src={blog.image} alt={blog.title} />
        <span className={blogTagClass(blog.tag)}>{blog.tag}</span>
      </div>

      <div className="legacy-blog-body">
        <h4>{blog.title}</h4>
        <p className="legacy-blog-meta">
          {blog.date} • {blog.meta}
        </p>
        <p className="legacy-blog-excerpt">{blog.excerpt.substring(0, 100)}...</p>
        <button 
          className="legacy-readmore-btn"
          onClick={() => navigate(`/blog/${index}`)}
        >
          Read More →
        </button>
      </div>
    </article>
  );
}

function LegacyBlogShowcase({ pageMode = false }) {
  const blogs = legacyBlogs.slice(0, 9);

  return (
    <section className={pageMode ? "legacy-blog-page" : "legacy-blogs"}>
      <div className="legacy-container">
        <div className="legacy-section-heading">
          <p className="legacy-section-sub">
            {pageMode ? "Blog Updates" : "Latest Articles"}
          </p>

          <h2>
            {pageMode
              ? "Admission blog"
              : "Admission guidance, updates, and strategy reads"}
          </h2>

          <p>
            Explore practical reads for students and parents navigating NEET
            counseling, college comparison, and admission decision-making.
          </p>

          {!pageMode ? <Link to="/blogs">View all articles</Link> : null}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px",
          }}
        >
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LegacyBlogShowcase;