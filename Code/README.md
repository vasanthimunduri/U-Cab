# Ucab — Cab Booking App (MERN Stack)

Ucab lets users log in, choose pickup/drop-off locations, see nearby cabs with fares and ETAs,
book a ride, track it live, pay automatically, and view booking history. It also supports
discounts, driver donations, and in-ride refreshment add-ons.

## Project structure

```
ucab/
├── server/          Express + MongoDB API
│   ├── config/      DB connection
│   ├── models/      User, Cab, Booking (Mongoose schemas)
│   ├── controllers/ Route logic
│   ├── routes/      Express routers
│   ├── middleware/  JWT auth guard
│   ├── utils/       Fare/distance calculator, DB seed script
│   └── server.js    App entry point + Socket.IO live tracking
└── client/          React (Vite) frontend
    └── src/
        ├── pages/       Home, Login, Register, BookRide, TrackRide, BookingHistory
        ├── components/  Navbar, CabCard, ProtectedRoute
        ├── context/      AuthContext (JWT session)
        └── api/          Axios client
```

## Features implemented in this scaffold

- **Auth**: register/login with JWT, hashed passwords (bcrypt), protected routes.
- **Cab search**: nearby available cabs, sorted by pickup ETA, with per-cab fare estimate
  (Haversine distance × rate/km + base fare) and trip ETA.
- **Booking**: create a booking, confirm, mark ongoing/completed/cancelled, view history.
- **Live tracking**: Socket.IO channel per booking (`join-booking` / `cab-location-update` events)
  — wire up a driver app or simulator to emit location pings.
- **Discounts**: a demo discount code (`UCAB10`) applied at booking time.
- **Extras**: add a driver donation and in-ride refreshments to a booking.
- **Payment methods**: users can save payment methods (card/UPI/wallet labels) on their profile;
  actual payment gateway integration (Stripe/Razorpay) is not wired up yet — see "Next steps".

## Getting started

### 1. Backend

```bash
cd server
cp .env.example .env    # then edit MONGO_URI / JWT_SECRET as needed
npm install
npm run dev              # starts on http://localhost:5000
```

Seed a few sample cabs so the search screen returns results:

```bash
node utils/seed.js
```

### 2. Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev               # starts on http://localhost:5173
```

Open http://localhost:5173, sign up, then go to **Book a ride**. Pick the preset pickup/drop-off
locations (Hyderabad-based demo coordinates), search cabs, select one, and confirm — you'll land
on the live tracking page.

## Next steps you may want to add

- Replace the preset pickup/drop-off buttons with a real map + geocoding (Google Maps / Mapbox).
- Wire a real payment gateway (Stripe/Razorpay) into `paymentStatus` on the Booking model.
- Add a driver-side app/dashboard that emits real `cab-location-update` socket events.
- Add request validation (e.g. `zod`/`joi`) and rate limiting on the API.
- Add automated tests (Jest + Supertest for the API, React Testing Library for the client).
