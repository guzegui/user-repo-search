import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines Tailwind CSS classes using `clsx` for conditional classes
 * and `tailwind-merge` to resolve conflicts, ensuring the final class string is optimized.
 *
 * @param inputs - An array of class values (strings, objects, arrays) to combine.
 * @returns The merged and optimized Tailwind CSS class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
