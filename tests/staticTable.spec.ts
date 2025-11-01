import {test,expect,Locator} from "@playwright/test";
import { log } from "node:console";

test('Static table', async({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

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