import { test, expect } from "@playwright/test"

test("Handle popups", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Multiple popups
    //    page.waitForEvent("popup")
    // await page.locator("#PopUp").click();

    await Promise.all([page.waitForEvent("popup"), await page.locator("#PopUp").click()]);
    const allPopupWindows = context.pages();//Return array of pages
    console.log("Number of pages/Windows", allPopupWindows.length);

    console.log(allPopupWindows[0].url());
    console.log(allPopupWindows[1].url());
  //  console.log(allPopupWindows[2].url());
  for(const pw of allPopupWindows){
    const title=await pw.title();
   if (title.includes("selenium")){
          pw.locator(".alert").click();
          await page.waitForTimeout(3000);
          pw.close();
   }
  }




    await page.waitForTimeout(3000);
})