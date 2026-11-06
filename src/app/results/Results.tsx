"use client";

import FlightResultCard from "@/components/FlightResultCard";
import SearchForm from "@/components/SearchForm";
import { useAirports } from "@/hooks/useAirports";
import { useFlightSearch } from "@/hooks/useFlightSearch";
import { formatDate } from "@/lib/format";

type ResultsProps = {
  from: string;
  to: string;
  date: string;
  passengers: string;
};

export default function Results({ from, to, date, passengers }: ResultsProps) {
  const { data: airports = [] } = useAirports();
  const {
    data: flights = [],
    isPending,
    isError,
    error,
    refetch,
  } = useFlightSearch({ from, to, date });

  // "ARN" → "Stockholm"
  const cityOf = (code: string) =>
    airports.find((airport) => airport.code === code)?.city ?? code;

  const fromText = from ? cityOf(from) : "Anywhere";
  const toText = to ? cityOf(to) : "Anywhere";
  const dateText = date ? formatDate(date) : "Any date";
  const passengerText = passengers === "1" ? "1 adult" : `${passengers} adults`;
  const foundText = `${flights.length} ${flights.length === 1 ? "flight" : "flights"} found`;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-h2 text-neutral-900 md:text-h1">
          {fromText} → {toText}
        </h1>
        <p className="text-small text-neutral-600">
          {dateText} · {passengerText}
          {!isPending && !isError && ` · ${foundText}`}
        </p>
      </div>

      <SearchForm
        key={`${from}-${to}-${date}-${passengers}`}
        initialFrom={from}
        initialTo={to}
        initialDate={date}
        initialPassengers={passengers}
      />

      {/* 1. Loading */}
      {isPending && (
        <div className="space-y-3" aria-label="Loading flights">
          {[1, 2, 3].map((number) => (
            <div
              key={number}
              className="h-24 animate-pulse rounded-lg bg-neutral-200"
            />
          ))}
        </div>
      )}

      {/* 2. Error */}
      {isError && (
        <div
          role="alert"
          className="space-y-2 rounded-lg bg-error-50 p-6 text-center"
        >
          <p className="text-h3 text-error-600">Could not load flights</p>
          <p className="text-small text-neutral-600">{error.message}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-2 h-10 rounded-lg bg-white px-4 text-small font-medium text-neutral-900 shadow-card hover:bg-neutral-50"
          >
            Try again
          </button>
        </div>
      )}

      {/* 3. No flights found */}
      {!isPending && !isError && flights.length === 0 && (
        <div className="space-y-1 rounded-lg bg-white p-6 text-center shadow-card">
          <p className="text-h3 text-neutral-900">No flights found</p>
          <p className="text-small text-neutral-600">
            Try another date, or leave the date empty to see all flights.
          </p>
        </div>
      )}

      {/* 4. The list */}
      {flights.length > 0 && (
        <ul className="space-y-3">
          {flights.map((flight) => (
            <li key={flight.id}>
              <FlightResultCard
                flight={flight}
                passengers={Number(passengers) || 1}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
