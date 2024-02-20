import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Home' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Team' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Termin' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Home' }).click();

  await expect(
    page.getByRole('heading', { name: 'Wir machen Ihren Stil zu' })
  ).toHaveText('Wir machen Ihren Stil zu Ihren Träumen');
  await expect(
    page.getByRole('heading', { name: 'Wir machen Ihren Stil zu' })
  ).toContainText('Wir');
});
