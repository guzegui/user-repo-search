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
  const gridKey =
    repos.length > 0 ? repos.map((repo) => repo.id).join("-") : "empty";

  const loadMoreButton =
    canLoadMore && onLoadMore ? (
      <div className="text-center">
        <Button
          type="button"
          variant="outline"
          onClick={onLoadMore}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading more..." : "Load 20 more repositories"}
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
      <motion.div
        key={gridKey}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.05 },
          },
        }}
      >
        {repos.map((repo) => (
          <motion.div
            key={repo.id}
            variants={{
              hidden: { opacity: 0, y: 12, scale: 0.97 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.35, ease: "easeOut" },
              },
            }}
          >
            <RepoListItem repo={repo} />
          </motion.div>
        ))}
      </motion.div>

      {loadMoreButton}
    </div>
  );
}
