export type RegistrationStatus = 'open' | 'upcoming' | 'waitlist' | 'closed';
export type ProgramAccent = 'xc' | 'enduro' | 'jr';

export interface StatusBadgeMeta {
  label: string;
  badgeClass: string;
  dotClass: string;
  ctaLabel: string;
}

export function getRegistrationStatusMeta(status: RegistrationStatus): StatusBadgeMeta {
  switch (status) {
    case 'open':
      return {
        label: 'Registration Open',
        badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-300',
        dotClass: 'bg-emerald-600',
        ctaLabel: 'Register Now',
      };
    case 'upcoming':
      return {
        label: 'Opening Soon',
        badgeClass: 'bg-amber-50 text-amber-950 border-amber-300',
        dotClass: 'bg-amber-600',
        ctaLabel: 'Join Interest List',
      };
    case 'waitlist':
      return {
        label: 'Waitlist Open',
        badgeClass: 'bg-sky-50 text-sky-950 border-sky-300',
        dotClass: 'bg-sky-600',
        ctaLabel: 'Join Waitlist',
      };
    case 'closed':
      return {
        label: 'In Season / Closed',
        badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
        dotClass: 'bg-slate-500',
        ctaLabel: 'Contact Program Leads',
      };
  }
}

export interface AccentThemeMeta {
  badgeClass: string;
  borderClass: string;
  topBarClass: string;
  darkPillClass: string;
}

export function getProgramAccentMeta(accent: ProgramAccent): AccentThemeMeta {
  switch (accent) {
    case 'xc':
      return {
        badgeClass: 'bg-sky-50 text-sky-900 border-sky-200',
        borderClass: 'hover:border-sky-500',
        topBarClass: 'bg-sky-500',
        darkPillClass: 'bg-sky-400/15 text-sky-200 border-sky-400/30',
      };
    case 'enduro':
      return {
        badgeClass: 'bg-orange-50 text-orange-900 border-orange-200',
        borderClass: 'hover:border-orange-500',
        topBarClass: 'bg-orange-500',
        darkPillClass: 'bg-orange-400/15 text-orange-200 border-orange-400/30',
      };
    case 'jr':
      return {
        badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-200',
        borderClass: 'hover:border-emerald-500',
        topBarClass: 'bg-emerald-500',
        darkPillClass: 'bg-emerald-400/15 text-emerald-200 border-emerald-400/30',
      };
  }
}
