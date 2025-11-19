import type { GitHubUser, GitHubRepoNode } from "./github";
import type { RawNodeDatum } from "react-d3-tree";

export interface RepoTreeDiagramProps {
  user: GitHubUser;
  repos: GitHubRepoNode[];
  onSelectRepo?: (repo: GitHubRepoNode | null) => void;
}

export type RepoTreeNodeAttributes = {
  type?: "user" | "language" | "repo";
  repoId?: string;
} & Record<string, string | number | boolean | undefined>;

// Mirror the react-d3-tree node shape so `Tree` accepts data without casting.
export interface TreeNode extends RawNodeDatum {
  children?: TreeNode[];
}

export interface BuildRepoTreeOptions {
  sortLanguagesBy?: "name" | "repoCount";
  sortReposBy?: "name" | "stars";
}