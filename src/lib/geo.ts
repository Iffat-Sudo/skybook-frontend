type Point = { latitude: number; longitude: number };

// The real distance between two points on Earth ("haversine" formula), in km
export function distanceKm(a: Point, b: Point) {
  const toRad = (degrees: number) => (degrees * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.latitude)) * Math.cos(toRad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

// Points on a gentle curve from a to b (a "Bézier curve"), for a nice flight path
export function curvedPath(a: Point, b: Point, steps = 64): [number, number][] {
  // The middle point, pushed a bit to the side, so the line bends
  const bend = 0.2;
  const controlLat = (a.latitude + b.latitude) / 2 + (b.longitude - a.longitude) * bend;
  const controlLon = (a.longitude + b.longitude) / 2 - (b.latitude - a.latitude) * bend;

  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps; // from 0 (start) to 1 (end)
    const lat = (1 - t) ** 2 * a.latitude + 2 * (1 - t) * t * controlLat + t ** 2 * b.latitude;
    const lon = (1 - t) ** 2 * a.longitude + 2 * (1 - t) * t * controlLon + t ** 2 * b.longitude;
    points.push([lat, lon]);
  }
  return points;
}