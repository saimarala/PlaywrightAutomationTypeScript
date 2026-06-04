import { test, expect } from './fixture1.spec'; // Import the extended test with fixtures

test('Should use dynamic JSON data and auto-logout afterward', async ({ loginfunctionality: page, testData }) => {
    // This uses "Sarah Jenkins" automatically loaded from data.json
    await page.locator('#profile-name').fill(testData.name);
    await page.locator('#profile-age').fill(testData.age.toString());
    await page.locator('#profile-city').fill(testData.city);
    await page.locator('button#save-profile').click();
    
    await expect(page.locator('.success-alert')).toBeVisible();
    // Once this line executes, Playwright returns to the fixture to perform the logout steps.
});
