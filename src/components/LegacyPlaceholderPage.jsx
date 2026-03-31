import { Link, useParams } from "react-router-dom";

function LegacyPlaceholderPage({ title, description }) {
  const params = useParams();
  const slug = params.slug ? ` (${params.slug})` : "";

  return (
    <div className="legacy-placeholder-page">
      <div className="legacy-container legacy-placeholder-card">
        <p className="legacy-section-sub">Quick Action</p>
        <h1>
          {title}
          {slug}
        </h1>
        <p>{description}</p>
        <Link to="/" className="primary-btn">
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default LegacyPlaceholderPage;
