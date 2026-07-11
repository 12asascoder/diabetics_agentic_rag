import axios, { AxiosError } from 'axios';

let baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005';
if (baseURL.endsWith('/')) {
  baseURL = baseURL.slice(0, -1);
}

// Client-side validation: Prevent production Vercel from calling localhost
if (typeof window !== 'undefined') {
  const isProductionFrontend = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  if (isProductionFrontend && baseURL.includes('localhost')) {
    console.error('🚨 CRITICAL ERROR: NEXT_PUBLIC_API_URL is missing in Vercel. The app is attempting to call localhost from a production environment.');
    // We do not throw here to prevent completely crashing the React tree, but we log loudly.
  }
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000, // 15 second timeout to prevent hanging requests
});

// Implement Exponential Backoff Retry Logic
const MAX_RETRIES = 3;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as any;
    
    // 1. Check for specific Network Errors that caused the user's issue
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
      if (isProduction && baseURL.includes('localhost')) {
        return Promise.reject(new Error('Backend Misconfiguration: The frontend is trying to call a local server from the internet. Please set NEXT_PUBLIC_API_URL in Vercel.'));
      }
      console.error('🚨 Network connection failed. The backend might be offline or blocked by CORS.');
    }

    // 2. Retry Logic (Only for GET requests or safe idempotency)
    if (config && (!config.method || config.method.toLowerCase() === 'get')) {
      config.retryCount = config.retryCount || 0;
      
      if (config.retryCount < MAX_RETRIES) {
        config.retryCount += 1;
        
        // Exponential backoff: 1s, 2s, 4s
        const backoff = Math.pow(2, config.retryCount - 1) * 1000;
        console.warn(`⚠️ Request failed. Retrying in ${backoff}ms... (Attempt ${config.retryCount} of ${MAX_RETRIES})`);
        
        await new Promise(resolve => setTimeout(resolve, backoff));
        return api(config);
      }
    }

    // 3. Normalize Error Message
    let errorMessage = 'An unexpected error occurred.';
    
    if (error.response) {
      // Server responded with an error (e.g., 400, 500)
      errorMessage = (error.response.data as any)?.message || error.response.statusText || 'Server Error';
    } else if (error.request) {
      // Request made but no response received (Network, CORS, Timeout)
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Connection timeout. The server took too long to respond.';
      } else {
        errorMessage = 'Network error: The server could not be reached. Ensure it is running and CORS is configured.';
      }
    } else {
      errorMessage = error.message;
    }

    // Reject with a clean, normalized Error object so UI components don't have to parse Axios objects
    return Promise.reject(new Error(errorMessage));
  }
);
