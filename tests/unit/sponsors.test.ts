import { describe, expect, it } from 'vitest';
import {
  buildSponsorInquiryMailto,
  filterSponsorsByScope,
  type SponsorRecord,
} from '../../src/lib/sponsors';

const mockSponsors: SponsorRecord[] = [
  {
    id: 'silver-1',
    name: 'Volt Cyclewear',
    tier: 'silver',
    order: 2,
    logo: '/images/sponsor-volt.svg',
    websiteUrl: 'https://www.voltcyclewear.com/',
    scopes: ['club', 'xc'],
    summary: 'Apparel partner',
    active: true,
  },
  {
    id: 'title-1',
    name: 'Wasatch Bikes',
    tier: 'title',
    order: 1,
    logo: '/images/sponsor-open-title.svg',
    websiteUrl: 'https://example.com',
    scopes: ['club', 'enduro'],
    summary: 'Title partner',
    active: true,
  },
  {
    id: 'inactive-1',
    name: 'Archived Partner',
    tier: 'gold',
    order: 1,
    logo: '/images/sponsor-trails.svg',
    websiteUrl: 'https://example.com',
    scopes: ['club'],
    summary: 'Inactive',
    active: false,
  },
];

describe('filterSponsorsByScope', () => {
  it('keeps open sponsorship spots out of the sponsor list unless asked for', () => {
    const withSlot: SponsorRecord[] = [
      ...mockSponsors,
      { ...mockSponsors[0]!, id: 'open-1', name: 'Open Spot', openSlot: true },
    ];
    expect(filterSponsorsByScope(withSlot).map((s) => s.id)).not.toContain('open-1');
    expect(filterSponsorsByScope(withSlot, undefined, 'only').map((s) => s.id)).toEqual(['open-1']);
  });

  it('excludes inactive sponsors and sorts by tier rank', () => {
    const result = filterSponsorsByScope(mockSponsors);
    expect(result.map((s) => s.id)).toEqual(['title-1', 'silver-1']);
  });

  it('filters sponsors by program scope cleanly', () => {
    const enduroOnly = filterSponsorsByScope(mockSponsors, 'enduro');
    expect(enduroOnly.map((s) => s.id)).toEqual(['title-1']);
  });
});

describe('buildSponsorInquiryMailto', () => {
  it('formats a clean mailto URL without plus-sign space encoding', () => {
    const href = buildSponsorInquiryMailto(
      {
        organizationName: 'Eagle Mountain Cycles',
        contactName: 'Jordan Rider',
        email: 'jordan@example.com',
        tier: 'Gold Kit & Pit Partner',
        programScope: 'Flyers Enduro Spotlight',
        supportType: 'Check or ACH',
        notes: 'Happy to host packet pickup!',
      },
      'info@lakemountainflyers.com',
    );

    expect(href.startsWith('mailto:info@lakemountainflyers.com?')).toBe(true);
    expect(href).not.toContain('+');
    expect(decodeURIComponent(href)).toContain('Eagle Mountain Cycles');
    expect(decodeURIComponent(href)).toContain('Flyers Enduro Spotlight');
  });
});
