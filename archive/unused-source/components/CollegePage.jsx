import { Link, useParams } from "react-router-dom";

function CollegePage({ colleges }) {
  const { slug } = useParams();
  const college = colleges.find((item) => item.slug === slug);

  if (!college) {
    return (
      <div className="container missing-page">
        <h1>College page not found</h1>
        <Link to="/" className="primary-btn">
          Return Home
        </Link>
      </div>
    );
  }

  const otherColleges = colleges.filter((item) => item.slug !== college.slug);

  return (
    <div className="college-page-shell">
      <section className="college-hero">
        <div className="container college-hero-grid">
          <div className="college-hero-copy">
            <p className="crumbs">
              <Link to="/">Home</Link> / <span>{college.shortName}</span>
            </p>
            <h1>{college.name}</h1>
            <p>{college.overview}</p>
            <div className="tag-row">
              {college.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="hero-actions">
              <a href="#highlights" className="primary-btn">
                View Highlights
              </a>
              <a href="#cutoff" className="secondary-btn">
                Cutoff Snapshot
              </a>
            </div>
          </div>
          <div className="college-hero-media">
            <img src={college.image} alt={college.name} />
          </div>
        </div>
      </section>

      <section id="highlights" className="section">
        <div className="container">
          <div className="section-head section-head-left">
            <h2>{college.shortName} Highlights</h2>
            <p>
              Compact cards keep the key data easy to scan and can be reused for every
              future college page in the project.
            </p>
          </div>
          <div className="highlight-grid">
            {college.highlights.map(([label, value]) => (
              <article className="highlight-card" key={label}>
                <div className="highlight-icon">{label.slice(0, 2).toUpperCase()}</div>
                <div>
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cutoff" className="section">
        <div className="container">
          <div className="college-detail-grid">
            <article className="detail-panel">
              <h3>Admission Snapshot</h3>
              <div className="detail-list">
                <div>
                  <strong>Established</strong>
                  <span>{college.established}</span>
                </div>
                <div>
                  <strong>MBBS Seats</strong>
                  <span>{college.seats}</span>
                </div>
                <div>
                  <strong>Hospital Beds</strong>
                  <span>{college.beds}</span>
                </div>
                <div>
                  <strong>MBBS Fee</strong>
                  <span>{college.fee}</span>
                </div>
                <div>
                  <strong>NRI Fee</strong>
                  <span>{college.nriFee}</span>
                </div>
                <div>
                  <strong>Phone</strong>
                  <span>{college.phone}</span>
                </div>
              </div>
            </article>

            <article className="detail-panel">
              <h3>Cutoff Benchmarks</h3>
              <div className="cutoff-grid">
                {Object.entries(college.cutoffs).map(([category, value]) => (
                  <div className="cutoff-card" key={category}>
                    <strong>{value}</strong>
                    <span>{category.toUpperCase()}</span>
                    <small>Current guidance benchmark for quick comparison.</small>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head-left">
            <h2>Compare With Other Colleges</h2>
            <p>
              Every college page now lives inside one routed React project, so users
              can move between campuses without disconnected HTML files.
            </p>
          </div>
          <div className="mini-college-grid">
            {otherColleges.map((item) => (
              <Link to={`/college/${item.slug}`} className="mini-college-card" key={item.slug}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.shortName}</strong>
                  <span>
                    {item.seats} seats • {item.beds} beds
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CollegePage;
