import {test,expect,Locator} from "@playwright/test"
import { log } from "node:console";

test("comparing methods", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")

    const products:Locator= page.locator(".product-title");
    //1.innerText() vs textContent()
    //  console.log(await products.nth(1).innerText());//14.1-inch Laptop
    //  console.log(await products.nth(1).textContent());//            14.1-inch Laptop

     const count=await products.count();


     for (let i = 0;i < count ;i++) {
        // const   productName:string= await products.nth(i).innerText();//Extracts plain text. Eleminates whitspace and line breaks
        // console.log(productName);

        const   productName:string|null= await products.nth(i).textContent();//Extracts text including hidden elements. Includes extra whitespaces, line breaks etc.
        console.log(productName?.trim());
        
        
     }
     
  
    await page.waitForTimeout(3000);

    //2. allInnerText() vs allTextContnets()
    console.log("***allInnerText() vs allTextContnets()**");
    
//    const productNames:string[] =await products.allInnerTexts();
//    console.log(productNames);


   const productNames:string[] =await products.allTextContents();
//    console.log(productNames);
//    console.log(productNames.map(t=>t.trim()));

   const productNamesTrim:string[]= productNames.map(t=>t.trim());
   console.log(productNamesTrim);
   
   //3.all() converts locator--->Locator[]
   // Returns array of locators
   const productLocators:Locator[]=await products.all();
   console.log(productLocators);
   console.log(await productLocators[1].innerText());

// for of
    // for(let product of productLocators){
    //     console.log(await product.innerText());

    //     if(await product.innerText()==="Build your own computer"){
    //         product.click();
    //     }
        
    // }
    // for in
    for(const i in productLocators){
        console.log(await productLocators[i].innerText());
            if(await productLocators[i].innerText()==="Build your own computer"){
            productLocators[i].click();
        }
        
    }

     await page.waitForTimeout(3000);
   
   


})