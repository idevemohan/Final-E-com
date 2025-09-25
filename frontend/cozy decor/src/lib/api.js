const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const token = localStorage.getItem("cozy_token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    const message = data?.error || res.statusText;
    throw new Error(message);
  }
  return data;
}

export const api = {
  login: (email, password) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (email, password, name) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    }),
  products: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const path = qs ? `/api/products?${qs}` : "/api/products";
    return request(path);
  },
};

export default api;
