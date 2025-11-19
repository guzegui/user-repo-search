import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { UserReposView } from "../features/searchUserRepos/UserReposView";

interface SearchPageParams extends Record<string, string | undefined> {
  username: string;
}

export function SearchPage() {
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
