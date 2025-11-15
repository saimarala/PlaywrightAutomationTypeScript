import { test, expect, Locator } from "@playwright/test";

test('Autowaiting and forcing', async ({ page }) => {
  //  test.setTimeout(50000); //50 secs
  test.slow();//90 secs (Deafult is 30 secs)

    await page.goto("https://demowebshop.tricentis.com/");

    //assertions - autowait works
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/",{timeout:10000});
    await expect(page.locator("text=Welcome to our store")).toBeVisible({timeout:10000});
    //actions - autowait works
    await page.locator("#small-searchterms").fill("Laptop", { force: true });//search bocx - force action
    await page.locator("input[type='submit']").click({ force: true });


});