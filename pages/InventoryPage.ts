import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  private readonly productSortSelect: Locator;
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;
  private readonly inventoryItemNames: Locator;
  private readonly inventoryItemPrices: Locator;
  private readonly inventoryItemImages: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productSortSelect = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemPrices = page.locator('[data-test="inventory-item-price"]');
    this.inventoryItemImages = page.locator('.inventory_item_img img');
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return text ? parseInt(text, 10) : 0;
    }
    return 0;
  }

  async clickCart(): Promise<void> {
    await this.cartLink.click();
  }

  async selectSortOption(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.productSortSelect.selectOption(option);
  }

  async addProductToCart(productName: string): Promise<void> {
    const dataTestName = productName.toLowerCase().replace(/\s+/g, '-');
    const addButton = this.page.locator(`[data-test="add-to-cart-${dataTestName}"]`);
    await addButton.click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const dataTestName = productName.toLowerCase().replace(/\s+/g, '-');
    const removeButton = this.page.locator(`[data-test="remove-${dataTestName}"]`);
    await removeButton.click();
  }

  async getProductNames(): Promise<string[]> {
    return await this.inventoryItemNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceStrings = await this.inventoryItemPrices.allTextContents();
    return priceStrings.map(price => parseFloat(price.replace('$', '')));
  }

  async getProductImageSources(): Promise<string[]> {
    const images = await this.inventoryItemImages.all();
    const sources: string[] = [];
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (src) sources.push(src);
    }
    return sources;
  }
}
