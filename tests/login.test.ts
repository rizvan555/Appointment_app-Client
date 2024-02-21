import { expect, test } from '@playwright/test';
import axios from 'axios';

test('test_login', async ({ page }) => {
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
});
