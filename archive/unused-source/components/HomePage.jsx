import { Link } from "react-router-dom";
import { colleges, homeStats, services } from "../data/colleges";

function HomePage() {
  return (
    <div className="page-shell">
      <section className="hero-section">
        <div className="container">
          <div className="hero-card">
            <span className="hero-kicker">One-Stop Solution</span>
            <h1>
              NEET UG <br />
              <span>Counseling 2026</span>
            </h1>
            <p>
              We guide students and parents through NEET decision-making, college
              shortlisting, and admission planning, then help them review detailed
              college pages with more clarity and confidence.
            </p>
            <div className="hero-actions">
              <a href="#predictor" className="primary-btn">
                Use College Predictor
              </a>
              <a href="#services" className="secondary-btn">
                Explore Services
              </a>
            </div>
            <div className="hero-pill-grid">
              <div className="hero-pill">
                <strong>Who We Are</strong>
                <span>NEET counseling and college guidance support</span>
              </div>
              <div className="hero-pill">
                <strong>What We Do</strong>
                <span>Shortlisting, comparison, predictor, and guidance</span>
              </div>
              <div className="hero-pill">
                <strong>Our Record</strong>
                <span>Steady support backed by guidance experience</span>
              </div>
              <div className="hero-pill">
                <strong>College Details</strong>
                <span>Featured pages help users check campus information</span>
              </div>
            </div>
          </div>

          <div className="stats-bar">
            {homeStats.map((item) => (
              <div className="stat-block" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-head">
            <h2>What We Do</h2>
            <p>
              Counseling support comes first. College detail pages help students go
              deeper only after they have clarity on process, options, and next
              steps.
            </p>
          </div>
          <div className="service-grid">
            {services.map(([icon, title, text]) => (
              <article className="service-card" key={title}>
                <div className="service-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="predictor" className="section">
        <div className="container">
          <div className="predictor-panel">
            <div className="section-head section-head-left">
              <h2>College Predictor</h2>
              <p>
                A quick 2026 guidance block for the website. This is a signal tool, not
                a final counseling decision engine.
              </p>
            </div>
            <div className="predictor-grid">
              <div className="predictor-form">
                <label htmlFor="homeScore">Expected NEET Score</label>
                <input id="homeScore" type="number" placeholder="Enter score from 0 to 720" />
                <small>
                  Use the college pages after this to compare intake, fees, beds, and
                  location more clearly.
                </small>
              </div>
              <div className="predictor-result">
                <div className="result-top">
                  <strong>2026</strong>
                  <span>Planning mode</span>
                </div>
                <div className="result-bar">
                  <div style={{ width: "82%" }} />
                </div>
                <p>
                  This block is now part of the React homepage and can be upgraded into
                  a real dynamic predictor next without changing the overall structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="colleges" className="section">
        <div className="container">
          <div className="section-head">
            <h2>Featured Colleges</h2>
            <p>
              These pages now run from one reusable React data structure, so future
              colleges can be added without repeating full static files.
            </p>
          </div>
          <div className="college-grid">
            {colleges.map((college) => (
              <article className="college-card" key={college.slug}>
                <img src={college.image} alt={college.name} />
                <div className="college-card-body">
                  <div className="tag-row">
                    {college.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h3>{college.name}</h3>
                  <p>{college.tagline}</p>
                  <div className="metric-grid">
                    <div>
                      <strong>{college.seats}</strong>
                      <span>MBBS Seats</span>
                    </div>
                    <div>
                      <strong>{college.beds}</strong>
                      <span>Hospital Beds</span>
                    </div>
                    <div>
                      <strong>{college.fee}</strong>
                      <span>Annual Fee</span>
                    </div>
                    <div>
                      <strong>{college.established}</strong>
                      <span>Established</span>
                    </div>
                  </div>
                  <Link to={`/college/${college.slug}`} className="card-btn">
                    View College Page
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="contact-panel">
            <div className="section-head section-head-left">
              <h2>Why Students Trust Admission Elite</h2>
              <p>
                We are building this as a reusable counseling platform first, with
                college pages as structured content assets underneath it.
              </p>
            </div>
            <div className="contact-grid">
              <div className="contact-card">
                <strong>Counselor-led support</strong>
                <span>Decision support before final college selection.</span>
              </div>
              <div className="contact-card">
                <strong>Reusable college system</strong>
                <span>Future colleges can plug into the same structure.</span>
              </div>
              <div className="contact-card">
                <strong>Student-first flow</strong>
                <span>Trust, process, and clarity before deeper college reading.</span>
              </div>
              <div className="contact-card">
                <strong>Fast expansion model</strong>
                <span>Add data for more colleges instead of rebuilding full pages.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
