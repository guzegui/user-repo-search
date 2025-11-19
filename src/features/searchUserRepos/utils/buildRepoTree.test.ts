import { describe, expect, it } from "vitest";
import { buildRepoTree } from "./buildRepoTree";
import type { GitHubRepoNode, GitHubUser } from "@/types/github";

const baseUser: GitHubUser = {
  login: "octocat",
  name: "The Octocat",
  avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
  url: "https://github.com/octocat",
  repositories: {
    totalCount: 2,
    pageInfo: {
      hasNextPage: false,
      endCursor: null,
    },
    nodes: [],
  },
};

const createRepo = (overrides: Partial<GitHubRepoNode> = {}): GitHubRepoNode => ({
  id: `repo-${overrides.name ?? "repo"}`,
  name: "repo",
  url: "https://github.com/octocat/repo",
  description: null,
  updatedAt: "2024-01-01T00:00:00Z",
  stargazerCount: 10,
  primaryLanguage: { name: "TypeScript", color: "#3178c6" },
  ...overrides,
});

describe("buildRepoTree", () => {
  it("groups repositories by language and attaches metadata", () => {
    const user = { ...baseUser };
    const repos = [
      createRepo({ name: "api", primaryLanguage: { name: "TypeScript", color: "" } }),
      createRepo({
        name: "cli",
        primaryLanguage: { name: "Go", color: "" },
        stargazerCount: 5,
      }),
    ];

    const tree = buildRepoTree(user, repos);

    expect(tree.name).toBe("octocat");
    expect(tree.attributes).toMatchObject({
      type: "user",
      displayName: "The Octocat",
      totalRepos: 2,
    });

    expect(tree.children).toHaveLength(2);
    const tsNode = tree.children?.find((child) => child.name === "TypeScript");
    expect(tsNode?.attributes).toMatchObject({
      type: "language",
      languageName: "TypeScript",
      repoCount: 1,
    });
    expect(tsNode?.children?.[0].attributes).toMatchObject({
      type: "repo",
      repoId: "repo-api",
      stars: 10,
    });
  });

  it("sorts languages alphabetically and repos by stars by default", () => {
    const repos = [
      createRepo({
        name: "low-stars",
        stargazerCount: 1,
        primaryLanguage: { name: "B", color: "" },
      }),
      createRepo({
        name: "high-stars",
        stargazerCount: 50,
        primaryLanguage: { name: "B", color: "" },
      }),
      createRepo({
        name: "alpha",
        primaryLanguage: { name: "A", color: "" },
      }),
    ];

    const tree = buildRepoTree(baseUser, repos);

    expect(tree.children?.map((child) => child.name)).toEqual(["A", "B"]);
    const repoNames = tree.children?.find((child) => child.name === "B")?.children?.map((c) => c.name);
    expect(repoNames).toEqual(["high-stars", "low-stars"]);
  });
});
