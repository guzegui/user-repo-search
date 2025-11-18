import { RepoListItem } from "./RepoListItem";
import type { GitHubRepoNode } from "../../types/github";

interface RepoListProps {
  repos: GitHubRepoNode[];
}

export function RepoList({ repos }: RepoListProps) {
  return (
    <div className="space-y-3">
      {repos.map((repo) => (
        <RepoListItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
