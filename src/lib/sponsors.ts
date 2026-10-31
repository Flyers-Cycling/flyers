export type SponsorTierKey = 'title' | 'gold' | 'silver' | 'bronze' | 'community';
export type SponsorScope = 'club' | 'xc' | 'enduro' | 'jr-flyers';

export interface SponsorRecord {
  id: string;
  name: string;
  tier: SponsorTierKey;
  order: number;
  logo: string;
  websiteUrl: string;
  scopes: SponsorScope[];
  summary: string;
  location?: string;
  active: boolean;
}

const TIER_RANK: Record<SponsorTierKey, number> = {
  title: 1,
  gold: 2,
  silver: 3,
  bronze: 4,
  community: 5,
};

export function filterSponsorsByScope(
  sponsors: SponsorRecord[],
  scope?: SponsorScope,
): SponsorRecord[] {
  return sponsors
    .filter((sponsor) => sponsor.active && (!scope || sponsor.scopes.includes(scope)))
    .sort((a, b) => {
      const rankDiff = TIER_RANK[a.tier] - TIER_RANK[b.tier];
      return rankDiff !== 0 ? rankDiff : a.order - b.order;
    });
}

export interface SponsorInquiryPayload {
  organizationName: string;
  contactName: string;
  email: string;
  tier: string;
  programScope: string;
  supportType: string;
  notes?: string;
}

export function buildSponsorInquiryMailto(
  payload: SponsorInquiryPayload,
  recipientEmail: string,
): string {
  const subject = `Flyers Cycling Club Sponsorship Inquiry — ${payload.organizationName} (${payload.tier})`;
  const lines = [
    'Hello Flyers Cycling Club / Lake Mountain Bicycle Club Board,',
    '',
    'We are interested in supporting youth cycling through a 501(c)(3) sponsorship:',
    '',
    `- Business / Family Name: ${payload.organizationName}`,
    `- Contact Person: ${payload.contactName}`,
    `- Contact Email: ${payload.email}`,
    `- Preferred Tier: ${payload.tier}`,
    `- Program Designation: ${payload.programScope}`,
    `- Support Format: ${payload.supportType}`,
    payload.notes?.trim() ? `- Notes / Questions: ${payload.notes.trim()}` : '',
    '',
    'Thank you!',
  ].filter(Boolean);

  const params = new URLSearchParams({
    subject,
    body: lines.join('\n'),
  });

  // URLSearchParams encodes spaces as '+'; mailto clients expect '%20'
  return `mailto:${recipientEmail}?${params.toString().replace(/\+/g, '%20')}`;
}
