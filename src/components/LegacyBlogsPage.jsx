import { useState } from "react";
import { LegacyFooter, LegacyNav } from "./LegacySiteChrome";
import LegacyBlogShowcase from "./LegacyBlogShowcase";

function LegacyBlogsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="legacy-page">
      <LegacyNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <LegacyBlogShowcase pageMode />
      <LegacyFooter />
    </div>
  );
}

export default LegacyBlogsPage;
