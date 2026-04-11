import { useState } from "react";
import { Link } from "react-router-dom";
import LegacyBlogShowcase from "../components/blog/LegacyBlogShowcase";
import SeoScoreBadge from "../components/common/SeoScoreBadge";
import { LegacyFooter, LegacyNav, LegacySmartLink, scrollToSection } from "../components/layout/LegacySiteChrome";
import SeoHead from "../components/layout/SeoHead";
import { collegePreviewData } from "../data/collegePreviewData";
import {
  legacyCourses,
  legacyEvents,
  legacyFeaturedColleges,
  legacyHeroFooter,
  legacyTestimonials
} from "../data/legacyBundleData";
import { makeAbsoluteUrl } from "../config/site";

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
  return Object.values(collegePreviewData)
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

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const homeVideos = buildHomeVideoItems();
  const [activeVideo, setActiveVideo] = useState(homeVideos[0] || null);

  const homeSchema = [
    {
      "@type": "WebSite",
      name: "BalaJi Admission Guidance",
      url: makeAbsoluteUrl("/")
    },
    {
      "@type": "Organization",
      name: "BalaJi Admission Guidance",
      url: makeAbsoluteUrl("/")
    }
  ];

  return (
    <div className="legacy-page">
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

      <LegacyNav
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        aboutMode="scroll"
      />

      <section className="legacy-hero">
        <video autoPlay loop muted playsInline className="legacy-hero-video">
          <source src="/video/istockphoto-1498919348-640_adpp_is.mp4" type="video/mp4" />
        </video>
        <div className="legacy-hero-overlay" />
        <div className="legacy-container legacy-hero-content">
          <div className="legacy-hero-copy">
            <p className="legacy-hero-kicker">ONE-STOP ADMISSION SUPPORT FROM BALJI SERVICE EDUCATION </p>
            <h1>
              <span className="legacy-hero-title-line">NEET UG Counseling &amp;</span>
              <span className="legacy-hero-title-line">College Guidance 2026</span>
            </h1>
            <p>
              A structured guidance platform for students and parents navigating NEET UG
              admissions, college shortlisting, state-wise options, and detailed college
              research with more clarity and confidence.
            </p>
            <div className="legacy-hero-buttons">
              <button
                type="button"
                className="legacy-btn legacy-btn-primary legacy-link-button"
                onClick={() => scrollToSection("colleges")}
              >
                Explore Colleges
              </button>
              <Link to="/contact" className="legacy-btn legacy-btn-dark legacy-link-button">
                Talk to Counselor
              </Link>
            </div>
          </div>
        </div>

        <div className="legacy-hero-bottom">
          <div className="legacy-container legacy-hero-bottom-grid">
            {legacyHeroFooter.map((item) => (
              <div key={item.title}>
                <h5>{item.title}</h5>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="legacy-about">
        <div className="legacy-container">
          <div className="legacy-about-grid">
            <div>
              <p className="legacy-section-sub">Our Story</p>
              <h2>Inspiring Futures, One Career at a Time</h2>
              <p>
                We guide students and parents through medical admission decision-making with
                clear counseling, college comparison support, and practical next-step planning.
                The focus is simple: reduce confusion and help families move with more confidence.
              </p>
              <h3>What We Offer</h3>
              <ul>
                <li>Personalized career counseling</li>
                <li>NEET counseling and admission planning</li>
                <li>College shortlisting and comparison support</li>
                <li>Clear guidance for fees, cutoff trends, and reporting steps</li>
              </ul>
            </div>
            <img
              src="/image/mgm-admissions-office.png"
              alt="Medical admission counseling support"
              className="legacy-about-image"
            />
          </div>
        </div>
      </section>

      <section id="courses" className="legacy-courses">
        <div className="legacy-container">
          <h2>Featured Medical Courses and Guidance Tracks</h2>
          <div className="legacy-course-grid">
            {legacyCourses.map((course) => (
              <article
                key={course.title}
                className="legacy-course-card"
                style={{ backgroundImage: `url(${course.image})` }}
              >
                <div className="legacy-course-overlay" />
                <div className="legacy-course-content">
                  <div className="legacy-course-top">
                    <div className="legacy-course-arrow">→</div>
                    <span>Medical</span>
                  </div>
                  <h3>{course.title}</h3>
                  <p>{course.text}</p>
                  <Link to="/blogs">Explore guidance →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="colleges" className="legacy-colleges">
        <div className="legacy-container">
          <h2>Featured Medical Colleges, Fees and Admission Pages</h2>
          <div className="legacy-college-grid">
            {legacyFeaturedColleges.map((college) => (
              <article key={college.name} className="legacy-college-card">
                <img src={college.image} alt={college.name} />
                <div className="legacy-college-body">
                  <h3>{college.name}</h3>
                  <p>MBBS, MD and MS admission guidance</p>
                  <LegacySmartLink to={college.route}>View college details →</LegacySmartLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="legacy-excellence">
        <div className="legacy-container legacy-excellence-grid">
          <div>
            <h2>
              Admission guidance backed by experience, structure,
              <br /> and practical decision support
            </h2>
            <p>
              We help students review medical colleges more clearly, understand realistic
              options, and plan admission decisions with less guesswork. The website combines
              counseling support with detailed college pages so each next step is easier to assess.
            </p>
            <div className="legacy-hero-buttons">
              <Link to="/contact" className="legacy-btn legacy-btn-primary legacy-link-button">
                Talk to Counselor
              </Link>
              <Link to="/blogs" className="legacy-btn legacy-btn-outline legacy-link-button">
                Read Admission Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="legacy-testimonials">
        <div className="legacy-container">
          <h2>What Students and Parents Say</h2>
          <div className="legacy-testimonial-grid">
            {legacyTestimonials.map((item) => (
              <article key={item.name} className="legacy-testimonial-card">
                <p>&quot;{item.text}&quot;</p>
                <div className="legacy-testimonial-user">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>★★★★★</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="legacy-events">
        <div className="legacy-container">
          <h2>Upcoming counseling events and admission sessions</h2>
          {legacyEvents.map((event, index) => (
            <div key={event.title}>
              <article className="legacy-event-item">
                <p className="legacy-event-date">• {event.date}</p>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
                <Link to="/contact">Talk to counselor about this event</Link>
              </article>
              {index < legacyEvents.length - 1 ? <hr className="legacy-divider" /> : null}
            </div>
          ))}
        </div>
      </section>

      <div id="blogs">
        <LegacyBlogShowcase />
      </div>

      <section id="videos" className="legacy-videos">
        <div className="legacy-container">
          <div className="legacy-section-heading">
            <p className="legacy-section-sub">Video Guidance</p>
            <h2>Latest videos and counselling insights</h2>
            <p>
              Watch admission guidance videos sourced from the current college pages without
              leaving the homepage.
            </p>
          </div>

          {activeVideo ? (
            <div className="legacy-video-feature">
              <div className="legacy-video-feature-head">
                <div>
                  <p className="legacy-section-sub">Now Playing</p>
                  <h3>{activeVideo.title}</h3>
                  <span>{activeVideo.college}</span>
                </div>
              </div>
              <div className="legacy-video-feature-frame">
                <iframe
                  src={toPlayableEmbedUrl(activeVideo.url)}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          ) : null}

          <div className="legacy-video-grid">
            {homeVideos.map((video) => {
              const videoId = extractYouTubeId(video.url);
              return (
                <button
                  type="button"
                  key={`${video.college}-${video.title}`}
                  className={`legacy-video-card ${activeVideo?.url === video.url ? "is-active" : ""}`}
                  onClick={() => setActiveVideo(video)}
                >
                  <div className="legacy-video-thumb-wrap">
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt={video.title}
                      className="legacy-video-thumb"
                    />
                    <span className="legacy-video-play">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M9 7.5v9l7-4.5-7-4.5Z" fill="currentColor" />
                      </svg>
                    </span>
                  </div>
                  <div className="legacy-video-body">
                    <strong>{video.title}</strong>
                    <span>{video.college}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <SeoScoreBadge />

      <LegacyFooter />
    </div>
  );
}

export default HomePage;
