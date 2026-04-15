import { useState } from "react";
import { LegacyFooter, LegacyNav } from "../components/layout/LegacySiteChrome";
import SeoHead from "../components/layout/SeoHead";
import { termsSections } from "../data/site/trust";
import { SITE_NAME, makeAbsoluteUrl } from "../config/site";

function TermsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Terms and Conditions | ${SITE_NAME}`,
    url: makeAbsoluteUrl("/terms-and-conditions")
  };

  return (
    <div className="legacy-page">
      <SeoHead
        title="Terms & Conditions"
        description="Read the BalaJi Admission Guidance website terms and conditions for counseling content, information use, and contact details."
        canonicalPath="/terms-and-conditions"
        schema={schema}
      />
      <LegacyNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <section className="legacy-contact-hero legacy-generic-hero">
        <div className="legacy-contact-overlay" />
        <div className="legacy-container legacy-contact-copy">
          <h1>Terms &amp; Conditions</h1>
          <p>Scope, limitations, and responsible use of the website and its guidance content.</p>
        </div>
      </section>

      <section className="legacy-legal-section">
        <div className="legacy-container">
          <div className="legacy-legal-card">
            {termsSections.map((section) => (
              <article key={section.title} className="legacy-legal-block">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <LegacyFooter />
    </div>
  );
}

export default TermsPage;
