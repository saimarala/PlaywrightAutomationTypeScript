import { test, expect } from '@playwright/test';

test.only('Count Total Books in the page', async ({ page }) => {
  await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500');

  test.slow(); // Set timeout for a single test Easy way to triple the default timeout i.e. 30 secs(30000  ms)
  //test.setTimeout(80000); // 8 secs //Set timeout for a single test

  let booksCount = 0;
  let previousHeight = 0;

  while (true) {
    
     // Get all book titles currently loaded on the page
    const books = await page.locator('#productsDiv h3').all();

    // Check if the target book is in the list
    //booksCount=booksCount+books.length; //Each time the loop runs, it's counting all the books on the page, including those already counted in previous iterations.
    booksCount=books.length; // This will exactly count total number of books.
    console.log(`Books count in current view: ${booksCount}`);
    
    // Scroll to the bottom
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait for new content to load
    await page.waitForTimeout(2000);
  
    // Get current scroll height
    const currentHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    });

    console.log("==============================")
    console.log(`Previous height: ${previousHeight}`);
    console.log(`Current height: ${currentHeight}`);

    // Check if end of page is reached
    if (currentHeight === previousHeight) {
      break;
    }

    previousHeight = currentHeight;
  }
  
  console.log('*********  Reached end of page  ********');

  console.log("Total Number of books:",booksCount); //410

});



test('infinite scroll table', async ({ page }) => {
 await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500');

 let previousHeight = 0;
 let currentRowCount = 0;
 let scrollAttempts = 0;
 const maxScrolls = 10;
  let booksCount = 0;

 while (true) {
 // Get current row count
 const books = await page.locator('#productsDiv h3').all();
const   booksCount=books.length; 
console.log(`Books count in current view: ${booksCount}`);

 // If no new rows loaded, we've reached the end
//  if (currentRowCount === previousRowCount) {
//  break;
//  }

 // Scroll to last row
 const lastRow = page.locator('#productsDiv h3').last();
 await lastRow.scrollIntoViewIfNeeded();

 // Wait for new content
 await page.waitForTimeout(1000); // Or better: wait for network idle
     const currentHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    });


    if (currentHeight === previousHeight) {
      break;
    }
      previousHeight = currentHeight;
 }

  console.log("Total Number of books:",booksCount);
});