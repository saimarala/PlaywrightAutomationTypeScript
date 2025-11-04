import { test, expect, Locator } from "@playwright/test"

test('Read data from all the table pages', async ({ page }) => {
    let hasmorepages = true;

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html")

    while (hasmorepages) {
        const rows = await page.locator("#example tbody tr").all();
        for (let row of rows) {
            console.log(await row.innerText());

        }


        //              button[aria-label='Next']
        //          button[aria-controls='example']:has-text("›")

        const nextButton: Locator = page.locator("button[aria-label='Next']");

        const isDisabled = await nextButton.getAttribute("class")//dt-paging-button disabled next
        if (isDisabled?.includes("disabled")) {
            hasmorepages = false;
        } else {
            await nextButton.click();
        }
    }
});

test("Filter the rows and check the count", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const dropDown: Locator = page.locator("#dt-length-0");
    await dropDown.selectOption({ label: '25' });

    const rows = await page.locator("#example tbody tr").all();

    expect(rows.length).toBe(25);

    const rows2 = await page.locator("#example tbody tr");

    expect(rows2).toHaveCount(25);
})


test.only("Search for specific data in the table", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const searchBox = page.locator("#dt-search-0");
    await searchBox.fill("Zenaida Frank")

    const rows = await page.locator("#example tbody tr").all();
    if (rows.length >= 1) {
        let matchFound = false;
        for (let row of rows) {
            const text = await row.innerText();
            if ((text).includes("Zenaida Frank")) {
                console.log("Recoed exist - found");
                matchFound = true
                break;
            }
        }
        expect(matchFound).toBe(true)
        expect(matchFound).toBeTruthy();
    } else {
        console.log("No rows found with search text");

    }


})
