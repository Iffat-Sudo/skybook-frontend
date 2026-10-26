"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAvailableFlights } from "@/hooks/useAvailableFlights";

type SearchFormProps = {
  initialTo?: string;
  initialDate?: string;
  initialPassengers?: string;
};

const fieldClass =
  "h-12 w-full rounded-lg border border-neutral-200 bg-white px-3 text-small text-neutral-900 " +
  "focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 " +
  "disabled:bg-neutral-50 disabled:text-neutral-600";

const labelClass = "flex flex-col gap-1";
const labelTextClass = "text-caption text-neutral-600";

export default function SearchForm({
  initialTo = "",
  initialDate = "",
  initialPassengers = "1",
}: SearchFormProps) {
  const router = useRouter();
  const { data: flights, isPending } = useAvailableFlights();

  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState(initialDate);
  const [passengers, setPassengers] = useState(initialPassengers);

  // All cities in the data, each one only once, A to Z
  const destinations = [...new Set(flights?.map((flight) => flight.destination))].sort();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({ to, date, passengers });
    router.push(`/results?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-lg bg-white p-4 shadow-card md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:items-end md:p-6"
    >
      <label className={labelClass}>
        <span className={labelTextClass}>From</span>
        <input className={fieldClass} value="Stockholm (ARN)" disabled />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>To</span>
        <select
          className={fieldClass}
          value={to}
          onChange={(event) => setTo(event.target.value)}
          disabled={isPending}
          required
        >
          <option value="" disabled>
            {isPending ? "Loading..." : "Choose a city"}
          </option>
          {destinations.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>Date (optional)</span>
        <input
          type="date"
          className={fieldClass}
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>Passengers</span>
        <select
          className={fieldClass}
          value={passengers}
          onChange={(event) => setPassengers(event.target.value)}
        >
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <option key={number} value={number}>
              {number} {number === 1 ? "adult" : "adults"}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="h-12 rounded-lg bg-primary-600 px-6 text-small font-medium text-white hover:bg-primary-700"
      >
        Search
      </button>
    </form>
  );
}