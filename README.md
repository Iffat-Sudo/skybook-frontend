# ✈️ SkyBook – Flight Booking App

A full-stack portfolio project: a Next.js frontend for my Spring Boot Flight Booking API. Search flights, see results, and (soon) book them.

**🌐 Live demo:** https://skybook-frontend.vercel.app
**📖 API docs (Swagger):** https://skybook-api-iub9.onrender.com/swagger-ui.html
**⚙️ Backend repo:** https://github.com/Iffat-Sudo/FlightBooking_API

> ⏳ **The first load can take about 1 minute.** The backend runs on Render's free plan and sleeps after 15 minutes without visitors. After it wakes up, everything is fast.

## Features (v0.1)

- Search flights by destination, date and number of passengers
- Results page with loading, error and "no flights found" states
- Responsive design for desktop and phone
- The search is saved in the URL, so it can be shared or bookmarked

## Tech stack

| Area | Tools |
|---|---|
| Frontend | Next.js (App Router), React, TypeScript (strict), Tailwind CSS |
| Data | TanStack Query, TypeScript types generated from OpenAPI |
| Backend | Java 25, Spring Boot 4, Spring Data JPA, MySQL |
| DevOps | Docker, GitHub Actions (lint + build), Vercel, Render, Aiven |
| Design | Figma |

## Architecture

```
Browser → Vercel (Next.js) → Render (Spring Boot in Docker) → Aiven (MySQL)
```

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

## Roadmap

- [x] **v0.1** – Search and results, live online
- [ ] **v0.2** – Login (JWT), booking, My bookings, tests
- [ ] **v0.3** – Flight map, live status updates, animations
- [ ] **v1.0** – Schedule timeline, drag-and-drop rescheduling, accessibility and performance polish

## Links

- 🎨 Design (Figma): https://www.figma.com/design/3vkNgROaBfv1z8aoog1Bke/Flight-Booking-App?node-id=14-6
- 📋 Project board: https://github.com/users/Iffat-Sudo/projects/1

## Author

**Iffat Zabin** – Java Full Stack Developer & AI Integrator, Stockholm

LinkedIn: https://www.linkedin.com/in/iffat-zabin-983a03262 