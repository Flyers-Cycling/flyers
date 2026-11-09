# Site evaluation: November 2026

A review of the Flyers Cycling Club site at commit `cedc076`, compared against peer non-profit youth cycling clubs. The voice and best-practice rules that came out of it are in [AGENTS.md](../AGENTS.md).

## What's working

- **Solid engineering base.** Static Astro + TypeScript, Zod-validated content collections that volunteers can edit in the GitHub UI, axe WCAG checks and link-integrity tests in CI, and a printable sponsor prospectus that reads from the same tier data as the website.
- **Clear program structure.** Three programs with ages, grades, seasons, practice rhythm, gear checklists, and a "which program fits?" finder. That's better than many peer sites.
- **Honest cost FAQ.** The site separates the club fee from optional race entries and kit, which matches the best local practice (Lehi MTB lists every cost families will face).
- **Impact-tied giving levels.** Each sponsor tier names what it pays for, which is what donor-conversion guidance recommends.

## Main issues

### 1. Voice reads like a sales pitch, and it repeats itself

- "100% volunteer" appears 24 times in `src/`. The fee range is hardcoded 11 times outside `site.ts`. The five-school list appears 14 times. Visitors see the same three facts in every section.
- The site positions itself against other clubs ("Without the Multi-Thousand-Dollar Price Tag", "when other clubs cost thousands", "Unlike multi-thousand-dollar private clubs"). Peers such as Durango DEVO, Boulder Junior Cycling, and Little Bellas lead with what kids gain: lifelong riding, skills, confidence, friendship. Comparative framing can also put off nearby NICA teams and clubs whose families Flyers wants.
- Buzzwords ("synergy", "seamlessly", "next-level", "world-class", "radically welcoming", "Three Dirt Pathways"), headings longer than 10 words, and heavy bolding make the copy feel machine-written rather than coach-written.
- Racing and podiums get more emphasis than fun and belonging. Peers say plainly that you don't need to be fast or race.

### 2. Unverified or risky claims

- The site says Flyers "partners with" or "works hand-in-hand with" five named NICA teams. Lehi MTB's own family handbook lists other regional teams and shops but doesn't mention Flyers. Confirm these relationships, or rephrase.
- Jr. Flyers says its coaches are "background-checked", and XC leaders are called "NICA-trained". These need confirmation, and the site has no safety page backing them up.
- Tier perks say "100% 501(c)(3) tax-deductible" alongside benefits like jersey logos and framed photos. Use "to the extent allowed by law" wording, approved by the treasurer.
- "Seen by thousands of Utah cycling families" is an unsourced statistic.
- The EIN is listed as "available upon request". It's public record, and peers and transparency guidance recommend publishing it.

### 3. Placeholder data looks real

- 17 links point to the bare `https://www.zeffy.com/`, including the main registration buttons. Families who click "Register" land on Zeffy's homepage.
- The Google Calendar embed is empty. The Volt store URL points to the legacy domain.
- "Open slot" sponsor entries render in the sponsor grid next to real sponsors, and "Lake Mountain Trails Coalition" needs confirmation.
- Two updates are dated after today (2026-11-15 and 2026-12-05).

### 4. Missing content parents and donors look for

| Gap                                                                                                                                        | Peer practice                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Safety / youth protection page** (screening, training, two-adult rule, concussion protocol, ratios, emergency plan, reporting a concern) | NICA requires background checks, CDC HEADS UP concussion training, and athlete-abuse awareness training for coaches. Cycling BC and the Ottawa Bicycle Club publish Rule-of-Two policies. |
| **Real people**: leadership cards are generic roles with no names or photos                                                                | Boulder Junior Cycling has Coaches and Leadership pages. Local NICA teams name their head coaches.                                                                                        |
| **Volunteer page**: roles, time commitment, training, how to start                                                                         | Lehi MTB recruits ride leaders "of all abilities" and asks for 4 trail-work hours per rider.                                                                                              |
| **Scholarship / assistance page**: today it's one FAQ line                                                                                 | Boulder Junior Cycling has a dedicated scholarships page and FAQ. Lehi MTB and the Utah league offer loaner bikes.                                                                        |
| **Donate in the main nav**: currently only through Sponsors                                                                                | Boulder Junior Cycling puts Donate in its top navigation.                                                                                                                                 |
| **Transparency**: EIN, board names, 990 or annual report, impact numbers                                                                   | Candid/GuideStar and nonprofit transparency guides recommend posting the 990 and keeping board lists consistent with it.                                                                  |
| **Policies**: code of conduct, waiver, refunds                                                                                             | Boulder Junior Cycling publishes a cancellations and refunds policy.                                                                                                                      |
| **Stories and photos** of real riders and families (with consent)                                                                          | Little Bellas and DEVO lead with rider stories.                                                                                                                                           |

### 5. Smaller technical items

- Event dates render as raw ISO strings (`2027-01-16`). Format them for people.
- The homepage "upcoming" list and the schedule don't filter out past events, so they'll go stale on their own.
- `siteConfig.region` still says "Utah County & Surrounding Communities", which doesn't match the latest commit's broader "Utah" framing.
- Google Fonts are loaded from a third party. Consider self-hosting them for privacy and performance.
- The `feeAmount` schema enum (`'$50' | '$150'`) hardcodes pricing in the schema. A fee change requires a code change.

## Suggested order of work

1. Replace placeholder Zeffy, calendar, and store URLs, and hide "open slot" sponsors from the grid (show them only on `/sponsors` as clearly labelled opportunities).
2. Get board answers to the open questions in AGENTS.md. Then add Safety, Volunteer, and Scholarship pages, and put Donate in the nav.
3. Do a voice pass: rewrite the hero, differentiators, about page, and FAQ 1 under the AGENTS.md voice rules, and pull repeated facts from `siteConfig`.
4. Add human date formatting and past-event filtering.
5. Add real leadership names and photos, and rider stories, as consent allows.

## Sources

- [Durango DEVO story (Singletracks)](https://www.singletracks.com/community/the-durango-devo-story-a-blueprint-for-grassroots-youth-cycling-programs/)
- [Boulder Junior Cycling](https://www.boulderjuniorcycling.org/)
- [Bend Endurance Academy (GuideStar)](https://www.guidestar.org/profile/26-4242869)
- [Little Bellas (Cyclingnews)](https://www.cyclingnews.com/news/little-bellas-draws-young-girls-to-mountain-biking)
- [Lehi MTB family handbook](https://lehimtb.substack.com/p/lehi-mtb-bible)
- [Utah High School Cycling League: coaches](https://utahmtb.squarespace.com/coaches)
- [NICA coach education requirements](https://nationalmtb.org/coaches-license-program/)
- [Cycling BC SafeSport & Coach Excellence policy](https://cyclingbc.net/ssce-policy)
- [Ottawa Bicycle Club responsible coaching policy](https://ottawabicycleclub.ca/wp-content/uploads/2022/12/Policy-09-Youth-and-Junior-Programs-Responsible-Coaching-2.0.pdf)
- [Whole Whale: nonprofit transparency best practices](https://www.wholewhale.com/tips/nonprofit-transparency-best-practices/)
- [Candid profile best practices](https://www.guidestar.org/UpdateNonprofitProfile/profile-best-practices)
