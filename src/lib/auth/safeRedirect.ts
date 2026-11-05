// After login, we send the user back to where they came from (for example "/bookings").
// We only allow paths inside SkyBook. This stops "open redirect" attacks,
// where a bad link like ?next=https://evil.com sends users to another site.
export function safeRedirect(next: string | undefined, fallback = "/") {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return fallback;
  }
  return next;
}