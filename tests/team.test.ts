import { expect, test } from '@playwright/test';

test('test_team', async ({ page }) => {
  await page.goto('http://localhost:5173/team');
  await page.waitForTimeout(1000);
  await expect(
    page.getByRole('heading', { name: 'Unsere Team' })
  ).toBeVisible();
  await expect(page.getByText('Claudio BerrafatoSenior Barber')).toBeVisible();
  await expect(page.getByText('Harun AdemogluBarber')).toBeVisible();
  await expect(page.getByText('Patrik MüllerBarber')).toBeVisible();
});
