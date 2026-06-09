# Hi there, I'm José! 
## Junior QA Automation Engineer | Selenium | Playwright | CI/CD | Open to opportunities

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=José%20|%20QA%20Automation&fontSize=40&animation=fadeIn" alt="Header Banner" />
</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=Michideveloper&color=663399&style=flat-square&label=PROFILE+VIEWS" alt="Profile Views" />
</p>

# E2E Test Automation Framework – E-commerce Sauce Demo

This project simulates a real-world QA process, covering:
- Test planning
- Test case design
- Defect reporting
- Automated E2E testing
- CI/CD integration

This project was developed to demonstrate a production-like QA workflow, ensuring high reliability, early defect detection, and continuous validation.

---

## Objective
Validate core e-commerce flows ensuring reliability, correctness, and user experience through a combination of manual and automated testing.

---

## Scope
- **Authentication**: Verification of multi-user login behaviors (standard, locked out, empty inputs, invalid credentials).
- **Product Browsing**: Correct presentation of products, sorting by price from low to high, and catalog stability.
- **Cart Management**: Item persistence, adding and removing products from catalog and cart views.
- **Checkout Process**: Input validation, math accuracy on item totals, taxes, and final order completion.

---

## Risks
- **Incorrect price calculations**: Verification of math total formulas at the checkout step.
- **Broken product images**: Handling UI layout anomalies and image source checks.
- **Checkout failures**: Tracking functional blocking actions during information submittal.
- **Session handling issues**: Confirming secure redirection and failure banners.

---

## Project Structure

The project structure is designed according to modular design patterns and clean code practices:

```text
qa-e2e-ecommerce-automation/
├── .github/workflows/
│   └── ci.yml               # Continuous Integration (CI) pipeline (GitHub Actions)
├── docs/
│   ├── test-plan.md         # Functional test plan (scope, strategy, risks)
│   ├── test-strategy.md     # Technical strategy (POM, architecture decisions)
│   ├── test-cases.md        # Detailed test cases matrix (Markdown format)
│   ├── test-cases.xlsx      # Formal test cases matrix (Generated Excel file)
│   └── bug-reports.md       # Defect reports of simulated system errors
├── pages/                   # Page Object Model (POM) classes
│   ├── LoginPage.ts         # Selectors and helper methods for Auth
│   ├── InventoryPage.ts     # Catalog items, sorting, and adding/removing products
│   ├── CartPage.ts          # Shopping cart selectors and actions
│   └── CheckoutPage.ts      # Billing form, payment totals, and purchase completion
├── tests/
│   ├── e2e/                 # Automated test specification files
│   │   ├── auth.spec.ts     # Auth test suite (positive and negative cases)
│   │   ├── purchase.spec.ts # Complete purchase journey and checkout math validation
│   │   └── edge-cases.spec.ts # Simulating catalog & checkout defects
│   └── fixtures/
│       └── baseFixtures.ts  # Playwright extensions to auto-instantiate Page Objects
├── utils/
│   └── generate-xlsx.js     # Script tool to export test cases matrix to Excel
├── playwright.config.ts     # Playwright Test Framework configuration
├── package.json             # Package manifests, scripts, and dependencies
└── README.md                # Framework documentation and execution guide
```

---

## Tech Stack & Tools

- **Core**: JavaScript, TypeScript.
- **Automation Framework**: [Playwright](https://playwright.dev/) (for web-first assertions, auto-waiting, and fast parallel execution).
- **Design Pattern**: Page Object Model (POM) + Custom Fixtures.
- **Continuous Integration**: GitHub Actions (CI) with automated HTML report artifact uploading.
- **Reporting**: Playwright HTML Reporter (embedded screenshots, videos, and execution traces on failures).

---

## Setup & Local Execution

Follow these steps to run the framework locally:

### 1. Clone the repository
```bash
git clone https://github.com/Michideveloper/qa-e2e-ecommerce-automation.git
cd qa-e2e-ecommerce-automation
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers
```bash
npx playwright install
```

### 4. Run tests
- **Standard execution (Headless mode)**:
  ```bash
  npm test
  ```
- **Interactive mode (Playwright UI Runner)**:
  ```bash
  npm run test:ui
  ```

---

## Reporting & Test Evidence

After tests finish, you can review execution logs and visual reports by running:
```bash
npm run test:report
```

In the event of a test failure, Playwright automatically:
1. Captures a **screenshot** of the page state at the failure point.
2. Records a **video** of the test execution.
3. Generates **traces** containing network logs, source location, and step details for easy debugging.

---

## Continuous Integration (CI/CD)

The continuous integration pipeline is defined in `.github/workflows/ci.yml`. On every `push` and `pull_request` to the `main` or `master` branches, GitHub Actions:
1. Spins up a fresh Ubuntu Linux runner.
2. Installs Node.js and dependencies.
3. Downloads the required Playwright browser binaries.
4. Executes the automated test suite.
5. Saves and publishes the Playwright HTML test report as a downloadable run artifact, retained for 30 days.
