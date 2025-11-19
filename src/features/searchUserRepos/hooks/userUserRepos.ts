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
  /** Indicates if data is currently being loaded. */
  loading: boolean;
  /** Any error message that occurred during fetching, or null. */
  error: string | null;
}

/**
 * A custom React hook for fetching a user's public GitHub repositories.
 * It manages loading, error, and data states for the user and their repositories.
 *
 * @hook
 * @returns An object containing the user data, repositories, loading state, error state, and a search function.
 */
export function useUserRepos() {
  const [state, setState] = useState<UseUserReposState>({
    user: null,
    repos: [],
    pageInfo: null,
    loading: false,
    error: null,
  });

  const searchUser = useCallback(async (login: string) => {
    if (!login.trim()) return;

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const user = await fetchUserReposGraphql(login.trim(), 20, null);

      setState({
        user,
        repos: user.repositories.nodes,
        pageInfo: user.repositories.pageInfo,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState({
        user: null,
        repos: [],
        pageInfo: null,
        loading: false,
        error: (err as Error).message,
      });
    }
  }, [setState]); // setState is stable, so searchUser will only be created once

  return {
    user: state.user,
    repos: state.repos,
    pageInfo: state.pageInfo, // TODO: add pagination
    loading: state.loading,
    error: state.error,
    searchUser,
  };
}
