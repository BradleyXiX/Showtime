import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // Simulate 500 concurrent virtual users
  vus: 500,
  duration: '5s', // Short duration to trigger the surge
};

// Configuration
const BASE_URL = 'http://localhost:5000';
const SHOW_ID = 'YOUR_SHOW_ID_HERE'; // Replace with a valid show ID from your database
const SEAT_NUMBER = 'A1'; // The exact same seat all users attempt to book
const AUTH_TOKEN = __ENV.CLERK_TOKEN || 'YOUR_CLERK_JWT_TOKEN_HERE'; // Provide via CLERK_TOKEN environment variable or paste here

export default function () {
  const url = `${BASE_URL}/api/booking/create`;
  
  const payload = JSON.stringify({
    showId: SHOW_ID,
    selectedSeats: [SEAT_NUMBER],
    expectedVersion: 0
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AUTH_TOKEN}`
    },
  };

  const res = http.post(url, payload, params);

  // Verify Optimistic Concurrency Control (OCC)
  // Expect exactly one request to return 200, and all concurrent attempts to fail with 409
  check(res, {
    'Succeeded (200 OK)': (r) => r.status === 200,
    'Conflict (409 Conflict)': (r) => r.status === 409,
  });

  sleep(1);
}
