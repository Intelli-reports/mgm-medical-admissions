## 1. Admin Shell Setup

- [x] 1.1 Add admin routing and a separate admin layout shell with sidebar, top bar, and dashboard entry point
- [x] 1.2 Add the admin design tokens, typography, and shared dashboard primitives without changing the public site styling
- [x] 1.3 Add placeholder admin sections for Dashboard, Leads, Notices, Blogs, Colleges, Media, and Settings

## 2. Lead Management Foundation

- [x] 2.1 Define the shared lead data model and API contracts for quick desk, registration, and contact submissions
- [x] 2.2 Implement the admin lead inbox with status chips, source filters, and lead detail view
- [x] 2.3 Wire homepage quick desk, homepage registration, and contact form submissions to the new lead API while preserving current user-facing confirmations
- [x] 2.4 Add operational notifications for newly created leads

## 3. Notice Management

- [x] 3.1 Implement notice data contracts and admin CRUD flows with publish, unpublish, priority, and schedule fields
- [x] 3.2 Build the admin notices list and notice editor workflow
- [x] 3.3 Replace static homepage notice data with managed notice reads

## 4. Blog Management

- [x] 4.1 Implement blog data contracts that preserve the current public article structure and slug-based reads
- [x] 4.2 Build the admin blog list, draft/publish workflow, featured controls, and editor form
- [x] 4.3 Replace static blog list and article reads with managed blog data without changing the public blog UI

## 5. College Management

- [x] 5.1 Implement college data contracts aligned to the current homepage directory and preview-page content model
- [x] 5.2 Build the admin colleges table, filters, and edit workflow for college records
- [x] 5.3 Replace static college directory and preview-page reads with managed college data in controlled slices

## 6. Hardening and Delivery

- [x] 6.1 Add loading, empty, and error states across admin data tables and edit flows
- [x] 6.2 Verify responsive behavior, keyboard accessibility, and reduced-motion support for the admin console
- [x] 6.3 Document rollout order, fallback behavior, and any required environment/configuration for deployment
