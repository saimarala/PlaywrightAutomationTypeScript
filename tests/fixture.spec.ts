import { test as base, expect, type Locator, request, type Page } from "@playwright/test";

// Define strict types for your fixtures instead of using 'any'
type MyFixture = {
  fixture: string;
  loginData: Record<string, string>;
  testData: { name: string; age: number; city: string };
  login: void;
  loginfunctionality: Page;
};

export const test = base.extend<MyFixture>({
    // Correctly typed fixture returning a string
    fixture: async ({}, use) => {
        console.log("Before executing test");
        await use("This is my fixture value");
        console.log("After executing test");
    },

    // Correctly typed fixture returning an object
    loginData: async ({}, use) => {
        console.log("Before executing test login data");
        await use({ admin: "admin", password: "admin123" });
        console.log("After executing test for login data");
    },

    // FIX: Wrapped in an async function so Playwright can register it as a fixture
    testData: async ({}, use) => {
        await use({
            name: "John",
            age: 30,
            city: "New York"
        });
    },

    // Correctly typed page-dependent fixture
    login: async ({ page }, use) => {
        console.log("Before executing test login");
        await page.goto("https://testautomationpractice.blogspot.com/");
        await use();
        console.log("After executing test for login");
    },

    // Correctly typed login flow returning the page instance
    loginfunctionality: async ({ page }, use) => {
        await page.goto('https://example.com/login'); 
        await page.locator('.username').fill('test@te.com');
        await page.locator('.password').fill('qqe');
        await page.locator('button[type="submit"]').click();
        
        // Pass the modified page back to the test
        await use(page);
    }
});

// Re-export Playwright utilities
export { expect, Locator, request };
