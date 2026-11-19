# ✈️ SkyBook – Flight Booking App

A full-stack portfolio project: a Next.js frontend for my Spring Boot Flight Booking API. Search flights on a map, follow live flight status, book seats, and manage your bookings.

<img width="1671" height="780" alt="result" src="https://github.com/user-attachments/assets/b37d8c1a-1980-4fca-b53a-54c71b3bff6c" />

<img width="1878" height="795" alt="booking" src="https://github.com/user-attachments/assets/3f36cab4-db52-40dc-aed6-10b8b81e7dc8" />

**🌐 Live demo:** https://skybook-frontend.vercel.app

**📖 API docs (Swagger):** https://skybook-api-iub9.onrender.com/swagger-ui.html

**⚙️ Backend repo:** https://github.com/Iffat-Sudo/FlightBooking_API

> 🔑 **Try it without registering:** click **Log in** → **Fill in the demo account**
> (`demo@skybook.com` / `SkyBookDemo2026`)

> ⏳ **The first load can take about 1 minute.** The backend runs on Render's free plan and sleeps after 15 minutes without visitors. After it wakes up, everything is fast.

## Features (v0.3)

- **Map** of all airports (Leaflet). Click an airport to see the flights from there
- **Route map** on the booking page: a curved flight path, the real distance, and an animated plane
- **Live flight status** (On time, Delayed, Boarding, Departed, Landed) that updates on screen without reload, with Server-Sent Events
- **Search** flights by departure airport, destination, date and number of passengers
- **Register and log in** with JWT authentication
- **Book** a flight for 1–6 passengers, with a price summary
- **My bookings**: see upcoming and past bookings, with live status, and cancel a booking
- **Smooth animations** (Motion) that respect the user's "reduce motion" setting
- **Responsive design** for desktop and phone, built from my own Figma design

> ℹ️ The live flight status is **simulated**, because real flight data services are paid. The real-time part (Server-Sent Events from Spring Boot to React) works the same way it would with real data.

## Tech stack

| Area | Tools |
|---|---|
| Frontend | Next.js (App Router), React, TypeScript (strict), Tailwind CSS |
| Data | TanStack Query, TypeScript types generated from OpenAPI |
| Maps and animation | Leaflet, react-leaflet, Motion |
| Real-time | Server-Sent Events (Spring `SseEmitter` + browser `EventSource`) |
| Backend | Java 25, Spring Boot 4, Spring Data JPA, Spring Security (JWT), MySQL |
| Testing | Vitest, React Testing Library, Playwright |
| DevOps | Docker, GitHub Actions (lint, test, build), Vercel, Render, Aiven |
| Design | Figma |

## Architecture

```
Browser → Vercel (Next.js) → Render (Spring Boot in Docker) → Aiven (MySQL)
                ↑                         │
                └──── live status (SSE) ──┘
```

- The backend has **Flight**, **Booking**, **Airport** and **User** tables, a search endpoint with optional filters, and JWT login with Spring Security.
- A scheduled job adds new flights every night, so there are always flights for the next 30 days.
- Another scheduled job simulates flight delays and sends status changes to the browser with Server-Sent Events.
- The frontend saves the login token, sends it with protected requests, and updates the data automatically after booking, cancelling, or a live status change.

## Run it locally

You need Node.js 20.9 or newer, and the backend running on `http://localhost:8080`.

```bash
git clone https://github.com/Iffat-Sudo/skybook-frontend.git
cd skybook-frontend
npm install
```

Create a file called `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Start the app and open http://localhost:3000:

```bash
npm run dev
```

To update the API types (the backend must be running):

```bash
npm run gen:api
```

## Tests

```bash
npm test             # 22 unit and component tests (Vitest + React Testing Library)
npm run test:e2e     # 3 end-to-end tests in a real browser (Playwright, needs the backend)
npm run test:e2e:ui  # watch the end-to-end tests run step by step
```

The unit and component tests also run on every push in GitHub Actions.

## Roadmap

- [x] **v0.1** – Search and results, live online
- [x] **v0.2** – Login (JWT), booking, My bookings, tests
- [x] **v0.3** – Flight map, live status updates, animations
- [ ] **v1.0** – Schedule timeline, drag-and-drop rescheduling, accessibility and performance polish

## Links

- 🎨 Design (Figma): https://www.figma.com/design/3vkNgROaBfv1z8aoog1Bke/Flight-Booking-App?node-id=14-6
- 📋 Project board: https://github.com/users/Iffat-Sudo/projects/1

## Author

**Iffat Zabin** – Java Full Stack Developer & AI Integrator, Stockholm

LinkedIn: https://www.linkedin.com/in/iffat-zabin-983a03262
