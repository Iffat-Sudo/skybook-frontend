import type { components } from "./schema";

type Schemas = components["schemas"];

// Our backend always sends every field of these objects.
// Swagger marks them as "optional", so we tell TypeScript they are always there.
type DeepRequired<T> = T extends object
  ? { [K in keyof T]-?: DeepRequired<NonNullable<T[K]>> }
  : T;

// Flights and airports
export type Airport = DeepRequired<Schemas["AirportDTO"]>;
export type Flight = DeepRequired<Schemas["FlightDTO"]>;
export type FlightStatus = DeepRequired<Schemas["FlightStatusDTO"]>;

// Bookings (Phase 2)
export type Booking = DeepRequired<Schemas["BookingDTO"]>;
export type BookFlightRequest = Schemas["BookFlightRequestDTO"];

// Login (Phase 2)
export type User = DeepRequired<Schemas["UserDTO"]>;
export type AuthResponse = DeepRequired<Schemas["AuthResponseDTO"]>;
export type LoginRequest = Schemas["LoginRequestDTO"];
export type RegisterRequest = Schemas["RegisterRequestDTO"];

// Chatbot (Phase 5)
export type ChatRequest = Schemas["AIRequestDTO"];
export type ChatResponse = Schemas["AIResponseDTO"];