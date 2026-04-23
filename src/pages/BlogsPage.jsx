import { motion } from "framer-motion";
import { useState } from "react";
import { getPublishedBlogsSync } from "../admin/api-blogs";
import LegacyBlogShowcase from "../components/blog/LegacyBlogShowcase";
import { LegacyFooter, LegacyNav, LegacyTopStrip } from "../components/layout/LegacySiteChrome";
import SeoHead from "../components/layout/SeoHead";
import { SITE_NAME, makeAbsoluteUrl } from "../config/site";
import { bannerReveal, headlineReveal, sectionReveal, staggerContainer, staggerItem } from "../utils/motion";

function BlogsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const blogs = getPublishedBlogsSync();
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Admission Blogs and NEET Guidance Updates 2026",
    url: makeAbsoluteUrl("/blogs"),
    about: blogs.map((blog) => blog.title)
  };

  return (
    <div className="legacy-page">
      <SeoHead
        title="Admission Blogs, NEET Updates and Counseling Articles"
        description="Read NEET counseling strategy, MBBS admission updates, college comparison advice, and practical guidance for students and parents."
        canonicalPath="/blogs"
        keywords={[
          "NEET blogs",
          "MBBS admission articles",
          "medical college comparison",
          "counseling updates"
        ]}
        schema={blogSchema}
      />
      <LegacyTopStrip />
      <LegacyNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <motion.section className="legacy-blog-list-banner" variants={bannerReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
        <div className="legacy-blog-list-banner-media">
          <img
            src="/image/outer_blog_2.webp"
            srcSet="/image/outer_blog_2-480w.webp 480w, /image/outer_blog_2-800w.webp 800w, /image/outer_blog_2.webp 1200w"
            sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
            alt="Admission blog updates"
            fetchpriority="high"
            decoding="async"
          />
        </div>
        <div className="legacy-blog-list-banner-overlay" />
        <div className="legacy-container legacy-blog-list-banner-inner">
          <motion.div
            className="legacy-blog-list-banner-copy"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p className="legacy-blog-list-banner-kicker" variants={staggerItem}>
              Blog Updates
            </motion.p>
            <motion.h1 variants={headlineReveal}>Admission blog</motion.h1>
            <motion.p variants={staggerItem}>
              Practical reads on NEET counseling, college comparison, MBBS pathways, and
              admission decisions for students and parents.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
      <motion.div
        className="legacy-container"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="legacy-blog-list-pill">Home / Blogs / Admission blog</div>
      </motion.div>
      <LegacyBlogShowcase pageMode hidePageHeader />
      <LegacyFooter />
    </div>
  );
}

export default BlogsPage;
