import process from 'node:process';
import { defineConfig, devices } from '@playwright/test';

// Use a dedicated port so tests never reuse a running `pnpm dev` server (port 4321).
// Dev mode injects the Astro toolbar, which adds extra headings and skews axe results.
const E2E_PORT = Number(process.env.E2E_PORT || 4322);
const E2E_URL = `http://127.0.0.1:${E2E_PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: E2E_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `pnpm preview --host 127.0.0.1 --port ${E2E_PORT}`,
    url: E2E_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
