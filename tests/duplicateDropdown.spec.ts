import {test,expect,Locator} from "@playwright/test";
import { log } from "console";
import { LOADIPHLPAPI } from "dns";

test("duplicate dropdown",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const dropdowns:Locator=page.locator("#animals>option");
   // const dropdowns:Locator=page.locator("#colors>option");// having duplicates

      const optionsText:string[]= (await dropdowns.allTextContents()).map(i=>i.trim());

      const myset=new Set<string>;//set - dupliclates are not allowed
      const duplicates:string[]=[];//array - allow the duplicates allowed
      for (const text of optionsText){
        if(myset.has(text)){
            duplicates.push(text)

        }else{
              myset.add(text)
        }
      }

      console.log(duplicates)
      console.log(myset)

      if (duplicates.length>0) {
        console.log("Duplicates found",duplicates);
        
      }else{
        console.log("no duplicate options found..")
      }

      expect(duplicates.length).toBe(0);

})