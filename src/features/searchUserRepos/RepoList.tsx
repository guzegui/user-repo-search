import { motion } from "framer-motion";
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
    <motion.div
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
  );
}
