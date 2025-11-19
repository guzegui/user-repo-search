import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import type { GitHubUser } from "@/types/github";
import { fetchUserReposGraphql } from "@/api/githubGraphqlClient";
import { useUserRepos } from "./userUserRepos";

vi.mock("@/api/githubGraphqlClient", () => ({
  fetchUserReposGraphql: vi.fn(),
}));

const mockedFetch = vi.mocked(fetchUserReposGraphql);

const mockUser = (overrides: Partial<GitHubUser> = {}): GitHubUser => ({
  login: "octocat",
  name: "Octocat",
  avatarUrl: "https://github.com/octocat.png",
  url: "https://github.com/octocat",
  repositories: {
    totalCount: 1,
    pageInfo: { hasNextPage: false, endCursor: null },
    nodes: [
      {
        id: "1",
        name: "hello-world",
        url: "https://github.com/octocat/hello-world",
        description: "Hello",
        updatedAt: "2024-01-01T00:00:00Z",
        stargazerCount: 5,
        primaryLanguage: { name: "TypeScript", color: "" },
      },
    ],
  },
  ...overrides,
});

describe("useUserRepos", () => {
  beforeEach(() => {
    mockedFetch.mockReset();
  });

  it("fetches and stores user repositories", async () => {
    mockedFetch.mockResolvedValue(mockUser());

    const { result } = renderHook(() => useUserRepos());

    await act(async () => {
      await result.current.searchUser("octocat");
    });

    expect(mockedFetch).toHaveBeenCalledWith("octocat", 20, null);
    expect(result.current.user?.login).toBe("octocat");
    expect(result.current.repos).toHaveLength(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("captures errors thrown during fetch", async () => {
    mockedFetch.mockRejectedValue(new Error("User not found"));

    const { result } = renderHook(() => useUserRepos());

    await act(async () => {
      await result.current.searchUser("ghost");
    });

    expect(result.current.user).toBeNull();
    expect(result.current.repos).toHaveLength(0);
    expect(result.current.error).toBe("User not found");
  });
});
