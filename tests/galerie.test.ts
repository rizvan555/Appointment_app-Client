import { expect, test } from '@playwright/test';

test('test_team', async ({ page }) => {
  await page.goto('http://localhost:5173/galerie');
  await page.waitForTimeout(1000);
  await expect(
    page.getByRole('heading', { name: 'FOTOS UNSERER VERANSTALTUNGEN' })
  ).toBeVisible();

  await expect(page.locator('.w-72').first()).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .w-72')).toBeVisible();
  await expect(page.locator('div:nth-child(3) > .w-72')).toBeVisible();
  await expect(page.locator('div:nth-child(4) > .w-72')).toBeVisible();
  await expect(page.locator('div:nth-child(5) > .w-72')).toBeVisible();
  await expect(page.locator('div:nth-child(6) > .w-72')).toBeVisible();
});
