import { RepoListItem } from "./RepoListItem";
import type { GitHubRepoNode } from "../../types/github";

interface RepoCardsProps {
  repos: GitHubRepoNode[];
}

export function RepoCards({ repos }: RepoCardsProps) {
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
