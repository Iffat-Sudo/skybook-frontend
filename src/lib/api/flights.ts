import { apiGet } from "./client";
import type { FlightListItem } from "./types";

export function getFlights() {
  return apiGet<FlightListItem[]>("/api/flights");
}