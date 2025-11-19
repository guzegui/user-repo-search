import type { GetUserReposForUiResponse, GitHubUser } from "@/types/github";
import { GET_USER_REPOS_FOR_UI } from "./queries";
const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

/**
 * Fetches a GitHub user's public repositories using the GitHub GraphQL API.
 * Requires a GitHub Personal Access Token (PAT) to be set as an environment variable `VITE_GITHUB_PAT`.
 *
 * @async
 * @function
 * @param login - The GitHub username to search for.
 * @param first - The number of repositories to fetch per request.
 * @param after - The cursor for pagination, to fetch repositories after this point.
 * @returns A promise that resolves to the GitHubUser object including their repositories.
 * @throws If the GitHub token is missing, a network error occurs, or a GraphQL error is returned.
 */
export async function fetchUserReposGraphql(
  login: string,
  first = 20,
  after: string | null = null
): Promise<GitHubUser> {
  const token = import.meta.env.VITE_GITHUB_PAT;

  if (!token) {
    throw new Error(
      "GitHub token missing. Set VITE_GITHUB_PAT in your .env file."
    );
  }

  const res = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: GET_USER_REPOS_FOR_UI,
      variables: { login, first, after },
    }),
  });

  if (!res.ok) {
    throw new Error(`Network error: ${res.status} ${res.statusText}`);
  }

  const json: GetUserReposForUiResponse = await res.json();

  if (json.errors && json.errors.length > 0) {
    // GraphQL-level errors
    const message = json.errors.map((e) => e.message).join("; ");
    throw new Error(message || "GraphQL error");
  }

  if (!json.data.user) {
    // likely "not found"
    throw new Error("User not found");
  }

  return json.data.user;
}
