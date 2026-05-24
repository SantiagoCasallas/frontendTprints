// conexion a ngrok
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
export const TOKEN_KEY = "tprints-token";
export const USER_KEY = "tprints-user";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser() {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("No se pudo leer el usuario guardado", error);
    return null;
  }
}
export function saveSession(authResponse) {
  localStorage.setItem(TOKEN_KEY, authResponse.token);

  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      idUsuario: authResponse.idUsuario,
      nombres: authResponse.nombres,
      apellidos: authResponse.apellidos,
      correo: authResponse.correo,
      nombreUsuario: authResponse.nombreUsuario,
      roles: authResponse.roles,
    }),
  );
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export async function apiRequest(path, options = {}) {
  const { method = "GET", body, auth = false, headers = {} } = options;

  const requestHeaders = {
    "ngrok-skip-browser-warning": "true",
    ...headers,
  };

  if (body) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getToken();

    if (!token) {
      throw new Error("No hay sesión activa. Inicia sesión nuevamente.");
    }

    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();

  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Error ${response.status}: ${response.statusText}`;

    throw new Error(message);
  }

  return data;
}
