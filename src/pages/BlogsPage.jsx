import { motion } from "framer-motion";
import { useState } from "react";
import LegacyBlogShowcase from "../components/blog/LegacyBlogShowcase";
import { LegacyFooter, LegacyNav, LegacyTopStrip } from "../components/layout/LegacySiteChrome";
import SeoHead from "../components/layout/SeoHead";
import { legacyBlogs } from "../data/legacyBundleData";
import { SITE_NAME, makeAbsoluteUrl } from "../config/site";

function BlogsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Admission Blogs and NEET Guidance Updates 2026",
    url: makeAbsoluteUrl("/blogs"),
    about: legacyBlogs.map((blog) => blog.title)
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
      <section className="legacy-blog-list-banner">
        <div className="legacy-blog-list-banner-media">
          <img src="/image/outer_blog_2.webp" alt="Admission blog updates" />
        </div>
        <div className="legacy-blog-list-banner-overlay" />
        <div className="legacy-container legacy-blog-list-banner-inner">
          <motion.div
            className="legacy-blog-list-banner-copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="legacy-blog-list-banner-kicker">Blog Updates</p>
            <h1>Admission blog</h1>
            <p>
              Practical reads on NEET counseling, college comparison, MBBS pathways, and
              admission decisions for students and parents.
            </p>
          </motion.div>
        </div>
      </section>
      <motion.div
        className="legacy-container"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
      >
        <div className="legacy-blog-list-pill">Home / Blogs / Admission blog</div>
      </motion.div>
      <LegacyBlogShowcase pageMode hidePageHeader />
      <LegacyFooter />
    </div>
  );
}

export default BlogsPage;
