import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SearchPage } from "./SearchPage";

vi.mock("../features/searchUserRepos/UserReposView", () => ({
  UserReposView: ({ initialUsername }: { initialUsername: string }) => (
    <div data-testid="user-repos-view">{initialUsername}</div>
  ),
}));

describe("SearchPage", () => {
  it("shows an error when username param is missing", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Username not provided/i)).toBeInTheDocument();
  });

  it("renders UserReposView when username is provided", () => {
    render(
      <MemoryRouter initialEntries={["/search/octocat"]}>
        <Routes>
          <Route path="/search/:username" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("user-repos-view")).toHaveTextContent("octocat");
  });
});
