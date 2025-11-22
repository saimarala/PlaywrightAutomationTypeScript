import { Page,Locator } from "@playwright/test";

class loginPage{
    //define variables - private and read only
    private readonly page:Page;
    private readonly loginLink:Locator;
    private readonly userNameInput:Locator;
    private readonly passwordInput:Locator;
    private readonly loginButton:Locator;

    //constructor

    constructor(page:Page){
    this.page=page;
    this.loginLink=this.page.locator("#login2");
    this.userNameInput=this.page.locator("#loginusername");
    this.passwordInput=this.page.locator("#loginpassword");
    this.loginButton=this.page.locator("button[onclick='logIn()]'")
    }
    //actions methods
 
  async login(username: string, password: string) { 
    await this.userNameInput.fill(username); 
    await this.passwordInput.fill(password); 
    await this.loginButton.click(); 
  } 
}