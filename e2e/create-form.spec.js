
import { test, expect } from "@playwright/test";

test("user can open and cancel the Create Form dialog", async ({ page }) => {
  await page.goto("/dashboard");

  await page.getByRole("button", { name: "Create Form" }).click();

  await expect(
    page.getByRole("heading", { name: "Create New Form" })
  ).toBeVisible();

  const description = page.getByPlaceholder(
    /Create an internship application form/i
  );

  await description.fill(
    "Create a student feedback form with name, email, and feedback."
  );

  await expect(description).toHaveValue(
    "Create a student feedback form with name, email, and feedback."
  );

  await page.getByRole("button", { name: "Cancel" }).click();

  await expect(
    page.getByRole("heading", { name: "Create New Form" })
  ).not.toBeVisible();
});


test("Generate Form button shows a loading state", async ({ page }) => {
  let releaseRequest;

  const pendingRequest = new Promise((resolve) => {
    releaseRequest = resolve;
  });

  await page.route("**/v1beta/models/**:generateContent", async (route) => {
    await pendingRequest;
    await route.abort();
  });

  try {
    await page.goto("/dashboard");

    await page.getByRole("button", { name: "Create Form" }).click();

    await page
      .getByPlaceholder(/Create an internship application form/i)
      .fill("Create a student feedback form.");

    await page.getByRole("button", { name: /Generate Form/ }).click();

    const generatingButton = page.getByRole("button", {
      name: "Generating...",
    });

    await expect(generatingButton).toBeVisible();
    await expect(generatingButton).toBeDisabled();
  } finally {
    releaseRequest();
  }
});

test("Generate Form button recovers when Gemini request fails", async ({
  page,
}) => {
  await page.route("**/v1beta/models/**:generateContent", async (route) => {
    await route.abort();
  });

  await page.goto("/dashboard");

  await page.getByRole("button", { name: "Create Form" }).click();

  await page
    .getByPlaceholder(/Create an internship application form/i)
    .fill("Create a student feedback form.");

  await page.getByRole("button", { name: /Generate Form/ }).click();

  // The request fails, so the loading state should eventually end.
  await expect(
    page.getByRole("button", { name: "Generate Form" })
  ).toBeEnabled({ timeout: 15000 });
});