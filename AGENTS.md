# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, Cursor, Copilot, etc.) and human contributors working on the **Flyers Cycling Club** website. `CLAUDE.md` imports this file, so this is the one place to keep instructions.

For human-facing setup and content editing, see [README.md](./README.md) and [CONTRIBUTING.md](./CONTRIBUTING.md). For the latest site review and peer comparison, see [docs/site-evaluation.md](./docs/site-evaluation.md).

---

## 1. What this site is, and who it serves

Flyers Cycling Club is the public home of three youth mountain bike programs run by **Lake Mountain Bicycle Club, Inc.**, a volunteer-run 501(c)(3) in Utah:

| Program       | Who                      | Season  | Fee  |
| ------------- | ------------------------ | ------- | ---- |
| Jr. Flyers    | Grades K–6 (ages 5–12)   | Jun–Aug | $50  |
| Flyers XC     | Grades 7–12 (ages 13–19) | Jan–Aug | $50  |
| Flyers Enduro | Grades 5–12 (ages 10–19) | Jan–Aug | $150 |

The programs run outside the fall NICA (Utah High School Cycling League) season and are meant to work alongside local school teams, not compete with them.

**Audiences, in priority order.** When they conflict, the earlier one wins:

1. **Parents and guardians** deciding whether to trust volunteers with their kid. They need to know: is it safe, who runs it, what does it really cost, what's the time commitment, how do I sign up.
2. **Riders**, especially new and nervous ones. They need to know they belong even if they're not fast.
3. **Volunteers**, mostly parents. They need to know what's asked of them and what training they'll get.
4. **Sponsors and donors.** They need to know what their money does and that the organization is legitimate.

Most visitors are parents on a phone. Write and design for them first.

---

## 2. Commands

Node ≥ 22 (`.nvmrc`), pnpm ≥ 10.

```bash
pnpm install          # install
pnpm dev              # dev server at http://localhost:4321
pnpm verify           # astro check + tsc, eslint, prettier --check, build, vitest
pnpm test:e2e         # Playwright + axe WCAG 2.1 AA (needs a build; CI runs it)
pnpm format           # prettier --write (run before committing)
```

Run `pnpm verify` before every commit. Run `pnpm test:e2e` when you change markup, pages, interactive components, or colors. CI (`.github/workflows/ci.yml`) runs everything on PRs to `main`.

---

## 3. Where things live

- `src/content/**`: all club facts, as Markdown/YAML collections validated by Zod in `src/content.config.ts`. Programs, tiers, sponsors, events, FAQs, leadership, updates.
- `src/data/site.ts`: global facts: legal entity, fees, contact, integration URLs (Zeffy, Volt, calendar), socials, and the NICA team list.
- `src/pages/`: routes. `src/components/{home,layout,programs,sponsors}/`: UI.
- `src/lib/`: pure logic with unit tests (`pathway.ts`, `programs.ts`, `sponsors.ts`, `urls.ts`).
- `src/styles/global.css`: Tailwind v4 `@theme` brand tokens (`flyers-red`, `flyers-slate`, `flyers-gold`, …) and print styles.
- `src/layouts/PrintLayout.astro` + `/sponsors/prospectus`: the printable sponsor PDF.
- `tests/unit/`: Vitest. `tests/e2e/site.spec.ts`: Playwright + axe.

**Single source of truth.** A club fact (fee, age range, school names, legal name, email, season dates) lives in exactly one place: `site.ts` or a content collection. Components and pages read it from there; they don't retype it. Today many components hardcode "$50 or $150", the five school names, and "100% volunteer-led". When you touch one of those, replace the literal with a reference to `siteConfig` or the collection.

**Always use `withBase()`** from `src/lib/urls.ts` for internal links and `/public` assets. The site deploys under a GitHub Pages sub-path.

---

## 4. Voice and tone

The models are the best-loved grassroots youth cycling non-profits: Durango DEVO ("developing lifelong cyclists, one ride at a time"), Little Bellas (confidence and mentorship first), Boulder Junior Cycling, and local NICA teams like Lehi MTB ("improving against yourself"). They sound like **a friendly coach talking to a parent at the trailhead**, not like an ad agency.

### Principles

1. **Lead with the kid's experience, not the club's features.** Fun, friends, confidence, skills, and a lifelong love of riding come first. Racing is optional and comes second.
2. **Be warm, plain, and specific.** Short sentences. Concrete details ("Tuesdays 6–7:30 PM at the skills park") beat adjectives ("world-class progression").
3. **Welcome beginners out loud.** Say plainly that you don't need to be fast, race, or own an expensive bike to join.
4. **Be confident, not defensive.** Describe what Flyers does. Don't define it against "other clubs" or "multi-thousand-dollar programs". Those clubs are often our riders' NICA teams, coaches, and friends.
5. **Say each key fact once per page, where it matters.** The fee belongs on the program page and in the FAQ, not in every section. The same goes for "volunteer-led" and the school list.
6. **Be honest about the full cost.** State the fee, what it covers, and what it doesn't (bike, gear, optional race entries, optional kit, travel), and say how to ask for help. Lehi MTB does this well.
7. **Thank people like neighbors.** Sponsor and volunteer copy is gratitude plus specific impact ("Your $500 covers two coaches' first-aid certifications"), not a list of placements.

### Style rules

- **Headings:** short, human, at most about 8 words. Display headings are uppercased by CSS, so write them in sentence case in source.
- **Body:** about a 7th–8th grade reading level. Use second person ("your rider"). Use active voice.
- **Program names:** "Flyers XC", "Flyers Enduro", "Jr. Flyers". "Flyers" alone means the whole club. Use "Lake Mountain Bicycle Club, Inc." only where the legal entity matters (tax, legal, footer, prospectus).
- **Numbers:** use numerals ("3 programs", "$50"). Use an en dash for ranges (K–6, $50–$150).
- **Dates shown to users:** human format ("Sat, Jan 16"), never raw ISO strings.
- **Exclamation points:** at most one per page.
- **Emphasis:** don't bold whole phrases inside paragraphs. Bold a key fact at most once per paragraph.
- **Avoid these words:** synergy, seamless(ly), next-level, world-class, radically, unified hub/platform, leverage, elevate, empower (unless quoting a mission), "strictly", "just $X" and "only $X" (state the price plainly).

### Before / after

| Instead of                                                                   | Write                                                                                       |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| "Competitive Progression Without the Multi-Thousand-Dollar Price Tag"        | "Great coaching. Low cost. Every kid welcome."                                              |
| "One Cycling Club. Three Dirt Pathways. Built for Every Local Kid."          | "Mountain biking for Utah kids, K through 12."                                              |
| "Why are fees only $50 or $150 when other clubs cost thousands?"             | "Why is registration so affordable?"                                                        |
| "Gravity skills make safer, faster all-around riders… next-level confidence" | "Learning to descend well makes riders safer on every trail, including their NICA courses." |
| "Pairs seamlessly with fall NICA racing at Westlake, Lehi, Cedar Valley…"    | "Winter through summer riding that fits around your fall school team."                      |

---

## 5. Truthfulness rules (non-negotiable)

This is a youth organization that asks families for trust and donors for money. Content must be true.

- **Never invent** people, quotes, testimonials, rider stories, sponsor names, statistics ("thousands of families"), partnerships, awards, certifications, dates, or prices. If a section needs a fact you don't have, leave a clearly marked placeholder (`TODO(board): …`) and list it in your PR description. Don't fill it with plausible-sounding copy.
- **Placeholder links stay visible as placeholders.** Many Zeffy URLs are currently the bare `https://www.zeffy.com/`. Don't add more. When you see one, flag it. Never present an "open slot" as if it were a real sponsor.
- **"Partner" means a confirmed relationship.** Only call a NICA team, trail group, or business a "partner" if the board has confirmed it. Otherwise write "riders from Westlake, Lehi, …" or "we schedule around fall NICA seasons".
- **Safety claims must match practice.** Only say "background-checked", "NICA-licensed", "first-aid/CPR certified", or give coach-to-rider ratios if the board confirms them. NICA coaches complete background checks, concussion training (CDC HEADS UP), and athlete-abuse awareness training. Name which of these Flyers coaches actually complete.
- **Tax language:** write "tax-deductible to the extent allowed by law." Never write "100% tax-deductible" next to sponsor benefits. Sponsor perks can change what's deductible, and the treasurer or a tax professional should approve any tax wording. Don't give tax advice.
- **No AI-generated images. Ever.** Every photo on the site must be a real photo of real Flyers riders, coaches, trails, or events, supplied by the club. Don't generate, upscale-with-AI, composite, or "fill in" images, and don't use stock photos presented as Flyers. If a section needs an image you don't have, leave the existing one or a plain brand-colored block and add a `TODO(board): photo needed` note. Logos and simple SVG brand shapes are fine.
- **Minors' privacy:** no full names of minors alongside photos. Use only photos the club has media releases for. Alt text describes what is actually in the image and doesn't embellish it.
- **Don't future-date posts.** An update's `publishedDate` must not be later than the day it ships.

---

## 6. Non-profit best practices the site should meet

Use this as the checklist for new pages and reviews. It's drawn from peer clubs and nonprofit transparency guidance (Candid/GuideStar, Form 990 disclosure).

**Trust and transparency**

- Publish the legal name, the EIN (it's public record anyway), board member names and roles, and a link to the latest Form 990 or a simple annual report. Keep the website's board list consistent with the 990.
- Report impact with real numbers once the board provides them: riders served, volunteer hours, trail-work hours, scholarships given.

**Safety and youth protection.** Parents look for this first, and the site doesn't have it yet.

- A Safety page covering coach screening and training, the two-adult rule (no adult alone with a minor), ratios, helmet and gear rules, the concussion protocol, emergency plans, and who to contact with a concern.
- A rider/parent code of conduct, and links to the waiver and the refund policy.

**Access**

- One clear, dignified scholarship and assistance path: what's available (fee waivers, loaner bikes or gear) and how to ask confidentially. Mention it wherever cost is discussed.
- Plain statements that beginners are welcome and that racing is optional.

**Volunteers**

- What roles exist, the time commitment, the training and screening involved, and how to start. Lead with "you don't need to be fast" (ride leaders, sweeps, tent crew, trail days).

**Donors and sponsors**

- "Donate" should be reachable from every page. Tie each giving level to a concrete outcome. Thank sponsors as community members, and keep sponsor logos accurate and current.

**Real people**

- Named leaders with short bios and photos (adults only, with consent), and rider and parent stories with permission. Generic role cards ("XC Coaching Leads") don't build trust.

---

## 7. Engineering conventions

- **Astro 5 static output, TypeScript strict.** No client framework. Interactive bits are small vanilla `<script>` blocks; keep them progressive-enhancement friendly.
- **Content schema changes:** update `src/content.config.ts`, every affected entry, the CONTRIBUTING.md examples, and any tests. Volunteers edit YAML in the GitHub web UI, so keep field names obvious and the Zod errors useful.
- **Accessibility (WCAG 2.1 AA, enforced by axe in CI):** one `<h1>` per page, labelled `<section>`s (`aria-labelledby`), visible focus, touch targets of at least 48px (`min-h-12`), and AA contrast using the brand tokens. Never convey meaning by color alone. Respect `prefers-reduced-motion`.
- **Styling:** use the `flyers-*` Tailwind tokens from `global.css`, not raw hex. Prettier sorts Tailwind classes, so run `pnpm format`.
- **Images:** put photos in `public/images/`, compress them (aim for under 300 KB for content images), always set `width`/`height`, and use `loading="lazy"` below the fold.
- **New pages:** add the route to `EXPECTED_HTML_FILES` in `tests/unit/static-build.test.ts` and to the axe route list in `tests/e2e/site.spec.ts`. Give each page a specific `title` and `description` through `BaseLayout`.
- **Links:** external links in content use `target="_blank" rel="noopener noreferrer"`. Internal links go through `withBase()`.
- **No secrets in the repo.** Form endpoints come from `PUBLIC_*` env vars.

---

## 8. Workflow for agents

1. Read the relevant content collection and `site.ts` before editing copy. The fact you need is probably already there.
2. Keep diffs focused. Do content/voice changes and structural refactors in separate commits.
3. When you change copy, re-read it against section 4. When you add facts, check them against section 5.
4. Run `pnpm verify` (and `pnpm test:e2e` for UI changes) and report the results honestly.
5. In the PR description, list any `TODO(board)` placeholders and any claims that need board confirmation.

### Open questions for the board

These are facts the site states or needs that agents can't verify. Resolve them before publishing related copy, then delete each line once it's answered.

- Which NICA teams are formal partners, and which simply share riders?
- Coach screening and training actually required (background check provider, concussion and abuse-awareness training, first aid/CPR)?
- EIN, board member names, and whether a 990 or annual report can be linked.
- Real Zeffy URLs for each registration, donation, and tier. Real Google Calendar embed. Real Volt store URL.
- Is "Lake Mountain Trails Coalition" an actual current sponsor (and its URL)?
- What the Enduro "gravity rider insurance" is, and why Enduro costs $150 (so the copy can explain it in one line).
- Scholarship and assistance specifics: fee waivers, loaner bikes, who reviews requests.
- Refund policy and waiver links.
- Every sponsorship perk in `src/content/tiers/*.yaml` is a promise to a sponsor (jersey placement, framed photo, year-end summary, social posts). Confirm the club will deliver each one.
- Are the current photos in `public/images/` real photos of Flyers riders, with media releases? Replace any that aren't.
