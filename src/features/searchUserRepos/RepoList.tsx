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
  const listKey =
    repos.length > 0 ? repos.map((repo) => repo.id).join("-") : "empty";

  return (
    <div className="space-y-4">
      <motion.div
        key={listKey}
        className="space-y-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.05 },
          },
        }}
      >
        {repos.map((repo) => (
          <motion.div
            key={repo.id}
            variants={{
              hidden: { opacity: 0, x: -16 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.3, ease: "easeOut" },
              },
            }}
          >
            <RepoListItem repo={repo} />
          </motion.div>
        ))}
      </motion.div>

      {canLoadMore && onLoadMore && (
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
      )}
    </div>
  );
}
