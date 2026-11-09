import type { Airport, Flight } from "@/lib/api/types";

export const stockholm: Airport = {
  id: 1,
  code: "ARN",
  name: "Stockholm Arlanda Airport",
  city: "Stockholm",
  country: "Sweden",
  latitude: 59.6519,
  longitude: 17.9186,
};

export const rome: Airport = {
  id: 4,
  code: "FCO",
  name: "Rome Fiumicino Airport",
  city: "Rome",
  country: "Italy",
  latitude: 41.8003,
  longitude: 12.2389,
};

// A test flight. Change only what a test needs, e.g. makeFlight({ availableSeats: 5 })
export function makeFlight(overrides: Partial<Flight> = {}): Flight {
  return {
    id: 1,
    flightNumber: "SB101",
    departureAirport: stockholm,
    arrivalAirport: rome,
    departureTime: "2026-11-12T09:00:00",
    arrivalTime: "2026-11-12T12:00:00",
    price: 295.99,
    availableSeats: 120,
    totalSeats: 120,
    ...overrides,
  };
}