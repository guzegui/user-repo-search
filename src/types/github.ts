export interface GitHubRepoNode {
  id: string;
  name: string;
  url: string;
  description: string | null;
  updatedAt: string;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

export interface GitHubPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface GitHubUserRepositoriesConnection {
  totalCount: number;
  pageInfo: GitHubPageInfo;
  nodes: GitHubRepoNode[];
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  repositories: GitHubUserRepositoriesConnection;
}

export interface GetUserReposForUiData {
  user: GitHubUser | null;
}

export interface GetUserReposForUiResponse {
  data: GetUserReposForUiData;
  errors?: { message: string }[];
}
