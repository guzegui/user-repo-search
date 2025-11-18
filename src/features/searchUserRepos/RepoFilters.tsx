import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GitHubRepoNode } from "../../types/github";

interface RepoFiltersProps {
  repos: GitHubRepoNode[];
  nameFilter: string;
  languageFilter: string | "all";
  onNameFilterChange: (value: string) => void;
  onLanguageFilterChange: (value: string | "all") => void;
}

export function RepoFilters({
  repos,
  nameFilter,
  languageFilter,
  onNameFilterChange,
  onLanguageFilterChange,
}: RepoFiltersProps) {
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
