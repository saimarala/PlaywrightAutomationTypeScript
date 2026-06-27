import {test,expect  } from "@playwright/test"



test('check for broken links', async ({ page ,request}) => {
  // Navigate to the page you want to test
  await page.goto('https://testautomationpractice.blogspot.com/');

const anchors = await page.locator('a').all();

for (const anchor of anchors) {
  const href = await anchor.getAttribute('href');
  if (href && href.length > 0) {
     const response = await request.get(href);
    const status = response.status();

    // Log broken links
    if (status >= 400) {
      console.error(`Broken link: ${href} (status ${status})`);
    } else {
      console.log(`Valid link: ${href} (status ${status})`);
    }
  

    // Optional: add assertion to fail test if broken link is found
    await expect.soft(status, `Broken link: ${href}`).toBeLessThan(400);
  }
}



});
