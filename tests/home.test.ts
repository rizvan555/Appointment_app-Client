import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1000);

  await expect(page.getByRole('link', { name: 'BARBERSHOP' })).toBeVisible();
  await page.getByRole('link', { name: 'BARBERSHOP' }).click();
  await page.waitForTimeout(1000);

  await expect(
    page.getByRole('heading', { name: 'Wilkommen beim Barbershop' })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Mehr über uns' })).toBeVisible();
  await page.getByRole('link', { name: 'Mehr über uns' }).click();
  await page.waitForTimeout(1000);
  expect(page.url()).toBe('http://localhost:5173/about');
  await page.waitForTimeout(1000);
  await page.goBack();
  await page.waitForTimeout(1000);

  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await page.hover('"Home"');
  await page.waitForTimeout(1000);
  await expect(
    page
      .getByRole('button', { name: 'Über uns', exact: true })
      .getByRole('link')
  ).toBeVisible();
  await page.hover('"Über uns"');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('link', { name: 'Termin' })).toBeVisible();
  await page.hover('"Termin"');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('link', { name: 'Team' })).toBeVisible();
  await page.hover('"Team"');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('link', { name: 'Galerie' })).toBeVisible();
  await page.hover('"Galerie"');
  await page.waitForTimeout(1000);
  await expect(
    page.getByRole('button', { name: 'Kontakt' }).getByRole('link')
  ).toBeVisible();
  await page.hover('"Kontakt"');
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Home' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Termin' }).click();
  await page.waitForTimeout(1000);
  await page.goBack();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Team' }).click();
  await page.waitForTimeout(1000);
  await page.goBack();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Galerie' }).click();
  await page.waitForTimeout(1000);
  await page.goBack();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Kontakt' }).click();
  await page.waitForTimeout(2000);
  await page.goBack();
  await page.waitForTimeout(2000);

  await expect(
    page.getByRole('heading', { name: 'Wir machen Ihren Stil zu' })
  ).toHaveText('Wir machen Ihren Stil zu Ihren Träumen');
  await expect(
    page.getByRole('heading', { name: 'Wir machen Ihren Stil zu' })
  ).toContainText('Wir');

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(1000);
  await expect(
    page.getByText(
      'KontaktKunden-HilfeEntdeckeBarmeramania GuideUser BlogBarberamania'
    )
  ).toBeVisible();
  await expect(page.getByText('KontaktKunden-Hilfe')).toBeVisible();
  await expect(page.getByText('EntdeckeBarmeramania')).toBeVisible();
  await expect(page.getByText('Geschäftspartner Partner')).toBeVisible();
  await expect(page.getByText('UnternehmenÜber')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Kunden-Hilfe' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'bn46' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'bn45' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Barmeramania Guide' })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'User Blog' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Barberamania Geschenkgutschein' })
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Newsletter Anmeldung' })
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Partner werden' })
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Connect Help Center' })
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Pro Help Center' })
  ).toBeVisible();
  await expect(
    page.locator('li').filter({ hasText: 'Über uns' }).getByRole('link')
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Jobs' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Impressum' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Cookie-Einstellungen' })
  ).toBeVisible();
});
