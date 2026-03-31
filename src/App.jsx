import { useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CollegePreviewPage from "./components/CollegePreviewPage";
import LegacyBlogsPage from "./components/LegacyBlogsPage";
import LegacyBundleHome from "./components/LegacyBundleHome";
import LegacyContactPage from "./components/LegacyContactPage";
import LegacyPlaceholderPage from "./components/LegacyPlaceholderPage";

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
          <Route index element={<LegacyBundleHome />} />
          <Route path="preview/:slug" element={<CollegePreviewPage />} />
          <Route path="contact" element={<LegacyContactPage />} />
          <Route path="blogs" element={<LegacyBlogsPage />} />
          <Route path="Blogs" element={<LegacyBlogsPage />} />
          <Route
            path="whatsappPage"
            element={
              <LegacyPlaceholderPage
                title="Apply Now"
                description="The archived bundle linked this button to a WhatsApp-style action page. This placeholder keeps the route readable in source code."
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
