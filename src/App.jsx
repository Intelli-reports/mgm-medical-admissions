import { lazy, Suspense, useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// Route-based code splitting — each page is a separate JS chunk
// loaded only when the user navigates to that route
const HomePage           = lazy(() => import("./pages/HomePage"));
const AboutPage          = lazy(() => import("./pages/AboutPage"));
const CollegePreviewPage = lazy(() => import("./pages/CollegePreviewPage"));
const ContactPage        = lazy(() => import("./pages/ContactPage"));
const BlogsPage          = lazy(() => import("./pages/BlogsPage"));
const BlogArticlePage    = lazy(() => import("./pages/BlogArticlePage"));
const AdminConsolePage   = lazy(() => import("./pages/AdminConsolePage"));
const PrivacyPolicyPage  = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsPage          = lazy(() => import("./pages/TermsPage"));

function PageLoader() {
  return (
    <div className="branded-loader-wrap">
      <div className="branded-loader-inner">
        <div className="branded-loader-logo">
          <img src="/image/logo.webp" alt="BalaJi logo" />
        </div>
        <div className="branded-loader-text">
          <h2>Medical Admissions Trust</h2>
          <p>Your journey to excellence starts here...</p>
        </div>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: isFirstRender.current ? "auto" : "smooth"
    });
    isFirstRender.current = false;
  }, [pathname]);

  return null;
}

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <div
        key={pathname}
        className="route-shell"
        ref={(el) => {
          if (!el) return;
          el.addEventListener("animationend", () => el.classList.add("animation-done"), { once: true });
        }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="preview/:slug" element={<CollegePreviewPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="blogs/:slug" element={<BlogArticlePage />} />
            <Route path="Blogs" element={<BlogsPage />} />
            <Route path="Blogs/:slug" element={<BlogArticlePage />} />
            <Route path="admin/*" element={<AdminConsolePage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms-and-conditions" element={<TermsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
