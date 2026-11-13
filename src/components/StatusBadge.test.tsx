import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusBadge from "./StatusBadge";
import type { FlightStatus } from "@/lib/api/types";

function makeStatus(overrides: Partial<FlightStatus> = {}): FlightStatus {
  return {
    flightId: 1,
    flightNumber: "SB101",
    status: "ON_TIME",
    delayMinutes: 0,
    expectedDeparture: "2026-11-12T09:00:00",
    ...overrides,
  };
}

describe("StatusBadge", () => {
  it("shows 'On time'", () => {
    render(<StatusBadge status={makeStatus()} />);

    expect(screen.getByText("On time")).toBeInTheDocument();
  });

  it("shows the delay and the new departure time", () => {
    render(
      <StatusBadge
        status={makeStatus({ status: "DELAYED", delayMinutes: 25, expectedDeparture: "2026-11-12T09:25:00" })}
      />,
    );

    expect(screen.getByText("Delayed 25 min · 09:25")).toBeInTheDocument();
  });

  it("shows nothing when there is no live status", () => {
    const { container } = render(<StatusBadge />);

    expect(container).toBeEmptyDOMElement();
  });
});