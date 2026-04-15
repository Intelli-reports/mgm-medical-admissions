import { useState } from "react";
import { LegacyFooter, LegacyNav } from "../components/layout/LegacySiteChrome";
import SeoHead from "../components/layout/SeoHead";
import { privacySections } from "../data/site/trust";
import { SITE_NAME, makeAbsoluteUrl } from "../config/site";

function PrivacyPolicyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Privacy Policy | ${SITE_NAME}`,
    url: makeAbsoluteUrl("/privacy-policy")
  };

  return (
    <div className="legacy-page">
      <SeoHead
        title="Privacy Policy"
        description="Read the BalaJi Admission Guidance privacy policy for website enquiries, communication handling, and contact information."
        canonicalPath="/privacy-policy"
        schema={schema}
      />
      <LegacyNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <section className="legacy-contact-hero legacy-generic-hero">
        <div className="legacy-contact-overlay" />
        <div className="legacy-container legacy-contact-copy">
          <h1>Privacy Policy</h1>
          <p>How this website handles enquiry information and communication data.</p>
        </div>
      </section>

      <section className="legacy-legal-section">
        <div className="legacy-container">
          <div className="legacy-legal-card">
            {privacySections.map((section) => (
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

export default PrivacyPolicyPage;
