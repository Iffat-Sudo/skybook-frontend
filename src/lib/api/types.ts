import type { components } from "./schema";

type Schemas = components["schemas"];

// Flights
export type FlightListItem = Schemas["FlightListDTO"];
export type AvailableFlight = Schemas["AvailableFlightDTO"];

// Booking
export type BookFlightRequest = Schemas["BookFlightRequestDTO"];
export type FlightBooking = Schemas["FlightBookingDTO"];

// Chatbot (Phase 5)
export type ChatRequest = Schemas["AIRequestDTO"];
export type ChatResponse = Schemas["AIResponseDTO"];