import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/lib/api/client";
import { getFlightStatuses } from "@/lib/api/flights";
import type { FlightStatus } from "@/lib/api/types";

const STATUS_KEY = ["flight-status"];

export function useLiveFlightStatuses() {
  const queryClient = useQueryClient();
  const [isLive, setIsLive] = useState(false);

  // 1. Get all statuses once
  const { data: statuses = [] } = useQuery({
    queryKey: STATUS_KEY,
    queryFn: getFlightStatuses,
  });

  // 2. Then listen for changes from the server
  useEffect(() => {
    const source = new EventSource(`${API_URL}/api/flights/status/stream`);

    source.onopen = () => {
      setIsLive(true);
      // After a reconnect, we may have missed something: get the full list again
      queryClient.invalidateQueries({ queryKey: STATUS_KEY });
    };
    source.onerror = () => setIsLive(false); // the browser tries to reconnect by itself

    source.addEventListener("status", (event) => {
      const update = JSON.parse((event as MessageEvent<string>).data) as FlightStatus;
      // Replace the old status of this flight with the new one
      queryClient.setQueryData<FlightStatus[]>(STATUS_KEY, (current = []) => [
        ...current.filter((status) => status.flightId !== update.flightId),
        update,
      ]);
    });

    return () => source.close(); // leave the page → close the connection
  }, [queryClient]);

  const byFlightId = useMemo(
    () => new Map(statuses.map((status) => [status.flightId, status])),
    [statuses],
  );

  return {
    statusOf: (flightId: number) => byFlightId.get(flightId),
    isLive,
  };
}