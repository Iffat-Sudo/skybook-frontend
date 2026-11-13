import type { FlightStatus } from "@/lib/api/types";
import { formatTime } from "@/lib/format";

function badgeFor(status: FlightStatus) {
  switch (status.status) {
    case "DELAYED":
      return {
        text: `Delayed ${status.delayMinutes} min · ${formatTime(status.expectedDeparture)}`,
        className: "bg-warning-50 text-warning-700",
      };
    case "BOARDING":
      return { text: "Boarding", className: "bg-primary-50 text-primary-700" };
    case "DEPARTED":
      return { text: "Departed", className: "bg-neutral-50 text-neutral-600" };
    case "LANDED":
      return { text: "Landed", className: "bg-neutral-50 text-neutral-600" };
    default:
      return { text: "On time", className: "bg-success-50 text-success-700" };
  }
}

export default function StatusBadge({ status }: { status?: FlightStatus }) {
  if (!status) {
    return null; // no live status (the flight is more than 3 days away)
  }

  const badge = badgeFor(status);

  return (
    <span role="status" className={`rounded-full px-2 py-0.5 text-caption font-medium ${badge.className}`}>
      {badge.text}
    </span>
  );
}