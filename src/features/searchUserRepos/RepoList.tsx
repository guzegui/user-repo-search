import { RepoListItem } from "./RepoListItem";
import type { GitHubRepoNode } from "../../types/github";

/** Props for the RepoList component. */
interface RepoListProps {
  /** An array of GitHub repository nodes to display in the list. */
  repos: GitHubRepoNode[];
}

/**
 * Displays a list of GitHub repositories using `RepoListItem` components.
 *
 * @param props - The props for the component.
 * @returns A div containing a list of repository cards.
 */
export function RepoList({ repos }: RepoListProps): React.JSX.Element {
  return (
    <div className="space-y-3">
      {repos.map((repo) => (
        <RepoListItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
