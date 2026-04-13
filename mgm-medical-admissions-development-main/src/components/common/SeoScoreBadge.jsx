function SeoScoreBadge() {
  return (
    <section className="legacy-seo-badge-section" aria-label="SEO score badge">
      <div className="legacy-container">
        <div className="legacy-seo-badge-card">
          <div className="legacy-seo-badge-copy">
            <p className="legacy-section-sub">SEO Score</p>
            <h2>Independent technical SEO score</h2>
            <p>
              This Seobility badge is displayed as a public trust element for the homepage and
              can be removed later without affecting the website structure.
            </p>
          </div>

          <a
            className="legacy-seo-badge-link"
            href="https://www.seobility.net/en/seocheck/check?url=https%3A%2F%2Fmgmmbbsmdms.com%2F"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://app.seobility.net/widget/widget.png?url=https%3A%2F%2Fmgmmbbsmdms.com%2F"
              alt="Seobility Score for mgmmbbsmdms.com"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default SeoScoreBadge;
