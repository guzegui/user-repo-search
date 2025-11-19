import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import type { GitHubRepoNode } from "../../types/github";

/** Props for the RepoListItem component. */
interface RepoListItemProps {
  /** The GitHub repository node to display. */
  repo: GitHubRepoNode;
}

/**
 * Displays a single GitHub repository as a card.
 *
 * @param props - The props for the component.
 * @returns A card displaying repository information.
 */
export function RepoListItem({ repo }: RepoListItemProps): React.JSX.Element {
  const updatedDate = new Date(repo.updatedAt).toLocaleDateString();
  const languageName = repo.primaryLanguage?.name ?? null;
  const languageColor = repo.primaryLanguage?.color ?? "#e2e8f0"; // slate-200-ish

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-base">
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:underline"
          >
            {repo.name}
          </a>
        </CardTitle>
        {languageName && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: languageColor }}
            />
            {languageName}
          </span>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        <CardDescription>
          {repo.description || "No description provided."}
        </CardDescription>
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          <span>★ {repo.stargazerCount} stars</span>
          <span>Updated {updatedDate}</span>
        </div>
      </CardContent>
    </Card>
  );
}
