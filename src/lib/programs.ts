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
        badgeClass: 'bg-emerald-50 text-emerald-950 border-emerald-300',
        dotClass: 'bg-emerald-600',
        ctaLabel: 'Register Now',
      };
    case 'upcoming':
      return {
        label: 'Opening Soon',
        badgeClass: 'bg-[#FFF9E6] text-[#5C4500] border-[#E6C245]',
        dotClass: 'bg-[#C99A00]',
        ctaLabel: 'Join Interest List',
      };
    case 'waitlist':
      return {
        label: 'Waitlist Open',
        badgeClass: 'bg-[#EEF3F6] text-[#14242E] border-[#B8CAD6]',
        dotClass: 'bg-[#203746]',
        ctaLabel: 'Join Waitlist',
      };
    case 'closed':
      return {
        label: 'In Season / Closed',
        badgeClass: 'bg-neutral-100 text-neutral-800 border-neutral-300',
        dotClass: 'bg-neutral-500',
        ctaLabel: 'Contact Program Leads',
      };
  }
}

export interface AccentThemeMeta {
  badgeClass: string;
  borderClass: string;
  topBarClass: string;
  darkPillClass: string;
  buttonClass: string;
}

export function getProgramAccentMeta(accent: ProgramAccent): AccentThemeMeta {
  switch (accent) {
    case 'xc':
      return {
        badgeClass: 'bg-[#FDF2F2] text-[#8F1616] border-[#F2C4C4]',
        borderClass: 'hover:border-[#B81E1E]',
        topBarClass: 'bg-[#B81E1E]',
        darkPillClass: 'bg-[#B81E1E]/30 text-white border-[#D12323]/60',
        buttonClass: 'bg-[#B81E1E] text-white hover:bg-[#8F1616]',
      };
    case 'enduro':
      return {
        badgeClass: 'bg-[#EEF3F6] text-[#14242E] border-[#C2D2DC]',
        borderClass: 'hover:border-[#203746]',
        topBarClass: 'bg-[#203746]',
        darkPillClass: 'bg-[#F4CE50]/20 text-[#F4CE50] border-[#F4CE50]/45',
        buttonClass: 'bg-[#203746] text-white hover:bg-[#14242E]',
      };
    case 'jr':
      return {
        badgeClass: 'bg-[#FCF1F4] text-[#840E23] border-[#EFC2CC]',
        borderClass: 'hover:border-[#9D112A]',
        topBarClass: 'bg-[#9D112A]',
        darkPillClass: 'bg-white/15 text-white border-white/35',
        buttonClass: 'bg-[#9D112A] text-white hover:bg-[#7A0C20]',
      };
  }
}
