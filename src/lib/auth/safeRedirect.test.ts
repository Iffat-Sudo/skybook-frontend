import { describe, expect, it } from "vitest";
import { safeRedirect } from "./safeRedirect";

describe("safeRedirect", () => {
  it("allows a path inside SkyBook", () => {
    expect(safeRedirect("/bookings")).toBe("/bookings");
  });

  it("blocks another website", () => {
    expect(safeRedirect("https://evil.com")).toBe("/");
  });

  it("blocks a sneaky '//' link to another website", () => {
    expect(safeRedirect("//evil.com")).toBe("/");
  });

  it("goes home when there is no next page", () => {
    expect(safeRedirect(undefined)).toBe("/");
  });
});