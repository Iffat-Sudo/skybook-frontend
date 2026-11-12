"use client";

import dynamic from "next/dynamic";

// Leaflet needs the browser ("window"), which doesn't exist on the server.
// So we load the map only in the browser, and show a grey box while it loads.
const AirportMap = dynamic(() => import("./AirportMap"), {
  ssr: false,
  loading: () => <div className="h-56 w-full animate-pulse rounded-lg bg-neutral-200" />,
});

export default AirportMap;