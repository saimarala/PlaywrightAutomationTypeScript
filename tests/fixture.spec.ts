import {test as base } from "@playwright/test";

type myFixture={
  fixture:any
  loginData:any
  testData:any
  login:any
}
export const test = base.extend<myFixture>({
    fixture: async ({ }, use) => {
        console.log("Before executing test");
        await use("This is my fixture value");
        console.log("After executing test");
    },
    loginData: async ({ }, use) => {
     console.log("Before executing test login data");
        await use({admin:"admin",password:"admin123"})
         console.log("After executing test for login data");
    },
    testData:{

        name:"John",
        age:30,
        city:"New York"
    },
    login:async({page},use)=>{
        console.log("Before executing test login");
       await page.goto("https://testautomationpractice.blogspot.com/");
         await use();
         //  await use( await page.goto("https://testautomationpractice.blogspot.com/"));
         console.log("After executing test for login");

    }

    });
export {expect,Locator, request} from "@playwright/test";