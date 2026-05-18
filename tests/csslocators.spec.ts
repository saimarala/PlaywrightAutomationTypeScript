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
/*
<div class="container">
  <h1>Title</h1>
  <p>Paragraph 1</p> <!-- Position 2 globally -->
  <p>Paragraph 2</p> <!-- Position 3 globally -->
</div>

Scenario 1: Target "Paragraph 1"
p:nth-child(2)  Passes. (It looks at the 2nd global child. Since that element is a <p>, it matches).
p:nth-of-type(1)  Passes. (It ignores the <h1>, looks only at the <p> tags, and grabs the 1st one).

Scenario 2: Target "Paragraph 2"
p:nth-child(3)  Passes. (It looks at the 3rd global child).
p:nth-of-type(2)  Passes. (It grabs the 2nd <p> tag).

Scenario 3: The Broken Selector Error
What if you try to use p:nth-child(1) on this structure?
p:nth-child(1) ❌ Fails. (It looks at the 1st global child, which is an <h1>. Since it is not a <p>, the selection fails completely).
p:nth-of-type(1)  Passes. (It skips the <h1> and successfully targets the first paragraph).

Which one should you use in Playwright?
Use :nth-of-type() inside tables (td, tr) or lists (li): If your table includes mixed elements (like hidden spacer rows or decorative dividers), :nth-of-type() ensures you only count the functional elements.
Alternative (Playwright Native): Instead of complex CSS counters, you can use Playwright’s native .nth() method, which uses clean, zero-based indexing (0 is the first element):


table tbody tr:first-child
table tbody tr:last-child

table tbody tr:first-of-type
table tbody tr:last-of-type

table tbody tr:nth-child(1)
table tbody tr:nth-last-child(1)

table tbody tr:nth-of-type(2)
table tbody tr:nth-last-of-type(5) input

table tbody tr:has-text('Smartphone')



*/



})

