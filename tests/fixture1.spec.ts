import { test as base, expect, type Locator, request, type Page } from "@playwright/test";
// Import the local JSON data dynamically
const jsonPath="testdata/data.json";
const loginData:any=JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

type MyFixture = {
  fixture: string;
  loginData: Record<string, string>;
  testData: { name: string; age: number; city: string };
  login: void;
  loginfunctionality: Page;
};

export const test = base.extend<MyFixture>({
    fixture: async ({}, use) => {
        await use("This is my fixture value");
    },

    loginData: async ({}, use) => {
        await use({ admin: "test@te.com", password: "qqe" });
    },

    // UPDATE: Now pulls dynamic values from the imported JSON file
    testData: async ({}, use) => {
        await use(loginData.password);
    },

    login: async ({ page }, use) => {
        await page.goto("https://blogspot.com");
        await use();
    },

    // UPDATE: Added automatic teardown code after the use() statement
    loginfunctionality: async ({ page, loginData }, use) => {
        // --- SETUP PHASE ---
        await page.goto('https://example.com'); 
        await page.locator('.username').fill(loginData.admin);
        await page.locator('.password').fill(loginData.password);
        await page.locator('button[type="submit"]').click();
        
        // Hand control to the test
        await use(page);

        // --- TEARDOWN PHASE ---
        // Playwright automatically pauses here and waits until your test finishes.
        // Once the test passes or fails, the code below executes automatically.
        console.log("Test finished! Running automatic cleanup / logout...");
        await page.locator('button#user-profile-menu').click();
        await page.locator('text=Log Out').click();
        await expect(page).toHaveURL('https://example.com');
    }
});

export { expect, Locator, request };
