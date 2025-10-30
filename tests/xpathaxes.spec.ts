import {test,expect,Locator} from "@playwright/test"


test("xpath axes demo",async({page})=>{


    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //1.self select <td> that containd "Germany"

    const self:Locator= page.locator("//td[.='Germany']//self::td");
     await expect(self).toHaveText("Germany");
    
   //2.parent axes - get parent <tr> of "Germany" cell

   const parent:Locator= page.locator("//td[.='Germany']//parent::tr");
    // await expect(parent).toContainText("Maria Anders");
     await expect(parent).toContainText("Maria");

  //3.child axes - get all <td> childern of the second <tr> in the table

     const child:Locator= page.locator("//table[@id='customers']//tr[2]/child::td");
     await expect(child).toHaveCount(3);

     //4. ancestor - Get ancestor <table> of the "Germany" cell

        const ancestor:Locator= page.locator("//td[.='Germany']/ancestor::table");
         await expect(ancestor).toHaveAttribute('id','customers');
    

          //5. descandant - Get all <td> elements under the table

        const descandant:Locator= page.locator("//table[@id='customers']/descendant::td");
         await expect(descandant).toHaveCount(18);

          //6. following - Get the  <td> that comes after "Germany" in the document order

        const following:Locator= page.locator("//td[.='Germany']/following::td[1]");
         await expect(following).toHaveText("Centro comercial Moctezuma");

         
          //7. following-sibling - Get the  <td> that comes after "Germany" in the document order

        // const followingSibling:Locator= page.locator("//td[.='Germany']/following-sibling::td");
        //  await expect(followingSibling).toHaveCount(0);
       const followingSibling:Locator= page.locator("//td[.='Maria Anders']/following-sibling::td");
         await expect(followingSibling).toHaveCount(1);

           //8. preceding - Get the  <td> just before  "Germany"

        const preceding:Locator= page.locator("//td[.='Germany']/preceding::td[1]");
         await expect(preceding).toHaveText("Maria Anders");

              //9. preceding-sibling - Get the  <td>s left of  "Germany"

        const precedingSibling :Locator= page.locator("//td[.='Germany']/preceding-sibling::td[1]");
         await expect(precedingSibling).toHaveCount(2);

         await expect(precedingSibling.nth(0)).toHaveText("Alfreds Futterkiste");
         await expect(precedingSibling.nth(1)).toHaveText("Maria Anders");

})
