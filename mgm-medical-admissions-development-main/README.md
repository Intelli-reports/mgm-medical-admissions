# Medical College Website

React + Vite website for medical admission guidance, blogs, contact, and dynamic college detail pages.

## Stack

- React
- React Router
- Vite

## Commands

```powershell
npm install
npm run dev
npm run build
npm run preview
```

## Project Structure

```text
public/
  image/
  video/
  .htaccess
  robots.txt
  sitemap.xml

scripts/
  generate-seo-files.mjs

src/
  components/
    blog/
    layout/
  config/
    site.js
  data/
    colleges/
    site/
    collegePreviewData.js
    legacyBundleData.js
  pages/
    HomePage.jsx
    BlogsPage.jsx
    ContactPage.jsx
    CollegePreviewPage.jsx
  styles/
    base.css
    legacy.css
    college.css
    index.css
  App.jsx
  main.jsx
```

## Routes

- `/`
- `/blogs`
- `/contact`
- `/preview/:slug`

Current college slugs:

- `kalamboli`
- `kamothe`
- `nerul`
- `sambhajinagar`
- `vashi`
- `dy-patil-pune`
- `dy-patil-nerul`
- `terna-nerul`

## Data Files

Homepage/shared content:

- `src/data/site/nav.js`
- `src/data/site/hero.js`
- `src/data/site/content.js`
- `src/data/site/blogs.js`

College content:

- `src/data/colleges/*.js`

Compatibility exports:

- `src/data/legacyBundleData.js`
- `src/data/collegePreviewData.js`

## SEO

Technical SEO is built into the app:

- route-level metadata
- canonical tags
- Open Graph / Twitter tags
- JSON-LD schema
- generated `robots.txt`
- generated `sitemap.xml`

Production site URL:

```env
VITE_SITE_URL=https://mgmmbbsmdms.com
```

Configured in:

- `.env.production`
- `.github/workflows/deploy-development.yml`

SEO files are generated during build by:

- `scripts/generate-seo-files.mjs`

## Deployment

Deployment runs from the `development` branch through:

- `.github/workflows/deploy-development.yml`

Build output:

- `dist/`

## Notes

- `node_modules/` and `dist/` are generated folders.
- `public/` is for static assets copied directly into the build.
- `src/` is the actual React application source.
