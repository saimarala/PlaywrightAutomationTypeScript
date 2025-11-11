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
      
    }else{
        console.log("frame3 is not available");     
    }

    await page.waitForTimeout(3000);
}
);