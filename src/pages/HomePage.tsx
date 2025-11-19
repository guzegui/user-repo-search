import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * The home page component, providing a user interface to search for GitHub repositories by username.
 * Users can input a username and submit the form to navigate to the search results page.
 *
 * @returns The home page with a search input and button.
 */
export function HomePage(): JSX.Element {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!username.trim()) return;
    navigate(`/search/${username.trim()}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-2">
        GitHub Explorer
      </h1>
      <p className="text-lg text-slate-500 mb-8">
        Search repositories by username
      </p>
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-3">
        <Input
          placeholder="e.g. octocat"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </form>
    </main>
  );
}
