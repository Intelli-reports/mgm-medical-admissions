import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="site-shell">
      <div className="ticker-wrap">
        <div className="ticker">
          NEET UG 2026 COUNSELING OPEN • TRUSTED GUIDANCE • SHORTLISTING SUPPORT •
          COLLEGE DISCOVERY • FEATURED MEDICAL COLLEGE PAGES •
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a href="/" className="brand">
            Admission <span>Elite</span>
          </a>
          <nav className="site-nav">
            <a href="/#services">Services</a>
            <a href="/#predictor">Predictor</a>
            <a href="/#colleges">Colleges</a>
            <a href="/#contact">Contact</a>
            <a href="/#contact" className="header-cta">
              Book Counseling
            </a>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <h3>Admission Elite</h3>
            <p>
              NEET UG counseling, college comparison, and admission planning with
              reusable detail pages for future colleges.
            </p>
          </div>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/#services">Services</a>
            <a href="/#colleges">Colleges</a>
            <a href="/#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
