import { apiRequest } from "./api.js";

export async function createOrder(orderData) {
  return apiRequest("/api/pedidos", {
    method: "POST",
    auth: true,
    body: orderData,
  });
}

export async function getMyOrders() {
  return apiRequest("/api/pedidos/mis-pedidos", {
    auth: true,
  });
}