import { test, expect } from '@playwright/test';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

test.describe('Navigation', () => {
  test('all nav links are present with correct href', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('header nav');
    for (const { label, href } of navLinks) {
      const link = nav.locator(`a[href="${href}"]`);
      await expect(link).toBeVisible();
      await expect(link).toHaveText(label);
    }
  });

  for (const { label, href } of navLinks) {
    test(`clicking "${label}" navigates to ${href}`, async ({ page }) => {
      await page.goto('/');
      await page.locator('header nav').locator(`a[href="${href}"]`).click();
      await page.waitForURL(`**${href}`);
      expect(new URL(page.url()).pathname).toBe(href);
    });
  }

  test('active link has underline styling', async ({ page }) => {
    for (const { href } of navLinks) {
      await page.goto(href);
      const activeLink = page.locator(`header nav a[href="${href}"]`);
      const classes = await activeLink.getAttribute('class');
      expect(classes).toContain('underline');
    }
  });

  test('logo link navigates to home', async ({ page }) => {
    await page.goto('/about');
    await page.locator('header a.no-invert').click();
    await page.waitForURL('**/');
    expect(new URL(page.url()).pathname).toBe('/');
  });
});
