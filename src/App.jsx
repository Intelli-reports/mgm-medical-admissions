import { useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import BlogArticlePage from "./pages/BlogArticlePage";
import CollegePreviewPage from "./pages/CollegePreviewPage";
import BlogsPage from "./pages/BlogsPage";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AdminConsolePage from "./pages/AdminConsolePage";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";

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
      <div key={pathname} className="route-shell">
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
      </div>
    </>
  );
}

export default App;
