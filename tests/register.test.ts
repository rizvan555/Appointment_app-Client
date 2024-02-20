import { expect, test } from '@playwright/test';

test('test_register', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('button', { name: 'Anmelden' })).toBeVisible();
  await page.getByRole('button', { name: 'Anmelden' }).click();
  await page.waitForTimeout(1000);

  await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.waitForTimeout(1000);

  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await page.getByPlaceholder('Username').click();
  await expect(page.getByPlaceholder('Username')).toHaveCount(1);
  await page.getByPlaceholder('Username').fill('kamala');
  await page.waitForTimeout(1000);

  await expect(page.getByPlaceholder('E-Mail')).toBeVisible();
  await page.getByPlaceholder('E-Mail').click();
  await expect(page.getByPlaceholder('E-Mail')).toHaveCount(1);
  await page.getByPlaceholder('E-Mail').fill('kamala@kamala.de');
  await page.waitForTimeout(1000);

  await expect(page.getByPlaceholder('Telephone')).toBeVisible();
  await page.getByPlaceholder('Telephone').click();
  await expect(page.getByPlaceholder('Telephone')).toHaveCount(1);
  await page.getByPlaceholder('Telephone').fill('017623512635');
  await page.waitForTimeout(1000);

  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await page.getByPlaceholder('Password').click();
  await expect(page.getByPlaceholder('Password')).toHaveCount(1);
  await page.getByPlaceholder('Password').fill('111111');
  await page.waitForTimeout(1000);

  await expect(page.getByRole('button', { name: 'REGISTER' })).toBeVisible();
  await page.getByRole('button', { name: 'REGISTER' }).click();
  await page.waitForTimeout(1000);
});
