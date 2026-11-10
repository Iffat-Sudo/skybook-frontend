import { expect, test } from "@playwright/test";

test("My bookings asks you to log in first", async ({ page }) => {
  await page.goto("/bookings");

  await expect(page).toHaveURL(/\/login\?next=%2Fbookings/);
});

test("the search form opens the results page", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel(/^To/).selectOption("LHR");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page).toHaveURL(/to=LHR/);
  await expect(
    page.getByRole("heading", { name: "Stockholm → London" }),
  ).toBeVisible();
});

test("a new user can search, book a flight and see it in My bookings", async ({
  page,
}) => {
  // A new email every time, so the test always starts fresh
  const email = `e2e-${Date.now()}@example.com`;

  // 1. Register
  await page.goto("/register");
  await page.getByLabel("Full name").fill("Playwright Tester");
  await page.getByLabel("Email").fill(email);
  await page
    .getByLabel("Password (at least 8 characters)")
    .fill("Playwright2026!");
  await page.getByLabel("Repeat password").fill("Playwright2026!");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText("Hi, Playwright")).toBeVisible();

  // 2. Search all flights from Stockholm (any city, any date)
  await page.goto("/results?from=ARN&passengers=1");
  const firstFlight = page.locator("article").first();
  await expect(firstFlight).toBeVisible();
  const flightNumber =
    (await firstFlight.textContent())?.match(/SB\d+/)?.[0] ?? "";
  expect(flightNumber).toMatch(/SB\d+/);

  // 3. Book it
  await firstFlight.getByRole("link", { name: "Select" }).click();
  await expect(
    page.getByRole("heading", { name: "Book your flight" }),
  ).toBeVisible();
  await expect(page.getByLabel("Full name")).toHaveValue("Playwright Tester");
  await page.getByRole("button", { name: /Book now/ }).click();
  await expect(page.getByText("Booking confirmed!")).toBeVisible();

  // 4. Check My bookings
  await page.getByRole("link", { name: "See my bookings" }).click();
  await expect(
    page.getByRole("heading", { name: "Upcoming (1)" }),
  ).toBeVisible();
  await expect(
    page.locator("article").filter({ hasText: flightNumber }),
  ).toBeVisible();
});
