import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router-dom";

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

beforeEach(() => {
  mockedNavigate.mockClear();
});

describe("HomePage", () => {
  it("renders the search form", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/GitHub Explorer/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g. octocat")).toBeInTheDocument();
  });

  it("navigates to the search page when submitting a username", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText("e.g. octocat"), "  codex  ");
    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(mockedNavigate).toHaveBeenCalledWith("/search/codex");
  });
});
