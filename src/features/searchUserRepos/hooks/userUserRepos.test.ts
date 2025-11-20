import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import type { GitHubUser, GitHubRepoNode } from "@/types/github";
import { fetchUserReposGraphql } from "@/api/githubGraphqlClient";
import { useUserRepos } from "./userUserRepos";

vi.mock("@/api/githubGraphqlClient", () => ({
  fetchUserReposGraphql: vi.fn(),
}));

const mockedFetch = vi.mocked(fetchUserReposGraphql);

const mockRepo = (overrides: Partial<GitHubRepoNode> = {}): GitHubRepoNode => ({
  id: "1",
  name: "hello-world",
  url: "https://github.com/octocat/hello-world",
  description: "Hello",
  updatedAt: "2024-01-01T00:00:00Z",
  stargazerCount: 5,
  primaryLanguage: { name: "TypeScript", color: "" },
  ...overrides,
});

const mockUser = (overrides: Partial<GitHubUser> = {}): GitHubUser => ({
  login: "octocat",
  name: "Octocat",
  avatarUrl: "https://github.com/octocat.png",
  url: "https://github.com/octocat",
  repositories: {
    totalCount: 1,
    pageInfo: { hasNextPage: false, endCursor: null },
    nodes: [mockRepo()],
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

  it("loads the next page of repositories when available", async () => {
    mockedFetch
      .mockResolvedValueOnce(
        mockUser({
          repositories: {
            totalCount: 2,
            pageInfo: { hasNextPage: true, endCursor: "cursor-1" },
            nodes: [mockRepo({ id: "1", name: "alpha" })],
          },
        })
      )
      .mockResolvedValueOnce(
        mockUser({
          repositories: {
            totalCount: 2,
            pageInfo: { hasNextPage: false, endCursor: null },
            nodes: [mockRepo({ id: "2", name: "beta" })],
          },
        })
      );

    const { result } = renderHook(() => useUserRepos());

    await act(async () => {
      await result.current.searchUser("octocat");
    });

    await act(async () => {
      await result.current.loadMore();
    });

    expect(mockedFetch).toHaveBeenLastCalledWith("octocat", 20, "cursor-1");
    expect(result.current.repos).toHaveLength(2);
    expect(result.current.repos.map((repo) => repo.name)).toEqual([
      "alpha",
      "beta",
    ]);
    expect(result.current.loadingMore).toBe(false);
  });

  it("does not load more when there is no next page", async () => {
    mockedFetch.mockResolvedValueOnce(
      mockUser({
        repositories: {
          totalCount: 1,
          pageInfo: { hasNextPage: false, endCursor: null },
          nodes: [mockRepo({ id: "1", name: "solo" })],
        },
      })
    );

    const { result } = renderHook(() => useUserRepos());

    await act(async () => {
      await result.current.searchUser("octocat");
    });

    await act(async () => {
      await result.current.loadMore();
    });

    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(result.current.repos).toHaveLength(1);
  });
});
