//import {test,expect,Locator, request} from "@playwright/test";
import { log } from "node:console";
import {test,expect,Locator, request} from "../tests/fixture.spec.ts";

test('Static table', async({page,fixture,loginData,testData,login}) => {
  console.log("this is first line");
  
    //await page.goto("https://testautomationpractice.blogspot.com/");/
    login
    console.log("this is post got to url");
   
console.log(fixture);

console.log(loginData.admin);
console.log(testData.name);



    page.on('request',request=>console.log(`Request URL: ${request.url()}`));
   page.on('response',response=>console.log(`Response URL: ${response.url()}, Status: ${response.status()}`));

   page.on('console',msg=>console.log(`Console message: ${msg.text()}`)); 
   

    
    

    const table:Locator= page.locator("table[name='BookTable'] tbody");

    await expect(table).toBeVisible()
   //1.count number of rows in a table
   // const rows:Locator= page.locator("table[name='BookTable'] tbody tr");//returms all the rows including header
     const rows:Locator= table.locator("tr");

    await expect(rows).toHaveCount(7);

    const rowCount:number=await rows.count();
   

    console.log("Number of rows in a table",rowCount);

    expect(rowCount).toBe(7);
   //2. count number of headers/columns

   const columns:Locator= rows.locator("th");

   await expect(columns).toHaveCount(4);

    const colCount:number=await columns.count();
   

    console.log("Number of columns in a table",colCount);

    expect(colCount).toBe(4);

   //3.Read all the data from 2nd row (index 2 means 3rd row including header)


  const secondRowCells:Locator= rows.nth(2).locator("td");
  const secondRowText:string[]= await secondRowCells.allInnerTexts()
  console.log("2nd row data",secondRowText);//[ 'Learn Java', 'Mukesh', 'Java', '500' ]
  //await expect(secondRowText).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ]);

  console.log("***********");
  console.log(await rows.nth(2).locator("td").nth(0).innerText());//Learn Java
  
    console.log((await rows.nth(2).locator("td").allInnerTexts())[0]);//Learn Java
    console.log((await rows.nth(2).locator("td").allInnerTexts())[1]);
  
   console.log("***********");

  console.log("print second row data");

  for(let text of secondRowText){
    console.log(text);
    
  }
  //4. read all data from the table (exculding header)
   console.log("printing all the table data....");
   const allRowsData:Locator[]=await rows.all();
    
    const mukeshBooks:string[]=[];
   for(let row of allRowsData.slice(1)){// slice(1) ->skip the header now 
    //console.log(await row.innerText());
      const cols =await row.locator("td").allInnerTexts();
      console.log(cols.join("\t"));
       console.log("print book names  where author is mukesh"); 
   //print book names  where author is mukesh
   for(let row of allRowsData.slice(1)){
    const cells=await row.locator("td").allInnerTexts();
    const author=cells[1];
    const book=cells[0];
  
    

    if(author==="Mukesh"){
        console.log(`${author} \t ${book}`);
        mukeshBooks.push(book);
        
    } 
    

   }

   //expect(mukeshBooks).toHaveLength(2)

   console.log("sai",await page.locator("//table[@name='BookTable']//td[.='Mukesh']/preceding-sibling::td").allInnerTexts());

    //6. calculate the total price of all books
    let totalPrice=0;
 // let totalPrice:number=0;

   for(let row of allRowsData.slice(1)){
     const cells=await row.locator("td").allInnerTexts();
     const price =cells[3];
     totalPrice+=parseInt(price);

   }
   console.log("total price",totalPrice);
   expect(totalPrice).toBe(7100)
   

   }
   
  





     await page.waitForTimeout(3000);
    
});


// This renames 'loginfunctionality' to 'page' just for this specific test
test('Clean look using aliasing', async ({ loginfunctionality: page }) => {
    await expect(page).toHaveURL('https://example.com');
    await page.locator('#search-input').fill('Playwright Automation');
    await page.click('button.submit-search');
});


test.describe('Testing Custom Playwright Fixtures', () => {

  // Test 1: Using primitive and object data fixtures
  test('Should read data from string and object fixtures', async ({ fixture, testData }) => {
    // Accessing 'fixture' (string)
    console.log(fixture); // Outputs: "This is my fixture value"
    expect(fixture).toBe('This is my fixture value');

    // Accessing 'testData' (object)
    console.log(`User ${testData.name} is from ${testData.city}`);
    expect(testData.age).toBe(30);
  });

  // Test 2: Using the navigation fixture (login)
  test('Should use pre-navigated page fixture', async ({ login, page }) => {
    // 'login' fixture already navigated to the blogspot URL.
    // We use the default 'page' object to interact with it.
    await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/');
    
    // You can now interact with the page normally
    await page.locator('#name').fill('Automation User');
  });

  // Test 3: Using the fully authenticated page fixture (loginfunctionality)
  test('Should use fully authenticated page instance', async ({ loginfunctionality }) => {
    // 'loginfunctionality' contains the page object *after* completing login steps.
    // Notice we use 'loginfunctionality' instead of 'page' here.
    
    await expect(loginfunctionality).toHaveURL('https://example.com'); 
    await expect(loginfunctionality.locator('.welcome-message')).toBeVisible();
  });

});






test('Should use dynamic JSON data and auto-logout afterward', async ({ loginfunctionality: page, testData }) => {
    // This uses "Sarah Jenkins" automatically loaded from data.json
    await page.locator('#profile-name').fill(testData.name);
    await page.locator('#profile-age').fill(testData.age.toString());
    await page.locator('#profile-city').fill(testData.city);
    await page.locator('button#save-profile').click();
    
    await expect(page.locator('.success-alert')).toBeVisible();
    // Once this line executes, Playwright returns to the fixture to perform the logout steps.
});

