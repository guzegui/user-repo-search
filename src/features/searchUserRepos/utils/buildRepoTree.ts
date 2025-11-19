import type { GitHubUser, GitHubRepoNode } from "../../../types/github";

// react-d3-tree expects this shape:
export interface TreeNode {
  name: string;
  attributes?: Record<string, string | number | boolean>;
  children?: TreeNode[];
}

interface BuildRepoTreeOptions {
  sortLanguagesBy?: "name" | "repoCount";
  sortReposBy?: "name" | "stars";
}

/**
 * Build hierarchical tree data:
 *
 * User
 *  ├─ Language A
 *  │    ├─ Repo 1
 *  │    └─ Repo 2
 *  └─ Language B
 *       └─ Repo 3
 *
 * All sorting/reordering is centralized here.
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
          stars: repo.stargazerCount,
          updatedAt: repo.updatedAt,
        },
      }));

      return {
        name: language,
        attributes: {
          type: "language",
          language,
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
      totalRepos: user.repositories.totalCount,
    },
    children: languageNodes,
  };
}
