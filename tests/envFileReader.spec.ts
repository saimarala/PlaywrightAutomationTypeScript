import { test, expect } from '@playwright/test';


import { loadEnv } from '../env/env';
const env = loadEnv();

test('check for broken links', async ({ page }) => {
  // Navigate to the page you want to test

  console.log(`browser naeme is : ${process.env.BROWSER}`);
  console.log(`username is : ${env.username}`);
    console.log(`password is : ${env.password}`);
  


  
  await page.goto('/dynamic-table');

  // Collect all hrefs from anchor tags
  
  
   page.on('request',request=>console.log(`Request URL: ${request.url()}`));
   page.on('response',response=>console.log(`Response URL: ${response.url()}, Status: ${response.status()}`));

  page.on('console',msg=>console.log(`Console message: ${msg.text()}`));  

  await page.waitForTimeout(2000); // Wait for 5 seconds to allow all requests to complete
  page.on('requestfailed', request => {
    console.log(`Request failed: ${request.url()}`);
  });

  page.on('response', response => {
    if (!response.ok()) {
      console.log(`Broken link: ${response.url()} - Status: ${response.status()}`);
    }
  });


});
