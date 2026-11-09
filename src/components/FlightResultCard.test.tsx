import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import FlightResultCard from "./FlightResultCard";
import { makeFlight } from "@/test/fixtures";

describe("FlightResultCard", () => {
  it("shows the times, route and price", () => {
    render(<FlightResultCard flight={makeFlight()} passengers={1} />);

    expect(screen.getByText("09:00 → 12:00")).toBeInTheDocument();
    expect(screen.getByText(/Stockholm \(ARN\) → Rome \(FCO\)/)).toBeInTheDocument();
    expect(screen.getByText("€295.99")).toBeInTheDocument();
  });

  it("links to the booking page with the number of passengers", () => {
    render(<FlightResultCard flight={makeFlight()} passengers={2} />);

    expect(screen.getByRole("link", { name: "Select" })).toHaveAttribute("href", "/book/1?passengers=2");
  });

  it("warns when only a few seats are left", () => {
    render(<FlightResultCard flight={makeFlight({ availableSeats: 5 })} passengers={1} />);

    expect(screen.getByText("Only 5 seats left")).toBeInTheDocument();
  });

  it("cannot be selected when there are not enough seats", () => {
    render(<FlightResultCard flight={makeFlight({ availableSeats: 1 })} passengers={2} />);

    expect(screen.queryByRole("link", { name: "Select" })).not.toBeInTheDocument();
    expect(screen.getByText("Not enough seats")).toBeInTheDocument();
  });
});