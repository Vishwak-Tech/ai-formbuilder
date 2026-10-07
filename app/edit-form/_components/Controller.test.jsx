import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import Controller from "./Controller";

describe("Controller", () => {
  test("renders theme, background, and style sections", () => {
    render(
      <Controller
        selectedTheme="light"
        setSelectedTheme={vi.fn()}
        selectedBackground=""
        setSelectedBackground={vi.fn()}
        selectedStyle=""
        setSelectedStyle={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: /select theme/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /background/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /style/i })).toBeInTheDocument();
  });

  test("calls setSelectedTheme when a theme is clicked", async () => {
    const user = userEvent.setup();
    const setSelectedTheme = vi.fn();

    render(
      <Controller
        selectedTheme="light"
        setSelectedTheme={setSelectedTheme}
        selectedBackground=""
        setSelectedBackground={vi.fn()}
        selectedStyle=""
        setSelectedStyle={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /dark/i }));

    expect(setSelectedTheme).toHaveBeenCalledWith("dark");
  });
  test("calls setSelectedBackground when a background is clicked", async () => {
    const user = userEvent.setup();
    const setSelectedBackground = vi.fn();

    render(
      <Controller
        selectedTheme="light"
        setSelectedTheme={vi.fn()}
        selectedBackground="none"
        setSelectedBackground={setSelectedBackground}
        selectedStyle=""
        setSelectedStyle={vi.fn()}
      />,
    );
    await user.click(
      screen.getByRole("button", { name: /select sky background/i }),
    );

    expect(setSelectedBackground).toHaveBeenCalledWith("sky");
  });
  test("calls setSelectedStyle when a style is clicked", async () => {
    const user = userEvent.setup();
    const setSelectedStyle = vi.fn();

    render(
      <Controller
        selectedTheme="light"
        setSelectedTheme={vi.fn()}
        selectedBackground="none"
        setSelectedBackground={vi.fn()}
        selectedStyle="minimal"
        setSelectedStyle={setSelectedStyle}
      />,
    );

    await user.click(screen.getByRole("button", { name: /rounded/i }));

    expect(setSelectedStyle).toHaveBeenCalledWith("rounded");
  });
  test("applies selected styling to the selected theme", () => {
    render(
      <Controller
        selectedTheme="light"
        setSelectedTheme={vi.fn()}
        selectedBackground="none"
        setSelectedBackground={vi.fn()}
        selectedStyle="minimal"
        setSelectedStyle={vi.fn()}
      />,
    );

    const lightButton = screen.getByRole("button", {
      name: /light/i,
    });

    expect(lightButton).toHaveClass("border-black");
  });
});
