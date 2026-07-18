# Editkaro.in — Website

A responsive, static, four-page website for Editkaro.in (social media marketing +
video editing agency): **Home, Portfolio, About Us, Contact**. Plain HTML/CSS/JS —
no build step, no framework — so it can be deployed as-is to Netlify, Vercel, or
GitHub Pages.

## Live structure

```
editkaro/
├── index.html          Home — hero, services, featured work, process, testimonials, newsletter signup
├── portfolio.html       Portfolio — filterable grid across 9 categories + video preview modal
├── about.html            About Us — mission, vision, timeline, team, values
├── contact.html          Contact — name/email/phone/message form, info, FAQ
├── 404.html               Fallback page for unmatched routes
├── css/
│   ├── style.css        Design tokens, base styles, nav, footer, forms, buttons
│   └── pages.css         Page-specific layout (hero, portfolio grid, team, etc.)
├── js/
│   ├── data.js           Portfolio items + placeholder team data — edit this to swap in real content
│   ├── main.js            Mobile nav, scroll progress, reveal-on-scroll
│   ├── forms.js            Newsletter + contact form submission logic
│   └── portfolio.js        Category filters + video preview modal
├── apps-script/
│   ├── Code.gs            Google Apps Script backend (writes form data to Sheets)
│   └── README.md           Step-by-step deployment guide for the script
├── assets/favicon.svg
├── robots.txt, sitemap.xml, site.webmanifest
```

## Design direction

The signature visual is a literal **editor's timeline / clip-strip**: colored
clip segments with a moving playhead in the hero, a scroll-progress "scrub
line" under the header, and timecode-style labels (`00:12 — EDIT`) used for
the process steps, since the studio's actual output is a timeline. Palette is
near-black (`#0b0c0e`) with a cut-red accent (`#ff4b2b`) and a timeline-marker
yellow (`#ffc93c`); type pairs Space Grotesk (display) with Inter (body) and
JetBrains Mono for timecodes, tags and labels.

## What's implemented

- **Home**: hero with animated clip-strip, services grid, featured-work
  strip pulling from the portfolio data, 4-step process, testimonials, and an
  email-collector newsletter form (also duplicated in the footer).
- **Portfolio**: all 9 required categories — Short Form, Long Form, Gaming
  Videos, Football Edits, eCommerce Ads, Documentary Style, Color Grading,
  Anime Videos, Ads — filterable via chips, deep-linkable by hash
  (`portfolio.html#gaming`), with a keyboard-accessible preview modal.
- **About Us**: mission/vision, a company timeline, a placeholder team grid
  (8 members with generated names/roles/photos — see note below), and a
  values section.
- **Contact**: name/phone/email/message form, contact info cards, an
  OpenStreetMap embed (no API key required), and an FAQ.
- **Both forms** post to a single Google Apps Script Web App that appends
  rows to a Google Sheet — see `apps-script/README.md` for the 5-minute
  setup. Both include honeypot spam fields and client-side validation.
- Responsive down to small mobile (hamburger nav, stacked grids), visible
  keyboard focus states, `prefers-reduced-motion` respected, semantic HTML,
  meta descriptions/Open Graph tags per page, `robots.txt`, `sitemap.xml`,
  and a JSON-LD Organization block for basic SEO.

## Placeholder content that needs swapping in

Since no client videos, team roster, or brand assets were provided, these are
clearly marked placeholders:

1. **Portfolio videos** — `js/data.js` lists 21 sample projects across the 9
   categories. Each currently links to one royalty-free sample video for the
   preview modal. Replace the `video` field (YouTube video ID) and `title`/
   `client` per project with the real client work, organized by the same
   `category` slugs already wired into the filter bar.
2. **Team** — `js/data.js` → `EK_TEAM` has 8 generated names, roles, and
   `pravatar.cc` placeholder headshots. Swap in real names/roles/photos.
3. **Contact details** — phone, email, and address in the footer and
   Contact page are placeholders (`hello@editkaro.in`, etc.) — replace with
   the real ones.
4. **Domain** — canonical URLs and `sitemap.xml`/`robots.txt` assume
   `https://editkaro.in`; update if the real domain differs.

## Connecting the forms (Google Sheets)

Both forms are wired to submit to `window.EK_SCRIPT_URL` in `js/forms.js`,
currently a placeholder. Full walkthrough is in `apps-script/README.md`;
short version:

1. Create a Google Sheet.
2. Extensions → Apps Script → paste in `apps-script/Code.gs`.
3. Deploy → New deployment → Web app → Execute as "Me", access "Anyone".
4. Copy the deployment URL into `js/forms.js`.

Until that URL is set, both forms fail gracefully with a message pointing to
the setup doc, rather than silently losing submissions.

## Deployment

Because this is a static site with no build step, any static host works:

**Netlify (drag-and-drop)**
1. Go to app.netlify.com → Sites → drag the `editkaro/` folder onto the
   dashboard. Done — no config needed.

**Netlify/Vercel (via Git)**
1. Push this folder to a GitHub repository.
2. Import the repo in Netlify or Vercel. Framework preset: "Other" / static.
   Build command: none. Publish directory: `/` (repo root).

**GitHub Pages**
1. Push to GitHub, then Settings → Pages → Deploy from branch → `main` →
   `/ (root)`.
2. Your site will be live at `https://<username>.github.io/<repo>/`.

> Note: this repository was prepared and tested locally; the actual "click
> deploy" step needs to happen from your own Netlify/Vercel/GitHub account
> since it requires your hosting credentials.

## Challenges & how they were handled

- **No client videos or team roster were provided.** Rather than leave
  sections empty, the portfolio and team sections are fully built and
  functional against realistic placeholder data (`js/data.js`), so swapping
  in real content is a data-only change — no template rewrites needed.
- **Google Sheets integration needs a live deployment tied to a Google
  account**, which can't be provisioned from here. The full backend script
  (`Code.gs`) is written, tested logic included (`testDoPost`), and
  documented step-by-step so it's a copy-paste-deploy job.
- **Apps Script Web Apps don't return CORS headers**, so a normal `fetch`
  can't read the response. Forms submit with `mode: "no-cors"` and show an
  optimistic success state; submissions should be verified directly in the
  sheet, and `Code.gs` includes a manual test function for debugging.
- **Actual hosting deployment requires personal credentials** (Netlify/
  Vercel/GitHub account), so the site is delivered deployment-ready with
  exact steps for all three platforms rather than a live URL from this
  session.
