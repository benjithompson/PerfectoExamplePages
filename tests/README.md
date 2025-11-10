# Playwright Tests

Comprehensive end-to-end tests for the example pages.

## Test Files

- **w2.spec.js** - W-2 tax form and summary page tests
- **store.spec.js** - Store showcase page tests (products, cart, filters)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run only W-2 tests
```bash
npm run test:w2
```

### Run only Store tests
```bash
npx playwright test tests/store.spec.js
```

### Run specific test file
```bash
npx playwright test tests/<filename>.spec.js
```

### Run tests with browser UI visible (headed mode)
```bash
npm run test:headed
# or specifically for W-2
npm run test:w2:headed
```

### Run tests in interactive UI mode
```bash
npm run test:ui
```

### Debug tests step-by-step
```bash
npm run test:debug
```

### View test report
```bash
npm run report
```

## Test Coverage

### W-2 Form Tests (`tests/w2.spec.js`)

#### Form Display & Validation
- ✅ Display all required sections and fields
- ✅ Validate required fields on submit
- ✅ Format EIN (XX-XXXXXXX) automatically
- ✅ Format SSN (XXX-XX-XXXX) automatically
- ✅ Show/hide error states appropriately
- ✅ Clear form with reset button

#### Form Functionality
- ✅ Auto-populate dependent wage fields
- ✅ Handle all 50 US states in dropdowns
- ✅ Validate EIN and SSN formats strictly
- ✅ Handle checkbox inputs (retirement plan, etc.)
- ✅ Clear errors when user starts typing
- ✅ Navigate to summary on successful submit

#### Summary Page Tests
- ✅ Display success banner
- ✅ Show all employer information
- ✅ Show all employee information  
- ✅ Display wages with currency formatting
- ✅ Calculate and display tax totals
- ✅ Show status indicators (retirement plan)
- ✅ Print functionality
- ✅ Edit link returns to form
- ✅ Back to examples navigation
- ✅ Redirect to form if no data

#### Complete User Flow
- ✅ Navigate from index → form → summary → back
- ✅ Fill complete form with all fields
- ✅ Persist data in sessionStorage
- ✅ Handle minimal required fields

#### Responsive & Accessibility
- ✅ Mobile viewport compatibility (form)
- ✅ Mobile viewport compatibility (summary)
- ✅ Keyboard navigation
- ✅ ARIA labels and roles
- ✅ Proper heading hierarchy
- ✅ Focus management

### Store Page Tests (`tests/store.spec.js`)

#### Basic Functionality
- ✅ Load page without JavaScript errors
- ✅ Display product grid/list
- ✅ Show all required page elements (header, filters, search)
- ✅ Product cards have images, titles, prices, and add buttons

#### Cart Functionality
- ✅ Open cart drawer on button click
- ✅ Close cart when overlay clicked
- ✅ Close cart on Escape key
- ✅ Add products to cart
- ✅ Display cart items with details
- ✅ Increase/decrease item quantities
- ✅ Remove items from cart
- ✅ Update cart count badge
- ✅ Calculate totals (subtotal, tax, shipping)

#### Filters & Search
- ✅ Filter products by category
- ✅ Filter products by tags
- ✅ Search products by name
- ✅ Sort products (featured, price, newest)
- ✅ Clear filters and search
- ✅ Show/hide filters panel (mobile & desktop)

#### Theme & UI
- ✅ Toggle light/dark theme
- ✅ Persist theme preference
- ✅ Responsive layout changes
- ✅ Animations and transitions

## Test Browsers

Tests run on:
- ✅ Chrome (Desktop)
- ✅ Firefox (Desktop)
- ✅ Safari (Desktop)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## Local Development Server

The tests automatically start a Python HTTP server on port 8000 before running. If you prefer to run your own server:

```bash
# Start local server manually
python3 -m http.server 8000

# Then run tests with existing server
npm test
```

## Test Data

The tests use realistic sample data:
- **Employer:** Tech Corp Inc (EIN: 12-3456789)
- **Employee:** Jane Smith (SSN: 123-45-6789)
- **Wages:** $85,000.00
- **Federal Tax:** $12,750.00
- **State:** California

## CI/CD Integration

These tests are ready for CI/CD pipelines:
- Retries failed tests automatically in CI
- Generates HTML reports
- Captures screenshots on failure
- Records video on failure
- Traces available for debugging

## Troubleshooting

### Port 8000 already in use
```bash
# Kill process using port 8000
lsof -ti:8000 | xargs kill -9
```

### Browsers not installed
```bash
npx playwright install
```

### Tests timing out
The webServer timeout is set to 120 seconds. If your machine is slow, increase it in `playwright.config.js`.

## File Structure

```
tests/
  ├── README.md              # This file - test documentation
  ├── w2.spec.js             # W-2 form and summary tests
  ├── store.spec.js          # Store page tests
  ├── playwright-report/     # Generated HTML test reports (gitignored)
  └── test-results/          # Test artifacts, screenshots, videos (gitignored)
playwright.config.js         # Playwright configuration
package.json                 # Dependencies and scripts
```

## Writing Additional Tests

To add more tests, create new `.spec.js` files in the `tests/` directory. They will automatically be discovered and run.

Example:
```javascript
import { test, expect } from '@playwright/test';

test('my new test', async ({ page }) => {
  await page.goto('/examples/w2.html');
  // your test code
});
```

## Continuous Integration Example

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```
