import { BASE_URL } from "./constants";

export const fetchJson = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.detail || "Request failed");
  }

  if (res.status === 204) return null;

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }

  return res.text();
};

export const loginApi = (username: string, password: string) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  return fetchJson(`${BASE_URL}login`, {
    method: "POST",
    body: formData,
  });
};

export const signupApi = (username: string, email: string, password: string) =>
  fetchJson(`${BASE_URL}user/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

export const fetchPostsApi = () => fetchJson(`${BASE_URL}post/all`);
