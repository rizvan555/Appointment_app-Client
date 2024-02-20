import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Anmelden' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Username').click();
  await expect(page.getByPlaceholder('Username')).toHaveCount(1);
  await page.getByPlaceholder('Username').fill('rizvan');
  await page.getByPlaceholder('Password').click();
  await expect(page.getByPlaceholder('Password')).toHaveCount(1);
  await page.getByPlaceholder('Password').fill('111111');
  await page.getByPlaceholder('Password').press('Enter');
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Team' }).click();
  await page.getByRole('link', { name: 'Termin' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  
  await expect(
    page.getByRole('heading', { name: 'Wir machen Ihren Stil zu' })
  ).toHaveText('Wir machen Ihren Stil zu Ihren Träumen');
  await expect(
    page.getByRole('heading', { name: 'Wir machen Ihren Stil zu' })
  ).toContainText('Wir');
});
