import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import CreateForm from "./CreateForm";

const { mockReturning, mockValues, mockInsert } = vi.hoisted(() => {
  const mockReturning = vi.fn();

  const mockValues = vi.fn(() => ({
    returning: mockReturning,
  }));

  const mockInsert = vi.fn(() => ({
    values: mockValues,
  }));

  return {
    mockReturning,
    mockValues,
    mockInsert,
  };
});

vi.mock("@/configs", () => ({
  db: {
    insert: mockInsert,
  },
}));

vi.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    user: {
      primaryEmailAddress: {
        emailAddress: "test@example.com",
      },
    },
  }),
}));

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("@/configs/AiModal", () => ({
  model: {
    generateContent: vi.fn(),
  },
}));

describe("CreateForm", () => {
  test("opens create form dialog when button is clicked", async () => {
    const user = userEvent.setup();

    render(<CreateForm />);

    await user.click(screen.getByRole("button", { name: /create form/i }));

    expect(
      screen.getByRole("heading", { name: /create new form/i }),
    ).toBeInTheDocument();
  });
  test("allows the user to enter a form description", async () => {
    const user = userEvent.setup();

    render(<CreateForm />);

    await user.click(screen.getByRole("button", { name: /create form/i }));

    const textarea = screen.getByPlaceholderText(
      /create an internship application form/i,
    );

    await user.type(textarea, "Create an internship application form");

    expect(textarea).toHaveValue("Create an internship application form");
  });

  test("does not generate a form when input is empty", async () => {
  const user = userEvent.setup();
  const { model } = await import("@/configs/AiModal");

  render(<CreateForm />);

  await user.click(
    screen.getByRole("button", { name: /create form/i }),
  );

  await user.click(
    screen.getByRole("button", { name: /generate form/i }),
  );

  expect(model.generateContent).not.toHaveBeenCalled();
});

test("shows loading state while generating a form", async () => {
  const user = userEvent.setup();

  let resolveGemini;

  const geminiPromise = new Promise((resolve) => {
    resolveGemini = resolve;
  });

  const { model } = await import("@/configs/AiModal");

  model.generateContent.mockReturnValue(geminiPromise);

  render(<CreateForm />);

  await user.click(
    screen.getByRole("button", { name: /create form/i }),
  );

  const textarea = screen.getByPlaceholderText(
    /create an internship application form/i,
  );

  await user.type(textarea, "Create an internship application form");

  await user.click(
    screen.getByRole("button", { name: /generate form/i }),
  );

  expect(
    screen.getByRole("button", { name: /generating/i }),
  ).toBeDisabled();

  resolveGemini();
});

test("generates a form and redirects to the edit page", async () => {
  const user = userEvent.setup();

  const { model } = await import("@/configs/AiModal");

  model.generateContent.mockResolvedValue({
    response: {
      text: async () =>
        JSON.stringify({
          formTitle: "Internship Application",
          description: "Application form",
          fields: [],
        }),
    },
  });

  mockReturning.mockResolvedValue([
    {
      id: "test-form-123",
    },
  ]);

  render(<CreateForm />);

  await user.click(screen.getByRole("button", { name: /create form/i }));

  const textarea = screen.getByPlaceholderText(
    /create an internship application form/i
  );

  await user.type(
    textarea,
    "Create an internship application form"
  );

  await user.click(
    screen.getByRole("button", { name: /generate form/i })
  );

  await waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith(
      "/edit-form/test-form-123"
    );
  });
});
test("saves the generated form data to the database", async () => {
  const user = userEvent.setup();

  const { model } = await import("@/configs/AiModal");

  const formSchema = {
    formTitle: "Internship Application",
    description: "Application form",
    fields: [],
  };

  model.generateContent.mockResolvedValue({
    response: {
      text: async () => JSON.stringify(formSchema),
    },
  });

  mockReturning.mockResolvedValue([
    {
      id: "test-form-123",
    },
  ]);

  render(<CreateForm />);

  await user.click(
    screen.getByRole("button", { name: /create form/i })
  );

  const textarea = screen.getByPlaceholderText(
    /create an internship application form/i
  );

  await user.type(
    textarea,
    "Create an internship application form"
  );

  await user.click(
    screen.getByRole("button", { name: /generate form/i })
  );

  await waitFor(() => {
    expect(mockValues).toHaveBeenCalledWith({
      formTitle: "Internship Application",
      jsonForm: JSON.stringify(formSchema),
      createdBy: "test@example.com",
    });
  });
});
test("stops loading when form generation fails", async () => {
  const user = userEvent.setup();

  const { model } = await import("@/configs/AiModal");

  model.generateContent.mockRejectedValue(
    new Error("Gemini API failed")
  );

  render(<CreateForm />);

  await user.click(
    screen.getByRole("button", { name: /create form/i })
  );

  const textarea = screen.getByPlaceholderText(
    /create an internship application form/i
  );

  await user.type(
    textarea,
    "Create an internship application form"
  );

  await user.click(
    screen.getByRole("button", { name: /generate form/i })
  );

  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: /generate form/i })
    ).not.toBeDisabled();
  });
});
});
