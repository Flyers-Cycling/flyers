# Flyers website plan

The working plan for the Flyers Cycling Club website, the front door for all three programs. Tick a box in the same PR that finishes the work. Add new items at the end of the right phase.

Last reviewed: Nov 21, 2026.

## Where we're headed

A site a parent can trust in 2 minutes on a phone, and a member can use every week. Durango DEVO is the model: one club, many groups, clear safety and support pages, and lots of real photos. Flyers has 3 programs instead of 15 age groups, so each program gets its own section with its own color. Each program has an age range: Jr. Flyers is K-6th grade. Flyers XC is 10-22 (U23), and it overlaps with Jr. Flyers on purpose so advanced Jr. Flyers can ride in Flyers XC. Flyers Enduro/Gravity is 10-18.

### What we're borrowing from Durango DEVO

- A clear "how we work" statement (theirs is "age based" and "community based"). Ours: organized by program, age, and ability. Community based.
- A Safety page with a way to report a concern.
- Scholarships with their own page, not one FAQ line.
- Donate and Volunteer grouped under one "Support" menu. Sponsors also gets its own top-level nav item, and the two link to each other.
- A Policies area: rider rules, cancellation and refund, code of conduct.
- Coach resources for volunteers.
- Real impact numbers on the home page, once we have them.

### What we're not borrowing

- Stale event listings. Our schedule hides past events automatically.
- Policies in loose Google Docs. Ours live on the site, backed by the club's Google Docs (`TODO(board)`: links to the source docs).
- Numbers that change from page to page. Ours come from one place ([source-of-truth.md](./source-of-truth.md)).

## Phase 0: Foundation (this PR)

- [x] Review AGENTS.md / CLAUDE.md and point it at the new guides
- [x] Voice guide ([voice.md](./voice.md))
- [x] Brand and design system ([brand.md](./brand.md))
- [x] Source-of-truth map ([source-of-truth.md](./source-of-truth.md))
- [x] Project memory updated
- [ ] Randall answers the content questions (bottom of this file)

## Phase 1: Ready for registration (by Dec 1, 2026)

- [x] Merge PR #8 (Jr. Flyers $35, Flyers XC Devo and Comp)
- [ ] Paste the XC and Enduro/Gravity form links into `siteConfig.registration.forms` (skill: `update-registration-links`)
- [ ] Kickoff ride time and trailhead (skill: `manage-events`)
- [ ] Real Zeffy donate link, so the Donate button works
- [ ] Slack invite, email sign-up, and Google Calendar links on New Families
- [ ] Google Calendar embed on Schedule
- [ ] Update README.md, which still describes the old program ages and "U23"
- [ ] Decide on the custom domain (www.flyerscycling.org) and rename `public/CNAME.example`

## Phase 2: Design system

- [x] Add the program-theme token layer to `global.css` (brand.md section 3)
- [ ] Add the semantic token layer (surface, text, border, action, focus)
- [x] Replace raw hex with tokens (`getProgramAccentMeta()` is now `programTheme()` plus the program utilities)
- [x] Each program page sets `data-program` so its color comes from one place
- [x] Logo files (SVG traced from the club PNGs) published at /brand. Jr. Flyers color: Youth Blue `#1e88e5`.
- [x] Switch to the Brand Book fonts (Anton, Epilogue) and colors (Enduro Pink `#fe6cd0`, signature red `#da4444`)
- [x] Resolve the Brand Book conflicts (brand.md section 8)
- [x] Underline stroke under display headlines, in the program color (red, pink on Enduro/Gravity, blue on Jr. Flyers)
- [x] Self-host the two fonts
- [ ] Build the shared components list (brand.md section 6) as Astro components (program badge done; buttons, event card, person card, notice banner still to do)
- [x] Brand review of every page: program pages, cards, register, schedule, coaches, and About use each program's own color (Nov 21, 2026)
- [x] A `/brand` page (footer link) with logos, colors, type, voice, and photos

## Phase 3: Trust and safety

Parents look for these.

- [x] Safety page: coach screening and training (background check plus head-coach training), two-adult rule, helmet and gear rules, concussion protocol, emergencies, how to report a concern. Drafted at /safety: screening, gear links, two-adult rule, national concussion guidelines, and a concern email (board follows up). Emergency action plan and weather call-offs (Slack, 2 hours ahead) added.
- [ ] Coaches page with real bios and photos (adults, with consent)
- [ ] Board page with every board member, the EIN, and a 990 or annual report link
- [ ] Policies page: code of conduct, rider rules, waiver, refund and cancellation
- [x] Scholarships page: what help exists and how to ask privately (today: reach out to a coach). Done at /scholarships ("Help with costs"): no set rules, families reach out, requests are private and the board follows up.
- [x] Volunteer page: roles, time asked, training, how to start. Done at /volunteer: 8 roles Randall confirmed, with time estimates for him to confirm.

## Phase 4: Program sections

Each program becomes its own section, the way the club runs.

- [x] Section layout: overview, groups, schedule, coaches, gear, resources, news. Each program page has section links, its coaches, club news, and a link to its own dates. A resources section waits on Phase 5 content.
- [ ] Flyers XC: separate Devo and Comp pages, with how a rider picks or moves between them. Switching (Devo to Comp when a rider wants to race and commit to training) is on the XC page; separate pages still to do.
- [ ] Flyers Enduro/Gravity: protective gear, bike park days, race support, Youth Enduro Series races. Where we ride (Eagle Mountain, Lake Mountain, Kyhv Peak, Sundance, Deer Valley, Solitude) is on the page.
- [ ] Jr. Flyers: what a first session looks like, a parent's guide, bike sizing. Bike sizing: "ask a coach" (Randall). First-session details coming from Jessie Shepard.
- [x] Program filter on Schedule and News (events and posts already carry a program). Schedule opens filtered from each program page (`/schedule?program=xc`); program pages show news for that program plus club-wide posts.
- [ ] Program-specific photos (real ones, with media releases)

## Phase 5: Member resources

For families already in the club.

- [x] Parent handbook: how communication works (Slack, email, calendar), weather calls, what to bring. At /onboarding ("Parent handbook"); Slack, email, and calendar links and the waiver are still `TODO(board)`.
- [ ] Rider knowledge library: bike fit, basic maintenance, trail etiquette, nutrition and hydration, race day basics. At /learn as Markdown in `src/content/guides/`: bike check, trail manners, food and water, race day. Bike fit and maintenance still to write.
- [ ] Coach resources: ride leader checklists, emergency plan, skills progressions
- [ ] Simple contact form that routes to the right person by topic (`TODO`: pick how to run a working form on a static site)

## Phase 6: Community and support

- [ ] "Support" menu (Donate, Volunteer, Shop) plus Sponsors as its own top-level item, cross-linked
- [ ] Donate reachable from every page
- [ ] Real sponsors only; open sponsorship spots listed separately
- [ ] Confirm every sponsor tier perk before it stays on the site
- [ ] Impact numbers on the home page (riders, rides, volunteer hours, scholarships)
- [ ] Adult riders: how parents and adults can ride, coach, and help (confirmed: the club wants this)
- [ ] Rider and family stories, with permission
- [ ] Newsletter sign-up

## Confirmed facts to add to the site

Randall answered these on Nov 21, 2026. Each one goes into its home in content (see [source-of-truth.md](./source-of-truth.md)).

- [x] **Practice rhythm.** Flyers XC and Flyers Enduro/Gravity: Saturdays only through mid-March, then Tuesdays and some Saturdays through August. Jr. Flyers: Tuesdays, June to August. In each program's `practiceSchedule`.
- [x] **Flyers XC kickoff meeting, Dec 15, 2026.** Add an event (skill: `manage-events`). Time and place still needed.
- [x] **Flyers XC rides:** Winter Classic, Eagle Mountain to Eureka and back (January). Big Water Rim (February). Spring Classic, White Rim (April). On the XC page. Add as events once dates are set.
- [x] **Races each program follows.** Flyers XC: Intermountain Cup and the weekly race series. Flyers Enduro/Gravity: the youth enduro series, plus Mountain States Cup and Monster Pro Series for downhill. Jr. Flyers: no races, weekly practices from June. On the XC and Enduro/Gravity pages.
- [x] **Coaches.** Every coach completes a background check and training from the head coaches. Many are also NICA coaches. Use this on the Safety and Coaches pages, and nothing stronger.
- [x] **Help with costs.** Some help is available. Families reach out to a coach. Use this on the FAQ and the future Scholarships page.
- [x] **Jr. Flyers uses Youth Blue and the club logo.** Switched the `jr` accent from berry to Youth Blue `#1e88e5`.
- [ ] **Adults are welcome.** Add the adult riders page in Phase 6.

## Board and content questions

Open facts the site needs. Resolve one, update the fact in its home ([source-of-truth.md](./source-of-truth.md)), and tick it here.

- [ ] Which NICA teams are formal partners, and which just share riders?
- [x] What screening and training do Flyers coaches complete? Background check plus training from head coaches; many are NICA coaches.
- [ ] Which background check provider, and do coaches also complete concussion, abuse-awareness, or first aid/CPR training?
- [ ] EIN, the full board list, and a 990 or annual report link
- [ ] Coach bios and photos: Randall Adams (XC), Tim Richards (Enduro/Gravity), Jessie Shepard (Jr. Flyers). Randall is sending these.
- [ ] Registration form links (Dec 1, 2026) and the Jr. Flyers opening date
- [ ] Real Zeffy links for donations, each tier, and the shop. Real Google Calendar embed. Real Volt store URL.
- [ ] Is Lake Mountain Trails Coalition a current sponsor? What is its URL?
- [ ] What the Enduro/Gravity "gravity rider insurance" is, and why the fee is $150
- [x] Is there help with costs? Yes, some. Families reach out to a coach.
- [ ] Scholarship details: what kinds of help (fee waivers, loaner bikes), and can we publish a contact?
- [ ] Refund policy and waiver links, and links to the Google Docs behind each policy
- [ ] Confirm the club will deliver every sponsor tier perk in `src/content/tiers/`
- [x] Media releases for the Enduro/Gravity photos (confirmed by Randall, Nov 21 2026)
- [ ] Real photos for the home page hero, coaches, Flyers XC, and Jr. Flyers (Randall uploading to the club Drive folder)
- [x] Practice days for each program (see "Confirmed facts" above)
- [ ] Practice times and locations for each program
- [x] Flyers Enduro/Gravity practices follow the Flyers XC schedule.
- [ ] Dec 15 kickoff meeting time and place, and dates for the Winter Classic, Big Water Rim, and Spring Classic rides
- [x] Jr. Flyers brand color: Youth Blue #1e88e5, same logo
- [ ] Logo source files
