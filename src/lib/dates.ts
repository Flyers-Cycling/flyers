// Content stores dates as ISO strings ('2027-01-16'). These helpers turn them into the
// human format the site shows ("Sat, Jan 16, 2027"). Dates are calendar days with no time,
// so they are formatted in UTC to avoid shifting a day in the builder's time zone.

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function toUtcDate(isoDate: string): Date {
  if (!ISO_DATE.test(isoDate)) {
    throw new Error(`Expected a date like "2027-01-16", got "${isoDate}"`);
  }
  return new Date(`${isoDate}T00:00:00Z`);
}

const eventFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

const postFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "2027-01-16" → "Sat, Jan 16, 2027" */
export function formatEventDate(isoDate: string): string {
  return eventFormatter.format(toUtcDate(isoDate));
}

/** One date, or a start–end range joined with an en dash. */
export function formatEventDateRange(startDate: string, endDate?: string): string {
  const start = formatEventDate(startDate);
  if (!endDate || endDate === startDate) return start;
  return `${start} – ${formatEventDate(endDate)}`;
}

/** "2026-11-08" → "November 8, 2026" (for news posts) */
export function formatPostDate(isoDate: string): string {
  return postFormatter.format(toUtcDate(isoDate));
}
