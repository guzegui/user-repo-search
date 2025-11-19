import { useState } from "react";
import { UserSearchForm } from "./UserSearchForm";
import { RepoFilters } from "./RepoFilters";
import { useUserRepos } from "./hooks/userUserRepos";
import { filterRepos } from "./utils/filterRepos";
import { RepoTreeDiagram } from "./RepoTreeDiagram";
import { RepoList } from "./RepoList";
import { Button } from "@/components/ui/button";
import type { GitHubRepoNode } from "../../types/github";

type ViewMode = "tree" | "list";

export function UserReposView() {
  const { user, repos, loading, error, searchUser } = useUserRepos();
  const [hasSearched, setHasSearched] = useState(false);

  const [nameFilter, setNameFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState<"all" | string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("tree");
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepoNode | null>(null);

  const handleSearch = (username: string) => {
    searchUser(username);
    setHasSearched(true);
    setSelectedRepo(null);
  };

  const filteredRepos = filterRepos(repos, nameFilter, languageFilter);
  const showContent = !loading && !error && repos.length > 0;

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

      {/* User header */}
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

      {/* Filters + view toggle + content */}
      {showContent && user && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <RepoFilters
              repos={repos}
              nameFilter={nameFilter}
              languageFilter={languageFilter}
              onNameFilterChange={setNameFilter}
              onLanguageFilterChange={setLanguageFilter}
            />
            <div className="flex gap-2 self-end sm:self-auto">
              <Button
                type="button"
                size="sm"
                variant={viewMode === "tree" ? "default" : "outline"}
                onClick={() => setViewMode("tree")}
              >
                Tree view
              </Button>
              <Button
                type="button"
                size="sm"
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
              >
                List view
              </Button>
            </div>
          </div>

          {viewMode === "tree" ? (
            <RepoTreeDiagram
              user={user}
              repos={filteredRepos}
              onSelectRepo={setSelectedRepo}
            />
          ) : (
            <RepoList repos={filteredRepos} />
          )}

          {/* Details panel when a repo is selected from the tree */}
          {viewMode === "tree" && selectedRepo && (
            <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <a
                  href={selectedRepo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline-offset-2 hover:underline"
                >
                  {selectedRepo.name}
                </a>
                {selectedRepo.primaryLanguage && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: selectedRepo.primaryLanguage.color,
                      }}
                    />
                    {selectedRepo.primaryLanguage.name}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-slate-700">
                {selectedRepo.description || "No description provided."}
              </p>
              <div className="mt-2 flex gap-4 text-xs text-slate-500">
                <span>★ {selectedRepo.stargazerCount} stars</span>
                <span>
                  Updated{" "}
                  {new Date(selectedRepo.updatedAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
