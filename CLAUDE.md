# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 16 "Homes App" tutorial project from the [angular.dev first-app tutorial](https://angular.dev/tutorials/first-app), built following a [YouTube walkthrough](https://youtu.be/xAT0lHYhHMY). It displays housing listings fetched from a local JSON server.

## Commands

```bash
# Install dependencies
npm install

# Install json-server globally (required for backend data)
npm install -g json-server

# Start the Angular dev server (http://localhost:4200)
ng serve

# Start the JSON data server (http://localhost:3000/locations) — must run concurrently with ng serve
json-server --watch db.json

# Build for production
ng build

# Run unit tests (Karma/Jasmine)
ng test

# Run a single test file
ng test --include='**/housing.service.spec.ts'

# Run e2e tests (Protractor)
ng e2e
```

## Architecture

All components use the **standalone component** pattern (no NgModules).

**Data flow:**
- `HousingService` fetches data from `json-server` at `http://localhost:3000/locations` using the browser `fetch` API (async/await pattern, not Angular's `HttpClient`)
- `HomeComponent` calls `HousingService.getAllHousingLocations()` and stores results in `housingLocationList`; filtering is done client-side against this list
- `HousingLocationComponent` receives a single `HousingLocation` via `@Input()` and renders a card with a routerLink to the details page
- `DetailsComponent` reads the `id` route param, calls `HousingService.getHousingLocationById()`, and renders a reactive form for applying

**Routing** (`src/app/routes.ts`):
- `/` → `HomeComponent`
- `/details/:id` → `DetailsComponent`

**Key interface** (`src/app/housing-location.ts`): `HousingLocation` with fields `id`, `name`, `city`, `state`, `photo`, `availableUnits`, `wifi`, `laundry`.

**Known issue:** City filtering in `HomeComponent` is intermittently unreliable (observed in both this repo and the original source).
