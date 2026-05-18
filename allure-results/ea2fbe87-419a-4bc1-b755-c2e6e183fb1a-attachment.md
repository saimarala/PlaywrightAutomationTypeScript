# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flakytest.spec.ts >> flaky test
- Location: tests\flakytest.spec.ts:3:6

# Error details

```
Error: page.waitForTimeout: Test ended.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.only('flaky test', async ({ page,request }) => {
  4  | 
  5  |     await page.goto('https://www.demoblaze.com/index.html');
  6  |     await page.getByRole('link', { name: 'Log in' }).click();
  7  |     await page.locator('#loginusername').fill('pavanol');
  8  |     await page.locator('#loginpassword').fill('test@123');
  9  |     await page.getByRole('button', { name: 'Log in' }).click();
> 10 |     await page.waitForTimeout(10000);
     |                ^ Error: page.waitForTimeout: Test ended.
  11 |     await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  12 |     await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
  13 |     page.waitForLoadState('networkidle');
  14 |     
  15 | 
  16 | });
```