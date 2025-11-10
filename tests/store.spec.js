import { test, expect } from '@playwright/test';

/**
 * Store Page Tests
 * Tests the store showcase page with products, filters, and cart functionality
 */

const STORE_URL = '/examples/store.html';

test.describe('Store Page - Basic Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STORE_URL);
    await page.waitForLoadState('networkidle');
  });

  test('should load without JavaScript errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      consoleErrors.push(`Page error: ${error.message}`);
    });

    await page.reload();
    await page.waitForLoadState('networkidle');
    
    expect(consoleErrors).toHaveLength(0);
  });

  test('should display products', async ({ page }) => {
    // Check if products are displayed
    const productCards = await page.locator('.product-card, .product-row').count();
    expect(productCards).toBeGreaterThan(0);
    
    // Verify first product has required elements
    const firstProduct = page.locator('.product-card, .product-row').first();
    await expect(firstProduct.locator('h3')).toBeVisible();
    await expect(firstProduct.locator('.price')).toBeVisible();
    await expect(firstProduct.locator('[data-add]')).toBeVisible();
  });

  test('should have visible page elements', async ({ page }) => {
    // Check header elements
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('#cartBtn')).toBeVisible();
    await expect(page.locator('#themeToggle')).toBeVisible();
    
    // Check filters
    await expect(page.locator('#filtersPane')).toBeVisible();
    await expect(page.locator('#categoryFilters')).toBeVisible();
    await expect(page.locator('#tagFilters')).toBeVisible();
    
    // Check search and sort
    await expect(page.locator('#searchInput')).toBeVisible();
    await expect(page.locator('#sortSelect')).toBeVisible();
  });
});

test.describe('Store Page - Cart Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STORE_URL);
    await page.waitForLoadState('networkidle');
  });

  test('should open cart drawer when cart button clicked', async ({ page }) => {
    const cartBtn = page.locator('#cartBtn');
    const cartDrawer = page.locator('#cartDrawer');
    const overlay = page.locator('#overlay');
    
    // Initially cart should be closed
    await expect(cartDrawer).not.toHaveClass(/open/);
    
    // Click cart button
    await cartBtn.click();
    await page.waitForTimeout(500); // Wait for animation
    
    // Cart should be open
    await expect(cartDrawer).toHaveClass(/open/);
    await expect(overlay).toHaveClass(/show/);
  });

  test('should close cart when overlay clicked', async ({ page }) => {
    const cartBtn = page.locator('#cartBtn');
    const cartDrawer = page.locator('#cartDrawer');
    const overlay = page.locator('#overlay');
    
    // Open cart
    await cartBtn.click();
    await page.waitForTimeout(500);
    await expect(cartDrawer).toHaveClass(/open/);
    
    // Click overlay
    await overlay.click();
    await page.waitForTimeout(500);
    
    // Cart should be closed
    await expect(cartDrawer).not.toHaveClass(/open/);
  });

  test('should add product to cart', async ({ page }) => {
    const cartCount = page.locator('#cartCount');
    const initialCount = await cartCount.textContent();
    
    // Click first add button
    await page.locator('[data-add]').first().click();
    await page.waitForTimeout(300);
    
    // Cart count should increase
    const newCount = await cartCount.textContent();
    expect(parseInt(newCount)).toBeGreaterThan(parseInt(initialCount));
  });

  test('should display added items in cart', async ({ page }) => {
    const cartBtn = page.locator('#cartBtn');
    
    // Add a product
    await page.locator('[data-add]').first().click();
    await page.waitForTimeout(300);
    
    // Open cart
    await cartBtn.click();
    await page.waitForTimeout(500);
    
    // Check cart has items
    const cartItems = await page.locator('.cart-item').count();
    expect(cartItems).toBeGreaterThan(0);
  });

  test('should increase quantity in cart', async ({ page }) => {
    // Add a product
    await page.locator('[data-add]').first().click();
    await page.waitForTimeout(300);
    
    // Open cart
    await page.locator('#cartBtn').click();
    await page.waitForTimeout(500);
    
    // Get initial quantity
    const qtyDisplay = page.locator('.cart-item .qty span').first();
    const initialQty = await qtyDisplay.textContent();
    
    // Click increase button
    await page.locator('.cart-item [data-inc]').first().click();
    await page.waitForTimeout(200);
    
    // Quantity should increase
    const newQty = await qtyDisplay.textContent();
    expect(parseInt(newQty)).toBeGreaterThan(parseInt(initialQty));
  });

  test('should remove item from cart', async ({ page }) => {
    // Add a product
    await page.locator('[data-add]').first().click();
    await page.waitForTimeout(300);
    
    // Open cart
    await page.locator('#cartBtn').click();
    await page.waitForTimeout(500);
    
    // Remove item
    await page.locator('.cart-item [data-remove]').first().click();
    await page.waitForTimeout(200);
    
    // Cart should show empty message
    await expect(page.locator('.cart-body')).toContainText('Your cart is empty');
  });
});

test.describe('Store Page - Filters and Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STORE_URL);
    await page.waitForLoadState('networkidle');
  });

  test('should filter products by category', async ({ page }) => {
    const initialCount = await page.locator('.product-card, .product-row').count();
    
    // Click first category filter
    const firstCategoryCheckbox = page.locator('[data-filter-cat]').first();
    await firstCategoryCheckbox.check();
    await page.waitForTimeout(300);
    
    const filteredCount = await page.locator('.product-card, .product-row').count();
    
    // Filtered count should be different (likely less) than initial
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('should search products', async ({ page }) => {
    const searchInput = page.locator('#searchInput');
    
    // Type search term
    await searchInput.fill('wireless');
    await page.waitForTimeout(300);
    
    // Should show some results
    const results = await page.locator('.product-card, .product-row').count();
    expect(results).toBeGreaterThan(0);
    
    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(300);
    
    // Should show more results
    const allResults = await page.locator('.product-card, .product-row').count();
    expect(allResults).toBeGreaterThanOrEqual(results);
  });

  test('should sort products', async ({ page }) => {
    const sortSelect = page.locator('#sortSelect');
    
    // Change sort to price ascending
    await sortSelect.selectOption('price-asc');
    await page.waitForTimeout(300);
    
    // Products should still be visible
    const products = await page.locator('.product-card, .product-row').count();
    expect(products).toBeGreaterThan(0);
  });
});

test.describe('Store Page - Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STORE_URL);
    await page.waitForLoadState('networkidle');
  });

  test('should toggle theme', async ({ page }) => {
    const html = page.locator('html');
    const themeToggle = page.locator('#themeToggle');
    
    // Get initial theme
    const initialTheme = await html.getAttribute('data-theme');
    
    // Toggle theme
    await themeToggle.click();
    await page.waitForTimeout(200);
    
    // Theme should change
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });
});
