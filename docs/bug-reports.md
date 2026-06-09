# Reportes de Bugs (Bug Reports) - Sauce Demo

Este documento recopila los reportes de bugs identificados durante la ejecución de las pruebas sobre la plataforma **Sauce Demo** utilizando los perfiles de usuario anómalos.

---

## BUG-01: Imágenes rotas en catálogo de productos (`problem_user`)

* **ID del Bug**: BUG-01
* **Título**: Todas las imágenes de los productos en el catálogo apuntan a un recurso inexistente (404) al iniciar sesión como `problem_user`.
* **Severidad**: Baja (Estética / UX)
* **Prioridad**: Media
* **Entorno**: https://www.saucedemo.com - Desktop Chrome v125
* **Usuario Utilizado**: `problem_user`

### Pasos para Reproducir
1. Navegar a la página de inicio de sesión de Sauce Demo.
2. Ingresar el usuario `problem_user` y la contraseña `secret_sauce`.
3. Hacer clic en el botón "Login".
4. Observar las imágenes de los productos del catálogo principal.

### Comportamiento Esperado
Cada producto (ej. *Sauce Labs Backpack*) debe mostrar su imagen descriptiva correspondiente.

### Comportamiento Actual
Todas las imágenes de los productos del catálogo cargan una imagen genérica de un perrito con un letrero de "404" (`/static/media/sl-404.168b1cce.jpg`). Las URLs del atributo `src` son incorrectas para este perfil de usuario.

### Evidencia
- **URL con error**: `/static/media/sl-404.168b1cce.jpg` para todos los elementos `<img class="inventory_item_img">`.

---

## BUG-02: Imposibilidad de avanzar en el flujo de Checkout (`error_user`)

* **ID del Bug**: BUG-02
* **Título**: El botón "Continue" en el formulario de información de Checkout no responde y dispara un error en consola cuando se inicia sesión como `error_user`.
* **Severidad**: Alta (Bloqueante para el negocio)
* **Prioridad**: Alta
* **Entorno**: https://www.saucedemo.com - Desktop Chrome v125
* **Usuario Utilizado**: `error_user`

### Pasos para Reproducir
1. Iniciar sesión en Sauce Demo con el usuario `error_user` y la contraseña `secret_sauce`.
2. Agregar cualquier producto (ej. *Sauce Labs Backpack*) al carrito.
3. Hacer clic en el icono del carro de compras.
4. Hacer clic en el botón "Checkout".
5. Ingresar información válida en los campos "First Name", "Last Name" y "Postal Code".
6. Hacer clic en el botón "Continue".

### Comportamiento Esperado
El sistema debe validar la información, guardar el estado de la compra y redirigir al usuario al paso 2 del checkout (`/checkout-step-two.html`).

### Comportamiento Actual
El sistema permanece en la misma página (`/checkout-step-one.html`) y no realiza ninguna acción en la UI. Al abrir la consola del navegador, se observa un error de Javascript bloqueando el hilo de ejecución (intencional de Sauce Demo para simular fallas en este perfil).

### Evidencia
- **Error en consola**: `TypeError: Cannot set property '...' of undefined` o similar fallo al hacer clic en el botón "Continue".
