# Contributing & Content Editing Guide

Welcome! Flyers Cycling Club is 100% volunteer-led, and this repository is structured so **both non-technical coaches/board members and software developers** can safely update the site. Every change is automatically checked by GitHub Actions before going live.

---

## Part 1: Quick Guide for Coaches & Board Members (Via GitHub Web UI)

You can edit schedules, registration status, sponsors, and FAQs right in your web browser on GitHub:

### 1. Opening or Closing Seasonal Registration

1. Open `src/content/programs/` (`xc.md`, `enduro.md`, or `jr-flyers.md`).
2. Click the **Pencil (Edit)** icon on GitHub.
3. Change `registrationStatus` to one of:
   - `open` (Green "Registration Open" badge)
   - `upcoming` (Amber "Opening Soon" badge)
   - `waitlist` (Blue "Waitlist Open" badge)
   - `closed` (Neutral "In Season / Closed" badge)
4. Update `registrationUrl` with your season's live Zeffy registration form URL.
5. Click **Commit changes... -> Create a new branch and start a pull request**.

### 2. Adding a New Club or Program Sponsor

1. Drop the sponsor's logo (`.svg`, `.png`, or `.webp`) into `public/images/`.
2. Create a new `.yaml` file in `src/content/sponsors/` (for example, `06-acme-bikes.yaml`):
   ```yaml
   name: Acme Bikes & Service
   tier: gold # title | gold | silver | bronze | community
   order: 6
   logo: /images/acme-logo.svg
   websiteUrl: https://www.example.com/
   scopes:
     - club
     - enduro # Optional: include 'xc', 'enduro', or 'jr-flyers' to feature on program pages
   summary: Supporting Eagle Mountain and Lehi youth riders with trailside service and pit support.
   location: Lehi, UT
   active: true
   ```
3. Open a Pull Request—our automated check will verify that every field is valid before merging!

### 3. Printing / Sharing an Up-to-Date PDF Sponsor Prospectus

- Navigate to `/sponsors/prospectus` in Chrome, Safari, or Edge.
- Click **Print / Save as PDF** in the top bar (the navigation bar automatically hides in the PDF).
- Any edits made to `src/content/tiers/*.yaml` automatically flow into both `/sponsors` and the printable PDF prospectus.

---

## Part 2: Developer Workflow & Best Practices

1. Create a feature branch from `main` (`git checkout -b feat/short-description`).
2. Keep components accessible (single `<h1>` per page, semantic landmarks, WCAG AA contrast, keyboard & screen-reader friendly controls).
3. Run the verification suite locally before pushing:
   ```bash
   pnpm format
   pnpm verify
   pnpm test:e2e
   ```
4. Open a Pull Request against `main` and ensure the `CI` GitHub Action passes.
