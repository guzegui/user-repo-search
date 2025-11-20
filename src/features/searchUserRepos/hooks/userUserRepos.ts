import { useState, useCallback } from "react";
import { fetchUserReposGraphql } from "@/api/githubGraphqlClient";
import type {
  GitHubRepoNode,
  GitHubUser,
  GitHubPageInfo,
} from "@/types/github";

/** Represents the state managed by the `useUserRepos` hook. */
interface UseUserReposState {
  /** The fetched GitHub user object, or null if not yet fetched or an error occurred. */
  user: GitHubUser | null;
  /** An array of GitHub repository nodes for the user. */
  repos: GitHubRepoNode[];
  /** Pagination information for the fetched repositories, or null. */
  pageInfo: GitHubPageInfo | null;
  /** The login of the last searched user, used for pagination requests. */
  login: string | null;
  /** Indicates if data is currently being loaded. */
  loading: boolean;
  /** Indicates if additional pages are currently being fetched. */
  loadingMore: boolean;
  /** Any error message that occurred during fetching, or null. */
  error: string | null;
}

/**
 * A custom React hook for fetching a user's public GitHub repositories.
 * It manages loading, error, pagination state, and exposes helpers to request additional pages.
 *
 * @hook
 * @returns An object containing the user data, repositories, pagination info, loading states, and functions to search/load more.
 */
export function useUserRepos() {
  const [state, setState] = useState<UseUserReposState>({
    user: null,
    repos: [],
    pageInfo: null,
    login: null,
    loading: false,
    loadingMore: false,
    error: null,
  });

  const searchUser = useCallback(async (login: string) => {
    if (!login.trim()) return;

    const sanitizedLogin = login.trim();

    setState((prev) => ({
      ...prev,
      loading: true,
      loadingMore: false,
      error: null,
    }));

    try {
      const user = await fetchUserReposGraphql(sanitizedLogin, 20, null);

      setState({
        user,
        repos: user.repositories.nodes,
        pageInfo: user.repositories.pageInfo,
        login: sanitizedLogin,
        loading: false,
        loadingMore: false,
        error: null,
      });
    } catch (err) {
      setState({
        user: null,
        repos: [],
        pageInfo: null,
        login: null,
        loading: false,
        loadingMore: false,
        error: (err as Error).message,
      });
    }
  }, [setState]); // setState is stable, so searchUser will only be created once

  const loadMore = useCallback(async () => {
    if (
      !state.login ||
      state.loading ||
      state.loadingMore ||
      !state.pageInfo?.hasNextPage
    ) {
      return;
    }

    const cursor = state.pageInfo.endCursor;
    if (!cursor) {
      return;
    }

    setState((prev) => ({
      ...prev,
      loadingMore: true,
      error: null,
    }));

    try {
      const user = await fetchUserReposGraphql(state.login, 20, cursor);

      setState((prev) => ({
        user,
        repos: [...prev.repos, ...user.repositories.nodes],
        pageInfo: user.repositories.pageInfo,
        login: state.login,
        loading: false,
        loadingMore: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loadingMore: false,
        error: (err as Error).message,
      }));
    }
  }, [
    state.login,
    state.loading,
    state.loadingMore,
    state.pageInfo,
    setState,
  ]);

  return {
    user: state.user,
    repos: state.repos,
    pageInfo: state.pageInfo,
    loading: state.loading,
    loadingMore: state.loadingMore,
    error: state.error,
    searchUser,
    loadMore,
  };
}
