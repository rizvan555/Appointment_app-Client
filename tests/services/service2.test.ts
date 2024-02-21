import { expect, test } from '@playwright/test';

test('test_service2', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('button', { name: 'Anmelden' })).toBeVisible();
  await page.getByRole('button', { name: 'Anmelden' }).click();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.goto('http://localhost:5173/login');
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await page.getByPlaceholder('Username').click();
  await expect(page.getByPlaceholder('Username')).toHaveCount(1);
  await page.getByPlaceholder('Username').fill('rizvan');
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await page.getByPlaceholder('Password').click();
  await expect(page.getByPlaceholder('Password')).toHaveCount(1);
  await page.getByPlaceholder('Password').fill('111111');
  await expect(page.getByRole('button', { name: 'LOGIN' })).toBeVisible();
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.waitForTimeout(1000);
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('link', { name: 'Termin' })).toBeVisible();
  await page.getByRole('link', { name: 'Termin' }).click();
  await expect(page.url()).toBe('http://localhost:5173/termin');
  await page.waitForTimeout(1000);
  await expect(
    page.getByRole('heading', { name: 'Unsere Angebote' })
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'haarImage Basis Paket / Basic' })
  ).toBeVisible();
  await page
    .getByRole('link', { name: 'haarImage Basis Paket / Basic' })
    .click();
  await page.waitForTimeout(1000);
  await expect(page.url()).toBe('http://localhost:5173/service2');
  await page.waitForTimeout(1000);

  await expect(page.locator('.vc-pane')).toBeVisible();
  await expect(page.locator('div .vc-header').first()).toBeVisible();
  await expect(page.locator('div .vc-weeks').first()).toBeVisible();
  await expect(page.locator('div .vc-weekdays').first()).toBeVisible();
  await expect(page.locator('div .vc-weekday').first()).toBeVisible();
  await expect(page.locator('div .vc-week').first()).toBeVisible();
  await expect(page.locator('div .vc-day').first()).toBeVisible();
  await expect(page.locator('div .vc-day-content').first()).toBeVisible();
  await page.getByLabel('Monday, Feb 26,').click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: ':00 am - 08:30 am' }).click();
});
