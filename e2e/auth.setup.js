import { test as setup, expect } from "@playwright/test";
import fs from "node:fs";

const authFile = "playwright/.auth/user.json";

setup("authenticate user", async ({ page }) => {
  setup.setTimeout(180_000);
  fs.mkdirSync("playwright/.auth", { recursive: true });

  await page.goto("/sign-in");
  await page.pause(); // Sign in in this Playwright browser, then resume.

  await page.goto("/dashboard");

  // Verify access before saving storage state.
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(
    page.getByRole("heading", { name: "Dashboard" })
  ).toBeVisible();

  await page.context().storageState({ path: authFile });
});