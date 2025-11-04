import { test, expect, Locator } from "@playwright/test"

test("Verify chrome CPU load in dynamic table", async ({ page }) => {

    await page.goto("https://practice.expandtesting.com/dynamic-table")

    // //tbody[@id='rows']/tr/td[text()='Chrome']/following-sibling::td[contains(text(),'%')]

    const table: Locator = page.locator("table.table tbody");

    await expect(table).toBeVisible();
    // step 1 : for chrome process get value from cpu load
    const rows: Locator[] = await table.locator("tr").all();

    console.log("number of rows in a table :", rows.length);

    expect(rows).toHaveLength(4);
    let cpuLoad = '';

    for (const row of rows) {

        const processName = await row.locator("td").nth(0).innerText();

        if (processName === "Chrome") {
            // cpuLoad= await row.locator('td:has-text("%")').innerText();//css
            cpuLoad = await row.locator("td", { hasText: '%' }).innerText();//playwright
            console.log("CPU Load of chrome:", cpuLoad);
            break;

        }
    }

    //step 2

    let yellowBoxText: string = await page.locator("#chrome-cpu").innerText();

    console.log("yellow box text : ", yellowBoxText);

    if (yellowBoxText.includes(cpuLoad)) {
        console.log("CPU load of chrome is equal");
    } else {
        console.log("CPU load of chrome is not equal");
    }

    expect(yellowBoxText).toContain(cpuLoad)

    await page.waitForTimeout(2000);
})
