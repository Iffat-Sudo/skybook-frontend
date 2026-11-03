import type { Flight } from "@/lib/api/types";
import { formatDate, formatDuration, formatPrice, formatTime } from "@/lib/format";

type FlightResultCardProps = {
  flight: Flight;
};

const FEW_SEATS = 10;

export default function FlightResultCard({ flight }: FlightResultCardProps) {
  const { departureAirport: from, arrivalAirport: to } = flight;
  const fewSeats = flight.availableSeats < FEW_SEATS;

  return (
    <article className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-card md:flex-row md:items-center md:justify-between md:p-6">
      <div className="space-y-1">
        <p className="text-body font-semibold text-neutral-900">
          {formatTime(flight.departureTime)} → {formatTime(flight.arrivalTime)}
          <span className="ml-2 text-small font-normal text-neutral-400">
            {formatDuration(flight.departureTime, flight.arrivalTime)}
          </span>
        </p>
        <p className="text-small text-neutral-600">
          {formatDate(flight.departureTime)} · {from.city} ({from.code}) → {to.city} ({to.code}) ·{" "}
          {flight.flightNumber}
        </p>
      </div>

      <div className="flex items-center justify-between gap-6 md:justify-end">
        <span
          className={`rounded-full px-3 py-1 text-caption font-medium ${
            fewSeats ? "bg-warning-50 text-warning-700" : "bg-success-50 text-success-700"
          }`}
        >
          {fewSeats ? `Only ${flight.availableSeats} seats left` : "Available"}
        </span>
        <p className="text-h3 text-neutral-900">{formatPrice(flight.price)}</p>
        <button
          type="button"
          disabled
          title="Booking opens in the next version"
          className="h-10 rounded-lg bg-primary-600 px-5 text-small font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Select
        </button>
      </div>
    </article>
  );
}