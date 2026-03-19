import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', title: 'kafkade' },
  { path: '/projects', title: 'Projects — kafkade' },
  { path: '/blog', title: 'Blog — kafkade' },
  { path: '/blog/hello-world', title: 'Hello, World — kafkade' },
  { path: '/about', title: 'About — kafkade' },
];

for (const { path, title } of pages) {
  test.describe(`Page: ${path}`, () => {
    test('loads without console errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      await page.goto(path);
      expect(errors).toEqual([]);
    });

    test(`has correct title "${title}"`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(title);
    });

    test('has header and footer', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('header').first()).toBeVisible();
      await expect(page.locator('footer').first()).toBeVisible();
    });
  });
}

test.describe('Home page', () => {
  test('has an h1 containing "kafkade"', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('kafkade');
  });
});

test.describe('404 page', () => {
  test('shows 404 content for a non-existent route', async ({ page }) => {
    await page.goto('/nonexistent');
    await expect(page).toHaveTitle('404 — kafkade');
    await expect(page.locator('h1')).toContainText('404');
  });
});
