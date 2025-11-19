import { useState, useCallback } from "react";
import { fetchUserReposGraphql } from "@/api/githubGraphqlClient";
import type {
  GitHubRepoNode,
  GitHubUser,
  GitHubPageInfo,
} from "@/types/github";

interface UseUserReposState {
  user: GitHubUser | null;
  repos: GitHubRepoNode[];
  pageInfo: GitHubPageInfo | null;
  loading: boolean;
  error: string | null;
}

// Fetches user-owned public repos from GitHub
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
