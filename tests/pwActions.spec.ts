import {test,expect,Locator} from "@playwright/test"

//Text input, Text box, 
test("Text input actions",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const textBox:Locator= page.locator("#name");
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();
    const maxLength:string|null= await textBox.getAttribute("maxlength");// return value of maxlenght   attribute of the element
    expect(maxLength).toBe("15");

    await textBox.fill("pw");

    console.log("text content of first name :",await textBox.textContent());// returns empty value
    console.log("input value od the first name :",await textBox.inputValue());//return the value of textbox
    
     const enteredValue: string =await textBox.inputValue();

     expect(enteredValue).toBe("pw");

     await page.waitForTimeout(2000);
    
})

//radio  buttons
test("Radio buttons actions",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const maleRadio:Locator= page.locator("#male");
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();

     expect(await maleRadio.isChecked()).toBe(false);

     if (await maleRadio.isChecked()) {
       console.log("checked");
    } else {
      console.log("not checked");
    await maleRadio.check();
     }
      await expect(maleRadio).toBeChecked();

   

     await page.waitForTimeout(3000);
    
})


//checkbox  buttons
test.only("Checkbox actions",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const wedCheckbox:Locator= page.getByLabel("wednesday");
    await expect(wedCheckbox).toBeVisible();
    await expect(wedCheckbox).toBeEnabled();  

    // if(await !wedCheckbox.isChecked()){
    //   await wedCheckbox.check();
    // }
    
   await wedCheckbox.check();
    await expect(wedCheckbox).toBeChecked();
    //2.select all the checkbox and assert is checked
    const days:string[]=['sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  const checkboxes:Locator[]= days.map(i=>page.getByLabel(i));
  expect(checkboxes.length).toBe(7);

   //3.Select all the checkbox and assert each is checked
  for(const checkbox of checkboxes){
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }
   
  //4.last three checkbox and assert
    for(const checkbox of checkboxes.slice(-3)){
      await checkbox.uncheck();
     await expect(checkbox).not.toBeChecked();
    }


     await page.waitForTimeout(3000);
    
})