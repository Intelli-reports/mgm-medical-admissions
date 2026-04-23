import { motion } from "framer-motion";
import { CalendarDays, ChevronRight, MessageCircle, Phone, User2 } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getPublishedBlogBySlugSync, getPublishedBlogsSync } from "../admin/api-blogs";
import BlogContentBlocks from "../components/blog/BlogContentBlocks";
import BlogHtmlContent from "../components/blog/BlogHtmlContent";
import { LegacyFooter, LegacyNav, LegacyTopStrip } from "../components/layout/LegacySiteChrome";
import SeoHead from "../components/layout/SeoHead";
import { CONTACT_PHONE, SITE_NAME, makeAbsoluteUrl } from "../config/site";
import { buildWhatsAppUrl } from "../utils/enquiry";
import { bannerReveal, headlineReveal, sectionReveal, staggerContainer, staggerItem } from "../utils/motion";

function BlogArticlePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { slug = "" } = useParams();
  const blog = getPublishedBlogBySlugSync(slug);
  const legacyBlogs = getPublishedBlogsSync();

  if (!blog) {
    return <Navigate to="/blogs" replace />;
  }

  const relatedBlogs = legacyBlogs.filter((entry) => entry.slug !== blog.slug).slice(0, 3);
  const curatedRelatedBlogs = (blog.relatedBlogIds || [])
    .map((id) => legacyBlogs.find((entry) => entry.id === id))
    .filter(Boolean);
  const categoryBlogs = legacyBlogs
    .filter((entry) => entry.tag === blog.tag && entry.slug !== blog.slug)
    .slice(0, 3);
  const sidebarRelatedBlogs = curatedRelatedBlogs.length ? curatedRelatedBlogs : relatedBlogs;
  const whatsappUrl = buildWhatsAppUrl(CONTACT_PHONE, `Blog enquiry: ${blog.title}`);
  const canonicalPath = blog.canonicalUrl || `/blogs/${blog.slug}`;
  const articleSchema = [
    {
      "@type": "BlogPosting",
      headline: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.excerpt,
      datePublished: blog.publishAt || blog.date,
      image: makeAbsoluteUrl(blog.image),
      mainEntityOfPage: makeAbsoluteUrl(canonicalPath),
      author: {
        "@type": "Person",
        name: blog.author || SITE_NAME
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME
      }
    }
  ];

  if (blog.faqItems?.length) {
    articleSchema.push({
      "@type": "FAQPage",
      mainEntity: blog.faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    });
  }

  return (
    <div className="legacy-page legacy-blog-article-page">
      <SeoHead
        title={blog.title}
        description={blog.seoDescription || blog.excerpt}
        canonicalPath={canonicalPath}
        image={blog.image}
        type="article"
        keywords={[
          ...(blog.categories || []),
          ...(blog.tags || []),
          "medical admission blog",
          "MBBS counseling guidance",
          "medical college strategy"
        ]}
        schema={articleSchema}
      />
      <LegacyTopStrip />
      <LegacyNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <motion.section className="legacy-blog-banner" variants={bannerReveal} initial="hidden" animate="show">
        <div className="legacy-blog-banner-media">
          <img
            src={blog.image}
            alt={blog.featuredImage?.alt || blog.title}
            style={{ objectPosition: `${blog.featuredImage?.focalX ?? 50}% ${blog.featuredImage?.focalY ?? 50}%` }}
            fetchpriority="high"
            decoding="async"
          />
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
            <motion.h1 variants={headlineReveal}>{blog.title}</motion.h1>
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
                      {blog.author || "BalaJi Editorial Desk"}
                    </span>
                    <span>
                      <CalendarDays size={18} />
                      {blog.date}
                    </span>
                    <span>
                      <MessageCircle size={18} />
                      {blog.readingTime} min read
                    </span>
                  </div>
                </div>

                <div className="legacy-blog-publication-cover">
                  <img
                    src={blog.image}
                    alt={blog.featuredImage?.alt || blog.title}
                    style={{ objectPosition: `${blog.featuredImage?.focalX ?? 50}% ${blog.featuredImage?.focalY ?? 50}%` }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="legacy-blog-publication-content">
                  {blog.contentHtml ? <BlogHtmlContent html={blog.contentHtml} /> : <BlogContentBlocks blocks={blog.contentBlocks || []} />}
                  {blog.cta?.title || blog.cta?.text ? (
                    <div className="legacy-blog-inline-cta">
                      {blog.cta.title ? <h3>{blog.cta.title}</h3> : null}
                      {blog.cta.text ? <p>{blog.cta.text}</p> : null}
                      {blog.cta.buttonLabel && blog.cta.buttonUrl ? (
                        <a href={blog.cta.buttonUrl} target="_blank" rel="noreferrer">
                          {blog.cta.buttonLabel}
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                  {blog.faqItems?.length ? (
                    <div className="legacy-blog-faq-panel">
                      <h3>Frequently asked questions</h3>
                      <div className="legacy-blog-faq-list">
                        {blog.faqItems.map((item) => (
                          <details key={item.id} className="legacy-blog-faq-item">
                            <summary>{item.question}</summary>
                            <p>{item.answer}</p>
                          </details>
                        ))}
                      </div>
                    </div>
                  ) : null}
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
                  {sidebarRelatedBlogs.map((entry) => (
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
