import { useState } from "react";
import LegacyBlogShowcase from "../components/blog/LegacyBlogShowcase";
import { LegacyFooter, LegacyNav } from "../components/layout/LegacySiteChrome";
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
      <LegacyNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <LegacyBlogShowcase pageMode />
      <LegacyFooter />
    </div>
  );
}

export default BlogsPage;
