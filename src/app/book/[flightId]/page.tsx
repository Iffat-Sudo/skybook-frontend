import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RequireAuth from "@/components/auth/RequireAuth";
import BookingFlow from "@/components/BookingFlow";

export const metadata: Metadata = {
  title: "Book your flight · SkyBook",
};

type BookPageProps = {
  params: Promise<{ flightId: string }>;
  searchParams: Promise<{ passengers?: string }>;
};

export default async function BookPage({ params, searchParams }: BookPageProps) {
  const { flightId } = await params;
  const { passengers } = await searchParams;

  const id = Number(flightId);
  if (!Number.isInteger(id) || id <= 0) {
    notFound(); // for example /book/abc
  }

  // 1 to 6 passengers, like in the search form
  const count = Math.min(Math.max(Number(passengers) || 1, 1), 6);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-h2 text-neutral-900 md:text-h1">Book your flight</h1>
        <p className="text-small text-neutral-600">Check the flight, add the passengers and confirm.</p>
      </div>

      <RequireAuth>
        <BookingFlow flightId={id} passengers={count} />
      </RequireAuth>
    </div>
  );
}