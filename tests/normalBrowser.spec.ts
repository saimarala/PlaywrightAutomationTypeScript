import {test,expect, chromium  } from "@playwright/test"

test('Handle browser ', async () => {
  const browser = await chromium.launchPersistentContext('', {channel:'chrome'});

   const  parentPage = await browser.pages()[0];
  await parentPage.goto("https://testautomationpractice.blogspot.com/");

  
  await parentPage.getByRole('button', { name: 'Popup Windows' }).click();

  

  await parentPage.waitForTimeout(2000);
});