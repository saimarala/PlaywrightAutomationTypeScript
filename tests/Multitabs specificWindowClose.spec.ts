import {test  } from "@playwright/test"



test('ddd', async({page}) => {
   await page.goto("https://testautomationpractice.blogspot.com/")

    const [newPage]=await Promise.all([
        page.waitForEvent('popup'),
     page.getByRole('button', { name: 'Popup Windows' }).click()

    ])

   console.log(await page.context().pages().length);
   const pages=await page.context().pages()

    

console.log(await pages[0].title());

console.log(await pages[1].title());



 //  await page.waitForTimeout(3000)

});


test.only('Multiple Tabs - 3', async({browser}) => {

    const context = await browser.newContext();//create context
 const page = await context.newPage();
await page.goto("https://testautomationpractice.blogspot.com/");

// 1. Wait for the new pages specifically
const [newPage1, newPage2] = await Promise.all([
    context.waitForEvent('page'), // Capture 1st popup
    context.waitForEvent('page'), // Capture 2nd popup
    page.getByRole('button', { name: 'Popup Windows' }).click(),
]);

// 2. Wait for the new pages to actually finish loading their content
await Promise.all([
    newPage1.waitForLoadState('load'),
    newPage2.waitForLoadState('load')
]);

// 3. Get all pages (Parent + 2 Popups)
const allPages = context.pages();
console.log("Total pages found:", allPages.length);

// 4. Fetch all titles
const titles = await Promise.all(
    allPages.map(p => p.title())
);

console.log("All Titles:", titles);

console.log(allPages.length);


for (const p of allPages) {
    const title = await p.title();
    
    // Check if the title matches your target (e.g., "Google")
    if (!title.includes(" Playwright")) {
        await p.close();
        console.log(`Closed window with title: ${title}`);
    }
}

});


test('Multiple Tabs - 3 another way ', async({browser}) => {

    const context = await browser.newContext();//create context
    const parentPage = await context.newPage();
    await parentPage.goto("https://testautomationpractice.blogspot.com/");

    // const [childPage] = await Promise.all([context.waitForEvent("page"), parentPage.locator("button:has-text('New Tab')").click()]);//run parallel
    // await parentPage.waitForTimeout(3000);

    const prom=context.waitForEvent("page")
     parentPage.locator("button:has-text('New Tab')").click()    
     const childPage=await prom;


     //Approach 1: switch between pages and get titles
    const pages = context.pages();
    console.log("Number of pages created :", pages.length);

    console.log("title of parent page", await pages[0].title());
    console.log("title of child page", await pages[1].title());
   

    
    //Approach 2: alternate 
    console.log("title of parent page", await parentPage.title());
    console.log("title of child page", await childPage.title());
 

});