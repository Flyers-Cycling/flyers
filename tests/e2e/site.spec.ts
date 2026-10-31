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
  '/store',
  '/about',
  '/faq',
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

  test('interactive Program Pathway Finder updates recommendation dynamically', async ({
    page,
  }) => {
    await page.goto('/');
    const finder = page.locator('#pathway-finder');
    await expect(finder).toBeVisible();

    await finder.locator('input[name="ageBand"][value="k-6"]').check();
    await finder.locator('input[name="focus"][value="fundamentals"]').check();

    await expect(page.locator('#pathway-headline')).toContainText('Jr. Flyers');
    await expect(page.locator('#pathway-primary-cta')).toHaveAttribute(
      'href',
      /\/programs\/jr-flyers$/,
    );

    await finder.locator('input[name="ageBand"][value="9-12"]').check();
    await finder.locator('input[name="focus"][value="gravity"]').check();

    await expect(page.locator('#pathway-headline')).toContainText('Flyers Enduro');
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
    expect(allCount).toBeGreaterThanOrEqual(5);

    await page.locator('input[name="programFilter"][value="jr-flyers"]').check();
    const jrCount = await page.locator('.schedule-event-card:not(.hidden)').count();
    expect(jrCount).toBeGreaterThanOrEqual(1);
    expect(jrCount).toBeLessThan(allCount);
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
