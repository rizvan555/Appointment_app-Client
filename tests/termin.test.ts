import { expect, test } from '@playwright/test';

test('test_termin', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByRole('button', { name: 'Anmelden' })).toBeVisible();
  await page.getByRole('button', { name: 'Anmelden' }).click();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Login' }).click();
  await page.goto('http://localhost:5173/login');
  await page.waitForTimeout(1000);
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await page.getByPlaceholder('Username').click();
  await expect(page.getByPlaceholder('Username')).toHaveCount(1);
  await page.getByPlaceholder('Username').fill('rizvan');
  await page.waitForTimeout(1000);
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await page.getByPlaceholder('Password').click();
  await expect(page.getByPlaceholder('Password')).toHaveCount(1);
  await page.getByPlaceholder('Password').fill('111111');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: 'LOGIN' })).toBeVisible();
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.waitForTimeout(1000);
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1000);

  await expect(page.getByRole('link', { name: 'Termin' })).toBeVisible();
  await page.getByRole('link', { name: 'Termin' }).click();
  expect(page.url()).toBe('http://localhost:5173/termin');
  await page.waitForTimeout(1000);
  await expect(
    page.getByRole('heading', { name: 'Unsere Angebote' })
  ).toBeVisible();
  await expect(
    page.getByRole('link', {
      name:
        'haarImage Trocken schneiden' &&
        'haarImage Kinderhaarschnitt' &&
        'haarImage Bartschnitt &' &&
        'haarImage Deluxe Paket /' &&
        'haarImage Basis Paket / Basic' &&
        'haarImage Augenbrauen zupfen(' &&
        'haarImage Bartpflege Classic' &&
        'haarImage Premium Paket /' &&
        'haarImage Nassrasur Model /',
    })
  ).toBeVisible();

  await page.getByRole('link', { name: 'haarImage Trocken schneiden' }).click();
  await page.waitForTimeout(1000);
  expect(page.url()).toBe('http://localhost:5173/service1');
  await expect(page.locator('.vc-header > button:nth-child(2)')).toBeVisible();
  await page.locator('.vc-header > button:nth-child(2)').click();
  await page.waitForTimeout(1000);
  await expect(page.locator('.vc-arrow').first()).toBeVisible();
  await page.locator('.vc-arrow').first().click();
  await page.waitForTimeout(1000);
  await page.goBack();
  await page
    .getByRole('link', { name: 'haarImage Basis Paket / Basic' })
    .click();
  await page.waitForTimeout(1000);
  expect(page.url()).toBe('http://localhost:5173/service2');
  await page.goBack();
  await page.getByRole('link', { name: 'haarImage Kinderhaarschnitt' }).click();
  await page.waitForTimeout(1000);
  expect(page.url()).toBe('http://localhost:5173/service3');
  await page.goBack();
  await page
    .getByRole('link', { name: 'haarImage Augenbrauen zupfen(' })
    .click();
  await page.waitForTimeout(1000);
  expect(page.url()).toBe('http://localhost:5173/service4');
  await page.goBack();
  await page.getByRole('link', { name: 'haarImage Bartschnitt &' }).click();
  await page.waitForTimeout(1000);
  expect(page.url()).toBe('http://localhost:5173/service5');
  await page.goBack();
  await page
    .getByRole('link', { name: 'haarImage Bartpflege Classic' })
    .click();
  await page.waitForTimeout(1000);
  expect(page.url()).toBe('http://localhost:5173/service6');
  await page.goBack();
  await page.getByRole('link', { name: 'haarImage Deluxe Paket /' }).click();
  await page.waitForTimeout(1000);
  expect(page.url()).toBe('http://localhost:5173/service7');
  await page.goBack();
  await page.getByRole('link', { name: 'haarImage Premium Paket /' }).click();
  await page.waitForTimeout(1000);
  expect(page.url()).toBe('http://localhost:5173/service8');
  await page.goBack();
  await page.getByRole('link', { name: 'haarImage Nassrasur Model /' }).click();
  await page.waitForTimeout(1000);
  expect(page.url()).toBe('http://localhost:5173/service9');
  await page.goBack();
});
