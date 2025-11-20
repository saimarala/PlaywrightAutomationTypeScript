import { test, expect, Locator } from "@playwright/test";


test("infinite scrolling", async ({ page }) => {
    test.slow();//Set timeout for a single test easy way to triple the default timeout i.e. 30 secs(3000 ms)
    await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");
    //window.scrollTo(0,document.body.scrollHeight)

    let previousHeight = 0;

    while (true) {
       //scroll down page
        await page.evaluate(()=>{
            window.scrollTo(0,document.body.scrollHeight);
        })
        //Wait for new content to load
        await page.waitForTimeout(2000);

        //capture the current height of the page
        const currentHeight = await page.evaluate(() => {
            return document.body.scrollHeight;
        })

        console.log("Prevous height : ", previousHeight);
        console.log("Current height : ", currentHeight);

        if (currentHeight == previousHeight) {
            break;
        }
        previousHeight = currentHeight;
    }

    await page.waitForTimeout(2000);
    console.log("Reached end of the page......");

    // await page.waitForTimeout(3000);
})