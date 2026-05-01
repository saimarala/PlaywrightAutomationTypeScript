import {test,expect  } from "@playwright/test"



test('random popups', async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto('https://playground.bondaracademy.com/');
  await page.getByRole('link', { name: 'Modal & Overlays' }).click();
  await page.getByRole('link', { name: 'Dialog' }).click();

  await page.getByRole('button', { name: 'Enter Name' }).click();
  let flag = false;
  //await page.waitForTimeout(1000);
  page.addLocatorHandler(page.getByText('Friendly reminder', { exact: true }),async()=>{
    flag = true;
  // await page.locator('#cdk-overlay-12').getByRole('button', { name: 'OK' }).click();
   
  await page.getByRole('button', { name: 'OK' }).click();
  })

  if(flag){
    console.log("Alert is present");
  }else{
    console.log("Alert is not present");
  }
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Name' }).fill('John Doe');
    await page.getByRole('button', { name: 'Submit' }).click();

await page.waitForTimeout(2000); // Wait for 2 seconds to allow any potential navigation or actions to complete
});