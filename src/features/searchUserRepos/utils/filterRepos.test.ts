import { describe, expect, it } from "vitest";
import { filterRepos } from "./filterRepos";
import type { GitHubRepoNode } from "@/types/github";

let counter = 0;
const createRepo = (overrides: Partial<GitHubRepoNode> = {}): GitHubRepoNode => ({
  id: `repo-${counter++}`,
  name: "Repo",
  url: "https://github.com/example/repo",
  description: null,
  updatedAt: "2024-01-01T00:00:00Z",
  stargazerCount: 0,
  primaryLanguage: {
    name: "TypeScript",
    color: "#3178c6",
  },
  ...overrides,
});

describe("filterRepos", () => {
  it("filters repositories by name substring", () => {
    const repos = [
      createRepo({ id: "1", name: "React Toolkit" }),
      createRepo({ id: "2", name: "Next Starter" }),
    ];

    const result = filterRepos(repos, "react", "all");

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("React Toolkit");
  });

  it("filters repositories by language ignoring case", () => {
    const repos = [
      createRepo({ id: "1", name: "App A", primaryLanguage: { name: "TypeScript", color: "" } }),
      createRepo({ id: "2", name: "App B", primaryLanguage: { name: "Go", color: "" } }),
    ];

    const result = filterRepos(repos, "", "typescript");

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("App A");
  });

  it("returns all repos when no filter is provided", () => {
    const repos = [createRepo({ id: "1" }), createRepo({ id: "2" })];

    expect(filterRepos(repos, "   ", "all")).toHaveLength(2);
  });
});
