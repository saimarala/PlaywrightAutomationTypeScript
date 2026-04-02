import {test,expect  } from "@playwright/test"
import fs from 'fs';



test.only('Multiple Tabs - 3 another way ', async({browser}) => {

    const context = await browser.newContext();//create context
    const page = await context.newPage();
  
 await page.goto("https://testautomationpractice.blogspot.com/");


 await page.locator("#comboBox").scrollIntoViewIfNeeded()
await page.locator("#comboBox").click()

//await page.locator('#dropdown').locator('div').filter({hasText:'Item 4'}).first().click()
//await page.locator('#dropdown').locator('div').filter({hasText:/^Item 4$/}).click()
await page.locator('#dropdown div')
    .filter({ has: page.getByText(/^Item 4$/, { exact: true }) })
    .click();


//console.log(await page.locator('#dropdown').locator('div').allTextContents());

//console.log(await page.locator('#dropdown').locator('div').textContent());

//console.log(await page.locator('#dropdown').locator('div').allInnerTexts());

//console.log(await page.locator('#dropdown').locator('div').innerText());


console.log(await page.locator('.title').first().getAttribute("class"));




await page.waitForTimeout(2000)

  
});