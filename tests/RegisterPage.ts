// RegisterPage.ts
import { type Page, type Locator } from '@playwright/test';
import { type ButtonVariant, type FormFieldLabel, type CheckboxLabel } from './types';

export class RegisterPage {
  private readonly page: Page;
  private readonly formSelector: string = 'form#registration-form';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Dynamically gets any form input field securely using its label
   */
  getInputField(label: FormFieldLabel): Locator {
    return this.page.locator(this.formSelector).getByLabel(label, { exact: true });
  }

  /**
   * Dynamically gets any checkbox on the page using its visible text name
   */
  getCheckbox(label: CheckboxLabel): Locator {
    return this.page.locator(this.formSelector).getByRole('checkbox', { name: label, exact: true });
  }

  /**
   * Dynamically gets a button based on its CSS class styling variant
   */
  getActionButton(variant: ButtonVariant): Locator {
    return this.page.locator(this.formSelector).locator(`button.${variant}-action`);
  }
}
