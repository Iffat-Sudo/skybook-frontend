import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "@/lib/api/bookings";
import { useAuth } from "@/lib/auth/AuthProvider";

export function useMyBookings() {
  const { token, user } = useAuth();

  return useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: () => {
      if (!token) throw new Error("You are not logged in");
      return getMyBookings(token);
    },
    enabled: Boolean(token), // only run when we have a token
  });
}