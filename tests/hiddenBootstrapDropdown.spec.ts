import {test,expect,Locator} from "@playwright/test"

test("hidden bootsrap",async({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.locator("button[type='submit']").click();

    await page.getByText("PIM").click();

    await page.locator("form i").nth(2).click();
    await page.waitForTimeout(3000);
    const options:Locator= page.locator("div[role='listbox']  span");
    
    const count:number=await options.count();
//print all options
  console.log("all the text content",await options.allTextContents());

  for (let i = 0; i < count; i++) {
  // console.log(await options.nth(i).innerText());
    console.log(await options.nth(i).textContent());
    
  }
  
    for (let i = 0; i < count; i++) {
  const text= await options.nth(i).innerText();
  if (text==="Automation tester") {
    await options.nth(i).click();
    break;
  }
    
    
  }

    await page.waitForTimeout(3000);

})