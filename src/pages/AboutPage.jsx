import { useState } from "react";
import { Link } from "react-router-dom";
import { LegacyFooter, LegacyNav, LegacySmartLink, LegacyTopStrip } from "../components/layout/LegacySiteChrome";
import SeoHead from "../components/layout/SeoHead";
import {
  GOOGLE_MAPS_URL,
  googleTrustBlock,
  organizationOverview,
  teamProfiles,
  trustContactCards,
  trustProofPoints
} from "../data/site/trust";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_NAME,
  makeAbsoluteUrl
} from "../config/site";

function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const aboutSchema = [
    {
      "@type": "AboutPage",
      name: `About ${SITE_NAME}`,
      url: makeAbsoluteUrl("/about")
    },
    {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      url: makeAbsoluteUrl("/"),
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT_ADDRESS
      }
    }
  ];

  return (
    <div className="legacy-page">
      <SeoHead
        title={`About ${SITE_NAME}`}
        description="Learn about BalaJi Admission Guidance, our counseling approach, office location, contact details, and the trust signals behind the website."
        canonicalPath="/about"
        keywords={[
          "about BalaJi Admission Guidance",
          "medical admission counseling office Vashi",
          "medical college guidance Navi Mumbai"
        ]}
        schema={aboutSchema}
      />
      <LegacyTopStrip />
      <LegacyNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <section className="legacy-contact-hero legacy-generic-hero">
        <div className="legacy-contact-overlay" />
        <div className="legacy-container legacy-contact-copy">
          <h1>About Us</h1>
          <p>Who we are, how we help, and how families can verify the office.</p>
        </div>
      </section>

      <section className="legacy-about">
        <div className="legacy-container">
          <div className="legacy-about-grid">
            <div>
              <p className="legacy-section-sub">{organizationOverview.eyebrow}</p>
              <h2>{organizationOverview.title}</h2>
              {organizationOverview.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul>
                {organizationOverview.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <img
              src={organizationOverview.image}
              srcSet="/image/mgm-admissions-office-480w.webp 480w, /image/mgm-admissions-office-800w.webp 800w, /image/mgm-admissions-office.webp 1200w"
              sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 600px"
              alt="BalaJi Admission Guidance office support"
              className="legacy-about-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="legacy-trust-section">
        <div className="legacy-container">
          <div className="legacy-section-heading">
            <p className="legacy-section-sub">Trust Signals</p>
            <h2>Published office and contact details</h2>
            <p>
              A professional admission website should make it easy to verify location, contact
              the office directly, and confirm how the enquiry flow actually works.
            </p>
          </div>
          <div className="legacy-trust-grid">
            {trustContactCards.map((card) => (
              <article key={card.title} className="legacy-trust-card">
                <span className="legacy-trust-label">{card.title}</span>
                <h3>{card.value}</h3>
                <LegacySmartLink to={card.href} className="legacy-trust-link">
                  {card.actionLabel}
                </LegacySmartLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="legacy-team-section">
        <div className="legacy-container">
          <div className="legacy-section-heading">
            <p className="legacy-section-sub">Team Details</p>
            <h2>How the counseling work is organized</h2>
            <p>
              This site now publishes the founder-led team structure behind the guidance
              process, with Rahul Singh listed as Founder and the support team grouped by
              their actual operational responsibilities.
            </p>
          </div>
          <div className="legacy-team-grid">
            {teamProfiles.map((profile) => (
              <article key={profile.name} className="legacy-team-card">
                <span className="legacy-team-role">{profile.role}</span>
                <h3>{profile.name}</h3>
                <p>{profile.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="legacy-proof-section">
        <div className="legacy-container">
          <div className="portal-shot-panel portal-proof-strip">
            <h2>FOUNDER + TEAM + OFFICE PROOF</h2>

            <div className="portal-proof-strip-grid">
              <article className="portal-proof-mini portal-proof-mini-founder">
                <div className="portal-founder-avatar">RS</div>
                <div>
                  <strong>Rahul Singh</strong>
                  <span>Founder &amp; Lead Consultant</span>
                  <p>Student-first counseling guidance and shortlist review.</p>
                </div>
              </article>

              <article className="portal-proof-mini portal-proof-mini-office">
                <img
                  src={organizationOverview.image}
                  srcSet="/image/mgm-admissions-office-480w.webp 480w, /image/mgm-admissions-office-800w.webp 800w, /image/mgm-admissions-office.webp 1200w"
                  sizes="(max-width: 480px) 480px, 300px"
                  alt="BalaJi admissions office"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <strong>Visit our Vashi office</strong>
                  <p>{CONTACT_ADDRESS}</p>
                  <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
                    Open Google Maps
                  </a>
                </div>
              </article>

              <article className="portal-proof-mini portal-proof-mini-team">
                <strong>Expert team support</strong>
                <ul>
                  {teamProfiles.slice(1).map((profile) => (
                    <li key={profile.name}>{profile.name}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="legacy-proof-section">
        <div className="legacy-container legacy-proof-grid">
          <div className="legacy-proof-card legacy-proof-card-dark">
            <p className="legacy-section-sub">{googleTrustBlock.eyebrow}</p>
            <h2>{googleTrustBlock.title}</h2>
            <p>{googleTrustBlock.body}</p>
            <div className="legacy-hero-buttons">
              <a
                href={googleTrustBlock.primaryHref}
                className="legacy-btn legacy-btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                {googleTrustBlock.primaryLabel}
              </a>
              <Link to={googleTrustBlock.secondaryHref} className="legacy-btn legacy-btn-outline legacy-proof-outline">
                {googleTrustBlock.secondaryLabel}
              </Link>
            </div>
          </div>
          <div className="legacy-proof-card">
            <h3>Professional website basics now covered</h3>
            <ul className="legacy-proof-list">
              {trustProofPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <LegacyFooter />
    </div>
  );
}

export default AboutPage;
