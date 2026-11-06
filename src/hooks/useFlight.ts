import { useQuery } from "@tanstack/react-query";
import { getFlight } from "@/lib/api/flights";

export function useFlight(flightId: number) {
  return useQuery({
    queryKey: ["flights", "one", flightId],
    queryFn: () => getFlight(flightId),
  });
}