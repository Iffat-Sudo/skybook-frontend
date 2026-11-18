"use client";

import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { Marker, useMap } from "react-leaflet";

const FLIGHT_MS = 6000; // one trip takes 6 seconds
const PAUSE_MS = 1200; // then wait a moment at the end before starting again

// A simple plane drawing, nose pointing to the right
const PLANE_SVG = `
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
    <path d="M21 12 L13 10 L9 3 L7 3 L9 10 L4 10 L2.5 7 L1 7 L2 12 L1 17 L2.5 17 L4 14 L9 14 L7 21 L9 21 L13 14 Z" />
  </svg>`;

type FlyingPlaneProps = {
  path: [number, number][]; // the points of the curved route
};

export default function FlyingPlane({ path }: FlyingPlaneProps) {
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);

  const icon = useMemo(
    () =>
      L.divIcon({
        className: "", // no default white box from Leaflet
        html: `<div class="skybook-plane" style="color:#1E3A8A">${PLANE_SVG}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14], // the middle of the plane sits on the route
      }),
    [],
  );

  useEffect(() => {
    // Put the plane at "progress" (0 = start, 1 = end) and turn its nose the right way
    function place(progress: number) {
      const marker = markerRef.current;
      if (!marker || path.length < 2) return;

      const exact = progress * (path.length - 1);
      const index = Math.min(Math.floor(exact), path.length - 2);
      const a = path[index];
      const b = path[index + 1];
      const step = exact - index; // how far between point a and point b

      marker.setLatLng([a[0] + (b[0] - a[0]) * step, a[1] + (b[1] - a[1]) * step]);

      // The angle on the screen from point a to point b
      const pointA = map.latLngToLayerPoint(a);
      const pointB = map.latLngToLayerPoint(b);
      const angle = (Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * 180) / Math.PI;

      const plane = marker.getElement()?.querySelector<HTMLElement>(".skybook-plane");
      if (plane) {
        plane.style.transform = `rotate(${angle}deg)`;
      }
    }

    // "Reduce motion" is on: show the plane in the middle, without moving
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(0.5);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    function animate(time: number) {
      if (start === null) start = time;
      const elapsed = (time - start) % (FLIGHT_MS + PAUSE_MS);
      place(Math.min(elapsed / FLIGHT_MS, 1));
      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame); // stop when the map closes
  }, [map, path]);

  return <Marker position={path[0]} icon={icon} ref={markerRef} interactive={false} keyboard={false} />;
}