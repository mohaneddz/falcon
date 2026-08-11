# falcon

Admin dashboard for an emergency-response / aid-coordination platform, built during a hackathon (Code4Pal). It gives admins a single place to see users, verified contributors, emergency (SOS) reports, and aid locations on a map.

## What it does

- **Admin auth** — login page (`/admin/login`) backed by an `AuthContext` that talks to a Flask-style REST API (`http://127.0.0.1:5000/api`) using access/refresh tokens.
- **Dashboard overview** (`/dashboard`) — live stats pulled from the API: total users, contributors, pending contributor verifications, locations, and active emergencies.
- **Users** (`/dashboard/users`) — table of registered users (verification status, contact info, registration date).
- **Contributors** (`/dashboard/contributors`) — table of contributors with verification status/motivation, wired to the same API.
- **Emergencies** (`/dashboard/emergencies`) — table of emergency (SOS) reports with location and status.
- **Locations** (`/dashboard/locations`) — table of registered aid/service locations.
- **Interactive map** (`/dashboard/map`) — Leaflet map (via `react-leaflet`) showing location pins, with support for centering on a given `lat`/`lng` via query params.
- **Sidebar navigation** with grouped sections for locations, requests (verifications), tools (map), and users.

## Current state (honest notes)

This was built fast for a hackathon, so it's a mix of real and stubbed screens:

- Users, contributors, emergencies, locations, and the main dashboard stats are wired to a real backend API (`src/services/api.ts`).
- The **map**, **SOS list**, and **verifications** pages still render `dummyData` from local files (`src/data/*`) rather than the live API — the UI/table plumbing is done, the data wiring isn't finished.
- There is no backend included in this repo; the frontend expects a Flask-style API running locally on port 5000.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/) components (Radix UI primitives)
- [TanStack Table](https://tanstack.com/table) for data tables
- [Leaflet](https://leafletjs.com/) / `react-leaflet` for the map

## Getting started

```bash
pnpm install
pnpm start   # runs `next dev --turbopack`
```

Open [http://localhost:3000](http://localhost:3000). The app expects an API server at `http://127.0.0.1:5000/api` for auth and the live-data pages (dashboard, users, contributors, emergencies, locations).

## Scripts

- `pnpm start` — dev server (Turbopack)
- `pnpm build` — production build (Turbopack)
- `pnpm lint` — ESLint
