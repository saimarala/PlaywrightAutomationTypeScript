import { test, expect } from "@playwright/test"


test('Playwright assertions demo', async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");

    //1.Auto-retrying assertion (automatically retries until it passes or timeout)
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");

    //Auto-retry : waits for the element to be visible and have the expected text
    await expect(page.locator("text=Welcome to our store")).toBeVisible();
    await expect(page.locator("div[class='product-grid home-page-product-grid'] strong")).toHaveText("Featured products");

    //2.Non-retrying assertion(executes immedialtly, no retry)
    const title=await page.title();
    expect(title.includes("Demo Web Shop")).toBeTruthy();// no auto-retry

    const welcomeText=await page.locator('text=Welcome to our store').textContent();
    expect(welcomeText).toContain("Welcome"); // no auto-retry

    //3.Negating matcher(applicable for both auto-retrying & non-retrying asertions)
   await expect(page.locator('text=Welcome to our store')).not.toBeVisible();
   expect(welcomeText).not.toContain("Welcome");//no auto-retry


});