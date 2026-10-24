import { apiGet } from "./client";
import type { AvailableFlight, FlightListItem } from "./types";

export function getFlights() {
  return apiGet<FlightListItem[]>("/api/flights");
}

export function getAvailableFlights() {
  return apiGet<AvailableFlight[]>("/api/flights/available");
}