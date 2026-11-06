import { apiGet, apiRequest } from "./client";
import type { BookFlightRequest, Booking } from "./types";

export function getMyBookings(token: string) {
  return apiGet<Booking[]>("/api/bookings", token);
}

export function bookFlight(flightId: number, request: BookFlightRequest, token: string) {
  return apiRequest<Booking>(`/api/flights/${flightId}/book`, { method: "POST", body: request, token });
}

export function cancelBooking(bookingId: number, token: string) {
  return apiRequest<void>(`/api/bookings/${bookingId}`, { method: "DELETE", token });
}