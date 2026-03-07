import {test}from "@playwright/test"


test("dummy test", async ({ page }) => {
    await page.goto("https://www.google.com");
    await page.reload();
    await page.goBack();
    await page.goForward();
    await page.url();
    (await page.title()).includes("Google");
    await page.frameLocator("iframe").locator("text=Click me").click();
    await page.frames();
    await page.frame("frame1").locator("text=Click me").click();
    await page.mainFrame().locator("text=Click me").click();

    await page.waitForTimeout(3000);
})