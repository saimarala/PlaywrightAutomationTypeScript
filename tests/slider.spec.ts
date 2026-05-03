import {test,expect, chromium  } from "@playwright/test"



test("Interact with frames", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
const lastSlider = page.locator('.ui-slider-handle.ui-corner-all.ui-state-default').last();

// 2. Await the scrolling action
await lastSlider.scrollIntoViewIfNeeded();

// 3. Await the focus action
await lastSlider.focus();
   for(let i=0;i<10;i++){
    await page.keyboard.press("ArrowRight")
   }
    await page.waitForTimeout(3000);



  // 2. Fetch the bounding box and handle the null case
  const bb = await lastSlider.boundingBox();
  if (!bb) {
    throw new Error("Slider handle element not visible on page");
  }

  // 3. Execute the drag gesture
  await page.mouse.move(bb.x + bb.width/2, bb.y + bb.height / 2);
  await page.mouse.down();
  
  // Use 'steps' to break the drag into a smooth motion (essential for sliders)
  await page.mouse.move(bb.x + 40,bb.y + bb.height / 2);
  await page.mouse.up();
    await page.waitForTimeout(3000);

})
