import axios from "axios";

const API_URL = "/api";

axios.defaults.withCredentials = true;

export async function isAdminAuthenticated() {
  try {
    const response = await axios.get(`${API_URL}/admin/me`);
    return response.data?.data !== null;
  } catch {
    return false;
  }
}

export async function getCurrentAdmin() {
  try {
    const response = await axios.get(`${API_URL}/admin/me`);
    return response.data?.data ?? null;
  } catch {
    return null;
  }
}

export async function loginAdmin(username, password) {
  const response = await axios.post(`${API_URL}/admin/login`, { username, password });
  return response.data?.data?.admin ?? null;
}

export async function logoutAdmin() {
  try {
    await axios.post(`${API_URL}/admin/logout`);
  } finally {
    window.location.reload();
  }
}