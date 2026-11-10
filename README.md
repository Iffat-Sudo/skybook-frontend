# ✈️ SkyBook – Flight Booking App

A full-stack portfolio project: a Next.js frontend for my Spring Boot Flight Booking API. Search flights, book seats, and manage your bookings.

**🌐 Live demo:** https://skybook-frontend.vercel.app
**📖 API docs (Swagger):** https://skybook-api-iub9.onrender.com/swagger-ui.html
**⚙️ Backend repo:** https://github.com/Iffat-Sudo/FlightBooking_API

> 🔑 **Try it without registering:** click **Log in** → **Fill in the demo account**
> (`demo@skybook.com` / `SkyBookDemo2026`)

> ⏳ **The first load can take about 1 minute.** The backend runs on Render's free plan and sleeps after 15 minutes without visitors. After it wakes up, everything is fast.

## Features (v0.2)

- **Search** flights by departure airport, destination, date and number of passengers
- **Results** with real routes, flight times, prices and seats left (with loading, error and empty states)
- **Register and log in** with JWT authentication
- **Book** a flight for 1–6 passengers, with a price summary
- **My bookings**: see upcoming and past bookings, and cancel a booking
- **Protected pages**: logged-out users are sent to the login page and back afterwards
- **Responsive design** for desktop and phone, built from my own Figma design

## Tech stack

| Area | Tools |
|---|---|
| Frontend | Next.js (App Router), React, TypeScript (strict), Tailwind CSS |
| Data | TanStack Query, TypeScript types generated from OpenAPI |
| Backend | Java 25, Spring Boot 4, Spring Data JPA, Spring Security (JWT), MySQL |
| Testing | Vitest, React Testing Library, Playwright |
| DevOps | Docker, GitHub Actions (lint, test, build), Vercel, Render, Aiven |
| Design | Figma |

## Architecture

```
Browser → Vercel (Next.js) → Render (Spring Boot in Docker) → Aiven (MySQL)
```

- The backend has **Flight**, **Booking**, **Airport** and **User** tables, a search endpoint with optional filters, and JWT login with Spring Security.
- The frontend saves the login token, sends it with protected requests, and refreshes the data automatically after booking or cancelling.

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
npm test             # 16 unit and component tests (Vitest + React Testing Library)
npm run test:e2e     # 3 end-to-end tests in a real browser (Playwright, needs the backend)
npm run test:e2e:ui  # watch the end-to-end tests run step by step
```

The unit and component tests also run on every push in GitHub Actions.

## Roadmap

- [x] **v0.1** – Search and results, live online
- [x] **v0.2** – Login (JWT), booking, My bookings, tests
- [ ] **v0.3** – Flight map, live status updates, animations
- [ ] **v1.0** – Schedule timeline, drag-and-drop rescheduling, accessibility and performance polish

## Links

- 🎨 Design (Figma): https://www.figma.com/design/3vkNgROaBfv1z8aoog1Bke/Flight-Booking-App?node-id=14-6
- 📋 Project board: https://github.com/users/Iffat-Sudo/projects/1

## Author

**Iffat Zabin** – Java Full Stack Developer & AI Integrator, Stockholm

LinkedIn: https://www.linkedin.com/in/iffat-zabin-983a03262