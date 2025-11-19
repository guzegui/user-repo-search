/** Represents a single GitHub repository node in the GraphQL API. */
export interface GitHubRepoNode {
  /** The unique identifier of the repository. */
  id: string;
  /** The name of the repository. */
  name: string;
  /** The URL of the repository on GitHub. */
  url: string;
  /** The description of the repository, or null if not provided. */
  description: string | null;
  /** The date and time when the repository was last updated (ISO 8601 format). */
  updatedAt: string;
  /** The number of stars the repository has. */
  stargazerCount: number;
  /** The primary programming language of the repository, or null if not detected. */
  primaryLanguage: {
    /** The name of the primary language. */
    name: string;
    /** The color associated with the primary language. */
    color: string;
  } | null;
}

/** Represents pagination information for a GitHub API connection. */
export interface GitHubPageInfo {
  /** Indicates if there is a next page of results. */
  hasNextPage: boolean;
  /** The cursor to use for fetching the next page of results, or null if no more pages. */
  endCursor: string | null;
}

/** Represents the connection for a user's repositories in the GitHub GraphQL API. */
export interface GitHubUserRepositoriesConnection {
  /** The total count of repositories for the user. */
  totalCount: number;
  /** Pagination information for the repository list. */
  pageInfo: GitHubPageInfo;
  /** An array of GitHub repository nodes. */
  nodes: GitHubRepoNode[];
}

/** Represents a GitHub user object in the GraphQL API. */
export interface GitHubUser {
  /** The user's login username. */
  login: string;
  /** The user's public name, or null if not provided. */
  name: string | null;
  /** The URL to the user's avatar image. */
  avatarUrl: string;
  /** The URL to the user's profile on GitHub. */
  url: string;
  /** The connection object for the user's repositories. */
  repositories: GitHubUserRepositoriesConnection;
}

/** The data structure for the `GetUserReposForUi` GraphQL query response data. */
export interface GetUserReposForUiData {
  /** The GitHub user object, or null if not found. */
  user: GitHubUser | null;
}

/** The full response structure for the `GetUserReposForUi` GraphQL query. */
export interface GetUserReposForUiResponse {
  /** The data returned by the GraphQL query. */
  data: GetUserReposForUiData;
  /** An optional array of errors returned by the GraphQL API. */
  errors?: { message: string }[];
}
