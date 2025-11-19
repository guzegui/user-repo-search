import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RepoList } from "./RepoList";
import type { GitHubRepoNode } from "@/types/github";

const repos: GitHubRepoNode[] = [
  {
    id: "1",
    name: "alpha",
    url: "https://example.com/alpha",
    description: "Alpha repo",
    updatedAt: "2024-01-02T00:00:00Z",
    stargazerCount: 1,
    primaryLanguage: { name: "TypeScript", color: "" },
  },
  {
    id: "2",
    name: "beta",
    url: "https://example.com/beta",
    description: "Beta repo",
    updatedAt: "2024-01-03T00:00:00Z",
    stargazerCount: 2,
    primaryLanguage: null,
  },
];

describe("RepoList", () => {
  it("renders a RepoListItem for each repository", () => {
    render(<RepoList repos={repos} />);
    expect(screen.getByText("alpha")).toBeInTheDocument();
    expect(screen.getByText("beta")).toBeInTheDocument();
    expect(screen.getAllByText(/stars/)).toHaveLength(2);
  });
});
