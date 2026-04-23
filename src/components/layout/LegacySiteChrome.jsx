import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe2, MapPlus, PhoneCall, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { legacyNavGroups } from "../../data/legacyBundleData";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE } from "../../config/site";
import { GOOGLE_MAPS_URL, legalLinks } from "../../data/site/trust";
import { buildWhatsAppUrl } from "../../utils/enquiry";

// Prefetch a page chunk on hover so navigation feels instant
function usePrefetch(importFn) {
  const prefetched = useRef(false);
  return function handleMouseEnter() {
    if (!prefetched.current) {
      prefetched.current = true;
      importFn().catch(() => {});
    }
  };
}

const admissionWhatsappUrl = buildWhatsAppUrl(
  CONTACT_PHONE,
  "Website admission enquiry"
);

function TopStripIcon({ type }) {
  const paths = {
    phone: (
      <path
        d="M8 4.8c.4-.7 1.2-1 2-.8l1.7.5c.7.2 1.2.8 1.3 1.6l.2 2c.1.6-.1 1.2-.6 1.6l-1.1 1.1a14.2 14.2 0 0 0 3.6 3.6l1.1-1.1c.4-.4 1-.7 1.6-.6l2 .2c.8.1 1.4.6 1.6 1.3L19.2 15c.2.8-.1 1.6-.8 2-1 .6-2.2.9-3.4.7-2.4-.4-4.8-1.8-7-4-2.2-2.2-3.6-4.6-4-7-.2-1.2.1-2.4.7-3.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    mail: (
      <>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M5.5 8l6.5 5 6.5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    map: (
      <>
        <path
          d="M12 21s-6-5.2-6-10.2A6 6 0 1 1 18 10.8C18 15.8 12 21 12 21Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </>
    )
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

export function LegacyTopStrip({ sticky = false, innerRef = null }) {
  const topStripItems = [
    { icon: "phone", label: "Call Now !", value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}` },
    { icon: "mail", label: "Email Now", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: "map", label: "View Location", value: "Open Google Maps", href: GOOGLE_MAPS_URL }
  ];

  const topStripSocials = [
    { label: "Facebook", href: "#", icon: Globe2 },
    { label: "Instagram", href: "#", icon: ArrowUpRight },
    { label: "WhatsApp", href: admissionWhatsappUrl, icon: PhoneCall },
    { label: "YouTube", href: "/blogs", icon: PlayCircle },
    { label: "Maps", href: GOOGLE_MAPS_URL, icon: MapPlus }
  ];

  return (
    <section className={`portal-top-strip ${sticky ? "" : "portal-top-strip-static"}`} ref={innerRef}>
      <div className="legacy-container portal-top-strip-inner">
        <motion.div
          className="portal-top-strip-social"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <span className="portal-top-strip-social-label">Follow us:</span>
          <div className="portal-top-strip-social-links">
            {topStripSocials.map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="portal-top-strip-social-link"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={item.label}
                  title={item.label}
                >
                  <Icon size={18} />
                  <span className="portal-top-strip-social-tooltip">{item.label}</span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="portal-top-strip-links"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.06 }}
        >
          {topStripItems.map((item) => (
            <motion.a
              key={item.label}
              className={`portal-top-strip-item portal-top-strip-item-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              whileHover={{ y: -2 }}
            >
              <span className="portal-inline-icon" aria-hidden="true">
                <TopStripIcon type={item.icon} />
              </span>
              <span className="portal-top-strip-link-copy">
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function isLegacyStaticLink(target) {
  return target.endsWith(".html");
}

function isExternalLink(target) {
  return /^(https?:|mailto:|tel:)/i.test(target);
}

function isWebUrl(target) {
  return /^https?:/i.test(target);
}

export function LegacySmartLink({ to, className, children, onClick }) {
  if (isLegacyStaticLink(to) || isExternalLink(to)) {
    return (
      <a
        href={to}
        className={className}
        onClick={onClick}
        target={isWebUrl(to) ? "_blank" : undefined}
        rel={isWebUrl(to) ? "noreferrer" : undefined}
      >
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

export function LegacyNav({ mobileMenuOpen, setMobileMenuOpen, aboutMode = "home", stickyTop = 0 }) {
  const [activeGroupTitle, setActiveGroupTitle] = useState("");
  const [submenuDirection, setSubmenuDirection] = useState("right");
  const dropdownRef = useRef(null);
  const closeTimerRef = useRef(null);

  // Prefetch page chunks on nav hover — loads JS before click
  const prefetchContact  = usePrefetch(() => import("../../pages/ContactPage"));
  const prefetchAbout    = usePrefetch(() => import("../../pages/AboutPage"));
  const prefetchBlogs    = usePrefetch(() => import("../../pages/BlogsPage"));
  const prefetchCollege  = usePrefetch(() => import("../../pages/CollegePreviewPage"));

  useEffect(() => {
    function handlePointerDown(event) {
      if (!dropdownRef.current?.contains(event.target)) {
        setActiveGroupTitle("");
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  function cancelCloseTimer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function scheduleClose() {
    cancelCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveGroupTitle("");
    }, 180);
  }

  function handleAboutClick() {
    setMobileMenuOpen(false);
    if (aboutMode === "scroll") {
      scrollToSection("about");
    }
  }

  function handleGroupSelect(title, event) {
    const rowElement = event?.currentTarget;
    if (rowElement instanceof HTMLElement) {
      const rowRect = rowElement.getBoundingClientRect();
      const submenuWidth = 480;
      const gap = 12;
      const spaceOnRight = window.innerWidth - rowRect.right;
      const spaceOnLeft = rowRect.left;

      if (spaceOnRight < submenuWidth + gap && spaceOnLeft > submenuWidth + gap) {
        setSubmenuDirection("left");
      } else {
        setSubmenuDirection("right");
      }
    }

    setActiveGroupTitle(title);
  }

  function handleUniversityLinkClick() {
    setActiveGroupTitle("");
    setMobileMenuOpen(false);
  }

  return (
    <header className="legacy-navbar" style={{ top: `${stickyTop}px` }}>
      <div className="legacy-container legacy-nav-inner">
        <Link to="/" className="legacy-logo">
          <span className="legacy-logo-mark legacy-logo-mark-image">
            <img src="/image/logo.webp" alt="BalaJi logo" fetchpriority="high" decoding="async" />
          </span>
          <span>BalaJi</span>
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
            <Link to="/about" onMouseEnter={prefetchAbout} onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
          )}
          <div ref={dropdownRef} className="legacy-nav-university-tabs" onMouseLeave={scheduleClose}>
            {legacyNavGroups.map((group) => (
              <div
                key={group.title}
                className={`legacy-dropdown legacy-dropdown-tab ${activeGroupTitle === group.title ? "is-open" : ""}`}
                onMouseEnter={(event) => {
                  cancelCloseTimer();
                  handleGroupSelect(group.title, event);
                  prefetchCollege();
                }}
              >
                <button
                  type="button"
                  className={`legacy-dropdown-trigger legacy-dropdown-tab-trigger ${
                    activeGroupTitle === group.title ? "is-active" : ""
                  }`}
                  aria-expanded={activeGroupTitle === group.title ? "true" : "false"}
                  onFocus={(event) => handleGroupSelect(group.title, event)}
                  onClick={(event) => handleGroupSelect(group.title, event)}
                >
                  {group.title}
                </button>
                <div
                  className={`legacy-dropdown-submenu legacy-dropdown-tab-submenu legacy-dropdown-submenu-${submenuDirection} ${
                    activeGroupTitle === group.title ? "is-open" : ""
                  }`}
                >
                  {group.items.map((item) => (
                    <LegacySmartLink
                      key={item.label}
                      to={item.to}
                      onClick={handleUniversityLinkClick}
                    >
                      {item.label}
                    </LegacySmartLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Link to="/blogs" onMouseEnter={prefetchBlogs} onClick={() => setMobileMenuOpen(false)}>
            Blogs
          </Link>
          <Link to="/contact" onMouseEnter={prefetchContact} onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>
          <a
            href={admissionWhatsappUrl}
            className="legacy-apply-btn"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
          >
            Apply Now
          </a>
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
            <img src="/image/logo.webp" alt="BalaJi logo" loading="lazy" decoding="async" />
            <span>BalaJi</span>
          </div>
          <p>{CONTACT_ADDRESS}.</p>
          <div className="legacy-footer-meta">
            <a href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}>{CONTACT_PHONE}</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
              View Office on Google Maps
            </a>
          </div>
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
            <Link to="/about">About Us</Link>
            <Link to="/blogs">Blogs</Link>
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
        <div>
          <h4>Trust & Legal</h4>
          <div className="legacy-footer-links">
            {legalLinks.map((item) => (
              <Link key={item.label} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="legacy-footer-bottom">
        Copyright BalaJi Admission Guidance. All rights reserved.
      </div>
    </footer>
  );
}
