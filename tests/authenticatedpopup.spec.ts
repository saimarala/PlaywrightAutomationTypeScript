import { test, expect, Page } from "@playwright/test";

test("authenticated popup", async ({ browser }) => {
    const context = await browser.newContext({httpCredentials:{username:"admin",password:"admin"}});
    const page = await context.newPage();

    //https://the-internet.herokuapp.com/basic_auth
    //https://username:password@the-internet.herokuapp.com/basic_auth
    //Approach 1 : directly pass login along with url
    // await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");

    // await page.waitForLoadState();//wait for page loaded completely
    // await expect(page.locator("text=Congratulations")).toBeVisible();


    //Approach 2:
      await page.goto("https://the-internet.herokuapp.com/basic_auth");

    await page.waitForLoadState();//wait for page loaded completely
    await expect(page.locator("text=Congratulations")).toBeVisible();

    await page.waitForTimeout(3000);
})