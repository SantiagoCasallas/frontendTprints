import { apiRequest } from "./api.js";

export async function getApprovedDesigns() {
  return apiRequest("/api/disenos/aprobados");
}

export async function getMyDesigns() {
  return apiRequest("/api/disenos/mis-disenos", {
    auth: true,
  });
}

export async function createDesign(data) {
  return apiRequest("/api/disenos", {
    method: "POST",
    auth: true,
    body: data,
  });
}