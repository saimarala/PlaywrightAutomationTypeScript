import {test,expect  } from "@playwright/test"



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


test.only('Multiple Tabs - 3', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://testautomationpractice.blogspot.com/");

  // 1. Trigger the popup and capture all new pages
  const [popup1, popup2] = await Promise.all([
    context.waitForEvent('page'),
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'Popup Windows' }).click(),
  ]);

  // 2. Ensure both popups are fully loaded
  await Promise.all([
    popup1.waitForLoadState('domcontentloaded'),
    popup2.waitForLoadState('domcontentloaded'),
  ]);

  // 3. Collect all pages (parent + popups)
  const allPages = context.pages();
  console.log("Total pages found:", allPages.length);

  // 4. Fetch titles in one go
  const titles = await Promise.all(allPages.map(p => p.title()));
  console.log("All Titles:", titles);

  // 5. Close unwanted pages
  for (const p of allPages) {
    const title = await p.title();
    if (!title.includes("Playwright")) {
      await p.close();
      console.log(`Closed window with title: ${title}`);
    }
  }

  // Optional: Assert that only the desired page remains
  expect(context.pages().length).toBe(1);
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


test('Handle dynamic multiple tabs', async ({ browser }) => {
  const context = await browser.newContext();
  const parentPage = await context.newPage();
  await parentPage.goto("https://testautomationpractice.blogspot.com/");

  // 1. Listen for new pages dynamically
  const newPages: any[] = [];
  
//   context.on('page', async page => {
//     await page.waitForLoadState('domcontentloaded');
//     newPages.push(page);
//     console.log(`New page opened: ${await page.title()}`);
//   });

parentPage.on('popup', async popup => {
    await popup.waitForLoadState('domcontentloaded');
    newPages.push(popup);
    console.log(`Popup opened: ${await popup.title()}`);
  });
  // 2. Trigger action that opens multiple tabs
  await parentPage.getByRole('button', { name: 'Popup Windows' }).click();

  // 3. Wait a bit to ensure all popups are captured
  await parentPage.waitForTimeout(3000);
  // 4. Collect all pages (parent + children)
  const allPages = context.pages();
  console.log("Total pages found:", allPages.length);

  // 5. Fetch titles
  const titles = await Promise.all(allPages.map(p => p.title()));
  console.log("All Titles:", titles);

  // 6. Close unwanted pages dynamically
  for (const p of allPages) {
    const title = await p.title();
    if (!title.includes("Playwright")) {
      await p.close();
      console.log(`Closed window with title: ${title}`);
    }
  }
});

test('Handle dynamic multiple tabs another eai', async ({ browser }) => {
  const context = await browser.newContext();
  const parentPage = await context.newPage();
  await parentPage.goto("https://testautomationpractice.blogspot.com/");

  // 1. Listen for new pages dynamically
  const newPages: any[] = [];
  
//   context.on('page', async page => {
//     await page.waitForLoadState('domcontentloaded');
//     newPages.push(page);
//     console.log(`New page opened: ${await page.title()}`);
//   });

parentPage.on('popup', async popup => {
    await popup.waitForLoadState('domcontentloaded');
    newPages.push(popup);
    console.log(`Popup opened: ${await popup.title()}`);
  });
  // 2. Trigger action that opens multiple tabs
  await parentPage.getByRole('button', { name: 'Popup Windows' }).click();

  // 3. Wait a bit to ensure all popups are captured
  await parentPage.waitForTimeout(3000);
  // 4. Collect all pages (parent + children)
  const allPages = context.pages();
  console.log("Total pages found:", allPages.length);

  // 5. Fetch titles
  const titles = await Promise.all(allPages.map(p => p.title()));
  console.log("All Titles:", titles);
let newpage;
  // 6. Close unwanted pages dynamically
  for (const p of allPages) {
    const title = await p.title();
    if (!title.includes("Playwright")) {
      // await p.close();
      // console.log(`Closed window with title: ${title}`);
    }else{
      newpage = p;
    }
  }

  // 7. Verify only the desired page remains
  // const remainingPages = context.pages();
  // expect(remainingPages.length).toBe(1);
  // const remainingTitle = await remainingPages[0].title();
  // expect(remainingTitle).toContain("Playwright");

  await newpage?.getByRole('link', { name: 'Get started' }).click({force:true});

  expect(await newpage?.url()).toContain("https://playwright.dev/docs/intro");
await parentPage.bringToFront();
  await parentPage.getByRole('textbox', { name: 'Enter Name' }).fill("Test User");
  await newpage?.bringToFront();
  

  await parentPage.waitForTimeout(2000);
});
