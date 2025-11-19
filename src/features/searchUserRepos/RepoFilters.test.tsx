import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RepoFilters } from "./RepoFilters";
import type { GitHubRepoNode } from "@/types/github";

const repos: GitHubRepoNode[] = [
  {
    id: "1",
    name: "alpha",
    url: "https://example.com/alpha",
    description: null,
    updatedAt: "2024-01-02T00:00:00Z",
    stargazerCount: 5,
    primaryLanguage: { name: "TypeScript", color: "" },
  },
  {
    id: "2",
    name: "beta",
    url: "https://example.com/beta",
    description: null,
    updatedAt: "2024-01-02T00:00:00Z",
    stargazerCount: 3,
    primaryLanguage: { name: "Go", color: "" },
  },
];

describe("RepoFilters", () => {
  it("calls callbacks when filters change", async () => {
    const onNameFilterChange = vi.fn();
    const onLanguageFilterChange = vi.fn();

    const user = userEvent.setup();
    render(
      <RepoFiltersHarness
        onNameFilterChange={onNameFilterChange}
        onLanguageFilterChange={onLanguageFilterChange}
      />
    );

    const input = screen.getByPlaceholderText("Type repo name…");
    await user.type(input, "react");
    expect(onNameFilterChange).toHaveBeenLastCalledWith("react");

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);
    const option = await screen.findByRole("option", { name: "TypeScript" });
    await user.click(option);

    expect(onLanguageFilterChange).toHaveBeenCalledWith("TypeScript");
  });
});

function RepoFiltersHarness({
  onNameFilterChange,
  onLanguageFilterChange,
}: {
  onNameFilterChange: (value: string) => void;
  onLanguageFilterChange: (value: string | "all") => void;
}) {
  const [nameFilter, setNameFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState<"all" | string>("all");

  return (
    <RepoFilters
      repos={repos}
      nameFilter={nameFilter}
      languageFilter={languageFilter}
      onNameFilterChange={(value) => {
        setNameFilter(value);
        onNameFilterChange(value);
      }}
      onLanguageFilterChange={(value) => {
        setLanguageFilter(value);
        onLanguageFilterChange(value);
      }}
    />
  );
}
