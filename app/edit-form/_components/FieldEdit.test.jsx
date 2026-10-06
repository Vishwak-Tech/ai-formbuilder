import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import FieldEdit from "./FieldEdit";

describe("FieldEdit", () => {
  test("renders Edit Field button", () => {
    const field = {
      label: "Name",
      placeholder: "Enter your name",
    };

    render(
      <FieldEdit
        field={field}
        onUpdate={vi.fn()}
        index={0}
        deleteField={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /edit field/i }),
    ).toBeInTheDocument();
  });

  test("opens edit field popover when clicked", async () => {
    const user = userEvent.setup();

    const field = {
      label: "Name",
      placeholder: "Enter your name",
    };

    render(
      <FieldEdit
        field={field}
        onUpdate={vi.fn()}
        index={0}
        deleteField={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /edit field/i }),
    );

    expect(screen.getByText("Edit Field")).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Name"),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Enter your name"),
    ).toBeInTheDocument();
  });

  test("updates field when user edits and saves", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();

    const field = {
      label: "Name",
      placeholder: "Enter your name",
    };

    render(
      <FieldEdit
        field={field}
        onUpdate={onUpdate}
        index={0}
        deleteField={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /edit field/i }),
    );

    const labelInput = screen.getByDisplayValue("Name");
    const placeholderInput = screen.getByDisplayValue(
      "Enter your name",
    );

    await user.clear(labelInput);
    await user.type(labelInput, "Full Name");

    await user.clear(placeholderInput);
    await user.type(
      placeholderInput,
      "Enter your full name",
    );

    await user.click(
      screen.getByRole("button", { name: /save/i }),
    );

    expect(onUpdate).toHaveBeenCalledWith(
      {
        label: "Full Name",
        placeholder: "Enter your full name",
      },
      0,
    );
  });

  test("deletes field after confirmation", async () => {
    const user = userEvent.setup();
    const deleteField = vi.fn();

    const field = {
      label: "Name",
      placeholder: "Enter your name",
    };

    render(
      <FieldEdit
        field={field}
        onUpdate={vi.fn()}
        index={0}
        deleteField={deleteField}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /delete field/i }),
    );

    expect(
      screen.getByText("Delete this field?"),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /^delete$/i }),
    );

    expect(deleteField).toHaveBeenCalled();
  });
});