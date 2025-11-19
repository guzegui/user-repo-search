import { RepoListItem } from "./RepoListItem";
import type { GitHubRepoNode } from "../../types/github";

/** Props for the RepoCards component. */
interface RepoCardsProps {
  /** An array of GitHub repository nodes to display as cards. */
  repos: GitHubRepoNode[];
}

/**
 * Displays a grid of GitHub repositories using `RepoListItem` components.
 * Shows a message if no repositories match the current filters.
 *
 * @param props - The props for the component.
 * @returns A grid of repository cards or a message.
 */
export function RepoCards({ repos }: RepoCardsProps): JSX.Element {
  if (!repos.length) {
    return (
      <div className="text-sm text-slate-500">
        No repositories match the current filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <RepoListItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
