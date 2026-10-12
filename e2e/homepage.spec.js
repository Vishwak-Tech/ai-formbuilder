import { test, expect } from "@playwright/test";

test("homepage displays the correct title and hero content", async ({
  page,
}) => {
  await page.goto("/");

  // Verify document title
  await expect(page).toHaveTitle("AI Form Builder");

  // Verify the main heading is visible
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /The Fastest Way.*to Build Forms.*with AI/i,
    }),
  ).toBeVisible();

  // Verify the Create AI Form link
  await expect(
    page.getByRole("link", { name: /Create AI Form/i }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: /Create AI Form/i }),
  ).toHaveAttribute("href", "/dashboard");
});


test("Create AI Form sends unauthenticated users to sign-in", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Create AI Form/i }).click();
  await expect(page).toHaveURL(/\/sign-in/);
});


test("homepage displays the How It Works section", async ({ page }) => {
  await page.goto("/");

  // Verify the section heading
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: /Build Beautiful Forms.*In Under 60 Seconds/i,
    })
  ).toBeVisible();

  // Verify all three feature cards
  await expect(
    page.getByRole("heading", { name: "Describe Your Idea" })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Customize Everything" })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Publish & Collect" })
  ).toBeVisible();

  // Verify the section's CTA
  await expect(
    page.getByRole("link", { name: /Create Your First AI Form/i })
  ).toBeVisible();
  
await expect(
  page.getByRole("link", { name: /Create Your First AI Form/i })
).toHaveAttribute("href", "/dashboard");

});


test("full homepage renders all major sections", async ({ page }) => {
  await page.goto("/");

  // 1. Verify the document title
  await expect(page).toHaveTitle("AI Form Builder");

  // 2. Verify the Hero section
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /The Fastest Way.*to Build Forms.*with AI/i,
    })
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: /Create AI Form/i })
  ).toBeVisible();

  // 3. Verify the How It Works section
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: /Build Beautiful Forms.*In Under 60 Seconds/i,
    })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Describe Your Idea" })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Customize Everything" })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Publish & Collect" })
  ).toBeVisible();

  // 4. Verify the Footer
  const footer = page.locator("footer");

  await expect(footer).toBeVisible();
  await expect(
    footer.getByRole("heading", { name: "FormCraft" })
  ).toBeVisible();

  await expect(
    footer.getByText("All Systems Operational")
  ).toBeVisible();

  await expect(
    footer.getByText(/All rights reserved/)
  ).toBeVisible();

  // 5. Verify key footer navigation links
  await expect(
    footer.getByRole("link", { name: "Dashboard" })
  ).toHaveAttribute("href", "/dashboard");

  await expect(
    footer.getByRole("link", { name: "Pricing" })
  ).toHaveAttribute("href", "/dashboard/upgrade");
});
