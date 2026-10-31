# Flyers Cycling Club

Official static website for **Flyers Cycling Club** — unifying **Flyers XC**, **Flyers Enduro (Gravity)**, and **Jr. Flyers (Grades K–6)** under **Lake Mountain Bicycle Club, Inc.** (a registered 501(c)(3) non-profit organization in Northwest Utah County).

## Club Differentiators Highlighted on the Site

1. **501(c)(3) Community Non-Profit (100% Volunteer-Led)**: Every coach, ride leader, and board member donates their time. We steward Lake Mountain & Eagle Mountain trails and partner with local NICA high school squads (**Westlake, Lehi, Cedar Valley, Skyridge, and Lone Peak**).
2. **Gravity + Endurance + Youth Under One Roof**: Serving **Jr. Flyers (K–6)**, **Flyers XC (Grades 7–12)**, and **Flyers Enduro (Ages 10–19)** in one easy-to-navigate platform.
3. **Sponsor-Powered Affordability**: Rider registration is just **$50 or $150** depending on the program (strictly covering rider t-shirt and insurance). Community & corporate sponsors fund coaching certifications, pit support, and financial-hardship access.

---

## Tech Stack

- **Framework**: [Astro 5](https://astro.build/) (`output: 'static'`) + **TypeScript (strict)**
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + print stylesheet (`@media print`) for the live 1-page PDF Sponsor Prospectus (`/sponsors/prospectus`)
- **Content Layer**: Type-safe Markdown & YAML Content Collections validated at build time via **Zod** (`src/content.config.ts`)
- **Testing & Quality**: ESLint, Prettier, `astro check`, **Vitest** unit tests, and **Playwright + `@axe-core/playwright`** WCAG 2.1 AA accessibility & E2E tests
- **Deployment**: Automated **GitHub Pages** CI/CD via GitHub Actions (`.github/workflows/deploy.yml`), with portable `dist/` static output compatible with AWS S3 + CloudFront or Cloudflare Pages

---

## Quick Start

### Prerequisites

- **Node.js** `>= 22` (see `.nvmrc`)
- **pnpm** `>= 10`

### Local Development

```bash
# Install dependencies
pnpm install

# Start local dev server at http://localhost:4321
pnpm dev

# Run full verification suite (typecheck, lint, format check, unit tests, production build)
pnpm verify

# Run Playwright E2E + WCAG accessibility tests
pnpm test:e2e
```

---

## Updating Club Content (No Code Required)

Coaches and board members can update seasonal details by editing human-readable files in `src/content/` and `src/data/site.ts` (see [CONTRIBUTING.md](./CONTRIBUTING.md) for step-by-step instructions):

| What You Want to Update                                                     | File Location                                   |
| :-------------------------------------------------------------------------- | :---------------------------------------------- |
| **Open / close program registration or update fees/schedules**              | `src/content/programs/{xc,enduro,jr-flyers}.md` |
| **Add or update a club/program sponsor**                                    | `src/content/sponsors/*.yaml`                   |
| **Adjust sponsorship tier pricing or perks (updates web + PDF prospectus)** | `src/content/tiers/*.yaml`                      |
| **Add a practice kickoff, clinic, race date, or trail workday**             | `src/content/events/*.yaml`                     |
| **Add or edit a Parent/Rider FAQ**                                          | `src/content/faqs/*.yaml`                       |
| **Post a club announcement or kit-store notice**                            | `src/content/updates/*.md`                      |
| **Update Zeffy links, Volt kit store window, or Google Calendar URL**       | `src/data/site.ts`                              |

---

## Deployment & Custom Domain Cutover

1. **GitHub Pages (Immediate)**:
   - Push this repository to GitHub (`main` branch).
   - In GitHub **Settings -> Pages**, set **Build and deployment -> Source** to **GitHub Actions**.
   - `.github/workflows/deploy.yml` automatically detects the repository base path (`https://<org>.github.io/<repo>/`) or custom domain origin and deploys `./dist`.
2. **Custom Domain & Legacy Redirects (`lakemountainflyers.com` & `flyersxc.com`)**:
   - Copy `public/CNAME.example` to `public/CNAME` containing your primary custom domain (e.g., `www.flyerscycling.org` or `www.lakemountainflyers.com`).
   - Point your primary domain DNS `CNAME` (`www`) and `A`/`AAAA` apex records to GitHub Pages (or Cloudflare DNS).
   - Configure 301 permanent redirects at your DNS registrar / Cloudflare Rules from secondary domains (`flyersxc.com`, `lakemountainflyers.com`) to the unified domain so existing bookmarks and search rankings carry over seamlessly.
3. **AWS S3 + CloudFront (Optional Future Migration)**:
   - Run `SITE_URL=https://www.flyerscycling.org pnpm build` and sync `./dist` to your S3 bucket (`aws s3 sync dist/ s3://<bucket> --delete`).
