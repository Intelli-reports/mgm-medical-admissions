## Why

The site already has working public UI for enquiries, notices, blogs, and college discovery, but all of the underlying content is still static and most lead flows only hand off to WhatsApp or email. That is enough for a brochure site, but it does not support operations: the team cannot store leads, publish updates, manage blog content, or maintain college data from one place.

This change introduces an internal admin console as the first safe backend-facing surface without changing the public UI. It creates a controlled operations layer that can grow from lead capture and notifications into notices, blog management, and college content management.

## What Changes

- Add a dedicated admin console UI separate from the public site styling, optimized for dense operational workflows.
- Add the initial admin information architecture for `Dashboard`, `Leads`, `Notices`, `Blogs`, `Colleges`, `Media`, and `Settings`.
- Define the lead-management flow for homepage quick enquiries, homepage registration, and contact form submissions.
- Define the notice-management workflow for homepage alerts and announcement content.
- Define the blog-management workflow for creating, editing, publishing, and featuring articles without changing the public blog layout.
- Define the college-management workflow for maintaining directory and preview-page content from an admin surface instead of static files only.
- Define the initial backend integration contract so the public frontend can adopt API-backed data later without redesigning current pages.

## Capabilities

### New Capabilities
- `admin-console`: Internal operations console UI, navigation, dashboard views, and editing workflows for site operations.
- `lead-management`: Lead capture, storage, review, and status tracking for quick desk, registration, and contact enquiries.
- `notice-management`: Admin publishing workflow for homepage notices, alerts, and update strips.
- `blog-management`: Admin workflow for blog drafts, publishing, featuring, and article metadata management.
- `college-management`: Admin workflow for searchable college records, status updates, and preview-page data maintenance.

### Modified Capabilities
- None.

## Impact

- Affected frontend code in `src/pages/HomePage.jsx`, `src/pages/ContactPage.jsx`, blog pages, and future admin routes/components.
- New admin UI routes, components, and styles aligned to a data-dense dashboard pattern.
- New backend/API contracts for leads, notices, blogs, and colleges.
- New data persistence requirements for leads, notices, posts, and college records.
- Potential new dependencies for routing, authentication, data fetching, and table/form workflows inside the admin console.
