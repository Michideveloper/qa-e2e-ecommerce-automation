# Plan de Pruebas (Test Plan) - Sauce Demo

Este plan de pruebas describe el alcance, enfoque, recursos y cronograma para las actividades de prueba del portal e-commerce **Sauce Demo**.

---

## 1. Introducción
El objetivo de este proyecto es validar el correcto funcionamiento de los flujos críticos de la plataforma web de compras Sauce Demo. La suite está diseñada para asegurar que tanto los usuarios finales como los reclutadores observen una cobertura funcional óptima y robusta en un ambiente simulado.

---

## 2. Alcance (Scope)

### 2.1 En Alcance
Se probarán las siguientes funcionalidades críticas:
- **Autenticación (Login)**:
  - Ingreso exitoso con usuarios estándar.
  - Comportamiento de validación con credenciales inválidas.
  - Bloqueo de accesos para usuarios suspendidos (`locked_out_user`).
  - Validación de campos obligatorios vacíos.
- **Catálogo de Productos**:
  - Visualización correcta de precios, títulos e imágenes.
  - Funcionalidad de filtros de ordenamiento (Nombre A-Z, Z-A, Precio bajo-alto, alto-bajo).
  - Adición y remoción de productos al carrito desde la tienda.
- **Carrito de Compras**:
  - Persistencia y conteo correcto de ítems añadidos.
  - Eliminación de ítems desde la vista del carrito.
  - Continuación del flujo hacia la compra.
- **Flujo de Compra (Checkout)**:
  - Validación de campos obligatorios en el formulario de información personal.
  - Verificación del cálculo correcto de subtotales, impuestos (tax) y totales globales.
  - Finalización de compra y recepción del mensaje de éxito.

### 2.2 Fuera de Alcance
- Modificaciones en la base de datos real del sitio (SUT público/estático).
- Pruebas de APIs directas (las pruebas serán 100% Web E2E).
- Pruebas de rendimiento de carga o estrés del servidor de Sauce Demo.

---

## 3. Tipos de Testing a Aplicar
- **Pruebas Funcionales**: Validación de reglas de negocio en formularios y cálculos de checkout.
- **Pruebas de Regresión**: Ejecución automatizada en CI/CD ante cada cambio/pull request para asegurar la estabilidad del software existente.
- **Pruebas de UI/UX (Consistencia)**: Inspección de carga de imágenes y consistencia del estado del carro de compras.
- **Pruebas Negativas y Casos Límite (Edge Cases)**:
  - Envío de formularios de checkout con campos incompletos o vacíos.
  - Verificación de flujos anómalos o de comportamiento de error simulados por los usuarios problemáticos del sitio.

---

## 4. Ambiente de Pruebas
- **SUT (System Under Test)**: [Sauce Demo](https://www.saucedemo.com)
- **Navegadores**: Chromium (Google Chrome / Microsoft Edge), Firefox (Gecko), WebKit (Apple Safari).
- **Herramientas de Ejecución**: Playwright Test Runner con TypeScript.

---

## 5. Criterios de Aceptación y Salida
- **Criterios de Entrada**:
  - Código fuente del proyecto y pruebas subido a la rama de trabajo.
  - Entorno local/CI configurado con Node.js y dependencias de Playwright.
- **Criterios de Aceptación/Salida**:
  - 100% de los casos de prueba positivos automatizados aprobados.
  - Cobertura de todos los flujos de login, carrito y checkout.
  - Reportes de pruebas generados exitosamente.

---

## 6. Gestión de Riesgos

| Riesgo | Impacto | Mitigación |
| :--- | :--- | :--- |
| **Inestabilidad del sitio público (Sauce Demo)** | Alto | Implementar esperas dinámicas robustas (auto-waiting de Playwright) y reintentos automáticos (retries) en la suite. |
| **Errores de Red / Timeout en CI/CD** | Medio | Configurar reintentos específicos para ejecuciones en GitHub Actions y aumentar ligeramente el tiempo máximo de espera de las aserciones. |
| **Falsos Positivos en Pruebas de Flujos Negativos** | Bajo | Validar exactamente los mensajes de error devueltos por la interfaz antes de marcar las pruebas como exitosas. |
