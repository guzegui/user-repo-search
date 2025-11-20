import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RepoListItem } from "./RepoListItem";
import type { GitHubRepoNode } from "../../types/github";
import { Button } from "@/components/ui/button";

/** Props for the RepoCards component. */
interface RepoCardsProps {
  /** An array of GitHub repository nodes to display as cards. */
  repos: GitHubRepoNode[];
  /** Indicates if additional repositories can be loaded. */
  canLoadMore?: boolean;
  /** Indicates if the "load more" action is in progress. */
  loadingMore?: boolean;
  /** Callback to fetch another page of repositories. */
  onLoadMore?: () => void;
}

/**
 * Displays a grid of GitHub repositories using `RepoListItem` components.
 * Shows a message if no repositories match the current filters and optionally renders pagination controls.
 *
 * @param props - The props for the component.
 * @returns A grid of repository cards or a message.
 */
export function RepoCards({
  repos,
  canLoadMore = false,
  loadingMore = false,
  onLoadMore,
}: RepoCardsProps): React.JSX.Element {
  const previousRepoIdsRef = useRef<Set<string>>(new Set());
  const previousRepoIds = previousRepoIdsRef.current;
  const isInitialMount = previousRepoIds.size === 0;

  useEffect(() => {
    previousRepoIdsRef.current = new Set(repos.map((repo) => repo.id));
  }, [repos]);

  const loadMoreButton =
    canLoadMore && onLoadMore ? (
      <div className="text-center">
        <Button
          type="button"
          variant="outline"
          onClick={onLoadMore}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading more..." : "Load more repositories"}
        </Button>
      </div>
    ) : null;

  if (!repos.length) {
    return (
      <div className="space-y-3">
        <div className="text-sm text-slate-500">
          No repositories match the current filters.
        </div>
        {loadMoreButton}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo, index) => {
          const isNewRepo = !previousRepoIds.has(repo.id);
          const delay = isInitialMount
            ? index * 0.08
            : isNewRepo
              ? 0.05
              : 0;

          return (
            <motion.div
              key={repo.id}
              initial={
                isInitialMount || isNewRepo
                  ? { opacity: 0, y: 12, scale: 0.97 }
                  : false
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay,
              }}
            >
              <RepoListItem repo={repo} />
            </motion.div>
          );
        })}
      </div>

      {loadMoreButton && (
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
        >
          {loadMoreButton}
        </motion.div>
      )}
    </div>
  );
}
