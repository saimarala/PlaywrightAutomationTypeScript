import {test,expect,Locator} from "@playwright/test";

test("xpath test demo",async({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");
//1.absolute path

    //2.Relative xpath
    const relativelog:Locator=page.locator("//img[@alt='Tricentis Demo Web Shop']")
    await expect(relativelog).toBeVisible();
//3.contains
    const products:Locator=page.locator("//h2/a[contains(@href,'computer')]");
  const productCount:number=await products.count();
  expect(productCount).toBeGreaterThan(0);

 // console.log(await page.locator("//h2/a[contains(@href,'computer')]").textContent());//Error: strict mode violation:
 console.log("First:",await products.first().textContent());
 console.log("Last:",await products.last().textContent());
 console.log("nth:",await products.nth(3).textContent());//Index start from 0

   let productTitles:string[]=await products.allTextContents();//getting all the matched elements in to an array

   console.log("All computer related products :",productTitles)

   for(let pt of productTitles){
    console.log(pt)
   }

     for(let pt in productTitles){
    console.log(pt,productTitles[pt])
   }
// Or using forEach
productTitles.forEach((value, index) => {
  console.log(`Index: ${index}, Value: ${value}`);
});

for (const [index, value] of productTitles.entries()) {
  console.log(`Index: ${index}, Value: ${value}`);
}

//4. starts-with
const buildingProducts:Locator=page.locator("//h2/a[starts-with(@href,'/build')]");

//5. text() .
const textItem:Locator=page.locator("//a[text()='Register']");// //a[.='Register']

//6. last() .
const lastitem:Locator=page.locator("//div[@class='column follow-us']//li[last()]");

//7.position()
const positem:Locator=page.locator("//div[@class='column follow-us']//li[position()=1]");


})
