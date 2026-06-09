const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// Ensure docs directory exists
const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const wb = XLSX.utils.book_new();

const testCasesData = [
  // Headers
  ["ID", "Tipo", "Título", "Precondición", "Pasos", "Datos de Prueba", "Resultado Esperado"],
  // Autenticación (Login)
  [
    "TC-01", 
    "Positivo", 
    "Login Exitoso con Usuario Estándar", 
    "Navegador en la página de Login.", 
    "1. Ingresar usuario válido.\n2. Ingresar contraseña válida.\n3. Hacer clic en \"Login\".", 
    "User: standard_user\nPassword: secret_sauce", 
    "Redirección exitosa a la página /inventory.html. Se muestra el catálogo de productos y el menú."
  ],
  [
    "TC-02", 
    "Negativo", 
    "Login Invalido - Contraseña Incorrecta", 
    "Navegador en la página de Login.", 
    "1. Ingresar usuario válido.\n2. Ingresar contraseña incorrecta.\n3. Hacer clic en \"Login\".", 
    "User: standard_user\nPassword: invalid_pass", 
    "Mensaje de error visible: \"Epic sadface: Username and password do not match any user in this service\"."
  ],
  [
    "TC-03", 
    "Negativo", 
    "Login Fallido - Usuario Bloqueado", 
    "Navegador en la página de Login.", 
    "1. Ingresar usuario bloqueado.\n2. Ingresar contraseña válida.\n3. Hacer clic en \"Login\".", 
    "User: locked_out_user\nPassword: secret_sauce", 
    "Mensaje de error visible: \"Epic sadface: Sorry, this user has been locked out.\"."
  ],
  [
    "TC-04", 
    "Negativo", 
    "Login Fallido - Campos Vacíos", 
    "Navegador en la página de Login.", 
    "1. Dejar campos vacíos.\n2. Hacer clic en \"Login\".", 
    "User: [vacío]\nPassword: [vacío]", 
    "Mensaje de error visible: \"Epic sadface: Username is required\"."
  ],
  // Catálogo y Carrito
  [
    "TC-05", 
    "Positivo", 
    "Agregar Productos al Carrito", 
    "Usuario logueado en la página de catálogo.", 
    "1. Hacer clic en \"Add to cart\" para 2 productos.\n2. Verificar el badge de cantidad del carrito.", 
    "Productos: Sauce Labs Backpack, Sauce Labs Bike Light", 
    "El badge del carrito en el header muestra el número 2."
  ],
  [
    "TC-06", 
    "Positivo", 
    "Ordenar Productos por Precio (Bajo a Alto)", 
    "Usuario logueado en la página de catálogo.", 
    "1. Hacer clic en el dropdown de ordenamiento.\n2. Seleccionar \"Price (low to high)\".", 
    "Opción: Price (low to high)", 
    "Los productos se reordenan de menor a mayor precio. El primer producto cuesta $7.99 y el último $49.99."
  ],
  [
    "TC-07", 
    "Positivo", 
    "Remover Producto desde el Catálogo", 
    "Usuario logueado, producto agregado al carrito.", 
    "1. Hacer clic en \"Remove\" en el producto desde la tienda.", 
    "Producto: Sauce Labs Backpack", 
    "El botón cambia de nuevo a \"Add to cart\" y el badge del carrito disminuye en 1."
  ],
  [
    "TC-08", 
    "Positivo", 
    "Remover Producto desde la Página del Carrito", 
    "Usuario logueado, con productos en el carro.", 
    "1. Navegar a la página del carrito (/cart.html).\n2. Hacer clic en \"Remove\" en un ítem.", 
    "Producto: Sauce Labs Backpack", 
    "El producto desaparece de la lista del carrito y el contador se actualiza."
  ],
  // Checkout
  [
    "TC-09", 
    "Positivo", 
    "Compra Exitosa (Flujo Completo)", 
    "Usuario con productos en el carrito.", 
    "1. Ir al carro de compras.\n2. Hacer clic en \"Checkout\".\n3. Rellenar formulario de información.\n4. Clic en \"Continue\".\n5. Clic en \"Finish\".", 
    "Nombre: John\nApellido: Doe\nZIP: 12345", 
    "Redirección a /checkout-complete.html. Mensaje visible: \"Thank you for your order!\" y \"Your order has been dispatched\"."
  ],
  [
    "TC-10", 
    "Negativo", 
    "Checkout - Formulario Incompleto (ZIP Faltante)", 
    "Usuario con productos en el carrito en /checkout-step-one.html.", 
    "1. Ingresar Nombre y Apellido.\n2. Dejar ZIP/Postal Code vacío.\n3. Hacer clic en \"Continue\".", 
    "Nombre: John\nApellido: Doe\nZIP: [vacío]", 
    "Mensaje de error visible: \"Error: Postal Code is required\". No permite avanzar a la vista de confirmación."
  ],
  // Edge cases
  [
    "TC-11", 
    "Edge Case", 
    "Validación de Imágenes de Catálogo (problem_user)", 
    "Iniciar sesión como problem_user.", 
    "1. Iniciar sesión como problem_user.\n2. Inspeccionar imágenes de productos del catálogo.", 
    "User: problem_user\nPassword: secret_sauce", 
    "Falla Esperada (Simulado): Las imágenes tienen URL rotas (/static/media/sl-404.168b1cce.jpg)."
  ],
  [
    "TC-12", 
    "Edge Case", 
    "Checkout - Validación de Error al Intentar Continuar (error_user)", 
    "Iniciar sesión como error_user.", 
    "1. Añadir ítem e ir al checkout.\n2. Rellenar datos válidos.\n3. Hacer clic en \"Continue\".", 
    "User: error_user\nNombre: Jane\nApellido: Doe\nZIP: 99999", 
    "Falla Esperada (Simulado): Al hacer clic en \"Continue\", el sistema no avanza y muestra un error en la consola o un fallo funcional de redirección en la UI debido a los bugs intencionales del SUT para este perfil de usuario."
  ]
];

const ws = XLSX.utils.aoa_to_sheet(testCasesData);

// Set column widths for better readability
const maxCols = testCasesData[0].length;
const colWidths = [];
for (let col = 0; col < maxCols; col++) {
  let maxLength = 0;
  for (let row = 0; row < testCasesData.length; row++) {
    const val = testCasesData[row][col];
    if (val) {
      const lines = val.toString().split('\n');
      for (const line of lines) {
        if (line.length > maxLength) {
          maxLength = line.length;
        }
      }
    }
  }
  colWidths.push({ wch: Math.min(Math.max(maxLength + 3, 10), 40) }); // cap column width at 40
}
ws['!cols'] = colWidths;

XLSX.utils.book_append_sheet(wb, ws, "Casos de Prueba");

const outputPath = path.join(docsDir, 'test-cases.xlsx');
XLSX.writeFile(wb, outputPath);

console.log(`Excel generado con éxito en: ${outputPath}`);
