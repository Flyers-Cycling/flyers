export interface NicaPartnerTeam {
  name: string;
  school: string;
  city: string;
}

export const siteConfig = {
  name: 'Flyers Cycling Club',
  shortName: 'Flyers',
  tagline: 'Youth mountain biking in Utah. All riders welcome.',
  legalEntity: 'Lake Mountain Bicycle Club, Inc.',
  // Approved by Randall (Nov 2026). A modernized version of the lakemountainflyers.com mission.
  mission: {
    statement:
      'Flyers Cycling Club helps young riders become lifelong mountain bikers. Through our programs, we build skills, fitness, and friendships in a club that welcomes every rider, whatever their skill level, gender, or fitness.',
    focusAreas: [
      { title: 'Fun', body: 'Riding with friends comes first, in every program.' },
      {
        title: 'Skills and training',
        body: 'Coaching that meets each rider where they are, from first trail skills to race training.',
      },
      {
        title: 'Racing, if you want it',
        body: 'Flyers XC Devo for riders who want to ride with less focus on racing, and Flyers XC Comp for competitive racing. We support both.',
      },
      {
        title: 'Education',
        body: 'Bike safety, bike care, and trail etiquette for riders and families.',
      },
      { title: 'Service', body: 'Giving back through trail days and volunteering.' },
    ],
  },
  nonProfitStatus: '501(c)(3) Non-Profit Organization',
  einPlaceholder: 'Available upon request for corporate & foundation matching',
  region: 'Utah',
  feePhilosophy: {
    rangeLabel: '$35–$150',
    shortSummary: '$35–$150 registration covers a t-shirt and insurance',
    detail:
      "Every Flyers program is run by volunteers. Registration is $35–$150, depending on the program, and covers a club t-shirt and rider insurance. Sponsors and donors pay for the rest, so cost doesn't keep kids off the trail.",
  },
  // Flyers XC and Flyers Enduro/Gravity each have their own registration form, opening Dec 1.
  // Jr. Flyers registers later (registrationForm: later in src/content/programs/jr-flyers.md).
  registration: {
    season: '2027',
    opensDate: '2026-12-01',
    // TODO(board): paste each form link between the quotes on Dec 1. While a link is empty,
    // that program's buttons say "Registration opens Dec 1" and go to /register.
    forms: {
      xc: '' as string,
      enduro: '' as string,
    },
  },
  // Confirmed by Randall (Nov 21, 2026). Used on /safety, /coaches, and /volunteer.
  // Say nothing stronger until the board confirms more (see docs/plan.md, board questions).
  coachScreening:
    'Every Flyers coach completes a background check and training from our head coaches. Many are also NICA coaches.',
  // Confirmed by Randall (Nov 21, 2026): some help is available, and families reach out to a coach.
  costHelp: {
    summary:
      "Some help with costs is available. Talk to your rider's coach, or email us. We keep every request private.",
  },
  // Confirmed by Randall (Nov 21, 2026). Used on /safety and /onboarding.
  weatherCalls:
    "We call off rides for lightning and mud. You'll hear in Slack at least 2 hours before the ride starts.",
  // Enduro/Gravity has a minimum age. Shown on the Enduro/Gravity page, /register, and the FAQ.
  enduroMinimumAge: 10,
  contact: {
    email: 'info@lakemountainflyers.com',
    sponsorshipEmail: 'info@lakemountainflyers.com',
    location: 'Utah County, Utah',
  },
  integrations: {
    zeffyDonateUrl: 'https://www.zeffy.com/',
    zeffySponsorUrl: 'https://www.zeffy.com/',
    zeffyShopUrl: 'https://www.zeffy.com/',
    voltKitStore: {
      vendor: 'Volt Cyclewear',
      status: 'seasonal' as 'open' | 'seasonal' | 'closed',
      windowLabel: 'Orders open winter to early spring',
      url: 'https://www.lakemountainflyers.com/',
      notes:
        'Optional Flyers jerseys and Alpine Thermal layers, made by Volt Cyclewear. Order in winter so kits arrive before spring.',
    },
    googleCalendarEmbedUrl: '',
    sponsorFormEndpoint: import.meta.env.PUBLIC_SPONSOR_FORM_ENDPOINT || '',
  },
  socials: [
    {
      label: 'Instagram (@flyers_xc)',
      href: 'https://www.instagram.com/flyers_xc/',
    },
  ],
  legacyDomains: ['lakemountainflyers.com', 'flyersxc.com'],
  nicaPartners: [
    {
      name: 'Westlake Rolling Thunder',
      school: 'Westlake High School',
      city: 'Saratoga Springs, UT',
    },
    {
      name: 'Lehi MTB & Jr. Devo',
      school: 'Lehi High School',
      city: 'Lehi, UT',
    },
    {
      name: 'Cedar Valley MTB',
      school: 'Cedar Valley High School',
      city: 'Eagle Mountain, UT',
    },
    {
      name: 'Skyridge MTB',
      school: 'Skyridge High School',
      city: 'Lehi, UT',
    },
    {
      name: 'Lone Peak MTB',
      school: 'Lone Peak High School',
      city: 'Highland, UT',
    },
  ] satisfies NicaPartnerTeam[],
} as const;
