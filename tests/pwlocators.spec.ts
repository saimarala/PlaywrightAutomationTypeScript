/*
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content(non interactive elements).
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).*/


import {test,expect,Locator} from "@playwright/test"

test("Verify the locators",async ({page})=>{

    await page.goto("https://demo.nopcommerce.com/");
    //page.getByAltText - images

    const logo:Locator=page.getByAltText("nopCommerce demo store");
   // logo.click();
    await expect(logo).toBeVisible();
//page.getByText - non interactive elements

    await expect(page.getByText("Welcome to our store")).toBeVisible();//full string
    await expect(page.getByText("Welcome to")).toBeVisible();// substring/partial text
    await expect(page.getByText(/welcome to our store/i)).toBeVisible();// regular expression

    //
    await page.getByRole("link",{name:'Register'}).click();
    await expect (page.getByRole("heading",{name:'Register'})).toBeVisible();// you can also use getByText()

    //page.getByLabel()
    await page.getByLabel("First name:").fill("test")
    await page.getByLabel("Last name:").fill("test")
    await page.getByLabel("Email:").fill("test")

    //page.getByPlaceholder() 

    await page.getByPlaceholder('Search store').fill("ddsd")

    //page.getByTitle() 
    await expect(page.getByTitle("Home page link")).toHaveText("Hone");

    //page.getByTestId()

    await expect(page.getByTestId("profile-email")).toHaveText("abc@gmail.com")
    
    await expect(page.getByTestId("profile-name")).toHaveText("test")


})