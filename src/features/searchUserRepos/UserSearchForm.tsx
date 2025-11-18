import { useState } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserSearchFormProps {
  onSearch: (username: string) => void;
}

export function UserSearchForm({ onSearch }: UserSearchFormProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!username.trim()) return;
    onSearch(username.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <div className="flex-1">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          GitHub username
        </label>
        <Input
          placeholder="e.g. octocat"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="sm:pt-5">
        <Button type="submit" className="w-full sm:w-auto">
          Search
        </Button>
      </div>
    </form>
  );
}
