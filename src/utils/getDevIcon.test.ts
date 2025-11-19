import { describe, expect, it, vi } from "vitest";

vi.mock("@/data/devicon.json", () => ({
  default: [
    { name: "typescript", tags: ["ts"] },
    { name: "cplusplus", tags: ["cpp", "cplusplus"] },
    { name: "csharp", tags: ["csharp"] },
  ],
}));

import { getDeviconForLanguage } from "./getDevIcon";

describe("getDeviconForLanguage", () => {
  it("returns the CDN url for an exact match", () => {
    expect(getDeviconForLanguage("TypeScript")).toContain("/typescript/typescript-plain.svg");
  });

  it("normalizes special characters when searching", () => {
    expect(getDeviconForLanguage("C++")).toContain("/cplusplus/cplusplus-plain.svg");
    expect(getDeviconForLanguage("C#")).toContain("/csharp/csharp-plain.svg");
  });

  it("returns null when no icon matches", () => {
    expect(getDeviconForLanguage("MadeUpLang")).toBeNull();
  });
});
