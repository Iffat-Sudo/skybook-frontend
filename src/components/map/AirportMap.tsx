"use client";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import type { Airport } from "@/lib/api/types";
import { curvedPath } from "@/lib/geo";

// Colors from the Figma style guide
const PRIMARY = "#2563EB"; // primary-600
const PRIMARY_DARK = "#1E3A8A"; // primary-900

type AirportMapProps = {
  airports: Airport[];
  route?: { from: Airport; to: Airport }; // show only this route, with a curved line
  className?: string;
};

export default function AirportMap({
  airports,
  route,
  className = "h-80",
}: AirportMapProps) {
  const shown = route ? [route.from, route.to] : airports;
  const bounds = shown.map(
    (airport) => [airport.latitude, airport.longitude] as [number, number],
  );

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [40, 40] }}
      scrollWheelZoom={false}
      className={`w-full rounded-lg ${className}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {route && (
        <Polyline
          positions={curvedPath(route.from, route.to)}
          pathOptions={{ color: PRIMARY, weight: 3, dashArray: "6 8" }}
        />
      )}

      {shown.map((airport) => (
        <CircleMarker
          key={airport.code}
          center={[airport.latitude, airport.longitude]}
          radius={route ? 8 : 6}
          pathOptions={{
            color: "#FFFFFF",
            weight: 2,
            fillColor: route ? PRIMARY_DARK : PRIMARY,
            fillOpacity: 1,
          }}
        >
          {route ? (
            <Tooltip permanent direction="top" offset={[0, -8]}>
              {airport.city} ({airport.code})
            </Tooltip>
          ) : (
            <Popup>
              <p className="font-semibold">
                {airport.city} ({airport.code})
              </p>
              <p>{airport.name}</p>
              <Link href={`/results?from=${airport.code}&passengers=1`}>
                Flights from {airport.city} →
              </Link>
            </Popup>
          )}
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
