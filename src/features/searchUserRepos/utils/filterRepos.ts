import type { GitHubRepoNode } from "@/types/github";

// Filter by name and primary language
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
