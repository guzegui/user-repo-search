import type { GitHubUser, GitHubRepoNode } from "./github";
import type { RawNodeDatum } from "react-d3-tree";

/** Props for the RepoTreeDiagram component. */
export interface RepoTreeDiagramProps {
  /** The GitHub user object for the root of the tree. */
  user: GitHubUser;
  /** An array of GitHub repository nodes to display in the tree. */
  repos: GitHubRepoNode[];
  /** Optional callback function triggered when a repository node is selected. */
  onSelectRepo?: (repo: GitHubRepoNode | null) => void;
}

/**
 * Attributes for a node in the repository tree diagram.
 * Extends a generic record to allow for additional properties.
 */
export type RepoTreeNodeAttributes = {
  type?: "user" | "language" | "repo";
  repoId?: string;
} & Record<string, string | number | boolean | undefined>;

/**
 * Represents a node in the D3 tree structure.
 * Mirrors the react-d3-tree RawNodeDatum shape.
 */
export interface TreeNode extends RawNodeDatum {
  /** Optional children nodes for the current node. */
  children?: TreeNode[];
}

/** Options for building the repository tree structure. */
export interface BuildRepoTreeOptions {
  /** Specifies how to sort languages in the tree. */
  sortLanguagesBy?: "name" | "repoCount";
  /** Specifies how to sort repositories within each language. */
  sortReposBy?: "name" | "stars";
}
