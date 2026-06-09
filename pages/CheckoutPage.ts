import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  private readonly page: Page;

  // Step 1: Info Form Locators
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly errorMessage: Locator;

  // Step 2: Overview Locators
  private readonly subtotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;
  private readonly finishButton: Locator;

  // Complete Locators
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;

  constructor(page: Page) {
    this.page = page;

    // Info Form
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Overview
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');

    // Complete
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
  }

  // Step 1 Actions
  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) || '';
  }

  // Step 2 Actions
  async getSubtotal(): Promise<number> {
    const text = await this.subtotalLabel.textContent();
    return text ? parseFloat(text.replace('Item total: $', '')) : 0;
  }

  async getTax(): Promise<number> {
    const text = await this.taxLabel.textContent();
    return text ? parseFloat(text.replace('Tax: $', '')) : 0;
  }

  async getTotal(): Promise<number> {
    const text = await this.totalLabel.textContent();
    return text ? parseFloat(text.replace('Total: $', '')) : 0;
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  // Complete Actions
  async getCompleteHeader(): Promise<string> {
    return (await this.completeHeader.textContent()) || '';
  }

  async getCompleteText(): Promise<string> {
    return (await this.completeText.textContent()) || '';
  }
}
