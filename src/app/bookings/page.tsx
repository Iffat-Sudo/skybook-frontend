
import type { Metadata } from "next";
import RequireAuth from "@/components/auth/RequireAuth";
import MyBookings from "@/components/MyBookings";

export const metadata: Metadata = {
  title: "My bookings · SkyBook",
};

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-h2 text-neutral-900 md:text-h1">My bookings</h1>
        <p className="text-small text-neutral-600">See and manage your flights.</p>
      </div>

      <RequireAuth>
        <MyBookings />
      </RequireAuth>
    </div>
  );
}