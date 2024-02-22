import { expect, test } from '@playwright/test';

test('test_contact', async ({ page }) => {
  await page.goto('http://localhost:5173/kontakt');
  await expect(page.locator('iframe')).toBeVisible();
});
