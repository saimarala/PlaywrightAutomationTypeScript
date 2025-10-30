import {test,expect,Locator} from "@playwright/test";

test("Handling dynamic xpath",async({page})=>{
//loop to click the button 5 times
await page.goto("https://testautomationpractice.blogspot.com/");
let i:number =0;
while (i<5) {
  await page.locator("//button[contains(text(),'ST')]").click();
await page.waitForTimeout(2000);  
i++;
}
})



test("Handling dynamic css xpath",async({page})=>{
//loop to click the button 5 times
await page.goto("https://testautomationpractice.blogspot.com/");
let i:number =0;
while (i<5) {
  await page.locator("button[name='start'],button[name='stop']").click();
await page.waitForTimeout(2000);  
i++;
}
})

test("Handling dynamic PW xpath",async({page})=>{
//loop to click the button 5 times
await page.goto("https://testautomationpractice.blogspot.com/");
let i:number =0;
while (i<5) {
  await page.getByRole('button',{name:/START|STOP/}).click();
await page.waitForTimeout(2000);  
i++;
}
})