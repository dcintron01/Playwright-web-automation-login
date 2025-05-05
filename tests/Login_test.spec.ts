
import { test, expect } from '@playwright/test';

test('Test de login exitoso', async ({ page }) => {
  // Navegar a la página de login
  await test.step('Navegar a la página de login', async () => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    
    // Verificar que estamos en la página correcta
    await expect(page).toHaveTitle(/Test Login \| Practice Test Automation/);
  });

  // Ingresar credenciales
  await test.step('Ingresar credenciales', async () => {
    // Ingresar nombre de usuario: student
    await page.locator('#username').fill('student');
    
    // Ingresar contraseña: Password123
    await page.locator('#password').fill('Password123');
  });

  // Hacer clic en el botón de login
  await test.step('Hacer clic en el botón de login', async () => {
    await page.locator('#submit').click();
  });

  // Verificar login exitoso
  await test.step('Verificar login exitoso', async () => {
    // Verificar que la URL cambió a la página de éxito
    await expect(page).toHaveURL(/logged-in-successfully/);
    
    // Verificar que se muestra el mensaje de éxito
    const successMessage = page.locator('h1.post-title');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText('Logged In Successfully');
    
    // Verificar que se muestra el texto de confirmación
    const confirmText = page.locator('.post-content p.has-text-align-center');
    await expect(confirmText).toContainText('Congratulations');
  });
});

test('Test de login con credenciales incorrectas - usuario inválido', async ({ page }) => {
  // Navegar a la página de login
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  
  // Ingresar credenciales incorrectas - usuario inválido
  await page.locator('#username').fill('incorrect_user');
  await page.locator('#password').fill('Password123');
  
  // Hacer clic en el botón de login
  await page.locator('#submit').click();
  
  // Verificar que se muestra el mensaje de error
  const errorMessage = page.locator('#error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Your username is invalid!');
});

test('Test de login con credenciales incorrectas - contraseña inválida', async ({ page }) => {
  // Navegar a la página de login
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  
  // Ingresar credenciales incorrectas - contraseña inválida
  await page.locator('#username').fill('student');
  await page.locator('#password').fill('incorrect_password');
  
  // Hacer clic en el botón de login
  await page.locator('#submit').click();
  
  // Verificar que se muestra el mensaje de error
  const errorMessage = page.locator('#error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Your password is invalid!');
});