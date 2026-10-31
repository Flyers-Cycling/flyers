import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const programScopeEnum = z.enum(['club', 'xc', 'enduro', 'jr-flyers']);

const programs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programs' }),
  schema: z.object({
    programId: z.enum(['xc', 'enduro', 'jr-flyers']),
    title: z.string(),
    shortTitle: z.string(),
    discipline: z.string(),
    tagline: z.string(),
    summary: z.string(),
    order: z.number().int().positive(),
    agesLabel: z.string(),
    gradesLabel: z.string(),
    seasonLabel: z.string(),
    registrationWindowLabel: z.string(),
    registrationStatus: z.enum(['open', 'upcoming', 'waitlist', 'closed']),
    registrationUrl: z.string().url(),
    feeAmount: z.enum(['$50', '$150']),
    feeIncludes: z.string(),
    accentKey: z.enum(['xc', 'enduro', 'jr']),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    practiceSchedule: z.array(z.string()).min(1),
    whoItsFor: z.array(z.string()).min(1),
    gearChecklist: z.array(z.string()).min(1),
    nicaSynergy: z.string(),
  }),
});

const tiers = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/tiers' }),
  schema: z.object({
    tierId: z.enum(['community', 'bronze', 'silver', 'gold', 'title']),
    name: z.string(),
    amountLabel: z.string(),
    amountNumeric: z.number().nonnegative(),
    order: z.number().int().positive(),
    featured: z.boolean().default(false),
    badgeLabel: z.string(),
    impactHeadline: z.string(),
    jerseyPlacement: z.string(),
    tentBannerPlacement: z.string(),
    digitalRecognition: z.string(),
    perks: z.array(z.string()).min(1),
    zeffyUrl: z.string().url(),
  }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/sponsors' }),
  schema: z.object({
    name: z.string(),
    tier: z.enum(['title', 'gold', 'silver', 'bronze', 'community']),
    order: z.number().int().positive(),
    logo: z.string(),
    websiteUrl: z.string().url(),
    scopes: z.array(programScopeEnum).min(1),
    summary: z.string(),
    location: z.string().optional(),
    active: z.boolean().default(true),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    timeLabel: z.string(),
    program: z.enum(['all', 'xc', 'enduro', 'jr-flyers', 'community']),
    category: z.enum(['practice', 'race', 'clinic', 'trail-work', 'registration']),
    location: z.string(),
    summary: z.string(),
    actionLabel: z.string().optional(),
    actionUrl: z.string().url().optional(),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.enum(['costs-nonprofit', 'programs-nica', 'gear-safety', 'sponsorship-volunteer']),
    order: z.number().int().positive(),
  }),
});

const leadership = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/leadership' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    programFocus: z.string(),
    order: z.number().int().positive(),
    bio: z.string(),
  }),
});

const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: z.object({
    title: z.string(),
    publishedDate: z.string(),
    category: z.enum(['registration', 'kit-store', 'community', 'racing']),
    program: z.enum(['all', 'xc', 'enduro', 'jr-flyers']),
    summary: z.string(),
  }),
});

export const collections = {
  programs,
  tiers,
  sponsors,
  events,
  faqs,
  leadership,
  updates,
};
