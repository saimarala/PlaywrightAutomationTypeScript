// RegisterPage.ts
import { type Page, type Locator } from '@playwright/test';
import { type ButtonVariant, type FormFieldLabel } from './types';

export class RegisterPage {
  private readonly page: Page;
  
  // Clean, descriptive properties for static elements
  public readonly termsCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Explicitly typed role locator
    this.termsCheckbox = page.getByRole('checkbox', { name: 'I accept terms' });
  }

  /**
   * Cleanly handles dynamic form inputs using strict union validation
   */
  getInputField(label: FormFieldLabel): Locator {
    // Only the specified FormFieldLabel strings will compile here
    return this.page.getByLabel(label, { exact: true });
  }

  /**
   * Uses chaining to find a specific button variant safely within a form container
   */
  getActionButton(variant: ButtonVariant): Locator {
    const formContainer = this.page.locator('form#registration-form');
    
    // Clean locator chaining ensures strict DOM targeting
    return formContainer.locator(`button.${variant}-action`);
  }
}
