// register.spec.ts
import { test, expect } from '@playwright/test';
import { RegisterPage } from './RegisterPage';

test('Verify registration form elements state', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await page.goto('/register');

  // ✅ CLEAN & SAFE: Compiles flawlessly due to exact type matching
  await registerPage.getInputField('Email Address').fill('test@example.com');
  await registerPage.getInputField('Password').fill('SecurePass123!');
  
  // ✅ CLEAN & SAFE: Locates the exact styled button variant
  await expect(registerPage.getActionButton('primary')).toBeVisible();
  await registerPage.getActionButton('primary').click();

  // ❌ COMPILE-TIME FAILS: 'Username' is not a valid FormFieldLabel
  // await registerPage.getInputField('Username').fill('testuser');

  // ❌ COMPILE-TIME FAILS: 'success' is not a valid ButtonVariant
  // await registerPage.getActionButton('success').click();
});
