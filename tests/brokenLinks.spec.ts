import { test, expect } from '@playwright/test';

test('check for broken links', async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Collect all hrefs from anchor tags
  const links = await page.$$eval('a', anchors =>
    anchors.map(a => a.href).filter(href => href.length > 0)
  );

  console.log(`Found ${links.length} links`);

  // Loop through each link and check status
  for (const link of links) {
    const response = await page.request.get(link);
    const status = response.status();

    // Log broken links
    if (status >= 400) {
      console.error(`Broken link: ${link} (status ${status})`);
    } else {
      console.log(`Valid link: ${link} (status ${status})`);
    }

    // Optional: add assertion to fail test if broken link is found
    expect.soft(status, `Broken link: ${link}`).toBeLessThan(400);
  }
});
