import { useState } from "react";
import LegacyBlogShowcase from "../components/blog/LegacyBlogShowcase";
import { LegacyFooter, LegacyNav } from "../components/layout/LegacySiteChrome";

function BlogsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="legacy-page">
      <LegacyNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <LegacyBlogShowcase pageMode />
      <LegacyFooter />
    </div>
  );
}

export default BlogsPage;
