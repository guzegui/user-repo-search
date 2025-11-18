import { useState } from "react";
import { UserSearchForm } from "./UserSearchForm";
import { RepoFilters } from "./RepoFilters";
import { RepoList } from "./RepoList";
import { useUserRepos } from "./hooks/userUserRepos";
import { filterRepos } from "./utils/filterRepos";

export function UserReposView() {
  const { user, repos, /* pageInfo, */ loading, error, searchUser } =
    useUserRepos();
  const [hasSearched, setHasSearched] = useState(false);

  const [nameFilter, setNameFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState<"all" | string>("all");

  const handleSearch = (username: string) => {
    searchUser(username);
    setHasSearched(true);
  };

  const filteredRepos = filterRepos(repos, nameFilter, languageFilter);

  return (
    <section className="space-y-6">
      <UserSearchForm onSearch={handleSearch} />

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-sm text-slate-500">Loading repositories…</div>
      )}

      {!loading && !error && !hasSearched && (
        <div className="text-sm text-slate-500">
          Enter a GitHub username above to see their public repositories.
        </div>
      )}

      {!loading && !error && hasSearched && repos.length === 0 && (
        <div className="text-sm text-slate-500">
          This user has no public repositories.
        </div>
      )}

      {/* User header (avatar + name) when data is available */}
      {user && (
        <div className="flex items-center gap-3">
          <img
            src={user.avatarUrl}
            alt={user.login}
            className="h-12 w-12 rounded-full border"
          />
          <div>
            <a
              href={user.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold hover:underline"
            >
              {user.name ?? user.login}
            </a>
            <div className="text-sm text-slate-500">@{user.login}</div>
            <div className="text-xs text-slate-400">
              {user.repositories.totalCount} public repos
            </div>
          </div>
        </div>
      )}

      {!loading && !error && repos.length > 0 && (
        <div className="space-y-4">
          <RepoFilters
            repos={repos}
            nameFilter={nameFilter}
            languageFilter={languageFilter}
            onNameFilterChange={setNameFilter}
            onLanguageFilterChange={setLanguageFilter}
          />
          <RepoList repos={filteredRepos} />
          {/* TODO: add "Load more" button if pageInfo?.hasNextPage is true */}
        </div>
      )}
    </section>
  );
}
