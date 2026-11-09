export interface NicaPartnerTeam {
  name: string;
  school: string;
  city: string;
}

export const siteConfig = {
  name: 'Flyers Cycling Club',
  shortName: 'Flyers',
  tagline: 'Youth mountain biking for Utah kids, K–12.',
  legalEntity: 'Lake Mountain Bicycle Club, Inc.',
  nonProfitStatus: '501(c)(3) Non-Profit Organization',
  einPlaceholder: 'Available upon request for corporate & foundation matching',
  region: 'Utah',
  feePhilosophy: {
    rangeLabel: '$50 or $150',
    shortSummary: '$50–$150 registration covers a t-shirt and insurance',
    detail:
      "Every Flyers program is run by volunteers. Registration is $50 or $150, depending on the program, and covers a club t-shirt and rider insurance. Sponsors and donors pay for the rest, so cost doesn't keep kids off the trail.",
  },
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
