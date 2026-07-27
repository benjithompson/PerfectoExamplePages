import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the BlazeMeter Tech College "Apply Now" flow.
 *
 * Self-contained: this folder has its own package.json so it can be zipped and
 * uploaded to BlazeMeter (or run standalone) without the rest of the repo.
 *
 * BASE_URL points at the deployed example by default. Override it to test a
 * local copy:  BASE_URL=http://localhost:8000/examples/college/ npx playwright test
 * Taurus passes this through from `settings.env.BASE_URL` in blazemeter.yml.
 */
const DEFAULT_BASE_URL = 'https://benjithompson.github.io/PerfectoExamplePages/examples/college/';

// Specs use relative paths ('apply.html'), so the base must end in a slash or
// the last path segment gets replaced during URL resolution.
const BASE_URL = (process.env.BASE_URL || DEFAULT_BASE_URL).replace(/\/?$/, '/');

export default defineConfig({
  testDir: '.',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  /* Names match the `browser:` value in blazemeter.yml (Taurus maps it to --project). */
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
