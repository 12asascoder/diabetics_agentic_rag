import axios from 'axios';

let baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005';
if (baseURL.endsWith('/')) {
  baseURL = baseURL.slice(0, -1);
}

// Create a configured Axios instance that directly hits the backend
// This bypasses Vercel's rewrite engine entirely, preventing 502 Bad Gateway proxy errors
export const api = axios.create({
  baseURL,
  withCredentials: true, // required for secure HTTP-only cookies
});
