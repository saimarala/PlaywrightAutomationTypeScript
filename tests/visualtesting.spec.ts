import { test, expect } from '@playwright/test';

test('test1',async ({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");
    //await page.goto("https://demowebshop.tricentis.com/register");
    
    //compare snapshot of the page

    //approach 1
    //expect(await page.screenshot()).toMatchSnapshot("homepage.png");

    //appraoch 2
    await expect(page).toHaveScreenshot();

    //compare snapshot of the element

    const logo=page.locator("img[alt='Tricentis Demo Web Shop']");
    expect(await logo.screenshot()).toMatchSnapshot("logo.png");
    await expect(logo).toHaveScreenshot("logo.png");
    await expect(page).toHaveScreenshot('image.png');
    // Locate a container that holds both the labels and the inputs
await expect(page.getByText('Name: Email: Phone:')).toMatchAriaSnapshot(`
  - text: "Name:"
  - textbox "Enter Name"
  - text: "Email:"
  - textbox "Enter EMail"
  - text: "Phone:"
  - textbox "Enter Phone"
`);
console.log(await page.getByText('Name: Email: Phone:').ariaSnapshot());

})