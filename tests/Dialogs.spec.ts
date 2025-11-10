//alert(), confirm(), prompt() dialogs/JSalerts

/*
1.By default, dialogs are auto-dismissed by playwright, so you don't have to handle them.
2.However, you can registor a dailog handler before that action that triggers the dialog to either
dialog().accpect() or dialog.dismiss() it.
*/

import {test,expect,Locator} from "@playwright/test";
import { log } from "console";

test("Simple Dialog",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Registor a dialog handler
   // page.on("dialog",dialog=>dialog.accept());
      page.on("dialog",dialog=>{
        console.log("Dialog type is : ",dialog.type());//returns type of the dialog
        expect(dialog.type()).toContain("alert")
        console.log("Dialog text:",dialog.message());//returns message from dialog
        expect(dialog.message()).toContain("I am an alert box!")       
        dialog.accept()
    });
    await page.locator("#alertBtn").click();//opens dialog
    await page.waitForTimeout(3000)

})


test("Confirmation Dialog",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Registor a dialog handler
   // page.on("dialog",dialog=>dialog.accept());
      page.on("dialog",dialog=>{
        console.log("Dialog type is : ",dialog.type());//returns type of the dialog
        expect(dialog.type()).toContain("confirm")
        console.log("Dialog text:",dialog.message());//returns message from dialog
        expect(dialog.message()).toContain("Press a button!")       
      //  dialog.accept()//close the dialog by accpecting
      dialog.dismiss()//close the dialog by dismissing
    });
    await page.locator("#confirmBtn").click();//opens dialog

    let text:string=await page.locator("#demo").innerText();
    console.log(text);
    expect(await page.locator("#demo")).toHaveText("")
    
    await page.waitForTimeout(3000)

})


test.only("Prompt Dialog",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Registor a dialog handler
   // page.on("dialog",dialog=>dialog.accept());
      page.on("dialog",dialog=>{
        console.log("Dialog type is : ",dialog.type());//returns type of the dialog
        expect(dialog.type()).toContain("prompt")
        console.log("Dialog text:",dialog.message());//returns message from dialog
        expect(dialog.message()).toContain("Please enter your name:")   
        expect(dialog.defaultValue()).toContain("Harry Potter")
        dialog.accept("John")//close the dialog by accpecting
    //  dialog.dismiss()//close the dialog by dismissing
    });
    await page.locator("#promptBtn").click();//opens dialog

    let text:string=await page.locator("#demo").innerText();
    console.log(text);
    expect(await page.locator("#demo")).toHaveText("Hello John! How are you today?")
    
    await page.waitForTimeout(3000)

})