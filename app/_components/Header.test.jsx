import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Header from "./Header";

const mockUseUser = vi.fn();
const mockUsePathname = vi.fn();

vi.mock("@clerk/nextjs", () => ({
  useUser: () => mockUseUser(),
  UserButton: () => <div>UserButton</div>,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("Header", () => {
  test("shows Get Started button when user is signed out", () => {
    mockUseUser.mockReturnValue({
      isSignedIn: false,
    });

    mockUsePathname.mockReturnValue("/");

    render(<Header />);

    expect(
      screen.getByRole("link", { name: /get started/i }),
    ).toBeInTheDocument();
    expect(
    screen.getByRole("link", { name: /get started/i }),
    ).toHaveAttribute("href", "/sign-in");
  });

  test("shows Dashboard when user is signed in", () => {
    mockUseUser.mockReturnValue({
      isSignedIn: true,
    });

    mockUsePathname.mockReturnValue("/");

    render(<Header />);

    expect(
      screen.getByRole("link", { name: /dashboard/i }),
    ).toBeInTheDocument();
  });

  test("hides header on public AI form pages", () => {
    mockUseUser.mockReturnValue({
      isSignedIn: true,
    });

    mockUsePathname.mockReturnValue("/aiform/test-form");

    render(<Header />);

    expect(
      screen.queryByRole("link", { name: /dashboard/i }),
    ).not.toBeInTheDocument();
  });
});