import { describe, expect, it } from "vitest";
import { formatDate, formatDuration, formatPrice, formatTime } from "./format";

describe("format helpers", () => {
  it("formats a date", () => {
    expect(formatDate("2026-11-12T09:00:00")).toBe("Thu 12 Nov");
  });

  it("formats a time", () => {
    expect(formatTime("2026-11-12T09:05:00")).toBe("09:05");
  });

  it("formats a price in euro", () => {
    expect(formatPrice(199.99)).toBe("€199.99");
  });

  it("shows a dash when the price is missing", () => {
    expect(formatPrice(undefined)).toBe("–");
  });

  it("formats a duration", () => {
    expect(formatDuration("2026-11-12T09:00:00", "2026-11-12T11:20:00")).toBe("2h 20m");
  });
});