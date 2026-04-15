import { motion } from "framer-motion";
import { CalendarDays, ChevronRight, MessageCircle, Phone, User2 } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { LegacyFooter, LegacyNav, LegacyTopStrip } from "../components/layout/LegacySiteChrome";
import SeoHead from "../components/layout/SeoHead";
import { findLegacyBlogBySlug, legacyBlogs } from "../data/legacyBundleData";
import { CONTACT_PHONE, SITE_NAME, makeAbsoluteUrl } from "../config/site";
import { buildWhatsAppUrl } from "../utils/enquiry";
import { cardHover, pageReveal, sectionReveal, staggerContainer, staggerItem } from "../utils/motion";

function BlogArticlePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { slug = "" } = useParams();
  const blog = findLegacyBlogBySlug(slug);

  if (!blog) {
    return <Navigate to="/blogs" replace />;
  }

  const relatedBlogs = legacyBlogs.filter((entry) => entry.slug !== blog.slug).slice(0, 3);
  const categoryBlogs = legacyBlogs
    .filter((entry) => entry.tag === blog.tag && entry.slug !== blog.slug)
    .slice(0, 3);
  const articleSections = blog.sections.map((section, index) => ({
    ...section,
    id: `section-${index + 1}`,
    number: String(index + 1).padStart(2, "0")
  }));
  const whatsappUrl = buildWhatsAppUrl(CONTACT_PHONE, `Blog enquiry: ${blog.title}`);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.date,
    image: makeAbsoluteUrl(blog.image),
    mainEntityOfPage: makeAbsoluteUrl(`/blogs/${blog.slug}`),
    author: {
      "@type": "Organization",
      name: SITE_NAME
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME
    }
  };

  return (
    <div className="legacy-page legacy-blog-article-page">
      <SeoHead
        title={blog.title}
        description={blog.excerpt}
        canonicalPath={`/blogs/${blog.slug}`}
        image={blog.image}
        type="article"
        keywords={[
          blog.tag,
          "medical admission blog",
          "MBBS counseling guidance",
          "medical college strategy"
        ]}
        schema={articleSchema}
      />
      <LegacyTopStrip />
      <LegacyNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <motion.section className="legacy-blog-banner" variants={pageReveal} initial="hidden" animate="show">
        <div className="legacy-blog-banner-media">
          <img src={blog.image} alt={blog.title} />
        </div>
        <div className="legacy-blog-banner-overlay" />
        <div className="legacy-container legacy-blog-banner-inner">
          <motion.div
            className="legacy-blog-banner-copy"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.span
              className={`legacy-blog-tag legacy-blog-tag-${blog.tag.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              variants={staggerItem}
            >
              {blog.tag}
            </motion.span>
            <motion.h1 variants={staggerItem}>{blog.title}</motion.h1>
          </motion.div>
        </div>
      </motion.section>

      <section className="legacy-blog-article-shell">
        <div className="legacy-container">
          <motion.nav
            className="legacy-blog-breadcrumbs"
            aria-label="Breadcrumb"
            variants={sectionReveal}
            initial="hidden"
            animate="show"
          >
            <Link to="/">Home</Link>
            <ChevronRight size={16} />
            <Link to="/blogs">Blogs</Link>
            <ChevronRight size={16} />
            <span>{blog.title}</span>
          </motion.nav>

          <motion.div className="legacy-blog-publication-layout" variants={staggerContainer} initial="hidden" animate="show">
            <motion.div
              className="legacy-blog-publication-main"
              variants={staggerItem}
            >
              <article className="legacy-blog-publication-card">
                <div className="legacy-blog-publication-header">
                  <div className="legacy-blog-publication-meta">
                    <span>
                      <User2 size={18} />
                      BalaJi Editorial Desk
                    </span>
                    <span>
                      <CalendarDays size={18} />
                      {blog.date}
                    </span>
                    <span>
                      <MessageCircle size={18} />
                      {blog.meta}
                    </span>
                  </div>
                </div>

                <div className="legacy-blog-publication-cover">
                  <img src={blog.image} alt={blog.title} />
                </div>

                <div className="legacy-blog-publication-content">
                  <p className="legacy-blog-article-intro">{blog.intro}</p>

                  {articleSections.map((section) => (
                    <motion.section
                      key={section.heading}
                      id={section.id}
                      className="legacy-blog-article-section"
                      variants={staggerItem}
                      whileInView="show"
                      initial="hidden"
                      viewport={{ once: true, amount: 0.3 }}
                      whileHover={cardHover}
                    >
                      <div className="legacy-blog-article-section-marker">{section.number}</div>
                      <h2>{section.heading}</h2>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </motion.section>
                  ))}
                </div>
              </article>
            </motion.div>

            <aside className="legacy-blog-publication-sidebar">
              <motion.div
                className="legacy-blog-sidebar-card"
                variants={staggerItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={cardHover}
              >
                <h3>Recent Articles</h3>
                <div className="legacy-blog-sidebar-list">
                  {relatedBlogs.map((entry) => (
                    <Link key={entry.slug} to={`/blogs/${entry.slug}`} className="legacy-blog-sidebar-link">
                      <strong>{entry.title}</strong>
                      <span>{entry.date}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="legacy-blog-sidebar-card"
                variants={staggerItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={cardHover}
              >
                <h3>Category</h3>
                <div className="legacy-blog-category-card">
                  <span
                    className={`legacy-blog-tag legacy-blog-tag-${blog.tag.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  >
                    {blog.tag}
                  </span>
                  <p>More reads in {blog.tag} for students and parents planning admission decisions.</p>
                  {categoryBlogs.length ? (
                    <div className="legacy-blog-sidebar-list">
                      {categoryBlogs.map((entry) => (
                        <Link
                          key={entry.slug}
                          to={`/blogs/${entry.slug}`}
                          className="legacy-blog-sidebar-link"
                        >
                          <strong>{entry.title}</strong>
                          <span>{entry.date}</span>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.div>

              <motion.div
                className="legacy-blog-sidebar-card"
                variants={staggerItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={cardHover}
              >
                <h3>Admissions Desk</h3>
                <p className="legacy-blog-sidebar-copy">
                  Need help after reading? Talk to the admissions desk for shortlist review and
                  counseling guidance.
                </p>
                <a href={whatsappUrl} className="legacy-blog-sidebar-cta" target="_blank" rel="noreferrer">
                  <Phone size={18} />
                  Talk on WhatsApp
                </a>
              </motion.div>

              <motion.div
                className="legacy-blog-sidebar-card"
                variants={staggerItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={cardHover}
              >
                <h3>Article Takeaways</h3>
                <ul className="legacy-blog-takeaway-list">
                  {blog.takeaways.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            </aside>
          </motion.div>
        </div>
      </section>

      <LegacyFooter />
    </div>
  );
}

export default BlogArticlePage;
