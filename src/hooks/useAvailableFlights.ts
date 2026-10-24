import { useQuery } from "@tanstack/react-query";
import { getAvailableFlights } from "@/lib/api/flights";

export function useAvailableFlights() {
  return useQuery({
    queryKey: ["flights", "available"],
    queryFn: getAvailableFlights,
  });
}