/*

CSS(Cascading Style Sheets)

html+js +css
two types of css locators:
1.absolute locators
2.relative locators

tag with id                   tag#id               or            #id(tag os optional)
tag with class                tag.class            or             .class
tag with any other attribute  tag[attribute=value] or            [attribute=value] 
tage with class and attribute  tag.class[attribute=value]  or    .class[attribute=value] 
page.locator(css/xpath)

*/

import {test,expect,Locator} from "@playwright/test"

test("css demo",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")

    //tag#id

    // const searchBox:Locator=page.locator("input#small-searchterms");

    // await searchBox.fill("T-shirt")
  await expect(page.locator("input#small-searchterms")).toBeVisible();
  //await  page.locator("input#small-searchterms").fill("T-shirt");
  await  page.locator("#small-searchterms").fill("T-shirt");
 

  //tag.class  
  await expect(page.locator("input.search-box-text")).toBeVisible();
  //await  page.locator("input.search-box-text").fill("T-shirt");
  await  page.locator(".search-box-text").fill("T-shirt");

  //tag[attribute=value]  
  
 // await  page.locator("input[name=q]").fill("T-shirt");
  await  page.locator("[name='q']").fill("T-shirt");//single quote optional

  //tag.class[attribute=value] 
 //await  page.locator("input.search-box-text[value='Search store']").fill("T-shirt");
 await  page.locator(".search-box-text[value='Search store']").fill("T-shirt");

 //^ - starts with
 //$ - ends with
 //* - contains

 //p[id*='para1'][class='main']
 // p[id*='para1']:not([class='mainn'])
 //p:not([id*='para11'])[class='main']
// p[id='para1']+p
 await  page.waitForTimeout(2000)


})

