"use client";

import { useFlights } from "@/hooks/useFlights";

export default function Home() {
  const { data: flights, isPending, isError, error } = useFlights();

  if (isPending) {
    return <p className="p-8 text-neutral-600">Loading flights...</p>;
  }

  if (isError) {
    return <p className="p-8 text-error-600">Error: {error.message}</p>;
  }

  return (
    <main className="mx-auto max-w-3xl space-y-4 p-8">
      <h1 className="text-h1 text-primary-900">Flights ({flights.length})</h1>

      {flights.map((flight) => (
        <div key={flight.id} className="rounded-lg bg-white p-4 shadow-card">
          <p className="text-h3">
            {flight.flightNumber} → {flight.destination}
          </p>
          <p className="text-small text-neutral-600">
            {flight.departureTime} · {flight.status} · €{flight.price}
          </p>
        </div>
      ))}
    </main>
  );
}