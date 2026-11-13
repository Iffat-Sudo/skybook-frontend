"use client";

import { useEffect } from "react";
import Link from "next/link";
import BookingCard from "@/components/BookingCard";
import { useCancelBooking } from "@/hooks/useCancelBooking";
import { useMyBookings } from "@/hooks/useMyBookings";
import { useLiveFlightStatuses } from "@/hooks/useLiveFlightStatuses";
import { ApiError } from "@/lib/api/client";
import type { Booking } from "@/lib/api/types";
import { useAuth } from "@/lib/auth/AuthProvider";
import { errorBoxClass } from "@/components/ui/styles";

function isUpcoming(booking: Booking) {
  return booking.status === "CONFIRMED" && new Date(booking.flight.departureTime) > new Date();
}

export default function MyBookings() {
  const { logout } = useAuth();
  const { data: bookings = [], isPending, isError, error, refetch } = useMyBookings();
  const cancel = useCancelBooking();
    const { statusOf } = useLiveFlightStatuses();

  // The token is no longer valid (for example the secret changed): log out.
  // <RequireAuth> then sends the user to the login page.
  useEffect(() => {
    if (error instanceof ApiError && error.status === 401) {
      logout();
    }
  }, [error, logout]);

  function handleCancel(booking: Booking) {
    const ok = window.confirm(
      `Cancel your flight ${booking.flight.flightNumber} to ${booking.flight.arrivalAirport.city}?`,
    );
    if (ok) {
      cancel.mutate(booking.id);
    }
  }

  if (isPending) {
    return (
      <div className="space-y-3" aria-label="Loading bookings">
        {[1, 2].map((number) => (
          <div key={number} className="h-24 animate-pulse rounded-lg bg-neutral-200" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="space-y-2 rounded-lg bg-error-50 p-6 text-center">
        <p className="text-h3 text-error-600">Could not load your bookings</p>
        <p className="text-small text-neutral-600">{error.message}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-2 h-10 rounded-lg bg-white px-4 text-small font-medium text-neutral-900 shadow-card hover:bg-neutral-50"
        >
          Try again
        </button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="space-y-2 rounded-lg bg-white p-6 text-center shadow-card">
        <p className="text-h3 text-neutral-900">No bookings yet</p>
        <p className="text-small text-neutral-600">When you book a flight, it shows up here.</p>
        <Link href="/" className="inline-block font-medium text-primary-600 hover:underline">
          Search flights
        </Link>
      </div>
    );
  }

  const upcoming = bookings.filter(isUpcoming);
  const others = bookings.filter((booking) => !isUpcoming(booking));

  return (
    <div className="space-y-8">
      {cancel.isError && (
        <p role="alert" className={errorBoxClass}>
          {cancel.error.message}
        </p>
      )}

      <section className="space-y-3">
        <h2 className="text-h3 text-neutral-900">Upcoming ({upcoming.length})</h2>
        {upcoming.length === 0 ? (
          <p className="text-small text-neutral-600">You have no upcoming flights.</p>
        ) : (
          <ul className="space-y-3">
            {upcoming.map((booking) => (
              <li key={booking.id}>
                <BookingCard
                  booking={booking}
                  status={statusOf(booking.flight.id)}
                  onCancel={() => handleCancel(booking)}
                  isCancelling={cancel.isPending && cancel.variables === booking.id}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {others.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-h3 text-neutral-900">Past and cancelled ({others.length})</h2>
          <ul className="space-y-3">
            {others.map((booking) => (
              <li key={booking.id}>
                <BookingCard booking={booking} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}