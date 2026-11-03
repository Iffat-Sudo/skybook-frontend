import { useQuery } from "@tanstack/react-query";
import { searchFlights, type FlightSearchParams } from "@/lib/api/flights";

export function useFlightSearch(params: FlightSearchParams) {
  return useQuery({
    queryKey: ["flights", "search", params],
    queryFn: () => searchFlights(params),
  });
}