import type { TreeNode, BuildRepoTreeOptions } from "@/types/treeDiagram";
import type { GitHubUser, GitHubRepoNode } from "../../../types/github";

/**
 * Builds a hierarchical tree structure of a user's GitHub repositories,
 * grouped by primary language, suitable for use with `react-d3-tree`.
 *
 * The tree structure is: User (root) -> Language (branch) -> Repository (leaf).
 *
 * @function
 * @param user - The GitHub user object to be the root of the tree.
 * @param repos - An array of GitHub repository nodes to include in the tree.
 * @param options - Optional configuration for sorting languages and repositories.
 * @returns The root node of the constructed tree.
 */
export function buildRepoTree(
  user: GitHubUser,
  repos: GitHubRepoNode[],
  options: BuildRepoTreeOptions = {}
): TreeNode {
  const { sortLanguagesBy = "name", sortReposBy = "stars" } = options;

  // 1. Group repos by language
  const byLanguage = new Map<string, GitHubRepoNode[]>();

  repos.forEach((repo) => {
    const lang = repo.primaryLanguage?.name ?? "Other";
    if (!byLanguage.has(lang)) byLanguage.set(lang, []);
    byLanguage.get(lang)!.push(repo);
  });

  // 2. Sort languages
  const languageEntries = Array.from(byLanguage.entries());

  languageEntries.sort(([langA, reposA], [langB, reposB]) => {
    if (sortLanguagesBy === "repoCount") {
      return reposB.length - reposA.length; // desc by repo count
    }
    // default: alphabetical by name
    return langA.localeCompare(langB);
  });

  // 3. Build children nodes for each language, including sorted repos
  const languageNodes: TreeNode[] = languageEntries.map(
    ([language, languageRepos]) => {
      const sortedRepos = [...languageRepos].sort((a, b) => {
        if (sortReposBy === "name") {
          return a.name.localeCompare(b.name);
        }
        // default: by stars desc, then name
        if (b.stargazerCount !== a.stargazerCount) {
          return b.stargazerCount - a.stargazerCount;
        }
        return a.name.localeCompare(b.name);
      });

      const repoChildren: TreeNode[] = sortedRepos.map((repo) => ({
        name: repo.name,
        attributes: {
          type: "repo",
          repoId: repo.id,
          url: repo.url,
          stars: repo.stargazerCount,
          updatedAt: repo.updatedAt,
          primaryLanguage: repo.primaryLanguage?.name ?? "",
        },
      }));

      return {
        name: language,
        attributes: {
          type: "language",
          languageName: language,
          repoCount: sortedRepos.length,
        },
        children: repoChildren,
      };
    }
  );

  // 4. Root node = user
  return {
    name: user.login,
    attributes: {
      type: "user",
      displayName: user.name ?? user.login,
      avatarUrl: user.avatarUrl,
      profileUrl: user.url,
      totalRepos: user.repositories.totalCount,
    },
    children: languageNodes,
  };
}
