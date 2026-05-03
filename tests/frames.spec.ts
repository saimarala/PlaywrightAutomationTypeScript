/*
An iframe(short for "inline frame") is an HTML element that allows you to embeded another HTML document within the current document
Iframes  are commonly used to embeded external content such as videos, maps, or other web pages 
*/

import {test, expect,Locator} from "@playwright/test";
import { log } from "console";
test("frames demo",async({page})=>{

    await page.goto("https://ui.vision/demo/webtest/frames/");

    //total number of frames present on web page.
    const frames=page.frames();
    console.log("Number of frames : ",frames.length);

    //Approach 1: using page.frame()...
    const frame=page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"});
    if (frame) {
      // await frame.locator("[name='mytext1']").fill("Hello"); 
       await frame.fill("[name='mytext1']","Hello")  ; 
    }else{
        console.log("Frame is not available");      
    }
    //Appraoch 2: Using frameLocator()...
 await page.waitForTimeout(1000);
     await   page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']").fill("John")


    await page.waitForTimeout(2000);
});

test.only("Inner/child frames demo",async({page})=>{

    await page.goto("https://ui.vision/demo/webtest/frames/");
    const frame3=page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3.html"});

    
    if (frame3) {
      await  frame3.locator("[name='mytext3']").fill("frame3")  
      const childFrames=frame3.childFrames();
      console.log("Child frames inside frame3",childFrames.length);
      const radio=await childFrames[0].getByLabel("I am a human");
      await radio.check();
      await expect(radio).toBeChecked();
      await page.mainFrame().locator("[name='mytext1']").fill("Hello from main frame");
      
    }else{
        console.log("frame3 is not available");     
    }
    await page.waitForTimeout(3000);


    await expect(
  page.frameLocator('#frame1').frameLocator('#frame2').locator('#nestedBtn')
).toBeVisible();
  const frames = page.frames();
for (const f of frames) {
  console.log('Frame URL:', f.url());
}
}
);


test("Interact with frames", async ({ page }) => {

    await page.goto("https://letcode.in/frame");
    const allframes = page.frames();
    console.log("No.of frames: " + allframes.length);
    for (const f of allframes) {
  console.log('Frame URL:', f.url());
  
}

    const frame = page.frameLocator("#firstFr")
    await frame.locator("input[name='fname']").fill("Koushik");
    await frame.locator("input[name='lname']").fill("Chatterjee");

    const innerFrame = frame.frameLocator("app-frame-content iframe")
    await innerFrame.locator("input[name='email']").fill("koushik@gmail.com")

    await frame.locator("input[name='fname']").fill("letcode");

    //await page.locator('iframe[name="firstFr"]').contentFrame().locator('app-frame-content iframe').contentFrame().getByRole('textbox', { name: 'Enter email' }).fill("koushik@gmail.com");
    //contentFrame()   Converts that standard element Locator into a FrameLocator.
    //Converts an existing standard element locator pointing to an iframe into a FrameLocator to look inside the iframe.

    //frame.owner()
    // /Converts an existing standard element locator pointing to an iframe into a FrameLocator to look inside the iframe.
   expect(frame.owner()).toHaveAttribute('id', 'firstFr');
//*************** */
// both are same 
     await page.mainFrame().getByRole('link', { name: 'Work-Space' }).click();// root page
     await page.getByRole('link', { name: 'Work-Space' }).click();//
     //************** */




    // const myFrame = page.frame("firstFr")
    // // if (myFrame != null) {
    // //     await myFrame.fill("", "")
    // // }
    // await myFrame?.fill("input[name='fname']", "koushik")
    // await myFrame?.fill("input[name='lname']", "chatterjee")

    // expect(await myFrame?.locator("p.has-text-info").textContent()).toContain("You have entered")


    await page.waitForTimeout(3000);





})