import {test,expect,Locator} from "@playwright/test"


test("Multiselect dropdown",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");



    
    //1.select option from the dropdown(4 ways)
     await page.locator("#colors").selectOption(["Red","Blue","Green"]);//visible text
     await page.locator("#colors").selectOption(["Red","Blue","White"]);// value text
      await page.locator("#colors").selectOption([{label:'Red'},{label:'Blue'},{label:'White'}])//using label
      await page.locator("#colors").selectOption([{index:0},{index:5},{index:6}])
     //2. check the number of options in the dropdown(count)

     const dropdownOptions:Locator= page.locator("#colors>option");
    
    await expect(dropdownOptions).toHaveCount(7);
     //3. check an option present in the dropdown
     const optionText:string[]= (await dropdownOptions.allTextContents()).map(i=>i.trim());
     expect(optionText).toContain("Green")
     //4. print options from the dropdown
     for(const option of optionText){
        console.log(option)
     }

     await page.waitForTimeout(3000)


})