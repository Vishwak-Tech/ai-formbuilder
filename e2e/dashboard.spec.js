
import { test, expect } from "@playwright/test";

test("authenticated user can open the dashboard", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(
    page.getByRole("heading", { name: "Dashboard" })
  ).toBeVisible();

  await expect(
    page.getByText(
      "Manage your AI-generated forms, monitor submissions, and share forms with your audience."
    )
  ).toBeVisible();
});
