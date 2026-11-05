import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBooking } from "@/lib/api/bookings";
import { useAuth } from "@/lib/auth/AuthProvider";

export function useCancelBooking() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: number) => {
      if (!token) throw new Error("You are not logged in");
      return cancelBooking(bookingId, token);
    },
    onSuccess: () => {
      // The booking list and the free seats changed: load them again
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["flights"] });
    },
  });
}