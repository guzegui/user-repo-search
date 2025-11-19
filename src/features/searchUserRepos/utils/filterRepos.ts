import type { GitHubRepoNode } from "@/types/github";

/**
 * Filters a list of GitHub repositories based on a name query and primary language.
 *
 * @function
 * @param repos - The array of GitHub repository nodes to filter.
 * @param nameQuery - The search query string for repository names.
 * @param language - The primary language to filter by, or "all" to include all languages.
 * @returns An array of filtered GitHub repository nodes.
 */
export function filterRepos(
  repos: GitHubRepoNode[],
  nameQuery: string,
  language: string | "all"
): GitHubRepoNode[] {
  const query = nameQuery.trim().toLowerCase();

  return repos.filter((repo) => {
    const matchesName = query
      ? repo.name.toLowerCase().includes(query)
      : true;

    const repoLanguage = repo.primaryLanguage?.name ?? "";
    const matchesLanguage =
      language === "all" || !language
        ? true
        : repoLanguage.toLowerCase() === language.toLowerCase();

    return matchesName && matchesLanguage;
  });
}
