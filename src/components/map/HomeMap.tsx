"use client";

import AirportMap from "./AirportMapLoader";
import { useAirports } from "@/hooks/useAirports";

export default function HomeMap() {
  const { data: airports = [], isError } = useAirports();

  if (isError) {
    return null; // the map is extra: if airports can't load, just hide it
  }
  if (airports.length === 0) {
    return <div className="h-80 w-full animate-pulse rounded-lg bg-neutral-200" />;
  }
  return <AirportMap airports={airports} />;
}