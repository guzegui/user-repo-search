import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Provide a lightweight ResizeObserver mock for Radix UI components used in tests.
class ResizeObserverMock implements ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

if (!("ResizeObserver" in window)) {
  // @ts-expect-error - assigning to global window for test environment
  window.ResizeObserver = ResizeObserverMock;
}

// Some Radix components rely on scrollIntoView; JSDOM may not implement it.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

// Ensure React Testing Library cleans up between tests.
afterEach(() => {
  cleanup();
});

// --- Radix UI / pointer events polyfill for JSDOM ---
// JSDOM doesn't implement these, but Radix uses them.
// We just define no-op versions so the code doesn't crash.

if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}

if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {};
}

if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {};
}
