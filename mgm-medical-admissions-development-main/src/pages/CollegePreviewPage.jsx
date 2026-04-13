import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { collegePreviewData } from "../data/collegePreviewData";
import SeoHead from "../components/layout/SeoHead";
import { DEFAULT_OG_IMAGE, makeAbsoluteUrl } from "../config/site";

function estimateRank(score) {
  return Math.round(Math.max(1, (720 - score) * 115));
}

function percentile(score) {
  return (100 - ((720 - score) / 720) * 100).toFixed(1);
}

function tableHeaders(type) {
  if (type === "cutoff") return ["College Name", "AIR Round", "Cutoff"];
  if (type === "nri") return ["Course", "Duration", "NRI Seats", "Annual Fees (NRI Quota)"];
  return ["Course", "Duration", "Intake", "Annual Fees"];
}

const admissionWhatsappUrl =
  "https://wa.me/919623208649?text=Admission%20Enquiry";
const admissionPhone = "+91 9623208649";

function ContactInlineIcon({ type }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  if (type === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M6.5 4.5h3l1.2 3.3-1.9 1.8a15.7 15.7 0 0 0 5.6 5.6l1.8-1.9 3.3 1.2v3A2 2 0 0 1 17.6 20C10.8 19.6 4.4 13.2 4 6.4a2 2 0 0 1 2.5-1.9Z" />
      </svg>
    );
  }

  if (type === "mail") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect {...common} x="3.5" y="6" width="17" height="12" rx="2.2" />
        <path {...common} d="m5.5 8 6.5 5 6.5-5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path {...common} d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" />
      <circle {...common} cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function HighlightIcon({ label }) {
  const key = label.toLowerCase();
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  if (key.includes("location")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" />
        <circle {...common} cx="12" cy="10" r="2.7" />
      </svg>
    );
  }

  if (key.includes("established")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect {...common} x="4" y="5" width="16" height="15" rx="2" />
        <path {...common} d="M8 3v4M16 3v4M4 10h16M8 14h3M8 17h6" />
      </svg>
    );
  }

  if (key.includes("approval")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M12 3 19 6v5c0 4.2-2.6 7.7-7 10-4.4-2.3-7-5.8-7-10V6l7-3Z" />
        <path {...common} d="m9.2 11.8 1.9 1.9 3.9-4.2" />
      </svg>
    );
  }

  if (key.includes("affiliation") || key.includes("type of college")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M3 9.5 12 4l9 5.5" />
        <path {...common} d="M5 10.5V19M9.5 10.5V19M14.5 10.5V19M19 10.5V19M3 19h18" />
      </svg>
    );
  }

  if (key.includes("mbbs seats") || key.includes("seats")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M12 5v14M5 9h14M5 15h14" />
        <path {...common} d="M7 4h10l2 3H5l2-3Z" />
      </svg>
    );
  }

  if (key.includes("hospital beds") || key.includes("beds")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M4 7v12M20 11v8M4 15h16M7 15V9h5a3 3 0 0 1 3 3v3" />
      </svg>
    );
  }

  if (key.includes("campus area")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M4 20h16M7 20V6h10v14M10 9h4M10 12h4" />
        <path {...common} d="M12 3v3" />
      </svg>
    );
  }

  if (key.includes("faculty")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle {...common} cx="8" cy="9" r="2.2" />
        <circle {...common} cx="16" cy="9" r="2.2" />
        <path {...common} d="M4.5 18a3.5 3.5 0 0 1 7 0M12.5 18a3.5 3.5 0 0 1 7 0" />
      </svg>
    );
  }

  if (key.includes("fee")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M4 7h14a2 2 0 0 1 2 2v8H6a2 2 0 0 1-2-2V7Z" />
        <path {...common} d="M8 11h5M8 14h8M6 7l2-3h10" />
      </svg>
    );
  }

  if (key.includes("contact")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M7 5h10a2 2 0 0 1 2 2v10l-4-2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        <path {...common} d="M8 9h8M8 12h5" />
      </svg>
    );
  }

  if (key.includes("daily opd") || key.includes("opd")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M12 4v16M7 9h10M7 15h10" />
        <path {...common} d="M5 6h14v12H5z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle {...common} cx="12" cy="12" r="8" />
      <path {...common} d="M12 8v4l2.5 2.5" />
    </svg>
  );
}

function CollegePreviewPage() {
  const { slug } = useParams();
  const data = collegePreviewData[slug];

  const [activeTab, setActiveTab] = useState("courses");
  const [openFaq, setOpenFaq] = useState(null);
  const [sideScore, setSideScore] = useState("");
  const [predScore, setPredScore] = useState("");
  const [predCat, setPredCat] = useState("general");
  const [inquiry, setInquiry] = useState({ name: "", phone: "", score: "", course: "" });
  const [submitted, setSubmitted] = useState(false);
  const collegeLabel = data?.brandName || data?.fullName;
  const logoSrc = data?.logo || "https://i.ibb.co/twXMG4DP/image.png";
  const logoAlt = `${collegeLabel} Logo`;
  const phoneHref = `tel:${admissionPhone.replace(/[^+\d]/g, "")}`;
  const emailHref = `mailto:${data?.email || ""}`;
  const footerContactLines = data.footerLinks.contactBody.split("\n");
  const [footerEmail = "", , ...footerAddressParts] = footerContactLines;
  const footerAddress = footerAddressParts.join(" ");

  const rankEstimate = useMemo(() => {
    const score = Number(sideScore);
    if (!score || score < 1 || score > 720 || !data) return null;
    return {
      rank: estimateRank(score),
      pct: percentile(score),
      message:
        score >= data.rankMessageThreshold
          ? `Good chances at ${data.shortName} (General)`
          : score >= 430
            ? "Explore Management / NRI Quota"
            : "Consult counselor for options"
    };
  }, [sideScore, data]);

  const prediction = useMemo(() => {
    const score = Number(predScore);
    if (!score || score < 1 || score > 720 || !data) return null;
    const min = data.predictorCutoffs[predCat];
    let verdict = "";
    if (predCat === "nri") verdict = "NRI Quota - Contact admission office";
    else if (score >= min) verdict = `High chances at ${data.shortName}`;
    else if (score >= min - 40) verdict = "Moderate - Explore Management Quota";
    else verdict = "Low via counseling - talk to counselor";

    return {
      rank: estimateRank(score),
      pct: percentile(score),
      verdict
    };
  }, [predScore, predCat, data]);

  if (!data) {
    return (
      <div className="kp-page">
        <div className="kp-container" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <h1>College preview not found</h1>
          <Link to="/" className="kp-cta-button">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const seoDescription = `${data.fullName} admission guide with fees, cutoff trends, eligibility, facilities, videos, FAQs, and contact details for ${data.locationLine}.`;
  const collegeSchema = [
    {
      "@type": "CollegeOrUniversity",
      name: data.fullName,
      url: makeAbsoluteUrl(`/preview/${slug}`),
      image: makeAbsoluteUrl(data.image || DEFAULT_OG_IMAGE),
      telephone: data.helpLine || data.phone,
      email: data.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: data.locationLine
      }
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: makeAbsoluteUrl("/")
        },
        {
          "@type": "ListItem",
          position: 2,
          name: data.fullName,
          item: makeAbsoluteUrl(`/preview/${slug}`)
        }
      ]
    }
  ];

  function submitInquiry(event) {
    event.preventDefault();
    if (!inquiry.name.trim() || !inquiry.phone.trim()) return;
    setSubmitted(true);
    setInquiry({ name: "", phone: "", score: "", course: "" });
    setTimeout(() => setSubmitted(false), 3000);
  }

  const tab = data.tabs[activeTab].content;
  const themeStyle = data.theme
    ? {
        "--kp-primary": data.theme.primary,
        "--kp-primary-deep": data.theme.primaryDeep,
        "--kp-primary-soft": data.theme.primarySoft,
        "--kp-secondary": data.theme.secondary,
        "--kp-secondary-soft": data.theme.secondarySoft,
        "--kp-secondary-ink": data.theme.secondaryInk,
        "--kp-accent": data.theme.accent,
        "--kp-accent-soft": data.theme.accentSoft,
        "--kp-accent-gradient": data.theme.accentGradient,
        "--kp-dark": data.theme.dark,
        "--kp-panel": data.theme.panel,
        "--kp-panel-soft": data.theme.panelSoft,
        "--kp-panel-wash": data.theme.panelWash
      }
    : undefined;

  return (
    <div className="kp-page" style={themeStyle}>
      <SeoHead
        title={`${data.fullName} MBBS Admission 2026, Fees, Cutoff and Contact`}
        description={seoDescription}
        canonicalPath={`/preview/${slug}`}
        image={data.image || DEFAULT_OG_IMAGE}
        keywords={[
          `${data.fullName} MBBS admission`,
          `${data.shortName} fees`,
          `${data.shortName} cutoff`,
          `${data.shortName} contact`,
          `${data.shortName} admission 2026`
        ]}
        schema={collegeSchema}
      />
      <header className="kp-header">
        <div className="kp-container kp-header-content">
          <div className="kp-logo-area">
            <div className="kp-logo-icon">
              <img src={logoSrc} alt={logoAlt} />
            </div>
            <div className="kp-header-title">
              <h1>{data.fullName}</h1>
              <p>{data.headerSubtitle}</p>
              <span className="kp-excellence-badge">{data.badgeText}</span>
            </div>
          </div>
          <div className="kp-header-contact">
            <div className="kp-header-contact-row">
              <a href={phoneHref} className="kp-inline-contact">
                <span className="kp-inline-contact-icon">
                  <ContactInlineIcon type="phone" />
                </span>
                  <span>{admissionPhone}</span>
              </a>
              <a href={emailHref} className="kp-inline-contact">
                <span className="kp-inline-contact-icon">
                  <ContactInlineIcon type="mail" />
                </span>
                <span>{data.email}</span>
              </a>
            </div>
            <a href={admissionWhatsappUrl} className="kp-apply-now" target="_blank" rel="noreferrer">
              Apply Now
            </a>
          </div>
        </div>
      </header>

      <div className="kp-ticker-bar">
        <div className="kp-ticker-track">
          {[...data.tickerItems, ...data.tickerItems].map((item, index) => (
            <span key={`${item}-${index}`} className="kp-ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="kp-container kp-main-layout">
        <main className="kp-left-content">
          <div id="overview" className="kp-college-header">
            <Link to="/" className="kp-back-arrow-btn">
              ← Back
            </Link>
            <h2>{data.shortName} admission guide, fees, cutoff and facilities</h2>
            <span className="kp-location-tag">{data.locationLine}</span>
          </div>

          <p className="kp-welcome-text">{data.welcomeText}</p>

          <img className="kp-college-image" src={data.image} alt={`${data.fullName} Campus`} />

          <div id="videos" className="kp-video-section">
            <h3>{collegeLabel} - Video Overview</h3>
            <div className="kp-video-container">
              <iframe
                src={data.video}
                title={`${data.fullName} Video Overview`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <div id="events" className="kp-upcoming-events">
            <h3>Upcoming Events</h3>
            <div className="kp-events-scroll">
              {data.events.map(([month, year, title, meta]) => (
                <div className="kp-event-item" key={title}>
                  <div className="kp-event-date">
                    {month}
                    <br />
                    {year}
                  </div>
                  <div className="kp-event-info">
                    <strong>{title}</strong>
                    <span>{meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="details" className="kp-highlights-grid">
            {data.highlights.map(([label, value]) => (
              <div key={label} className="kp-highlight-card">
                <div className="kp-highlight-icon">
                  <HighlightIcon label={label} />
                </div>
                <div className="kp-highlight-copy">
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="kp-detail-tabs">
            {Object.entries(data.tabs).map(([key, item]) => (
              <button
                key={key}
                type="button"
                className={`kp-tab-btn ${activeTab === key ? "active" : ""}`}
                onClick={() => setActiveTab(key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="kp-tab-content active">
            <h3>{tab.title}</h3>

            {tab.intro ? <p className="kp-tab-intro">{tab.intro}</p> : null}

            {tab.table ? (
              <div className="kp-tab-scroll">
                <table className="kp-table">
                  <thead>
                    <tr>
                      {tableHeaders(tab.tableType).map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tab.table.map((row, index) => (
                      <tr key={`${row[0]}-${index}`}>
                        {row.map((cell, cellIndex) => (
                          <td key={`${cell}-${cellIndex}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {tab.footer ? (
              <div className="kp-tab-meta">
                {tab.footer.map((line) => (
                  <p key={line}>
                    <strong>{line.split(":")[0]}:</strong> {line.split(":").slice(1).join(":").trim()}
                  </p>
                ))}
              </div>
            ) : null}

            {tab.note && Array.isArray(tab.note) ? (
              <div className="kp-nri-note">
                <h4>NRI Quota Eligibility</h4>
                {tab.note.map((line) => (
                  <p key={line}>• {line}</p>
                ))}
              </div>
            ) : null}

            {tab.paragraphs ? (
              <div className="kp-tab-copy">
                {tab.paragraphs.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ) : null}

            {tab.facilities ? (
              <ul className="kp-facility-list">
                {tab.facilities.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            ) : null}

            {tab.documents ? (
              <>
                <h3>Required Documents</h3>
                <ul className="kp-doc-list">
                  {tab.documents.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}

            {typeof tab.note === "string" ? (
              <p>
                <strong>Note:</strong> {tab.note}
              </p>
            ) : null}
          </div>

          <div className="kp-strategy-ref">
            <h4>Free MBBS Admission Guide 2026</h4>
            <p>
              Get complete information about MBBS admission process, NEET counseling, college
              selection, and fee structure.
            </p>
            <p>
              <strong>Download Free PDF Guide:</strong> Includes college list, important dates,
              and step-by-step process.
            </p>
            <Link to="/contact" className="kp-cta-button">
              Request Free Guide
            </Link>
          </div>

          <div className="kp-extra-videos-section">
            <h3>More Videos - {collegeLabel}</h3>
            <div className="kp-videos-grid">
              {data.extraVideos.map(([title, url]) => (
                <div className="kp-video-grid-item" key={title}>
                  <div className="kp-video-container small">
                    <iframe
                      src={url}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="faq" className="kp-faq-section">
            <h3>Frequently Asked Questions - {data.fullName}</h3>
            {data.faqs.map(([question, answer], index) => (
              <div className="kp-faq-item" key={question}>
                <button
                  type="button"
                  className={`kp-faq-question ${openFaq === index ? "open" : ""}`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{question}</span>
                  <span className="kp-faq-arrow">▼</span>
                </button>
                {openFaq === index ? <div className="kp-faq-answer">{answer}</div> : null}
              </div>
            ))}
          </div>
        </main>

        <aside className="kp-right-sidebar">
          <div className="kp-sidebar-title">{data.sidebarTitle}</div>

          <div className="kp-quick-info">
            <h3>Campus at a Glance</h3>
            {data.quickInfo.map(([label, value]) => (
              <p key={label}>
                <strong>{label}:</strong> {value}
              </p>
            ))}
          </div>

          <div className="kp-sidebar-predictor">
            <h3>Quick Rank Estimator</h3>
            <p>Enter your NEET score to estimate your rank</p>
            <input
              type="number"
              min="0"
              max="720"
              placeholder="Score / 720"
              value={sideScore}
              onChange={(event) => setSideScore(event.target.value)}
            />
            {rankEstimate ? (
              <div className="kp-sidebar-rank-result visible">
                <strong>Est. Rank: ~{rankEstimate.rank.toLocaleString()}</strong>
                <div>Score: {sideScore}/720 | Percentile: ~{rankEstimate.pct}%</div>
                <div>{rankEstimate.message}</div>
              </div>
            ) : null}
          </div>

          <div className="kp-sidebar-predictor">
            <h3>NEET Score Predictor</h3>
            <p>Check your admission chances at {data.shortName}</p>
            <label>Your NEET Score (out of 720)</label>
            <input
              type="number"
              min="0"
              max="720"
              placeholder="e.g. 540"
              value={predScore}
              onChange={(event) => setPredScore(event.target.value)}
            />
            <label>Category</label>
            <select value={predCat} onChange={(event) => setPredCat(event.target.value)}>
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
              <option value="nri">NRI</option>
            </select>
            {prediction ? (
              <div className="kp-sidebar-rank-result visible">
                <strong>Est. Rank: ~{prediction.rank.toLocaleString()}</strong>
                <div>Score: {predScore}/720 | Percentile: ~{prediction.pct}%</div>
                <div>Category: {predCat.toUpperCase()}</div>
                <div>{prediction.verdict}</div>
              </div>
            ) : null}
          </div>

          <form className="kp-sidebar-inquiry" onSubmit={submitInquiry}>
            <h3>Quick Admission Inquiry</h3>
            <p>Our counselor will call you within 24 hrs</p>
            <input
              type="text"
              placeholder="Your Name *"
              value={inquiry.name}
              onChange={(event) => setInquiry((old) => ({ ...old, name: event.target.value }))}
            />
            <input
              type="tel"
              placeholder="Mobile Number *"
              value={inquiry.phone}
              onChange={(event) => setInquiry((old) => ({ ...old, phone: event.target.value }))}
            />
            <input
              type="number"
              placeholder="NEET Score (if known)"
              value={inquiry.score}
              onChange={(event) => setInquiry((old) => ({ ...old, score: event.target.value }))}
            />
            <select
              value={inquiry.course}
              onChange={(event) => setInquiry((old) => ({ ...old, course: event.target.value }))}
            >
              <option value="">Course Interested In</option>
              {data.coursesInterested.map((course) => (
                <option key={course}>{course}</option>
              ))}
            </select>
            <button type="submit" className="kp-sinq-submit">
              Send Inquiry
            </button>
            {submitted ? <div className="kp-sinq-success">Thank you! We&apos;ll call you soon.</div> : null}
          </form>

          <div id="contact" className="kp-quick-info">
            <h3>Quick Contact</h3>
            {data.quickContact.map(([label, value]) => (
              <p key={label}>
                <strong>{label}:</strong> {value}
              </p>
            ))}
          </div>

          <div className="kp-quick-info">
            <h3>Key Admission Topics</h3>
            {data.keyTopics.map((topic) => (
              <p key={topic}>• {topic}</p>
            ))}
          </div>
        </aside>
      </div>

      <footer className="kp-footer">
        <div className="kp-container kp-footer-content">
          <div className="kp-footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#details">Courses and details</a></li>
              <li><a href="#videos">Videos</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#contact">Quick contact</a></li>
            </ul>
          </div>
          <div className="kp-footer-col">
            <h4>Other Colleges</h4>
            <ul>
              {data.footerLinks.otherColleges.map(([label, href]) => (
                <li key={label}>
                  {href.startsWith("/preview/") ? <Link to={href}>{label}</Link> : <a href={href}>{label}</a>}
                </li>
              ))}
            </ul>
          </div>
          <div className="kp-footer-col">
            <h4>{data.footerLinks.contactTitle}</h4>
            <div className="kp-footer-contact">
              <div className="kp-footer-contact-row">
                <a href={`mailto:${footerEmail}`} className="kp-inline-contact">
                  <span className="kp-inline-contact-icon">
                    <ContactInlineIcon type="mail" />
                  </span>
                  <span>{footerEmail}</span>
                </a>
                <a href={`tel:${admissionPhone.replace(/[^+\d]/g, "")}`} className="kp-inline-contact">
                  <span className="kp-inline-contact-icon">
                    <ContactInlineIcon type="phone" />
                  </span>
                  <span>{admissionPhone}</span>
                </a>
              </div>
              <div className="kp-footer-address">
                <span className="kp-inline-contact-icon">
                  <ContactInlineIcon type="location" />
                </span>
                <span>{footerAddress}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="kp-copyright">Copyright {collegeLabel}. All Rights Reserved.</div>
      </footer>
    </div>
  );
}

export default CollegePreviewPage;


