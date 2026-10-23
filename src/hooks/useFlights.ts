import { useQuery } from "@tanstack/react-query";
import { getFlights } from "@/lib/api/flights";

export function useFlights() {
  return useQuery({
    queryKey: ["flights"],
    queryFn: getFlights,
  });
}