import { defineConfig } from '@playwright/test';

const baseURL = process.env['PLAYWRIGHT_BASE_URL'] ?? 'http://127.0.0.1:4200';
export default defineConfig({
  testDir: './tests/browser',
  timeout: 45000,
  fullyParallel: false,
  workers: 2,
  reporter: 'list',
  outputDir: 'test-results',
  use: {
    baseURL,
    headless: true,
    launchOptions: {
      executablePath: process.env['PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH'] || undefined,
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    },
    trace: 'retain-on-failure',
  },
  webServer: process.env['PLAYWRIGHT_BASE_URL']
    ? undefined
    : {
        command: 'npm start -- --port 4200',
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120000,
      },
});
