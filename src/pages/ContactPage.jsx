import { useState } from "react";
import { LegacyFooter, LegacyNav } from "../components/layout/LegacySiteChrome";

function ContactInfoIcon({ type }) {
  if (type === "address") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 21s-6-5.2-6-10.2A6 6 0 1 1 18 10.8C18 15.8 12 21 12 21Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="3.5"
          y="5.5"
          width="17"
          height="13"
          rx="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M5.5 8l6.5 5 6.5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 4.8c.4-.7 1.2-1 2-.8l1.7.5c.7.2 1.2.8 1.3 1.6l.2 2c.1.6-.1 1.2-.6 1.6l-1.1 1.1a14.2 14.2 0 0 0 3.6 3.6l1.1-1.1c.4-.4 1-.7 1.6-.6l2 .2c.8.1 1.4.6 1.6 1.3L19.2 15c.2.8-.1 1.6-.8 2-1 .6-2.2.9-3.4.7-2.4-.4-4.8-1.8-7-4-2.2-2.2-3.6-4.6-4-7-.2-1.2.1-2.4.7-3.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const info = [
    {
      type: "address",
      title: "Our Address",
      text: "Haware Infotech Park, A-1401, Sector 30, Near Vashi Railway Station, Vashi, Navi Mumbai - 400703.",
      actionLabel: "View on Map",
      href: "https://www.google.com/maps?q=Haware%20Infotech%20Park%20Vashi"
    },
    {
      type: "email",
      title: "Email Address",
      text: "balajieducationservices17@gmail.com",
      actionLabel: "Send Email",
      href: "mailto:balajieducationservices17@gmail.com"
    },
    {
      type: "phone",
      title: "Call Now",
      text: "+91-9324652984",
      actionLabel: "Call Counselor",
      href: "tel:+919324652984"
    }
  ];

  return (
    <div className="legacy-page">
      <LegacyNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <section className="legacy-contact-hero">
        <div className="legacy-contact-overlay" />
        <div className="legacy-container legacy-contact-copy">
          <h1>Contact</h1>
          <p>Home / Contact</p>
        </div>
      </section>

      <section className="legacy-contact-info">
        <div className="legacy-container legacy-contact-grid">
          {info.map((item) => (
            <article key={item.title} className="legacy-contact-card">
              <div className="legacy-contact-card-top">
                <div className="legacy-contact-icon">
                  <ContactInfoIcon type={item.type} />
                </div>
                <div className="legacy-contact-copy-block">
                  <span className="legacy-contact-label">{item.title}</span>
                  <h3>{item.text}</h3>
                </div>
              </div>
              <a
                href={item.href}
                className="legacy-contact-action"
                target={item.type === "address" ? "_blank" : undefined}
                rel={item.type === "address" ? "noreferrer" : undefined}
              >
                {item.actionLabel}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="legacy-map-section">
        <div className="legacy-container">
          <div className="legacy-section-heading">
            <p className="legacy-section-sub">Office Location</p>
            <h2>Find Us In Vashi</h2>
            <p>
              Visit our counseling office in Vashi for one-to-one admission
              guidance, college shortlisting support, and document planning.
            </p>
          </div>
          <iframe
            title="Office map"
            src="https://www.google.com/maps?q=Haware%20Infotech%20Park%20Vashi&output=embed"
            className="legacy-map-frame"
          />
        </div>
      </section>

      <LegacyFooter />
    </div>
  );
}

export default ContactPage;
