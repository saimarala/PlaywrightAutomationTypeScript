import {test,expect,Locator} from "@playwright/test"

test('Single select dropdown',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1.select option from the dropdown(4 ways)
    // await page.locator("#country").selectOption("India");//visible text
    // await page.waitForTimeout(3000);
    // await page.locator("#country").selectOption({value:'uk'});// by using value attribute
    // await page.waitForTimeout(3000);
    // await page.locator("#country").selectOption({label:'India'});// by using label
    // await page.waitForTimeout(3000);
    // await page.locator("#country").selectOption({index:3});
  

    //2. check the number of options in the dropdown(count)
       
    const dropdownOptions:Locator= page.locator("#country>option");
    
    await expect(dropdownOptions).toHaveCount(10);


    //3. check an option present in the dropdown

    const optionsText:string[]= (await dropdownOptions.allTextContents()).map(t=>t.trim());
    console.log(optionsText)
    expect(optionsText).toContain("India")

    //4. print options from the dropdown
     for(let option of optionsText){
        console.log(option);
     }

     await page.waitForTimeout(3000);

})