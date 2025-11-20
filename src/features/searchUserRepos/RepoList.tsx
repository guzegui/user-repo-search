import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RepoListItem } from "./RepoListItem";
import type { GitHubRepoNode } from "../../types/github";
import { Button } from "@/components/ui/button";

/** Props for the RepoList component. */
interface RepoListProps {
  /** An array of GitHub repository nodes to display in the list. */
  repos: GitHubRepoNode[];
  /** Indicates if more repositories are available to fetch. */
  canLoadMore?: boolean;
  /** Indicates if the "load more" action is in progress. */
  loadingMore?: boolean;
  /** Callback to fetch additional repositories. */
  onLoadMore?: () => void;
}

/**
 * Displays a list of GitHub repositories using `RepoListItem` components with optional pagination controls.
 *
 * @param props - The props for the component.
 * @returns A div containing a list of repository cards.
 */
export function RepoList({
  repos,
  canLoadMore = false,
  loadingMore = false,
  onLoadMore,
}: RepoListProps): React.JSX.Element {
  const previousRepoIdsRef = useRef<Set<string>>(new Set());
  const previousRepoIds = previousRepoIdsRef.current;
  const isInitialMount = previousRepoIds.size === 0;

  useEffect(() => {
    previousRepoIdsRef.current = new Set(repos.map((repo) => repo.id));
  }, [repos]);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {repos.map((repo, index) => {
          const isNewRepo = !previousRepoIds.has(repo.id);

          const delay = isInitialMount
            ? index * 0.06
            : isNewRepo
              ? 0.05
              : 0;

          return (
            <motion.div
              key={repo.id}
              initial={
                isInitialMount || isNewRepo
                  ? { opacity: 0, x: -16 }
                  : false
              }
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay,
              }}
            >
              <RepoListItem repo={repo} />
            </motion.div>
          );
        })}
      </div>

      {canLoadMore && onLoadMore && (
        <div className="text-center">
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
          >
            <Button
              type="button"
              variant="outline"
              onClick={onLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading more..." : "Load more repositories"}
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
