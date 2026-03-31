import { useState } from "react";
import { Link } from "react-router-dom";
import { collegePreviewData } from "../data/collegePreviewData";
import {
  legacyBlogs,
  legacyCourses,
  legacyEvents,
  legacyFeaturedColleges,
  legacyHeroFooter,
  legacyHeroStats,
  legacyNavGroups,
  legacyTestimonials
} from "../data/legacyBundleData";
import LegacyBlogShowcase from "./LegacyBlogShowcase";
import { LegacyFooter, LegacyNav, LegacySmartLink, scrollToSection } from "./LegacySiteChrome";

function extractYouTubeId(url) {
  const match = url.match(/embed\/([^?&/]+)/);
  return match ? match[1] : "";
}

function toPlayableEmbedUrl(url) {
  const safeUrl = url.replace("https://www.youtube.com/embed/", "https://www.youtube-nocookie.com/embed/");
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

function blogTagClass(tag) {
  return `legacy-blog-tag legacy-blog-tag-${tag.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function LegacyBundleHome() {
  const [featuredBlog, ...sideBlogs] = legacyBlogs;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const homeVideos = buildHomeVideoItems();
  const [activeVideo, setActiveVideo] = useState(homeVideos[0] || null);

  return (
    <div className="legacy-page">
      <LegacyNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} aboutMode="scroll" />

      <section className="legacy-hero">
        <video autoPlay loop muted playsInline className="legacy-hero-video">
          <source
            src="/video/istockphoto-1498919348-640_adpp_is.mp4"
            type="video/mp4"
          />
        </video>
        <div className="legacy-hero-overlay" />
        <div className="legacy-container legacy-hero-content">
          <div className="legacy-hero-copy">
            <p className="legacy-hero-kicker">ONE-STOP ADMISSION SUPPORT</p>
            <h1>Start Your MBBS, MD &amp; MS Journey with MGM</h1>
            <p>
              A structured guidance platform for students and parents navigating
              NEET UG admissions, college shortlisting, state-wise options, and
              detailed college research with more clarity and confidence.
            </p>
            <div className="legacy-hero-buttons">
              <button
                type="button"
                className="legacy-btn legacy-btn-primary legacy-link-button"
                onClick={() => scrollToSection("colleges")}
              >
                Explore Colleges
              </button>
              <Link
                to="/contact"
                className="legacy-btn legacy-btn-dark legacy-link-button"
              >
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
                Welcome to Future Vision Career Guidance, where we shape
                tomorrow&apos;s leaders and innovators. We believe every student
                deserves a clear and purposeful career path. Our experienced
                career counselors and industry professionals guide individuals at
                every stage of their academic and professional journey.
              </p>
              <h4>What We Offer:</h4>
              <ul>
                <li>Personalized Career Counseling</li>
                <li>Career Assessments &amp; Planning</li>
                <li>College &amp; Career Path Guidance</li>
                <li>Your future begins now. Let&apos;s create it together.</li>
              </ul>
            </div>
            <img
              src="/image/mgm-admissions-office.png"
              alt="College guidance"
              className="legacy-about-image"
            />
          </div>

          <div className="legacy-mission-grid">
            <article className="legacy-info-card">
              <h4>Our Mission</h4>
              <p>
                To become a trusted career guidance partner, empowering students
                to achieve their dreams through informed decisions, expert
                counseling, and continuous support.
              </p>
            </article>
            <article className="legacy-info-card">
              <h4>Our Vision</h4>
              <p>
                To guide individuals with personalized career solutions, helping
                them choose the right education path, build skills, and create
                successful future-ready careers.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="courses" className="legacy-courses">
        <div className="legacy-container">
          <h2>Featured Courses</h2>
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
                  <h4>{course.title}</h4>
                  <p>{course.text}</p>
                  <span>Read -&gt;</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="colleges" className="legacy-colleges">
        <div className="legacy-container">
          <h2>Best Colleges of Medical</h2>
          <div className="legacy-college-grid">
            {legacyFeaturedColleges.map((college) => (
              <article key={college.name} className="legacy-college-card">
                <img src={college.image} alt={college.name} />
                <div className="legacy-college-body">
                  <h4>{college.name}</h4>
                  <p>MBBS MS MD</p>
                  <LegacySmartLink to={college.route}>Read More -&gt;</LegacySmartLink>
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
              Excellence in Education for Over <br /> 20+ Years
            </h2>
            <p>
              With excellence in education spanning over 20 years, Future Vision
              Career Guidance stands as a trusted name in academic and career
              counseling. Our long-standing experience reflects deep
              understanding, proven expertise, and a strong commitment to
              student success.
            </p>
            <div className="legacy-hero-buttons">
              <button type="button" className="legacy-btn legacy-btn-primary">
                Learn More
              </button>
              <button type="button" className="legacy-btn legacy-btn-outline">
                Virtual Tour
              </button>
            </div>
          </div>
          <div className="legacy-mini-stats">
            {legacyHeroStats.map((item) => (
              <article key={item.label} className="legacy-mini-stat">
                <div className="legacy-mini-icon">{item.label.slice(0, 1)}</div>
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="legacy-testimonials">
        <div className="legacy-container">
          <h2>What Our Students Say</h2>
          <div className="legacy-testimonial-grid">
            {legacyTestimonials.map((item) => (
              <article key={item.name} className="legacy-testimonial-card">
                <p>"{item.text}"</p>
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

      <section className="legacy-events">
        <div className="legacy-container">
          <h2>Upcoming events</h2>
          {legacyEvents.map((event, index) => (
            <div key={event.title}>
              <article className="legacy-event-item">
                <p className="legacy-event-date">• {event.date}</p>
                <h4>{event.title}</h4>
                <p>{event.text}</p>
                <span>10:00 AM-10:00 PM | Read More...</span>
              </article>
              {index < legacyEvents.length - 1 ? <hr className="legacy-divider" /> : null}
            </div>
          ))}
        </div>
      </section>

      <LegacyBlogShowcase />

      <section className="legacy-blogs" style={{ display: "none" }}>
        <div className="legacy-container">
          <h2>Blogs</h2>
          <div className="legacy-blog-page-grid">
            <article className="legacy-blog-feature">
              <div className="legacy-blog-image-wrap">
                <img src={featuredBlog.image} alt={featuredBlog.title} />
                <span>{featuredBlog.tag}</span>
              </div>
              <div className="legacy-blog-body">
                <h3>{featuredBlog.title}</h3>
                <p>
                  Guidance-led reading for students and parents trying to compare
                  colleges, understand counseling rounds, and plan realistic next
                  steps.
                </p>
              </div>
            </article>

            <div className="legacy-blog-side-grid">
              {sideBlogs.map((blog) => (
                <article key={blog.title} className="legacy-blog-card">
                  <div className="legacy-blog-image-wrap">
                    <img src={blog.image} alt={blog.title} />
                    <span>{blog.tag}</span>
                  </div>
                  <div className="legacy-blog-body">
                    <h4>{blog.title}</h4>
                    <p>Admissions • Guidance • College planning</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="legacy-videos">
        <div className="legacy-container">
          <div className="legacy-section-heading">
            <p className="legacy-section-sub">Video Guidance</p>
            <h2>Latest videos and counselling insights</h2>
            <p>
              Watch admission guidance videos sourced from the current college pages without leaving the homepage.
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

      <LegacyFooter />
    </div>
  );
}

export default LegacyBundleHome;
