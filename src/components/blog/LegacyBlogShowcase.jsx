import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPublishedBlogsSync } from "../../admin/api";
import { cardHover, headlineReveal, sectionReveal, staggerContainer, staggerItem } from "../../utils/motion";

function blogTagClass(tag) {
  return `legacy-blog-tag legacy-blog-tag-${tag.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function BlogRowCard({ blog, delay = 0, featured = false }) {
  return (
    <motion.article
      className={`legacy-blog-row-card ${featured ? "is-featured" : ""}`}
      variants={staggerItem}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
      whileHover={cardHover}
    >
      <Link to={`/blogs/${blog.slug}`}>
        <div className="legacy-blog-image-wrap">
          <img
            src={blog.image}
            srcSet={blog.image.replace(".webp", "-480w.webp") + " 480w, " + blog.image + " 800w"}
            sizes="(max-width: 480px) 480px, 400px"
            alt={blog.title}
            loading="lazy"
            decoding="async"
          />
          <span className={blogTagClass(blog.tag)}>{blog.tag}</span>
          <div className="legacy-blog-image-overlay" />
        </div>
        <div className="legacy-blog-body">
          {featured ? <span className="legacy-blog-feature-kicker">Featured article</span> : null}
          <h4>{blog.title}</h4>
          <p className="legacy-blog-meta">
            {blog.date} &bull; {blog.meta}
          </p>
          <p className="legacy-blog-excerpt">{blog.excerpt}</p>
          <span className="legacy-blog-readmore">Read article</span>
        </div>
      </Link>
    </motion.article>
  );
}

function LegacyBlogShowcase({ pageMode = false, hidePageHeader = false }) {
  const blogs = getPublishedBlogsSync();

  return (
    <section className={pageMode ? "legacy-blog-page" : "legacy-blogs"}>
      <div className="legacy-container">
        {!(pageMode && hidePageHeader) ? (
          <motion.div
            className="legacy-section-heading"
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="legacy-section-sub">{pageMode ? "Blog Updates" : "Latest Articles"}</p>
            {pageMode ? <motion.h2 variants={headlineReveal}>Admission blog</motion.h2> : null}
            {!pageMode ? <Link to="/blogs">View all articles</Link> : null}
          </motion.div>
        ) : null}

        <motion.div className="legacy-blog-list" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
          {blogs.map((blog, index) => (
            <BlogRowCard
              key={blog.title}
              blog={blog}
              featured={index === 0}
              delay={0.04 * index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default LegacyBlogShowcase;
