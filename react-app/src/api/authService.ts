import api from "./client";

export const loginAdmin = (credentials: { email: string; password: string }) =>
  api.post("/admin/login", credentials);

export const fetchAdminDashboard = () => api.get("/admin/dashboard");
