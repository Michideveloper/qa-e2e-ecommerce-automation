import { test, expect } from '../fixtures/baseFixtures';

test.describe('Casos Límite y Errores Simulados (Edge Cases) - Sauce Demo', () => {

  test('TC-11: Validación de Imágenes Rotas en Catálogo (problem_user)', async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login('problem_user', 'secret_sauce');
    
    const imageSources = await inventoryPage.getProductImageSources();
    expect(imageSources.length).toBeGreaterThan(0);
    
    // problem_user triggers all item images to load standard 404 dog image
    for (const src of imageSources) {
      expect(src).toContain('sl-404');
    }
  });

  test('TC-12: Checkout - Validación de Error al Intentar Finalizar Compra (error_user)', async ({ loginPage, inventoryPage, cartPage, checkoutPage, page }) => {
    await loginPage.navigate();
    await loginPage.login('error_user', 'secret_sauce');
    
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.clickCart();
    await cartPage.clickCheckout();
    
    // Fill valid info
    await checkoutPage.fillInformation('Jane', 'Doe', '99999');
    await checkoutPage.clickContinue();
    
    // It should successfully reach checkout-step-two
    await expect(page).toHaveURL('/checkout-step-two.html');

    // Click Finish
    await checkoutPage.clickFinish();

    // Due to error_user logic, clicking finish fails to complete and stays on step two
    await expect(page).toHaveURL('/checkout-step-two.html');
  });
});
