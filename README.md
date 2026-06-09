# E2E Automation & QA Portfolio Project - Sauce Demo 🚀

Este es un proyecto de portafolio profesional para el rol de **Jr/Mid QA Automation Engineer**. En él se demuestra una cobertura de pruebas de extremo a extremo (E2E) para la plataforma e-commerce **Sauce Demo**, integrando procesos de aseguramiento de la calidad tradicionales con automatización de pruebas moderna.

---

## 📁 Estructura del Proyecto

La arquitectura del proyecto sigue las mejores prácticas de modularidad y separación de responsabilidades:

```text
qa-e2e-full-project/
├── .github/workflows/
│   └── ci.yml               # Pipeline de Integración Continua (GitHub Actions)
├── docs/
│   ├── test-plan.md         # Plan de pruebas funcional (alcance, riesgos)
│   ├── test-strategy.md     # Estrategia técnica (POM, decisiones de arquitectura)
│   ├── test-cases.md        # Matriz de casos de prueba detallada (Markdown)
│   ├── test-cases.xlsx      # Matriz de casos de prueba formal (Excel generado)
│   └── bug-reports.md       # Reportes de bugs de errores simulados
├── pages/                   # Page Object Model (POM)
│   ├── LoginPage.ts         # Selectores y métodos para Login
│   ├── InventoryPage.ts     # Selectores y métodos para el catálogo de productos
│   ├── CartPage.ts          # Selectores y acciones del carrito de compras
│   └── CheckoutPage.ts      # Flujo de facturación, totales e información
├── tests/
│   ├── e2e/                 # Archivos de especificaciones de pruebas
│   │   ├── auth.spec.ts     # Pruebas de Login positivo/negativo
│   │   ├── purchase.spec.ts # Flujo de compra completo y validaciones
│   │   └── edge-cases.spec.ts # Casos límites con problem_user y error_user
│   └── fixtures/
│       └── baseFixtures.ts  # Configuración y carga automática de Page Objects
├── utils/
│   └── generate-xlsx.js     # Script de utilidad para exportar casos de prueba a Excel
├── playwright.config.ts     # Configuración del framework Playwright
├── package.json             # Gestión de dependencias y scripts npm
└── README.md                # Guía general de uso y presentación del proyecto
```

---

## 🛠️ Tecnologías y Herramientas

- **Core**: JavaScript, TypeScript.
- **Automation Framework**: [Playwright](https://playwright.dev/) (para aserciones web-first, auto-esperas y paralelismo veloz).
- **Patrón de Diseño**: Page Object Model (POM) + Custom Fixtures (Playwright).
- **Integración Continua**: GitHub Actions (CI) con carga de artefactos HTML.
- **Reporting**: Reportes HTML integrados nativos de Playwright (con video y capturas en fallos).

---

## 📋 Cobertura de Pruebas

Se validan escenarios críticos incluyendo:
- **Casos Positivos**: Login exitoso, ordenamiento por precio de menor a mayor, adición de ítems a la cesta y cálculo matemático preciso de impuestos y totales del checkout en un flujo de compra completo.
- **Casos Negativos**: Validaciones de campos obligatorios en login y formulario de checkout (ZIP code faltante), error de inicio de sesión por credenciales incorrectas o cuentas bloqueadas (`locked_out_user`).
- **Casos Límite y Bugs Reales**: Pruebas utilizando perfiles de Sauce Demo como `problem_user` (verificación automática de URL de imágenes rotas en catálogo) y `error_user` (verificación de fallas funcionales en el flujo de envío del checkout).

---

## 🚀 Instalación y Uso Local

Sigue estos pasos para clonar y ejecutar las pruebas localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/qa-e2e-full-project.git
cd qa-e2e-full-project
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Instalar navegadores de Playwright
```bash
npx playwright install
```

### 4. Ejecutar las pruebas
- **Ejecución estándar en modo headless**:
  ```bash
  npm test
  ```
- **Ejecución interactiva (Playwright UI Mode)**:
  ```bash
  npm run test:ui
  ```

---

## 📊 Reportes y Evidencia

Una vez ejecutadas las pruebas, puedes abrir el último reporte interactivo HTML con el comando:
```bash
npm run test:report
```

En caso de que una prueba falle, Playwright automáticamente:
1. Captura una pantalla en el momento exacto del error.
2. Graba un video interactivo del navegador web durante la ejecución.
3. Almacena las trazas (traces) detalladas de la ejecución para su análisis profundo.

---

## ⚙️ Integración Continua (CI/CD)

El proyecto cuenta con un archivo de flujo de trabajo `.github/workflows/ci.yml`. Cada vez que se realiza un envío (`push`) o una solicitud de extracción (`pull request`) a las ramas `main` o `master`:
1. Levanta un contenedor con Ubuntu Linux.
2. Instala Node.js y las dependencias del proyecto.
3. Instala los navegadores necesarios para Playwright.
4. Ejecuta toda la suite de pruebas.
5. Almacena y adjunta los reportes HTML como artefactos descargables de la ejecución en GitHub Actions por un periodo de 30 días.
