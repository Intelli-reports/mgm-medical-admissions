## Context

The current application is a Vite/React frontend with static content sources for blogs and college data. Public lead entry points already exist in `src/pages/HomePage.jsx`, `src/pages/ContactPage.jsx`, and `src/pages/CollegePreviewPage.jsx`, but those flows currently open WhatsApp or email drafts rather than persisting records. Homepage notices are hardcoded, blogs are sourced from `src/data/site/blogs.js`, and college detail pages are driven by `src/data/collegePreviewData.js` plus the college data files in `src/data/colleges/`.

This change adds an internal admin console as the operational layer for backend-managed content. The public UI remains visually unchanged. The admin console becomes the first backend-facing surface for leads, notices, blogs, and colleges, and it establishes the API contracts the public UI can adopt later.

Constraints:
- Preserve the current public site layouts and user flows.
- Keep the admin console visually distinct from the public marketing/admissions UI.
- Support a phased rollout: leads first, then notices, blogs, and colleges.
- Minimize coupling so static data can coexist temporarily during migration.

Stakeholders:
- Admissions staff who need a lead inbox and status tracking
- Content staff who need notices, blogs, and college data management
- Site visitors who should not experience a public UI redesign during backend rollout

## Goals / Non-Goals

**Goals:**
- Define a separate admin console information architecture for operational workflows.
- Establish backend contracts for lead capture, notices, blogs, and college data.
- Support phased migration from static content to managed content.
- Keep the admin UI dense, fast, and table-first for internal use.
- Make the first implementation increment low risk by focusing on leads and notifications first.

**Non-Goals:**
- Redesign the public homepage, blog pages, contact page, or college preview pages.
- Build public authentication or user-facing accounts.
- Replace every static content source in one release.
- Design a full CRM beyond the required lead-review workflow.

## Decisions

### 1. Use a separate admin console instead of reusing public-site patterns
The admin surface will use a data-dense dashboard layout with sidebar navigation, a top utility bar, KPI cards, filterable tables, status chips, and edit drawers. This is intentionally different from the public admissions site.

Why:
- Internal workflows need information density, not marketing presentation.
- Reusing the public design system would make the admin slower to scan and harder to extend.
- The `ui-ux-pro-max` design direction for this problem space is a data-dense enterprise dashboard, which matches lead review and content operations more closely than the public portal style.

Alternative considered:
- Reusing the public component language for the admin. Rejected because it optimizes for trust and storytelling, not operational speed.

### 2. Introduce backend capabilities in phases, with leads first
The rollout order is:
1. Lead forms and notifications
2. Notices and updates
3. Blog CMS
4. College CMS
5. Admin roles/settings

Why:
- Leads already exist as public UI and provide immediate operational value.
- Notices are a small content domain and validate publishing workflows.
- Blogs and college data are larger content migrations and should follow after the admin shell is proven.

Alternative considered:
- Building blog or college CMS first. Rejected because those are larger migrations and do not solve the immediate operational gap of losing enquiry data.

### 3. Keep API-backed content compatible with current static structures during migration
The admin-backed data model should mirror the current public data shape closely enough that the public UI can swap from static imports to API responses incrementally.

Why:
- Current blog and college pages already encode the display model.
- A compatible shape reduces risk when replacing static sources later.
- It allows mixed mode operation while data is being migrated.

Alternative considered:
- Redesigning the public data shape first. Rejected because it would create unnecessary frontend churn before the backend is proven.

### 4. Use one operational lead model with source-specific metadata
Homepage quick desk, homepage registration, contact form, and later college-page enquiries should all map into one lead domain with a `source` field plus optional metadata such as preferred state, score, city, page slug, or college slug.

Why:
- Admissions staff need one lead inbox, not separate silos.
- A shared model simplifies filters, notifications, and status tracking.
- Source-specific fields can still be retained without fragmenting the workflow.

Alternative considered:
- Separate tables/endpoints per form forever. Rejected because it duplicates review workflows and makes reporting harder.

### 5. Use serverless APIs plus a relational store
The backend-facing contract should assume API endpoints suitable for serverless deployment and a relational database for persistence.

Why:
- This project is currently a static frontend and does not justify a long-running custom server initially.
- Leads, notices, blogs, and colleges are relational domains with straightforward admin CRUD needs.
- Serverless endpoints are a low-friction fit for phased rollout.

Alternative considered:
- A monolithic custom backend service from day one. Rejected as unnecessary complexity for the current project stage.

## Risks / Trade-offs

- [Static and managed content may diverge during migration] -> Keep field shapes aligned and migrate one domain at a time.
- [Admin console scope could expand too early] -> Lock phase 1 to lead capture and notifications before content CMS work.
- [Distinct admin UI may introduce duplicate components] -> Share primitives only where it improves quality; optimize the admin for workflow rather than visual uniformity.
- [Lead model may miss source-specific details] -> Reserve structured metadata fields for form-specific values.
- [Serverless APIs can become fragmented] -> Define endpoint families by domain (`leads`, `notices`, `blogs`, `colleges`) from the start.

## Migration Plan

1. Build the admin shell and routing without changing public pages.
2. Implement lead-management APIs and wire the public forms to persist submissions while preserving current confirmation behavior.
3. Add the admin lead inbox and notification handling.
4. Add notice-management and replace static homepage notices with managed data.
5. Add blog-management and migrate blog reads from static data to API responses.
6. Add college-management and migrate directory/preview data in controlled slices.
7. Add admin roles/settings after the operational surfaces are stable.

Rollback strategy:
- Public pages can remain on static data if any admin-backed domain is unstable.
- Admin routes can be disabled independently of the public site.

## Open Questions

- Which authentication provider should guard the admin console in the first release?
- Should the first notification channel be email only, or email plus WhatsApp?
- Should college-page enquiries join phase 1 lead capture or wait until the lead inbox is stable?
- Should media uploads be part of the first blog/college CMS pass or handled separately?
