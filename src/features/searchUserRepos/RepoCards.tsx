import { motion } from "framer-motion";
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
export function RepoCards({ repos }: RepoCardsProps): React.JSX.Element {
  if (!repos.length) {
    return (
      <div className="text-sm text-slate-500">
        No repositories match the current filters.
      </div>
    );
  }

  return (
    <motion.div
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
  );
}
