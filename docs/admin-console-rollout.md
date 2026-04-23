# Admin Console Rollout

## Current delivery model

The admin console is implemented as a client-side operations layer backed by a persistent browser store.

- Storage key: `medical-college-admin-store-v1`
- Primary store implementation: `src/admin/api.js`
- Public site fallback: seeded from the current static blog, notice, and college data

This keeps the public UI unchanged while making the data flows operational inside the current application.

## Rollout order

1. Admin shell and routes
2. Lead capture and lead inbox
3. Notice management
4. Blog management
5. College management
6. Settings and media references

## Public-site behavior

- Homepage quick desk, registration, and contact forms now persist lead records before opening the current WhatsApp or email flow.
- Homepage notices now read from the managed notice store.
- Blog listing and blog detail pages now read from the managed blog store.
- College preview reads now resolve from the managed college store.

## Fallback behavior

- If no browser storage exists, the app falls back to an in-memory seeded store for rendering.
- Public content still renders because the managed store is seeded from current static data.
- The admin console can be disabled later without removing public page rendering logic.

## Future backend migration

The current `src/admin/api.js` file is the contract boundary. A serverless backend can replace the storage internals later while preserving the calling surface.

Recommended API families:

- `POST /api/leads`
- `GET /api/leads`
- `PATCH /api/leads/:id`
- `GET /api/notices`
- `POST /api/notices`
- `PATCH /api/notices/:id`
- `GET /api/blogs`
- `GET /api/blogs/:slug`
- `POST /api/blogs`
- `PATCH /api/blogs/:id`
- `GET /api/colleges`
- `GET /api/colleges/:slug`
- `PATCH /api/colleges/:id`

## Environment notes

No new environment variables are required for the current client-side delivery.

If a serverless backend is introduced later, expected configuration will likely include:

- site base URL
- API base URL
- authentication provider settings
- email notification credentials
- optional WhatsApp notification credentials
