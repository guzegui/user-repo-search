import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RepoCards } from "./RepoCards";
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

describe("RepoCards", () => {
  it("renders repositories in a grid", () => {
    render(<RepoCards repos={repos} />);
    expect(screen.getByText("alpha")).toBeInTheDocument();
    expect(screen.getByText("beta")).toBeInTheDocument();
  });

  it("reveals newly provided repositories on rerender", () => {
    const { rerender } = render(<RepoCards repos={[repos[0]]} />);

    expect(screen.getByText("alpha")).toBeInTheDocument();
    expect(screen.queryByText("beta")).not.toBeInTheDocument();

    rerender(<RepoCards repos={repos} />);

    expect(screen.getByText("alpha")).toBeInTheDocument();
    expect(screen.getByText("beta")).toBeInTheDocument();
  });

  it("renders a load more button when pagination props are set", () => {
    const onLoadMore = vi.fn();
    render(
      <RepoCards
        repos={repos}
        canLoadMore
        loadingMore={false}
        onLoadMore={onLoadMore}
      />
    );

    expect(screen.getByTestId("load-more-button")).toBeInTheDocument();
  });
});
