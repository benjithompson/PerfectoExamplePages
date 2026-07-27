import { test, expect } from '@playwright/test';

/**
 * BlazeMeter Tech College - Apply Now flow
 *
 * Walks the full admissions path a prospective student takes:
 *   home -> admissions -> apply -> contact form -> emailed-link interstitial
 *   -> personal info -> program & term -> education history -> review -> confirmation
 *
 * Everything is client-side, so the assertions are about what the page shows,
 * not about any network response.
 *
 * Paths are relative to BASE_URL (see playwright.config.js), which points at the
 * deployed example by default.
 */

const HOME = 'index.html';
const APPLY = 'apply.html';

const applicant = {
  firstName: 'Alex',
  lastName: 'Rivera',
  email: 'alex.rivera@example.com',
  phone: '(555) 010-0134',
  campusType: 'Degree Seeking-Ashford',
  dob: '2008-04-11',
  ssn: '123456789',
  address: '42 Main Street',
  city: 'Ashford',
  state: 'Lakeland',
  zip: '10101',
  residency: 'Yes – in-state tuition',
  citizenship: 'U.S. Citizen',
  entryTerm: 'Fall 2026',
  program: 'A.A.S. Computer Information Systems',
  enrollmentStatus: 'Full-time (12+ credits)',
  studentType: 'New Student',
  highSchool: 'Ashford High School',
  gradYear: '2026'
};

/** Step 1 of the wizard: the contact form that gates the application. */
async function fillContactForm(page, overrides = {}) {
  const data = { ...applicant, ...overrides };
  await page.fill('#firstName', data.firstName);
  await page.fill('#lastName', data.lastName);
  await page.fill('#email', data.email);
  await page.fill('#phone', data.phone);
  await page.selectOption('#campusType', data.campusType);
  await page.check('#acknowledge');
}

async function fillPersonalInfo(page) {
  await page.fill('#dob', applicant.dob);
  await page.fill('#ssn', applicant.ssn);
  await page.fill('#address', applicant.address);
  await page.fill('#city', applicant.city);
  await page.selectOption('#state', applicant.state);
  await page.fill('#zip', applicant.zip);
  await page.selectOption('#residency', applicant.residency);
  await page.selectOption('#citizenship', applicant.citizenship);
}

async function fillProgram(page) {
  await page.selectOption('#entryTerm', applicant.entryTerm);
  await page.selectOption('#program', applicant.program);
  await page.selectOption('#enrollmentStatus', applicant.enrollmentStatus);
  await page.selectOption('#studentType', applicant.studentType);
  await page.check('#promise');
}

async function fillEducation(page, { priorCollege = 'No', priorCollegeName = '' } = {}) {
  await page.fill('#highSchool', applicant.highSchool);
  await page.fill('#gradYear', applicant.gradYear);
  await page.selectOption('#priorCollege', priorCollege);
  if (priorCollege === 'Yes') await page.fill('#priorCollegeName', priorCollegeName);
}

test.describe('Apply Now flow', () => {
  test('navigates from the home page to the application', async ({ page }) => {
    await page.goto(HOME);
    await expect(page).toHaveTitle(/BlazeMeter Tech/);

    await page.click('#cta-apply');
    await expect(page).toHaveURL(/apply\.html$/);
    await expect(page.locator('#step-contact .card-header')).toHaveText(/Application Contact Form/);
  });

  test('reaches the application via the admissions page', async ({ page }) => {
    await page.goto(HOME);
    await page.click('#cta-inquire');
    await expect(page).toHaveURL(/admissions\.html$/);
    await expect(page.getByRole('heading', { name: 'Admissions', level: 1 })).toBeVisible();

    await page.click('#apply-now-button');
    await expect(page).toHaveURL(/apply\.html$/);
  });

  test('completes the whole application and issues an application number', async ({ page }) => {
    await page.goto(APPLY);

    // --- Step 1: contact form -------------------------------------------
    await expect(page.locator('#stepper li[aria-current="step"]')).toHaveText(/Contact Form/);
    await fillContactForm(page);
    await page.click('#contact-submit');

    // --- Emailed-link interstitial --------------------------------------
    await expect(page.locator('#step-emailed')).toBeVisible();
    await expect(page.locator('#emailed-message'))
      .toHaveText(new RegExp(`Thank you, ${applicant.firstName}.*${applicant.email}`));
    await page.click('#continue-to-application');

    // --- Step 2: personal info (prefilled from the contact form) ---------
    await expect(page.locator('#step-personal')).toBeVisible();
    await expect(page.locator('#p-firstName')).toHaveValue(applicant.firstName);
    await expect(page.locator('#p-lastName')).toHaveValue(applicant.lastName);
    await expect(page.locator('#campus')).toHaveValue('Ashford'); // derived from campus + student type

    await fillPersonalInfo(page);
    await expect(page.locator('#ssn')).toHaveValue('123-45-6789'); // auto-formatted while typing
    await page.click('#personal-form button[type="submit"]');

    // --- Step 3: program and term ---------------------------------------
    await expect(page.locator('#step-program')).toBeVisible();
    await fillProgram(page);
    await page.click('#program-form button[type="submit"]');

    // --- Step 4: education history --------------------------------------
    await expect(page.locator('#step-education')).toBeVisible();
    await fillEducation(page);
    await page.click('#education-form button[type="submit"]');

    // --- Step 5: review --------------------------------------------------
    await expect(page.locator('#step-review')).toBeVisible();
    const review = page.locator('#review-table tbody');
    await expect(review).toContainText(`${applicant.firstName} ${applicant.lastName}`);
    await expect(review).toContainText(applicant.email);
    await expect(review).toContainText(applicant.program);
    await expect(review).toContainText(applicant.entryTerm);
    await expect(review).toContainText('Promise Scholarship');

    await page.check('#certify');
    await page.fill('#signature', `${applicant.firstName} ${applicant.lastName}`);
    await page.click('#submit-application');

    // --- Confirmation ----------------------------------------------------
    await expect(page.locator('#step-confirmation')).toBeVisible();
    await expect(page.locator('#confirmation-message')).toContainText('Your application has been received');

    const applicationId = await page.locator('#application-id').textContent();
    expect(applicationId).toMatch(/^APP-2026-\d{6}$/);

    const confirmation = page.locator('#confirmation-table tbody');
    await expect(confirmation).toContainText(applicationId);
    await expect(confirmation).toContainText(`${applicant.firstName} ${applicant.lastName}`);
    await expect(confirmation).toContainText(applicant.program);
    await expect(confirmation).toContainText('Submitted');

    // The confirmation hands off to the student portal.
    await page.click('#go-to-portal');
    await expect(page).toHaveURL(/login\.html$/);
  });

  test('blocks submission until every required contact field is valid', async ({ page }) => {
    await page.goto(APPLY);
    await page.click('#contact-submit');

    for (const id of ['firstName', 'lastName', 'email', 'phone', 'campusType', 'acknowledge']) {
      await expect(page.locator(`#${id}-error`)).toBeVisible();
    }
    await expect(page.locator('#step-emailed')).toBeHidden();

    // A malformed email and a short phone number are rejected too.
    await fillContactForm(page, { email: 'not-an-email', phone: '555' });
    await page.click('#contact-submit');
    await expect(page.locator('#email-error')).toHaveText(/valid personal email/);
    await expect(page.locator('#phone-error')).toHaveText(/10-digit/);
    await expect(page.locator('#step-emailed')).toBeHidden();
  });

  test('requires the previous college name only when one is declared', async ({ page }) => {
    await page.goto(APPLY);
    await fillContactForm(page);
    await page.click('#contact-submit');
    await page.click('#continue-to-application');
    await fillPersonalInfo(page);
    await page.click('#personal-form button[type="submit"]');
    await fillProgram(page);
    await page.click('#program-form button[type="submit"]');

    // Hidden by default...
    await expect(page.locator('#priorCollegeNameField')).toBeHidden();

    // ...revealed and required once the applicant says yes.
    await fillEducation(page, { priorCollege: 'Yes' });
    await expect(page.locator('#priorCollegeNameField')).toBeVisible();
    await page.click('#education-form button[type="submit"]');
    await expect(page.locator('#priorCollegeName-error')).toBeVisible();
    await expect(page.locator('#step-review')).toBeHidden();

    await page.fill('#priorCollegeName', 'Northvale Community College');
    await page.click('#education-form button[type="submit"]');
    await expect(page.locator('#step-review')).toBeVisible();
    await expect(page.locator('#review-table tbody')).toContainText('Northvale Community College');
  });

  test('rejects an electronic signature that does not match the applicant name', async ({ page }) => {
    await page.goto(APPLY);
    await fillContactForm(page);
    await page.click('#contact-submit');
    await page.click('#continue-to-application');
    await fillPersonalInfo(page);
    await page.click('#personal-form button[type="submit"]');
    await fillProgram(page);
    await page.click('#program-form button[type="submit"]');
    await fillEducation(page);
    await page.click('#education-form button[type="submit"]');

    await page.check('#certify');
    await page.fill('#signature', 'Somebody Else');
    await page.click('#submit-application');

    await expect(page.locator('#signature-error')).toBeVisible();
    await expect(page.locator('#step-confirmation')).toBeHidden();

    await page.fill('#signature', `${applicant.firstName} ${applicant.lastName}`);
    await page.click('#submit-application');
    await expect(page.locator('#step-confirmation')).toBeVisible();
  });
});
