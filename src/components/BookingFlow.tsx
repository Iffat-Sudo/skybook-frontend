"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useBookFlight } from "@/hooks/useBookFlight";
import { useFlight } from "@/hooks/useFlight";
import { ApiError } from "@/lib/api/client";
import type { BookFlightRequest, Flight } from "@/lib/api/types";
import { useAuth } from "@/lib/auth/AuthProvider";
import { formatDate, formatDuration, formatPrice, formatTime } from "@/lib/format";
import {
  errorBoxClass,
  fieldClass,
  labelClass,
  labelTextClass,
  primaryButtonClass,
} from "@/components/ui/styles";

type BookingFlowProps = {
  flightId: number;
  passengers: number;
};

function hasDeparted(flight: Flight) {
  return new Date(flight.departureTime) <= new Date();
}

const secondaryButtonClass =
  "inline-flex h-12 items-center justify-center rounded-lg border border-neutral-200 bg-white px-6 " +
  "text-small font-medium text-neutral-900 hover:bg-neutral-50";

export default function BookingFlow({ flightId, passengers }: BookingFlowProps) {
  const { user, logout } = useAuth();
  const { data: flight, isPending, isError, error } = useFlight(flightId);
  const booking = useBookFlight();

  // One form per passenger. The first one is the logged-in user.
  const [travellers, setTravellers] = useState<BookFlightRequest[]>(() =>
    Array.from({ length: passengers }, (_, index) => ({
      passengerName: index === 0 ? (user?.name ?? "") : "",
      passengerEmail: index === 0 ? (user?.email ?? "") : "",
    })),
  );

  // The token is no longer valid: log out, so <RequireAuth> sends the user to login
  useEffect(() => {
    if (booking.error instanceof ApiError && booking.error.status === 401) {
      logout();
    }
  }, [booking.error, logout]);

  function updateTraveller(index: number, field: keyof BookFlightRequest, value: string) {
    setTravellers((current) =>
      current.map((traveller, i) => (i === index ? { ...traveller, [field]: value } : traveller)),
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    booking.mutate({
      flightId,
      passengers: travellers.map((traveller) => ({
        passengerName: traveller.passengerName.trim(),
        passengerEmail: traveller.passengerEmail.trim(),
      })),
    });
  }

  // 1. Loading the flight
  if (isPending) {
    return <div className="h-64 animate-pulse rounded-lg bg-neutral-200" aria-label="Loading flight" />;
  }

  // 2. Flight not found or server error
  if (isError || !flight) {
    return (
      <div role="alert" className="space-y-2 rounded-lg bg-error-50 p-6 text-center">
        <p className="text-h3 text-error-600">Could not load this flight</p>
        <p className="text-small text-neutral-600">{error?.message ?? "Flight not found"}</p>
        <Link href="/" className="inline-block font-medium text-primary-600 hover:underline">
          Back to search
        </Link>
      </div>
    );
  }

  const { departureAirport: from, arrivalAirport: to } = flight;

  // 3. Booking done
  if (booking.isSuccess) {
    const count = booking.data.length;
    return (
      <div className="space-y-4 rounded-lg bg-white p-6 text-center shadow-card">
        <p className="text-h2 text-success-700">Booking confirmed!</p>
        <p className="text-body text-neutral-600">
          You booked {count} {count === 1 ? "seat" : "seats"} on {flight.flightNumber}, {from.city} →{" "}
          {to.city}, {formatDate(flight.departureTime)} at {formatTime(flight.departureTime)}.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/bookings" className={`${primaryButtonClass} inline-flex items-center justify-center`}>
            See my bookings
          </Link>
          <Link href="/" className={secondaryButtonClass}>
            Search more flights
          </Link>
        </div>
      </div>
    );
  }

  // 4. The form
  const departed = hasDeparted(flight);
  const notEnoughSeats = flight.availableSeats < passengers;
  const canBook = !departed && !notEnoughSeats;
  const total = flight.price * passengers;

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px] md:items-start">
      {/* Flight summary: on top on phones, on the right on desktop */}
      <aside className="space-y-4 rounded-lg bg-white p-6 shadow-card md:order-2">
        <h2 className="text-h3 text-neutral-900">Your flight</h2>

        <div className="space-y-1">
          <p className="text-body font-semibold text-neutral-900">
            {formatTime(flight.departureTime)} → {formatTime(flight.arrivalTime)}
            <span className="ml-2 text-small font-normal text-neutral-400">
              {formatDuration(flight.departureTime, flight.arrivalTime)}
            </span>
          </p>
          <p className="text-small text-neutral-600">{formatDate(flight.departureTime)}</p>
          <p className="text-small text-neutral-600">
            {from.city} ({from.code}) → {to.city} ({to.code})
          </p>
          <p className="text-caption text-neutral-400">
            {flight.flightNumber} · {flight.availableSeats} seats left
          </p>
        </div>

        <dl className="space-y-1 border-t border-neutral-200 pt-4 text-small">
          <div className="flex justify-between">
            <dt className="text-neutral-600">Price per person</dt>
            <dd className="text-neutral-900">{formatPrice(flight.price)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-600">Passengers</dt>
            <dd className="text-neutral-900">{passengers}</dd>
          </div>
          <div className="flex justify-between text-body font-semibold text-neutral-900">
            <dt>Total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>
      </aside>

      {/* Passenger form */}
      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow-card md:order-1">
        {travellers.map((traveller, index) => (
          <fieldset key={index} className="space-y-3">
            <legend className="text-h3 text-neutral-900">Passenger {index + 1}</legend>

            <label className={labelClass}>
              <span className={labelTextClass}>Full name</span>
              <input
                required
                minLength={2}
                maxLength={100}
                autoComplete={index === 0 ? "name" : "off"}
                className={fieldClass}
                value={traveller.passengerName}
                onChange={(event) => updateTraveller(index, "passengerName", event.target.value)}
              />
            </label>

            <label className={labelClass}>
              <span className={labelTextClass}>Email</span>
              <input
                type="email"
                required
                autoComplete={index === 0 ? "email" : "off"}
                className={fieldClass}
                value={traveller.passengerEmail}
                onChange={(event) => updateTraveller(index, "passengerEmail", event.target.value)}
              />
            </label>
          </fieldset>
        ))}

        {departed && (
          <p className="rounded-lg bg-warning-50 px-3 py-2 text-small text-warning-700">
            This flight has already departed.
          </p>
        )}
        {!departed && notEnoughSeats && (
          <p className="rounded-lg bg-warning-50 px-3 py-2 text-small text-warning-700">
            There are not enough seats left for {passengers} passengers.
          </p>
        )}

        {booking.isError && (
          <p role="alert" className={errorBoxClass}>
            {booking.error.message}
            {passengers > 1 && " If some passengers were already booked, you can see them in My bookings."}
          </p>
        )}

        <button
          type="submit"
          disabled={!canBook || booking.isPending}
          className={`${primaryButtonClass} w-full`}
        >
          {booking.isPending ? "Booking..." : `Book now · ${formatPrice(total)}`}
        </button>
      </form>
    </div>
  );
}