import devicon from "@/data/devicon.json";

function normalizeLanguageName(input: string): string {
  return input
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/\#/g, "sharp")
    .replace(/[^a-z0-9]/g, "");
}

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
