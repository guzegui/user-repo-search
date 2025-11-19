import devicon from "@/data/devicon.json";

/**
 * Normalizes a language name for matching against the devicon data.
 * This function converts the input to lowercase, replaces '+' with 'plus',
 * '#' with 'sharp', and removes any non-alphanumeric characters.
 *
 * @param input - The original language name.
 * @returns The normalized language name.
 */
function normalizeLanguageName(input: string): string {
  return input
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/\#/g, "sharp")
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Retrieves the CDN URL for a devicon icon based on a given language name.
 * It first attempts an exact match, then falls back to matching against tags.
 *
 * @param language - The name of the programming language.
 * @returns The URL to the SVG icon, or null if no matching icon is found.
 */
export function getDeviconForLanguage(language: string): string | null {
  if (!language) return null;

  const normalized = normalizeLanguageName(language);

  const exact = devicon.find((entry: any) => entry.name === normalized);
  const match =
    exact ??
    devicon.find((entry: any) =>
      entry.tags?.some((tag: string) => tag === normalized)
    );

  if (!match) return null;

  const slug = match.name;

  // Icons served from CDN.
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-plain.svg`;
}
