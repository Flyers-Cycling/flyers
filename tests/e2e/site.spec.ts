import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const CORE_ROUTES = [
  '/',
  '/programs',
  '/programs/xc',
  '/programs/enduro',
  '/programs/jr-flyers',
  '/sponsors',
  '/sponsors/prospectus',
  '/schedule',
  '/winter-camp',
  '/store',
  '/about',
  '/register',
  '/coaches',
  '/board',
  '/brand',
  '/onboarding',
  '/faq',
  '/safety',
  '/scholarships',
  '/volunteer',
  '/learn',
  '/learn/pre-ride-check',
];

test.describe('Flyers Cycling Club — Navigation, Workflows & Accessibility', () => {
  for (const route of CORE_ROUTES) {
    test(`renders ${route} with single h1 and zero WCAG AA axe violations`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      await expect(page.locator('h1')).toHaveCount(1);

      const accessibilityScan = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScan.violations).toEqual([]);
    });
  }

  // Each program page uses its own color (docs/brand.md section 3): XC red, Enduro/Gravity pink,
  // Jr. Flyers blue. Checks the register button and the "Who it's for" check marks.
  for (const [route, primary] of [
    ['/programs/xc', 'rgb(184, 30, 30)'],
    ['/programs/enduro', 'rgb(184, 18, 95)'],
    ['/programs/jr-flyers', 'rgb(21, 101, 192)'],
  ] as const) {
    test(`${route} uses its program color`, async ({ page }) => {
      await page.goto(route);
      const check = page.locator('span[aria-hidden="true"]', { hasText: '✓' }).first();
      await expect(check).toHaveCSS('color', primary);
      const registerButton = page.locator('main a.bg-program').first();
      await expect(registerButton).toHaveCSS('background-color', primary);
    });
  }

  test('interactive Program Pathway Finder updates recommendation dynamically', async ({
    page,
  }) => {
    await page.goto('/');
    const finder = page.locator('#pathway-finder');
    await expect(finder).toBeVisible();

    // Default: 7th grade and up, XC riding with less focus on racing → Flyers XC Devo
    await expect(page.locator('#pathway-headline')).toContainText('Flyers XC Devo');
    await expect(page.locator('#pathway-primary-cta')).toHaveAttribute(
      'href',
      /\/programs\/xc#devo$/,
    );

    await finder.locator('input[name="focus"][value="xc-comp"]').check();
    await expect(page.locator('#pathway-headline')).toContainText('Flyers XC Comp');
    await expect(page.locator('#pathway-primary-cta')).toHaveAttribute(
      'href',
      /\/programs\/xc#comp$/,
    );

    await finder.locator('input[name="ageBand"][value="k-4"]').check();
    await finder.locator('input[name="focus"][value="fundamentals"]').check();

    await expect(page.locator('#pathway-headline')).toContainText('Jr. Flyers');
    await expect(page.locator('#pathway-primary-cta')).toHaveAttribute(
      'href',
      /\/programs\/jr-flyers$/,
    );

    await finder.locator('input[name="ageBand"][value="7-plus"]').check();
    await finder.locator('input[name="focus"][value="gravity"]').check();

    await expect(page.locator('#pathway-headline')).toContainText('Flyers Enduro/Gravity');
    await expect(page.locator('#pathway-primary-cta')).toHaveAttribute(
      'href',
      /\/programs\/enduro$/,
    );
  });

  test('Sponsor Inquiry Builder validates fields and generates structured inquiry draft', async ({
    page,
  }) => {
    await page.goto('/sponsors');

    await page.fill('#organizationName', 'Eagle Mountain Trail Co');
    await page.fill('#contactName', 'Taylor Clark');
    await page.fill('#sponsorEmail', 'taylor@example.com');
    await page.locator('input[name="programScope"][value="Flyers Enduro Spotlight"]').check();

    await page.click('#sponsor-submit-btn');

    const status = page.locator('#sponsor-form-status');
    await expect(status).toBeVisible();
    await expect(status).toContainText('Eagle Mountain Trail Co');
    await expect(status.locator('a')).toHaveAttribute(
      'href',
      /^mailto:info@lakemountainflyers\.com/,
    );
  });

  test('Schedule filter narrows events by program', async ({ page }) => {
    await page.goto('/schedule');
    const allCount = await page.locator('.schedule-event-card:not(.hidden)').count();
    expect(allCount).toBeGreaterThanOrEqual(2);

    await page.locator('input[name="programFilter"][value="jr-flyers"]').check();
    const jrCount = await page.locator('.schedule-event-card:not(.hidden)').count();
    expect(jrCount).toBeGreaterThanOrEqual(1);
    expect(jrCount).toBeLessThan(allCount);
  });

  test('Program pages link to a filtered schedule', async ({ page }) => {
    await page.goto('/schedule?program=enduro');
    await expect(page.locator('input[name="programFilter"][value="enduro"]')).toBeChecked();
    await page.goto('/programs/enduro');
    await expect(
      page.getByRole('navigation', { name: 'Flyers Enduro/Gravity sections' }),
    ).toBeVisible();
    await expect(page.locator('#gear')).toBeVisible();
  });

  test('Mobile navigation modal dialog opens and closes cleanly', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const openBtn = page.locator('#mobile-menu-open');
    await expect(openBtn).toBeVisible();
    await openBtn.click();

    const dialog = page.locator('#mobile-nav-dialog');
    await expect(dialog).toBeVisible();

    await dialog.getByRole('button', { name: 'Close' }).click();
    await expect(dialog).toBeHidden();
  });
});
