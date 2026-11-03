import { useQuery } from "@tanstack/react-query";
import { getAirports } from "@/lib/api/flights";

export function useAirports() {
  return useQuery({
    queryKey: ["airports"],
    queryFn: getAirports,
    staleTime: 60 * 60 * 1000, // airports almost never change, so keep them for 1 hour
  });
}