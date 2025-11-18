import type { GetUserReposForUiResponse, GitHubUser } from "@/types/github";
import { GET_USER_REPOS_FOR_UI } from "./queries";
const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

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
