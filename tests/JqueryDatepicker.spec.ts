import { test, expect, Locator, Page } from "@playwright/test";


async function selectDate(targetYear: string, targetMonth: string, targetDate: string, page: Page, isFuture: boolean) {

    while (true) {
        let cuurentMonth = await page.locator(".ui-datepicker-title .ui-datepicker-month").textContent();
        let cuurentYear = await page.locator(".ui-datepicker-title .ui-datepicker-year").textContent();
        if (cuurentMonth === targetMonth && cuurentYear === targetYear) {
            break;
        }
        
        //  await page.locator(".ui-datepicker-next").click();

       
        if (isFuture) {
            await page.locator(".ui-datepicker-next").click();//Future date 
        } else {
            await page.locator(".ui-datepicker-prev").click(); //past date
        }
    }


    const allDates = await page.locator(".ui-datepicker-calendar td a").all();

    for (const dt of allDates) {
        const dateText = await dt.innerText();
        if (dateText === targetDate) {
            dt.click();
            break;
        }

    }
}

test("Jquery datapicker", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    const dateInput: Locator = page.locator("#datepicker");
    await expect(dateInput).toBeVisible();

    //using fill() method
    // await dateInput.fill("06/20/2025")
    await dateInput.click();//opens the date picker
   // select target date
    const year = "2029";
    const month = "January";
    const date = "10";
   selectDate(year,month,date,page,true)

   const expectedDate='01/10/2029'
   await expect(dateInput).toHaveValue(expectedDate);
 
    await page.waitForTimeout(5000);

})