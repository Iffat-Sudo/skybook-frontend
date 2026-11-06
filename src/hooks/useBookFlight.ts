import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookFlight } from "@/lib/api/bookings";
import type { BookFlightRequest, Booking } from "@/lib/api/types";
import { useAuth } from "@/lib/auth/AuthProvider";

type BookFlightInput = {
  flightId: number;
  passengers: BookFlightRequest[];
};

export function useBookFlight() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ flightId, passengers }: BookFlightInput) => {
      if (!token) throw new Error("You are not logged in");

      // One booking per passenger, one after the other
      const bookings: Booking[] = [];
      for (const passenger of passengers) {
        bookings.push(await bookFlight(flightId, passenger, token));
      }
      return bookings;
    },
    // Success or error: seats and bookings may have changed, so load them again
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["flights"] });
    },
  });
}