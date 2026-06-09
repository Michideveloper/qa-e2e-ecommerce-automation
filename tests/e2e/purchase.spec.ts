import { test, expect } from '../fixtures/baseFixtures';

test.describe('Catálogo y Compra (Checkout) - Sauce Demo', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('TC-05: Agregar Productos al Carrito', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(2);
  });

  test('TC-06: Ordenar Productos por Precio (Bajo a Alto)', async ({ inventoryPage }) => {
    await inventoryPage.selectSortOption('lohi');
    const prices = await inventoryPage.getProductPrices();
    
    // Check if prices array is sorted low to high
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
    
    // Verify first and last prices
    expect(prices[0]).toBe(7.99);
    expect(prices[prices.length - 1]).toBe(49.99);
  });

  test('TC-07: Remover Producto desde el Catálogo', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);

    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(0);
  });

  test('TC-08: Remover Producto desde la Página del Carrito', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.clickCart();

    expect(await cartPage.getItemsCount()).toBe(1);
    await cartPage.removeItem('Sauce Labs Backpack');
    expect(await cartPage.getItemsCount()).toBe(0);
  });

  test('TC-09: Compra Exitosa (Flujo Completo)', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    // 1. Add products and go to cart
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.clickCart();

    // 2. Click checkout
    await cartPage.clickCheckout();
    await expect(page).toHaveURL('/checkout-step-one.html');

    // 3. Fill personal info
    await checkoutPage.fillInformation('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL('/checkout-step-two.html');

    // 4. Validate calculations
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();
    
    // Backpack ($29.99) + Bike Light ($9.99) = $39.98
    expect(subtotal).toBe(39.98);
    // Total should match subtotal + tax
    expect(total).toBe(subtotal + tax);

    // 5. Complete purchase
    await checkoutPage.clickFinish();
    await expect(page).toHaveURL('/checkout-complete.html');

    // 6. Verify success message
    const header = await checkoutPage.getCompleteHeader();
    expect(header).toContain('Thank you for your order!');
  });

  test('TC-10: Checkout - Formulario Incompleto (ZIP Faltante)', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.clickCart();
    await cartPage.clickCheckout();

    await checkoutPage.fillInformation('John', 'Doe', '');
    await checkoutPage.clickContinue();

    // Verify stays on same page and shows error
    await expect(page).toHaveURL('/checkout-step-one.html');
    const errorText = await checkoutPage.getErrorMessage();
    expect(errorText).toContain('Error: Postal Code is required');
  });
});
