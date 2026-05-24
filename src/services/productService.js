import { apiRequest } from "./api.js";

export async function getProducts() {
  return apiRequest("/api/productos");
}