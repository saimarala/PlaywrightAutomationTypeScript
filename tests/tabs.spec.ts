import { test, expect, chromium } from "@playwright/test"
import { log } from "node:console";
import { promises } from "node:dns";

test("handle tabs", async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext();

    const parentPage = await context.newPage();
    // const page2=await context.newPage();
    parentPage.goto("https://testautomationpractice.blogspot.com/");

    //2 statments should gp parallel
    // context.waitForEvent("page");//pending fulfilled rejected
    // parentPage.locator("button:has-text('New Tab')").click();//opens new tab/ new page
    const [childPage] = await Promise.all([context.waitForEvent("page"), parentPage.locator("button:has-text('New Tab')").click()]);//run parallel
    await parentPage.waitForTimeout(3000);

    //Approach 1: switch between pages and get titles
    const pages = context.pages();
    console.log("Number of pages created :", pages.length);

    console.log("title of parent page", await pages[0].title());
    console.log("title of child page", await pages[1].title());

    
    //Approach 2: alternate
    console.log("title of parent page", await parentPage.title());
    console.log("title of child page", await childPage.title());
})