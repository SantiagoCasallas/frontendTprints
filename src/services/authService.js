import { apiRequest, clearSession, saveSession } from "./api.js";

export async function loginUser(credentials) {
  const response = await apiRequest("/api/auth/login", {
    method: "POST",
    body: credentials,
  });

  saveSession(response);

  return response;
}

export async function registerUser(userData) {
  const response = await apiRequest("/api/auth/registro", {
    method: "POST",
    body: userData,
  });

  saveSession(response);

  return response;
}

export function logoutUser() {
  clearSession();
}