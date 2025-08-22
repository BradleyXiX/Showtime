# Showtime 🎬

Showtime is a full-stack movie ticket booking application. Users can browse movies, view showtimes, book seats, and manage their bookings. Admins can manage shows, view bookings, and access dashboard analytics.

## Features

- User authentication with Clerk
- Browse now playing movies (fetched from TMDB)
- View movie details, cast, and showtimes
- Book seats and pay securely via Stripe
- Manage favorite movies
- Admin dashboard for managing shows and bookings
- Automated email notifications and reminders (via SMTP and Inngest)
- Responsive UI built with React, Tailwind CSS, and Vite

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Clerk, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), Stripe, Inngest, Clerk, Nodemailer
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas account
- Clerk account (for authentication)
- Stripe account (for payments)
- SMTP credentials (for email notifications)
- TMDB API Key

### Environment Variables

#### Server (`server/.env`)

```
MONGODB_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
TMDB_API_KEY=your_tmdb_api_key
SENDER_EMAIL=your_email_address
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

#### Client (`client/.env`)

```
VITE_CURRENCY=$
VITE_BASE_URL=http://localhost:3000
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/yourusername/showtime.git
cd showtime
```

#### 2. Install dependencies

**Server:**
```sh
cd server
npm install
```

**Client:**
```sh
cd ../client
npm install
```

#### 3. Run the development servers

**Start the backend:**
```sh
cd ../server
npm run server
```

**Start the frontend:**
```sh
cd ../client
npm run dev
```

The client will be available at [http://localhost:5173](http://localhost:5173) and the server at [http://localhost:3000](http://localhost:3000).

## Folder Structure

- `client/` — React frontend
- `server/` — Express backend

## Deployment

Both the client and server are configured for deployment on Vercel. See `vercel.json` in each directory for details.

## License

This project is licensed under the MIT License.

---