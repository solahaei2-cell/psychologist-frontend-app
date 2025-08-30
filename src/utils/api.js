const BASE = import.meta.env.VITE_API_BASE_URL || "https://psychologist-ai-fhcp.onrender.com";

async function _request(method, url, token, body) {
  const headers = { "Content-Type": "application/json" };
  if (typeof token === "string") headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(BASE + url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({}));
  return json;
}

export const api = {
  get: (url, token) => _request("GET", url, token),
  post: (url, body, token) => _request("POST", url, token, body),
};
