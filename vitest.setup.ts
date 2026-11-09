import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// After each test, remove what we showed on the fake screen
afterEach(() => {
  cleanup();
});