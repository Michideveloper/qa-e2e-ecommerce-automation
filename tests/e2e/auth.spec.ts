import { test, expect } from '../fixtures/baseFixtures';

test.describe('Autenticación (Login) - Sauce Demo', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('TC-01: Login Exitoso con Usuario Estándar', async ({ loginPage, page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('/inventory.html');
  });

  test('TC-02: Login Invalido - Contraseña Incorrecta', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'invalid_pass');
    
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);
    
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test('TC-03: Login Fallido - Usuario Bloqueado', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);
    
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

  test('TC-04: Login Fallido - Campos Vacíos', async ({ loginPage }) => {
    await loginPage.login('', '');
    
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);
    
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Username is required');
  });
});
