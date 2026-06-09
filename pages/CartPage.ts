import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async getCartItemNames(): Promise<string[]> {
    const nameLocators = this.page.locator('[data-test="inventory-item-name"]');
    return await nameLocators.allTextContents();
  }

  async removeItem(productName: string): Promise<void> {
    const dataTestName = productName.toLowerCase().replace(/\s+/g, '-');
    const removeButton = this.page.locator(`[data-test="remove-${dataTestName}"]`);
    await removeButton.click();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async getItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }
}
