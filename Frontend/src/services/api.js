// Centralized API placeholder. Keep secrets on your backend, never in VITE_* variables.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
export async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}
// The current UI intentionally uses local mock data. Add API calls here when backend endpoints exist.
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== "false";