import StatusBadge from "@/components/StatusBadge";
import type { Booking, FlightStatus } from "@/lib/api/types";
import { formatDate, formatPrice, formatTime } from "@/lib/format";

type BookingCardProps = {
  booking: Booking;
  status?: FlightStatus;
  onCancel?: () => void;
  isCancelling?: boolean;
};

function hasDeparted(booking: Booking) {
  return new Date(booking.flight.departureTime) <= new Date();
}

function bookingLabel(booking: Booking) {
  if (booking.status === "CANCELLED") {
    return { text: "Cancelled", className: "bg-error-50 text-error-600" };
  }
  if (hasDeparted(booking)) {
    return { text: "Flown", className: "bg-neutral-50 text-neutral-600" };
  }
  return { text: "Confirmed", className: "bg-success-50 text-success-700" };
}

export default function BookingCard({ booking, status, onCancel, isCancelling = false }: BookingCardProps) {
  const { flight } = booking;
  const { departureAirport: from, arrivalAirport: to } = flight;
  const label = bookingLabel(booking);
  const isUpcoming = booking.status === "CONFIRMED" && !hasDeparted(booking);
  const canCancel = Boolean(onCancel) && isUpcoming;

  return (
    <article className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-card md:flex-row md:items-center md:justify-between md:p-6">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-body font-semibold text-neutral-900">
            {formatTime(flight.departureTime)} → {formatTime(flight.arrivalTime)}
            <span className="ml-2 text-small font-normal text-neutral-600">{formatDate(flight.departureTime)}</span>
          </p>
          {isUpcoming && <StatusBadge status={status} />}
        </div>
        <p className="text-small text-neutral-600">
          {from.city} ({from.code}) → {to.city} ({to.code}) · {flight.flightNumber}
        </p>
        <p className="text-caption text-neutral-400">Passenger: {booking.passengerName}</p>
      </div>

      <div className="flex items-center justify-between gap-6 md:justify-end">
        <span className={`rounded-full px-3 py-1 text-caption font-medium ${label.className}`}>{label.text}</span>
        <p className="text-h3 text-neutral-900">{formatPrice(flight.price)}</p>
        {canCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isCancelling}
            className="h-10 rounded-lg border border-error-600 px-5 text-small font-medium text-error-600 hover:bg-error-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCancelling ? "Cancelling..." : "Cancel"}
          </button>
        )}
      </div>
    </article>
  );
}