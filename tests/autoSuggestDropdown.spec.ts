import {test,expect,Locator}  from "@playwright/test"

test("Auot suggest dopdown",async({page})=>{
    await page.goto("https://www.flipkart.com/")

    page.locator("input[name='q']").fill("smart");

    //get all the suggested options -->Ctrl+Shift+P on DOM --> emulate focused page
    const options= page.locator("ul>li");
     await page.waitForTimeout(2000);
    const count= await options.count();
    console.log("Number of suggested options",count);

    //prin the all the suggested options
    console.log(await options.allTextContents());

    for (let i = 0; i < count; i++) {
        console.log(await options.nth(i).innerText);
         console.log(await options.nth(i).textContent);
        
        
    }

    for(const s of await options.allTextContents()){
        console.log(s);
        

    }

const content = await options.allTextContents();
for (const index in content) {
    console.log(content[index]);
}


const contents = await options.allTextContents();
contents.forEach(element => {
    console.log(element);
});

  //select/click on the smaert phone option
  
//   for (let i = 0; i < count; i++) {
//      if (await options.nth(i).innerText()==="smartphone") {
//         options.nth(i).click();
//         break;
        
//      }
    
//   }

 
// for (const [index, option] of Array.from({ length: count }).entries()) {
//   const text = await options.nth(index).innerText();
//   if (text === "smartphone") {
//     await options.nth(index).click();
//     break;
//   }
// }



for (const i in [...Array(count)]) {
  const text = await options.nth(Number(i)).innerText();
  if (text === "smartphone") {
    await options.nth(Number(i)).click();
    break;
  }
}


    await page.waitForTimeout(3000);
    
})