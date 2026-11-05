import { apiGet, apiRequest } from "./client";
import type { Booking } from "./types";

export function getMyBookings(token: string) {
  return apiGet<Booking[]>("/api/bookings", token);
}

export function cancelBooking(bookingId: number, token: string) {
  return apiRequest<void>(`/api/bookings/${bookingId}`, { method: "DELETE", token });
}