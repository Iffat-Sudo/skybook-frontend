import { apiGet } from "./client";
import type { Airport, Flight } from "./types";

export type FlightSearchParams = {
  from?: string;
  to?: string;
  date?: string;
  maxPrice?: number;
};

export function getAirports() {
  return apiGet<Airport[]>("/api/airports");
}

export function searchFlights(params: FlightSearchParams) {
  const query = new URLSearchParams();
  if (params.from) query.set("from", params.from);
  if (params.to) query.set("to", params.to);
  if (params.date) query.set("date", params.date);
  if (params.maxPrice !== undefined) query.set("maxPrice", String(params.maxPrice));

  const queryString = query.toString();
  return apiGet<Flight[]>(`/api/flights/search${queryString ? `?${queryString}` : ""}`);
}