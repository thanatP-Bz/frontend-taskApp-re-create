import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error"); // ✅ check for error first

    if (error) {
      navigate("/login");
      toast.error("Google login failed. Please try again.");
      return;
    }

    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const sessionId = params.get("sessionId");
    const user = params.get("user");

    if (accessToken && refreshToken && sessionId) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("sessionId", sessionId);
      if (user) {
        localStorage.setItem("user", decodeURIComponent(user));
      }
      toast.success("Login successfully!");
      navigate("/dashboard");
    } else {
      navigate("/login");
      toast.error("Google login failed. Please try again.");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <div className="mx-auto h-12 w-12 relative">
          <div className="absolute inset-0 border-4 border-emerald-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-emerald-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <p className="text-gray-600 text-sm">Signing you in...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
