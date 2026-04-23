import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeDollarSign,
  ChevronDown,
  Clapperboard,
  ClipboardList,
  FileCheck2,
  Globe2,
  MapPinned,
  MapPlus,
  NotebookText,
  PhoneCall,
  PlayCircle,
  Search,
  UserRound
} from "lucide-react";
import { Link } from "react-router-dom";
import { createLead, getManagedCollegesSync, getPublicNoticesSync, getPublishedBlogsSync } from "../admin/api";
import LegacyBlogShowcase from "../components/blog/LegacyBlogShowcase";
import SeoScoreBadge from "../components/common/SeoScoreBadge";
import { LegacyFooter, LegacyNav, LegacySmartLink, LegacyTopStrip } from "../components/layout/LegacySiteChrome";
import SeoHead from "../components/layout/SeoHead";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, makeAbsoluteUrl } from "../config/site";
import {
  GOOGLE_MAPS_URL,
  legalLinks
} from "../data/site/trust";
import { buildEnquiryMessage, buildWhatsAppUrl, isValidPhone } from "../utils/enquiry";
import { bannerReveal, cardHover, headlineReveal, sectionReveal, softTap, staggerContainer, staggerItem } from "../utils/motion";

function extractYouTubeId(url) {
  const match = url.match(/embed\/([^?&/]+)/);
  return match ? match[1] : "";
}

function toPlayableEmbedUrl(url) {
  const safeUrl = url.replace(
    "https://www.youtube.com/embed/",
    "https://www.youtube-nocookie.com/embed/"
  );
  return `${safeUrl}${safeUrl.includes("?") ? "&" : "?"}autoplay=1&rel=0`;
}

function buildHomeVideoItems() {
  return getManagedCollegesSync()
    .flatMap((college) => {
      const items = [];

      if (college.video) {
        items.push({
          title: `${college.shortName} Video Overview`,
          url: college.video,
          college: college.shortName
        });
      }

      (college.extraVideos || []).forEach(([title, url]) => {
        items.push({
          title,
          url,
          college: college.shortName
        });
      });

      return items;
    })
    .filter((item) => extractYouTubeId(item.url))
    .slice(0, 6);
}

function PortalIcon({ type }) {
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
    ),
    founder: (
      <>
        <circle cx="12" cy="8" r="3.2" fill="currentColor" />
        <path
          d="M5.5 19.5c.9-3.5 3.4-5.3 6.5-5.3s5.6 1.8 6.5 5.3"
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    verified: (
      <>
        <circle cx="12" cy="12" r="8" fill="currentColor" />
        <path d="m9 12.1 1.8 1.9 4-4.2" fill="none" stroke="#ffffff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    support: (
      <>
        <circle cx="9" cy="9.2" r="2.3" fill="currentColor" />
        <circle cx="15.4" cy="9.2" r="2.3" fill="currentColor" />
        <path
          d="M4.8 18c.6-2.6 2.5-4 4.7-4 2.1 0 4 1.4 4.7 4"
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.4 18c.5-1.9 1.9-3 3.5-3 1.6 0 3 1.1 3.4 3"
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    notes: (
      <path
        d="M4.5 7.5h15M7.5 12h9m-9 4.5h9M6.5 4.5h11A1.5 1.5 0 0 1 19 6v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18V6a1.5 1.5 0 0 1 1.5-1.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[type] || paths.notes}
    </svg>
  );
}

function inferCollegeType(college) {
  const typeHighlight = college.highlights?.find(([label]) => label === "Type of College")?.[1] || "";
  const source = `${typeHighlight} ${college.headerSubtitle || ""}`;

  if (/deemed/i.test(source)) return "Deemed";
  if (/private/i.test(source)) return "Private";
  if (/government/i.test(source)) return "Government";

  return "Medical College";
}

function inferCollegeRegion(location) {
  if (/Navi Mumbai/i.test(location)) return "Navi Mumbai";
  if (/Pune/i.test(location)) return "Pune";
  if (/Sambhajinagar|Aurangabad/i.test(location)) return "Sambhajinagar";
  return "Maharashtra";
}

function HomePage() {
  const topStripRef = useRef(null);
  const headerRef = useRef(null);
  const trustRowRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroLayout, setHeroLayout] = useState({
    topStripHeight: 0,
    heroStageHeight: null,
    useExactHeroHeight: false
  });
  const [quickDesk, setQuickDesk] = useState({
    name: "",
    phone: "",
    course: "MBBS Admission Guidance",
    preferredState: "Maharashtra",
    budget: ""
  });
  const [quickDeskStatus, setQuickDeskStatus] = useState({ type: "idle", message: "" });
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    course: "MBBS"
  });
  const [registerStatus, setRegisterStatus] = useState({ type: "idle", message: "" });
  const [directoryQuery, setDirectoryQuery] = useState("");
  const [directoryFilter, setDirectoryFilter] = useState("all");
  const managedBlogs = getPublishedBlogsSync();
  const managedColleges = getManagedCollegesSync();
  const homeVideos = buildHomeVideoItems();
  const [activeVideo, setActiveVideo] = useState(homeVideos[0] || null);

  const applyForGuidanceUrl = buildWhatsAppUrl(CONTACT_PHONE, "Homepage admission enquiry");
  const trustRow = [
    { title: "Founder Rahul Singh - Expert Advisor", text: "", icon: "founder" },
    { title: "Office Verified - Visit Us", text: "", icon: "verified" },
    { title: "End-to-End Parent Support", text: "", icon: "support" }
  ];

  const categoryCards = [
    { title: "Private MBBS Admissions", text: "Private colleges and budget-fit pathways.", to: "/contact", tone: "blue" },
    { title: "Deemed University MBBS", text: "Deemed campuses, fee review, and shortlisting.", to: "#portal-colleges", tone: "teal" },
    { title: "MD/MS Specializations", text: "Postgraduate counseling support and decision flow.", to: "/contact", tone: "green" },
    { title: "NRI / OCI Quota Admissions", text: "Eligibility, process guidance, and document clarity.", to: "/contact", tone: "blue" },
    { title: "State Counselling Guidance", text: "Round planning, shortlist review, and reporting readiness.", to: "/contact", tone: "teal" },
    { title: "Management Quota Seats", text: "Private and deemed counseling guidance support.", to: "/contact", tone: "green" }
  ];

  const dashboardInfoBlocks = [
    { title: "Fee Ranges & Structure", Icon: BadgeDollarSign },
    { title: "Counselling Types (AIQ/State/Pvt)", Icon: ClipboardList },
    { title: "Required Documents Checklists", Icon: FileCheck2 },
    { title: "Bond & Hostel Notes", Icon: NotebookText }
  ];

  const noticeBoardItems = getPublicNoticesSync();

  const processSteps = [
    "Profile Review & Analysis",
    "Shortlist Colleges",
    "Expert Counselling",
    "Reporting & Admission"
  ];

  const dashboardPanels = {
    quick: { delay: 0.04 },
    category: { delay: 0.1 },
    directory: { delay: 0.16 },
    info: { delay: 0.22 },
    sidebar: { delay: 0.12 }
  };

  const homeSchema = [
    { "@type": "WebSite", name: "BalaJi Admission Guidance", url: makeAbsoluteUrl("/") },
    { "@type": "Organization", name: "BalaJi Admission Guidance", url: makeAbsoluteUrl("/") },
    {
      "@type": "LocalBusiness",
      name: "BalaJi Admission Guidance",
      url: makeAbsoluteUrl("/"),
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      address: { "@type": "PostalAddress", streetAddress: CONTACT_ADDRESS }
    }
  ];

  const collegeEntries = managedColleges.map((college) => ({
    slug: college.slug,
    name: college.fullName,
    location: college.locationLine,
    region: inferCollegeRegion(college.locationLine),
    type: inferCollegeType(college),
    route: `/preview/${college.slug}`
  }));

  const filteredColleges = collegeEntries.filter((college) => {
    const searchText = `${college.name} ${college.location} ${college.region} ${college.type}`.toLowerCase();
    const queryMatch = searchText.includes(directoryQuery.trim().toLowerCase());

    if (!queryMatch) return false;
    if (directoryFilter === "all") return true;
    if (directoryFilter === "deemed") return college.type === "Deemed";
    if (directoryFilter === "private") return college.type === "Private";
    if (directoryFilter === "navi-mumbai") return college.region === "Navi Mumbai";

    return college.region !== "Navi Mumbai";
  });

  const dashboardColleges = filteredColleges.slice(0, 6);

  const resourceCards = [
    {
      eyebrow: "Video Library",
      title: homeVideos[0] ? `${homeVideos[0].college} campus and guidance videos` : "Medical college video library",
      text: "Watch current campus and counseling clips before moving to detailed college pages.",
      href: "#portal-videos"
    },
    {
      eyebrow: "Blog Article",
      title: managedBlogs[0]?.title || "Admission blog",
      text: managedBlogs[0]?.excerpt || "Latest counseling guidance and admission planning articles.",
      href: "#blogs"
    },
    {
      eyebrow: "Guidance Post",
      title: "Document checklist before private and deemed counseling",
      text: "Prepare scorecard, ID, budget notes, and reporting papers before calling the desk.",
      href: "/contact"
    }
  ];

  function updateQuickDesk(field, value) {
    setQuickDesk((old) => ({ ...old, [field]: value }));

    if (quickDeskStatus.type !== "idle") {
      setQuickDeskStatus({ type: "idle", message: "" });
    }
  }

  async function handleQuickDeskSubmit(event) {
    event.preventDefault();

    if (!quickDesk.name.trim()) {
      setQuickDeskStatus({ type: "error", message: "Enter your name before sending the enquiry." });
      return;
    }

    if (!isValidPhone(quickDesk.phone)) {
      setQuickDeskStatus({ type: "error", message: "Enter a valid mobile number before sending the enquiry." });
      return;
    }

    const enquiryMessage = buildEnquiryMessage({
      context: "Homepage quick admission desk enquiry",
      name: quickDesk.name.trim(),
      phone: quickDesk.phone.trim(),
      email: "",
      city: quickDesk.preferredState,
      course: quickDesk.course,
      score: "",
      message: quickDesk.budget.trim()
        ? `Estimated budget: ${quickDesk.budget.trim()}`
        : "Need admission guidance and shortlist support."
    });

    await createLead({
      source: "quick-desk",
      name: quickDesk.name.trim(),
      phone: quickDesk.phone.trim(),
      city: quickDesk.preferredState,
      course: quickDesk.course,
      message: quickDesk.budget.trim() ? `Estimated budget: ${quickDesk.budget.trim()}` : "Need admission guidance and shortlist support.",
      sourcePage: "/",
      metadata: { preferredState: quickDesk.preferredState.trim(), budget: quickDesk.budget.trim() }
    });
    window.open(buildWhatsAppUrl(CONTACT_PHONE, enquiryMessage), "_blank", "noopener,noreferrer");
    setQuickDeskStatus({ type: "success", message: "WhatsApp opened with your prefilled admission enquiry." });
  }

  function updateRegisterForm(field, value) {
    setRegisterForm((old) => ({ ...old, [field]: value }));

    if (registerStatus.type !== "idle") {
      setRegisterStatus({ type: "idle", message: "" });
    }
  }

  async function handleRegisterSubmit(event) {
    event.preventDefault();

    if (!registerForm.fullName.trim()) {
      setRegisterStatus({ type: "error", message: "Enter your full name before submitting." });
      return;
    }

    if (!isValidPhone(registerForm.mobile)) {
      setRegisterStatus({ type: "error", message: "Enter a valid mobile number before submitting." });
      return;
    }

    const enquiryMessage = buildEnquiryMessage({
      context: "Homepage registration enquiry",
      name: registerForm.fullName.trim(),
      phone: registerForm.mobile.trim(),
      email: registerForm.email.trim(),
      city: registerForm.city.trim(),
      course: registerForm.course.trim(),
      score: "",
      message: "Interested in MGM, DY Patil, and other college guidance."
    });

    await createLead({
      source: "registration",
      name: registerForm.fullName.trim(),
      phone: registerForm.mobile.trim(),
      email: registerForm.email.trim(),
      city: registerForm.city.trim(),
      course: registerForm.course.trim(),
      message: "Interested in MGM, DY Patil, and other college guidance.",
      sourcePage: "/",
      metadata: { form: "register-banner" }
    });
    window.open(buildWhatsAppUrl(CONTACT_PHONE, enquiryMessage), "_blank", "noopener,noreferrer");
    setRegisterStatus({ type: "success", message: "WhatsApp opened with your registration enquiry." });
  }

  useLayoutEffect(() => {
    function getMinHeroHeight(viewportWidth, availableHeight) {
      if (viewportWidth <= 760) {
        return Math.max(460, availableHeight);
      }

      if (viewportWidth <= 900) {
        return Math.max(520, availableHeight);
      }

      return Math.max(420, availableHeight);
    }

  function updateHeroLayout() {
      const topStripHeight = topStripRef.current?.getBoundingClientRect().height || 0;
      const headerHeight = headerRef.current?.getBoundingClientRect().height || 0;
      const viewportHeight =
        window.visualViewport?.height ||
        window.innerHeight ||
        document.documentElement.clientHeight ||
        0;
      const availableHeight = Math.max(viewportHeight - topStripHeight - headerHeight, 0);
      const useExactHeroHeight = window.innerWidth >= 1024;
      const desktopOverlayBuffer = useExactHeroHeight ? 28 : 0;

      setHeroLayout({
        topStripHeight,
        heroStageHeight: useExactHeroHeight
          ? Math.max(availableHeight + desktopOverlayBuffer, 460)
          : getMinHeroHeight(window.innerWidth, availableHeight),
        useExactHeroHeight
      });
    }

    updateHeroLayout();

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => updateHeroLayout())
      : null;

    [topStripRef.current, headerRef.current, trustRowRef.current]
      .filter(Boolean)
      .forEach((element) => resizeObserver?.observe(element));

    window.addEventListener("resize", updateHeroLayout);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateHeroLayout);
    };
  }, []);

  const heroStageStyle = heroLayout.heroStageHeight
    ? heroLayout.useExactHeroHeight
      ? {
          height: `${heroLayout.heroStageHeight}px`,
          minHeight: `${heroLayout.heroStageHeight}px`
        }
      : { minHeight: `${heroLayout.heroStageHeight}px` }
    : undefined;

  return (
    <div className="legacy-page home-page portal-home">
      <SeoHead
        title="NEET UG Counseling and Medical College Guidance 2026"
        description="Medical admission guidance for NEET UG counseling, college shortlisting, state-wise options, MBBS fees, and detailed medical college research."
        canonicalPath="/"
        keywords={[
          "NEET UG counseling 2026",
          "medical college guidance",
          "MBBS admission guidance",
          "medical college fees and cutoff",
          "state wise medical college seats"
        ]}
        schema={homeSchema}
      />

      <LegacyTopStrip sticky innerRef={topStripRef} />

      <div ref={headerRef}>
        <LegacyNav
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          aboutMode="scroll"
          stickyTop={heroLayout.topStripHeight}
        />
      </div>

      <motion.section className="portal-home-hero" variants={bannerReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.01 }}>
        <div className="portal-hero-stage" style={heroStageStyle}>
          <img
            src="/image/mgm-college.webp"
            srcSet="/image/mgm-college-480w.webp 480w, /image/mgm-college-800w.webp 800w, /image/mgm-college.webp 1200w"
            sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
            alt="MGM medical college admissions office"
            className="portal-hero-stage-office"
            fetchpriority="high"
            decoding="async"
          />

          <div className="legacy-container portal-hero-stage-inner" style={heroStageStyle}>
            <motion.div className="portal-home-copy" variants={staggerContainer} initial="hidden" animate="show">
              <motion.span className="portal-home-kicker" variants={staggerItem}>
                Medical Admission Guidance Portal
              </motion.span>
              <motion.h1 variants={headlineReveal}>BalaJi Admission Guidance</motion.h1>
              <motion.h2 variants={headlineReveal}>India&apos;s Leading Medical Admissions Guidance Portal</motion.h2>
              <motion.p className="portal-home-subtitle" variants={staggerItem}>
                Expert guidance for MBBS, MD/MS, private, deemed, management, and NRI
                quota admissions to top medical colleges.
              </motion.p>

              <motion.div className="portal-home-actions" variants={staggerItem}>
                <Link to="/contact" className="legacy-btn legacy-btn-dark portal-home-primary">
                  Talk to Admissions Desk
                </Link>
                <a href="#portal-colleges" className="legacy-btn legacy-btn-outline portal-home-secondary">
                  Browse Colleges &amp; Cut-offs
                </a>
              </motion.div>
            </motion.div>
          </div>

          <motion.div className="portal-trust-overlay" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.01 }}>
            <div className="legacy-container">
              <div className="portal-trust-row" ref={trustRowRef}>
                {trustRow.map((item) => (
                  <motion.article
                    key={item.title}
                    className="portal-trust-item"
                    whileHover={cardHover}
                    whileTap={softTap}
                  >
                    <span className="portal-trust-icon" aria-hidden="true">
                      <PortalIcon type={item.icon} />
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      {item.text ? <span>{item.text}</span> : null}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="portal-main-section" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.01 }}>
        <div className="legacy-container portal-shot-grid">
          <div className="portal-shot-main">
            <div className="portal-shot-top">
              <motion.section
                className="portal-shot-panel portal-shot-quick"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.42, delay: dashboardPanels.quick.delay }}
              >
                <h2>QUICK ADMISSION DESK</h2>

                <form className="portal-shot-form" onSubmit={handleQuickDeskSubmit}>
                  <input
                    type="text"
                    value={quickDesk.name}
                    onChange={(event) => updateQuickDesk("name", event.target.value)}
                    placeholder="Full Name"
                  />
                  <input
                    type="tel"
                    value={quickDesk.phone}
                    onChange={(event) => updateQuickDesk("phone", event.target.value)}
                    placeholder="Phone Number"
                  />
                  <input
                    type="text"
                    value={quickDesk.course}
                    onChange={(event) => updateQuickDesk("course", event.target.value)}
                    placeholder="Target Course (MBBS/MD/MS/Other)"
                  />
                  <input
                    type="text"
                    value={quickDesk.preferredState}
                    onChange={(event) => updateQuickDesk("preferredState", event.target.value)}
                    placeholder="Preferred State"
                  />
                  <input
                    type="text"
                    value={quickDesk.budget}
                    onChange={(event) => updateQuickDesk("budget", event.target.value)}
                    placeholder="Estimated Budget"
                  />

                  <button type="submit" className="portal-shot-submit">
                    [Request Expert Callback]
                  </button>

                  {quickDeskStatus.type !== "idle" ? (
                    <p className={`portal-inline-status is-${quickDeskStatus.type}`}>
                      {quickDeskStatus.message}
                    </p>
                  ) : null}
                </form>
              </motion.section>

              <motion.section
                className="portal-shot-panel portal-shot-categories"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.42, delay: dashboardPanels.category.delay }}
              >
                <h2>ADMISSION CATEGORIES</h2>

                <div className="portal-shot-category-grid">
                  {categoryCards.map((item, index) => {
                    const isHashLink = item.to.startsWith("#");
                    const className = `portal-shot-category-card tone-${item.tone}`;

                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.01 }}
                        transition={{ duration: 0.28, delay: 0.14 + index * 0.04 }}
                        whileHover={cardHover}
                        whileTap={softTap}
                      >
                        {isHashLink ? (
                          <a href={item.to} className={className}>
                            <strong>{item.title}</strong>
                          </a>
                        ) : (
                          <Link to={item.to} className={className}>
                            <strong>{item.title}</strong>
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            </div>

            <motion.section
              className="portal-shot-panel portal-shot-directory"
              id="portal-colleges"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.42, delay: dashboardPanels.directory.delay }}
            >
              <h2>COLLEGE DIRECTORY</h2>

              <div className="portal-shot-toolbar">
                <label className="portal-shot-search">
                  <Search size={16} strokeWidth={2.1} aria-hidden="true" />
                  <input
                    type="search"
                    value={directoryQuery}
                    onChange={(event) => setDirectoryQuery(event.target.value)}
                    placeholder="[Search Colleges by Name/State/Course]"
                  />
                </label>

                <label className="portal-shot-filter">
                  <select
                    value={directoryFilter}
                    onChange={(event) => setDirectoryFilter(event.target.value)}
                  >
                    <option value="all">Filter by Quota/Budget/State</option>
                    <option value="deemed">Deemed University MBBS</option>
                    <option value="private">Private MBBS Admissions</option>
                    <option value="navi-mumbai">Navi Mumbai colleges</option>
                    <option value="other-cities">Other cities</option>
                  </select>
                  <ChevronDown size={18} strokeWidth={2.2} aria-hidden="true" />
                </label>
              </div>

              <div className="portal-shot-table">
                <div className="portal-shot-table-head">
                  <span>College Name</span>
                  <span>State</span>
                  <span>Type</span>
                  <span>Admission status</span>
                </div>

                {dashboardColleges.map((college) => (
                  <div key={college.slug} className="portal-shot-table-row">
                    <strong>{college.name}</strong>
                    <span>{college.region === "Navi Mumbai" ? "Maharashtra" : college.region}</span>
                    <span>{college.type}</span>
                    <LegacySmartLink to={college.route} className="portal-shot-row-link">
                      {college.type === "Government" ? "[Consult - View Details]" : "[Open - View Details]"}
                    </LegacySmartLink>
                  </div>
                ))}

                {!dashboardColleges.length ? (
                  <p className="portal-directory-empty">
                    No college pages matched the current search. Try a broader name or a different filter.
                  </p>
                ) : null}
              </div>
            </motion.section>

            <motion.section
              className="portal-shot-panel portal-shot-info"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.42, delay: dashboardPanels.info.delay }}
            >
              <h2>MBBS / MD/MS INFORMATION BLOCKS</h2>

              <div className="portal-shot-info-grid">
                {dashboardInfoBlocks.map(({ title, Icon }, index) => (
                  <motion.article
                    key={title}
                    className="portal-shot-info-card"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.01 }}
                    transition={{ duration: 0.28, delay: 0.2 + index * 0.05 }}
                  >
                    <Icon size={24} strokeWidth={1.9} aria-hidden="true" />
                    <strong>{title}</strong>
                  </motion.article>
                ))}
              </div>
            </motion.section>

            <section className="portal-panel portal-resources-card">
              <div className="portal-section-head">
                <span className="legacy-section-sub">Resources</span>
                <h2>Videos, blog articles, and guidance material</h2>
              </div>

              <div className="portal-resource-grid">
                {resourceCards.map((item) => (
                  <a key={item.title} href={item.href} className="portal-resource-tile">
                    <span>{item.eyebrow}</span>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </a>
                ))}
              </div>
            </section>

            <motion.section
              className="portal-panel portal-video-card-wrap portal-video-editorial"
              id="portal-videos"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.42, delay: 0.18 }}
            >
              <div className="portal-section-head">
                <span className="legacy-section-sub">YouTube Guidance Desk</span>
              </div>

              {activeVideo ? (
                <motion.article
                  className="portal-video-article"
                  key={activeVideo.url}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="portal-video-article-copy">
                    <span className="portal-video-kicker">
                      <Clapperboard size={15} strokeWidth={2.1} aria-hidden="true" />
                      Featured Video
                    </span>
                    <h3>{activeVideo.title}</h3>
                    <p>
                      Watch a focused video breakdown for {activeVideo.college}. Use this section
                      for campus feel, admission context, and quick orientation before opening the
                      full college page.
                    </p>
                    <div className="portal-video-article-meta">
                      <span>{activeVideo.college}</span>
                      <a href={activeVideo.url} target="_blank" rel="noreferrer">
                        Watch on YouTube
                        <ArrowUpRight size={15} strokeWidth={2.1} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                  <div className="portal-video-frame portal-video-frame-article">
                    <iframe
                      src={toPlayableEmbedUrl(activeVideo.url)}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </motion.article>
              ) : null}

              <div className="portal-video-rail">
                {homeVideos.map((video, index) => {
                  const videoId = extractYouTubeId(video.url);
                  return (
                    <motion.button
                      type="button"
                      key={`${video.college}-${video.title}`}
                      className={`portal-video-story ${activeVideo?.url === video.url ? "is-active" : ""}`}
                      onClick={() => setActiveVideo(video)}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.01 }}
                      transition={{ duration: 0.22, delay: 0.04 * index }}
                      whileHover={cardHover}
                      whileTap={softTap}
                    >
                      <div className="portal-video-story-thumb-wrap">
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                          alt={video.title}
                          className="portal-video-story-thumb"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="portal-video-story-play" aria-hidden="true">
                          <PlayCircle size={18} strokeWidth={2.2} />
                        </span>
                      </div>
                      <div className="portal-video-story-body">
                        <strong>{video.title}</strong>
                        <span>{video.college}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>

            <div id="blogs">
              <LegacyBlogShowcase />
            </div>
          </div>

          <motion.aside
            className="portal-shot-sidebar"
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.42, delay: dashboardPanels.sidebar.delay }}
          >
            <section className="portal-shot-sidecard">
              <h2>ENQUIRY PANEL</h2>
              <div className="portal-shot-side-list">
                <a href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}>
                  <PhoneCall size={16} strokeWidth={2.2} aria-hidden="true" />
                  <span>Call / WhatsApp {CONTACT_PHONE}</span>
                </a>
                <Link to="/about">
                  <UserRound size={16} strokeWidth={2.2} aria-hidden="true" />
                  <span>Founder Rahul Singh&apos;s Profile - View</span>
                </Link>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
                  <MapPinned size={16} strokeWidth={2.2} aria-hidden="true" />
                  <span>{CONTACT_ADDRESS}</span>
                </a>
              </div>
            </section>

            <section className="portal-shot-sidecard">
              <h2>PROCESS STEPS</h2>
              <div className="portal-shot-steps">
                {processSteps.map((step, index) => (
                  <div key={step} className="portal-shot-step">
                    <span>{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="portal-shot-sidecard">
              <h2>TRUST &amp; LEGAL</h2>
              <div className="portal-shot-legal">
                {legalLinks.map((item) => (
                  <Link key={item.label} to={item.to}>
                    [{item.label}]
                  </Link>
                ))}
              </div>
            </section>

            <section className="portal-shot-sidecard">
              <h2>NOTICE BOARD</h2>
              <div className="portal-shot-notices">
                {noticeBoardItems.map((item) => (
                  <article key={`${item.date}-${item.text}`} className="portal-shot-notice">
                    <strong>{item.date}</strong>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>
          </motion.aside>
        </div>
      </motion.section>

      <motion.section className="portal-promo-banner" aria-label="MBBS admission assistance banner" variants={bannerReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.01 }}>
        <div className="portal-promo-banner-media">
          <img
            src="/image/mgm-college.webp"
            srcSet="/image/mgm-college-480w.webp 480w, /image/mgm-college-800w.webp 800w, /image/mgm-college.webp 1200w"
            sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
            alt="MGM and DY Patil medical college guidance"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="portal-promo-banner-overlay" />
        <div className="legacy-container portal-promo-banner-inner">
          <div className="portal-promo-banner-copy">
            <motion.h2 variants={headlineReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.01 }}>
              MGM, DY Patil, and all college guidance in one place
            </motion.h2>
            <p>
              Dedicated support for MGM and DY Patil colleges, with guidance across private,
              deemed, state, and management options for the rest of the medical colleges.
            </p>
            <p>
              Focused on the colleges families ask for most, while keeping the full admissions
              process simple and clear. <strong>Contact us today!</strong>
            </p>
          </div>
          <div className="portal-promo-banner-action">
            <Link to="/contact" className="portal-promo-banner-btn">
              Contact Us
              <ArrowUpRight size={22} strokeWidth={2.1} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section className="portal-register-banner" aria-label="Registration form banner" variants={bannerReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.01 }}>
        <div className="portal-register-banner-media">
          <img
            src="/image/register-guidance-banner.webp"
            srcSet="/image/register-guidance-banner-480w.webp 480w, /image/register-guidance-banner-800w.webp 800w, /image/register-guidance-banner.webp 1200w"
            sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
            alt="Register for MGM and DY Patil guidance"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="portal-register-banner-overlay" />
        <div className="legacy-container portal-register-banner-inner">
          <div className="portal-register-card">
            <span className="portal-register-kicker">Register Now To Apply</span>
            <motion.h2 variants={headlineReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.01 }}>
              Register for MGM, DY Patil, and all college guidance
            </motion.h2>

            <form className="portal-register-form" onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                value={registerForm.fullName}
                onChange={(event) => updateRegisterForm("fullName", event.target.value)}
                placeholder="Full Name"
              />
              <input
                type="email"
                value={registerForm.email}
                onChange={(event) => updateRegisterForm("email", event.target.value)}
                placeholder="Email"
              />
              <input
                type="tel"
                value={registerForm.mobile}
                onChange={(event) => updateRegisterForm("mobile", event.target.value)}
                placeholder="Mobile Number"
              />
              <input
                type="text"
                value={registerForm.city}
                onChange={(event) => updateRegisterForm("city", event.target.value)}
                placeholder="City you live in"
              />
              <select
                value={registerForm.course}
                onChange={(event) => updateRegisterForm("course", event.target.value)}
              >
                <option value="MBBS">MBBS (India &amp; Abroad)</option>
                <option value="MD/MS">MD/MS Specialization</option>
                <option value="Private MBBS">Private MBBS Admissions</option>
                <option value="Deemed MBBS">Deemed University MBBS</option>
              </select>
              <textarea
                rows="3"
                value={registerForm.message}
                onChange={(event) => updateRegisterForm("message", event.target.value)}
                placeholder="Message"
              />

              <button type="submit" className="portal-register-submit">
                Submit
                <ArrowUpRight size={18} strokeWidth={2.1} aria-hidden="true" />
              </button>

              {registerStatus.type !== "idle" ? (
                <p className={`portal-register-status is-${registerStatus.type}`}>
                  {registerStatus.message}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </motion.section>

      <SeoScoreBadge />

      <LegacyFooter />
    </div>
  );
}

export default HomePage;
