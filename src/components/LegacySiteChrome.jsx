import { Link } from "react-router-dom";
import { legacyNavGroups } from "../data/legacyBundleData";

export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function isLegacyStaticLink(target) {
  return target.endsWith(".html");
}

export function LegacySmartLink({ to, className, children, onClick }) {
  if (isLegacyStaticLink(to)) {
    return (
      <a href={to} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function LegacyNav({ mobileMenuOpen, setMobileMenuOpen, aboutMode = "home" }) {
  function handleAboutClick() {
    setMobileMenuOpen(false);
    if (aboutMode === "scroll") {
      scrollToSection("about");
    }
  }

  return (
    <header className="legacy-navbar">
      <div className="legacy-container legacy-nav-inner">
        <Link to="/" className="legacy-logo">
          <span className="legacy-logo-mark legacy-logo-mark-image">
            <img src="/image/logo.png" alt="Admission Elite logo" />
          </span>
          <span>Admission Elite</span>
        </Link>

        <button
          type="button"
          className="legacy-nav-toggle"
          aria-expanded={mobileMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`legacy-nav-links ${mobileMenuOpen ? "is-open" : ""}`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          {aboutMode === "scroll" ? (
            <button type="button" className="legacy-link-button" onClick={handleAboutClick}>
              About Us
            </button>
          ) : (
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
          )}
          <div className="legacy-dropdown">
            <button type="button">University</button>
            <div className="legacy-dropdown-menu">
              {legacyNavGroups.map((group) => (
                <div key={group.title} className="legacy-dropdown-group">
                  <strong>{group.title}</strong>
                  {group.items.map((item) => (
                    <LegacySmartLink
                      key={item.label}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </LegacySmartLink>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <Link to="/Blogs" onClick={() => setMobileMenuOpen(false)}>
            Blogs
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>
          <Link to="/whatsappPage" className="legacy-apply-btn" onClick={() => setMobileMenuOpen(false)}>
            Apply Now
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function LegacyFooter() {
  return (
    <footer className="legacy-footer">
      <div className="legacy-container legacy-footer-grid">
        <div>
          <div className="legacy-footer-brand">
            <img src="/image/logo.png" alt="Admission Elite logo" />
            <span>Admission Elite</span>
          </div>
          <p>
            Haware Infotech Park, A-1401, Sector 30, Near Vashi Railway Station,
            Vashi, Navi Mumbai - 400703.
          </p>
          <div className="legacy-social-row">
            <span>T</span>
            <span>F</span>
            <span>I</span>
            <span>L</span>
          </div>
        </div>
        <div>
          <h4>Useful Links</h4>
          <div className="legacy-footer-links">
            <Link to="/">Home</Link>
            <Link to="/">About Us</Link>
            <Link to="/Blogs">Blogs</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h4>University Links</h4>
          <div className="legacy-footer-links">
            {legacyNavGroups
              .flatMap((group) => group.items)
              .slice(0, 5)
              .map((item) => (
                <LegacySmartLink key={item.label} to={item.to}>
                  {item.label}
                </LegacySmartLink>
              ))}
          </div>
        </div>
      </div>
      <div className="legacy-footer-bottom">
        Copyright MGM MEDICAL MBBS CAREER GUIDANCE All Rights Reserved
      </div>
    </footer>
  );
}
