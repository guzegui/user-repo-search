import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GitHubRepoNode } from "../../types/github";

/** Props for the RepoFilters component. */
interface RepoFiltersProps {
  /** The full list of repositories to extract available languages from. */
  repos: GitHubRepoNode[];
  /** The current filter string for repository names. */
  nameFilter: string;
  /** The current filter string for primary language, or "all". */
  languageFilter: string | "all";
  /** Callback function to update the name filter. */
  onNameFilterChange: (value: string) => void;
  /** Callback function to update the language filter. */
  onLanguageFilterChange: (value: string | "all") => void;
}

/**
 * Provides UI controls for filtering a list of GitHub repositories by name and primary language.
 *
 * @param props - The props for the component.
 * @returns A set of input fields and a select dropdown for repository filtering.
 */
export function RepoFilters({
  repos,
  nameFilter,
  languageFilter,
  onNameFilterChange,
  onLanguageFilterChange,
}: RepoFiltersProps): JSX.Element {
  // Extract unique languages from the provided repositories
  const languages = Array.from(
    new Set(
      repos
        .map((r) => r.primaryLanguage?.name)
        .filter((lang): lang is string => Boolean(lang))
    )
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Filter by name
        </label>
        <Input
          placeholder="Type repo name…"
          value={nameFilter}
          onChange={(e) => onNameFilterChange(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-48">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Language
        </label>
        <Select
          value={languageFilter}
          onValueChange={(value) =>
            onLanguageFilterChange(value as string | "all")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All languages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All languages</SelectItem>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
