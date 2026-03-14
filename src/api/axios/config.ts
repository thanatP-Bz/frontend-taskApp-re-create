import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//interceptor request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  const sessionId = localStorage.getItem("sessionId");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (sessionId) {
    config.headers["x-session-id"] = sessionId;
  }
  return config;
});

//interceptor response
// RESPONSE interceptor - Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Don't try to refresh if we're on the login page!

    const originalRequest = error.config;

    // If 401 and haven't already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/api/auth/login")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const startTime = Date.now(); // ← Start timer
        console.log("🔄 Refreshing access token...");

        // Call refresh endpoint (use raw axios, not api instance)
        const { data } = await axios.post(
          "http://localhost:5000/api/token/refresh",
          { refreshToken },
        );

        const endTime = Date.now(); // ← End timer
        const duration = endTime - startTime; // ← Calculate duration

        console.log(`✅ Token refreshed in ${duration}ms!`); // ← Show duration

        // Save new access token (sessionId stays the same)
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        console.log("🔁 Retrying original request...");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token failed - logging out");
        console.error("Error:", refreshError); // ← Show error details

        // Clear everything and redirect to login
        localStorage.clear();
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
