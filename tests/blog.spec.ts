import { test, expect } from '@playwright/test';

test.describe('Blog index', () => {
  test('lists at least one post', async ({ page }) => {
    await page.goto('/blog');
    const posts = page.locator('main article');
    await expect(posts.first()).toBeVisible();
    expect(await posts.count()).toBeGreaterThanOrEqual(1);
  });

  test('post cards have title, date, and description', async ({ page }) => {
    await page.goto('/blog');
    const card = page.locator('main article').first();

    await expect(card.locator('h3')).toBeVisible();
    await expect(card.locator('time')).toBeVisible();

    const paragraphs = card.locator('p');
    expect(await paragraphs.count()).toBeGreaterThanOrEqual(1);
  });

  test('clicking a blog post navigates to the post page', async ({ page }) => {
    await page.goto('/blog');
    const firstLink = page.locator('main a[href^="/blog/"]').first();
    const href = await firstLink.getAttribute('href');
    await firstLink.click();
    await page.waitForURL(`**${href}`);
    expect(new URL(page.url()).pathname).toBe(href);
  });
});

test.describe('Blog post page', () => {
  test('has title, date, and article content', async ({ page }) => {
    await page.goto('/blog/hello-world');
    await expect(page.locator('article h1')).toContainText('Hello, World');
    await expect(page.locator('article time')).toBeVisible();
    await expect(page.locator('article')).toBeVisible();
  });

  test('has proper heading hierarchy', async ({ page }) => {
    await page.goto('/blog/hello-world');
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    const headings = await page.locator('article :is(h1, h2, h3, h4, h5, h6)').evaluateAll(
      (els) => els.map((el) => parseInt(el.tagName.replace('H', ''), 10))
    );

    // Verify no heading level is skipped
    for (let i = 1; i < headings.length; i++) {
      const jump = headings[i] - headings[i - 1];
      expect(jump).toBeLessThanOrEqual(1);
    }
  });
});
