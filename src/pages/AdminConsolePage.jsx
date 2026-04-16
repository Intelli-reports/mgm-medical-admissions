import { motion } from "framer-motion";
import {
  Bell,
  BookOpenText,
  ChevronRight,
  Database,
  FileText,
  Filter,
  FolderKanban,
  LayoutDashboard,
  Mail,
  MapPinned,
  Phone,
  Save,
  Search,
  Settings,
  Sparkles,
  SquarePen,
  Users
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SeoHead from "../components/layout/SeoHead";
import {
  deleteBlog,
  deleteNotice,
  getBlogContract,
  getCollegeContract,
  getDashboardSummary,
  getLeadContract,
  getNoticeContract,
  getSettings,
  listBlogs,
  listColleges,
  listLeads,
  listMedia,
  listNotifications,
  listNotices,
  saveBlog,
  saveCollege,
  saveNotice,
  saveSettings,
  updateLeadStatus
} from "../admin/api";
import {
  BLOG_STATUSES,
  COLLEGE_STATUSES,
  LEAD_STATUSES,
  NOTICE_STATUSES,
  slugify
} from "../admin/contracts";
import { motionEase } from "../utils/motion";

const sectionConfig = [
  { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { key: "leads", label: "Leads", Icon: Users },
  { key: "notices", label: "Notices", Icon: Bell },
  { key: "blogs", label: "Blogs", Icon: FileText },
  { key: "colleges", label: "Colleges", Icon: FolderKanban },
  { key: "media", label: "Media", Icon: Database },
  { key: "settings", label: "Settings", Icon: Settings }
];

const leadSourceOptions = [
  { value: "all", label: "All sources" },
  { value: "quick-desk", label: "Quick desk" },
  { value: "registration", label: "Registration" },
  { value: "contact-form", label: "Contact form" }
];

function EmptyState({ title, text }) {
  return (
    <div className="admin-empty-state">
      <Sparkles size={18} />
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function LoadingState({ text = "Loading..." }) {
  return <div className="admin-loading-state">{text}</div>;
}

function serializeSections(sections) {
  return sections
    .map((section) => [section.heading, ...(section.paragraphs || [])].join("\n"))
    .join("\n\n");
}

function parseSections(value) {
  return value
    .split(/\n\s*\n/)
    .map((block) => block.split("\n").map((line) => line.trim()).filter(Boolean))
    .filter((lines) => lines.length)
    .map(([heading, ...paragraphs]) => ({ heading, paragraphs }));
}

function createBlogDraft(blog) {
  return {
    id: blog?.id || "",
    title: blog?.title || "",
    slug: blog?.slug || "",
    tag: blog?.tag || "NEET UG",
    date: blog?.date || "",
    meta: blog?.meta || "",
    image: blog?.image || "/image/outer_blog_1.webp",
    excerpt: blog?.excerpt || "",
    intro: blog?.intro || "",
    status: blog?.status || "draft",
    featured: Boolean(blog?.featured),
    takeawaysText: (blog?.takeaways || []).join("\n"),
    sectionsText: serializeSections(blog?.sections || [])
  };
}

function createNoticeDraft(notice) {
  return {
    id: notice?.id || "",
    title: notice?.title || "",
    text: notice?.text || "",
    dateLabel: notice?.dateLabel || "[New]",
    priority: notice?.priority ?? 50,
    status: notice?.status || "draft",
    publishAt: notice?.publishAt || "",
    expiresAt: notice?.expiresAt || ""
  };
}

function createCollegeDraft(college) {
  return {
    id: college?.id || "",
    slug: college?.slug || "",
    fullName: college?.fullName || "",
    shortName: college?.shortName || "",
    university: college?.university || "Other",
    type: college?.type || "Medical College",
    region: college?.region || "Maharashtra",
    status: college?.status || "open",
    locationLine: college?.locationLine || "",
    email: college?.email || "",
    phone: college?.phone || "",
    data: college?.data || {}
  };
}

function StatusChip({ value }) {
  return <span className={`admin-status-chip is-${String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{value}</span>;
}

function AdminConsolePage() {
  const location = useLocation();
  const section = location.pathname.split("/")[2] || "dashboard";
  const activeSection = sectionConfig.find((item) => item.key === section) ? section : "dashboard";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [leads, setLeads] = useState([]);
  const [notices, setNotices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [media, setMedia] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [settingsState, setSettingsState] = useState(null);
  const [leadSourceFilter, setLeadSourceFilter] = useState("all");
  const [leadStatusFilter, setLeadStatusFilter] = useState("all");
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [noticeDraft, setNoticeDraft] = useState(createNoticeDraft());
  const [blogDraft, setBlogDraft] = useState(createBlogDraft());
  const [collegeDraft, setCollegeDraft] = useState(createCollegeDraft());
  const [flash, setFlash] = useState({ type: "idle", message: "" });

  async function loadAdminData() {
    setLoading(true);
    setError("");

    try {
      const [dashboardData, leadItems, noticeItems, blogItems, collegeItems, mediaItems, notificationItems, settingsData] =
        await Promise.all([
          getDashboardSummary(),
          listLeads(),
          listNotices(),
          listBlogs(),
          listColleges(),
          listMedia(),
          listNotifications(),
          getSettings()
        ]);

      setDashboard(dashboardData);
      setLeads(leadItems);
      setNotices(noticeItems);
      setBlogs(blogItems);
      setColleges(collegeItems);
      setMedia(mediaItems);
      setNotifications(notificationItems);
      setSettingsState(settingsData);
      setSelectedLeadId((current) => current || leadItems[0]?.id || "");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdminData();
  }, []);

  const selectedLead = leads.find((lead) => lead.id === selectedLeadId) || null;

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const searchText = `${lead.name} ${lead.phone} ${lead.course} ${lead.source}`.toLowerCase();
      const queryMatch = searchText.includes(searchQuery.trim().toLowerCase());
      const sourceMatch = leadSourceFilter === "all" || lead.source === leadSourceFilter;
      const statusMatch = leadStatusFilter === "all" || lead.status === leadStatusFilter;
      return queryMatch && sourceMatch && statusMatch;
    });
  }, [leadSourceFilter, leadStatusFilter, leads, searchQuery]);

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => `${notice.title} ${notice.text}`.toLowerCase().includes(searchQuery.trim().toLowerCase()));
  }, [notices, searchQuery]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => `${blog.title} ${blog.tag} ${blog.slug}`.toLowerCase().includes(searchQuery.trim().toLowerCase()));
  }, [blogs, searchQuery]);

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) =>
      `${college.fullName} ${college.university} ${college.region} ${college.slug}`.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }, [colleges, searchQuery]);

  function showFlash(type, message) {
    setFlash({ type, message });
    window.clearTimeout(showFlash.timeoutId);
    showFlash.timeoutId = window.setTimeout(() => {
      setFlash({ type: "idle", message: "" });
    }, 2400);
  }

  async function handleLeadStatusChange(id, status) {
    await updateLeadStatus(id, status);
    await loadAdminData();
    showFlash("success", "Lead status updated.");
  }

  async function handleNoticeSave(event) {
    event.preventDefault();
    await saveNotice(noticeDraft);
    setNoticeDraft(createNoticeDraft());
    await loadAdminData();
    showFlash("success", "Notice saved.");
  }

  async function handleBlogSave(event) {
    event.preventDefault();
    await saveBlog({
      ...blogDraft,
      slug: blogDraft.slug || slugify(blogDraft.title),
      takeaways: blogDraft.takeawaysText.split("\n").map((item) => item.trim()).filter(Boolean),
      sections: parseSections(blogDraft.sectionsText)
    });
    setBlogDraft(createBlogDraft());
    await loadAdminData();
    showFlash("success", "Blog saved.");
  }

  async function handleCollegeSave(event) {
    event.preventDefault();
    await saveCollege({
      ...collegeDraft,
      slug: collegeDraft.slug || slugify(collegeDraft.fullName),
      data: {
        ...collegeDraft.data,
        fullName: collegeDraft.fullName,
        shortName: collegeDraft.shortName,
        locationLine: collegeDraft.locationLine,
        email: collegeDraft.email,
        phone: collegeDraft.phone,
        helpLine: collegeDraft.phone
      }
    });
    setCollegeDraft(createCollegeDraft());
    await loadAdminData();
    showFlash("success", "College record saved.");
  }

  async function handleSettingsSave(event) {
    event.preventDefault();
    await saveSettings(settingsState);
    await loadAdminData();
    showFlash("success", "Settings saved.");
  }

  const dashboardCards = dashboard
    ? [
        { label: "Leads today", value: dashboard.leadsToday, tone: "blue" },
        { label: "Open enquiries", value: dashboard.openEnquiries, tone: "green" },
        { label: "Notices published", value: dashboard.noticesPublished, tone: "amber" },
        { label: "Blog drafts", value: dashboard.blogDrafts, tone: "indigo" },
        { label: "College updates pending", value: dashboard.collegeUpdatesPending, tone: "slate" }
      ]
    : [];

  return (
    <div className="admin-console-page">
      <SeoHead
        title="Admin Console"
        description="Operations console for leads, notices, blogs, and colleges."
        canonicalPath="/admin"
      />

      <div className="admin-console">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <span className="admin-brand-badge">BA</span>
            <div>
              <strong>BalaJi Admin</strong>
              <span>Operations Console</span>
            </div>
          </div>

          <nav className="admin-nav" aria-label="Admin sections">
            {sectionConfig.map(({ key, label, Icon }) => (
              <NavLink key={key} to={key === "dashboard" ? "/admin" : `/admin/${key}`} end className="admin-nav-link">
                <Icon size={18} />
                <span>{label}</span>
                <ChevronRight size={15} />
              </NavLink>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <span>Current focus</span>
            <strong>Leads first, content next</strong>
          </div>
        </aside>

        <main className="admin-main">
          <header className="admin-topbar">
            <div className="admin-topbar-copy">
              <p className="admin-topbar-kicker">Internal Operations</p>
              <h1>{sectionConfig.find((item) => item.key === activeSection)?.label || "Dashboard"}</h1>
            </div>

            <div className="admin-topbar-tools">
              <label className="admin-search">
                <Search size={16} />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search current section"
                />
              </label>
              <div className="admin-notification-pill">
                <Bell size={16} />
                <span>{notifications.length}</span>
              </div>
            </div>
          </header>

          {flash.type !== "idle" ? (
            <motion.div
              className={`admin-flash is-${flash.type}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: motionEase }}
            >
              {flash.message}
            </motion.div>
          ) : null}

          {loading ? <LoadingState text="Loading admin console..." /> : null}
          {error ? <div className="admin-error-state">{error}</div> : null}

          {!loading && !error && activeSection === "dashboard" ? (
            <section className="admin-section-grid">
              <div className="admin-card admin-dashboard-card">
                <div className="admin-card-head">
                  <p>Snapshot</p>
                  <strong>Operational overview</strong>
                </div>
                <div className="admin-kpi-grid">
                  {dashboardCards.map((card) => (
                    <article key={card.label} className={`admin-kpi-card tone-${card.tone}`}>
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                    </article>
                  ))}
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-head">
                  <p>Recent activity</p>
                  <strong>Latest notifications</strong>
                </div>
                {notifications.length ? (
                  <div className="admin-activity-list">
                    {notifications.map((item) => (
                      <article key={item.id} className="admin-activity-item">
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                        <span>{new Date(item.createdAt).toLocaleString()}</span>
                      </article>
                    ))}
                  </div>
                ) : (
                  <EmptyState title="No activity yet" text="Lead and content notifications will appear here." />
                )}
              </div>
            </section>
          ) : null}

          {!loading && !error && activeSection === "leads" ? (
            <section className="admin-section-grid admin-section-grid-wide">
              <div className="admin-card">
                <div className="admin-card-head">
                  <p>{`Contract: ${getLeadContract().required.join(", ")}`}</p>
                  <strong>Lead inbox</strong>
                </div>
                <div className="admin-toolbar">
                  <label>
                    <Filter size={15} />
                    <select value={leadSourceFilter} onChange={(event) => setLeadSourceFilter(event.target.value)}>
                      {leadSourceOptions.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <Filter size={15} />
                    <select value={leadStatusFilter} onChange={(event) => setLeadStatusFilter(event.target.value)}>
                      <option value="all">All statuses</option>
                      {LEAD_STATUSES.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </label>
                </div>
                {filteredLeads.length ? (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Source</th>
                          <th>Course</th>
                          <th>Status</th>
                          <th>Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} className={lead.id === selectedLeadId ? "is-active" : ""} onClick={() => setSelectedLeadId(lead.id)}>
                            <td>{lead.name}</td>
                            <td>{lead.source}</td>
                            <td>{lead.course || "General"}</td>
                            <td><StatusChip value={lead.status} /></td>
                            <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <EmptyState title="No leads match the current filter" text="Try another source or status filter." />
                )}
              </div>

              <div className="admin-card">
                <div className="admin-card-head">
                  <p>Detail view</p>
                  <strong>Lead detail</strong>
                </div>
                {selectedLead ? (
                  <div className="admin-detail-panel">
                    <div className="admin-detail-list">
                      <div><Users size={16} /><span>{selectedLead.name}</span></div>
                      <div><Phone size={16} /><span>{selectedLead.phone}</span></div>
                      <div><Mail size={16} /><span>{selectedLead.email || "No email"}</span></div>
                      <div><MapPinned size={16} /><span>{selectedLead.city || selectedLead.state || "No city/state"}</span></div>
                      <div><BookOpenText size={16} /><span>{selectedLead.course || "General enquiry"}</span></div>
                    </div>
                    <label className="admin-form-field">
                      <span>Status</span>
                      <select value={selectedLead.status} onChange={(event) => handleLeadStatusChange(selectedLead.id, event.target.value)}>
                        {LEAD_STATUSES.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </label>
                    <div className="admin-copy-block">
                      <strong>Message</strong>
                      <p>{selectedLead.message || "No message provided."}</p>
                    </div>
                    <div className="admin-copy-block">
                      <strong>Source page</strong>
                      <p>{selectedLead.sourcePage || "Not captured"}</p>
                    </div>
                  </div>
                ) : (
                  <EmptyState title="No lead selected" text="Choose a lead from the table to review details." />
                )}
              </div>
            </section>
          ) : null}

          {!loading && !error && activeSection === "notices" ? (
            <section className="admin-section-grid admin-section-grid-wide">
              <div className="admin-card">
                <div className="admin-card-head">
                  <p>{`Contract: ${getNoticeContract().required.join(", ")}`}</p>
                  <strong>Notice queue</strong>
                </div>
                {filteredNotices.length ? (
                  <div className="admin-list">
                    {filteredNotices.map((notice) => (
                      <article key={notice.id} className="admin-list-item">
                        <div>
                          <strong>{notice.title}</strong>
                          <p>{notice.text}</p>
                        </div>
                        <div className="admin-list-actions">
                          <StatusChip value={notice.status} />
                          <button type="button" onClick={() => setNoticeDraft(createNoticeDraft(notice))}>Edit</button>
                          <button type="button" className="is-danger" onClick={() => deleteNotice(notice.id).then(loadAdminData)}>Delete</button>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <EmptyState title="No notices yet" text="Create your first published or draft notice." />
                )}
              </div>

              <div className="admin-card">
                <div className="admin-card-head">
                  <p>Editor</p>
                  <strong>{noticeDraft.id ? "Edit notice" : "Create notice"}</strong>
                </div>
                <form className="admin-form-grid" onSubmit={handleNoticeSave}>
                  <label className="admin-form-field">
                    <span>Title</span>
                    <input value={noticeDraft.title} onChange={(event) => setNoticeDraft((old) => ({ ...old, title: event.target.value }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Date label</span>
                    <input value={noticeDraft.dateLabel} onChange={(event) => setNoticeDraft((old) => ({ ...old, dateLabel: event.target.value }))} />
                  </label>
                  <label className="admin-form-field admin-form-field-wide">
                    <span>Text</span>
                    <textarea rows="4" value={noticeDraft.text} onChange={(event) => setNoticeDraft((old) => ({ ...old, text: event.target.value }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Status</span>
                    <select value={noticeDraft.status} onChange={(event) => setNoticeDraft((old) => ({ ...old, status: event.target.value }))}>
                      {NOTICE_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </label>
                  <label className="admin-form-field">
                    <span>Priority</span>
                    <input type="number" value={noticeDraft.priority} onChange={(event) => setNoticeDraft((old) => ({ ...old, priority: Number(event.target.value) }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Publish at</span>
                    <input type="datetime-local" value={noticeDraft.publishAt} onChange={(event) => setNoticeDraft((old) => ({ ...old, publishAt: event.target.value }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Expires at</span>
                    <input type="datetime-local" value={noticeDraft.expiresAt} onChange={(event) => setNoticeDraft((old) => ({ ...old, expiresAt: event.target.value }))} />
                  </label>
                  <div className="admin-form-actions">
                    <button type="submit"><Save size={16} /> Save notice</button>
                    <button type="button" className="is-ghost" onClick={() => setNoticeDraft(createNoticeDraft())}>Reset</button>
                  </div>
                </form>
              </div>
            </section>
          ) : null}

          {!loading && !error && activeSection === "blogs" ? (
            <section className="admin-section-grid admin-section-grid-wide">
              <div className="admin-card">
                <div className="admin-card-head">
                  <p>{`Contract: ${getBlogContract().required.join(", ")}`}</p>
                  <strong>Blog manager</strong>
                </div>
                {filteredBlogs.length ? (
                  <div className="admin-list">
                    {filteredBlogs.map((blog) => (
                      <article key={blog.id} className="admin-list-item">
                        <div>
                          <strong>{blog.title}</strong>
                          <p>{blog.slug}</p>
                        </div>
                        <div className="admin-list-actions">
                          {blog.featured ? <StatusChip value="featured" /> : null}
                          <StatusChip value={blog.status} />
                          <button type="button" onClick={() => setBlogDraft(createBlogDraft(blog))}>Edit</button>
                          <button type="button" className="is-danger" onClick={() => deleteBlog(blog.id).then(loadAdminData)}>Delete</button>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <EmptyState title="No blog records found" text="Drafts and published articles will appear here." />
                )}
              </div>

              <div className="admin-card">
                <div className="admin-card-head">
                  <p>Editor</p>
                  <strong>{blogDraft.id ? "Edit article" : "Create article"}</strong>
                </div>
                <form className="admin-form-grid" onSubmit={handleBlogSave}>
                  <label className="admin-form-field">
                    <span>Title</span>
                    <input value={blogDraft.title} onChange={(event) => setBlogDraft((old) => ({ ...old, title: event.target.value }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Slug</span>
                    <input value={blogDraft.slug} onChange={(event) => setBlogDraft((old) => ({ ...old, slug: slugify(event.target.value) }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Tag</span>
                    <input value={blogDraft.tag} onChange={(event) => setBlogDraft((old) => ({ ...old, tag: event.target.value }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Status</span>
                    <select value={blogDraft.status} onChange={(event) => setBlogDraft((old) => ({ ...old, status: event.target.value }))}>
                      {BLOG_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </label>
                  <label className="admin-form-field">
                    <span>Date</span>
                    <input value={blogDraft.date} onChange={(event) => setBlogDraft((old) => ({ ...old, date: event.target.value }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Meta</span>
                    <input value={blogDraft.meta} onChange={(event) => setBlogDraft((old) => ({ ...old, meta: event.target.value }))} />
                  </label>
                  <label className="admin-form-field admin-form-field-wide">
                    <span>Image path</span>
                    <input value={blogDraft.image} onChange={(event) => setBlogDraft((old) => ({ ...old, image: event.target.value }))} />
                  </label>
                  <label className="admin-form-field admin-form-field-wide">
                    <span>Excerpt</span>
                    <textarea rows="3" value={blogDraft.excerpt} onChange={(event) => setBlogDraft((old) => ({ ...old, excerpt: event.target.value }))} />
                  </label>
                  <label className="admin-form-field admin-form-field-wide">
                    <span>Intro</span>
                    <textarea rows="4" value={blogDraft.intro} onChange={(event) => setBlogDraft((old) => ({ ...old, intro: event.target.value }))} />
                  </label>
                  <label className="admin-form-field admin-form-field-wide">
                    <span>Takeaways (one per line)</span>
                    <textarea rows="4" value={blogDraft.takeawaysText} onChange={(event) => setBlogDraft((old) => ({ ...old, takeawaysText: event.target.value }))} />
                  </label>
                  <label className="admin-form-field admin-form-field-wide">
                    <span>Sections (blank line between sections)</span>
                    <textarea rows="8" value={blogDraft.sectionsText} onChange={(event) => setBlogDraft((old) => ({ ...old, sectionsText: event.target.value }))} />
                  </label>
                  <label className="admin-form-field admin-checkbox">
                    <input type="checkbox" checked={blogDraft.featured} onChange={(event) => setBlogDraft((old) => ({ ...old, featured: event.target.checked }))} />
                    <span>Featured article</span>
                  </label>
                  <div className="admin-form-actions">
                    <button type="submit"><SquarePen size={16} /> Save article</button>
                    <button type="button" className="is-ghost" onClick={() => setBlogDraft(createBlogDraft())}>Reset</button>
                  </div>
                </form>
              </div>
            </section>
          ) : null}

          {!loading && !error && activeSection === "colleges" ? (
            <section className="admin-section-grid admin-section-grid-wide">
              <div className="admin-card">
                <div className="admin-card-head">
                  <p>{`Contract: ${getCollegeContract().required.join(", ")}`}</p>
                  <strong>College records</strong>
                </div>
                {filteredColleges.length ? (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>College</th>
                          <th>University</th>
                          <th>Region</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredColleges.map((college) => (
                          <tr key={college.id}>
                            <td>{college.fullName}</td>
                            <td>{college.university}</td>
                            <td>{college.region}</td>
                            <td><StatusChip value={college.status} /></td>
                            <td>
                              <button type="button" className="admin-inline-link" onClick={() => setCollegeDraft(createCollegeDraft(college))}>
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <EmptyState title="No colleges found" text="Try another search term." />
                )}
              </div>

              <div className="admin-card">
                <div className="admin-card-head">
                  <p>Editor</p>
                  <strong>{collegeDraft.id ? "Edit college" : "Create college"}</strong>
                </div>
                <form className="admin-form-grid" onSubmit={handleCollegeSave}>
                  <label className="admin-form-field">
                    <span>Full name</span>
                    <input value={collegeDraft.fullName} onChange={(event) => setCollegeDraft((old) => ({ ...old, fullName: event.target.value }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Slug</span>
                    <input value={collegeDraft.slug} onChange={(event) => setCollegeDraft((old) => ({ ...old, slug: slugify(event.target.value) }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Short name</span>
                    <input value={collegeDraft.shortName} onChange={(event) => setCollegeDraft((old) => ({ ...old, shortName: event.target.value }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>University</span>
                    <input value={collegeDraft.university} onChange={(event) => setCollegeDraft((old) => ({ ...old, university: event.target.value }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Type</span>
                    <input value={collegeDraft.type} onChange={(event) => setCollegeDraft((old) => ({ ...old, type: event.target.value }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Region</span>
                    <input value={collegeDraft.region} onChange={(event) => setCollegeDraft((old) => ({ ...old, region: event.target.value }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Status</span>
                    <select value={collegeDraft.status} onChange={(event) => setCollegeDraft((old) => ({ ...old, status: event.target.value }))}>
                      {COLLEGE_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </label>
                  <label className="admin-form-field admin-form-field-wide">
                    <span>Location line</span>
                    <input value={collegeDraft.locationLine} onChange={(event) => setCollegeDraft((old) => ({ ...old, locationLine: event.target.value }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Email</span>
                    <input value={collegeDraft.email} onChange={(event) => setCollegeDraft((old) => ({ ...old, email: event.target.value }))} />
                  </label>
                  <label className="admin-form-field">
                    <span>Phone</span>
                    <input value={collegeDraft.phone} onChange={(event) => setCollegeDraft((old) => ({ ...old, phone: event.target.value }))} />
                  </label>
                  <div className="admin-form-actions">
                    <button type="submit"><Save size={16} /> Save college</button>
                    <button type="button" className="is-ghost" onClick={() => setCollegeDraft(createCollegeDraft())}>Reset</button>
                  </div>
                </form>
              </div>
            </section>
          ) : null}

          {!loading && !error && activeSection === "media" ? (
            <section className="admin-section-grid">
              <div className="admin-card">
                <div className="admin-card-head">
                  <p>Media references</p>
                  <strong>Current asset inventory</strong>
                </div>
                {media.length ? (
                  <div className="admin-media-grid">
                    {media.map((item) => (
                      <article key={item.id} className="admin-media-card">
                        <span>{item.type}</span>
                        <strong>{item.label}</strong>
                        <code>{item.path || "No path"}</code>
                      </article>
                    ))}
                  </div>
                ) : (
                  <EmptyState title="No media references" text="Blog and college assets will appear here." />
                )}
              </div>
            </section>
          ) : null}

          {!loading && !error && activeSection === "settings" ? (
            <section className="admin-section-grid">
              <div className="admin-card">
                <div className="admin-card-head">
                  <p>Operations settings</p>
                  <strong>Contact and notification controls</strong>
                </div>
                {settingsState ? (
                  <form className="admin-form-grid" onSubmit={handleSettingsSave}>
                    <label className="admin-form-field">
                      <span>Contact phone</span>
                      <input value={settingsState.contactPhone} onChange={(event) => setSettingsState((old) => ({ ...old, contactPhone: event.target.value }))} />
                    </label>
                    <label className="admin-form-field">
                      <span>Contact email</span>
                      <input value={settingsState.contactEmail} onChange={(event) => setSettingsState((old) => ({ ...old, contactEmail: event.target.value }))} />
                    </label>
                    <label className="admin-form-field admin-form-field-wide">
                      <span>Contact address</span>
                      <textarea rows="3" value={settingsState.contactAddress} onChange={(event) => setSettingsState((old) => ({ ...old, contactAddress: event.target.value }))} />
                    </label>
                    <label className="admin-form-field admin-form-field-wide">
                      <span>Notification template</span>
                      <textarea rows="3" value={settingsState.whatsappTemplate} onChange={(event) => setSettingsState((old) => ({ ...old, whatsappTemplate: event.target.value }))} />
                    </label>
                    <label className="admin-form-field admin-checkbox">
                      <input type="checkbox" checked={settingsState.notifyByEmail} onChange={(event) => setSettingsState((old) => ({ ...old, notifyByEmail: event.target.checked }))} />
                      <span>Notify by email</span>
                    </label>
                    <label className="admin-form-field admin-checkbox">
                      <input type="checkbox" checked={settingsState.notifyByWhatsApp} onChange={(event) => setSettingsState((old) => ({ ...old, notifyByWhatsApp: event.target.checked }))} />
                      <span>Notify by WhatsApp</span>
                    </label>
                    <div className="admin-form-actions">
                      <button type="submit"><Save size={16} /> Save settings</button>
                    </div>
                  </form>
                ) : (
                  <LoadingState text="Loading settings..." />
                )}
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default AdminConsolePage;
