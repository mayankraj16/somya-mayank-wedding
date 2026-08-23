# Somya & Mayank — Wedding Invitation

A Vite + React wedding invitation site, ready to deploy for free on Cloudflare Pages.

## Local development

```
npm install
npm run dev
```

## Production build

```
npm install
npm run build
```

This outputs a static site to the `dist/` folder.

## Deploying to Cloudflare Pages (free)

See the deployment guide provided alongside this project for full step-by-step
instructions, including the exact build command, output directory, and how to
set a custom subdomain.

- Build command: `npm run build`
- Build output directory: `dist`

## Editing wedding details

All wedding information (names, dates, venues, event list) lives in one place:
the `CONFIG` object at the top of `src/App.jsx`. Edit that object and rebuild
to update the site.

## RSVP note

There is currently no RSVP form on this site (it was intentionally removed in
an earlier revision). If you'd like to add one back, it would need a real
backend or form service (e.g. Formspree, Getform) to actually receive
responses — a frontend-only form has nowhere to send submissions.
