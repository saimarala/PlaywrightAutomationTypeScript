import { test, expect } from "@playwright/test"


test('Playwright assertions demo', async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");

    //Hard assertions
    // expect(page).toHaveTitle("Demo Web Shop");
    // expect(page).toHaveURL("https://demowebshop.tricentis.com/");
    // const logo=await page.locator("img[alt='Tricentis Demo Web Shop']");
    // expect(logo).toBeVisible();


    //soft assertions
    expect.soft(page).toHaveTitle("Demo Web Shop2");//failed
    expect.soft(page).toHaveURL("https://demowebshop.tricentis.com/");
    const logo=await page.locator("img[alt='Tricentis Demo Web Shop']");
    expect.soft(logo).toBeVisible();


    await page.waitForTimeout(5000);

});