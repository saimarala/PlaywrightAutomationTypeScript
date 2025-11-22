import { Page, Locator } from "@playwright/test";

class loginPage {
    //define variables - private and read only
    private readonly page: Page;
    private readonly loginLink: Locator;
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    //constructor

    constructor(page: Page) {
        this.page = page;
        this.loginLink = this.page.locator("#login2");
        this.userNameInput = this.page.locator("#loginusername");
        this.passwordInput = this.page.locator("#loginpassword");
        this.loginButton = this.page.locator("button[onclick='logIn()]'")
    }
    //actions methods
    async clickLoginLink() {
        await this.loginLink.click();
    }

    async enterUserName(username:string):Promise<void>{
        this.userNameInput.clear();
        this.userNameInput.fill(username);
    }

      async enterPassword(password:string){
        this.userNameInput.clear();
        this.userNameInput.fill(password);
    }


    async clickOnLoginButton(){
        this.loginButton.click();
    }

    async performLogin(username:string,password:string){
        await this.clickLoginLink();
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickOnLoginButton();
    }

}