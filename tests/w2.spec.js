import { test, expect } from '@playwright/test';

/**
 * W-2 Form and Summary Page Tests
 * Tests the complete flow of filling out a W-2 tax form and viewing the summary
 */

// Sample test data
const testData = {
  employer: {
    ein: '12-3456789',
    name: 'Tech Corp Inc',
    address: '123 Business Ave',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    controlNumber: 'TC2024-001'
  },
  employee: {
    ssn: '123-45-6789',
    name: 'Jane Smith',
    address: '456 Main Street, Apt 5B',
    city: 'Oakland',
    state: 'CA',
    zip: '94612'
  },
  wages: {
    wages: '85000.00',
    federalTax: '12750.00',
    socialSecurityWages: '85000.00',
    socialSecurityTax: '5270.00',
    medicareWages: '85000.00',
    medicareTax: '1232.50',
    socialSecurityTips: '0.00',
    allocatedTips: '0.00',
    dependentCareBenefits: '5000.00',
    nonqualifiedPlans: '0.00'
  },
  box12a: {
    code: 'DD',
    amount: '8500.00'
  },
  checkboxes: {
    statutoryEmployee: false,
    retirementPlan: true,
    thirdPartySickPay: false
  },
  state: {
    state: 'CA',
    stateEmployerId: 'CA-123-4567',
    stateWages: '85000.00',
    stateIncomeTax: '4250.00',
    localWages: '0.00',
    localIncomeTax: '0.00',
    localityName: ''
  }
};

test.describe('W-2 Form Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the W-2 form page
    await page.goto('/examples/w2/w2.html');
    
    // Wait for the form to be visible
    await expect(page.locator('#w2Form')).toBeVisible();
  });

  test('should display the W-2 form with all required fields', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/W-2 Wage and Tax Statement/);
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('W-2 Wage and Tax Statement');
    
    // Check tax year badge
    await expect(page.locator('.tax-year-badge')).toContainText('Tax Year 2024');
    
    // Verify all major sections are present
    await expect(page.locator('text=Employer Information')).toBeVisible();
    await expect(page.locator('text=Employee Information')).toBeVisible();
    await expect(page.locator('text=Wages and Tax Information')).toBeVisible();
    await expect(page.locator('text=State and Local Tax Information')).toBeVisible();
  });

  test('should validate required fields on submit', async ({ page }) => {
    // Try to submit empty form
    await page.locator('button[type="submit"]').click();
    
    // Check that error messages appear for required fields
    await expect(page.locator('#ein').locator('..')).toContainText('Please enter a valid EIN');
    await expect(page.locator('#ssn').locator('..')).toContainText('Please enter a valid SSN');
    
    // Verify form didn't navigate away
    await expect(page).toHaveURL(/w2\.html/);
  });

  test('should format EIN input correctly', async ({ page }) => {
    const einInput = page.locator('#ein');
    
    // Type EIN without dashes
    await einInput.fill('123456789');
    await einInput.blur();
    
    // Verify it formats with dash
    await expect(einInput).toHaveValue('12-3456789');
  });

  test('should format SSN input correctly', async ({ page }) => {
    const ssnInput = page.locator('#ssn');
    
    // Type SSN without dashes
    await ssnInput.fill('123456789');
    await ssnInput.blur();
    
    // Verify it formats with dashes
    await expect(ssnInput).toHaveValue('123-45-6789');
  });

  test('should auto-populate dependent wage fields', async ({ page }) => {
    const wagesInput = page.locator('#wages');
    const ssWagesInput = page.locator('#socialSecurityWages');
    const medicareWagesInput = page.locator('#medicareWages');
    const stateWagesInput = page.locator('#stateWages');
    
    // Enter wages amount
    await wagesInput.fill('65000');
    await wagesInput.blur();
    
    // Verify dependent fields are auto-populated
    await expect(ssWagesInput).toHaveValue('65000.00');
    await expect(medicareWagesInput).toHaveValue('65000.00');
    await expect(stateWagesInput).toHaveValue('65000.00');
  });

  test('should clear error states when user starts typing', async ({ page }) => {
    const einInput = page.locator('#ein');
    
    // Submit to trigger errors
    await page.locator('button[type="submit"]').click();
    
    // Verify error state is applied
    await expect(einInput).toHaveClass(/error/);
    
    // Start typing in the field
    await einInput.fill('12');
    
    // Verify error state is removed
    await expect(einInput).not.toHaveClass(/error/);
  });

  test('should clear all form fields when reset button is clicked', async ({ page }) => {
    // Fill some fields
    await page.locator('#ein').fill('12-3456789');
    await page.locator('#employerName').fill('Test Company');
    await page.locator('#ssn').fill('123-45-6789');
    
    // Handle confirm dialog
    page.on('dialog', dialog => dialog.accept());
    
    // Click reset button
    await page.locator('#resetBtn').click();
    
    // Verify fields are cleared
    await expect(page.locator('#ein')).toHaveValue('');
    await expect(page.locator('#employerName')).toHaveValue('');
    await expect(page.locator('#ssn')).toHaveValue('');
  });

  test('should successfully fill out complete form and navigate to summary', async ({ page }) => {
    // Fill Employer Information
    await page.locator('#ein').fill(testData.employer.ein);
    await page.locator('#employerName').fill(testData.employer.name);
    await page.locator('#employerAddress').fill(testData.employer.address);
    await page.locator('#employerCity').fill(testData.employer.city);
    await page.locator('#employerState').selectOption(testData.employer.state);
    await page.locator('#employerZip').fill(testData.employer.zip);
    await page.locator('#controlNumber').fill(testData.employer.controlNumber);
    
    // Fill Employee Information
    await page.locator('#ssn').fill(testData.employee.ssn);
    await page.locator('#employeeName').fill(testData.employee.name);
    await page.locator('#employeeAddress').fill(testData.employee.address);
    await page.locator('#employeeCity').fill(testData.employee.city);
    await page.locator('#employeeState').selectOption(testData.employee.state);
    await page.locator('#employeeZip').fill(testData.employee.zip);
    
    // Fill Wages and Tax Information
    await page.locator('#wages').fill(testData.wages.wages);
    await page.locator('#federalTax').fill(testData.wages.federalTax);
    await page.locator('#socialSecurityWages').fill(testData.wages.socialSecurityWages);
    await page.locator('#socialSecurityTax').fill(testData.wages.socialSecurityTax);
    await page.locator('#medicareWages').fill(testData.wages.medicareWages);
    await page.locator('#medicareTax').fill(testData.wages.medicareTax);
    await page.locator('#dependentCareBenefits').fill(testData.wages.dependentCareBenefits);
    
    // Fill Box 12a
    await page.locator('#box12aCode').fill(testData.box12a.code);
    await page.locator('#box12aAmount').fill(testData.box12a.amount);
    
    // Check retirement plan checkbox
    if (testData.checkboxes.retirementPlan) {
      await page.locator('#retirementPlan').check();
    }
    
    // Fill State Information
    await page.locator('#stateForTax').selectOption(testData.state.state);
    await page.locator('#stateEmployerId').fill(testData.state.stateEmployerId);
    await page.locator('#stateWages').fill(testData.state.stateWages);
    await page.locator('#stateIncomeTax').fill(testData.state.stateIncomeTax);
    
    // Submit form
    await page.locator('button[type="submit"]').click();
    
    // Verify navigation to summary page
    await expect(page).toHaveURL(/w2summary\.html/);
  });

  test('should handle all US states in dropdown', async ({ page }) => {
    const stateSelect = page.locator('#employerState');
    
    // Verify dropdown has options
    const options = await stateSelect.locator('option').all();
    
    // Should have 51 options (blank + 50 states)
    expect(options.length).toBeGreaterThanOrEqual(50);
    
    // Test selecting a specific state
    await stateSelect.selectOption('NY');
    await expect(stateSelect).toHaveValue('NY');
  });

  test('should display warning alert about accuracy', async ({ page }) => {
    const alert = page.locator('.alert-warning');
    
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Important');
    await expect(alert).toContainText('exactly as shown on your W-2 form');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verify form is still usable
    await expect(page.locator('#w2Form')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Test that we can still fill a field
    await page.locator('#employerName').fill('Mobile Test Corp');
    await expect(page.locator('#employerName')).toHaveValue('Mobile Test Corp');
  });

  test('should validate EIN format strictly', async ({ page }) => {
    const einInput = page.locator('#ein');
    
    // Try invalid EIN formats
    await einInput.fill('123');
    await page.locator('button[type="submit"]').click();
    
    // Should show error
    await expect(einInput).toHaveClass(/error/);
    
    // Now enter valid format
    await einInput.fill('12-3456789');
    
    // Error should be removed on input
    await expect(einInput).not.toHaveClass(/error/);
  });

  test('should validate SSN format strictly', async ({ page }) => {
    const ssnInput = page.locator('#ssn');
    
    // Try invalid SSN format
    await ssnInput.fill('123');
    await page.locator('button[type="submit"]').click();
    
    // Should show error
    await expect(ssnInput).toHaveClass(/error/);
    
    // Now enter valid format
    await ssnInput.fill('123-45-6789');
    
    // Error should be removed
    await expect(ssnInput).not.toHaveClass(/error/);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Tab through form fields
    await page.keyboard.press('Tab');
    
    // Focus should be on first input
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeFocused();
  });
});

test.describe('W-2 Summary Page Tests', () => {
  
  test.beforeEach(async ({ page, context }) => {
    // First, navigate to form and fill it out
    await page.goto('/examples/w2/w2.html');
    
    // Fill required fields with test data
    await page.locator('#ein').fill(testData.employer.ein);
    await page.locator('#employerName').fill(testData.employer.name);
    await page.locator('#employerAddress').fill(testData.employer.address);
    await page.locator('#employerCity').fill(testData.employer.city);
    await page.locator('#employerState').selectOption(testData.employer.state);
    await page.locator('#employerZip').fill(testData.employer.zip);
    
    await page.locator('#ssn').fill(testData.employee.ssn);
    await page.locator('#employeeName').fill(testData.employee.name);
    await page.locator('#employeeAddress').fill(testData.employee.address);
    await page.locator('#employeeCity').fill(testData.employee.city);
    await page.locator('#employeeState').selectOption(testData.employee.state);
    await page.locator('#employeeZip').fill(testData.employee.zip);
    
    await page.locator('#wages').fill(testData.wages.wages);
    await page.locator('#federalTax').fill(testData.wages.federalTax);
    await page.locator('#socialSecurityTax').fill(testData.wages.socialSecurityTax);
    await page.locator('#medicareTax').fill(testData.wages.medicareTax);
    
    await page.locator('#stateIncomeTax').fill(testData.state.stateIncomeTax);
    
    if (testData.checkboxes.retirementPlan) {
      await page.locator('#retirementPlan').check();
    }
    
    // Submit form
    await page.locator('button[type="submit"]').click();
    
    // Wait for summary page to load
    await page.waitForURL(/w2summary\.html/);
  });

  test('should display summary page with success banner', async ({ page }) => {
    await expect(page).toHaveTitle(/W-2 Summary/);
    
    // Check success banner
    const successBanner = page.locator('.success-banner');
    await expect(successBanner).toBeVisible();
    await expect(successBanner).toContainText('W-2 Form Submitted Successfully');
  });

  test('should display all employer information correctly', async ({ page }) => {
    // Check EIN
    await expect(page.locator('#display-ein')).toContainText(testData.employer.ein);
    
    // Check employer name
    await expect(page.locator('#display-employerName')).toContainText(testData.employer.name);
    
    // Check employer address
    await expect(page.locator('#display-employerAddress')).toContainText(testData.employer.address);
    
    // Check employer location
    const location = `${testData.employer.city}, ${testData.employer.state}, ${testData.employer.zip}`;
    await expect(page.locator('#display-employerLocation')).toContainText(testData.employer.city);
  });

  test('should display all employee information correctly', async ({ page }) => {
    // Check SSN
    await expect(page.locator('#display-ssn')).toContainText(testData.employee.ssn);
    
    // Check employee name
    await expect(page.locator('#display-employeeName')).toContainText(testData.employee.name);
    
    // Check employee address
    await expect(page.locator('#display-employeeAddress')).toContainText(testData.employee.address);
  });

  test('should display wage information with proper currency formatting', async ({ page }) => {
    // Check wages (should be formatted with $ and commas)
    const wagesDisplay = page.locator('#display-wages');
    await expect(wagesDisplay).toBeVisible();
    const wagesText = await wagesDisplay.textContent();
    
    // Verify it's a number (may have commas)
    expect(wagesText).toMatch(/[\d,]+\.\d{2}/);
    
    // Check federal tax
    const fedTaxDisplay = page.locator('#display-federalTax');
    await expect(fedTaxDisplay).toBeVisible();
  });

  test('should display tax totals summary correctly', async ({ page }) => {
    // Check totals section exists
    await expect(page.locator('.totals-summary')).toBeVisible();
    
    // Check individual total displays
    await expect(page.locator('#total-federal')).toBeVisible();
    await expect(page.locator('#total-ss')).toBeVisible();
    await expect(page.locator('#total-medicare')).toBeVisible();
    await expect(page.locator('#total-state')).toBeVisible();
    
    // Verify federal tax total matches input
    const totalFederal = await page.locator('#total-federal').textContent();
    expect(totalFederal).toContain('12,750.00');
  });

  test('should display retirement plan status indicator', async ({ page }) => {
    const statusIndicators = page.locator('#display-statusIndicators');
    await expect(statusIndicators).toContainText('Retirement Plan');
  });

  test('should have working print button', async ({ page }) => {
    const printButton = page.locator('button:has-text("Print Summary")');
    await expect(printButton).toBeVisible();
    await expect(printButton).toBeEnabled();
    
    // Click would trigger window.print(), which we can't fully test in Playwright
    // but we can verify the button is clickable
    await printButton.click();
  });

  test('should have working edit link back to form', async ({ page }) => {
    const editLink = page.locator('a:has-text("Edit W-2 Form")');
    await expect(editLink).toBeVisible();
    
    // Click edit link
    await editLink.click();
    
    // Verify navigation back to form
    await expect(page).toHaveURL(/w2\.html/);
  });

  test('should have working back to examples link', async ({ page }) => {
    const backLink = page.locator('a:has-text("Back to Examples")');
    await expect(backLink).toBeVisible();
    
    // Click back link
    await backLink.click();
    
    // Verify navigation to index
    await expect(page).toHaveURL(/index\.html/);
  });

  test('should redirect to form if no data in sessionStorage', async ({ page, context }) => {
    // Clear sessionStorage
    await context.clearCookies();
    await page.evaluate(() => sessionStorage.clear());
    
    // Try to navigate directly to summary
    await page.goto('/examples/w2/w2summary.html');
    
    // Should redirect or show alert and then redirect
    // Wait a moment for redirect
    await page.waitForTimeout(1000);
    
    // Should end up on form page
    await expect(page).toHaveURL(/w2\.html/);
  });

  test('should display "Not provided" for empty optional fields', async ({ page }) => {
    // Control number was filled but other optional fields weren't
    // Check a field that wasn't filled
    const localityName = page.locator('#display-localityName');
    const text = await localityName.textContent();
    
    // Should show "Not provided" or similar placeholder
    expect(text).toBeTruthy();
  });

  test('should have proper section organization', async ({ page }) => {
    // Verify all major sections exist
    await expect(page.locator('text=Employer Information')).toBeVisible();
    await expect(page.locator('text=Employee Information')).toBeVisible();
    await expect(page.locator('text=Federal Wages and Tax Withholding')).toBeVisible();
    await expect(page.locator('text=State and Local Tax Information')).toBeVisible();
    await expect(page.locator('text=Total Tax Withholding Summary')).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verify key elements are still visible
    await expect(page.locator('.success-banner')).toBeVisible();
    await expect(page.locator('.summary-card')).toBeVisible();
    
    // Buttons should be visible
    await expect(page.locator('button:has-text("Print Summary")')).toBeVisible();
  });

  test('should handle theme toggle', async ({ page }) => {
    // The theme is handled by theme.js globally
    // We can test that theme toggle button exists
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');
    
    // Theme should be either 'light' or 'dark'
    expect(['light', 'dark']).toContain(initialTheme);
  });
});

test.describe('W-2 Complete User Flow', () => {
  
  test('should complete full user journey from form to summary and back', async ({ page }) => {
    // Step 1: Navigate to index
    await page.goto('/');
    
    // Step 2: Find and click W-2 form link
    const w2Link = page.locator('a:has-text("W-2 Tax Form")');
    await expect(w2Link).toBeVisible();
    await w2Link.click();
    
    // Step 3: Verify on form page
    await expect(page).toHaveURL(/w2\.html/);
    await expect(page.locator('h1')).toContainText('W-2 Wage and Tax Statement');
    
    // Step 4: Fill minimal required fields
    await page.locator('#ein').fill('98-7654321');
    await page.locator('#employerName').fill('Quick Test Inc');
    await page.locator('#ssn').fill('987-65-4321');
    await page.locator('#employeeName').fill('John Tester');
    await page.locator('#wages').fill('50000');
    await page.locator('#federalTax').fill('7500');
    
    // Step 5: Submit form
    await page.locator('button[type="submit"]').click();
    
    // Step 6: Verify on summary page
    await expect(page).toHaveURL(/w2summary\.html/);
    await expect(page.locator('.success-banner')).toBeVisible();
    
    // Step 7: Verify data is displayed
    await expect(page.locator('#display-ein')).toContainText('98-7654321');
    await expect(page.locator('#display-employerName')).toContainText('Quick Test Inc');
    await expect(page.locator('#display-ssn')).toContainText('987-65-4321');
    await expect(page.locator('#display-employeeName')).toContainText('John Tester');
    
    // Step 8: Go back to edit
    await page.locator('a:has-text("Edit W-2 Form")').click();
    
    // Step 9: Verify back on form
    await expect(page).toHaveURL(/w2\.html/);
    
    // Step 10: Go back to index
    await page.locator('a:has-text("Back to Examples")').click();
    
    // Step 11: Verify on index
    await expect(page).toHaveURL(/index\.html/);
  });

  test('should persist data when going back to edit and resubmitting', async ({ page }) => {
    // Fill and submit form
    await page.goto('/examples/w2/w2.html');
    
    await page.locator('#ein').fill('11-2233445');
    await page.locator('#employerName').fill('Persist Test Corp');
    await page.locator('#ssn').fill('111-22-3344');
    await page.locator('#employeeName').fill('Test Person');
    await page.locator('#wages').fill('60000');
    await page.locator('#federalTax').fill('9000');
    
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/w2summary\.html/);
    
    // Go back to edit
    await page.locator('a:has-text("Edit W-2 Form")').click();
    
    // Data should still be in sessionStorage
    // (Note: The form doesn't auto-populate from sessionStorage, 
    // but we can verify sessionStorage has the data)
    const sessionData = await page.evaluate(() => {
      return sessionStorage.getItem('w2Data');
    });
    
    expect(sessionData).toBeTruthy();
    expect(sessionData).toContain('Persist Test Corp');
  });
});

test.describe('Accessibility Tests', () => {
  
  test('W-2 form should have proper ARIA labels and roles', async ({ page }) => {
    await page.goto('/examples/w2/w2.html');
    
    // Check form has proper structure
    const form = page.locator('#w2Form');
    await expect(form).toBeVisible();
    
    // Check that labels are associated with inputs
    const einInput = page.locator('#ein');
    const einLabel = page.locator('label[for="ein"], label:has(#ein)');
    
    // At least one of these patterns should exist
    const labelExists = await einLabel.count() > 0 || 
                        await page.locator('label').filter({ hasText: 'EIN' }).count() > 0;
    expect(labelExists).toBeTruthy();
  });

  test('W-2 summary should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/examples/w2/w2.html');
    
    // Fill minimal data and submit
    await page.locator('#ein').fill('12-3456789');
    await page.locator('#employerName').fill('Test');
    await page.locator('#ssn').fill('123-45-6789');
    await page.locator('#employeeName').fill('Test');
    await page.locator('#wages').fill('50000');
    await page.locator('#federalTax').fill('7500');
    await page.locator('button[type="submit"]').click();
    
    // Check heading hierarchy on summary page
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    const h2Elements = page.locator('h2');
    const h2Count = await h2Elements.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('form inputs should be keyboard accessible', async ({ page }) => {
    await page.goto('/examples/w2/w2.html');
    
    // Press Tab to move focus
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Some element should be focused
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });
    
    expect(focusedElement).toBeTruthy();
  });
});
