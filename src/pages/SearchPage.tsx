import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { UserReposView } from "../features/searchUserRepos/UserReposView";

/** Defines the parameters expected in the URL for the SearchPage. */
interface SearchPageParams extends Record<string, string | undefined> {
  /** The GitHub username to search for, extracted from the URL path. */
  username: string;
}

/**
 * The search results page component.
 * It extracts the username from the URL parameters and displays the `UserReposView`.
 *
 * @returns The search page with a header and user repository view.
 */
export function SearchPage(): JSX.Element {
  const { username } = useParams<SearchPageParams>();

  if (!username) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-red-500">
        Username not provided in URL.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <UserReposView initialUsername={username} />
      </main>
    </div>
  );
}
