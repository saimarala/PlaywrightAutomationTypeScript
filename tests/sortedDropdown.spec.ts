import {test,expect,Locator} from "@playwright/test"

test("verfiy dropdown is sorted",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    //const dropdowns:Locator=page.locator("#animals>option");
    const dropdowns:Locator=page.locator("#colors>option");

    const optionsText:string[]=(await dropdowns.allInnerTexts()).map(i=>i.trim());

    const origionalList=[...optionsText];
    const sortedList:string[]=[...optionsText].sort();

    console.log("origional list:",origionalList)
    console.log("sorted list:",sortedList)

    expect(origionalList).toEqual(sortedList)

    await page.waitForTimeout(3000);

})