import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerify2FALogin } from "../../hooks/2fa/useVerify2FALogin";
import { toast } from "sonner";

const Verify2FAPage = () => {
  const [token, setToken] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const verify2FALogin = useVerify2FALogin();

  // redirect if no userId in state
  if (!userId) {
    navigate("/login");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token.trim()) {
      toast.error("Please enter the 6 digit code");
      return;
    }

    verify2FALogin.mutate(
      { userId, token },
      {
        onSuccess: (data) => {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("sessionId", data.sessionId);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/dashboard");
          toast.success(data.message || "login Successfully!");
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Invalid code");
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100">
            <svg
              className="h-8 w-8 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Two-Factor Authentication
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter the 6 digit code from your authenticator app or use the backup
            codes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Authentication Code
            </label>
            <input
              type="text"
              maxLength={8} // ✅ backup codes are 8 characters
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
              }}
              className="w-full px-3 py-3 border border-gray-300 rounded-md text-center text-2xl tracking-widest focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="000000"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={
              verify2FALogin.isPending ||
              (token.length !== 6 && token.length !== 8)
            }
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {verify2FALogin.isPending ? "Verifying..." : "Verify"}
          </button>

          <div className="text-center">
            <a
              href="/login"
              className="text-sm text-emerald-600 hover:text-emerald-500 font-medium"
            >
              Back to login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify2FAPage;
