import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e", // our end-to-end tests live in the "e2e" folder
  timeout: 60_000, // the free backend can be slow, so give each test up to 1 minute
  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure", // if a test fails, take a picture
    trace: "retain-on-failure", // ...and record every step, so we can see what went wrong
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev", // start the frontend if it's not running
    url: "http://localhost:3000",
    reuseExistingServer: true, // or use the one that is already running
    timeout: 120_000,
  },
});