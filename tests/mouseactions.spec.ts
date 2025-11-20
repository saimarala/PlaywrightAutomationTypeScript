import {test,expect,Locator} from "@playwright/test";

test("Mouse hover",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/")

    const pointme=await page.locator(".dropbtn");
    await pointme.hover();

    const laptops=await page.locator(".dropdown-content a:nth-child(2)");
    await laptops.hover();

    await page.waitForTimeout(2000)

})


test("Right click",async({page})=>{

    await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html")
    const button=await page.locator("span.context-menu-one");

    await button.click({button:"right"})//this will perform the right click action
    await page.waitForTimeout(2000)

})



test("Double click",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/")
    const copybtn=await page.locator("button[ondblclick='myFunction1()']");

    await copybtn.dblclick()// performs the dbl click action

    const filed2=page.locator("#field2");
    expect(filed2).toHaveValue("Hello World!")
    await page.waitForTimeout(2000)

})

test.only("Drag and drop",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/")  
    const drag=await page.locator("#draggable");
    const drop=await page.locator("#droppable");

   //Appraoch 1: mouse hover and drag manually

    // await drag.hover();
    // await page.mouse.down();

    // await drop.hover();
    // await page.mouse.up();

    //Appraoch 2:
   await page.locator("#draggable").dragTo(page.locator("#droppable"));
    await page.waitForTimeout(2000)

})