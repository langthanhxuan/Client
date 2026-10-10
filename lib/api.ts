/**
 * Shared API Client for calling the NestJS Backend.
 * Automatically injects CSRF headers and forwards cookies.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  // Defense against CSRF: custom header forces CORS preflight
  headers.set("X-Requested-With", "XMLHttpRequest");
  headers.set("X-LTX-Client", "web");

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // send NextAuth session cookies across origins
  });

  if (!response.ok) {
    let errorDetail = "API request failed";
    try {
      const errJson = await response.json();
      errorDetail = errJson.message || errJson.error || errorDetail;
    } catch {
      // ignore
    }
    throw new Error(
      typeof errorDetail === "string"
        ? errorDetail
        : JSON.stringify(errorDetail),
    );
  }

  return response.json() as Promise<T>;
}
