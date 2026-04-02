/*
open app   -- beforeAll()

login  -- beforeEach()
    find products
logout  -- afterEach()

login
    add product to cart
logout

close app  -- afterAll()

*/

import { test, expect, Page} from '@playwright/test';
import path from 'node:path';

let page: Page;

test.beforeAll('Open app', async({browser})=>{
    page=await browser.newPage();
    await page.screencast.start({ path: path.join('videos', 'video.webm'), quality: 80, size: { width: 1280, height: 720 }});
    await page.screencast.showActions();
      await page.screencast.showOverlays();

   
       

    await page.goto("https://www.demoblaze.com/index.html")

})

test.afterAll('Closing App', async () => {
    await page.screencast.stop();
    await page.close();
});


test.beforeEach('Login', async()=>{
    
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginusername').screenshot({ path: path.join('screenshots', 'username.png') });
    await page.screenshot({ path: path.join('screenshots', 'logipage.png') });
    await page.screenshot({ path: path.join('screenshots', 'logipagefull.png'), fullPage: true, type: 'jpeg',
  quality: 80,
 });
    await page.locator('#loginpassword').fill('test@123');
    await page.locator("button[onclick='logIn()']").click();
    await page.waitForTimeout(2000);
})

test.afterEach('Login', async()=>{
    
    await page.locator('#logout2').click();
})


test.describe('mygroup',async()=>{

    test('Find NoOf products', async () => {
        const products = page.locator('#tbodyid .hrefch');
        const count = await products.count();
        console.log('Number of products:', count);
        await expect(products).toHaveCount(9);
    });

    test('Add Product to cart', async () => {
        await page.locator("text='Samsung galaxy s6'").click();

        // Handle alert before the click
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain('Product added');
            await dialog.accept();
        });

        await page.locator('.btn.btn-success.btn-lg').click();
        page.frames ().find(frame => frame.url().includes('cart.html'))?.locator("text='Samsung galaxy s6'").click();
    });

})


