import {test,expect} from "@playwright/test"
//syntax

// test("title",()=>{

// })

//fixture - global variable : page, browser

test("verify page url",async({page})=>{
 await   page.goto("http://www.automationpractice.pl/index.php");
   let url:string= await page.url();
   console.log("url:",url);
  await  expect(page).toHaveURL(/automationpractice/);

})
