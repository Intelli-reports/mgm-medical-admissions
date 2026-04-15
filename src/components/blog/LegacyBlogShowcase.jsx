import { Link } from "react-router-dom";
import { legacyBlogs } from "../../data/legacyBundleData";

function blogTagClass(tag) {
  return `legacy-blog-tag legacy-blog-tag-${tag.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function BlogSideCard({ blog }) {
  return (
    <article className="legacy-blog-side-card">
      <Link to="/blogs">
        <div className="legacy-blog-image-wrap">
          <img src={blog.image} alt={blog.title} />
          <span className={blogTagClass(blog.tag)}>{blog.tag}</span>
        </div>
        <div className="legacy-blog-body">
          <h4>{blog.title}</h4>
          <p className="legacy-blog-meta">
            {blog.date} &bull; {blog.meta}
          </p>
        </div>
      </Link>
    </article>
  );
}

function LegacyBlogShowcase({ pageMode = false }) {
  const [featuredBlog, ...sideBlogs] = legacyBlogs;
  const leftBlogs = sideBlogs.slice(0, 2);
  const rightBlogs = sideBlogs.slice(2, 4);

  return (
    <section className={pageMode ? "legacy-blog-page" : "legacy-blogs"}>
      <div className="legacy-container">
        <div className="legacy-section-heading">
          <p className="legacy-section-sub">{pageMode ? "Blog Updates" : "Latest Articles"}</p>
          <h2>{pageMode ? "Admission blog" : "Admission guidance, updates, and strategy reads"}</h2>
          <p>
            Explore practical reads for students and parents navigating NEET counseling,
            college comparison, and admission decision-making.
          </p>
          {!pageMode ? <Link to="/blogs">View all articles</Link> : null}
        </div>

        <div className="legacy-blog-editorial-grid">
          <div className="legacy-blog-stack">
            {leftBlogs.map((blog) => (
              <BlogSideCard key={blog.title} blog={blog} />
            ))}
          </div>

          <article className="legacy-blog-feature">
            <Link to="/blogs">
              <div className="legacy-blog-image-wrap">
                <img src={featuredBlog.image} alt={featuredBlog.title} />
                <span className={blogTagClass(featuredBlog.tag)}>{featuredBlog.tag}</span>
              </div>
              <div className="legacy-blog-body">
                <h3>{featuredBlog.title}</h3>
                <p className="legacy-blog-meta">
                  {featuredBlog.date} &bull; {featuredBlog.meta}
                </p>
                <p>{featuredBlog.excerpt}</p>
              </div>
            </Link>
          </article>

          <div className="legacy-blog-stack">
            {rightBlogs.map((blog) => (
              <BlogSideCard key={blog.title} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LegacyBlogShowcase;
