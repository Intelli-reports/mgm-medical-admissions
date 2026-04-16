import { useState } from "react";
import { createLead } from "../admin/api";
import { LegacyFooter, LegacyNav, LegacyTopStrip } from "../components/layout/LegacySiteChrome";
import SeoHead from "../components/layout/SeoHead";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, SITE_NAME, makeAbsoluteUrl } from "../config/site";
import { buildEnquiryMessage, buildMailtoUrl, buildWhatsAppUrl, isValidPhone } from "../utils/enquiry";

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
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    course: "",
    score: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });
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
  const courseOptions = [
    "MBBS Admission Guidance",
    "MD / MS Counseling",
    "Management Quota Guidance",
    "NRI Quota Guidance",
    "College Shortlisting Support"
  ];
  const contactSchema = [
    {
      "@type": "Organization",
      name: SITE_NAME,
      url: makeAbsoluteUrl("/"),
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT_ADDRESS
      }
    },
    {
      "@type": "ContactPage",
      name: "Contact BalaJi Admission Guidance",
      url: makeAbsoluteUrl("/contact")
    }
  ];

  function updateField(field, value) {
    setForm((old) => ({ ...old, [field]: value }));
    if (status.type !== "idle") {
      setStatus({ type: "idle", message: "" });
    }
  }

  function validateForm() {
    if (!form.name.trim()) {
      return "Enter your name.";
    }

    if (!isValidPhone(form.phone)) {
      return "Enter a valid mobile number.";
    }

    return "";
  }

  function buildFormMessage() {
    return buildEnquiryMessage({
      context: "Website contact form enquiry",
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      city: form.city.trim(),
      course: form.course,
      score: form.score.trim(),
      message: form.message.trim()
    });
  }

  async function handleWhatsAppSubmit(event) {
    event.preventDefault();

    const error = validateForm();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }

    await createLead({
      source: "contact-form",
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      city: form.city.trim(),
      course: form.course,
      score: form.score.trim(),
      message: form.message.trim(),
      sourcePage: "/contact",
      metadata: { channel: "whatsapp" }
    });
    const whatsappUrl = buildWhatsAppUrl(CONTACT_PHONE, buildFormMessage());
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setStatus({ type: "success", message: "WhatsApp opened with your prefilled enquiry." });
  }

  async function handleEmailSubmit() {
    const error = validateForm();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }

    await createLead({
      source: "contact-form",
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      city: form.city.trim(),
      course: form.course,
      score: form.score.trim(),
      message: form.message.trim(),
      sourcePage: "/contact",
      metadata: { channel: "email" }
    });
    const mailtoUrl = buildMailtoUrl(
      CONTACT_EMAIL,
      `Admission enquiry from ${form.name.trim()}`,
      buildFormMessage()
    );

    window.location.href = mailtoUrl;
    setStatus({ type: "success", message: "Your email app opened with the enquiry details." });
  }

  return (
    <div className="legacy-page">
      <SeoHead
        title="Contact BalaJi Admission Guidance"
        description="Contact BalaJi Admission Guidance in Vashi, Navi Mumbai for medical college counseling, college shortlisting, and admission support."
        canonicalPath="/contact"
        keywords={[
          "contact admission counselor",
          "medical admission guidance contact",
          "Vashi Navi Mumbai admission support"
        ]}
        schema={contactSchema}
      />
      <LegacyTopStrip />
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

      <section className="legacy-contact-form-section">
        <div className="legacy-container legacy-contact-form-grid">
          <div className="legacy-contact-panel legacy-contact-panel-copy">
            <p className="legacy-section-sub">Admission Enquiry</p>
            <h2>Send your details directly to our counseling team</h2>
            <p>
              The site now supports a real enquiry handoff. Fill in your basic details and
              we will open a prefilled WhatsApp or email draft so you can send your request
              without retyping anything.
            </p>
            <div className="legacy-contact-direct-links">
              <a href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}>Call {CONTACT_PHONE}</a>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </div>

          <div className="legacy-contact-panel">
            <form className="legacy-contact-form" onSubmit={handleWhatsAppSubmit}>
              <div className="legacy-contact-field-grid">
                <label className="legacy-contact-field">
                  <span>Name *</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Student or parent name"
                  />
                </label>

                <label className="legacy-contact-field">
                  <span>Mobile Number *</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="+91 98XXXXXXXX"
                  />
                </label>

                <label className="legacy-contact-field">
                  <span>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="name@example.com"
                  />
                </label>

                <label className="legacy-contact-field">
                  <span>City / State</span>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(event) => updateField("city", event.target.value)}
                    placeholder="Mumbai, Maharashtra"
                  />
                </label>

                <label className="legacy-contact-field">
                  <span>Guidance Needed</span>
                  <select
                    value={form.course}
                    onChange={(event) => updateField("course", event.target.value)}
                  >
                    <option value="">Select an option</option>
                    {courseOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="legacy-contact-field">
                  <span>NEET Score</span>
                  <input
                    type="number"
                    min="0"
                    max="720"
                    value={form.score}
                    onChange={(event) => updateField("score", event.target.value)}
                    placeholder="Optional"
                  />
                </label>
              </div>

              <label className="legacy-contact-field">
                <span>Message</span>
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Tell us which colleges, quota, or counseling stage you want help with."
                />
              </label>

              <div className="legacy-contact-form-actions">
                <button type="submit" className="legacy-btn legacy-btn-dark">
                  Send on WhatsApp
                </button>
                <button
                  type="button"
                  className="legacy-btn legacy-btn-outline"
                  onClick={handleEmailSubmit}
                >
                  Send by Email
                </button>
              </div>

              <p className="legacy-contact-form-note">
                Required fields: name and mobile number. The form opens your selected channel
                with a prefilled enquiry message.
              </p>

              {status.type !== "idle" ? (
                <p className={`legacy-contact-form-status is-${status.type}`}>{status.message}</p>
              ) : null}
            </form>
          </div>
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
