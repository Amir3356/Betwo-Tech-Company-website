import axios from "axios";

const TOKEN_KEY = "betwo-admin-token";

export function getAdminToken() {
  return window.localStorage.getItem(TOKEN_KEY);
}

export function isAdminAuthenticated() {
  return Boolean(getAdminToken());
}

export function storeAdminToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminAuth() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export function adminAuthHeaders() {
  const token = getAdminToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginAdmin(username, password) {
  const response = await axios.post("/api/admin/login", { username, password });
  const token = response.data?.data?.token;

  if (token) {
    storeAdminToken(token);
  }

  return response.data?.data?.admin ?? null;
}

export async function logoutAdmin() {
  const headers = adminAuthHeaders();

  try {
    if (headers.Authorization) {
      await axios.post("/api/admin/logout", {}, { headers });
    }
  } finally {
    clearAdminAuth();
  }
}

export async function fetchCurrentAdmin() {
  const headers = adminAuthHeaders();

  if (!headers.Authorization) {
    return null;
  }

  const response = await axios.get("/api/admin/me", { headers });
  return response.data?.data ?? null;
}