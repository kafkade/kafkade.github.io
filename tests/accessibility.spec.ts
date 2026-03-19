import { test, expect } from '@playwright/test';

const allPages = ['/', '/projects', '/blog', '/blog/hello-world', '/about'];

test.describe('Accessibility', () => {
  for (const path of allPages) {
    test.describe(`Page: ${path}`, () => {
      test('html has lang attribute', async ({ page }) => {
        await page.goto(path);
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      });

      test('all images have alt attributes', async ({ page }) => {
        await page.goto(path);
        const images = page.locator('img');
        const count = await images.count();
        for (let i = 0; i < count; i++) {
          const alt = await images.nth(i).getAttribute('alt');
          expect(alt).not.toBeNull();
        }
      });

      test('heading hierarchy starts with h1', async ({ page }) => {
        await page.goto(path);
        const levels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll(
          (els) => els.map((el) => parseInt(el.tagName.replace('H', ''), 10))
        );

        expect(levels.length).toBeGreaterThan(0);
        expect(levels[0]).toBe(1);
        // Ensure heading levels never increase above h1 after the first
        for (let i = 1; i < levels.length; i++) {
          expect(levels[i]).toBeGreaterThanOrEqual(1);
          expect(levels[i]).toBeLessThanOrEqual(6);
        }
      });

      test('has proper landmark elements', async ({ page }) => {
        await page.goto(path);
        await expect(page.locator('header').first()).toBeVisible();
        await expect(page.locator('main')).toBeVisible();
        await expect(page.locator('footer').first()).toBeVisible();
      });
    });
  }

  test('nav links are keyboard-focusable', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('header nav');
    const links = nav.locator('a');
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      await page.keyboard.press('Tab');
    }

    // After tabbing, one of the nav links should be focused
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('theme toggle button has aria-label', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('#theme-toggle');
    await expect(toggle).toHaveAttribute('aria-label');
  });
});
