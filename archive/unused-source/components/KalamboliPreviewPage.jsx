import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const tickerItems = [
  "NEET UG 2026 Counseling Starts Soon - Register Now!",
  "MGM Kalamboli MBBS Admission 2026 Open - 150 Seats Available",
  "NAAC Grade A Accredited - Modern Medical College Navi Mumbai",
  "800+ Bed Teaching Hospital - Excellent Clinical Exposure",
  "NEET 2026 Guidance Seminar - Apr 10 | MGM Kalamboli Auditorium",
  "MBBS Admission Counseling - Apr 15 | On Campus",
  "Live Q&A - Ask a Doctor - Apr 25 | Online via Zoom",
  "Admission Helpline: +91 22 2742 5010"
];

const highlights = [
  ["Type of College", "Deemed medical college"],
  ["Established", "2010"],
  ["Location", "Kalamboli, Navi Mumbai - 410218"],
  ["Approval", "NMC approved"],
  ["Affiliation", "MGM Institute of Health Sciences, Navi Mumbai"],
  ["MBBS Seats", "150 annual intake"],
  ["Hospital Beds", "800+ teaching hospital beds"],
  ["Campus Area", "30-acre campus"],
  ["Faculty", "300+ faculty members"],
  ["MBBS Fee", "Rs. 20,00,000 per year"],
  ["Contact", "+91 22 2742 5010 | mgmkalamboli@mgmuhs.com"]
];

const tabs = {
  courses: {
    label: "Courses & Fees",
    content: {
      title: "Courses Offered (MBBS & PG) with Fees",
      table: [
        ["MBBS", "4.5+1 Yr", "150", "Rs. 20,00,000"],
        ["MD - General Medicine", "3 Yr", "12", "Rs. 32,00,000"],
        ["MD - Pediatrics", "3 Yr", "8", "Rs. 32,00,000"],
        ["MD - Radiology", "3 Yr", "6", "Rs. 48,00,000"],
        ["MD - Dermatology", "3 Yr", "4", "Rs. 48,00,000"],
        ["MS - General Surgery", "3 Yr", "10", "Rs. 32,00,000"],
        ["MS - Orthopaedics", "3 Yr", "8", "Rs. 42,00,000"],
        ["MS - Obstetrics & Gynaecology", "3 Yr", "10", "Rs. 42,00,000"]
      ],
      footer: [
        "MBBS: 10+2 with PCB 50% (General) / 40% (Reserved), NEET-UG Qualified, Minimum 17 years",
        "PG (MD/MS): MBBS degree from NMC recognized college, NEET-PG Qualified, 1 year internship completed"
      ]
    }
  },
  nri: {
    label: "NRI Quota",
    content: {
      title: "NRI Quota - Fees & Seats",
      intro:
        "NRI Quota admissions are managed directly by the institution. Seats are limited and allotted on a first-come-first-served basis after NEET qualification.",
      table: [
        ["MBBS", "4.5+1 Yr", "15", "Rs. 45,00,000"],
        ["MD - General Medicine", "3 Yr", "2", "Rs. 70,00,000"],
        ["MD - Radiology", "3 Yr", "1", "Rs. 90,00,000"],
        ["MS - General Surgery", "3 Yr", "2", "Rs. 70,00,000"]
      ],
      note: [
        "Candidate must be NRI / OCI / PIO or sponsored by NRI parents / relatives",
        "NEET qualification is mandatory",
        "Valid passport, visa and NRI sponsorship documents required",
        "Contact Admission Office directly: +91 22 2742 5010"
      ]
    }
  },
  cutoff: {
    label: "Cutoff",
    content: {
      title: "Maharashtra Deemed Colleges Cutoff 2025 (Actual)",
      table: [
        ["MGM Medical College, Kalamboli", "Round 1 AIR", "189320"],
        ["MGM Medical College, Kalamboli", "Round 2 AIR", "326540"],
        ["MGM Medical College, Kalamboli", "Round 3 AIR", "407858"]
      ],
      note:
        "Cutoff ranks are actual data for reference. NEET percentile requirements may vary. Contact admission office for category-wise eligibility."
    }
  },
  about: {
    label: "About",
    content: {
      title: "About MGM Medical College, Kalamboli",
      paragraphs: [
        "MGM Medical College, Kalamboli, established in 2010, is a constituent college of MGM Institute of Health Sciences (Deemed to be University). Located in Kalamboli, Navi Mumbai, the college is recognized by the National Medical Commission (NMC) and accredited with NAAC A grade.",
        "The attached MGM Hospital is an 800+ bedded multispecialty hospital providing excellent clinical training. The campus features modern infrastructure, digital library, advanced research labs, and separate hostels for boys and girls.",
        "Established: 2010",
        "Affiliation: MGM Institute of Health Sciences, Navi Mumbai",
        "Approval: National Medical Commission (NMC)",
        "Hospital Beds: 800+",
        "Campus Area: 30 Acres",
        "Total Faculty: 300+"
      ]
    }
  },
  facilities: {
    label: "Facilities",
    content: {
      title: "Infrastructure & Facilities",
      facilities: [
        "800+ Bed Multispecialty Teaching Hospital",
        "Central Library with 30,000+ Books & 300+ Journals",
        "Digital Classrooms with Smart Boards",
        "Advanced Research Laboratories",
        "Simulation & Skill Lab",
        "24/7 High-Speed Wi-Fi Campus",
        "Separate Boys & Girls Hostels (AC/Non-AC)",
        "International Hostel for NRI Students",
        "Sports Complex with Gymnasium",
        "Swimming Pool",
        "Multiple Canteens & Food Court",
        "In-house Blood Bank & Pharmacy",
        "24/7 Emergency & Trauma Care"
      ]
    }
  },
  admission: {
    label: "Admission",
    content: {
      title: "Admission Process",
      paragraphs: [
        "Admission to MBBS is through NEET-UG followed by centralized counseling by MCC (Medical Counselling Committee) for All India Quota and State DME for Maharashtra State Quota. PG admissions are through NEET-PG counseling."
      ],
      documents: [
        "NEET Score Card / Rank Letter",
        "10th & 12th Marksheets (Duly attested)",
        "School Leaving Certificate / Transfer Certificate",
        "Migration Certificate (if applicable)",
        "Caste Certificate (for reserved categories)",
        "8 Passport size photographs",
        "Aadhar Card / Valid ID Proof"
      ]
    }
  },
  contact: {
    label: "Contact",
    content: {
      title: "Contact Information",
      paragraphs: [
        "Address: MGM Medical College, MGM Campus, Kalamboli, Navi Mumbai - 410218, Maharashtra",
        "Phone: +91 22 2742 5000 / 2742 5001",
        "Email: mgmkalamboli@mgmuhs.com | admissions@mgmuhs.com",
        "Website: www.mgmuhs.com",
        "Admission Helpline: +91 22 2742 5010",
        "Office Hours: Monday to Saturday, 9:00 AM to 5:00 PM"
      ]
    }
  }
};

const events = [
  ["Apr 10", "2026", "NEET 2026 Guidance Seminar", "MGM Auditorium, Kalamboli | 10:00 AM - 1:00 PM"],
  ["Apr 15", "2026", "MBBS Admission Counseling Session", "MGM Campus, Kalamboli | 10:00 AM - 4:00 PM"],
  ["Apr 25", "2026", "Live Q&A - Ask a Doctor Session", "Online via Zoom | 5:00 PM - 6:30 PM"],
  ["May 02", "2026", "NEET 2026 Strategy Workshop", "Main Auditorium, MGM Kalamboli | 9:00 AM - 1:00 PM"],
  ["May 20", "2026", "Open House - Campus Tour for Students", "MGM Medical College, Kalamboli | 11:00 AM - 3:00 PM"],
  ["Jun 10", "2026", "Annual Medical Conference 2026", "Conference Hall, MGM Hospital Kalamboli | All Day"]
];

const faqs = [
  [
    "What is the MBBS fee at MGM Medical College, Kalamboli?",
    "The annual MBBS fee at MGM Medical College, Kalamboli is Rs. 20,00,000. NRI quota annual fee is Rs. 45,00,000. Fees are subject to revision as per university norms."
  ],
  [
    "What is the NEET cutoff rank for MBBS at MGM Kalamboli?",
    "For General category, the expected closing rank (AIQ) is around 21,000. OBC: ~28,000 | SC: ~62,000 | ST: ~80,000. Ranks are indicative based on previous year data."
  ],
  [
    "How many MBBS seats are available at MGM Kalamboli?",
    "MGM Medical College, Kalamboli has a total MBBS intake of 150 seats per year, approved by the National Medical Commission (NMC)."
  ],
  [
    "Is MGM Medical College Kalamboli NMC approved?",
    "Yes, MGM Medical College, Kalamboli is fully approved by the National Medical Commission (NMC) and affiliated to MGM Institute of Health Sciences (Deemed University). It holds NAAC A Grade accreditation."
  ],
  [
    "Does MGM Kalamboli have hostel facility?",
    "Yes, MGM Kalamboli provides separate AC and Non-AC hostels for boys and girls. There is also a dedicated international hostel for NRI students on campus."
  ],
  [
    "How to apply for NRI quota at MGM Medical College Kalamboli?",
    "NRI quota admissions are managed directly by the institution. Candidates must be NRI/OCI/PIO or sponsored by NRI parents. NEET qualification is mandatory. Contact the admission office at +91 22 2742 5010."
  ],
  [
    "What is the hospital attached to MGM Medical College Kalamboli?",
    "MGM Hospital Kalamboli, an 800+ bedded multispecialty teaching hospital, is attached to the college and provides extensive clinical training to students across all departments."
  ]
];

const extraVideos = [
  ["MGM Campus Tour", "https://www.youtube.com/embed/JbVfnONzjoI?start=30"],
  ["MGM Hospital Facilities", "https://www.youtube.com/embed/JbVfnONzjoI?start=60"],
  ["MBBS Admission Process", "https://www.youtube.com/embed/JbVfnONzjoI?start=90"],
  ["Student Life at MGM", "https://www.youtube.com/embed/JbVfnONzjoI?start=120"]
];

function estimateRank(score) {
  return Math.round(Math.max(1, (720 - score) * 115));
}

function percentile(score) {
  return (100 - ((720 - score) / 720) * 100).toFixed(1);
}

function KalamboliPreviewPage() {
  const [activeTab, setActiveTab] = useState("courses");
  const [openFaq, setOpenFaq] = useState(null);
  const [sideScore, setSideScore] = useState("");
  const [predScore, setPredScore] = useState("");
  const [predCat, setPredCat] = useState("general");
  const [inquiry, setInquiry] = useState({ name: "", phone: "", score: "", course: "" });
  const [submitted, setSubmitted] = useState(false);

  const rankEstimate = useMemo(() => {
    const score = Number(sideScore);
    if (!score || score < 1 || score > 720) return null;
    return {
      rank: estimateRank(score),
      pct: percentile(score),
      message:
        score >= 535
          ? "Good chances at MGM Kalamboli (General)"
          : score >= 430
            ? "Explore Management / NRI Quota"
            : "Consult counselor for options"
    };
  }, [sideScore]);

  const prediction = useMemo(() => {
    const score = Number(predScore);
    if (!score || score < 1 || score > 720) return null;
    const cutoffs = { general: 535, obc: 505, sc: 405, st: 365, nri: 430 };
    const min = cutoffs[predCat];
    let verdict = "";
    if (predCat === "nri") verdict = "NRI Quota - Contact admission office";
    else if (score >= min) verdict = "High chances at MGM Kalamboli";
    else if (score >= min - 40) verdict = "Moderate - Explore Management Quota";
    else verdict = "Low via counseling - talk to counselor";

    return {
      rank: estimateRank(score),
      pct: percentile(score),
      verdict
    };
  }, [predScore, predCat]);

  function submitInquiry(event) {
    event.preventDefault();
    if (!inquiry.name.trim() || !inquiry.phone.trim()) return;
    setSubmitted(true);
    setInquiry({ name: "", phone: "", score: "", course: "" });
    setTimeout(() => setSubmitted(false), 3000);
  }

  const tab = tabs[activeTab].content;

  return (
    <div className="kp-page">
      <header className="kp-header">
        <div className="kp-container kp-header-content">
          <div className="kp-logo-area">
            <div className="kp-logo-icon">
              <img src="https://i.ibb.co/twXMG4DP/image.png" alt="MGM Medical College Logo" />
            </div>
            <div className="kp-header-title">
              <h1>MGM Medical College, Kalamboli</h1>
              <p>MGM Campus, Kalamboli, Navi Mumbai - 410218 | NMC Approved | Deemed University</p>
              <span className="kp-excellence-badge">
                Excellence in Medical Education | State-of-Art Infrastructure
              </span>
            </div>
          </div>
          <div className="kp-header-contact">
            <span>+91 22 2742 5000</span>
            <small>mgmkalamboli@mgmuhs.com</small>
          </div>
        </div>
      </header>

      <div className="kp-ticker-bar">
        <div className="kp-ticker-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`} className="kp-ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="kp-container kp-main-layout">
        <main className="kp-left-content">
          <div className="kp-college-header">
            <Link to="/" className="kp-back-arrow-btn">
              ← Back
            </Link>
            <h2>MGM Medical College, Kalamboli (Navi Mumbai)</h2>
            <span className="kp-location-tag">MGM Campus, Kalamboli, Navi Mumbai - 410218</span>
          </div>

          <p className="kp-welcome-text">
            Welcome to MGM Medical College Kalamboli MBBS Career Guidance. We are dedicated to
            shaping the leaders and innovators of tomorrow by ensuring every student has a clear,
            purposeful career path. Our team of expert counselors and industry professionals
            provides personalized guidance at every stage of your academic and professional journey.
          </p>

          <img
            className="kp-college-image"
            src="https://i.ibb.co/wFYW6bNb/kalamboli.png"
            alt="MGM Medical College Kalamboli Campus"
          />

          <div className="kp-video-section">
            <h3>MGM Medical College - Video Overview</h3>
            <div className="kp-video-container">
              <iframe
                src="https://www.youtube.com/embed/JbVfnONzjoI"
                title="MGM Medical College Kalamboli Video Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <div className="kp-upcoming-events">
            <h3>Upcoming Events</h3>
            <div className="kp-events-scroll">
              {events.map(([month, year, title, meta]) => (
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

          <div className="kp-highlights-grid">
            {highlights.map(([label, value]) => (
              <div key={label} className="kp-highlight-card">
                <div className="kp-highlight-icon">{label.slice(0, 2).toUpperCase()}</div>
                <div className="kp-highlight-copy">
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="kp-detail-tabs">
            {Object.entries(tabs).map(([key, item]) => (
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
                      {activeTab === "cutoff" ? (
                        <>
                          <th>College Name</th>
                          <th>AIR Round</th>
                          <th>Cutoff</th>
                        </>
                      ) : activeTab === "nri" ? (
                        <>
                          <th>Course</th>
                          <th>Duration</th>
                          <th>NRI Seats</th>
                          <th>Annual Fees (NRI Quota)</th>
                        </>
                      ) : (
                        <>
                          <th>Course</th>
                          <th>Duration</th>
                          <th>Intake</th>
                          <th>Annual Fees</th>
                        </>
                      )}
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

            {tab.note ? (
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

            {tab.note && activeTab !== "nri" ? <p>{tab.note}</p> : null}
            {tab.note && activeTab === "cutoff" ? <p><strong>Note:</strong> {tab.note}</p> : null}
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
            <Link to="/" className="kp-cta-button">
              Download Free Guide
            </Link>
          </div>

          <div className="kp-extra-videos-section">
            <h3>More Videos - MGM Medical College</h3>
            <div className="kp-videos-grid">
              {extraVideos.map(([title, url]) => (
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

          <div className="kp-faq-section">
            <h3>Frequently Asked Questions - MGM Medical College, Kalamboli</h3>
            {faqs.map(([question, answer], index) => (
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
          <div className="kp-sidebar-title">Kalamboli Campus</div>

          <div className="kp-quick-info">
            <h3>Campus at a Glance</h3>
            <p><strong>Location:</strong> Kalamboli, Navi Mumbai</p>
            <p><strong>Established:</strong> 2010</p>
            <p><strong>Hospital Beds:</strong> 800+</p>
            <p><strong>NAAC Grade:</strong> A</p>
            <p><strong>MBBS Seats:</strong> 150</p>
            <p><strong>Campus Area:</strong> 30 Acres</p>
            <p><strong>Faculty:</strong> 300+</p>
            <p><strong>Teaching Hospital:</strong> MGM Hospital Kalamboli</p>
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
            <p>Check your admission chances at MGM Kalamboli</p>
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
              <option>MBBS</option>
              <option>MD - General Medicine</option>
              <option>MD - Radiology</option>
              <option>MD - Dermatology</option>
              <option>MD - Pediatrics</option>
              <option>MS - General Surgery</option>
              <option>MS - Orthopaedics</option>
              <option>MS - Obstetrics &amp; Gynaecology</option>
            </select>
            <button type="submit" className="kp-sinq-submit">
              Send Inquiry
            </button>
            {submitted ? <div className="kp-sinq-success">Thank you! We&apos;ll call you soon.</div> : null}
          </form>

          <div className="kp-quick-info">
            <h3>Quick Contact</h3>
            <p><strong>Admission:</strong> +91 22 2742 5010</p>
            <p><strong>Emergency:</strong> +91 22 2742 5111</p>
            <p><strong>Email:</strong> mgmkalamboli@mgmuhs.com</p>
            <p><strong>Address:</strong> Kalamboli, Navi Mumbai - 410218</p>
          </div>

          <div className="kp-quick-info">
            <h3>Key Admission Topics</h3>
            <p>• MBBS admission in Navi Mumbai</p>
            <p>• Private medical college fees</p>
            <p>• Management quota MBBS</p>
            <p>• NEET counseling 2026</p>
            <p>• Low NEET score options</p>
            <p>• NRI quota admission</p>
          </div>
        </aside>
      </div>

      <footer className="kp-footer">
        <div className="kp-container kp-footer-content">
          <div className="kp-footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">What We Do</Link></li>
              <li><Link to="/">College Predictor</Link></li>
              <li><Link to="/">All Colleges</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="kp-footer-col">
            <h4>Other Colleges</h4>
            <ul>
              <li><a href="/mgm-kamote%20(1).html">MGM Kamothe</a></li>
              <li><a href="/mgm-nerul%20(1).html">MGM Nerul</a></li>
              <li><a href="/mgm-sambhajinagar%20(1).html">MGM Sambhajinagar</a></li>
              <li><a href="/mgm-vashi%20(1).html">MGM Vashi</a></li>
            </ul>
          </div>
          <div className="kp-footer-col">
            <h4>Contact Kalamboli</h4>
            <p>
              mgmkalamboli@mgmuhs.com
              <br />
              +91 22 2742 5000
              <br />
              MGM Campus, Kalamboli, Navi Mumbai - 410218
            </p>
          </div>
        </div>
        <div className="kp-copyright">Copyright MGM MEDICAL MBBS CAREER GUIDANCE. All Rights Reserved.</div>
      </footer>
    </div>
  );
}

export default KalamboliPreviewPage;
