import { describe, expect, it } from "vitest";
import { curvedPath, distanceKm } from "./geo";
import { rome, stockholm } from "@/test/fixtures";

describe("geo helpers", () => {
  it("measures the real distance from Stockholm to Rome", () => {
    const km = distanceKm(stockholm, rome);

    expect(km).toBeGreaterThan(2000);
    expect(km).toBeLessThan(2050);
  });

  it("starts the curve at the first airport and ends it at the second", () => {
    const path = curvedPath(stockholm, rome);

    expect(path[0]).toEqual([stockholm.latitude, stockholm.longitude]);
    expect(path[path.length - 1]).toEqual([rome.latitude, rome.longitude]);
  });
});