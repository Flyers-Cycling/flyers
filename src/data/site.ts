export interface NicaPartnerTeam {
  name: string;
  school: string;
  city: string;
}

export const siteConfig = {
  name: 'Flyers Cycling Club',
  shortName: 'Flyers',
  tagline: 'Gravity, Endurance & Youth Mountain Biking — Powered by Community, Not High Fees.',
  legalEntity: 'Lake Mountain Bicycle Club, Inc.',
  nonProfitStatus: '501(c)(3) Non-Profit Organization',
  einPlaceholder: 'Available upon request for corporate & foundation matching',
  region: 'Northwest Utah County (Eagle Mountain, Lehi, Saratoga Springs, Cedar Fort & Fairfield)',
  feePhilosophy: {
    rangeLabel: '$50 or $150',
    shortSummary: '$50–$150 registration covers t-shirt & insurance only',
    detail:
      'Every Flyers program is 100% volunteer-led. Rider registration is just $50 or $150 depending on the program—strictly covering a club t-shirt and rider insurance. Community and corporate sponsors fund the rest so every kid can ride and compete.',
  },
  contact: {
    email: 'info@lakemountainflyers.com',
    sponsorshipEmail: 'info@lakemountainflyers.com',
    location: 'Eagle Mountain & Lehi, Utah',
  },
  integrations: {
    zeffyDonateUrl: 'https://www.zeffy.com/',
    zeffySponsorUrl: 'https://www.zeffy.com/',
    zeffyShopUrl: 'https://www.zeffy.com/',
    voltKitStore: {
      vendor: 'Volt Cyclewear',
      status: 'seasonal' as 'open' | 'seasonal' | 'closed',
      windowLabel: 'Winter / Early Spring Order Window',
      url: 'https://www.lakemountainflyers.com/',
      notes:
        'Custom 4-way stretch jerseys and Alpine Thermal layers designed to pair with standard black bibs or MTB shorts to keep kit costs low.',
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
